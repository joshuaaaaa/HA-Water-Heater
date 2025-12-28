# Řešení problému "Card not found" / "Karta nebyla nalezena"

## Problém
Po instalaci se zobrazuje chyba: "Custom element doesn't exist: ha-boiler-card" nebo podobná.

## Řešení - krok po kroku

### Krok 1: Vymazání cache prohlížeče (NEJDŮLEŽITĚJŠÍ!)

Home Assistant agresivně cachuje JavaScript soubory. Musíte vynutit tvrdý refresh:

**Windows/Linux:**
- Chrome/Edge: `Ctrl + Shift + Delete` → Vyberte "Cached images and files" → Clear
- Firefox: `Ctrl + Shift + Delete` → Vyberte vše → Clear

**Mac:**
- Chrome/Edge: `Cmd + Shift + Delete`
- Safari: `Cmd + Option + E`

**Pak proveďte tvrdý refresh stránky:**
- Windows/Linux: `Ctrl + Shift + R` nebo `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### Krok 2: Zkontrolujte Developer Console

1. Otevřete Developer Tools (F12)
2. Přejděte na záložku "Console"
3. Obnovte stránku (F5)
4. Hledejte chyby vztahující se k "ha-boiler-card"

**Možné chyby a řešení:**

❌ `Failed to load resource: net::ERR_FILE_NOT_FOUND`
→ Soubor není správně nahrán nebo cesta je špatná

❌ `Uncaught SyntaxError: Unexpected token`
→ Soubor je poškozen, zkuste znovu stáhnout

❌ `Custom element doesn't exist: ha-boiler-card`
→ JavaScript soubor se nenačetl nebo je stará verze v cache

### Krok 3: Ověřte resource v Home Assistant

1. Jděte do **Nastavení** → **Dashboards** → **⋮** (tři tečky nahoře vpravo) → **Resources**
2. Zkontrolujte, že tam je:
   - URL: `/local/ha-boiler-card.js` (manuální instalace)
   - NEBO: `/hacsfiles/ha-boiler-card/ha-boiler-card.js` (HACS)
   - Type: **JavaScript Module**

3. Zkuste resource **SMAZAT** a znovu přidat:
   - Klikněte na resource → Delete
   - Klikněte "ADD RESOURCE"
   - Přidejte znovu se správnou cestou
   - Type: JavaScript Module

### Krok 4: Ověřte, že soubor existuje

Připojte se k vašemu Home Assistant serveru a zkontrolujte:

**Pro manuální instalaci:**
```bash
ls -lh /config/www/ha-boiler-card.js
```
Soubor by měl mít velikost ~60-80 KB

**Pro HACS:**
```bash
ls -lh /config/custom_components/ha-boiler-card/
```

### Krok 5: Zkontrolujte verzi souboru

Otevřete soubor a zkontrolujte, že obsahuje správnou registraci:

```bash
grep "custom:ha-boiler-card" /config/www/ha-boiler-card.js
```

Měli byste vidět: `type:"custom:ha-boiler-card"`

**Pokud vidíte** `type:"ha-boiler-card"` (bez "custom:"), máte starou verzi!

### Krok 6: Restart Home Assistant

1. **Nastavení** → **Systém** → **Restart**
2. Počkejte, až se HA znovu načte
3. Vymažte cache prohlížeče ZNOVU
4. Tvrdý refresh (Ctrl+Shift+R)

### Krok 7: Zkuste jiný prohlížeč

Někdy pomůže zkusit úplně jiný prohlížeč (Chrome → Firefox nebo naopak), abyste vyloučili problém s cache.

### Krok 8: Ruční instalace souboru (pokud nic nepomáhá)

1. Stáhněte soubor z repository:
   ```bash
   wget https://raw.githubusercontent.com/your-username/ha-boiler-card/main/dist/ha-boiler-card.js
   ```

2. Zkopírujte do `/config/www/`:
   ```bash
   cp ha-boiler-card.js /config/www/
   ```

3. Přidejte resource v HA (pokud ještě není):
   - URL: `/local/ha-boiler-card.js`
   - Type: JavaScript Module

4. Restart HA + vymazání cache

## Pro HACS uživatele - Konkrétní kroky

1. Otevřete HACS
2. Najděte "HA Boiler Card"
3. Klikněte na kartu
4. Klikněte **"Redownload"** nebo **"Update"**
5. Počkejte, až se stáhne
6. **Developer Tools** → **Services** → Zavolejte:
   ```yaml
   service: frontend.reload_themes
   ```
7. **Vymažte cache prohlížeče** (Ctrl+Shift+Delete)
8. **Tvrdý refresh** (Ctrl+Shift+R)

## Testování

Po všech krocích zkuste přidat kartu na dashboard:

```yaml
type: custom:ha-boiler-card
title: Test
sensors:
  - entity: sensor.time  # Použijte jakýkoliv existující senzor pro test
    position: 3
```

## Stále nefunguje?

Pokud nic nepomohlo, poskytněte následující informace:

1. **Screenshoty z Developer Console** (F12 → Console)
2. **Obsah Resources** (Screenshot z Nastavení → Dashboards → Resources)
3. **Výstup z příkazu:**
   ```bash
   ls -lh /config/www/ha-boiler-card.js
   head -5 /config/www/ha-boiler-card.js
   grep "type:" /config/www/ha-boiler-card.js | grep -i card
   ```
4. **Verze Home Assistant** (Nastavení → O Home Assistantovi)
5. **Prohlížeč a verze**

## Rychlý checklist

- [ ] Vymazána cache prohlížeče (Ctrl+Shift+Delete)
- [ ] Tvrdý refresh (Ctrl+Shift+R)
- [ ] Resource správně přidán v HA
- [ ] Soubor existuje v /config/www/
- [ ] Soubor obsahuje "custom:ha-boiler-card" (ne jen "ha-boiler-card")
- [ ] Restart Home Assistant
- [ ] Zkušen jiný prohlížeč
- [ ] Developer Console neobsahuje chyby
