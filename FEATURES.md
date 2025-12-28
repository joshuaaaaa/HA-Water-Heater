# Přehled funkcí HA Boiler Card v1.1.0

## 🎨 Vizuální funkce

### Teplotní stratifikace
Zobrazuje barevné vrstvy na bojleru odpovídající teplotám na různých pozicích senzorů. Perfektní pro vizualizaci teplotního rozložení ve vodě.

```yaml
show_stratification: true  # Zapnout/vypnout stratifikaci
```

**Jak to funguje:**
- Každý senzor vytvoří barevnou vrstvu na bojleru
- Barva odpovídá teplotě (modrá = studená, červená = horká)
- Pozice vrstvy odpovídá `position` parametru senzoru (1-5)

**Použití:**
- Ideální pro bojlery s více teplotními čidly
- Pomáhá identifikovat problémy se stratifikací
- Vizuální kontrola účinnosti ohřevu

---

### Režimy zobrazení

#### Normální režim
```yaml
display_mode: normal
```
- Plná velikost bojleru (200x300px)
- Všechny detaily viditelné
- Vhodné pro hlavní dashboard

#### Kompaktní režim
```yaml
display_mode: compact
```
- Menší velikost (150x225px)
- Úspora místa na dashboardu
- Ideální pro mobilní zařízení nebo vedlejší panely

---

## 🔥 Funkce ohřevu

### Typy ohřevu s ikonami

#### Elektrický ohřev (výchozí)
```yaml
heating_type: electric  # ⚡
```
Zobrazí: "⚡ Elektrický ohřev"

#### Solární ohřev
```yaml
heating_type: solar  # ☀️
```
Zobrazí: "☀️ Solární ohřev"

#### Plynový ohřev
```yaml
heating_type: gas  # 🔥
```
Zobrazí: "🔥 Plynový ohřev"

#### Tepelné čerpadlo
```yaml
heating_type: heat_pump  # 🌡️
```
Zobrazí: "🌡️ Tepelné čerpadlo"

---

### Odhad času do cílové teploty

Automaticky vypočítá a zobrazí přibližný čas potřebný k dosažení cílové teploty.

```yaml
target_temp_entity: number.boiler_target_temp
```

**Jak to funguje:**
- Sleduje teplotu po dobu až 30 minut
- Vypočítá rychlost ohřevu (°C/min)
- Odhadne zbývající čas

**Zobrazení:**
- Pod 60 minut: "⏱️ ~45 min"
- Nad 60 minut: "⏱️ ~2h 15min"
- Pouze při aktivním ohřevu

**Poznámky:**
- Potřebuje alespoň 5 minut dat pro přesný odhad
- Funguje pouze když teplota stoupá
- Čím delší historie, tím přesnější odhad

---

## ⚠️ Upozornění a varování

### Upozornění na nízkou teplotu

Zobrazí výrazný oranžový banner, když průměrná teplota klesne pod nastavený práh.

```yaml
low_temp_warning: 35  # Práh v °C
```

**Zobrazení:**
```
⚠️ Nízká teplota! (32.5°C)
```

**Použití:**
- Legionella prevence (doporučeno min. 60°C)
- Ochrana před vymrznutím
- Kontrola správné funkce ohřevu
- Upozornění na poruchu

---

## 🔧 Údržba

### Kontrola anody

Sleduje čas od poslední výměny anody a upozorňuje na blížící se termín.

```yaml
anode_last_change: '2024-01-15'  # Datum poslední výměny
anode_change_interval: 365       # Interval v dnech (1 rok)
```

**Stavy:**
- 🟢 **OK** (více než 30 dní): "Zbývá 245 dní"
- 🟠 **Varování** (0-30 dní): "Zbývá 15 dní"
- 🔴 **Po termínu** (záporné): "Po termínu (10 dní)"

**Zobrazení:**
```
Údržba
🔧 Anoda    Zbývá 245 dní
```

**Doporučené intervaly:**
- Standardní bojler: 365 dní (1 rok)
- Solární systém: 548 dní (1.5 roku)
- Tvrdá voda: 182 dní (6 měsíců)

---

### Kontrola čištění

Sleduje čas od posledního čištění bojleru.

```yaml
cleaning_last_date: '2024-11-01'  # Datum posledního čištění
cleaning_interval: 180            # Interval v dnech (6 měsíců)
```

**Stavy:**
- 🟢 **OK** (více než 30 dní): "Zbývá 120 dní"
- 🟠 **Varování** (0-30 dní): "Zbývá 20 dní"
- 🔴 **Po termínu** (záporné): "Po termínu (5 dní)"

**Zobrazení:**
```
Údržba
🧹 Čištění    Zbývá 120 dní
```

**Doporučené intervaly:**
- Standardní: 180 dní (6 měsíců)
- Tvrdá voda: 90 dní (3 měsíce)
- Měkká voda: 365 dní (1 rok)

**Co čistit:**
- Vodní kámen na topném tělese
- Sediment na dně nádrže
- Kontrola anody
- Kontrola těsnění

---

## 👆 Interaktivní funkce

### Kliknutí na senzor

Klikněte na libovolný teplotní senzor a otevře se jeho more-info dialog s historií a detaily.

```yaml
enable_more_info: true  # Výchozí: true
```

**Funkce:**
- Zobrazí historii teploty (graf)
- Vidíte všechny atributy entity
- Rychlý přístup k detailům

**Vizuální indikace:**
- Kurzor se změní na pointer při najetí myší
- Senzor se posune doprava při hoveru
- Shadow efekt

**Vypnutí:**
```yaml
enable_more_info: false  # Zakázat klikání
```

---

## 📊 Praktické příklady

### Příklad 1: Solární bojler s údržbou

```yaml
type: custom:ha-boiler-card
title: Solární ohřev
heating_type: solar
show_stratification: true
low_temp_warning: 45
anode_last_change: '2024-01-01'
cleaning_last_date: '2024-06-15'
cleaning_interval: 180
target_temp_entity: input_number.solar_target
sensors:
  - entity: sensor.solar_top
    name: Horní
    position: 1
  - entity: sensor.solar_middle
    name: Střed
    position: 3
  - entity: sensor.solar_bottom
    name: Spodní
    position: 5
```

**Výsledek:**
- ☀️ Ikona solárního ohřevu
- Barevné vrstvy zobrazující stratifikaci
- Upozornění když teplota klesne pod 45°C
- Odhad času do cílové teploty
- Připomínky údržby (anoda + čištění)
- Klikatelné senzory

---

### Příklad 2: Kompaktní TČ s pouze údržbou

```yaml
type: custom:ha-boiler-card
title: TČ Zásobník
display_mode: compact
heating_type: heat_pump
show_stratification: false
anode_last_change: '2024-03-20'
cleaning_last_date: '2024-10-15'
sensors:
  - entity: sensor.hp_tank_temp
    position: 3
```

**Výsledek:**
- 🌡️ Ikona tepelného čerpadla
- Kompaktní zobrazení (úspora místa)
- Pouze údržbové připomínky
- Ideální pro vedlejší panel

---

### Příklad 3: Elektrický bojler - full featured

```yaml
type: custom:ha-boiler-card
title: Bojler
display_mode: normal
heating_type: electric
show_average: true
show_gradient: true
show_stratification: true
min_temp: 0
max_temp: 80
low_temp_warning: 40
heating_entity: binary_sensor.boiler_heating
target_temp_entity: number.boiler_target
anode_last_change: '2023-12-01'
anode_change_interval: 365
cleaning_last_date: '2024-08-15'
cleaning_interval: 180
enable_more_info: true
sensors:
  - entity: sensor.boiler_1
    name: Vrchol
    position: 1
  - entity: sensor.boiler_2
    name: Horní střed
    position: 2
  - entity: sensor.boiler_3
    name: Střed
    position: 3
  - entity: sensor.boiler_4
    name: Dolní střed
    position: 4
  - entity: sensor.boiler_5
    name: Dno
    position: 5
```

**Výsledek:**
- Kompletní vizualizace se všemi funkcemi
- 5 teplotních vrstev
- Průměrná teplota
- Odhad času ohřevu
- Upozornění na nízkou teplotu
- Připomínky údržby
- Všechny senzory klikatelné

---

## 💡 Tipy a triky

### Optimální nastavení pro různé případy

#### Legionella prevence
```yaml
low_temp_warning: 60  # WHO doporučuje min. 60°C
```

#### Úspora energie
```yaml
low_temp_warning: 45  # Nižší práh pro ekonomický provoz
target_temp_entity: input_number.eco_temp  # Nastavitelná cílová teplota
```

#### Solární ohřev
```yaml
heating_type: solar
show_stratification: true  # Důležité pro kontrolu stratifikace
anode_change_interval: 548  # 1.5 roku (delší životnost)
```

#### Tvrdá voda
```yaml
anode_change_interval: 182  # 6 měsíců
cleaning_interval: 90       # 3 měsíce (častější čištění)
```

#### Mobilní dashboard
```yaml
display_mode: compact  # Šetří místo
show_average: true
show_stratification: false  # Jednodušší zobrazení
```

---

## 🎯 Co dál?

Prozkoumejte všechny příklady v:
- `example-config.yaml` - Základní příklady
- `example-config-advanced.yaml` - Pokročilé konfigurace

Kompletní dokumentaci najdete v:
- `README.md` - Hlavní dokumentace
- `HACS_INSTALLATION.md` - Instalační průvodce
- `CHANGELOG.md` - Historie změn
