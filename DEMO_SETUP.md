# Nastavení Demo režimu pro testování

Tento průvodce vám ukáže jak nastavit testovací senzory pro vyzkoušení HA Boiler Card.

## 🎯 Rychlý Start - Demo Integrace

Nejjednodušší způsob jak získat testovací senzory.

### Krok 1: Aktivujte Demo integraci

Přidejte do vašeho `configuration.yaml`:

```yaml
# Aktivuje demo entit včetně teplotních senzorů
demo:
```

### Krok 2: Restartujte Home Assistant

1. **Nastavení** → **Systém** → **RESTART**
2. Počkejte ~1 minutu

### Krok 3: Ověřte Demo senzory

**Developer Tools** → **States** → Vyhledejte:
- `sensor.outside_temperature` - Venkovní teplota
- `sensor.outside_humidity` - Venkovní vlhkost
- `sensor.thermostat_temperature` - Teplota termostatu
- A mnoho dalších...

### Krok 4: Použijte v kartě

```yaml
type: custom:ha-boiler-card
title: Demo Bojler
show_average: true
show_gradient: true
show_stratification: true
sensors:
  - entity: sensor.outside_temperature
    name: Venkovní teplota (demo)
    position: 1
  - entity: sensor.thermostat_temperature
    name: Termostat (demo)
    position: 3
  - entity: sensor.outside_humidity
    name: Vlhkost (demo)
    position: 5
```

---

## 🛠️ Vlastní Testovací Senzory

Pokud nechcete demo integraci, vytvořte si vlastní senzory.

### Varianta A: Statické hodnoty

Pro základní testování s pevnými hodnotami.

**Do `configuration.yaml`:**

```yaml
template:
  - sensor:
      # Senzor 1 - Horní část bojleru
      - name: "Bojler Horní"
        state: 65.5
        unit_of_measurement: "°C"
        device_class: temperature

      # Senzor 2 - Střední část
      - name: "Bojler Střední"
        state: 52.3
        unit_of_measurement: "°C"
        device_class: temperature

      # Senzor 3 - Spodní část
      - name: "Bojler Spodní"
        state: 38.7
        unit_of_measurement: "°C"
        device_class: temperature

      # Senzor 4 - Extra 1
      - name: "Bojler Extra 1"
        state: 58.1
        unit_of_measurement: "°C"
        device_class: temperature

      # Senzor 5 - Extra 2
      - name: "Bojler Extra 2"
        state: 45.9
        unit_of_measurement: "°C"
        device_class: temperature
```

**Použití:**

```yaml
type: custom:ha-boiler-card
title: Testovací Bojler
sensors:
  - entity: sensor.bojler_horni
    name: Horní část
    position: 1
  - entity: sensor.bojler_stredni
    name: Střední část
    position: 2
  - entity: sensor.bojler_spodni
    name: Spodní část
    position: 3
  - entity: sensor.bojler_extra_1
    name: Extra 1
    position: 4
  - entity: sensor.bojler_extra_2
    name: Extra 2
    position: 5
```

### Varianta B: Dynamické hodnoty s časem

Senzory se mění podle času (pro testování animací).

```yaml
template:
  - sensor:
      - name: "Bojler Test 1"
        state: >
          {{ 40 + (now().minute % 30) }}
        unit_of_measurement: "°C"
        device_class: temperature

      - name: "Bojler Test 2"
        state: >
          {{ 35 + (now().second % 25) }}
        unit_of_measurement: "°C"
        device_class: temperature

      - name: "Bojler Test 3"
        state: >
          {{ 30 + ((now().hour * 2) % 40) }}
        unit_of_measurement: "°C"
        device_class: temperature
```

Tyto senzory se budou měnit každou minutu/sekundu!

### Varianta C: S ovládáním pomocí Input Number

Můžete ručně měnit hodnoty přes UI.

**1. Vytvořte Input Number helpery:**

```yaml
input_number:
  bojler_temp_1:
    name: Bojler Teplota 1
    min: 0
    max: 100
    step: 0.5
    initial: 65
    unit_of_measurement: "°C"

  bojler_temp_2:
    name: Bojler Teplota 2
    min: 0
    max: 100
    step: 0.5
    initial: 50
    unit_of_measurement: "°C"

  bojler_temp_3:
    name: Bojler Teplota 3
    min: 0
    max: 100
    step: 0.5
    initial: 35
    unit_of_measurement: "°C"
```

**2. Vytvořte Template senzory:**

```yaml
template:
  - sensor:
      - name: "Bojler Ovladatelny 1"
        state: "{{ states('input_number.bojler_temp_1') }}"
        unit_of_measurement: "°C"
        device_class: temperature

      - name: "Bojler Ovladatelny 2"
        state: "{{ states('input_number.bojler_temp_2') }}"
        unit_of_measurement: "°C"
        device_class: temperature

      - name: "Bojler Ovladatelny 3"
        state: "{{ states('input_number.bojler_temp_3') }}"
        unit_of_measurement: "°C"
        device_class: temperature
```

**3. Přidejte ovládání na dashboard:**

```yaml
type: entities
entities:
  - input_number.bojler_temp_1
  - input_number.bojler_temp_2
  - input_number.bojler_temp_3
```

Teď můžete **ručně měnit teploty** pomocí sliderů!

---

## 🎮 Kompletní Testovací Setup

Všechno najednou - demo bojler s funkcemi!

### configuration.yaml:

```yaml
# Demo entit
demo:

# Ovládací prvky
input_number:
  boiler_target_temp:
    name: Cílová Teplota
    min: 30
    max: 80
    step: 1
    initial: 60
    unit_of_measurement: "°C"

input_boolean:
  boiler_heating:
    name: Ohřívání
    initial: false

input_datetime:
  anode_change:
    name: Výměna Anody
    has_date: true
    has_time: false

  last_cleaning:
    name: Poslední Čištění
    has_date: true
    has_time: false

# Template senzory
template:
  - sensor:
      - name: "Bojler Simulace Horní"
        state: >
          {% if is_state('input_boolean.boiler_heating', 'on') %}
            {{ [70, states('sensor.outside_temperature')|float + 40]|min }}
          {% else %}
            {{ states('sensor.outside_temperature')|float + 35 }}
          {% endif %}
        unit_of_measurement: "°C"
        device_class: temperature

      - name: "Bojler Simulace Střední"
        state: >
          {% if is_state('input_boolean.boiler_heating', 'on') %}
            {{ [60, states('sensor.outside_temperature')|float + 30]|min }}
          {% else %}
            {{ states('sensor.outside_temperature')|float + 25 }}
          {% endif %}
        unit_of_measurement: "°C"
        device_class: temperature

      - name: "Bojler Simulace Spodní"
        state: >
          {% if is_state('input_boolean.boiler_heating', 'on') %}
            {{ [45, states('sensor.outside_temperature')|float + 20]|min }}
          {% else %}
            {{ states('sensor.outside_temperature')|float + 15 }}
          {% endif %}
        unit_of_measurement: "°C"
        device_class: temperature
```

### Dashboard karta:

```yaml
type: custom:ha-boiler-card
title: Demo Bojler s Funkcemi
display_mode: normal
heating_type: electric
show_average: true
show_gradient: true
show_stratification: true
min_temp: 0
max_temp: 80
low_temp_warning: 40
heating_entity: input_boolean.boiler_heating
target_temp_entity: input_number.boiler_target_temp
anode_last_change: '2024-01-15'
anode_change_interval: 365
cleaning_last_date: '2024-06-01'
cleaning_interval: 180
sensors:
  - entity: sensor.bojler_simulace_horni
    name: Horní část
    position: 1
  - entity: sensor.bojler_simulace_stredni
    name: Střední část
    position: 3
  - entity: sensor.bojler_simulace_spodni
    name: Spodní část
    position: 5
```

### Ovládací panel:

```yaml
type: entities
title: Ovládání Demo Bojleru
entities:
  - input_boolean.boiler_heating
  - input_number.boiler_target_temp
  - input_datetime.anode_change
  - input_datetime.last_cleaning
  - sensor.bojler_simulace_horni
  - sensor.bojler_simulace_stredni
  - sensor.bojler_simulace_spodni
```

---

## ✅ Checklist po nastavení:

- [ ] Přidán kód do `configuration.yaml`
- [ ] Home Assistant restartován
- [ ] Demo/template senzory se zobrazují v **Developer Tools** → **States**
- [ ] Senzory mají **numerickou hodnotu** (ne text)
- [ ] Karta HA Boiler Card přidána na dashboard
- [ ] Senzory se zobrazují na kartě
- [ ] Teploty se zobrazují správně (ne "N/A")

---

## 🐛 Troubleshooting:

### "Template Error"
- Zkontrolujte syntax v template senzorech
- Používejte jednoduchý template nejdřív (fixní číslo)

### "Entity not found"
- Zkontrolujte entity ID jsou s podtržítky: `bojler_horni` (ne `bojler-horni`)
- Developer Tools → States → Najděte přesné ID

### Senzory se neaktualizují
- Restartujte HA
- Zkontrolujte že template má správnou syntax
- Zkuste fixní hodnotu místo templatu

---

## 📚 Další zdroje:

- [Home Assistant Demo Integration](https://www.home-assistant.io/integrations/demo/)
- [Template Sensors](https://www.home-assistant.io/integrations/template)
- [Input Number](https://www.home-assistant.io/integrations/input_number/)
- [Custom Cards Documentation](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)

Nyní máte plně funkční testovací prostředí pro HA Boiler Card! 🎉
