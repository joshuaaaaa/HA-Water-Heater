import { LitElement, html, css, PropertyValues, TemplateResult, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

interface BoilerCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  sensors?: SensorConfig[];
  heating_entity?: string;
  target_temp_entity?: string;
  show_average?: boolean;
  show_gradient?: boolean;
  show_stratification?: boolean;
  show_sparkline?: boolean;
  min_temp?: number;
  max_temp?: number;
  display_mode?: 'normal' | 'compact';
  heating_type?: 'electric' | 'solar' | 'gas' | 'heat_pump';
  low_temp_warning?: number;
  anode_last_change?: string;
  anode_change_interval?: number;
  cleaning_last_date?: string;
  cleaning_interval?: number;
  enable_more_info?: boolean;
  // Energy tracking
  power_entity?: string;
  energy_cost?: number;
  // Dual source heating
  heating_sources?: HeatingSource[];
  // Advanced animations
  advanced_animations?: boolean;
  // Custom colors
  colors?: ColorConfig;
  // Theme
  theme?: 'ocean' | 'sunset' | 'forest' | 'fire' | 'ice' | 'custom';
  // Alerts
  alerts?: AlertConfig[];
  // Notifications
  notifications?: NotificationConfig;
  // Localization
  language?: 'cs' | 'en' | 'de' | 'sk' | 'pl';
  custom_labels?: CustomLabels;
  // Control button
  control_entity?: string;
  show_control_button?: boolean;
}

interface SensorConfig {
  entity: string;
  name?: string;
  position?: number;
}

interface HeatingSource {
  entity: string;
  type: 'electric' | 'solar' | 'gas' | 'heat_pump';
  name?: string;
  priority?: number;
}

interface TempHistory {
  value: number;
  timestamp: number;
}

interface ColorConfig {
  boiler_fill?: string;
  boiler_stroke?: string;
  cold_water?: string;
  warm_water?: string;
  hot_water?: string;
  gradient_start?: string;
  gradient_end?: string;
}

interface AlertConfig {
  type: 'temperature_drop' | 'legionella_risk' | 'unusual_consumption';
  threshold?: number;
  min_temp?: number;
  duration?: number;
  message?: string;
  enabled?: boolean;
}

interface NotificationConfig {
  service?: string;
  events?: ('maintenance_due' | 'low_temperature' | 'high_consumption' | 'legionella_risk')[];
  enabled?: boolean;
  interval?: number; // Minutes between notifications (default 30)
}

interface CustomLabels {
  average_temp?: string;
  heating?: string;
  target?: string;
  anode_check?: string;
  cleaning_check?: string;
  days_remaining?: string;
  overdue?: string;
}

// Theme color presets
const THEMES: Record<string, ColorConfig> = {
  ocean: {
    boiler_fill: '#4DD0E1',
    boiler_stroke: '#0097A7',
    cold_water: '#B3E5FC',
    warm_water: '#4FC3F7',
    hot_water: '#0288D1',
    gradient_start: '#E1F5FE',
    gradient_end: '#01579B',
  },
  sunset: {
    boiler_fill: '#FF9800',
    boiler_stroke: '#E65100',
    cold_water: '#FFE0B2',
    warm_water: '#FFB74D',
    hot_water: '#E64A19',
    gradient_start: '#FFF3E0',
    gradient_end: '#BF360C',
  },
  forest: {
    boiler_fill: '#66BB6A',
    boiler_stroke: '#2E7D32',
    cold_water: '#C8E6C9',
    warm_water: '#81C784',
    hot_water: '#43A047',
    gradient_start: '#E8F5E9',
    gradient_end: '#1B5E20',
  },
  fire: {
    boiler_fill: '#FF5722',
    boiler_stroke: '#BF360C',
    cold_water: '#FFCCBC',
    warm_water: '#FF7043',
    hot_water: '#D84315',
    gradient_start: '#FBE9E7',
    gradient_end: '#4E342E',
  },
  ice: {
    boiler_fill: '#81D4FA',
    boiler_stroke: '#0277BD',
    cold_water: '#E1F5FE',
    warm_water: '#4FC3F7',
    hot_water: '#0288D1',
    gradient_start: '#F1F8FB',
    gradient_end: '#01579B',
  },
};

// Localization strings
const TRANSLATIONS: Record<string, Record<string, string>> = {
  cs: {
    average_temp: 'Průměrná teplota',
    heating: 'Topí se',
    target: 'Cílová teplota',
    anode_check: 'Kontrola anody',
    cleaning_check: 'Čištění',
    days_remaining: 'zbývá dní',
    overdue: 'po termínu',
    power_consumption: 'Spotřeba',
    heating_source: 'Zdroj ohřevu',
    low_temperature: 'Nízká teplota!',
    temperature_drop: 'Prudký pokles teploty!',
    legionella_risk: 'Riziko legionely - ohřejte na 60°C',
    unusual_consumption: 'Neobvyklá spotřeba energie',
    maintenance_due: 'Údržba je potřeba',
    turn_on: 'Zapnout',
    turn_off: 'Vypnout',
    control: 'Ovládání',
  },
  en: {
    average_temp: 'Average Temperature',
    heating: 'Heating',
    target: 'Target Temperature',
    anode_check: 'Anode Check',
    cleaning_check: 'Cleaning',
    days_remaining: 'days remaining',
    overdue: 'overdue',
    power_consumption: 'Consumption',
    heating_source: 'Heating Source',
    low_temperature: 'Low temperature!',
    temperature_drop: 'Rapid temperature drop!',
    legionella_risk: 'Legionella risk - heat to 60°C',
    unusual_consumption: 'Unusual energy consumption',
    maintenance_due: 'Maintenance required',
    turn_on: 'Turn On',
    turn_off: 'Turn Off',
    control: 'Control',
  },
  de: {
    average_temp: 'Durchschnittstemperatur',
    heating: 'Heizung',
    target: 'Zieltemperatur',
    anode_check: 'Anode Prüfung',
    cleaning_check: 'Reinigung',
    days_remaining: 'Tage übrig',
    overdue: 'überfällig',
    power_consumption: 'Verbrauch',
    heating_source: 'Heizquelle',
    low_temperature: 'Niedrige Temperatur!',
    temperature_drop: 'Schneller Temperaturabfall!',
    legionella_risk: 'Legionellen-Risiko - auf 60°C erhitzen',
    unusual_consumption: 'Ungewöhnlicher Energieverbrauch',
    maintenance_due: 'Wartung erforderlich',
    turn_on: 'Einschalten',
    turn_off: 'Ausschalten',
    control: 'Steuerung',
  },
  sk: {
    average_temp: 'Priemerná teplota',
    heating: 'Kúrenie',
    target: 'Cieľová teplota',
    anode_check: 'Kontrola anódy',
    cleaning_check: 'Čistenie',
    days_remaining: 'zostáva dní',
    overdue: 'po termíne',
    power_consumption: 'Spotreba',
    heating_source: 'Zdroj kúrenia',
    low_temperature: 'Nízka teplota!',
    temperature_drop: 'Prudký pokles teploty!',
    legionella_risk: 'Riziko legionely - ohrejte na 60°C',
    unusual_consumption: 'Neobvyklá spotreba energie',
    maintenance_due: 'Údržba je potrebná',
    turn_on: 'Zapnúť',
    turn_off: 'Vypnúť',
    control: 'Ovládanie',
  },
  pl: {
    average_temp: 'Średnia temperatura',
    heating: 'Ogrzewanie',
    target: 'Temperatura docelowa',
    anode_check: 'Sprawdzenie anody',
    cleaning_check: 'Czyszczenie',
    days_remaining: 'dni pozostało',
    overdue: 'po terminie',
    power_consumption: 'Zużycie',
    heating_source: 'Źródło ogrzewania',
    low_temperature: 'Niska temperatura!',
    temperature_drop: 'Szybki spadek temperatury!',
    legionella_risk: 'Ryzyko legionelli - podgrzej do 60°C',
    unusual_consumption: 'Niezwykłe zużycie energii',
    maintenance_due: 'Wymagana konserwacja',
    turn_on: 'Włącz',
    turn_off: 'Wyłącz',
    control: 'Sterowanie',
  },
};

@customElement('ha-boiler-card')
export class BoilerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BoilerCardConfig;
  @state() private tempHistory: Map<string, TempHistory[]> = new Map();
  @state() private lastNotificationTime: Map<string, number> = new Map();

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
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    if (changedProps.has('hass')) {
      if (this.hass?.states && this.config.target_temp_entity) {
        this.updateTempHistory();
      }
      return true;
    }

    return true;
  }

  private updateTempHistory(): void {
    if (!this.config.sensors) return;

    const now = Date.now();
    const thirtyMinutesAgo = now - 30 * 60 * 1000;

    // Update history for each sensor
    this.config.sensors.forEach(sensor => {
      const temp = this.getSensorValue(sensor.entity);
      if (temp === null) return;

      if (!this.tempHistory.has(sensor.entity)) {
        this.tempHistory.set(sensor.entity, []);
      }

      const history = this.tempHistory.get(sensor.entity)!;
      history.push({ value: temp, timestamp: now });

      // Keep only last 30 minutes
      this.tempHistory.set(
        sensor.entity,
        history.filter(h => h.timestamp > thirtyMinutesAgo)
      );
    });

    // Update average history
    const avgTemp = this.getAverageTemperature();
    if (avgTemp !== null) {
      if (!this.tempHistory.has('average')) {
        this.tempHistory.set('average', []);
      }

      const history = this.tempHistory.get('average')!;
      history.push({ value: avgTemp, timestamp: now });
      this.tempHistory.set(
        'average',
        history.filter(h => h.timestamp > thirtyMinutesAgo)
      );
    }
  }

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
    return state && (state.state === 'on' || state.state === 'heating');
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

  // Get active colors from theme or custom config
  private getColors(): ColorConfig {
    const defaultColors: ColorConfig = {
      boiler_fill: '#4CAF50',
      boiler_stroke: '#388E3C',
      cold_water: '#2196F3',
      warm_water: '#FF9800',
      hot_water: '#F44336',
      gradient_start: '#2196F3',
      gradient_end: '#F44336',
    };

    if (this.config.theme && this.config.theme !== 'custom' && THEMES[this.config.theme]) {
      return { ...defaultColors, ...THEMES[this.config.theme] };
    }

    if (this.config.colors) {
      return { ...defaultColors, ...this.config.colors };
    }

    return defaultColors;
  }

  // Get translated string
  private t(key: string): string {
    const language = this.config.language || 'cs';
    const translations = TRANSLATIONS[language] || TRANSLATIONS.cs;

    // Check custom labels first
    if (this.config.custom_labels && this.config.custom_labels[key as keyof CustomLabels]) {
      return this.config.custom_labels[key as keyof CustomLabels]!;
    }

    return translations[key] || key;
  }

  // Check alerts and return active ones
  private checkAlerts(): AlertConfig[] {
    if (!this.config.alerts) return [];

    const activeAlerts: AlertConfig[] = [];
    const avgTemp = this.getAverageTemperature();

    this.config.alerts.forEach(alert => {
      if (alert.enabled === false) return;

      switch (alert.type) {
        case 'temperature_drop': {
          // Check temperature drop over time
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
          // Check if temperature has been below threshold for too long
          const history = this.tempHistory.get('average');
          const minTemp = alert.min_temp || 60;
          const duration = (alert.duration || 168) * 60 * 60 * 1000; // Convert days to ms

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
          // Check for unusual power consumption
          const consumption = this.getPowerConsumption();
          if (consumption && alert.threshold) {
            // Simple check - could be enhanced with historical average
            const threshold = alert.threshold;
            if (consumption.power > threshold) {
              activeAlerts.push(alert);
            }
          }
          break;
        }
      }
    });

    return activeAlerts;
  }

  // Send notification to Home Assistant
  private sendNotification(event: string, message: string): void {
    if (!this.config.notifications?.enabled) return;
    if (!this.config.notifications.events?.includes(event as any)) return;
    if (!this.hass) return;

    // Check throttling - default 30 minutes between notifications
    const intervalMinutes = this.config.notifications.interval || 30;
    const intervalMs = intervalMinutes * 60 * 1000;
    const now = Date.now();
    const lastTime = this.lastNotificationTime.get(event);

    if (lastTime && (now - lastTime) < intervalMs) {
      // Skip notification - too soon since last one
      return;
    }

    // Update last notification time
    this.lastNotificationTime.set(event, now);

    const service = this.config.notifications.service || 'persistent_notification.create';
    const [domain, serviceAction] = service.split('.');

    this.hass.callService(domain, serviceAction, {
      message: message,
      title: 'HA Boiler Card',
    });
  }

  // Toggle control entity (switch/input_boolean)
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

  // Get control entity state
  private getControlState(): boolean {
    if (!this.config.control_entity || !this.hass?.states) return false;
    const state = this.hass.states[this.config.control_entity];
    return state?.state === 'on';
  }

  private getTemperatureColor(temp: number | null): string {
    if (temp === null) return '#888';

    const colors = this.getColors();
    const min = this.config.min_temp || 0;
    const max = this.config.max_temp || 100;
    const ratio = Math.max(0, Math.min(1, (temp - min) / (max - min)));

    // Use custom colors based on temperature ranges
    if (ratio < 0.3) {
      // Cold water
      return colors.cold_water || '#2196F3';
    } else if (ratio < 0.6) {
      // Warm water
      return colors.warm_water || '#FF9800';
    } else {
      // Hot water
      return colors.hot_water || '#F44336';
    }
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
      case 'solar': return 'Solární ohřev';
      case 'gas': return 'Plynový ohřev';
      case 'heat_pump': return 'Tepelné čerpadlo';
      case 'electric':
      default: return 'Elektrický ohřev';
    }
  }

  private calculateTimeToTarget(): string | null {
    if (!this.config.target_temp_entity) return null;

    const targetTemp = this.getSensorValue(this.config.target_temp_entity);
    const avgTemp = this.getAverageTemperature();

    if (targetTemp === null || avgTemp === null) return null;
    if (avgTemp >= targetTemp) return null;
    if (!this.isHeating() && this.getActiveHeatingSources().length === 0) return null;

    const history = this.tempHistory.get('average');
    if (!history || history.length < 2) return null;

    const oldest = history[0];
    const newest = history[history.length - 1];
    const timeDiff = (newest.timestamp - oldest.timestamp) / 1000 / 60;
    const tempDiff = newest.value - oldest.value;

    if (timeDiff < 5 || tempDiff <= 0) return null;

    const heatingRate = tempDiff / timeDiff;
    const remainingTemp = targetTemp - avgTemp;
    const minutesToTarget = Math.ceil(remainingTemp / heatingRate);

    if (minutesToTarget < 60) {
      return `~${minutesToTarget} min`;
    } else {
      const hours = Math.floor(minutesToTarget / 60);
      const minutes = minutesToTarget % 60;
      return `~${hours}h ${minutes}min`;
    }
  }

  private getDaysSince(dateString?: string): number | null {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return null;
    }
  }

  private getMaintenanceStatus(daysSince: number | null, interval: number): { status: 'ok' | 'warning' | 'overdue', text: string } {
    if (daysSince === null) {
      return { status: 'ok', text: 'Nenastaveno' };
    }

    const remaining = interval - daysSince;

    if (remaining <= 0) {
      return { status: 'overdue', text: `Po termínu (${-remaining} dní)` };
    } else if (remaining <= 30) {
      return { status: 'warning', text: `Zbývá ${remaining} dní` };
    } else {
      return { status: 'ok', text: `Zbývá ${remaining} dní` };
    }
  }

  private hasLowTempWarning(): boolean {
    if (!this.config.low_temp_warning) return false;
    const avgTemp = this.getAverageTemperature();
    return avgTemp !== null && avgTemp < this.config.low_temp_warning;
  }

  private renderSparkline(entityId: string): TemplateResult {
    if (!this.config.show_sparkline) return html``;

    const history = this.tempHistory.get(entityId);
    if (!history || history.length < 2) return html``;

    const values = history.map(h => h.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    const width = 40;
    const height = 20;
    const points = values.map((val, idx) => {
      const x = (idx / (values.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return svg`
      <svg class="sparkline" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <polyline
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          points="${points}"
        />
      </svg>
    `;
  }

  private renderBubbles(): TemplateResult {
    if (!this.config.advanced_animations) return html``;
    if (!this.isHeating() && this.getActiveHeatingSources().length === 0) return html``;

    return svg`
      <g class="bubbles">
        <circle cx="80" cy="240" r="3" fill="#fff" opacity="0.6" class="bubble bubble-1"/>
        <circle cx="95" cy="235" r="2" fill="#fff" opacity="0.5" class="bubble bubble-2"/>
        <circle cx="105" cy="242" r="2.5" fill="#fff" opacity="0.7" class="bubble bubble-3"/>
        <circle cx="115" cy="238" r="2" fill="#fff" opacity="0.6" class="bubble bubble-4"/>
      </g>
    `;
  }

  private renderStratificationLayers(): TemplateResult {
    if (!this.config.show_stratification || !this.config.sensors) {
      return html``;
    }

    const sortedSensors = [...this.config.sensors].sort((a, b) => {
      const posA = a.position || 0;
      const posB = b.position || 0;
      return posA - posB;
    });

    const layers = sortedSensors.map((sensor, index) => {
      const temp = this.getSensorValue(sensor.entity);
      const color = this.getTemperatureColor(temp);

      const layerHeight = 200 / 5;
      const position = (sensor.position || 1) - 1;
      const y = 50 + position * layerHeight;

      return svg`
        <rect
          x="51"
          y="${y + 1}"
          width="98"
          height="${layerHeight - 2}"
          fill="${color}"
          opacity="0.4"
        />
      `;
    });

    return svg`${layers}`;
  }

  private renderBoilerSVG(): TemplateResult {
    const isHeating = this.isHeating();
    const activeSources = this.getActiveHeatingSources();
    const avgTemp = this.getAverageTemperature();
    const colors = this.getColors();

    const fillColor = this.config.show_gradient && avgTemp !== null
      ? this.getTemperatureColor(avgTemp)
      : colors.boiler_fill || '#4A90E2';

    const strokeColor = colors.boiler_stroke || '#333';
    const isCompact = this.config.display_mode === 'compact';

    return html`
      <svg class="boiler-svg ${isCompact ? 'compact' : ''}" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boilerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.gradient_start || fillColor};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${colors.gradient_end || fillColor};stop-opacity:0.9" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Stratification layers -->
        ${this.renderStratificationLayers()}

        <!-- Tank body -->
        <rect x="50" y="50" width="100" height="200" rx="10" ry="10"
              fill="${this.config.show_stratification ? 'none' : 'url(#boilerGradient)'}"
              stroke="${strokeColor}"
              stroke-width="2"/>

        <!-- Top cap -->
        <ellipse cx="100" cy="50" rx="50" ry="15"
                 fill="${fillColor}"
                 stroke="${strokeColor}"
                 stroke-width="2"
                 opacity="0.8"/>

        <!-- Bottom cap -->
        <ellipse cx="100" cy="250" rx="50" ry="15"
                 fill="${fillColor}"
                 stroke="${strokeColor}"
                 stroke-width="2"
                 opacity="0.6"/>

        <!-- Heating element indicator -->
        ${(isHeating || activeSources.length > 0) ? svg`
          <rect x="70" y="240" width="60" height="8" rx="4"
                fill="#FF6B35"
                filter="url(#glow)"
                class="heating-pulse"/>
        ` : ''}

        <!-- Bubbles animation -->
        ${this.renderBubbles()}

        <!-- Pipe connections -->
        <circle cx="140" cy="80" r="8" fill="#666" stroke="#333" stroke-width="1"/>
        <rect x="140" y="76" width="30" height="8" fill="#666" stroke="#333" stroke-width="1"/>

        <circle cx="140" cy="220" r="8" fill="#666" stroke="#333" stroke-width="1"/>
        <rect x="140" y="216" width="30" height="8" fill="#666" stroke="#333" stroke-width="1"/>

        <!-- Temperature markers -->
        <line x1="45" y1="80" x2="50" y2="80" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="115" x2="50" y2="115" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="150" x2="50" y2="150" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="185" x2="50" y2="185" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="220" x2="50" y2="220" stroke="#999" stroke-width="1"/>
      </svg>
    `;
  }

  private handleSensorClick(entityId: string): void {
    if (!this.config.enable_more_info) return;

    const event = new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private renderSensor(sensor: SensorConfig, index: number): TemplateResult {
    const state = this.hass?.states?.[sensor.entity];
    const temp = this.getSensorValue(sensor.entity);
    const unit = state?.attributes?.unit_of_measurement || '°C';
    const name = sensor.name || state?.attributes?.friendly_name || sensor.entity;
    const color = this.getTemperatureColor(temp);
    const isCompact = this.config.display_mode === 'compact';
    const entityExists = !!state;

    return html`
      <div
        class="sensor-row ${this.config.enable_more_info ? 'clickable' : ''} ${isCompact ? 'compact' : ''} ${!entityExists ? 'unavailable' : ''}"
        @click=${() => this.handleSensorClick(sensor.entity)}
        title="${!entityExists ? 'Entita nenalezena: ' + sensor.entity : ''}"
      >
        <div class="sensor-info">
          <div class="sensor-label">
            ${!entityExists ? '⚠️ ' : ''}${name}
          </div>
          ${this.renderSparkline(sensor.entity)}
        </div>
        <div class="sensor-value" style="color: ${color}">
          ${temp !== null ? temp.toFixed(1) : (entityExists ? '--' : 'N/A')} ${unit}
        </div>
      </div>
    `;
  }

  private renderEnergyInfo(): TemplateResult {
    const consumption = this.getPowerConsumption();
    if (!consumption) return html``;

    return html`
      <div class="energy-info">
        <div class="energy-label">💡 Spotřeba</div>
        <div class="energy-values">
          <div class="energy-power">${(consumption.power / 1000).toFixed(2)} kW</div>
          ${this.config.energy_cost ? html`
            <div class="energy-cost">${consumption.cost.toFixed(2)} Kč/h</div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderHeatingSources(): TemplateResult {
    const activeSources = this.getActiveHeatingSources();

    // Legacy single source
    if (this.config.heating_entity && !this.config.heating_sources) {
      const isHeating = this.isHeating();
      if (!isHeating) return html``;

      return html`
        <div class="heating-indicator ${this.config.display_mode === 'compact' ? 'compact' : ''}">
          <span class="heating-icon">${this.getHeatingIcon(this.config.heating_type || 'electric')}</span>
          <span>${this.getHeatingLabel(this.config.heating_type || 'electric')}</span>
        </div>
      `;
    }

    // Dual/multi source
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

  private renderMaintenanceInfo(): TemplateResult {
    const anodeDays = this.getDaysSince(this.config.anode_last_change);
    const cleaningDays = this.getDaysSince(this.config.cleaning_last_date);

    const anodeStatus = this.getMaintenanceStatus(anodeDays, this.config.anode_change_interval || 365);
    const cleaningStatus = this.getMaintenanceStatus(cleaningDays, this.config.cleaning_interval || 180);

    // Send maintenance notifications if due
    if (anodeStatus.status === 'overdue' || anodeStatus.status === 'warning') {
      this.sendNotification('maintenance_due', `${this.t('anode_check')}: ${anodeStatus.text}`);
    }
    if (cleaningStatus.status === 'overdue' || cleaningStatus.status === 'warning') {
      this.sendNotification('maintenance_due', `${this.t('cleaning_check')}: ${cleaningStatus.text}`);
    }

    if (anodeDays === null && cleaningDays === null) {
      return html``;
    }

    return html`
      <div class="maintenance-section">
        <div class="maintenance-title">Údržba</div>

        ${anodeDays !== null ? html`
          <div class="maintenance-item ${anodeStatus.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🔧</span>
              Anoda
            </div>
            <div class="maintenance-value">
              ${anodeStatus.text}
            </div>
          </div>
        ` : ''}

        ${cleaningDays !== null ? html`
          <div class="maintenance-item ${cleaningStatus.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🧹</span>
              Čištění
            </div>
            <div class="maintenance-value">
              ${cleaningStatus.text}
            </div>
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

    // Send notification for low temperature
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
        // Send notification for this alert
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
    const entityExists = !!state;

    if (!entityExists) return html``;

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
    const targetTemp = this.config.target_temp_entity
      ? this.getSensorValue(this.config.target_temp_entity)
      : null;
    const timeToTarget = this.calculateTimeToTarget();
    const isCompact = this.config.display_mode === 'compact';

    const sortedSensors = [...(this.config.sensors || [])].sort((a, b) => {
      const posA = a.position || 0;
      const posB = b.position || 0;
      return posA - posB;
    });

    return html`
      <ha-card>
        <div class="card-content ${isCompact ? 'compact' : ''}">
          ${this.config.title ? html`<h2 class="card-title">${this.config.title}</h2>` : ''}

          ${this.renderAlerts()}

          ${this.renderControlButton()}

          <div class="boiler-container ${isCompact ? 'compact' : ''}">
            <div class="boiler-visual">
              ${this.renderBoilerSVG()}

              ${this.renderHeatingSources()}

              ${targetTemp !== null ? html`
                <div class="target-temp ${isCompact ? 'compact' : ''}">
                  <div>Cílová: ${targetTemp.toFixed(1)}°C</div>
                  ${timeToTarget ? html`
                    <div class="time-estimate">⏱️ ${timeToTarget}</div>
                  ` : ''}
                </div>
              ` : ''}

              ${this.renderEnergyInfo()}
            </div>

            <div class="sensors-panel ${isCompact ? 'compact' : ''}">
              ${sortedSensors.length > 0 ? html`
                <div class="sensors-list">
                  ${sortedSensors.map((sensor, idx) => this.renderSensor(sensor, idx))}
                </div>
              ` : html`
                <div class="no-sensors">Nejsou nakonfigurovány žádné senzory</div>
              `}

              ${this.config.show_average && avgTemp !== null ? html`
                <div class="average-temp ${isCompact ? 'compact' : ''}">
                  <div class="sensor-label">Průměrná teplota</div>
                  <div class="sensor-value average" style="color: ${this.getTemperatureColor(avgTemp)}">
                    ${avgTemp.toFixed(1)}°C
                  </div>
                </div>
              ` : ''}

              ${this.renderMaintenanceInfo()}
            </div>
          </div>
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

      .boiler-container {
        display: flex;
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
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
      }

      .boiler-svg.compact {
        width: 150px;
        height: 225px;
      }

      /* Animations */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes bubble-rise {
        0% {
          transform: translateY(0);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-200px);
          opacity: 0;
        }
      }

      .heating-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .bubble {
        animation: bubble-rise 3s ease-in infinite;
      }

      .bubble-1 {
        animation-delay: 0s;
        animation-duration: 3s;
      }

      .bubble-2 {
        animation-delay: 0.7s;
        animation-duration: 3.5s;
      }

      .bubble-3 {
        animation-delay: 1.4s;
        animation-duration: 2.8s;
      }

      .bubble-4 {
        animation-delay: 2.1s;
        animation-duration: 3.2s;
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

      .time-estimate {
        margin-top: 4px;
        font-size: 12px;
        color: var(--primary-color);
        font-weight: 500;
      }

      .sensors-panel {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
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

      .maintenance-section {
        margin-top: 16px;
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
          width: 150px;
          height: 225px;
        }

        .sensors-panel {
          width: 100%;
        }
      }
    `;
  }

  public getCardSize(): number {
    return this.config.display_mode === 'compact' ? 4 : 5;
  }

  static getConfigElement() {
    return document.createElement('ha-boiler-card-editor');
  }

  static getStubConfig() {
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
      sensors: []
    };
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'custom:ha-boiler-card',
  name: 'Boiler Card',
  description: 'Custom card for displaying water heater with temperature sensors',
});

declare global {
  interface HTMLElementTagNameMap {
    'ha-boiler-card': BoilerCard;
  }
}
