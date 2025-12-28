# HA Boiler Card

Custom Lovelace card pro vizualizaci bojleru/ohřívače vody s teplotními senzory.

## Funkce

- 🎨 **Vizuální reprezentace bojleru** s vlastním SVG designem
- 🌡️ **Až 5 teplotních sensorů** uspořádaných od shora dolů
- 📊 **Automatický výpočet průměrné teploty**
- 🎨 **Barevná gradace podle teploty** (modrá → zelená → žlutá → oranžová → červená)
- 🔥 **Indikátor ohřívání** s animací
- 🎯 **Zobrazení cílové teploty**
- 📱 **Responzivní design**

## Základní použití

```yaml
type: custom:ha-boiler-card
title: Bojler
sensors:
  - entity: sensor.boiler_temp_top
    name: Horní
    position: 1
  - entity: sensor.boiler_temp_middle
    name: Střední
    position: 3
  - entity: sensor.boiler_temp_bottom
    name: Spodní
    position: 5
```

## Pokročilá konfigurace

```yaml
type: custom:ha-boiler-card
title: Bojler v koupelně
show_average: true
show_gradient: true
min_temp: 0
max_temp: 80
heating_entity: binary_sensor.boiler_heating
target_temp_entity: number.boiler_target_temp
sensors:
  - entity: sensor.boiler_temp_1
    name: Senzor 1 (Vrchol)
    position: 1
  - entity: sensor.boiler_temp_2
    name: Senzor 2
    position: 2
  - entity: sensor.boiler_temp_3
    name: Senzor 3 (Střed)
    position: 3
  - entity: sensor.boiler_temp_4
    name: Senzor 4
    position: 4
  - entity: sensor.boiler_temp_5
    name: Senzor 5 (Dno)
    position: 5
```

## Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `type` | string | **povinné** | `custom:ha-boiler-card` |
| `title` | string | - | Nadpis karty |
| `sensors` | list | [] | Seznam teplotních sensorů |
| `heating_entity` | string | - | Entita indikující ohřívání |
| `target_temp_entity` | string | - | Entita cílové teploty |
| `show_average` | boolean | true | Zobrazit průměrnou teplotu |
| `show_gradient` | boolean | true | Barevná gradace podle teploty |
| `min_temp` | number | 0 | Minimální teplota pro škálu |
| `max_temp` | number | 100 | Maximální teplota pro škálu |

### Konfigurace sensorů

| Parametr | Typ | Popis |
|----------|-----|-------|
| `entity` | string | **povinné** - ID entity senzoru |
| `name` | string | Vlastní název (jinak friendly_name) |
| `position` | number | Pozice 1-5 (shora dolů) |

## Více příkladů

Kompletní dokumentaci a další příklady najdete v [README](https://github.com/your-username/ha-boiler-card).
