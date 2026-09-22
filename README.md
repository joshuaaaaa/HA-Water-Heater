# HA Boiler Card 🌡️

[![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)](https://github.com/joshuaaaaa/HA-Water-Heater/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

Custom Home Assistant Lovelace card pro zobrazení bojleru/ohřívače vody s teplotními senzory, upozorněními a pokročilými funkcemi.

---

## ✨ Funkce

### 🎨 Vizualizace
- **Detailní SVG nádrž** - izolace, přívodní a výstupní potrubí, topné těleso, nohy
- **Displej na bojleru** - průměrná teplota, cílová teplota a stavová LED
- **Plynulá teplotní stratifikace** - gradient počítaný přímo z hodnot senzorů (OKLab míchání barev, žádné šedé přechody)
- **Alternativní režim vrstev** - `stratification_style: layers` pro ostré vrstvy
- **Teplotní stupnice** s popisky a značkou cílové teploty
- **Hodnoty senzorů přímo v nádrži** - klikací, otevřou more-info dialog
- **Hladina užitkové teplé vody** - vyznačí, kolik nádrže je nad užitnou teplotou
- **Vlastní barvy** - kompletní přizpůsobení barevného schématu
- **5 přednastavených témat** - ocean, sunset, forest, fire, ice
- **Stavové odznaky** - stav, teplota, cíl, zásoba teplé vody, příkon na jeden pohled
- **Režimy zobrazení**: Normální / Kompaktní + 4 rozvržení
- **Mini sparkline grafy** a šipky trendu u každého senzoru
- **Pokročilé animace** - bublinky, proudění v potrubí, pulzující topné těleso
- **Respektuje `prefers-reduced-motion`** a tmavý motiv Home Assistanta

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

### 💧 Zásoba teplé vody (v1.6.0)
- **Užitková teplá voda v litrech** - kolik vody o užitné teplotě lze načerpat
- **Odhad počtu sprch** - z objemu nádrže a spotřeby na sprchu
- **Uložená energie** v kWh (a její cena)
- **Tepelná ztráta** - naměřená rychlost chladnutí v °C/h a odhad, kdy voda vystydne

### 📊 Historie a trendy (v1.6.0)
- **Graf historie teplot** s vyznačenými úseky ohřevu a cílovou teplotou
- **Historie přežije obnovení stránky** (ukládá se do prohlížeče)
- **Nastavitelná délka historie a interval vzorkování**
- **Šipky trendu** u každého senzoru

### 🎛️ Ovládání (v1.6.0)
- **Nastavení cílové teploty** tlačítky +/- (water_heater, climate, number, input_number)
- **Přepínání režimů** water_heater entity (eco, performance, ...)
- **Vizuální editor karty** - konfigurace bez YAML
- **Spotřeba za dnešek** a cena v nastavené měně

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

## 💧 Objem nádrže a zásoba teplé vody (v1.6.0)

Po zadání objemu nádrže karta spočítá, kolik užitkové vody je k dispozici,
kolik to je sprch, kolik energie je v nádrži uloženo a jak rychle voda chladne.

```yaml
type: custom:ha-boiler-card
title: Bojler 120 l
tank_volume: 120        # litry
cold_water_temp: 10     # teplota studené vody na přívodu (°C)
mixed_water_temp: 40    # užitná teplota vody u kohoutku (°C)
shower_volume: 40       # spotřeba na jednu sprchu (litry)
show_water_stats: true
show_heat_loss: true
energy_cost: 5.2
currency: 'Kč'
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 🎛️ Ovládání teploty a režimů (v1.6.0)

`target_temp_entity` nemusí být jen senzor - karta umí číst i atribut
`temperature` z `water_heater` nebo `climate` entity a rovnou ji nastavovat.

```yaml
type: custom:ha-boiler-card
title: Bojler s ovládáním
target_temp_entity: water_heater.bojler
show_target_control: true    # tlačítka +/- u cílové teploty
show_operation_modes: true   # přepínač režimů (eco, performance, ...)
temp_step: 1                 # krok, pokud ho entita sama neurčuje
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

Podporované domény pro nastavení teploty: `water_heater`, `climate`, `number`,
`input_number`. Režimy se načítají z atributu `operation_list`.

---

## 📊 Historie teplot a trendy (v1.6.0)

Karta si sama sbírá historii měření, takže graf funguje i bez konfigurace
recorderu. Data se ukládají do prohlížeče, takže přežijí obnovení stránky.

```yaml
type: custom:ha-boiler-card
title: Bojler s grafem
show_history_chart: true
history_duration: 240    # kolik minut historie se uchovává
history_interval: 60     # jak často se odebírá vzorek (sekundy)
persist_history: true    # uložit historii do prohlížeče
show_trend: true         # šipky trendu u senzorů
show_sparkline: true
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 🖼️ Nastavení vizualizace (v1.6.0)

```yaml
type: custom:ha-boiler-card
title: Bojler
stratification_style: gradient  # 'gradient' (plynulý) nebo 'layers' (vrstvy)
show_scale: true                # teplotní stupnice s popisky
show_sensor_markers: true       # hodnoty senzorů v nádrži
show_display_panel: true        # displej nad bojlerem
show_hot_water_level: true      # hladina užitkové teplé vody
show_insulation: true           # izolační plášť
show_pipes: true                # potrubí
show_legs: true                 # nohy
show_status_badges: true        # odznaky nad kartou
sensors:
  - entity: sensor.boiler_temp_top
    position: 1
```

---

## 🧩 Vizuální editor

Kartu lze nastavit i bez YAML - v dashboardu klikněte na **Přidat kartu →
Boiler Card** a použijte formulář. Editor pokrývá senzory, entity, objem
nádrže, vizualizaci i údržbu. Pokročilé volby (vlastní barvy, upozornění,
notifikace, hybridní ohřev) zůstávají v YAML editoru.

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

## 📋 Nové parametry (v1.6.0)

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `tank_volume` | number | - | Objem nádrže v litrech (zapíná výpočty teplé vody) |
| `cold_water_temp` | number | 10 | Teplota studené vody na přívodu (°C) |
| `mixed_water_temp` | number | 40 | Užitná teplota vody u kohoutku (°C) |
| `shower_volume` | number | 40 | Spotřeba vody na jednu sprchu (litry) |
| `show_water_stats` | boolean | true | Zobrazit zásobu teplé vody a uloženou energii |
| `show_heat_loss` | boolean | true | Měřit a zobrazovat rychlost chladnutí |
| `currency` | string | '' | Měna připojená k cenám (např. `Kč`) |
| `energy_today_entity` | string | - | Entita se spotřebou za dnešek (kWh) |
| `show_status_badges` | boolean | true | Odznaky se stavem nad kartou |
| `show_display_panel` | boolean | true | Displej s teplotou nad bojlerem |
| `show_scale` | boolean | true | Teplotní stupnice vlevo od nádrže |
| `show_sensor_markers` | boolean | true | Hodnoty senzorů přímo v nádrži |
| `show_hot_water_level` | boolean | true | Hladina užitkové teplé vody |
| `show_insulation` | boolean | true | Izolační plášť nádrže |
| `show_pipes` | boolean | true | Přívodní a výstupní potrubí |
| `show_legs` | boolean | true | Nohy bojleru |
| `stratification_style` | string | gradient | `gradient` nebo `layers` |
| `show_history_chart` | boolean | false | Graf historie teplot |
| `history_duration` | number | 120 | Délka uchovávané historie (minuty) |
| `history_interval` | number | 60 | Interval vzorkování historie (sekundy) |
| `persist_history` | boolean | true | Uložit historii do prohlížeče |
| `show_trend` | boolean | true | Šipky trendu u senzorů |
| `show_target_control` | boolean | false | Tlačítka +/- pro cílovou teplotu |
| `temp_step` | number | 1 | Krok změny cílové teploty |
| `show_operation_modes` | boolean | false | Přepínač režimů water_heater entity |

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

### v1.6.0
- ✨ Přepracovaná vizualizace nádrže - izolace, potrubí, topné těleso, nohy, displej
- ✨ Plynulá stratifikace počítaná z hodnot senzorů (míchání barev v OKLab)
- ✨ Teplotní stupnice se značkou cílové teploty a hodnoty senzorů v nádrži
- ✨ Hladina užitkové teplé vody přímo v nádrži
- ✨ Zásoba teplé vody v litrech, počet sprch a uložená energie
- ✨ Měření tepelné ztráty a odhad, kdy voda vystydne
- ✨ Graf historie teplot s vyznačeným ohřevem + ukládání historie do prohlížeče
- ✨ Ovládání cílové teploty a režimů water_heater entity
- ✨ Stavové odznaky, šipky trendu, spotřeba za dnešek, nastavitelná měna
- ✨ Vizuální editor karty (dříve chybějící `ha-boiler-card-editor`)
- 🐛 Historie se sbírala jen s nastavenou `target_temp_entity`
- 🐛 Vrstvy stratifikace počítaly vždy s 5 senzory a přetékaly přes zaoblené rohy
- 🐛 Texty údržby a popisky byly natvrdo česky bez ohledu na `language`

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
