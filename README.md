# HA Boiler Card 🌡️

Custom Home Assistant Lovelace card pro zobrazení bojleru/ohřívače vody s teplotními senzory.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Funkce

- 🎨 **Vizuální reprezentace bojleru** s vlastním SVG designem
- 🌡️ **Podpora až 5 teplotních sensorů** (uspořádaných od shora dolů)
- 📊 **Automatický výpočet průměrné teploty**
- 🎨 **Barevná gradace** podle teploty (modrá → zelená → žlutá → oranžová → červená)
- 🔥 **Indikátor ohřívání** s animací
- 🎯 **Zobrazení cílové teploty**
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

### Pokročilá konfigurace

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

## ⚙️ Konfigurace

| Parametr | Typ | Povinný | Výchozí | Popis |
|----------|-----|---------|---------|-------|
| `type` | string | Ano | - | `custom:ha-boiler-card` |
| `title` | string | Ne | - | Nadpis karty |
| `sensors` | list | Ne | [] | Seznam teplotních sensorů |
| `heating_entity` | string | Ne | - | Entita indikující, zda se ohřívá |
| `target_temp_entity` | string | Ne | - | Entita cílové teploty |
| `show_average` | boolean | Ne | `true` | Zobrazit průměrnou teplotu |
| `show_gradient` | boolean | Ne | `true` | Použít barevnou gradaci podle teploty |
| `min_temp` | number | Ne | `0` | Minimální teplota pro barevnou škálu |
| `max_temp` | number | Ne | `100` | Maximální teplota pro barevnou škálu |

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
