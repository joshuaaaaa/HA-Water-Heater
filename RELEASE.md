# Vytvoření Release pro HACS

Tento dokument popisuje, jak vytvořit release pro HA Boiler Card, aby byl dostupný přes HACS.

## Proč je release potřeba?

HACS vyžaduje, aby repository mělo alespoň jeden release (tag), aby bylo možné kartu nainstalovat. Bez release HACS kartu nenajde.

## Automatické vytvoření release (Doporučeno)

Projekt obsahuje GitHub Actions workflow, který automaticky vytvoří release při pushnutí tagu.

### Kroky:

1. **Přejděte do repository na GitHubu**

2. **Vytvořte nový release:**
   - Klikněte na **"Releases"** v pravém panelu
   - Klikněte na **"Create a new release"** nebo **"Draft a new release"**

3. **Vyplňte údaje release:**
   - **Tag version:** `v1.0.0` (vytvořte nový tag)
   - **Target:** vyberte branch `claude/ha-boiler-card-JtRhX` nebo `main`
   - **Release title:** `v1.0.0 - Initial Release`
   - **Description:** Zkopírujte obsah z `CHANGELOG.md`

4. **Přidejte soubory:**
   - GitHub Actions automaticky sestaví a přidá `ha-boiler-card.js`
   - Nebo ručně nahrajte `dist/ha-boiler-card.js`

5. **Publikujte release:**
   - Klikněte na **"Publish release"**

## Manuální vytvoření release (Pokud GitHub Actions nefunguje)

### Krok 1: Sestavte projekt

```bash
npm install
npm run build
```

### Krok 2: Vytvořte ZIP archiv

```bash
cd dist
zip ha-boiler-card.zip ha-boiler-card.js ha-boiler-card.js.map
cd ..
```

### Krok 3: Vytvořte release na GitHubu

1. Přejděte do repository na GitHubu
2. Klikněte na **"Releases"** → **"Create a new release"**
3. Vyplňte:
   - **Tag:** `v1.0.0`
   - **Title:** `v1.0.0 - Initial Release`
   - **Description:** Text z CHANGELOG.md
4. Nahrajte soubory:
   - `dist/ha-boiler-card.js`
   - `dist/ha-boiler-card.zip` (volitelné)
5. Klikněte **"Publish release"**

## Ověření release pro HACS

Po vytvoření release ověřte:

### 1. Kontrola struktury

- ✅ Repository obsahuje `hacs.json`
- ✅ Repository obsahuje `info.md`
- ✅ Repository obsahuje `README.md`
- ✅ Release obsahuje tag začínající `v` (např. `v1.0.0`)
- ✅ Release obsahuje soubor `ha-boiler-card.js`

### 2. Kontrola obsahu hacs.json

```json
{
  "name": "HA Boiler Card",
  "render_readme": true,
  "filename": "ha-boiler-card.js",
  "homeassistant": "2023.1.0"
}
```

### 3. Test v HACS

1. Přidejte repository jako custom repository v HACS
2. URL: `https://github.com/your-username/ha-boiler-card`
3. Kategorie: **Lovelace**
4. Pokud vše funguje správně, karta se objeví v seznamu

## Vytvoření dalších releases

Při vydání nové verze:

1. **Aktualizujte verzi** v `package.json`
2. **Aktualizujte** `CHANGELOG.md` s novými změnami
3. **Commitněte změny**
4. **Vytvořte nový tag:**
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0 - Popis změn"
   git push origin v1.1.0
   ```
5. **GitHub Actions** automaticky vytvoří release

## Troubleshooting

### "No releases found" v HACS

- Ujistěte se, že release je publikovaný (ne draft)
- Zkontrolujte, že tag začína `v` (např. `v1.0.0`)
- Počkejte 5-10 minut, HACS cachuje data

### "File not found" při instalaci

- Ověřte, že `filename` v `hacs.json` odpovídá názvu souboru v release
- Ujistěte se, že soubor je přiložen k release

### HACS validace selhává

- Spusťte HACS validaci lokálně:
  ```bash
  docker run --rm -v $(pwd):/github/workspace ghcr.io/hacs/action:main
  ```

## Další informace

- [HACS Dokumentace](https://hacs.xyz/docs/publish/start)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Semantic Versioning](https://semver.org/)

---

## Quick Reference - Release Checklist

Před vytvořením release:

- [ ] Sestavit projekt (`npm run build`)
- [ ] Aktualizovat verzi v `package.json`
- [ ] Aktualizovat `CHANGELOG.md`
- [ ] Commitnout všechny změny
- [ ] Vytvořit tag (např. `v1.0.0`)
- [ ] Vytvořit release na GitHubu s tagem
- [ ] Přiložit `dist/ha-boiler-card.js` k release
- [ ] Publikovat release
- [ ] Ověřit dostupnost v HACS

---

**Poznámka:** První release `v1.0.0` je již připraven lokálně s tagem. Stačí vytvořit release na GitHubu pomocí kroků výše.
