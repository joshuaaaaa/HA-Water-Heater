# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
