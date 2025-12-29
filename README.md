# HA Boiler Card 🌡️

[![Version](https://img.shields.io/badge/version-1.4.1-blue.svg)](https://github.com/joshuaaaaa/HA-Water-Heater/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

Custom Home Assistant Lovelace card pro zobrazení bojleru/ohřívače vody s teplotními senzory, upozorněními a pokročilými funkcemi.

---

## ✨ Funkce

### 🎨 Vizualizace
- **Vizuální reprezentace bojleru** s vlastním SVG designem
- **Vlastní barvy** - kompletní přizpůsobení barevného schématu
- **5 přednastavených témat** - ocean, sunset, forest, fire, ice
- **Teplotní stratifikace** - barevné vrstvy zobrazující teplotní rozložení
- **Podpora až 5 teplotních sensorů** (uspořádaných od shora dolů)
- **Automatický výpočet průměrné teploty**
- **Barevná gradace** podle teploty
- **Režimy zobrazení**: Normální / Kompaktní
- **Mini sparkline grafy** - trendy teplot za posledních 30 minut
- **Pokročilé animace** - efekt bublinek při ohřevu

### 🔥 Ohřev a monitoring
- **Indikátor ohřívání** s animací podle typu zdroje
- **Ikony typu ohřevu**: Elektřina ⚡, Solár ☀️, Plyn 🔥, Tepelné čerpadlo 🌡️
- **Sledování spotřeby energie** - aktuální výkon a náklady
- **Hybridní ohřev** - podpora více zdrojů (solár + elektřina)
- **Zobrazení cílové teploty**
- **Odhad času do dosažení cílové teploty**

### 🚨 Upozornění (v1.3.0)
- **temperature_drop** - detekce rychlého poklesu teploty
- **legionella_risk** - varování při dlouhodobě nízké teplotě
- **unusual_consumption** - upozornění na vysokou spotřebu
- **low_temp_warning** - konfigurovatelný práh nízké teploty

### 📱 Notifikace (v1.3.0)
- Integrace s Home Assistant notification systémem
- Konfigurovatelné události: maintenance_due, low_temperature, legionella_risk
- Podpora všech HA notification services
- **Throttling notifikací** - nastavitelný interval (výchozí 30 min) (v1.4.1)

### 🌍 Lokalizace (v1.3.0)
- **5 jazyků**: Čeština, English, Deutsch, Slovenčina, Polski
- **Vlastní popisky** - přepsání libovolného textu
- Kompletně přeložené uživatelské rozhraní

### 🔧 Údržba
- **Kontrola výměny anody** s počítadlem dnů
- **Kontrola čištění** s počítadlem dnů
- **Barevné indikátory stavu** (OK / Varování / Po termínu)

### 👆 Interakce
- **Kliknutí na senzor** otevře more-info dialog
- **Ovládací tlačítko** - zapnutí/vypnutí bojleru (v1.4.0)
- **Responzivní design** pro všechny velikosti obrazovky
- **Animace a vizuální efekty**

---

## 📦 Instalace

### HACS (doporučeno)

1. Otevřete **HACS** v Home Assistant
2. Klikněte na **⋮** (tři tečky) v pravém horním rohu
3. Vyberte **"Custom repositories"**
4. Přidejte URL: `https://github.com/joshuaaaaa/HA-Water-Heater`
5. Category: **Lovelace**
6. Klikněte **"ADD"**
7. Najděte "HA Boiler Card" a klikněte **"DOWNLOAD"**
8. Restartujte Home Assistant nebo obnovte cache (Ctrl+F5)

### Manuální instalace

1. Stáhněte `ha-boiler-card.js` z [releases](https://github.com/joshuaaaaa/HA-Water-Heater/releases)
2. Zkopírujte do `/config/www/`
3. Přidejte resource v **Nastavení → Dashboards → Resources**:
   - URL: `/local/ha-boiler-card.js`
   - Type: **JavaScript Module**
4. Obnovte cache prohlížeče (Ctrl+F5)

---

## 🚀 Základní použití

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

---

## 🎨 Vlastní barvy

```yaml
type: custom:ha-boiler-card
title: Fialový bojler
colors:
  boiler_fill: '#9C27B0'
  boiler_stroke: '#4A148C'
  cold_water: '#E1BEE7'
  warm_water: '#BA68C8'
  hot_water: '#7B1FA2'
  gradient_start: '#F3E5F5'
  gradient_end: '#4A148C'
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 🌊 Přednastavená témata

```yaml
type: custom:ha-boiler-card
title: Oceánový bojler
theme: ocean  # ocean, sunset, forest, fire, ice
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

**Dostupná témata:**
- 🌊 **ocean** - modré tóny
- 🌅 **sunset** - oranžovo-červené
- 🌲 **forest** - zelené tóny
- 🔥 **fire** - červeno-žluté
- ❄️ **ice** - světle modré

---

## 🚨 Pokročilá upozornění

```yaml
type: custom:ha-boiler-card
title: Bojler s upozorněními
alerts:
  - type: temperature_drop
    threshold: 15  # °C za hodinu
    enabled: true
  - type: legionella_risk
    min_temp: 60
    duration: 168  # 7 dní v hodinách
    enabled: true
  - type: unusual_consumption
    threshold: 3000  # Watty
    enabled: true
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 📱 Notifikace

```yaml
type: custom:ha-boiler-card
title: Bojler s notifikacemi
notifications:
  enabled: true
  service: notify.mobile_app
  interval: 30  # Interval mezi notifikacemi v minutách (výchozí 30)
  events:
    - maintenance_due
    - low_temperature
    - legionella_risk
alerts:
  - type: legionella_risk
    min_temp: 60
    duration: 168
    enabled: true
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 🎮 Ovládací tlačítko

```yaml
type: custom:ha-boiler-card
title: Bojler s ovládáním
show_control_button: true
control_entity: switch.boiler_power  # switch, input_boolean, etc.
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 🌍 Lokalizace

```yaml
type: custom:ha-boiler-card
title: Water Heater
language: en  # cs, en, de, sk, pl
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

**Vlastní popisky:**

```yaml
type: custom:ha-boiler-card
title: Bojler
language: cs
custom_labels:
  average_temp: 'Střední teplota'
  heating: 'Ohřívá se'
  anode_check: 'Anoda - kontrola'
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## ⚙️ Kompletní konfigurace

```yaml
type: custom:ha-boiler-card
title: Kompletní bojler

# Téma
theme: ocean

# Lokalizace
language: cs

# Zobrazení
display_mode: normal
show_average: true
show_gradient: true
show_stratification: true
show_sparkline: true
advanced_animations: true
min_temp: 0
max_temp: 80

# Upozornění
low_temp_warning: 40
alerts:
  - type: temperature_drop
    threshold: 15
    enabled: true
  - type: legionella_risk
    min_temp: 60
    duration: 168
    enabled: true

# Notifikace
notifications:
  enabled: true
  service: notify.mobile_app
  events:
    - maintenance_due
    - legionella_risk

# Hybridní ohřev
heating_sources:
  - entity: binary_sensor.solar_active
    type: solar
    name: Solární kolektor
    priority: 1
  - entity: binary_sensor.electric_heater
    type: electric
    name: Elektrický ohřev
    priority: 2

# Spotřeba
power_entity: sensor.boiler_power
energy_cost: 4.5

# Údržba
anode_last_change: '2024-01-15'
anode_change_interval: 365
cleaning_last_date: '2024-06-01'
cleaning_interval: 180

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

Více příkladů v [example-config-advanced.yaml](example-config-advanced.yaml)

---

## 🛠️ Řešení problémů

Pokud karta nefunguje:

1. **Vymazat cache** - Ctrl+Shift+R
2. **Console** - F12 → zkontrolovat chyby
3. **Resource** - Nastavení → Dashboards → Resources
4. **Restart HA**

Detailní návod: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 📝 Co je nového

### v1.4.1 (2024-12-29)
- 🐛 Oprava opakovaného odesílání notifikací
- ✨ Throttling notifikací s nastavitelným intervalem
- ✨ Automatické notifikace pro údržbu a nízkou teplotu

### v1.4.0 (2024-12-29)
- ✨ Ovládací tlačítko pro zapnutí/vypnutí bojleru

### v1.3.0 (2024-12-29)
- ✨ Vlastní barvy a 5 témat
- ✨ Pokročilá upozornění
- ✨ Notifikace
- ✨ Lokalizace (5 jazyků)

### v1.2.0 (2024-12-28)
- ✨ Spotřeba energie
- ✨ Sparkline grafy
- ✨ Hybridní ohřev
- ✨ Animace

Další verze: [GitHub Releases](https://github.com/joshuaaaaa/HA-Water-Heater/releases)

---

## 📄 Licence

MIT - viz [LICENSE](LICENSE)

---

**Pokud se vám karta líbí, dejte ⭐ na GitHubu!**
