# HA Boiler Card 🌡️

Custom Home Assistant Lovelace card pro zobrazení bojleru/ohřívače vody s teplotními senzory.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Funkce

### Vizualizace
- 🎨 **Vizuální reprezentace bojleru** s vlastním SVG designem
- 🌈 **Teplotní stratifikace** - barevné vrstvy zobrazující teplotní rozložení
- 🌡️ **Podpora až 5 teplotních sensorů** (uspořádaných od shora dolů)
- 📊 **Automatický výpočet průměrné teploty**
- 🎨 **Barevná gradace** podle teploty (modrá → zelená → žlutá → oranžová → červená)
- 📐 **Režimy zobrazení**: Normální / Kompaktní

### Ohřev a monitoring
- 🔥 **Indikátor ohřívání** s animací podle typu zdroje
- ⚡ **Ikony typu ohřevu**: Elektřina, Solár, Plyn, Tepelné čerpadlo
- 🎯 **Zobrazení cílové teploty**
- ⏱️ **Odhad času do dosažení cílové teploty** (při aktivním ohřevu)
- ⚠️ **Upozornění na nízkou teplotu** (konfigurovatelný práh)

### Údržba
- 🔧 **Kontrola výměny anody** s počítadlem dnů
- 🧹 **Kontrola čištění** s počítadlem dnů
- 🟢 **Barevné indikátory stavu** (OK / Varování / Po termínu)

### Interakce
- 👆 **Kliknutí na senzor** otevře more-info dialog
- 📱 **Responzivní design** (přizpůsobení mobilním zařízením)
- ⚡ **Animace a vizuální efekty**

## 📦 Instalace

### HACS (doporučeno)

#### Přidání jako Custom Repository:

1. Otevřete HACS v Home Assistant
2. Klikněte na tři tečky **⋮** v pravém horním rohu
3. Vyberte **"Custom repositories"**
4. Do pole **"Repository"** vložte URL tohoto repository:
   ```
   https://github.com/your-username/ha-boiler-card
   ```
5. V poli **"Category"** vyberte **"Lovelace"**
6. Klikněte na **"ADD"**
7. Zavřete dialog a najděte "HA Boiler Card" v seznamu
8. Klikněte na kartu a pak na **"DOWNLOAD"**
9. Restartujte Home Assistant nebo obnovte stránku (Ctrl+F5)

### Manuální instalace

1. Stáhněte `ha-boiler-card.js` z [nejnovějšího release](https://github.com/your-username/ha-boiler-card/releases/latest)
2. Zkopírujte soubor do složky `config/www/` na vašem Home Assistant serveru
3. Přidejte resource v Nastavení:
   - Přejděte na **Nastavení** → **Dashboards** → **⋮** (tři tečky) → **Resources**
   - Klikněte na **"+ ADD RESOURCE"**
   - URL: `/local/ha-boiler-card.js`
   - Resource type: **JavaScript Module**

   Nebo přidejte do `configuration.yaml`:
   ```yaml
   lovelace:
     resources:
       - url: /local/ha-boiler-card.js
         type: module
   ```

4. Restartujte Home Assistant nebo obnovte cache prohlížeče (Ctrl+F5)

## 🚀 Použití

### Základní konfigurace

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

### Pokročilá konfigurace se všemi funkcemi

```yaml
type: custom:ha-boiler-card
title: Bojler v koupelně

# Režim zobrazení
display_mode: normal  # 'normal' nebo 'compact'

# Typ ohřevu (určuje ikonu)
heating_type: electric  # 'electric', 'solar', 'gas', 'heat_pump'

# Vizualizace
show_average: true
show_gradient: true
show_stratification: true  # Barevné vrstvy teplot

# Rozsah teplot
min_temp: 0
max_temp: 80

# Upozornění
low_temp_warning: 35  # Upozornění když teplota klesne pod 35°C

# Entity
heating_entity: binary_sensor.boiler_heating
target_temp_entity: number.boiler_target_temp

# Interakce
enable_more_info: true  # Kliknutí na senzor otevře more-info

# Údržba - anoda
anode_last_change: '2024-01-15'  # ISO 8601 formát
anode_change_interval: 365  # Interval výměny ve dnech

# Údržba - čištění
cleaning_last_date: '2024-11-01'
cleaning_interval: 180  # 6 měsíců

# Senzory
sensors:
  - entity: sensor.boiler_temp_1
    name: Vrchol
    position: 1
  - entity: sensor.boiler_temp_2
    name: Horní střed
    position: 2
  - entity: sensor.boiler_temp_3
    name: Střed
    position: 3
  - entity: sensor.boiler_temp_4
    name: Dolní střed
    position: 4
  - entity: sensor.boiler_temp_5
    name: Dno
    position: 5
```

## ⚙️ Konfigurace

### Základní parametry

| Parametr | Typ | Povinný | Výchozí | Popis |
|----------|-----|---------|---------|-------|
| `type` | string | **Ano** | - | `custom:ha-boiler-card` |
| `title` | string | Ne | - | Nadpis karty |
| `sensors` | list | Ne | [] | Seznam teplotních sensorů |

### Vizualizace

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `display_mode` | string | `normal` | Režim zobrazení: `normal` nebo `compact` |
| `show_average` | boolean | `true` | Zobrazit průměrnou teplotu |
| `show_gradient` | boolean | `true` | Barevná gradace podle teploty |
| `show_stratification` | boolean | `true` | Zobrazit teplotní vrstvy (stratifikaci) |
| `min_temp` | number | `0` | Minimální teplota pro barevnou škálu |
| `max_temp` | number | `100` | Maximální teplota pro barevnou škálu |

### Ohřev

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `heating_entity` | string | - | Entita indikující ohřívání |
| `target_temp_entity` | string | - | Entita cílové teploty (+ odhad času) |
| `heating_type` | string | `electric` | Typ: `electric` ⚡, `solar` ☀️, `gas` 🔥, `heat_pump` 🌡️ |

### Upozornění a údržba

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `low_temp_warning` | number | - | Práh pro upozornění na nízkou teplotu (°C) |
| `anode_last_change` | string | - | Datum poslední výměny anody (ISO 8601: 'YYYY-MM-DD') |
| `anode_change_interval` | number | `365` | Interval výměny anody (dny) |
| `cleaning_last_date` | string | - | Datum posledního čištění (ISO 8601: 'YYYY-MM-DD') |
| `cleaning_interval` | number | `180` | Interval čištění (dny) |

### Interakce

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `enable_more_info` | boolean | `true` | Povolit otevření more-info při kliknutí na senzor |

### Konfigurace sensorů

| Parametr | Typ | Povinný | Výchozí | Popis |
|----------|-----|---------|---------|-------|
| `entity` | string | Ano | - | ID entity senzoru z HA |
| `name` | string | Ne | friendly_name | Vlastní název senzoru |
| `position` | number | Ne | 0 | Pozice senzoru (1-5, shora dolů) |

## 🎨 Ukázky

### Příklad 1: Jednoduchý bojler se 3 senzory

```yaml
type: custom:ha-boiler-card
title: Ohřívač vody
sensors:
  - entity: sensor.water_heater_top
    position: 1
  - entity: sensor.water_heater_middle
    position: 3
  - entity: sensor.water_heater_bottom
    position: 5
```

### Příklad 2: Plně vybavený bojler

```yaml
type: custom:ha-boiler-card
title: Solární bojler
show_average: true
show_gradient: true
min_temp: 10
max_temp: 90
heating_entity: binary_sensor.solar_heating_active
target_temp_entity: input_number.solar_target_temp
sensors:
  - entity: sensor.solar_tank_top
    name: Vrchol (solár)
    position: 1
  - entity: sensor.solar_tank_upper
    name: Horní část
    position: 2
  - entity: sensor.solar_tank_middle
    name: Střed
    position: 3
  - entity: sensor.solar_tank_lower
    name: Spodní část
    position: 4
  - entity: sensor.solar_tank_bottom
    name: Dno (el. topení)
    position: 5
```

## 🛠️ Vývoj

### Požadavky

- Node.js 18+
- npm nebo yarn

### Build

```bash
# Instalace závislostí
npm install

# Build projektu
npm run build

# Sledování změn (development)
npm run watch
```

Výstupní soubor bude v `dist/ha-boiler-card.js`.

## 💡 Tipy a triky

1. **Pozicování sensorů**: Číslo `position` odpovídá umístění na bojleru:
   - 1 = úplně nahoře (nejčastěji nejteplejší)
   - 5 = úplně dole (nejčastěji nejchladnější)

2. **Barevná škála**: Nastavte `min_temp` a `max_temp` podle rozsahu vašeho bojleru pro lepší vizualizaci

3. **Průměrná teplota**: Vypočítává se z VŠECH nakonfigurovaných sensorů

4. **Indikátor ohřívání**: Funguje s binary_sensor nebo entitou, která má stav `on`/`off` nebo `heating`

## 🤝 Přispívání

Příspěvky jsou vítány! Neváhejte vytvořit issue nebo pull request.

## 📄 Licence

MIT License - viz soubor [LICENSE](LICENSE)

## 🙏 Poděkování

- Home Assistant komunita
- Všem přispěvatelům

## 📝 Changelog

### v1.0.0 (2024)
- ✨ První vydání
- 🎨 Vlastní SVG vizualizace bojleru
- 🌡️ Podpora až 5 teplotních sensorů
- 📊 Výpočet průměrné teploty
- 🔥 Indikátor ohřívání
- 🎯 Zobrazení cílové teploty
- 📱 Responzivní design
