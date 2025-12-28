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

@customElement('ha-boiler-card')
export class BoilerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BoilerCardConfig;
  @state() private tempHistory: Map<string, TempHistory[]> = new Map();

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

  private getTemperatureColor(temp: number | null): string {
    if (temp === null) return '#888';

    const min = this.config.min_temp || 0;
    const max = this.config.max_temp || 100;
    const ratio = Math.max(0, Math.min(1, (temp - min) / (max - min)));

    if (ratio < 0.25) {
      const r = Math.floor(ratio * 4 * 255);
      return `rgb(${r}, ${Math.floor(100 + ratio * 4 * 155)}, 255)`;
    } else if (ratio < 0.5) {
      const r = Math.floor((ratio - 0.25) * 4 * 255);
      return `rgb(${r}, 255, ${Math.floor(255 - (ratio - 0.25) * 4 * 255)})`;
    } else if (ratio < 0.75) {
      return `rgb(255, ${Math.floor(255 - (ratio - 0.5) * 4 * 128)}, 0)`;
    } else {
      return `rgb(255, ${Math.floor(127 - (ratio - 0.75) * 4 * 127)}, 0)`;
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
    const fillColor = this.config.show_gradient && avgTemp !== null
      ? this.getTemperatureColor(avgTemp)
      : '#4A90E2';

    const isCompact = this.config.display_mode === 'compact';

    return html`
      <svg class="boiler-svg ${isCompact ? 'compact' : ''}" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boilerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${fillColor};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${fillColor};stop-opacity:0.9" />
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
              stroke="#333"
              stroke-width="2"/>

        <!-- Top cap -->
        <ellipse cx="100" cy="50" rx="50" ry="15"
                 fill="${fillColor}"
                 stroke="#333"
                 stroke-width="2"
                 opacity="0.8"/>

        <!-- Bottom cap -->
        <ellipse cx="100" cy="250" rx="50" ry="15"
                 fill="${fillColor}"
                 stroke="#333"
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

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const avgTemp = this.getAverageTemperature();
    const targetTemp = this.config.target_temp_entity
      ? this.getSensorValue(this.config.target_temp_entity)
      : null;
    const timeToTarget = this.calculateTimeToTarget();
    const hasLowTempWarning = this.hasLowTempWarning();
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

          ${hasLowTempWarning ? html`
            <div class="warning-banner">
              <span class="warning-icon">⚠️</span>
              <span>Nízká teplota! (${avgTemp?.toFixed(1)}°C)</span>
            </div>
          ` : ''}

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

      .boiler-container {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: space-around;
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
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 200px;
      }

      .sensors-panel.compact {
        gap: 12px;
        min-width: 180px;
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
      }

      .sensor-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-weight: 400;
      }

      .sensor-value {
        font-size: 20px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
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
