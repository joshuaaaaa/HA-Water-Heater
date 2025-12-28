import { LitElement, html, css, PropertyValues, TemplateResult } from 'lit';
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
  min_temp?: number;
  max_temp?: number;
}

interface SensorConfig {
  entity: string;
  name?: string;
  position?: number; // 1-5 from top to bottom
}

@customElement('ha-boiler-card')
export class BoilerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BoilerCardConfig;

  public setConfig(config: BoilerCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      show_average: true,
      show_gradient: true,
      min_temp: 0,
      max_temp: 100,
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }
    return true;
  }

  private getSensorValue(entityId: string): number | null {
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
    if (!this.config.heating_entity) return false;
    const state = this.hass.states[this.config.heating_entity];
    return state && (state.state === 'on' || state.state === 'heating');
  }

  private getTemperatureColor(temp: number | null): string {
    if (temp === null) return '#888';

    const min = this.config.min_temp || 0;
    const max = this.config.max_temp || 100;
    const ratio = Math.max(0, Math.min(1, (temp - min) / (max - min)));

    // Blue -> Green -> Yellow -> Orange -> Red
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

  private renderBoilerSVG(): TemplateResult {
    const isHeating = this.isHeating();
    const avgTemp = this.getAverageTemperature();
    const fillColor = this.config.show_gradient && avgTemp !== null
      ? this.getTemperatureColor(avgTemp)
      : '#4A90E2';

    return html`
      <svg class="boiler-svg" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Main boiler tank -->
        <defs>
          <linearGradient id="boilerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${fillColor};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${fillColor};stop-opacity:0.9" />
          </linearGradient>

          <!-- Heating glow effect -->
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Tank body -->
        <rect x="50" y="50" width="100" height="200" rx="10" ry="10"
              fill="url(#boilerGradient)"
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

        <!-- Heating element indicator at bottom -->
        ${isHeating ? html`
          <rect x="70" y="240" width="60" height="8" rx="4"
                fill="#FF6B35"
                filter="url(#glow)"
                class="heating-pulse"/>
        ` : ''}

        <!-- Pipe connections -->
        <circle cx="140" cy="80" r="8" fill="#666" stroke="#333" stroke-width="1"/>
        <rect x="140" y="76" width="30" height="8" fill="#666" stroke="#333" stroke-width="1"/>

        <circle cx="140" cy="220" r="8" fill="#666" stroke="#333" stroke-width="1"/>
        <rect x="140" y="216" width="30" height="8" fill="#666" stroke="#333" stroke-width="1"/>

        <!-- Temperature level markers -->
        <line x1="45" y1="80" x2="50" y2="80" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="115" x2="50" y2="115" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="150" x2="50" y2="150" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="185" x2="50" y2="185" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="220" x2="50" y2="220" stroke="#999" stroke-width="1"/>
      </svg>
    `;
  }

  private renderSensor(sensor: SensorConfig, index: number): TemplateResult {
    const temp = this.getSensorValue(sensor.entity);
    const state = this.hass.states[sensor.entity];
    const unit = state?.attributes?.unit_of_measurement || '°C';
    const name = sensor.name || state?.attributes?.friendly_name || sensor.entity;
    const color = this.getTemperatureColor(temp);

    return html`
      <div class="sensor-row">
        <div class="sensor-label">${name}</div>
        <div class="sensor-value" style="color: ${color}">
          ${temp !== null ? temp.toFixed(1) : '--'} ${unit}
        </div>
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
    const isHeating = this.isHeating();

    // Sort sensors by position
    const sortedSensors = [...(this.config.sensors || [])].sort((a, b) => {
      const posA = a.position || 0;
      const posB = b.position || 0;
      return posA - posB;
    });

    return html`
      <ha-card>
        <div class="card-content">
          ${this.config.title ? html`<h2 class="card-title">${this.config.title}</h2>` : ''}

          <div class="boiler-container">
            <div class="boiler-visual">
              ${this.renderBoilerSVG()}

              ${isHeating ? html`
                <div class="heating-indicator">
                  <span class="heating-icon">🔥</span>
                  <span>Ohřívání</span>
                </div>
              ` : ''}

              ${targetTemp !== null ? html`
                <div class="target-temp">
                  Cílová: ${targetTemp.toFixed(1)}°C
                </div>
              ` : ''}
            </div>

            <div class="sensors-panel">
              ${sortedSensors.length > 0 ? html`
                <div class="sensors-list">
                  ${sortedSensors.map((sensor, idx) => this.renderSensor(sensor, idx))}
                </div>
              ` : html`
                <div class="no-sensors">Nejsou nakonfigurovány žádné senzory</div>
              `}

              ${this.config.show_average && avgTemp !== null ? html`
                <div class="average-temp">
                  <div class="sensor-label">Průměrná teplota</div>
                  <div class="sensor-value average" style="color: ${this.getTemperatureColor(avgTemp)}">
                    ${avgTemp.toFixed(1)}°C
                  </div>
                </div>
              ` : ''}
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

      .boiler-container {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: space-around;
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

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      .heating-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .heating-indicator {
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

      .heating-icon {
        font-size: 20px;
      }

      .target-temp {
        padding: 6px 12px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .sensors-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 200px;
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

      .sensor-row:hover {
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

      .sensor-value.average {
        font-size: 24px;
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
    return 5;
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
      min_temp: 0,
      max_temp: 80,
      sensors: []
    };
  }
}

// Register the card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ha-boiler-card',
  name: 'Boiler Card',
  description: 'Custom card for displaying water heater with temperature sensors',
});

declare global {
  interface HTMLElementTagNameMap {
    'ha-boiler-card': BoilerCard;
  }
}
