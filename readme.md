# 📡 Terminal UI Framework

> A dependency-free CSS/JS framework for building retro terminal-inspired web interfaces.

**Terminal UI** is the clearnet-friendly parent of **Torminal CSS**.  
Torminal stays strict for Tor and zero-JS environments; Terminal UI is allowed to use Vanilla JavaScript for richer interaction: modals, tabs, toasts, dropdowns, lightbox, copy helpers, theme switching, and a command palette.

---

## Key Features

- **Zero runtime dependencies:** no React, jQuery, Bootstrap, or build step.
- **Vanilla JS enhancements:** modal, tabs, accordion, dropdown, toast, lightbox, file labels, copy-to-clipboard, theme switcher, and command palette.
- **Reusable CSS primitives:** cards, windows, status lines, toolbar, grid, forms, tables, lists, chat bubbles, badges, progress bars, LED indicators, dashboard metrics, and **bilingual text swaps**.
- **Theme presets:** green, amber, cyan, and red via `data-terminal-theme`.
- **Progressive enhancement:** older inline `onclick="Terminal.*"` usage still works, but new components can use `data-t-*` attributes.
- **Accessibility improvements:** keyboard focus states, Escape-to-close modals, reduced-motion support, and safer text rendering in JS helpers.

---

## Terminal vs Torminal

| Project | Target | JavaScript | Best for |
|---|---:|---:|---|
| **Terminal UI** | Clearnet / normal web | Allowed | Dashboards, docs, apps, demos, interactive tools |
| **Torminal CSS** | Tor Browser / safest environments | Avoided | Onion services, zero-JS interfaces, privacy-first apps |

---

## Quick Start

```html
<!DOCTYPE html>
<html lang="en" data-terminal-theme="green">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminal App</title>
    <link rel="stylesheet" href="terminal.css">
</head>
<body class="t-crt">
    <main class="t-container">
        <div class="t-card">
            <div class="t-card-header">> SYSTEM_INIT <span class="t-blink">_</span></div>
            <p class="text-muted">Welcome to Terminal UI.</p>
            <button class="t-btn" onclick="Terminal.toast('Connection stable')">TEST TOAST</button>
        </div>
    </main>

    <script src="terminal.js"></script>
</body>
</html>
```

---

## Built with Terminal UI
Projects utilizing this framework:
1. **[Phosphor](https://github.com/jeannesbryan/phosphor)** - A Nostr protocol web client.
2. **[IDES](https://github.com/kaluluosi/IDES)** - An autonomous Rust-based AI agent.

---

## Documentation

Open `docs.html` in a browser to view the full component manual.

---

## License & Attribution

Developed by **Jeannes Bryan** for open-source terminal-inspired interfaces.