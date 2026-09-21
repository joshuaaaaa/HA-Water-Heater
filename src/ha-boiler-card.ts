import { LitElement, html, css, PropertyValues, TemplateResult, svg, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import {
  AlertConfig,
  BoilerCardConfig,
  ColorConfig,
  CustomLabels,
  HeatLossInfo,
  HeatingSource,
  SensorConfig,
  TempHistory,
  TrendInfo,
  WaterStats,
} from './types';
import { CARD_VERSION, DEFAULT_COLORS, TANK, THEMES, TRANSLATIONS, WATER_HEAT_CAPACITY } from './const';
import './ha-boiler-card-editor';

/** Domains whose target temperature this card knows how to change. */
const SETTABLE_TARGET_DOMAINS = ['water_heater', 'climate', 'number', 'input_number'];

const STORAGE_PREFIX = 'ha-boiler-card:history:';
const MAX_HISTORY_POINTS = 720;

@customElement('ha-boiler-card')
export class BoilerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BoilerCardConfig;
  @state() private tempHistory: Map<string, TempHistory[]> = new Map();
  @state() private lastNotificationTime: Map<string, number> = new Map();
  @state() private chartExpanded = false;

  private lastSampleTime = 0;
  private lastPersistTime = 0;
  private storageKey = '';

  public setConfig(config: BoilerCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      show_average: true,
      show_gradient: true,
      show_stratification: true,
      show_sparkline: false,
      min_temp: 0,
      max_temp: 100,
      display_mode: 'normal',
      heating_type: 'electric',
      anode_change_interval: 365,
      cleaning_interval: 180,
      enable_more_info: true,
      energy_cost: 0,
      advanced_animations: true,
      // v1.6.0 defaults
      stratification_style: 'gradient',
      show_scale: true,
      show_sensor_markers: true,
      show_display_panel: true,
      show_hot_water_level: true,
      show_insulation: true,
      show_pipes: true,
      show_legs: true,
      show_water_stats: true,
      show_trend: true,
      show_heat_loss: true,
      show_status_badges: true,
      show_history_chart: false,
      cold_water_temp: 10,
      mixed_water_temp: 40,
      shower_volume: 40,
      history_duration: 120,
      history_interval: 60,
      persist_history: true,
      temp_step: 1,
      currency: '',
      ...config,
    };

    this.chartExpanded = !!this.config.show_history_chart;
    this.storageKey = STORAGE_PREFIX + this.getHistoryId();
    this.loadHistory();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.loadHistory();
  }

  public disconnectedCallback(): void {
    this.persistHistory(true);
    super.disconnectedCallback();
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    if (changedProps.has('hass') && this.hass?.states) {
      this.updateTempHistory();
    }

    return true;
  }

  // ---------------------------------------------------------------------------
  // History handling
  // ---------------------------------------------------------------------------

  /** Stable id for this card instance so stored history is not mixed up. */
  private getHistoryId(): string {
    const parts = [
      this.config.title || '',
      ...(this.config.sensors || []).map(s => s.entity),
    ].join('|');

    let hash = 0;
    for (let i = 0; i < parts.length; i++) {
      hash = (hash << 5) - hash + parts.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  private getHistoryWindow(): number {
    return (this.config.history_duration || 120) * 60 * 1000;
  }

  private trimHistory(entries: TempHistory[]): TempHistory[] {
    const cutoff = Date.now() - this.getHistoryWindow();
    const trimmed = entries.filter(h => h.timestamp > cutoff);
    return trimmed.length > MAX_HISTORY_POINTS ? trimmed.slice(-MAX_HISTORY_POINTS) : trimmed;
  }

  private loadHistory(): void {
    if (!this.config?.persist_history || !this.storageKey) return;
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, TempHistory[]>;
      const restored = new Map<string, TempHistory[]>();
      Object.entries(parsed).forEach(([key, entries]) => {
        if (!Array.isArray(entries)) return;
        const valid = entries.filter(e => typeof e?.value === 'number' && typeof e?.timestamp === 'number');
        restored.set(key, this.trimHistory(valid));
      });
      if (restored.size > 0) {
        this.tempHistory = restored;
      }
    } catch {
      // Storage may be unavailable (private mode, quota, disabled) - history is optional.
    }
  }

  private persistHistory(force = false): void {
    if (!this.config?.persist_history || !this.storageKey) return;

    const now = Date.now();
    if (!force && now - this.lastPersistTime < 60 * 1000) return;
    this.lastPersistTime = now;

    try {
      const plain: Record<string, TempHistory[]> = {};
      this.tempHistory.forEach((entries, key) => {
        plain[key] = entries;
      });
      window.localStorage.setItem(this.storageKey, JSON.stringify(plain));
    } catch {
      // Ignore storage failures - the card keeps working with in-memory history.
    }
  }

  private updateTempHistory(): void {
    if (!this.config.sensors || this.config.sensors.length === 0) return;

    const now = Date.now();
    const interval = Math.max(5, this.config.history_interval || 60) * 1000;
    if (now - this.lastSampleTime < interval) return;
    this.lastSampleTime = now;

    const heating = this.isHeatingActive();
    const record = (key: string, value: number): void => {
      const history = this.tempHistory.get(key) || [];
      history.push({ value, timestamp: now, heating });
      this.tempHistory.set(key, this.trimHistory(history));
    };

    this.config.sensors.forEach(sensor => {
      const temp = this.getSensorValue(sensor.entity);
      if (temp !== null) record(sensor.entity, temp);
    });

    const avgTemp = this.getAverageTemperature();
    if (avgTemp !== null) record('average', avgTemp);

    this.persistHistory();
  }

  // ---------------------------------------------------------------------------
  // State helpers
  // ---------------------------------------------------------------------------

  private getSensorValue(entityId: string): number | null {
    if (!this.hass?.states) return null;
    const state = this.hass.states[entityId];
    if (!state) return null;
    const value = parseFloat(state.state);
    return isNaN(value) ? null : value;
  }

  private getAverageTemperature(): number | null {
    if (!this.config.sensors || this.config.sensors.length === 0) return null;

    const temps: number[] = [];
    this.config.sensors.forEach(sensor => {
      const temp = this.getSensorValue(sensor.entity);
      if (temp !== null) temps.push(temp);
    });

    if (temps.length === 0) return null;
    return temps.reduce((a, b) => a + b, 0) / temps.length;
  }

  private isHeating(): boolean {
    if (!this.config.heating_entity || !this.hass?.states) return false;
    const state = this.hass.states[this.config.heating_entity];
    return !!state && (state.state === 'on' || state.state === 'heating');
  }

  /** True when either the legacy heating entity or any configured source is running. */
  private isHeatingActive(): boolean {
    return this.isHeating() || this.getActiveHeatingSources().length > 0;
  }

  private getActiveHeatingSources(): HeatingSource[] {
    if (!this.config.heating_sources || !this.hass?.states) return [];

    return this.config.heating_sources.filter(source => {
      const state = this.hass.states[source.entity];
      return state && (state.state === 'on' || state.state === 'heating');
    }).sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  private getPowerConsumption(): { power: number; cost: number } | null {
    if (!this.config.power_entity || !this.hass?.states) return null;

    const power = this.getSensorValue(this.config.power_entity);
    if (power === null) return null;

    const costPerHour = (power / 1000) * (this.config.energy_cost || 0);

    return { power, cost: costPerHour };
  }

  private getEnergyToday(): { energy: number; cost: number; unit: string } | null {
    if (!this.config.energy_today_entity || !this.hass?.states) return null;

    const energy = this.getSensorValue(this.config.energy_today_entity);
    if (energy === null) return null;

    const state = this.hass.states[this.config.energy_today_entity];
    const unit = state?.attributes?.unit_of_measurement || 'kWh';

    return { energy, cost: energy * (this.config.energy_cost || 0), unit };
  }

  /** Target temperature, either from a plain sensor or from a water_heater/climate attribute. */
  private getTargetTemperature(): number | null {
    if (!this.config.target_temp_entity || !this.hass?.states) return null;

    const state = this.hass.states[this.config.target_temp_entity];
    if (!state) return null;

    const attribute = state.attributes?.temperature;
    if (typeof attribute === 'number' && !isNaN(attribute)) return attribute;

    const value = parseFloat(state.state);
    return isNaN(value) ? null : value;
  }

  private canSetTargetTemperature(): boolean {
    if (!this.config.target_temp_entity || !this.hass?.states) return false;
    if (!this.hass.states[this.config.target_temp_entity]) return false;
    const domain = this.config.target_temp_entity.split('.')[0];
    return SETTABLE_TARGET_DOMAINS.includes(domain);
  }

  private getTargetTempStep(): number {
    const state = this.config.target_temp_entity
      ? this.hass?.states?.[this.config.target_temp_entity]
      : undefined;
    const step = state?.attributes?.target_temp_step ?? state?.attributes?.step;
    if (typeof step === 'number' && step > 0) return step;
    return this.config.temp_step && this.config.temp_step > 0 ? this.config.temp_step : 1;
  }

  private setTargetTemperature(delta: number): void {
    if (!this.canSetTargetTemperature()) return;

    const entityId = this.config.target_temp_entity!;
    const current = this.getTargetTemperature();
    if (current === null) return;

    const state = this.hass.states[entityId];
    const min = state?.attributes?.min_temp ?? state?.attributes?.min ?? this.config.min_temp ?? 0;
    const max = state?.attributes?.max_temp ?? state?.attributes?.max ?? this.config.max_temp ?? 100;

    const step = this.getTargetTempStep();
    const decimals = step < 1 ? 1 : 0;
    const raw = current + delta * step;
    const value = parseFloat(Math.min(max, Math.max(min, raw)).toFixed(decimals));

    if (value === current) return;

    const domain = entityId.split('.')[0];
    if (domain === 'water_heater' || domain === 'climate') {
      this.hass.callService(domain, 'set_temperature', { entity_id: entityId, temperature: value });
    } else {
      this.hass.callService(domain, 'set_value', { entity_id: entityId, value });
    }
  }

  private getOperationModes(): { modes: string[]; current: string } | null {
    const entityId = this.config.target_temp_entity || this.config.control_entity;
    if (!entityId || !this.hass?.states) return null;
    if (entityId.split('.')[0] !== 'water_heater') return null;

    const state = this.hass.states[entityId];
    const modes = state?.attributes?.operation_list;
    if (!Array.isArray(modes) || modes.length === 0) return null;

    return { modes, current: state.attributes?.operation_mode || state.state };
  }

  private setOperationMode(mode: string): void {
    const entityId = this.config.target_temp_entity || this.config.control_entity;
    if (!entityId) return;
    this.hass.callService('water_heater', 'set_operation_mode', {
      entity_id: entityId,
      operation_mode: mode,
    });
  }

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------

  /** Temperature profile from top to bottom of the tank, based on sensor positions. */
  private getTemperatureProfile(): { ratio: number; temp: number; sensor: SensorConfig }[] {
    const sensors = [...(this.config.sensors || [])]
      .sort((a, b) => (a.position || 0) - (b.position || 0));

    const profile: { ratio: number; temp: number; sensor: SensorConfig }[] = [];
    const count = sensors.length;
    if (count === 0) return profile;

    sensors.forEach((sensor, index) => {
      const temp = this.getSensorValue(sensor.entity);
      if (temp === null) return;
      // Each sensor represents a layer; place it in the middle of its layer.
      profile.push({ ratio: (index + 0.5) / count, temp, sensor });
    });

    return profile;
  }

  /** 0..1 share of the tank (from the top) that is at or above the usable temperature. */
  private getHotWaterFraction(): number | null {
    const profile = this.getTemperatureProfile();
    if (profile.length === 0) return null;

    const usable = this.config.mixed_water_temp ?? 40;

    if (profile.length === 1) {
      return profile[0].temp >= usable ? 1 : 0;
    }

    if (profile[0].temp < usable) return 0;

    for (let i = 0; i < profile.length - 1; i++) {
      const upper = profile[i];
      const lower = profile[i + 1];
      if (upper.temp >= usable && lower.temp < usable) {
        const span = upper.temp - lower.temp;
        const share = span === 0 ? 0 : (upper.temp - usable) / span;
        return upper.ratio + share * (lower.ratio - upper.ratio);
      }
    }

    return 1;
  }

  private getWaterStats(): WaterStats | null {
    if (!this.config.tank_volume || this.config.tank_volume <= 0) return null;

    const avgTemp = this.getAverageTemperature();
    if (avgTemp === null) return null;

    const volume = this.config.tank_volume;
    const cold = this.config.cold_water_temp ?? 10;
    const mixed = this.config.mixed_water_temp ?? 40;
    const showerVolume = this.config.shower_volume || 40;

    if (mixed <= cold) return null;

    const usableLiters = Math.max(0, (volume * (avgTemp - cold)) / (mixed - cold));
    const storedEnergy = Math.max(0, (volume * WATER_HEAT_CAPACITY * (avgTemp - cold)) / 3600);
    const hotFraction = this.getHotWaterFraction();

    return {
      usableLiters,
      showers: usableLiters / showerVolume,
      storedEnergy,
      hotFraction: hotFraction ?? Math.max(0, Math.min(1, (avgTemp - cold) / (mixed - cold))),
    };
  }

  /**
   * Cooling rate measured over the most recent stretch where no heat source was on.
   * Lets the user see how well the tank keeps its heat and when it will run cold.
   */
  private getHeatLoss(): HeatLossInfo | null {
    const history = this.tempHistory.get('average');
    if (!history || history.length < 4) return null;

    // Take the latest contiguous run of samples recorded while not heating.
    const run: TempHistory[] = [];
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].heating) break;
      run.unshift(history[i]);
    }

    if (run.length < 4) return null;

    const spanMinutes = (run[run.length - 1].timestamp - run[0].timestamp) / 60000;
    if (spanMinutes < 20) return null;

    // Least squares slope in °C per minute.
    const n = run.length;
    const t0 = run[0].timestamp;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    run.forEach(point => {
      const x = (point.timestamp - t0) / 60000;
      sumX += x;
      sumY += point.value;
      sumXY += x * point.value;
      sumXX += x * x;
    });

    const denominator = n * sumXX - sumX * sumX;
    if (denominator === 0) return null;

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const ratePerHour = -slope * 60;
    if (ratePerHour <= 0.05) return null;

    const threshold = this.config.low_temp_warning ?? this.config.mixed_water_temp ?? 40;
    const current = run[run.length - 1].value;
    const hoursToThreshold = current > threshold ? (current - threshold) / ratePerHour : 0;

    return { ratePerHour, hoursToThreshold, threshold };
  }

  private getTrend(entityId: string): TrendInfo | null {
    if (!this.config.show_trend) return null;

    const history = this.tempHistory.get(entityId);
    if (!history || history.length < 2) return null;

    const now = Date.now();
    const reference = history.find(h => h.timestamp >= now - 15 * 60 * 1000) || history[0];
    const latest = history[history.length - 1];
    if (reference === latest) return null;

    const delta = latest.value - reference.value;
    const direction = Math.abs(delta) < 0.3 ? 'flat' : delta > 0 ? 'up' : 'down';

    return { direction, delta };
  }

  private getStatus(): { key: string; icon: string; className: string } {
    if (this.isHeatingActive()) {
      return { key: 'status_heating', icon: '🔥', className: 'heating' };
    }

    const heatLoss = this.getHeatLoss();
    if (heatLoss && heatLoss.ratePerHour > 0.3) {
      return { key: 'status_cooling', icon: '❄️', className: 'cooling' };
    }

    return { key: 'status_ready', icon: '✅', className: 'ready' };
  }

  // ---------------------------------------------------------------------------
  // Colors and translations
  // ---------------------------------------------------------------------------

  private getColors(): ColorConfig {
    if (this.config.theme && this.config.theme !== 'custom' && THEMES[this.config.theme]) {
      return { ...DEFAULT_COLORS, ...THEMES[this.config.theme], ...(this.config.colors || {}) };
    }

    if (this.config.colors) {
      return { ...DEFAULT_COLORS, ...this.config.colors };
    }

    return { ...DEFAULT_COLORS };
  }

  private t(key: string, replacements?: Record<string, string | number>): string {
    const language = this.config.language || 'cs';
    const translations = TRANSLATIONS[language] || TRANSLATIONS.cs;

    const custom = this.config.custom_labels?.[key as keyof CustomLabels];
    let text = custom || translations[key] || TRANSLATIONS.en[key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([name, value]) => {
        text = text.replace(`{${name}}`, String(value));
      });
    }

    return text;
  }

  private static hexToRgb(hex: string): [number, number, number] | null {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    if (!match) return null;
    return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
  }

  private static srgbToLinear(channel: number): number {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  private static linearToSrgb(channel: number): number {
    const c = channel <= 0.0031308 ? channel * 12.92 : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    return Math.round(Math.max(0, Math.min(1, c)) * 255);
  }

  private static rgbToOklab([r, g, b]: [number, number, number]): [number, number, number] {
    const lr = BoilerCard.srgbToLinear(r);
    const lg = BoilerCard.srgbToLinear(g);
    const lb = BoilerCard.srgbToLinear(b);

    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

    return [
      0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
    ];
  }

  private static oklabToRgb([L, a, b]: [number, number, number]): [number, number, number] {
    const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
    const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
    const s = Math.pow(L - 0.0894841775 * a - 1.2914855480 * b, 3);

    return [
      BoilerCard.linearToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
      BoilerCard.linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
      BoilerCard.linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s),
    ];
  }

  /**
   * Blends two colors in OKLab. Mixing cold blue with warm orange straight in
   * sRGB produces a muddy brown and rotating the hue produces a distracting
   * green; OKLab keeps the ramp perceptually even with a pale mid tone.
   */
  private static mix(from: string, to: string, ratio: number): [number, number, number] | null {
    const a = BoilerCard.hexToRgb(from);
    const b = BoilerCard.hexToRgb(to);
    if (!a || !b) return null;

    const labA = BoilerCard.rgbToOklab(a);
    const labB = BoilerCard.rgbToOklab(b);
    const mixed = labA.map((value, index) => value + (labB[index] - value) * ratio) as [number, number, number];

    return BoilerCard.oklabToRgb(mixed);
  }

  /**
   * Keeps a temperature color readable as text: mid-range blends are very pale,
   * which disappears on a light background, so lightness is clamped to a band
   * that works on both light and dark themes.
   */
  private static forText(rgb: [number, number, number]): [number, number, number] {
    const [lightness, a, b] = BoilerCard.rgbToOklab(rgb);
    const clamped = Math.min(0.64, Math.max(0.46, lightness));
    return BoilerCard.oklabToRgb([clamped, a * 1.3, b * 1.3]);
  }

  /**
   * Smoothly interpolated cold -> warm -> hot color for a temperature.
   * `forText` returns a variant with enough contrast to be readable as a label.
   */
  private getTemperatureColor(temp: number | null, forText = false): string {
    if (temp === null) return '#888';

    const colors = this.getColors();
    const min = this.config.min_temp ?? 0;
    const max = this.config.max_temp ?? 100;
    const ratio = Math.max(0, Math.min(1, (temp - min) / (max - min || 1)));

    const cold = colors.cold_water || DEFAULT_COLORS.cold_water;
    const warm = colors.warm_water || DEFAULT_COLORS.warm_water;
    const hot = colors.hot_water || DEFAULT_COLORS.hot_water;

    const mixed = ratio < 0.5
      ? BoilerCard.mix(cold, warm, ratio / 0.5)
      : BoilerCard.mix(warm, hot, (ratio - 0.5) / 0.5);

    if (mixed) {
      const [r, g, b] = forText ? BoilerCard.forText(mixed) : mixed;
      return `rgb(${r}, ${g}, ${b})`;
    }

    // Non-hex colors (css variables, named colors) fall back to discrete steps.
    return ratio < 0.3 ? cold : ratio < 0.6 ? warm : hot;
  }

  private getHeatingIcon(type: string): string {
    switch (type) {
      case 'solar': return '☀️';
      case 'gas': return '🔥';
      case 'heat_pump': return '🌡️';
      case 'electric':
      default: return '⚡';
    }
  }

  private getHeatingLabel(type: string): string {
    switch (type) {
      case 'solar': return this.t('solar_heating');
      case 'gas': return this.t('gas_heating');
      case 'heat_pump': return this.t('heat_pump_heating');
      case 'electric':
      default: return this.t('electric_heating');
    }
  }

  private formatDuration(hours: number): string {
    if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} min`;
    if (hours < 24) {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return minutes > 0 ? `${wholeHours} h ${minutes} min` : `${wholeHours} h`;
    }
    return `${Math.round(hours / 24)} d`;
  }

  private calculateTimeToTarget(): string | null {
    const targetTemp = this.getTargetTemperature();
    const avgTemp = this.getAverageTemperature();

    if (targetTemp === null || avgTemp === null) return null;
    if (avgTemp >= targetTemp) return null;
    if (!this.isHeatingActive()) return null;

    const history = this.tempHistory.get('average');
    if (!history || history.length < 2) return null;

    const heatingRun = history.filter(h => h.heating !== false);
    const samples = heatingRun.length >= 2 ? heatingRun : history;

    const oldest = samples[0];
    const newest = samples[samples.length - 1];
    const timeDiff = (newest.timestamp - oldest.timestamp) / 1000 / 60;
    const tempDiff = newest.value - oldest.value;

    if (timeDiff < 5 || tempDiff <= 0) return null;

    const heatingRate = tempDiff / timeDiff;
    const remainingTemp = targetTemp - avgTemp;
    const minutesToTarget = Math.ceil(remainingTemp / heatingRate);

    if (minutesToTarget < 60) {
      return `~${minutesToTarget} min`;
    }
    const hours = Math.floor(minutesToTarget / 60);
    const minutes = minutesToTarget % 60;
    return `~${hours}h ${minutes}min`;
  }

  private getDaysSince(dateString?: string): number | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    const diffTime = Date.now() - date.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  private getMaintenanceStatus(daysSince: number | null, interval: number): { status: 'ok' | 'warning' | 'overdue', text: string } {
    if (daysSince === null) {
      return { status: 'ok', text: this.t('not_set') };
    }

    const remaining = interval - daysSince;

    if (remaining <= 0) {
      return { status: 'overdue', text: this.t('overdue_days', { days: -remaining }) };
    }
    if (remaining <= 30) {
      return { status: 'warning', text: this.t('remaining_days', { days: remaining }) };
    }
    return { status: 'ok', text: this.t('remaining_days', { days: remaining }) };
  }

  private hasLowTempWarning(): boolean {
    if (!this.config.low_temp_warning) return false;
    const avgTemp = this.getAverageTemperature();
    return avgTemp !== null && avgTemp < this.config.low_temp_warning;
  }

  // ---------------------------------------------------------------------------
  // Alerts and services
  // ---------------------------------------------------------------------------

  private checkAlerts(): AlertConfig[] {
    if (!this.config.alerts) return [];

    const activeAlerts: AlertConfig[] = [];
    const avgTemp = this.getAverageTemperature();

    this.config.alerts.forEach(alert => {
      if (alert.enabled === false) return;

      switch (alert.type) {
        case 'temperature_drop': {
          const history = this.tempHistory.get('average');
          if (history && history.length >= 2 && avgTemp !== null) {
            const oneHourAgo = Date.now() - 60 * 60 * 1000;
            const oldReading = history.find(h => h.timestamp < oneHourAgo);
            if (oldReading && (oldReading.value - avgTemp) > (alert.threshold || 10)) {
              activeAlerts.push(alert);
            }
          }
          break;
        }

        case 'legionella_risk': {
          const history = this.tempHistory.get('average');
          const minTemp = alert.min_temp || 60;
          const duration = (alert.duration || 168) * 60 * 60 * 1000; // hours to ms

          if (history && history.length > 0) {
            const cutoffTime = Date.now() - duration;
            const hasBeenHot = history.some(h => h.timestamp > cutoffTime && h.value >= minTemp);
            if (!hasBeenHot && avgTemp !== null && avgTemp < minTemp) {
              activeAlerts.push(alert);
            }
          }
          break;
        }

        case 'unusual_consumption': {
          const consumption = this.getPowerConsumption();
          if (consumption && alert.threshold && consumption.power > alert.threshold) {
            activeAlerts.push(alert);
          }
          break;
        }
      }
    });

    return activeAlerts;
  }

  private sendNotification(event: string, message: string): void {
    if (!this.config.notifications?.enabled) return;
    if (!this.config.notifications.events?.includes(event as any)) return;
    if (!this.hass) return;

    const intervalMinutes = this.config.notifications.interval || 30;
    const intervalMs = intervalMinutes * 60 * 1000;
    const now = Date.now();
    const lastTime = this.lastNotificationTime.get(event);

    if (lastTime && (now - lastTime) < intervalMs) {
      return;
    }

    this.lastNotificationTime.set(event, now);

    const service = this.config.notifications.service || 'persistent_notification.create';
    const [domain, serviceAction] = service.split('.');

    this.hass.callService(domain, serviceAction, {
      message: message,
      title: 'HA Boiler Card',
    });
  }

  private toggleControlEntity(): void {
    if (!this.config.control_entity || !this.hass?.states) return;

    const state = this.hass.states[this.config.control_entity];
    if (!state) return;

    const domain = this.config.control_entity.split('.')[0];
    const isOn = state.state === 'on';
    const service = isOn ? 'turn_off' : 'turn_on';

    this.hass.callService(domain, service, {
      entity_id: this.config.control_entity,
    });
  }

  private getControlState(): boolean {
    if (!this.config.control_entity || !this.hass?.states) return false;
    const state = this.hass.states[this.config.control_entity];
    return state?.state === 'on';
  }

  private showMoreInfo(entityId?: string): void {
    if (!entityId || !this.config.enable_more_info) return;

    this.dispatchEvent(new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true,
    }));
  }

  // ---------------------------------------------------------------------------
  // SVG rendering
  // ---------------------------------------------------------------------------

  /** Maps a temperature onto the vertical axis of the tank. */
  private tempToY(temp: number): number {
    const min = this.config.min_temp ?? 0;
    const max = this.config.max_temp ?? 100;
    const ratio = Math.max(0, Math.min(1, (temp - min) / (max - min || 1)));
    return TANK.y + TANK.height * (1 - ratio);
  }

  private renderWaterGradientStops(): TemplateResult {
    const colors = this.getColors();
    const profile = this.getTemperatureProfile();

    if (profile.length === 0 || !this.config.show_stratification) {
      const avgTemp = this.getAverageTemperature();
      const top = this.config.show_gradient && avgTemp !== null
        ? this.getTemperatureColor(avgTemp)
        : colors.gradient_start || DEFAULT_COLORS.gradient_start;
      const bottom = this.config.show_gradient && avgTemp !== null
        ? this.getTemperatureColor(avgTemp - 5)
        : colors.gradient_end || DEFAULT_COLORS.gradient_end;

      return svg`
        <stop offset="0%" stop-color="${top}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${bottom}" stop-opacity="0.75"/>
      `;
    }

    // One stop per sensor, plus edge stops so the top and bottom keep their color.
    const stops = profile.map(entry => svg`
      <stop offset="${(entry.ratio * 100).toFixed(1)}%" stop-color="${this.getTemperatureColor(entry.temp)}" stop-opacity="0.95"/>
    `);

    return svg`
      <stop offset="0%" stop-color="${this.getTemperatureColor(profile[0].temp)}" stop-opacity="0.95"/>
      ${stops}
      <stop offset="100%" stop-color="${this.getTemperatureColor(profile[profile.length - 1].temp)}" stop-opacity="0.9"/>
    `;
  }

  /** Discrete layers, one per sensor - an alternative to the smooth gradient. */
  private renderStratificationLayers(): TemplateResult {
    const profile = this.getTemperatureProfile();
    if (profile.length === 0) return svg``;

    const layerHeight = TANK.height / profile.length;

    return svg`${profile.map((entry, index) => svg`
      <rect
        x="${TANK.x}"
        y="${TANK.y + index * layerHeight}"
        width="${TANK.width}"
        height="${layerHeight}"
        fill="${this.getTemperatureColor(entry.temp)}"
        opacity="0.9"
      />
    `)}`;
  }

  private renderBubbles(): TemplateResult {
    if (!this.config.advanced_animations || !this.isHeatingActive()) return svg``;

    const bubbles = [
      { x: 68, r: 2.5, cls: 'bubble-1' },
      { x: 84, r: 1.8, cls: 'bubble-2' },
      { x: 100, r: 3, cls: 'bubble-3' },
      { x: 116, r: 2, cls: 'bubble-4' },
      { x: 132, r: 2.4, cls: 'bubble-5' },
    ];

    return svg`
      <g class="bubbles">
        ${bubbles.map(bubble => svg`
          <circle cx="${bubble.x}" cy="236" r="${bubble.r}" fill="#ffffff" opacity="0.65"
                  class="bubble ${bubble.cls}"/>
        `)}
      </g>
    `;
  }

  /** Heating coil at the bottom of the tank, glowing while a source is running. */
  private renderHeatingElement(): TemplateResult {
    const active = this.isHeatingActive();

    return svg`
      <g class="heating-element ${active ? 'active' : ''}">
        <path d="M 66 238 L 74 232 L 82 244 L 90 232 L 98 244 L 106 232 L 114 244 L 122 232 L 130 238"
              fill="none"
              stroke="${active ? '#FF6B35' : 'var(--disabled-text-color, #9e9e9e)'}"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="${active ? 'url(#glow)' : 'none'}"/>
      </g>
    `;
  }

  /** Dashed line marking how much of the tank is hot enough to use. */
  private renderHotWaterLevel(): TemplateResult {
    if (!this.config.show_hot_water_level) return svg``;

    const fraction = this.getHotWaterFraction();
    if (fraction === null || fraction <= 0 || fraction >= 1) return svg``;

    const y = TANK.y + TANK.height * fraction;
    const usable = this.config.mixed_water_temp ?? 40;

    return svg`
      <g class="hot-level">
        <rect x="${TANK.x}" y="${TANK.y}" width="${TANK.width}" height="${y - TANK.y}"
              fill="#ffffff" opacity="0.12"/>
        <line x1="${TANK.x}" y1="${y}" x2="${TANK.x + TANK.width}" y2="${y}"
              stroke="#ffffff" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.85"/>
        <text x="${TANK.x + 16}" y="${y - 5}" class="level-label">≥ ${usable}°</text>
      </g>
    `;
  }

  /** Temperature axis with labels plus a marker for the target temperature. */
  private renderScale(): TemplateResult {
    if (!this.config.show_scale) return svg``;

    const min = this.config.min_temp ?? 0;
    const max = this.config.max_temp ?? 100;
    const steps = 4;

    const ticks = Array.from({ length: steps + 1 }, (_, index) => {
      const value = min + ((max - min) * index) / steps;
      const y = this.tempToY(value);
      return svg`
        <g>
          <line x1="42" y1="${y}" x2="${TANK.x - 2}" y2="${y}" class="scale-tick"/>
          <text x="39" y="${y + 3}" class="scale-label" text-anchor="end">${Math.round(value)}°</text>
        </g>
      `;
    });

    const target = this.getTargetTemperature();
    const targetMarker = target !== null && target >= min && target <= max ? svg`
      <g class="target-marker">
        <line x1="${TANK.x}" y1="${this.tempToY(target)}" x2="${TANK.x + TANK.width}" y2="${this.tempToY(target)}"
              class="target-line"/>
        <polygon points="${TANK.x + TANK.width + 2},${this.tempToY(target) - 4} ${TANK.x + TANK.width + 2},${this.tempToY(target) + 4} ${TANK.x + TANK.width - 4},${this.tempToY(target)}"
                 class="target-arrow"/>
        <title>${this.t('target')}: ${target.toFixed(1)}°C</title>
      </g>
    ` : svg``;

    return svg`
      <g class="scale">
        ${ticks}
        ${targetMarker}
      </g>
    `;
  }

  /** Per-sensor readouts drawn directly on the tank. */
  private renderSensorMarkers(): TemplateResult {
    if (!this.config.show_sensor_markers) return svg``;

    const profile = this.getTemperatureProfile();
    if (profile.length === 0) return svg``;

    return svg`${profile.map(entry => {
      const y = TANK.y + TANK.height * entry.ratio;
      const name = entry.sensor.name
        || this.hass?.states?.[entry.sensor.entity]?.attributes?.friendly_name
        || entry.sensor.entity;

      return svg`
        <g class="sensor-marker" @click=${(e: Event) => { e.stopPropagation(); this.showMoreInfo(entry.sensor.entity); }}>
          <title>${name}: ${entry.temp.toFixed(1)} °C</title>
          <line x1="${TANK.x + 2}" y1="${y}" x2="${TANK.x + TANK.width - 2}" y2="${y}"
                class="marker-line"/>
          <circle cx="${TANK.x + 7}" cy="${y}" r="3" fill="#ffffff" opacity="0.9"/>
          <rect x="${TANK.x + TANK.width - 42}" y="${y - 8}" width="38" height="16" rx="8"
                fill="rgba(0, 0, 0, 0.42)"/>
          <text x="${TANK.x + TANK.width - 23}" y="${y + 4}" class="marker-label" text-anchor="middle">
            ${entry.temp.toFixed(1)}°
          </text>
        </g>
      `;
    })}`;
  }

  private renderPipes(): TemplateResult {
    if (!this.config.show_pipes) return svg``;

    const flowing = this.isHeatingActive() && this.config.advanced_animations;

    return svg`
      <g class="pipes">
        <!-- Hot water outlet -->
        <line x1="${TANK.x + TANK.width - 6}" y1="72" x2="182" y2="72" class="pipe pipe-hot"/>
        ${flowing ? svg`<line x1="${TANK.x + TANK.width - 6}" y1="72" x2="182" y2="72" class="pipe-flow flow-out"/>` : svg``}
        <circle cx="182" cy="72" r="4" class="pipe-cap pipe-hot-cap"/>

        <!-- Cold water inlet -->
        <line x1="${TANK.x + TANK.width - 6}" y1="228" x2="182" y2="228" class="pipe pipe-cold"/>
        ${flowing ? svg`<line x1="182" y1="228" x2="${TANK.x + TANK.width - 6}" y2="228" class="pipe-flow flow-in"/>` : svg``}
        <circle cx="182" cy="228" r="4" class="pipe-cap pipe-cold-cap"/>
      </g>
    `;
  }

  /** Control panel on top of the tank showing the average temperature and a status LED. */
  private renderDisplayPanel(avgTemp: number | null): TemplateResult {
    if (!this.config.show_display_panel) return svg``;

    const status = this.getStatus();
    const target = this.getTargetTemperature();

    return svg`
      <g class="display-panel">
        <rect x="56" y="10" width="88" height="32" rx="7" class="panel-bg"/>
        <circle cx="67" cy="26" r="3.5" class="panel-led led-${status.className}"/>
        <text x="106" y="31" text-anchor="middle" class="panel-temp">
          ${avgTemp !== null ? `${avgTemp.toFixed(1)}°` : '--'}
        </text>
        ${target !== null ? svg`<text x="136" y="39" text-anchor="end" class="panel-target">🎯 ${target.toFixed(0)}°</text>` : svg``}
        <title>${this.t(status.key)}${avgTemp !== null ? ` · ${avgTemp.toFixed(1)} °C` : ''}</title>
      </g>
    `;
  }

  private renderBoilerSVG(): TemplateResult {
    const colors = this.getColors();
    const avgTemp = this.getAverageTemperature();
    const strokeColor = colors.boiler_stroke || DEFAULT_COLORS.boiler_stroke;
    const isCompact = this.config.display_mode === 'compact';
    const useLayers = this.config.show_stratification && this.config.stratification_style === 'layers';
    const infoEntity = this.config.control_entity || this.config.heating_entity;

    return html`
      <svg
        class="boiler-svg ${isCompact ? 'compact' : ''} ${this.config.enable_more_info && infoEntity ? 'clickable' : ''}"
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="${this.t('average_temp')}: ${avgTemp !== null ? avgTemp.toFixed(1) : '--'} °C"
        @click=${() => this.showMoreInfo(infoEntity)}
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            ${this.renderWaterGradientStops()}
          </linearGradient>

          <linearGradient id="tankShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
            <stop offset="35%" stop-color="#ffffff" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.18"/>
          </linearGradient>

          <clipPath id="tankClip">
            <rect x="${TANK.x}" y="${TANK.y}" width="${TANK.width}" height="${TANK.height}"
                  rx="${TANK.radius}" ry="${TANK.radius}"/>
          </clipPath>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Legs -->
        ${this.config.show_legs ? svg`
          <g class="legs">
            <rect x="64" y="248" width="9" height="20" rx="2" class="leg"/>
            <rect x="127" y="248" width="9" height="20" rx="2" class="leg"/>
            <rect x="56" y="266" width="88" height="5" rx="2.5" class="leg-base"/>
          </g>
        ` : svg``}

        <!-- Insulation jacket -->
        ${this.config.show_insulation ? svg`
          <rect x="${TANK.x - 7}" y="${TANK.y - 7}" width="${TANK.width + 14}" height="${TANK.height + 14}"
                rx="${TANK.radius + 5}" ry="${TANK.radius + 5}" class="insulation"/>
        ` : svg``}

        ${this.renderPipes()}

        <!-- Water body -->
        <g clip-path="url(#tankClip)">
          ${useLayers
            ? this.renderStratificationLayers()
            : svg`<rect x="${TANK.x}" y="${TANK.y}" width="${TANK.width}" height="${TANK.height}" fill="url(#waterGradient)"/>`}

          ${this.renderHotWaterLevel()}
          ${this.renderHeatingElement()}
          ${this.renderBubbles()}

          <rect x="${TANK.x}" y="${TANK.y}" width="${TANK.width}" height="${TANK.height}" fill="url(#tankShine)"/>
          ${this.renderSensorMarkers()}
        </g>

        <!-- Tank outline -->
        <rect x="${TANK.x}" y="${TANK.y}" width="${TANK.width}" height="${TANK.height}"
              rx="${TANK.radius}" ry="${TANK.radius}"
              fill="none" stroke="${strokeColor}" stroke-width="2.5"/>

        ${this.renderScale()}

        ${this.renderDisplayPanel(avgTemp)}
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // HTML rendering
  // ---------------------------------------------------------------------------

  private renderTrend(entityId: string): TemplateResult | typeof nothing {
    const trend = this.getTrend(entityId);
    if (!trend) return nothing;

    const icon = trend.direction === 'up' ? '▲' : trend.direction === 'down' ? '▼' : '▬';

    return html`
      <span class="trend trend-${trend.direction}" title="${trend.delta >= 0 ? '+' : ''}${trend.delta.toFixed(1)} °C">
        ${icon} ${Math.abs(trend.delta) >= 0.1 ? `${trend.delta > 0 ? '+' : '−'}${Math.abs(trend.delta).toFixed(1)}°` : ''}
      </span>
    `;
  }

  private renderSparkline(entityId: string): TemplateResult {
    if (!this.config.show_sparkline) return html``;

    const history = this.tempHistory.get(entityId);
    if (!history || history.length < 2) return html``;

    const values = history.map(h => h.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    const width = 48;
    const height = 20;
    const points = values.map((val, idx) => {
      const x = (idx / (values.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return html`
      <svg class="sparkline" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <polyline fill="none" stroke="currentColor" stroke-width="1.5" points="${points}"/>
      </svg>
    `;
  }

  private renderSensor(sensor: SensorConfig): TemplateResult {
    const state = this.hass?.states?.[sensor.entity];
    const temp = this.getSensorValue(sensor.entity);
    const unit = state?.attributes?.unit_of_measurement || '°C';
    const name = sensor.name || state?.attributes?.friendly_name || sensor.entity;
    const color = this.getTemperatureColor(temp, true);
    const isCompact = this.config.display_mode === 'compact';
    const entityExists = !!state;

    return html`
      <div
        class="sensor-row ${this.config.enable_more_info ? 'clickable' : ''} ${isCompact ? 'compact' : ''} ${!entityExists ? 'unavailable' : ''}"
        @click=${() => this.showMoreInfo(sensor.entity)}
        title="${!entityExists ? `${this.t('unavailable_entity')}: ${sensor.entity}` : name}"
      >
        <div class="sensor-info">
          <div class="sensor-label">
            ${!entityExists ? '⚠️ ' : ''}${name}
          </div>
          ${this.renderSparkline(sensor.entity)}
        </div>
        <div class="sensor-readout">
          ${this.renderTrend(sensor.entity)}
          <div class="sensor-value" style="color: ${color}">
            ${temp !== null ? temp.toFixed(1) : (entityExists ? '--' : 'N/A')} ${unit}
          </div>
        </div>
      </div>
    `;
  }

  /** Compact overview chips - status, hot water, power, target. */
  private renderStatusBadges(): TemplateResult {
    if (!this.config.show_status_badges) return html``;

    const status = this.getStatus();
    const avgTemp = this.getAverageTemperature();
    const target = this.getTargetTemperature();
    const stats = this.getWaterStats();
    const consumption = this.getPowerConsumption();

    return html`
      <div class="badges">
        <div class="badge badge-${status.className}">
          <span class="badge-icon">${status.icon}</span>
          <span>${this.t(status.key)}</span>
        </div>

        ${avgTemp !== null ? html`
          <div class="badge">
            <span class="badge-icon">🌡️</span>
            <span style="color: ${this.getTemperatureColor(avgTemp, true)}">${avgTemp.toFixed(1)} °C</span>
          </div>
        ` : ''}

        ${target !== null ? html`
          <div class="badge">
            <span class="badge-icon">🎯</span>
            <span>${target.toFixed(1)} °C</span>
          </div>
        ` : ''}

        ${stats ? html`
          <div class="badge">
            <span class="badge-icon">🚿</span>
            <span>${Math.round(stats.usableLiters)} l</span>
          </div>
        ` : ''}

        ${consumption && consumption.power > 0 ? html`
          <div class="badge">
            <span class="badge-icon">⚡</span>
            <span>${(consumption.power / 1000).toFixed(2)} kW</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  /** Usable hot water, showers left, stored energy and measured standby loss. */
  private renderWaterStats(): TemplateResult {
    if (!this.config.show_water_stats) return html``;

    const stats = this.getWaterStats();
    const heatLoss = this.config.show_heat_loss ? this.getHeatLoss() : null;

    if (!stats && !heatLoss) return html``;

    return html`
      <div class="water-stats">
        ${stats ? html`
          <div class="stat">
            <div class="stat-label">💧 ${this.t('hot_water')}</div>
            <div class="stat-value">${Math.round(stats.usableLiters)} l</div>
            <div class="stat-sub">≈ ${stats.showers.toFixed(1)} ${this.t('showers')}</div>
          </div>

          <div class="stat">
            <div class="stat-label">🔋 ${this.t('stored_energy')}</div>
            <div class="stat-value">${stats.storedEnergy.toFixed(1)} kWh</div>
            ${this.config.energy_cost ? html`
              <div class="stat-sub">≈ ${(stats.storedEnergy * this.config.energy_cost).toFixed(2)} ${this.config.currency || ''}</div>
            ` : ''}
          </div>
        ` : ''}

        ${heatLoss ? html`
          <div class="stat">
            <div class="stat-label">📉 ${this.t('heat_loss')}</div>
            <div class="stat-value">${heatLoss.ratePerHour.toFixed(1)} °C/h</div>
            ${heatLoss.hoursToThreshold !== null && heatLoss.hoursToThreshold > 0 ? html`
              <div class="stat-sub">${this.t('time_to_cold')} ${this.formatDuration(heatLoss.hoursToThreshold)}</div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderEnergyInfo(): TemplateResult {
    const consumption = this.getPowerConsumption();
    const today = this.getEnergyToday();
    if (!consumption && !today) return html``;

    return html`
      <div class="energy-info">
        <div class="energy-label">💡 ${this.t('power_consumption')}</div>
        <div class="energy-values">
          ${consumption ? html`
            <div class="energy-power">${(consumption.power / 1000).toFixed(2)} kW</div>
            ${this.config.energy_cost ? html`
              <div class="energy-cost">${consumption.cost.toFixed(2)} ${this.config.currency || ''}/h</div>
            ` : ''}
          ` : ''}
        </div>
        ${today ? html`
          <div class="energy-values energy-today">
            <div class="energy-today-label">${this.t('energy_today')}</div>
            <div class="energy-power">${today.energy.toFixed(2)} ${today.unit}</div>
            ${this.config.energy_cost ? html`
              <div class="energy-cost">${today.cost.toFixed(2)} ${this.config.currency || ''}</div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderHeatingSources(): TemplateResult {
    const activeSources = this.getActiveHeatingSources();

    // Legacy single source
    if (this.config.heating_entity && !this.config.heating_sources) {
      if (!this.isHeating()) return html``;

      return html`
        <div class="heating-indicator ${this.config.display_mode === 'compact' ? 'compact' : ''}">
          <span class="heating-icon">${this.getHeatingIcon(this.config.heating_type || 'electric')}</span>
          <span>${this.getHeatingLabel(this.config.heating_type || 'electric')}</span>
        </div>
      `;
    }

    if (activeSources.length === 0) return html``;

    return html`
      <div class="heating-sources">
        ${activeSources.map(source => html`
          <div class="heating-source ${this.config.display_mode === 'compact' ? 'compact' : ''}">
            <span class="heating-icon">${this.getHeatingIcon(source.type)}</span>
            <span>${source.name || this.getHeatingLabel(source.type)}</span>
            ${source.priority ? html`<span class="priority">P${source.priority}</span>` : ''}
          </div>
        `)}
      </div>
    `;
  }

  /** Target temperature readout, optionally with +/- buttons. */
  private renderTargetTemp(): TemplateResult {
    const target = this.getTargetTemperature();
    if (target === null) return html``;

    const timeToTarget = this.calculateTimeToTarget();
    const isCompact = this.config.display_mode === 'compact';
    const editable = !!this.config.show_target_control && this.canSetTargetTemperature();

    return html`
      <div class="target-temp ${isCompact ? 'compact' : ''}">
        ${editable ? html`
          <div class="target-control">
            <button class="step-button" @click=${(e: Event) => { e.stopPropagation(); this.setTargetTemperature(-1); }}
                    aria-label="-">−</button>
            <div class="target-value">${target.toFixed(1)} °C</div>
            <button class="step-button" @click=${(e: Event) => { e.stopPropagation(); this.setTargetTemperature(1); }}
                    aria-label="+">+</button>
          </div>
        ` : html`
          <div>${this.t('target')}: ${target.toFixed(1)} °C</div>
        `}
        ${timeToTarget ? html`<div class="time-estimate">⏱️ ${timeToTarget}</div>` : ''}
      </div>
    `;
  }

  private renderOperationModes(): TemplateResult {
    if (!this.config.show_operation_modes) return html``;

    const modes = this.getOperationModes();
    if (!modes) return html``;

    return html`
      <div class="operation-modes">
        <div class="operation-label">${this.t('operation_mode')}</div>
        <div class="operation-chips">
          ${modes.modes.map(mode => html`
            <button
              class="mode-chip ${mode === modes.current ? 'active' : ''}"
              @click=${() => this.setOperationMode(mode)}
            >
              ${this.t(`mode_${mode.replace(/\s+/g, '_').toLowerCase()}`) || mode}
            </button>
          `)}
        </div>
      </div>
    `;
  }

  /** Larger temperature chart built from the history the card collects. */
  private renderHistoryChart(): TemplateResult {
    if (!this.config.show_history_chart) return html``;

    const history = this.tempHistory.get('average') || [];

    return html`
      <div class="history-section">
        <button class="history-header" @click=${() => { this.chartExpanded = !this.chartExpanded; }}>
          <span>📈 ${this.t('history')}</span>
          <span class="history-toggle">${this.chartExpanded ? '▾' : '▸'}</span>
        </button>

        ${this.chartExpanded ? (history.length < 2
          ? html`<div class="no-history">${this.t('no_history')}</div>`
          : this.renderChartSvg(history)) : ''}
      </div>
    `;
  }

  private renderChartSvg(history: TempHistory[]): TemplateResult {
    const width = 300;
    const height = 120;
    const padding = { top: 10, right: 8, bottom: 18, left: 28 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const target = this.getTargetTemperature();
    const values = history.map(h => h.value);
    if (target !== null) values.push(target);

    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const pad = Math.max(1, (rawMax - rawMin) * 0.15);
    const minVal = rawMin - pad;
    const maxVal = rawMax + pad;
    const range = maxVal - minVal || 1;

    const firstTs = history[0].timestamp;
    const lastTs = history[history.length - 1].timestamp;
    const timeSpan = lastTs - firstTs || 1;

    const toX = (ts: number): number => padding.left + ((ts - firstTs) / timeSpan) * plotWidth;
    const toY = (value: number): number => padding.top + (1 - (value - minVal) / range) * plotHeight;

    const points = history.map(h => `${toX(h.timestamp).toFixed(1)},${toY(h.value).toFixed(1)}`);
    const linePath = `M ${points.join(' L ')}`;
    const areaPath = `${linePath} L ${padding.left + plotWidth},${padding.top + plotHeight} L ${padding.left},${padding.top + plotHeight} Z`;

    // Shade the stretches where a heat source was running.
    const heatingBands: TemplateResult[] = [];
    let bandStart: number | null = null;
    history.forEach((point, index) => {
      if (point.heating && bandStart === null) bandStart = point.timestamp;
      const isLast = index === history.length - 1;
      if ((!point.heating || isLast) && bandStart !== null) {
        const start = bandStart;
        heatingBands.push(svg`
          <rect x="${toX(start)}" y="${padding.top}" width="${Math.max(1, toX(point.timestamp) - toX(start))}"
                height="${plotHeight}" class="chart-heating-band"/>
        `);
        bandStart = null;
      }
    });

    const formatTime = (ts: number): string =>
      new Date(ts).toLocaleTimeString(this.hass?.locale?.language || undefined, { hour: '2-digit', minute: '2-digit' });

    return html`
      <svg class="history-chart" viewBox="0 0 ${width} ${height}" role="img">
        <defs>
          <linearGradient id="chartArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="var(--primary-color, #03a9f4)" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="var(--primary-color, #03a9f4)" stop-opacity="0.02"/>
          </linearGradient>
        </defs>

        ${heatingBands}

        ${[maxVal, (maxVal + minVal) / 2, minVal].map(value => svg`
          <line x1="${padding.left}" y1="${toY(value)}" x2="${width - padding.right}" y2="${toY(value)}"
                class="chart-grid"/>
          <text x="${padding.left - 4}" y="${toY(value) + 3}" class="chart-label" text-anchor="end">
            ${value.toFixed(0)}°
          </text>
        `)}

        ${target !== null ? svg`
          <line x1="${padding.left}" y1="${toY(target)}" x2="${width - padding.right}" y2="${toY(target)}"
                class="chart-target"/>
        ` : svg``}

        <path d="${areaPath}" fill="url(#chartArea)"/>
        <path d="${linePath}" class="chart-line"/>
        <circle cx="${toX(lastTs)}" cy="${toY(history[history.length - 1].value)}" r="3" class="chart-dot"/>

        <text x="${padding.left}" y="${height - 4}" class="chart-label">${formatTime(firstTs)}</text>
        <text x="${width - padding.right}" y="${height - 4}" class="chart-label" text-anchor="end">${formatTime(lastTs)}</text>
      </svg>
    `;
  }

  private renderMaintenanceInfo(): TemplateResult {
    const anodeDays = this.getDaysSince(this.config.anode_last_change);
    const cleaningDays = this.getDaysSince(this.config.cleaning_last_date);

    const anodeStatus = this.getMaintenanceStatus(anodeDays, this.config.anode_change_interval || 365);
    const cleaningStatus = this.getMaintenanceStatus(cleaningDays, this.config.cleaning_interval || 180);

    if (anodeDays !== null && (anodeStatus.status === 'overdue' || anodeStatus.status === 'warning')) {
      this.sendNotification('maintenance_due', `${this.t('anode_check')}: ${anodeStatus.text}`);
    }
    if (cleaningDays !== null && (cleaningStatus.status === 'overdue' || cleaningStatus.status === 'warning')) {
      this.sendNotification('maintenance_due', `${this.t('cleaning_check')}: ${cleaningStatus.text}`);
    }

    if (anodeDays === null && cleaningDays === null) {
      return html``;
    }

    return html`
      <div class="maintenance-section">
        <div class="maintenance-title">${this.t('maintenance')}</div>

        ${anodeDays !== null ? html`
          <div class="maintenance-item ${anodeStatus.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🔧</span>
              ${this.t('anode')}
            </div>
            <div class="maintenance-value">${anodeStatus.text}</div>
          </div>
        ` : ''}

        ${cleaningDays !== null ? html`
          <div class="maintenance-item ${cleaningStatus.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🧹</span>
              ${this.t('cleaning')}
            </div>
            <div class="maintenance-value">${cleaningStatus.text}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderAlerts(): TemplateResult {
    const alerts = this.checkAlerts();
    const avgTemp = this.getAverageTemperature();
    const hasLowTempWarning = this.hasLowTempWarning();

    if (alerts.length === 0 && !hasLowTempWarning) return html``;

    if (hasLowTempWarning && avgTemp !== null) {
      this.sendNotification('low_temperature', `${this.t('low_temperature')} (${avgTemp.toFixed(1)}°C)`);
    }

    return html`
      ${hasLowTempWarning ? html`
        <div class="warning-banner">
          <span class="warning-icon">⚠️</span>
          <span>${this.t('low_temperature')} (${avgTemp?.toFixed(1)}°C)</span>
        </div>
      ` : ''}

      ${alerts.map(alert => {
        this.sendNotification(alert.type, alert.message || this.t(alert.type));

        return html`
          <div class="warning-banner alert-${alert.type}">
            <span class="warning-icon">
              ${alert.type === 'legionella_risk' ? '🦠' :
                alert.type === 'temperature_drop' ? '❄️' : '⚡'}
            </span>
            <span>${alert.message || this.t(alert.type)}</span>
          </div>
        `;
      })}
    `;
  }

  private renderControlButton(): TemplateResult {
    if (!this.config.show_control_button || !this.config.control_entity) {
      return html``;
    }

    const isOn = this.getControlState();
    const state = this.hass?.states?.[this.config.control_entity];
    if (!state) return html``;

    const buttonStyle = this.config.button_style || 'default';

    if (buttonStyle === 'switch') {
      return html`
        <div class="control-section control-section-switch">
          <span class="control-label-left">${this.t('control')}</span>
          <label class="switch">
            <input type="checkbox" .checked=${isOn} @change=${() => this.toggleControlEntity()}>
            <span class="slider"></span>
          </label>
        </div>
      `;
    }

    if (buttonStyle === 'icon') {
      return html`
        <div class="control-section control-section-icon">
          <button
            class="control-button-icon ${isOn ? 'on' : 'off'}"
            @click=${() => this.toggleControlEntity()}
            title="${isOn ? this.t('turn_off') : this.t('turn_on')}"
          >
            <span class="power-icon">⏻</span>
          </button>
        </div>
      `;
    }

    if (buttonStyle === 'minimal') {
      return html`
        <div class="control-section control-section-minimal">
          <button
            class="control-button-minimal ${isOn ? 'on' : 'off'}"
            @click=${() => this.toggleControlEntity()}
            title="${this.t('control')}"
          >
            ${isOn ? this.t('turn_off') : this.t('turn_on')}
          </button>
        </div>
      `;
    }

    return html`
      <div class="control-section">
        <button
          class="control-button ${isOn ? 'on' : 'off'}"
          @click=${() => this.toggleControlEntity()}
          title="${this.t('control')}"
        >
          <span class="control-icon">${isOn ? '🔴' : '⚪'}</span>
          <span class="control-label">${isOn ? this.t('turn_off') : this.t('turn_on')}</span>
        </button>
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const avgTemp = this.getAverageTemperature();
    const isCompact = this.config.display_mode === 'compact';
    const layoutStyle = this.config.layout_style || 'default';

    const sortedSensors = [...(this.config.sensors || [])].sort((a, b) => {
      return (a.position || 0) - (b.position || 0);
    });

    return html`
      <ha-card class="layout-${layoutStyle}">
        <div class="card-content ${isCompact ? 'compact' : ''}">
          ${this.config.title ? html`<h2 class="card-title">${this.config.title}</h2>` : ''}

          ${this.renderStatusBadges()}

          ${this.renderAlerts()}

          ${this.renderControlButton()}

          ${this.renderOperationModes()}

          <div class="boiler-container ${isCompact ? 'compact' : ''} layout-${layoutStyle}">
            <div class="boiler-visual">
              ${this.renderBoilerSVG()}
              ${this.renderHeatingSources()}
              ${this.renderTargetTemp()}
              ${this.renderEnergyInfo()}
            </div>

            <div class="sensors-panel ${isCompact ? 'compact' : ''}">
              ${sortedSensors.length > 0 ? html`
                <div class="sensors-list">
                  ${sortedSensors.map(sensor => this.renderSensor(sensor))}
                </div>
              ` : html`
                <div class="no-sensors">${this.t('no_sensors')}</div>
              `}

              ${this.config.show_average && avgTemp !== null ? html`
                <div class="average-temp ${isCompact ? 'compact' : ''}">
                  <div class="sensor-label">${this.t('average_temp')}</div>
                  <div class="sensor-value average" style="color: ${this.getTemperatureColor(avgTemp, true)}">
                    ${avgTemp.toFixed(1)}°C
                  </div>
                </div>
              ` : ''}

              ${this.renderWaterStats()}

              ${this.renderMaintenanceInfo()}
            </div>
          </div>

          ${this.renderHistoryChart()}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-title {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .card-content {
        padding: 0;
      }

      .card-content.compact {
        font-size: 0.9em;
      }

      /* Status badges */
      .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 16px;
        background: var(--secondary-background-color);
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      .badge-icon {
        font-size: 14px;
        line-height: 1;
      }

      .badge-heating {
        background: rgba(255, 107, 53, 0.18);
        color: #FF6B35;
      }

      .badge-cooling {
        background: rgba(33, 150, 243, 0.18);
        color: #2196F3;
      }

      .badge-ready {
        background: rgba(76, 175, 80, 0.18);
        color: #4CAF50;
      }

      .warning-banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: rgba(255, 152, 0, 0.15);
        border-left: 4px solid #ff9800;
        border-radius: 4px;
        margin-bottom: 16px;
        font-weight: 500;
        color: #ff9800;
      }

      .warning-icon {
        font-size: 20px;
      }

      .control-section {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }

      .control-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 24px;
        border: none;
        border-radius: 24px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .control-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .control-button:active {
        transform: translateY(0);
      }

      .control-button.on {
        background: linear-gradient(135deg, #f44336 0%, #e53935 100%);
        color: white;
      }

      .control-button.off {
        background: linear-gradient(135deg, #78909c 0%, #607d8b 100%);
        color: white;
      }

      .control-icon {
        font-size: 20px;
      }

      .control-label {
        user-select: none;
      }

      /* Button Style Variants (v1.5.0) */
      .control-section-switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        margin-bottom: 16px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }

      .control-label-left {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 51px;
        height: 28px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 28px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #4CAF50;
      }

      input:checked + .slider:before {
        transform: translateX(23px);
      }

      .control-section-icon {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }

      .control-button-icon {
        width: 56px;
        height: 56px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .control-button-icon.on {
        background: #4CAF50;
        color: white;
      }

      .control-button-icon.off {
        background: #9E9E9E;
        color: white;
      }

      .control-button-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .power-icon {
        font-size: 28px;
        font-weight: bold;
      }

      .control-section-minimal {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }

      .control-button-minimal {
        padding: 8px 20px;
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        background: transparent;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .control-button-minimal.on {
        border-color: #4CAF50;
        color: #4CAF50;
      }

      .control-button-minimal.off {
        border-color: var(--secondary-text-color);
        color: var(--secondary-text-color);
      }

      .control-button-minimal:hover {
        background: var(--secondary-background-color);
      }

      /* Operation modes (v1.6.0) */
      .operation-modes {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }

      .operation-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .operation-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .mode-chip {
        padding: 6px 14px;
        border: 1px solid var(--divider-color);
        border-radius: 16px;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 13px;
        cursor: pointer;
        transition: background 0.2s, border-color 0.2s;
      }

      .mode-chip:hover {
        background: var(--secondary-background-color);
      }

      .mode-chip.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }

      /* Layout Style Variants (v1.5.0) */
      .layout-horizontal .boiler-container {
        flex-direction: row;
        max-width: 100%;
      }

      .layout-horizontal .boiler-visual {
        min-width: 180px;
      }

      .layout-horizontal .boiler-svg {
        width: 180px;
        height: 270px;
      }

      .layout-minimal .boiler-container {
        gap: 16px;
      }

      .layout-minimal .boiler-visual {
        min-width: 150px;
      }

      .layout-minimal .boiler-svg {
        width: 150px;
        height: 225px;
      }

      .layout-minimal .card-title {
        font-size: 20px;
        margin-bottom: 12px;
      }

      .layout-minimal .sensor-row {
        padding: 8px 12px;
      }

      .layout-minimal .sensor-value {
        font-size: 16px;
      }

      .layout-wide .boiler-container {
        gap: 32px;
      }

      .layout-wide .boiler-visual {
        min-width: 250px;
      }

      .layout-wide .boiler-svg {
        width: 250px;
        height: 375px;
      }

      .layout-wide .sensor-row {
        padding: 14px;
      }

      .layout-wide .sensor-value {
        font-size: 22px;
      }

      .boiler-container {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        overflow: hidden;
      }

      .boiler-container.compact {
        gap: 16px;
      }

      .boiler-visual {
        flex: 0 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        min-width: 200px;
      }

      .boiler-visual.compact {
        min-width: 150px;
      }

      .boiler-svg {
        width: 200px;
        height: 300px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12));
      }

      .boiler-svg.compact {
        width: 150px;
        height: 225px;
      }

      .boiler-svg.clickable {
        cursor: pointer;
      }

      /* SVG parts (v1.6.0) */
      .insulation {
        fill: var(--divider-color, #b0bec5);
        opacity: 0.35;
      }

      .leg, .leg-base {
        fill: var(--secondary-text-color, #78909c);
        opacity: 0.55;
      }

      .panel-bg {
        fill: #263238;
        opacity: 0.9;
      }

      .panel-temp {
        fill: #ffffff;
        font-size: 17px;
        font-weight: 700;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .panel-target {
        fill: #ffffff;
        font-size: 7px;
        opacity: 0.8;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .panel-led {
        fill: #9e9e9e;
      }

      .led-heating {
        fill: #FF6B35;
        animation: pulse 1.5s ease-in-out infinite;
      }

      .led-ready {
        fill: #4CAF50;
      }

      .led-cooling {
        fill: #42A5F5;
      }

      .pipe {
        stroke-width: 7;
        stroke-linecap: round;
      }

      .pipe-hot {
        stroke: #EF5350;
      }

      .pipe-cold {
        stroke: #42A5F5;
      }

      .pipe-cap {
        fill: var(--secondary-text-color, #78909c);
      }

      .pipe-flow {
        stroke: #ffffff;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-dasharray: 4 8;
        opacity: 0.85;
        animation: flow-dash 1.2s linear infinite;
      }

      .flow-in {
        animation-direction: reverse;
      }

      .scale-tick {
        stroke: var(--secondary-text-color, #9e9e9e);
        stroke-width: 1;
        opacity: 0.7;
      }

      .scale-label {
        fill: var(--secondary-text-color, #9e9e9e);
        font-size: 9px;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .target-line {
        stroke: var(--primary-color, #03a9f4);
        stroke-width: 1.5;
        stroke-dasharray: 4 3;
        opacity: 0.9;
      }

      .target-arrow {
        fill: var(--primary-color, #03a9f4);
      }

      .marker-line {
        stroke: #ffffff;
        stroke-width: 0.75;
        stroke-dasharray: 2 3;
        opacity: 0.45;
      }

      .marker-label, .level-label {
        fill: #ffffff;
        font-size: 10px;
        font-weight: 600;
        font-family: var(--paper-font-body1_-_font-family, inherit);
        paint-order: stroke;
        stroke: rgba(0, 0, 0, 0.35);
        stroke-width: 0.6px;
      }

      .sensor-marker {
        cursor: pointer;
      }

      /* Animations */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes bubble-rise {
        0% { transform: translateY(0); opacity: 0.7; }
        100% { transform: translateY(-185px); opacity: 0; }
      }

      @keyframes flow-dash {
        from { stroke-dashoffset: 12; }
        to { stroke-dashoffset: 0; }
      }

      .heating-element.active path {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .bubble {
        animation: bubble-rise 3s ease-in infinite;
      }

      .bubble-1 { animation-delay: 0s; animation-duration: 3s; }
      .bubble-2 { animation-delay: 0.7s; animation-duration: 3.5s; }
      .bubble-3 { animation-delay: 1.4s; animation-duration: 2.8s; }
      .bubble-4 { animation-delay: 2.1s; animation-duration: 3.2s; }
      .bubble-5 { animation-delay: 1.1s; animation-duration: 3.8s; }

      @media (prefers-reduced-motion: reduce) {
        .bubble, .pipe-flow, .heating-element.active path,
        .heating-indicator, .heating-source, .led-heating {
          animation: none;
        }
      }

      /* Heating indicators */
      .heating-indicator, .heating-source {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255, 107, 53, 0.2);
        border-radius: 20px;
        font-weight: 500;
        color: #FF6B35;
        animation: pulse 2s ease-in-out infinite;
      }

      .heating-sources {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .heating-indicator.compact, .heating-source.compact {
        padding: 6px 12px;
        font-size: 0.9em;
      }

      .heating-icon {
        font-size: 20px;
      }

      .priority {
        font-size: 0.8em;
        opacity: 0.7;
        margin-left: auto;
      }

      /* Energy info */
      .energy-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 12px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        font-size: 13px;
        width: 100%;
        box-sizing: border-box;
      }

      .energy-label {
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .energy-values {
        display: flex;
        gap: 12px;
        align-items: baseline;
      }

      .energy-today {
        border-top: 1px solid var(--divider-color);
        padding-top: 4px;
        margin-top: 2px;
      }

      .energy-today-label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .energy-power {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-color);
      }

      .energy-cost {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .target-temp {
        padding: 6px 12px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        font-size: 14px;
        color: var(--secondary-text-color);
        text-align: center;
      }

      .target-temp.compact {
        padding: 4px 8px;
        font-size: 12px;
      }

      .target-control {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .target-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        font-variant-numeric: tabular-nums;
        min-width: 70px;
      }

      .step-button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.15s ease, opacity 0.15s ease;
      }

      .step-button:hover {
        transform: scale(1.1);
      }

      .step-button:active {
        opacity: 0.7;
      }

      .time-estimate {
        margin-top: 4px;
        font-size: 12px;
        color: var(--primary-color);
        font-weight: 500;
      }

      .sensors-panel {
        flex: 1 1 240px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 240px;
        max-width: 100%;
        overflow: hidden;
      }

      .sensors-panel.compact {
        gap: 12px;
      }

      .sensors-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .sensor-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
        transition: transform 0.2s, box-shadow 0.2s;
        min-width: 0;
        overflow: hidden;
      }

      .sensor-row.compact {
        padding: 8px 10px;
      }

      .sensor-row.clickable {
        cursor: pointer;
      }

      .sensor-row.clickable:hover {
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .sensor-info {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        flex: 1;
      }

      .sensor-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
      }

      .sensor-readout {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-shrink: 0;
      }

      .sensor-value {
        font-size: 20px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .sensor-row.compact .sensor-value {
        font-size: 16px;
      }

      .trend {
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0.9;
      }

      .trend-up {
        color: var(--error-color, #f44336);
      }

      .trend-down {
        color: var(--info-color, #2196f3);
      }

      .trend-flat {
        color: var(--secondary-text-color);
      }

      /* Sparkline */
      .sparkline {
        opacity: 0.6;
        color: var(--primary-color);
      }

      .sensor-row.unavailable {
        opacity: 0.6;
        background: rgba(244, 67, 54, 0.1);
        border: 1px solid var(--error-color, #f44336);
      }

      .sensor-row.unavailable .sensor-value {
        color: var(--error-color, #f44336) !important;
      }

      .average-temp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: var(--primary-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 12px;
        margin-top: 8px;
      }

      .average-temp.compact {
        padding: 12px;
      }

      .sensor-value.average {
        font-size: 24px;
      }

      .average-temp.compact .sensor-value.average {
        font-size: 20px;
      }

      /* Water statistics (v1.6.0) */
      .water-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }

      .stat {
        padding: 10px 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
        min-width: 0;
      }

      .stat-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        font-variant-numeric: tabular-nums;
        margin-top: 2px;
      }

      .stat-sub {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      /* History chart (v1.6.0) */
      .history-section {
        margin-top: 16px;
        border-top: 1px solid var(--divider-color);
        padding-top: 8px;
      }

      .history-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 4px;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }

      .history-toggle {
        color: var(--secondary-text-color);
      }

      .history-chart {
        width: 100%;
        height: auto;
      }

      .chart-grid {
        stroke: var(--divider-color, #cfd8dc);
        stroke-width: 0.5;
        opacity: 0.8;
      }

      .chart-label {
        fill: var(--secondary-text-color, #9e9e9e);
        font-size: 8px;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .chart-line {
        fill: none;
        stroke: var(--primary-color, #03a9f4);
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      .chart-dot {
        fill: var(--primary-color, #03a9f4);
      }

      .chart-target {
        stroke: var(--warning-color, #ff9800);
        stroke-width: 1;
        stroke-dasharray: 4 3;
      }

      .chart-heating-band {
        fill: #FF6B35;
        opacity: 0.12;
      }

      .no-history {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
        font-style: italic;
      }

      .maintenance-section {
        margin-top: 8px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .maintenance-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 12px;
      }

      .maintenance-item {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .maintenance-item:last-child {
        border-bottom: none;
      }

      .maintenance-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .maintenance-icon {
        font-size: 16px;
      }

      .maintenance-value {
        font-size: 13px;
        font-weight: 500;
      }

      .maintenance-item.ok .maintenance-value {
        color: var(--success-color, #4caf50);
      }

      .maintenance-item.warning .maintenance-value {
        color: var(--warning-color, #ff9800);
      }

      .maintenance-item.overdue .maintenance-value {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      .no-sensors {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      @media (max-width: 600px) {
        .boiler-container {
          flex-direction: column;
        }

        .boiler-svg {
          width: 170px;
          height: 255px;
        }

        .sensors-panel {
          width: 100%;
        }
      }
    `;
  }

  public getCardSize(): number {
    let size = this.config.display_mode === 'compact' ? 4 : 5;
    if (this.config.show_status_badges) size += 1;
    if (this.config.show_water_stats && this.config.tank_volume) size += 1;
    if (this.config.show_history_chart && this.chartExpanded) size += 2;
    return size;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('ha-boiler-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      type: 'custom:ha-boiler-card',
      title: 'Bojler',
      show_average: true,
      show_gradient: true,
      show_stratification: true,
      show_sparkline: false,
      display_mode: 'normal',
      heating_type: 'electric',
      min_temp: 0,
      max_temp: 80,
      enable_more_info: true,
      advanced_animations: true,
      show_scale: true,
      show_sensor_markers: true,
      show_display_panel: true,
      show_status_badges: true,
      tank_volume: 120,
      sensors: []
    };
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'custom:ha-boiler-card',
  name: 'Boiler Card',
  description: 'Custom card for displaying water heater with temperature sensors',
  preview: true,
  documentationURL: 'https://github.com/joshuaaaaa/HA-Water-Heater',
});

// eslint-disable-next-line no-console
console.info(
  `%c HA-BOILER-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);

declare global {
  interface HTMLElementTagNameMap {
    'ha-boiler-card': BoilerCard;
  }
}
