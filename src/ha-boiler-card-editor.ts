import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { BoilerCardConfig, SensorConfig } from './types';

const TEMP_DOMAINS = ['sensor', 'number', 'input_number'];
const SWITCH_DOMAINS = ['switch', 'input_boolean', 'climate', 'water_heater', 'binary_sensor'];
const TARGET_DOMAINS = ['water_heater', 'climate', 'number', 'input_number', 'sensor'];

interface SelectOption {
  value: string;
  label: string;
}

/**
 * Visual editor for the card. The card already advertised this element through
 * `getConfigElement()`, so without it the UI editor could not be opened.
 */
@customElement('ha-boiler-card-editor')
export class BoilerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: BoilerCardConfig;

  public setConfig(config: BoilerCardConfig): void {
    this._config = { ...config };
  }

  private _fireChange(config: BoilerCardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  private _setValue(key: keyof BoilerCardConfig, value: unknown): void {
    const config = { ...this._config };

    if (value === '' || value === undefined || value === null || (typeof value === 'number' && isNaN(value))) {
      delete config[key as string];
    } else {
      (config as Record<string, unknown>)[key as string] = value;
    }

    this._fireChange(config);
  }

  private _entityOptions(domains: string[]): string[] {
    if (!this.hass?.states) return [];
    return Object.keys(this.hass.states)
      .filter(entityId => domains.includes(entityId.split('.')[0]))
      .sort();
  }

  // --- Sensor list -----------------------------------------------------------

  private _updateSensor(index: number, patch: Partial<SensorConfig>): void {
    const sensors = [...(this._config.sensors || [])];
    sensors[index] = { ...sensors[index], ...patch };
    this._fireChange({ ...this._config, sensors });
  }

  private _addSensor(): void {
    const sensors = [...(this._config.sensors || [])];
    sensors.push({ entity: '', position: sensors.length + 1 });
    this._fireChange({ ...this._config, sensors });
  }

  private _removeSensor(index: number): void {
    const sensors = [...(this._config.sensors || [])];
    sensors.splice(index, 1);
    this._fireChange({ ...this._config, sensors });
  }

  private _moveSensor(index: number, offset: number): void {
    const sensors = [...(this._config.sensors || [])];
    const target = index + offset;
    if (target < 0 || target >= sensors.length) return;
    [sensors[index], sensors[target]] = [sensors[target], sensors[index]];
    sensors.forEach((sensor, idx) => { sensor.position = idx + 1; });
    this._fireChange({ ...this._config, sensors });
  }

  // --- Field helpers ---------------------------------------------------------

  private _textField(label: string, key: keyof BoilerCardConfig): TemplateResult {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          type="text"
          .value=${(this._config[key] as string) ?? ''}
          @change=${(e: Event) => this._setValue(key, (e.target as HTMLInputElement).value)}
        />
      </label>
    `;
  }

  private _entityField(label: string, key: keyof BoilerCardConfig, domains: string[]): TemplateResult {
    const listId = `list-${String(key)}`;
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          type="text"
          list=${listId}
          placeholder="entity_id"
          .value=${(this._config[key] as string) ?? ''}
          @change=${(e: Event) => this._setValue(key, (e.target as HTMLInputElement).value.trim())}
        />
        <datalist id=${listId}>
          ${this._entityOptions(domains).map(entity => html`<option value=${entity}></option>`)}
        </datalist>
      </label>
    `;
  }

  private _numberField(label: string, key: keyof BoilerCardConfig, step = 1): TemplateResult {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          type="number"
          step=${step}
          .value=${this._config[key] !== undefined ? String(this._config[key]) : ''}
          @change=${(e: Event) => {
            const raw = (e.target as HTMLInputElement).value;
            this._setValue(key, raw === '' ? undefined : parseFloat(raw));
          }}
        />
      </label>
    `;
  }

  private _selectField(label: string, key: keyof BoilerCardConfig, options: SelectOption[]): TemplateResult {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <select @change=${(e: Event) => this._setValue(key, (e.target as HTMLSelectElement).value)}>
          ${options.map(option => html`
            <option value=${option.value} ?selected=${(this._config[key] ?? '') === option.value}>
              ${option.label}
            </option>
          `)}
        </select>
      </label>
    `;
  }

  private _toggle(label: string, key: keyof BoilerCardConfig, fallback = false): TemplateResult {
    const checked = (this._config[key] as boolean | undefined) ?? fallback;
    return html`
      <label class="toggle">
        <input
          type="checkbox"
          .checked=${checked}
          @change=${(e: Event) => this._setValue(key, (e.target as HTMLInputElement).checked)}
        />
        <span>${label}</span>
      </label>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    return html`
      <div class="editor">
        <div class="section">
          <div class="section-title">Základní / Basic</div>
          ${this._textField('Název / Title', 'title')}
          ${this._selectField('Jazyk / Language', 'language', [
            { value: 'cs', label: 'Čeština' },
            { value: 'en', label: 'English' },
            { value: 'de', label: 'Deutsch' },
            { value: 'sk', label: 'Slovenčina' },
            { value: 'pl', label: 'Polski' },
          ])}
          ${this._selectField('Motiv / Theme', 'theme', [
            { value: '', label: '—' },
            { value: 'ocean', label: 'Ocean' },
            { value: 'sunset', label: 'Sunset' },
            { value: 'forest', label: 'Forest' },
            { value: 'fire', label: 'Fire' },
            { value: 'ice', label: 'Ice' },
            { value: 'custom', label: 'Custom' },
          ])}
          ${this._selectField('Rozvržení / Layout', 'layout_style', [
            { value: 'default', label: 'Default' },
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'minimal', label: 'Minimal' },
            { value: 'wide', label: 'Wide' },
          ])}
          ${this._selectField('Režim zobrazení / Display mode', 'display_mode', [
            { value: 'normal', label: 'Normal' },
            { value: 'compact', label: 'Compact' },
          ])}
        </div>

        <div class="section">
          <div class="section-title">Senzory / Sensors</div>
          ${(this._config.sensors || []).map((sensor, index) => html`
            <div class="sensor-editor">
              <div class="sensor-editor-row">
                <input
                  type="text"
                  list="list-sensor-entities"
                  placeholder="sensor.bojler_horni"
                  .value=${sensor.entity || ''}
                  @change=${(e: Event) => this._updateSensor(index, { entity: (e.target as HTMLInputElement).value.trim() })}
                />
                <button class="icon-button" title="Nahoru" @click=${() => this._moveSensor(index, -1)}>▲</button>
                <button class="icon-button" title="Dolů" @click=${() => this._moveSensor(index, 1)}>▼</button>
                <button class="icon-button danger" title="Odebrat" @click=${() => this._removeSensor(index)}>✕</button>
              </div>
              <div class="sensor-editor-row">
                <input
                  type="text"
                  placeholder="Název / Name"
                  .value=${sensor.name || ''}
                  @change=${(e: Event) => this._updateSensor(index, { name: (e.target as HTMLInputElement).value })}
                />
                <input
                  class="position-input"
                  type="number"
                  min="1"
                  placeholder="pozice"
                  .value=${sensor.position !== undefined ? String(sensor.position) : ''}
                  @change=${(e: Event) => this._updateSensor(index, { position: parseInt((e.target as HTMLInputElement).value, 10) || undefined })}
                />
              </div>
            </div>
          `)}
          <datalist id="list-sensor-entities">
            ${this._entityOptions(TEMP_DOMAINS).map(entity => html`<option value=${entity}></option>`)}
          </datalist>
          <button class="add-button" @click=${() => this._addSensor()}>+ Přidat senzor</button>
        </div>

        <div class="section">
          <div class="section-title">Entity</div>
          ${this._entityField('Ohřev / Heating', 'heating_entity', SWITCH_DOMAINS)}
          ${this._entityField('Cílová teplota / Target', 'target_temp_entity', TARGET_DOMAINS)}
          ${this._entityField('Ovládání / Control', 'control_entity', SWITCH_DOMAINS)}
          ${this._entityField('Výkon / Power (W)', 'power_entity', TEMP_DOMAINS)}
          ${this._entityField('Spotřeba dnes / Energy today', 'energy_today_entity', TEMP_DOMAINS)}
          ${this._selectField('Typ ohřevu / Heating type', 'heating_type', [
            { value: 'electric', label: '⚡ Electric' },
            { value: 'solar', label: '☀️ Solar' },
            { value: 'gas', label: '🔥 Gas' },
            { value: 'heat_pump', label: '🌡️ Heat pump' },
          ])}
        </div>

        <div class="section">
          <div class="section-title">Nádoba / Tank</div>
          ${this._numberField('Objem (l) / Volume', 'tank_volume')}
          ${this._numberField('Teplota přívodu (°C) / Cold inlet', 'cold_water_temp')}
          ${this._numberField('Užitná teplota (°C) / Usable temp', 'mixed_water_temp')}
          ${this._numberField('Objem sprchy (l) / Shower volume', 'shower_volume')}
          ${this._numberField('Min. teplota / Min temp', 'min_temp')}
          ${this._numberField('Max. teplota / Max temp', 'max_temp')}
          ${this._numberField('Varování při teplotě / Low temp warning', 'low_temp_warning')}
          ${this._numberField('Cena energie / Energy cost', 'energy_cost', 0.01)}
          ${this._textField('Měna / Currency', 'currency')}
        </div>

        <div class="section">
          <div class="section-title">Vizualizace / Visualization</div>
          ${this._selectField('Stratifikace / Stratification', 'stratification_style', [
            { value: 'gradient', label: 'Gradient' },
            { value: 'layers', label: 'Layers' },
          ])}
          <div class="toggles">
            ${this._toggle('Teplotní stupnice', 'show_scale', true)}
            ${this._toggle('Značky senzorů', 'show_sensor_markers', true)}
            ${this._toggle('Displej na bojleru', 'show_display_panel', true)}
            ${this._toggle('Hladina teplé vody', 'show_hot_water_level', true)}
            ${this._toggle('Izolace', 'show_insulation', true)}
            ${this._toggle('Trubky', 'show_pipes', true)}
            ${this._toggle('Nohy', 'show_legs', true)}
            ${this._toggle('Gradient', 'show_gradient', true)}
            ${this._toggle('Stratifikace', 'show_stratification', true)}
            ${this._toggle('Animace', 'advanced_animations', true)}
            ${this._toggle('Stavové odznaky', 'show_status_badges', true)}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Data a ovládání / Data & controls</div>
          <div class="toggles">
            ${this._toggle('Průměrná teplota', 'show_average', true)}
            ${this._toggle('Sparkline', 'show_sparkline')}
            ${this._toggle('Trend', 'show_trend', true)}
            ${this._toggle('Statistika vody', 'show_water_stats', true)}
            ${this._toggle('Tepelná ztráta', 'show_heat_loss', true)}
            ${this._toggle('Graf historie', 'show_history_chart')}
            ${this._toggle('Ukládat historii', 'persist_history', true)}
            ${this._toggle('Tlačítko zapnutí', 'show_control_button')}
            ${this._toggle('Ovládání cílové teploty', 'show_target_control')}
            ${this._toggle('Režimy ohřevu', 'show_operation_modes')}
            ${this._toggle('More-info dialog', 'enable_more_info', true)}
          </div>
          ${this._selectField('Styl tlačítka / Button style', 'button_style', [
            { value: 'default', label: 'Default' },
            { value: 'switch', label: 'Switch' },
            { value: 'icon', label: 'Icon' },
            { value: 'minimal', label: 'Minimal' },
          ])}
          ${this._numberField('Historie (min) / History duration', 'history_duration')}
          ${this._numberField('Vzorkování (s) / Sample interval', 'history_interval')}
        </div>

        <div class="section">
          <div class="section-title">Údržba / Maintenance</div>
          ${this._textField('Výměna anody (YYYY-MM-DD)', 'anode_last_change')}
          ${this._numberField('Interval anody (dny)', 'anode_change_interval')}
          ${this._textField('Poslední čištění (YYYY-MM-DD)', 'cleaning_last_date')}
          ${this._numberField('Interval čištění (dny)', 'cleaning_interval')}
        </div>

        <div class="hint">
          Pokročilé volby (barvy, upozornění, notifikace, více zdrojů ohřevu) lze nastavit
          v YAML editoru. / Advanced options are available in the YAML editor.
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }

      .section-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .field {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .field-label {
        flex: 0 0 45%;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      input[type='text'],
      input[type='number'],
      select {
        flex: 1 1 auto;
        min-width: 0;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 13px;
        font-family: inherit;
      }

      .toggles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 6px;
      }

      .toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .sensor-editor {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 6px;
      }

      .sensor-editor-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .position-input {
        flex: 0 0 80px;
      }

      .icon-button {
        flex: 0 0 auto;
        width: 30px;
        height: 30px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .icon-button.danger {
        color: var(--error-color, #f44336);
      }

      .add-button {
        padding: 8px 12px;
        border: 1px dashed var(--divider-color);
        border-radius: 6px;
        background: transparent;
        color: var(--primary-color);
        cursor: pointer;
        font-size: 13px;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-boiler-card-editor': BoilerCardEditor;
  }
}
