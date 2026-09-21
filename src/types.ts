import { LovelaceCardConfig } from 'custom-card-helpers';

export interface BoilerCardConfig extends LovelaceCardConfig {
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
  heating_type?: HeatingType;
  low_temp_warning?: number;
  anode_last_change?: string;
  anode_change_interval?: number;
  cleaning_last_date?: string;
  cleaning_interval?: number;
  enable_more_info?: boolean;
  // Energy tracking
  power_entity?: string;
  energy_cost?: number;
  currency?: string;
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
  // Layout variants (v1.5.0)
  layout_style?: 'default' | 'horizontal' | 'minimal' | 'wide';
  button_style?: 'default' | 'switch' | 'icon' | 'minimal';

  // --- v1.6.0 ---
  // Tank / hot water capacity
  tank_volume?: number; // liters
  cold_water_temp?: number; // inlet temperature, default 10 °C
  mixed_water_temp?: number; // usable tap temperature, default 40 °C
  shower_volume?: number; // liters per shower, default 40
  show_water_stats?: boolean;
  // Visualization options
  stratification_style?: 'gradient' | 'layers';
  show_scale?: boolean;
  show_sensor_markers?: boolean;
  show_display_panel?: boolean;
  show_hot_water_level?: boolean;
  show_insulation?: boolean;
  show_pipes?: boolean;
  show_legs?: boolean;
  // History / trends
  history_duration?: number; // minutes kept in memory, default 120
  history_interval?: number; // seconds between samples, default 60
  persist_history?: boolean;
  show_history_chart?: boolean;
  show_trend?: boolean;
  show_heat_loss?: boolean;
  // Controls
  show_target_control?: boolean;
  temp_step?: number;
  show_operation_modes?: boolean;
  // Energy
  energy_today_entity?: string;
  // Summary
  show_status_badges?: boolean;
}

export type HeatingType = 'electric' | 'solar' | 'gas' | 'heat_pump';

export interface SensorConfig {
  entity: string;
  name?: string;
  position?: number;
}

export interface HeatingSource {
  entity: string;
  type: HeatingType;
  name?: string;
  priority?: number;
}

export interface TempHistory {
  value: number;
  timestamp: number;
  heating?: boolean;
}

export interface ColorConfig {
  boiler_fill?: string;
  boiler_stroke?: string;
  cold_water?: string;
  warm_water?: string;
  hot_water?: string;
  gradient_start?: string;
  gradient_end?: string;
}

export interface AlertConfig {
  type: 'temperature_drop' | 'legionella_risk' | 'unusual_consumption';
  threshold?: number;
  min_temp?: number;
  duration?: number;
  message?: string;
  enabled?: boolean;
}

export interface NotificationConfig {
  service?: string;
  events?: ('maintenance_due' | 'low_temperature' | 'high_consumption' | 'legionella_risk')[];
  enabled?: boolean;
  interval?: number; // Minutes between notifications (default 30)
}

export interface CustomLabels {
  average_temp?: string;
  heating?: string;
  target?: string;
  anode_check?: string;
  cleaning_check?: string;
  days_remaining?: string;
  overdue?: string;
  [key: string]: string | undefined;
}

/** Usable hot water derived from the tank volume and the measured temperatures. */
export interface WaterStats {
  /** Liters of water at `mixed_water_temp` that can be drawn from the tank. */
  usableLiters: number;
  /** Rough number of showers left. */
  showers: number;
  /** Thermal energy stored above the cold water temperature (kWh). */
  storedEnergy: number;
  /** 0..1 share of the tank height that is at or above `mixed_water_temp`. */
  hotFraction: number;
}

/** Cooling behaviour measured while no heat source was active. */
export interface HeatLossInfo {
  /** Temperature loss in °C per hour. */
  ratePerHour: number;
  /** Hours until the tank drops below the usable temperature, null if unknown. */
  hoursToThreshold: number | null;
  /** Threshold used for `hoursToThreshold`. */
  threshold: number;
}

export interface TrendInfo {
  direction: 'up' | 'down' | 'flat';
  delta: number;
}
