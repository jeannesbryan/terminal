# 📡 Terminal UI Framework

> A lightweight, dependency-free CSS/JS framework for building Retro, Cyberpunk, Bunker, or Satellite Terminal-themed web interfaces.

**Terminal UI** is extracted from the *Bunker OS* project and optimized specifically for the **Relay Station** ecosystem with a *Continuous Improvement* philosophy. This framework offers a high-contrast design, CRT (cathode-ray tube) visual effects, and dozens of highly easy-to-implement modular components.

---

## ⚙️ Key Features

- **Zero Dependencies:** Requires no jQuery, Bootstrap, or React. Pure HTML, CSS, and Vanilla JS.
- **Ultra Lightweight & Fast:** Served globally via the jsDelivr CDN.
- **Retro Aesthetic:** Equipped with automatic *scanlines* effects, blinking cursors, and a *phosphor green* color scheme.
- **Relay-Ready:** Includes application-specific components (Chat Bubbles, Glowing LEDs, Asymmetric Sidebars, Terminal Code Blocks).
- **Perfectly Responsive:** Fluid container system, center-screen utilities, and scrollable tables for mobile screens.

---

## 🔌 Installation via CDN (Recommended)

The fastest way to use Terminal UI is via the jsDelivr CDN. You don't need to download any *files*.

Insert these *tags* inside your HTML `<head>`:
```html
<link href="[https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap)" rel="stylesheet">
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.css](https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.css)">
```

Insert this *tag* right before the closing `</body>`:
```html
<script src="[https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.js](https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.js)"></script>
```

---

## 📖 Documentation (Man Page)

This framework has comprehensive documentation in the form of a "System Directory" covering visual examples and HTML codes for all Component Modules. 

Download or open the **`docs.html`** file in this repository via your *browser* to see the full guide, which includes:
1. **Layout & Grid:** Utilities, Symmetrical Grid, Asymmetrical Sidebar, and Center Screen.
2. **Forms & Input:** Input Actions (Show/Hide), Dropdowns (Select), Textareas, Checkboxes, and Retro-styled Radios.
3. **Data Display:** Data Tables, List Groups, Chat Bubbles, Breadcrumbs, and Pagination.
4. **System Indicators:** LED Glowing Dots, Badges, Alert Callouts, Progress Bars, and Terminal Spinners.
5. **Navigation & Pop-ups:** Tabs, Accordions, Tooltips, Modal Boxes, and Toast Notifications.

---

## 🖥️ Boilerplate Structure

Here is the pure HTML boilerplate to start *coding* instantly in the terminal style:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bunker System</title>
    <link href="[https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap)" rel="stylesheet">
    <link rel="stylesheet" href="[https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.css](https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.css)">
</head>
<body class="t-crt"> 
    <div class="t-center-screen">
        <div class="t-center-box t-card">
            <div class="t-card-header">> SYSTEM_INIT <span class="t-blink">_</span></div>
            <p class="text-muted">Welcome to Terminal OS.</p>
            <button class="t-btn mt-3" onclick="Terminal.toast('Secure Connection', 'normal')">TEST CONNECTION</button>
        </div>
    </div>

    <script src="[https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.js](https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.js)"></script>
</body>
</html>
```

---

## ⚖️ License & Attribution

- Developed by: **Jeannes Bryan**
- Built for the *Open Source* community. Feel free to use, modify, and integrate it into your dApps, P2P *Nodes*, or *Cyberpunk* projects.