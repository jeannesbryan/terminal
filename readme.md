# 📟 Terminal UI Framework

> Kerangka kerja CSS/JS ringan tanpa *dependency* untuk membangun antarmuka web bertema Retro, Cyberpunk, Bunker, atau Terminal Satelit.

**Terminal UI** diekstrak dari proyek *Bunker OS* dan dioptimalkan secara khusus untuk ekosistem **Relay Station**. Framework ini menawarkan desain dengan tingkat kontras tinggi, efek visual CRT (layar tabung), dan 22+ komponen modular yang sangat mudah diimplementasikan.

---

## 🚀 Fitur Utama

- **Zero Dependencies:** Tidak butuh jQuery, Bootstrap, atau React. Murni HTML, CSS, dan Vanilla JS.
- **Sangat Ringan & Cepat:** Disajikan secara global melalui CDN jsDelivr.
- **Retro Aesthetic:** Dilengkapi efek *scanlines* otomatis, kursor berkedip, dan skema warna *phosphor green*.
- **Relay-Ready:** Mencakup komponen khusus aplikasi (Chat Bubbles, Glowing LED, Asymmetric Sidebar, Terminal Code Blocks).
- **Responsif Sempurna:** Sistem *fluid container*, utilitas tengah layar (*center-screen*), dan tabel *scrollable* untuk layar HP.

---

## 🛠 Instalasi via CDN (Disarankan)

Cara tercepat menggunakan Terminal UI adalah melalui CDN jsDelivr. Anda tidak perlu mengunduh *file* apa pun.

Sisipkan *tag* ini di dalam `<head>` HTML Anda:
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.css">
```

Sisipkan *tag* ini tepat sebelum penutup `</body>`:
```html
<script src="https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.js"></script>
```

---

## 📖 Buku Panduan (Man Page)

Framework ini memiliki dokumentasi lengkap berupa "Direktori Sistem" yang mencakup contoh visual dan kode HTML dari **22 Modul Komponen**. 

Unduh atau buka file **`docs.html`** di repositori ini melalui *browser* Anda untuk melihat panduan lengkapnya, yang meliputi:
1. **Layout & Grid:** Utility, Symmetrical Grid, Asymmetrical Sidebar, dan Center Screen.
2. **Forms & Input:** Input Action (Show/Hide), Dropdown (Select), Textarea, Checkbox, dan Radio Bergaya Retro.
3. **Data Display:** Data Tables, List Groups, Chat Bubbles, Breadcrumbs, dan Pagination.
4. **Indikator Sistem:** LED Glowing Dots, Badges, Alert Callouts, Progress Bar, dan Terminal Spinner.
5. **Navigasi & Pop-up:** Tabs, Accordion, Tooltips, Modal Box, dan Toasts Notifications.

---

## 💻 Struktur Dasar (Boilerplate)

Berikut adalah kerangka HTML murni untuk langsung memulai *coding* dengan gaya terminal:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Bunker</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.css">
</head>
<body class="t-crt"> <div class="t-center-screen">
        <div class="t-center-box t-card">
            <div class="t-card-header">> SYSTEM_INIT <span class="t-blink">_</span></div>
            <p class="text-muted">Selamat datang di Terminal OS.</p>
            <button class="t-btn mt-3" onclick="Terminal.toast('Koneksi Aman', 'normal')">TEST KONEKSI</button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/gh/jeannesbryan/terminal/terminal.js"></script>
</body>
</html>
```

---

## 📜 Lisensi & Atribusi

- Dikembangkan oleh: **Jeannes Bryan**
- Dibangun untuk komunitas *Open Source*. Silakan gunakan, modifikasi, dan integrasikan ke dalam dApps, P2P *Nodes*, atau proyek *Cyberpunk* Anda.