# Přispívání do projektu

Děkujeme za váš zájem přispět do HA Boiler Card! 🎉

## Jak přispět

### Nahlášení chyb

Pokud najdete chybu:

1. Zkontrolujte [existující issues](https://github.com/your-username/ha-boiler-card/issues)
2. Pokud problém ještě není nahlášen, vytvořte nový issue
3. Uveďte:
   - Verzi Home Assistant
   - Verzi HA Boiler Card
   - Kroky k reprodukci
   - Očekávané chování
   - Aktuální chování
   - Screenshoty (pokud je to relevantní)
   - Chybové hlášky z konzole

### Návrhy nových funkcí

Máte nápad na vylepšení?

1. Zkontrolujte [existující feature requests](https://github.com/your-username/ha-boiler-card/issues?q=label%3Aenhancement)
2. Vytvořte nový issue s označením "enhancement"
3. Popište:
   - Co chcete dosáhnout
   - Proč by to bylo užitečné
   - Jak by to mělo fungovat

### Pull Requests

1. Forkněte repository
2. Vytvořte novou větev (`git checkout -b feature/amazing-feature`)
3. Proveďte změny
4. Otestujte své změny
5. Commitněte (`git commit -m 'Add some amazing feature'`)
6. Pushněte do větve (`git push origin feature/amazing-feature`)
7. Otevřete Pull Request

## Vývojové prostředí

### Požadavky

- Node.js 18 nebo vyšší
- npm nebo yarn
- Home Assistant instance pro testování

### Nastavení

```bash
# Naklonovat repository
git clone https://github.com/your-username/ha-boiler-card.git
cd ha-boiler-card

# Nainstalovat závislosti
npm install

# Spustit watch mode pro vývoj
npm run watch
```

### Build

```bash
# Produkční build
npm run build

# Lint
npm run lint
```

### Testování

1. Zkopírujte `dist/ha-boiler-card.js` do `/config/www/` ve vašem HA
2. Refreshujte prohlížeč (Ctrl+F5)
3. Testujte změny

Nebo použijte symbolický link pro rychlejší vývoj:

```bash
ln -s $(pwd)/dist/ha-boiler-card.js /path/to/homeassistant/config/www/ha-boiler-card.js
```

## Coding Standards

### TypeScript

- Používejte TypeScript strict mode
- Definujte typy pro všechny parametry a návratové hodnoty
- Vyhýbejte se `any` typu kde je to možné

### Styling

- Používejte Lit CSS
- Respektujte HA theme variables (`var(--primary-color)`, atd.)
- Mobile-first responsive design

### Commity

Používejte [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - nová funkce
- `fix:` - oprava chyby
- `docs:` - dokumentace
- `style:` - formátování, chybějící středníky atd.
- `refactor:` - refaktoring kódu
- `test:` - přidání testů
- `chore:` - údržba

Příklady:
```
feat: add heat indicator animation
fix: sensor values not updating
docs: update installation instructions
```

## Struktura projektu

```
ha-boiler-card/
├── src/
│   └── ha-boiler-card.ts    # Hlavní zdrojový soubor
├── dist/                     # Build výstup
├── package.json              # Závislosti
├── tsconfig.json            # TypeScript config
├── rollup.config.mjs        # Build config
└── README.md                # Dokumentace
```

## Release proces

1. Aktualizujte verzi v `package.json`
2. Aktualizujte CHANGELOG.md
3. Commitněte změny
4. Vytvořte tag (`git tag v1.x.x`)
5. Pushněte tag (`git push --tags`)
6. GitHub Actions automaticky vytvoří release

## Otázky?

Neváhejte vytvořit issue s otázkou nebo se zeptat v [discussions](https://github.com/your-username/ha-boiler-card/discussions).

Děkujeme za vaše příspěvky! 🙏
