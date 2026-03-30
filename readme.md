# 📟 Terminal UI Framework

> Kerangka kerja CSS/JS ringan tanpa *dependency* untuk membangun antarmuka web bertema Retro, Cyberpunk, Bunker, atau Terminal Satelit.

**Terminal UI** diekstrak dari proyek **[NPC-Reborn]** dan dioptimalkan secara khusus untuk ekosistem **[Relay Station]**. Framework ini menawarkan desain dengan tingkat kontras tinggi, efek visual CRT (layar tabung), dan komponen modular yang sangat mudah diimplementasikan.

---

## 🚀 Fitur Utama

- **Zero Dependencies:** Tidak butuh jQuery, React, atau Node.js. Cukup pasang 1 file CSS dan 1 file JS.
- **Retro Aesthetic:** Dilengkapi efek *scanlines* otomatis, kursor berkedip, dan warna terminal phosphor green.
- **Relay-Ready:** Mencakup komponen khusus aplikasi perpesanan dan dashboard (Chat Bubbles, Glowing LED, Asymmetric Sidebar Grid).
- **Komponen Lengkap:** Dilengkapi dengan Modal, Toasts (Notifikasi), Accordion, Tabs, Forms bergaya retro, hingga Progress Bar bergaya ASCII.
- **Responsif:** Sistem *fluid container* dan pembungkus tabel menjamin tampilan tetap sempurna di perangkat seluler.

---

## 🛠 Instalasi & Penggunaan

1. **Unduh repositori ini** (atau cukup salin `terminal.css` dan `terminal.js`).
2. Sisipkan font **JetBrains Mono** dan `terminal.css` di dalam tag `<head>` HTML Anda:
   ```html
   <link href="[https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap)" rel="stylesheet">
   <link rel="stylesheet" href="path/to/terminal.css">