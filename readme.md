# 📡 Terminal UI Framework

> A dependency-free CSS/JS framework for building retro terminal-inspired web interfaces.

**Terminal UI** is the clearnet-friendly parent of **Torminal CSS**.  
Torminal stays strict for Tor and zero-JS environments; Terminal UI is allowed to use Vanilla JavaScript for richer interaction: modals, tabs, toasts, dropdowns, lightbox, copy helpers, theme switching, and a command palette.

---

## About

**Recommended GitHub About:**

```text
Dependency-free CSS/JS framework for retro terminal-inspired web interfaces.
```

Alternative with more cyberpunk flavor:

```text
Vanilla CSS/JS framework for cyberpunk dashboards and terminal-inspired web apps.
```

---

## Key Features

- **Zero runtime dependencies:** no React, jQuery, Bootstrap, or build step.
- **Vanilla JS enhancements:** modal, tabs, accordion, dropdown, toast, lightbox, file labels, copy-to-clipboard, theme switcher, and command palette.
- **Reusable CSS primitives:** cards, windows, status lines, toolbar, grid, forms, tables, lists, chat bubbles, badges, progress bars, LED indicators, and dashboard metrics.
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

## Data Attribute API

You can still call `Terminal.*` functions directly, but v10 adds a cleaner HTML-first API.

### Modal

```html
<button class="t-btn" data-t-modal-open="demo-modal">OPEN MODAL</button>

<div id="demo-modal" class="t-modal">
    <div class="t-modal-content">
        <div class="t-card-header">> MODAL</div>
        <p>Hello from Terminal UI.</p>
        <button class="t-btn danger" data-t-modal-close="demo-modal">CLOSE</button>
    </div>
</div>
```

### Theme switcher

```html
<button class="t-btn" data-t-theme="green">GREEN</button>
<button class="t-btn warning" data-t-theme="amber">AMBER</button>
<button class="t-btn info" data-t-theme="cyan">CYAN</button>
<button class="t-btn danger" data-t-theme="red">RED</button>
```

### Copy helper

```html
<pre id="install-code" class="t-code">npm install terminal-ui</pre>
<button class="t-btn t-btn-sm" data-t-copy="install-code">COPY</button>
```

### Navbar toggle

```html
<button class="t-nav-toggler" data-t-navbar-toggle="main-menu">[ MENU ]</button>
<div id="main-menu" class="t-nav-menu t-nav-collapse">
    <a href="#">[ HOME ]</a>
</div>
```

### Command palette

Press:

```text
Ctrl + K
```

or on macOS:

```text
⌘ + K
```

Register links as commands:

```html
<a href="docs.html" data-t-command="Open documentation">Docs</a>
```

---

## Files

```text
terminal.css   # Core CSS framework
terminal.js    # Vanilla JS helpers
index.html     # Landing page
docs.html      # Component documentation
README.md      # Project README
```

---

## Documentation

Open `docs.html` in a browser to view the full component manual.

---

## License & Attribution

Developed by **Jeannes Bryan** for open-source terminal-inspired interfaces.
