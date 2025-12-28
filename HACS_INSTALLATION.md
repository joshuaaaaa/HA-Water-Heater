# HACS Instalace - Krok za krokem 📦

Tento průvodce vás provede instalací HA Boiler Card přes HACS jako custom repository.

## Co je HACS?

HACS (Home Assistant Community Store) je community store pro Home Assistant, který umožňuje snadnou instalaci custom komponent, kart a témat.

Pokud ještě nemáte HACS nainstalovaný, postupujte podle [oficiální dokumentace HACS](https://hacs.xyz/docs/setup/download).

---

## Instalace HA Boiler Card

### Krok 1: Otevřete HACS

1. V Home Assistant přejděte na **HACS** v postranním menu
2. Pokud nevidíte HACS v menu, ujistěte se, že máte HACS správně nainstalovaný

### Krok 2: Přidejte Custom Repository

1. V HACS klikněte na **Frontend** (ikona puzzle piece)
2. Klikněte na **tři tečky (⋮)** v pravém horním rohu
3. Vyberte **"Custom repositories"** z menu

### Krok 3: Zadejte údaje repository

V dialogovém okně vyplňte:

- **Repository:**
  ```
  https://github.com/your-username/ha-boiler-card
  ```
  *(Nahraďte `your-username` skutečným uživatelským jménem)*

- **Category:**
  Vyberte **"Lovelace"** z rozbalovacího menu

- Klikněte na **"ADD"**

### Krok 4: Nainstalujte kartu

1. Zavřete dialog s custom repositories
2. V HACS Frontend vyhledejte **"HA Boiler Card"**
3. Klikněte na kartu v seznamu
4. Klikněte na tlačítko **"DOWNLOAD"** (nebo "INSTALL" v některých verzích HACS)
5. Potvrďte instalaci

### Krok 5: Restartujte nebo obnovte

Po instalaci máte dvě možnosti:

**Možnost A: Rychlé obnovení (doporučeno)**
- Stiskněte **Ctrl+F5** (Windows/Linux) nebo **Cmd+Shift+R** (Mac) pro vymazání cache a obnovení stránky

**Možnost B: Restart Home Assistant**
- Přejděte na **Nastavení** → **Systém** → **RESTART**

### Krok 6: Ověření instalace

1. Přejděte na váš Lovelace dashboard
2. Klikněte na **"Edit Dashboard"** (tři tečky v pravém horním rohu)
3. Klikněte na **"+ ADD CARD"**
4. Posuňte se dolů do sekce **"Custom"** nebo vyhledejte **"boiler"**
5. Měli byste vidět **"Custom: HA Boiler Card"**

✅ **Gratulujeme! Karta je nainstalována.**

---

## První použití

### Přidání karty na dashboard

1. V editačním módu dashboardu klikněte **"+ ADD CARD"**
2. Najděte a klikněte na **"Custom: HA Boiler Card"**
3. Konfigurujte kartu pomocí UI editoru nebo YAML

### Příklad základní konfigurace:

```yaml
type: custom:ha-boiler-card
title: Bojler
sensors:
  - entity: sensor.boiler_temp_top
    name: Horní senzor
    position: 1
  - entity: sensor.boiler_temp_middle
    name: Střední senzor
    position: 3
  - entity: sensor.boiler_temp_bottom
    name: Spodní senzor
    position: 5
```

**Důležité:** Nahraďte `sensor.boiler_temp_*` vašimi skutečnými entity ID z Home Assistant!

---

## Aktualizace karty

Když je k dispozici nová verze:

1. Otevřete HACS → Frontend
2. Najděte "HA Boiler Card"
3. Pokud je dostupná aktualizace, zobrazí se tlačítko **"UPDATE"**
4. Klikněte na **"UPDATE"**
5. Potvrďte aktualizaci
6. Obnovte cache prohlížeče (Ctrl+F5)

HACS automaticky kontroluje aktualizace a upozorní vás, když je k dispozici nová verze.

---

## Řešení problémů

### Karta se nezobrazuje v seznamu po instalaci

**Řešení:**
1. Vymažte cache prohlížeče (Ctrl+Shift+Delete)
2. Zavřete a znovu otevřete prohlížeč
3. Restartujte Home Assistant
4. Zkontrolujte **Developer Tools** → **Logs** pro chybové hlášky

### Custom repository nelze přidat

**Možné příčiny:**
- Špatná URL (zkontrolujte překlepy)
- Repository neexistuje nebo je privátní
- GitHub je nedostupný

**Řešení:**
- Ověřte URL repository
- Zkontrolujte internetové připojení
- Zkuste to znovu za chvíli

### Chyba "Integration not found"

**Řešení:**
- Ujistěte se, že jste vybrali kategorii **"Lovelace"**, ne "Integration"
- HA Boiler Card je Lovelace karta, ne integrace

### Po instalaci se zobrazuje chyba v konzoli

**Řešení:**
1. Otevřete Developer Tools v prohlížeči (F12)
2. Podívejte se do záložky **Console**
3. Zkopírujte chybovou hlášku
4. Vytvořte issue na GitHubu s popisem problému

---

## Podpora

Pokud máte problémy nebo otázky:

- 📖 [README](README.md) - Kompletní dokumentace
- 🐛 [Issues](https://github.com/your-username/ha-boiler-card/issues) - Nahlášení chyb
- 💡 [Discussions](https://github.com/your-username/ha-boiler-card/discussions) - Dotazy a nápady

---

## Další zdroje

- [HACS Dokumentace](https://hacs.xyz/)
- [Home Assistant Lovelace](https://www.home-assistant.io/lovelace/)
- [Příklady konfigurace](example-config.yaml)

Děkujeme za použití HA Boiler Card! 🎉
