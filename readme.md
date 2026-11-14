# 📡 Terminal UI Framework

> A dependency-free CSS/JS framework for building retro terminal-inspired web interfaces.

**Terminal UI** is the clearnet-friendly parent of **Torminal CSS**.  
Torminal stays strict for Tor and zero-JS environments; Terminal UI is allowed to use Vanilla JavaScript for richer interaction: modals, tabs, toasts, dropdowns, lightbox, copy helpers, theme switching, and a command palette.

---

## Key Features

- **Zero runtime dependencies:** no React, jQuery, Bootstrap, or build step.
- **Vanilla JS enhancements:** modal, tabs, accordion, dropdown, toast, lightbox, file labels, copy-to-clipboard, theme switcher, and command palette.
- **Reusable CSS primitives:** cards, windows, status lines, toolbar, grid, forms, tables, lists, chat bubbles, badges, progress bars, LED indicators, dashboard metrics, and **bilingual text swaps**.
- **Container queries (opt-in):** grids can respond to the width of their own box instead of the viewport, so a three-column metric grid inside a narrow card collapses instead of squeezing. See [Container Queries](#container-queries).
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

## Container Queries

Every grid in this framework used to answer the viewport. That works while a component spans the page, and stops working the moment the same component sits in a narrow column: a three-column metric grid inside a 380px card on a 1400px screen still rendered three cramped columns, because the viewport was wide.

Add `t-cq` to a wrapper and the grids inside it answer that wrapper's width instead.

```html
<div class="t-cq">
    <div class="t-metric-grid">
        <div class="t-metric"><span class="t-metric-value">12</span><span class="t-metric-label">EVENTS</span></div>
        <div class="t-metric"><span class="t-metric-value">4</span><span class="t-metric-label">PEERS</span></div>
        <div class="t-metric"><span class="t-metric-value">98%</span><span class="t-metric-label">UPTIME</span></div>
    </div>
</div>
```

Components that follow their container: `.t-grid-2`, `.t-grid-3`, `.t-metric-grid`, `.t-kv`, `.t-action-grid`, `.t-masonry`.

| Container width | `.t-grid-2` | `.t-grid-3` | `.t-metric-grid` | `.t-masonry` |
|---|---|---|---|---|
| up to 479px | 1 col | 1 col | 1 col | 1 col |
| 480 to 519px | 1 col | 1 col | 1 col | 2 col |
| 520 to 700px | 2 col | 2 col | 2 col | 2 col |
| 701 to 779px | 2 col | 2 col | 2 col | 3 col |
| 780px and up | 2 col | 3 col | 3 col | 3 col |

Two things worth knowing before you use it.

**It is opt-in on purpose.** `container-type: inline-size` establishes a containment context, which is a layout change no page asked for. Add it to a wrapper whose contents you know. A named variant `t-cq-panel` exists if you need to target a specific nested context instead of the nearest one.

**The old media queries are still there.** They serve browsers without container query support, and elements outside any `t-cq`. Nothing changes on a page until it opts in, and opting in degrades gracefully.

### A measurement worth keeping

`container-type` and `contain` are not interchangeable, and the difference is not obvious. Measured in Chrome 157, `position: fixed` child inside a wrapper offset 300px from the left edge:

| Declaration on the wrapper | Position of the fixed child |
|---|---|
| `contain: layout` | x=301, trapped in the wrapper |
| `contain: paint` | x=301, trapped |
| `container-type: inline-size` | x=0, still fixed to the viewport |

So `contain: layout` anchors fixed descendants to the wrapper, but `container-type: inline-size` did not in that browser. If you swap one for the other expecting identical behaviour, measure it first. This framework keeps the context opt-in partly because of that uncertainty: `.t-modal`, `.t-lightbox`, `.t-toast-container`, `.t-sidebar` and `.t-command-palette` are all `position: fixed`, and anchoring them to a card instead of the viewport is a bug that is very hard to trace back to a CSS one-liner.

### Tests

```bash
node tests/terminal-cq.test.mjs
```

51 assertions. The file checks complementarity of every breakpoint pair per selector and per context, because the failure mode of a breakpoint is silent: two overlapping ranges or a one-pixel hole produce no error and no visual clue until someone resizes to exactly the wrong width. Mutation tested five ways, each one red: a 501..519 gap, an overlapping range, `t-cq` losing its `container-type`, `.t-container` gaining one automatically, and a masonry gap.

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