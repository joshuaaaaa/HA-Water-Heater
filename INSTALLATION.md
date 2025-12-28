# Instalační průvodce

## Rychlá instalace

### 1. Pomocí HACS (Home Assistant Community Store)

> HACS je doporučený způsob instalace

1. Otevřete HACS v Home Assistant
2. Klikněte na "Frontend"
3. Klikněte na tlačítko "+" v pravém dolním rohu
4. Vyhledejte "HA Boiler Card"
5. Klikněte na "Install"
6. Restartujte Home Assistant

### 2. Manuální instalace

#### Krok 1: Stáhněte soubor

Stáhněte `ha-boiler-card.js` z [releases](https://github.com/your-username/ha-boiler-card/releases) nebo sestavte projekt sami:

```bash
git clone https://github.com/your-username/ha-boiler-card.git
cd ha-boiler-card
npm install
npm run build
```

#### Krok 2: Zkopírujte do Home Assistant

Zkopírujte `dist/ha-boiler-card.js` do složky `config/www/` na vašem Home Assistant serveru.

```bash
# Například pomocí SCP
scp dist/ha-boiler-card.js user@homeassistant:/config/www/
```

Nebo použijte File Editor add-on v Home Assistant.

#### Krok 3: Registrujte JavaScript modul

Přidejte resource do Lovelace:

**Metoda A: Přes UI (doporučeno)**

1. Přejděte na Nastavení → Dashboards
2. Klikněte na tři tečky v pravém horním rohu
3. Vyberte "Resources"
4. Klikněte na "+ Add Resource"
5. Zadejte URL: `/local/ha-boiler-card.js`
6. Typ: JavaScript Module
7. Klikněte na "Create"

**Metoda B: Editace YAML**

Upravte `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/ha-boiler-card.js
      type: module
```

#### Krok 4: Restart

Restartujte Home Assistant nebo refreshujte cache prohlížeče (Ctrl+F5).

## Ověření instalace

1. Přejděte na váš Lovelace dashboard
2. Klikněte na "Edit Dashboard"
3. Klikněte na "+ Add Card"
4. Posuňte se dolů na "Custom" sekci
5. Měli byste vidět "Custom: HA Boiler Card"

Pokud kartu nevidíte, zkontrolujte:
- Že jste restartovali Home Assistant
- Že je soubor ve správné složce
- Konzoli prohlížeče (F12) na chybové hlášky

## První nastavení

Po instalaci přidejte kartu na dashboard:

### UI Editor

1. Klikněte na "Edit Dashboard"
2. "+ Add Card"
3. Vyhledejte "HA Boiler Card"
4. Klikněte na kartu

### YAML Editor

```yaml
type: custom:ha-boiler-card
title: Můj bojler
sensors:
  - entity: sensor.boiler_temp_top
    name: Horní
    position: 1
  - entity: sensor.boiler_temp_bottom
    name: Spodní
    position: 5
```

## Aktualizace

### HACS

1. Otevřete HACS → Frontend
2. Najděte "HA Boiler Card"
3. Pokud je dostupná nová verze, zobrazí se tlačítko "Update"
4. Klikněte na "Update"
5. Refreshujte cache prohlížeče (Ctrl+F5)

### Manuálně

1. Stáhněte novou verzi
2. Nahraďte starý soubor v `/config/www/`
3. Refreshujte cache prohlížeče (Ctrl+F5)

## Řešení problémů

### Karta se nezobrazuje

- Zkontrolujte Developer Tools → Logs pro chyby
- Otevřete konzoli prohlížeče (F12) a hledejte chybové hlášky
- Ověřte, že je soubor správně načten (Network tab v Developer Tools)
- Vymažte cache prohlížeče

### Senzory neukazují teplotu

- Zkontrolujte, že entity ID jsou správně
- Ověřte, že senzory existují v Developer Tools → States
- Zkontrolujte, že senzory mají numerickou hodnotu

### Grafika se nezobrazuje správně

- Zkuste jiný prohlížeč
- Vymažte cache
- Zkontrolujte, že máte nejnovější verzi karty

### Indikátor ohřívání nefunguje

- Ověřte, že `heating_entity` existuje
- Zkontrolujte, že entita má stav `on`, `off`, nebo `heating`
- V Developer Tools → States zkontrolujte stav entity

## Podpora

Pokud máte problémy:

1. Zkontrolujte [Issues](https://github.com/your-username/ha-boiler-card/issues)
2. Vytvořte nový Issue s:
   - Verzí Home Assistant
   - Verzí karty
   - Konfigurací (YAML)
   - Chybovými hláškami z konzole
   - Screenshoty problému
