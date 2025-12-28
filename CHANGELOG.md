# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2024-12-28

### Added
- **Energy consumption tracking**: Display real-time power usage and cost per hour
  - New `power_entity` configuration option for linking power meter
  - New `energy_cost` configuration option for cost per kWh
  - Shows consumption info: "💡 Spotřeba: X.XX kW (X.XX Kč/h)"
- **Mini sparkline graphs**: Visual temperature trend graphs next to sensor labels
  - New `show_sparkline` boolean option (default: false)
  - Displays 30-minute temperature history as compact SVG line graph
  - Auto-scales to temperature range for optimal visualization
- **Dual-source heating support**: Support for multiple heating sources (solar + electric, etc.)
  - New `heating_sources` array configuration with entity, type, name, and priority
  - Automatically displays active heating sources sorted by priority
  - Shows icons for different heating types (⚡ electric, ☀️ solar, 🔥 gas, 🌡️ heat pump)
- **Advanced animations**: Professional bubble animations during heating
  - New `advanced_animations` boolean option (default: false)
  - Animated rising bubbles in boiler when heating is active
  - Staggered animation timing for realistic effect

### Removed
- Debug console.log statements from production code
- firstUpdated() debug lifecycle hook
- All testing-only code and comments

### Changed
- Cleaned up codebase to production-ready state
- Improved code organization and readability
- Enhanced animation performance

## [1.1.2] - 2024-12-28

### Fixed
- **Critical:** Fixed issue where card couldn't access Home Assistant entities
- Added optional chaining (`?.`) to all `hass.states` access to prevent crashes
- Fixed `getSensorValue()` to safely check if `hass.states` exists
- Fixed `isHeating()` to safely check for entity before accessing
- Improved `shouldUpdate()` to properly handle hass updates

### Added
- Debug console logging for diagnostics
- `firstUpdated()` lifecycle hook with debug information
- Better loading state messages showing exact issue:
  - "Načítání Home Assistant..." - when hass is loading
  - "Čekání na entity..." - when hass.states is undefined
  - "Žádné entity nenalezeny" - when no entities are loaded
- Console warnings when entities can't be loaded

### Changed
- Enhanced error messages to be more specific about what's wrong
- Loading states now show progress through initialization

## [1.1.1] - 2024-12-28

### Fixed
- Fixed issue with card not displaying when sensors selected
- Card now always renders with helpful error messages

### Added
- Visual warnings for missing entities (red background, ⚠️ icon)
- Tooltip showing entity ID when unavailable
- TROUBLESHOOTING.md guide

## [1.1.0] - 2024-12-28

### Added - Quick Wins Features
- 🌈 **Temperature stratification visualization**: Colored layers showing temperature distribution across sensor positions
- ⚡ **Heating type icons**: Configurable icons for different heating sources (electric ⚡, solar ☀️, gas 🔥, heat pump 🌡️)
- ⚠️ **Low temperature warning**: Configurable threshold for temperature alerts
- 📐 **Display modes**: Switch between normal and compact view

### Added - Must-Have Features
- 👆 **Click to open more-info**: Click on any sensor to open its more-info dialog
- ⏱️ **Time estimate to target temperature**: Calculates and displays estimated time to reach target temp during heating
- 🔧 **Anode maintenance counter**: Tracks days since last anode change with status indicators (OK/Warning/Overdue)
- 🧹 **Cleaning counter**: Tracks days since last cleaning with status indicators

### Enhanced
- Improved visual feedback with color-coded maintenance status (green/orange/red)
- Temperature history tracking for trend calculation (last 30 minutes)
- Better responsive design for compact mode
- Enhanced SVG rendering with stratification layers

### Configuration
- Added `show_stratification` (boolean, default: true)
- Added `display_mode` ('normal' | 'compact', default: 'normal')
- Added `heating_type` ('electric' | 'solar' | 'gas' | 'heat_pump', default: 'electric')
- Added `low_temp_warning` (number, optional)
- Added `anode_last_change` (ISO date string, optional)
- Added `anode_change_interval` (number, default: 365 days)
- Added `cleaning_last_date` (ISO date string, optional)
- Added `cleaning_interval` (number, default: 180 days)
- Added `enable_more_info` (boolean, default: true)

### Documentation
- Updated README with all new features and parameters
- Added `example-config-advanced.yaml` with 8 real-world examples
- Comprehensive parameter tables organized by category
- Examples for all heating types and use cases

## [1.0.0] - 2024-12-28

### Added
- ✨ Initial release of HA Boiler Card
- 🎨 Custom SVG boiler visualization with gradient effects
- 🌡️ Support for up to 5 temperature sensors (configurable positions 1-5)
- 📊 Automatic average temperature calculation
- 🎨 Color-coded temperature display (blue → green → yellow → orange → red)
- 🔥 Heating indicator with pulse animation
- 🎯 Target temperature display support
- 📱 Responsive design for mobile devices
- ⚙️ Configurable temperature ranges (min_temp, max_temp)
- 🌍 Full Czech language support
- 📚 Comprehensive documentation and examples
- 🏗️ TypeScript implementation with Lit/Web Components
- 📦 HACS integration support
- 🤖 GitHub Actions for automated releases
- 🧪 Example configurations for various use cases:
  - Basic boiler with 3 sensors
  - Complete setup with 5 sensors
  - Solar water heater
  - Electric heater
  - Heat pump with storage tank

### Features in Detail

#### Visual Features
- Realistic boiler tank with 3D effect
- Top and bottom elliptical caps
- Pipe connections (inlet/outlet)
- Temperature level markers
- Gradient fill based on average temperature
- Heating element indicator at bottom
- Smooth animations and transitions
- Shadow and glow effects

#### Configuration Options
- `title`: Custom card title
- `sensors`: Array of temperature sensors with position and name
- `heating_entity`: Binary sensor for heating status
- `target_temp_entity`: Entity for target temperature
- `show_average`: Toggle average temperature display (default: true)
- `show_gradient`: Toggle color gradient effect (default: true)
- `min_temp`: Minimum temperature for color scale (default: 0)
- `max_temp`: Maximum temperature for color scale (default: 100)

#### Technical Features
- Built with Lit Element for modern web components
- TypeScript for type safety
- Rollup bundling for optimized output
- ESLint configuration for code quality
- Responsive CSS with mobile-first approach
- Uses Home Assistant theme variables
- Compatible with HA 2023.1.0+

### Documentation
- README.md with comprehensive guide in Czech
- INSTALLATION.md with step-by-step installation guide
- CONTRIBUTING.md for developers
- example-config.yaml with 5 real-world examples
- info.md for HACS display
- Full inline code documentation

[1.0.0]: https://github.com/your-username/ha-boiler-card/releases/tag/v1.0.0
