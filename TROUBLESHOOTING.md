# Průvodce řešením problémů

## Problém: "Po výběru senzorů se karta nezobrazuje"

### Řešení ve verzi 1.1.1:

Karta nyní zobrazí jasné chybové hlášky a upozornění:

#### 1. Načítání
Pokud karta ještě načítá data z HA:
```
┌─────────────────────┐
│ Načítání...         │
└─────────────────────┘
```

#### 2. Chybná konfigurace
Pokud je chyba v konfiguraci:
```
┌─────────────────────────────┐
│ Chyba: Neplatná konfigurace │
└─────────────────────────────┘
```

#### 3. Neexistující entity
Pokud entity v konfiguraci neexistují v HA, zobrazí se s varováním:
```
┌──────────────────────────────┐
│ ⚠️ sensor.boiler_top    N/A  │  <- Červené pozadí
│ ✓ sensor.boiler_middle  45°C │  <- OK
└──────────────────────────────┘
```

## Jak správně nakonfigurovat kartu:

### Krok 1: Ověřte entity v Home Assistant

1. Přejděte na **Developer Tools** → **States**
2. Najděte vaše teplotní senzory (např. `sensor.boiler_temp_*`)
3. Zkopírujte přesné **Entity ID**

### Krok 2: Minimální funkční konfigurace

```yaml
type: custom:ha-boiler-card
title: Test Bojler
sensors:
  - entity: sensor.YOUR_ACTUAL_SENSOR_1  # ← NAHRAĎTE svým entity ID!
    name: Horní
    position: 1
```

**DŮLEŽITÉ:**
- Nahraďte `sensor.YOUR_ACTUAL_SENSOR_1` vaším skutečným entity ID
- Entity musí existovat v HA
- Entity musí mít numerickou hodnotu (teplotu)

### Krok 3: Příklad s reálnými senzory

Pokud máte například tyto senzory v HA:
- `sensor.living_room_temperature`
- `sensor.bedroom_temperature`
- `sensor.bathroom_temperature`

Použijte:

```yaml
type: custom:ha-boiler-card
title: Bojler
sensors:
  - entity: sensor.living_room_temperature
    name: Horní část
    position: 1
  - entity: sensor.bedroom_temperature
    name: Střed
    position: 3
  - entity: sensor.bathroom_temperature
    name: Spodní část
    position: 5
```

### Krok 4: Testovací konfigurace (pokud nemáte teplotní senzory)

Pokud zatím nemáte teplotní senzory od bojleru, můžete použít JAKÉKOLIV teplotní senzory pro test:

```yaml
type: custom:ha-boiler-card
title: Test Karta
sensors:
  - entity: sensor.processor_temperature  # CPU teplota
    name: Test senzor
    position: 3
```

## Časté chyby:

### ❌ Chyba 1: Neexistující entity
```yaml
sensors:
  - entity: sensor.boiler_top  # ← Tato entita NEEXISTUJE v HA
```

**Řešení:**
- Zkontrolujte Developer Tools → States
- Použijte přesné entity ID

### ❌ Chyba 2: Špatný formát
```yaml
sensors:
  - sensor.boiler_top  # ← CHYBÍ "entity:"
```

**Řešení:**
```yaml
sensors:
  - entity: sensor.boiler_top  # ✓ Správně
```

### ❌ Chyba 3: Ne-teplotní senzor
```yaml
sensors:
  - entity: binary_sensor.door  # ← Toto není teplotní senzor (nemá číslo)
```

**Řešení:** Použijte pouze senzory s numerickou hodnotou

## Debug postup:

### 1. Otevřete Browser Console (F12)

Hledejte chyby typu:
```
Error: Entity not found: sensor.xxx
```

### 2. Zkontrolujte Developer Tools

**Developer Tools → States:**
- Vyhledejte vaše senzory
- Zkopírujte přesné entity ID
- Ověřte, že mají numerickou hodnotu

### 3. Testovací minimální konfigurace

Začněte s JEDNÍM senzorem:

```yaml
type: custom:ha-boiler-card
sensors:
  - entity: sensor.VASE_ENTITA  # ← Nahraďte
```

Pokud toto funguje, přidávejte další senzory postupně.

### 4. Zkontrolujte HACS instalaci

1. HACS → Frontend → HA Boiler Card
2. Zkontrolujte verzi (mělo by být v1.1.1 nebo vyšší)
3. Pokud ne, aktualizujte

## Praktický příklad - krok za krokem:

### Scénář: Mám DS18B20 senzory na bojleru

1. **Najděte entity v HA:**
   ```
   sensor.ds18b20_1_temperature
   sensor.ds18b20_2_temperature
   sensor.ds18b20_3_temperature
   ```

2. **Vytvořte konfiguraci:**
   ```yaml
   type: custom:ha-boiler-card
   title: Můj bojler
   sensors:
     - entity: sensor.ds18b20_1_temperature
       name: Vrchol
       position: 1
     - entity: sensor.ds18b20_2_temperature
       name: Střed
       position: 3
     - entity: sensor.ds18b20_3_temperature
       name: Dno
       position: 5
   ```

3. **Přidejte do dashboardu**

4. **Zkontrolujte výsledek:**
   - Měli byste vidět bojler
   - Tři teplotní senzory vpravo
   - Průměrnou teplotu

## Potřebujete pomoc?

Pokud problém přetrvává:

1. **Zkopírujte svou konfiguraci**
2. **Udělejte screenshot browser console (F12)**
3. **Vytvořte issue na GitHubu** s:
   - Vaší konfigurací
   - Screenshotem chyby
   - Verzí HA
   - Verzí karty

## Co je NOVÉ v 1.1.1:

✅ Karta se nyní vždy zobrazí, i když entity neexistují
✅ Jasné chybové zprávy místo prázdné obrazovky
✅ Červené upozornění u neexistujících entit
✅ Tooltip s informací o chybějící entitě
✅ "Načítání..." stav když se karta inicializuje

Nyní byste měli okamžitě vidět, co je špatně!
