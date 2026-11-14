/* Guards for viewport breakpoints in terminal.css. Run: node tests/terminal-breakpoints.test.mjs

   Background. This stylesheet used two different conventions at the same
   boundary. Mobile-down blocks said `max-width: 768px`; one desktop-up block
   said `min-width: 768px` while every other desktop-up block said
   `min-width: 769px`. At exactly 768px both conventions were true at once:

     .t-grid-2      2 columns   (desktop block active)
     .t-grid-3      3 columns   (desktop block active)
     .t-metric-grid 1 column    (mobile block active)
     .d-none-mobile hidden      (mobile block active)

   Measured in Chrome at iframe widths 767, 768 and 769. At 768 the page was
   half mobile and half desktop. No error, no warning, and only visible if
   someone resizes to exactly that pixel.

   So the invariant below is about the boundary itself, not about any one
   selector: a width must not be used as both a lower bound and an upper bound.
   If N is the last mobile width, then N+1 is the first desktop width, never N.

   Nothing here proves the layout looks right. That was measured in a browser.
   This file protects the property that makes those measurements repeatable.
*/

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const AKAR = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssMentah = readFileSync(join(AKAR, 'terminal.css'), 'utf8');
// Komentar dibuang sebelum parsing: komentar di berkas ini menyebut angka
// breakpoint, dan parser pola sederhana akan salah menganggapnya sebagai aturan.
const css = cssMentah.replace(/\/\*[\s\S]*?\*\//g, '');

let pass = 0, fail = 0;
const hasil = [];
function ok(nama, syarat, detail) {
    if (syarat) { pass++; hasil.push(`  ok   ${nama}`); }
    else { fail++; hasil.push(`  FAIL ${nama}${detail ? ' -> ' + detail : ''}`); }
}

/* ---- kumpulkan semua aturan ber-media width, per selector ---- */
function kumpulkanAturan(sumber) {
    const aturan = [];
    const re = /@media\s*([^{]+)\{/g;
    let m;
    while ((m = re.exec(sumber)) !== null) {
        let depth = 1, i = re.lastIndex;
        while (i < sumber.length && depth > 0) {
            if (sumber[i] === '{') depth++;
            else if (sumber[i] === '}') depth--;
            i++;
        }
        const badan = sumber.slice(re.lastIndex, i - 1);
        const kondisi = m[1].trim();
        if (!/width/.test(kondisi)) continue;

        const min = kondisi.match(/min-width:\s*(\d+)px/);
        const max = kondisi.match(/max-width:\s*(\d+)px/);
        if (!min && !max) continue;

        for (const x of badan.matchAll(/([^{}]+)\{/g)) {
            aturan.push({
                sel: x[1].trim().replace(/\s+/g, ' '),
                min: min ? Number(min[1]) : 0,
                max: max ? Number(max[1]) : Infinity,
                kondisi
            });
        }
    }
    return aturan;
}

const aturan = kumpulkanAturan(css);
ok('ada aturan media query berbasis width', aturan.length >= 10, `ditemukan ${aturan.length}`);

/* ---- 1. INTI: satu angka tidak boleh jadi batas atas DAN batas bawah ----
   Inilah yang menangkap bug 768. Kalau 768 dipakai sebagai max-width untuk
   blok mobile dan juga min-width untuk blok desktop, maka pada lebar 768
   kedua blok aktif bersamaan, apa pun selectornya. */
const batasAtas = new Set(aturan.filter(a => a.max !== Infinity).map(a => a.max));
const batasBawah = new Set(aturan.filter(a => a.min > 0).map(a => a.min));
const bentrok = [...batasAtas].filter(v => batasBawah.has(v)).sort((a, b) => a - b);

ok('tidak ada angka yang dipakai sebagai batas atas dan batas bawah sekaligus',
    bentrok.length === 0,
    bentrok.length ? `bentrok di: ${bentrok.join(', ')}px (blok mobile dan desktop aktif bersamaan)` : '');

/* ---- 2. konvensi batas mobile/desktop ----
   Kalau 1 lolos, tetap perlu dipastikan angkanya memang berpasangan rapi:
   setiap batas atas N harus berpasangan dengan batas bawah N+1 dan bukan
   sekadar tidak bertabrakan karena kebetulan tidak ada pasangannya. */
{
    const atas = [...batasAtas].sort((a, b) => a - b);
    const bawah = [...batasBawah].sort((a, b) => a - b);

    /* Batas mode diambil dari kelas visibilitas, bukan dari max-width terbesar.
       Percobaan pertama memakai Math.max(batasAtas) dan mendapat 900, yaitu
       breakpoint masonry, bukan batas mobile/desktop. Batas mode adalah angka
       yang memisahkan .d-none-mobile dari .d-none-desktop. */
    const mobile = aturan.find(a => a.sel === '.d-none-mobile' && a.max !== Infinity);
    const batasMode = mobile ? mobile.max : null;

    ok('batas mode mobile/desktop bisa ditentukan dari .d-none-mobile', batasMode !== null);

    if (batasMode !== null) {
        ok(`semua min-width lebih besar dari batas mode ${batasMode}px`,
            bawah.every(n => n > batasMode),
            `min-width yang tidak lebih besar dari ${batasMode}: ${bawah.filter(n => n <= batasMode).join(', ')}`);

        /* Blok desktop harus mulai tepat di batas mode, bukan jauh sesudahnya.

           `min-width: 800px` untuk .t-grid-2 akan lolos pemeriksaan "lebih
           besar dari batas mode", padahal hasilnya: dari 769 sampai 799 halaman
           sudah dalam mode desktop (navbar penuh, sidebar terbuka) tetapi
           .t-grid-2 masih satu kolom. Celah itu tidak terlihat sebagai galat,
           hanya sebagai layout yang terasa salah. Karena itu setiap min-width
           di berkas ini harus sama dengan batasMode + 1. Kalau suatu saat benar
           benar perlu breakpoint desktop kedua, tambahkan dengan sadar beserta
           alasan, bukan diam diam. */
        ok(`semua min-width sama dengan batas mode + 1 (${batasMode + 1}px)`,
            bawah.every(n => n === batasMode + 1),
            `min-width menyimpang: ${bawah.filter(n => n !== batasMode + 1).join(', ')}`);
        hasil.push(`  info batas mode mobile: ≤ ${batasMode}px | desktop: ≥ ${batasMode + 1}px`);
    }
    hasil.push(`  info batas atas: ${atas.join(', ')} | batas bawah: ${bawah.join(', ')}`);
}

/* ---- 3. per selector: rentang searah tidak boleh bertumpuk ----
   Dua blok max-width untuk selector yang sama SAH bertumpuk: itu cascade,
   aturan yang lebih sempit menang karena urutan. Yang tidak sah adalah satu
   selector punya batas atas dan batas bawah yang saling menimpa, karena itu
   berarti dua keadaan layout aktif sekaligus untuk elemen yang sama. */
{
    const peta = {};
    for (const a of aturan) (peta[a.sel] = peta[a.sel] || []).push(a);
    const konflik = [];
    for (const [sel, arr] of Object.entries(peta)) {
        const keAtas = arr.filter(a => a.min > 0 && a.max === Infinity);   // desktop-up
        const keBawah = arr.filter(a => a.min === 0 && a.max !== Infinity); // mobile-down
        for (const u of keAtas) {
            for (const d of keBawah) {
                if (u.min <= d.max) konflik.push(`${sel}: min-width ${u.min} vs max-width ${d.max}`);
            }
        }
    }
    ok('tidak ada selector dengan blok desktop dan mobile yang aktif bersamaan',
        konflik.length === 0, konflik.slice(0, 3).join(' ; '));
}

/* ---- 4. cascade bertingkat yang disengaja tetap ada ----
   .t-masonry sengaja punya dua batas atas (900 lalu 600). Kalau salah satunya
   hilang, kolomnya berubah diam diam. Dikunci di sini supaya perubahan itu
   keputusan, bukan kecelakaan. */
{
    const masonry = aturan.filter(a => a.sel === '.t-masonry' && a.max !== Infinity);
    ok('.t-masonry tetap punya dua batas atas (900 dan 600)',
        masonry.length === 2 && masonry.some(a => a.max === 900) && masonry.some(a => a.max === 600),
        masonry.map(a => a.max).join(', '));
}

/* ---- 5. fallback kelas visibilitas tetap berpasangan ----
   .d-none-mobile disembunyikan sampai batas mobile, .d-none-desktop
   disembunyikan mulai batas desktop. Kalau keduanya aktif bersamaan, seluruh
   halaman jadi kosong. */
{
    const mobile = aturan.find(a => a.sel === '.d-none-mobile');
    const desktop = aturan.find(a => a.sel === '.d-none-desktop');
    ok('.d-none-mobile dibatasi max-width', Boolean(mobile && mobile.max !== Infinity));
    ok('.d-none-desktop dibatasi min-width', Boolean(desktop && desktop.min > 0));
    ok('.d-none-mobile dan .d-none-desktop tidak aktif bersamaan',
        Boolean(mobile && desktop && desktop.min > mobile.max),
        mobile && desktop ? `max ${mobile.max} vs min ${desktop.min}` : 'aturan tidak ditemukan');

    /* Berpasangan tepat, bukan sekadar tidak beririsan.

       `desktop.min > mobile.max` saja masih meloloskan celah: kalau batas
       mobile diubah ke 767 dan desktop tetap 769, maka pada lebar 768 kedua
       kelas tidak disembunyikan, sehingga dua elemen yang seharusnya saling
       menggantikan tampil bersamaan. Yang benar adalah selisih tepat satu. */
    ok('.d-none-desktop mulai tepat satu piksel setelah batas mobile',
        Boolean(mobile && desktop && desktop.min === mobile.max + 1),
        mobile && desktop ? `max ${mobile.max}, min ${desktop.min} (harus ${mobile.max + 1})` : 'aturan tidak ditemukan');
}

/* ---- 6. nilai breakpoint tetap sedikit dan dikenal ----
   Breakpoint liar yang bertambah dari waktu ke waktu adalah tanda tidak ada
   konvensi. Daftar ini boleh berubah, tetapi harus dengan sengaja. */
{
    const nilai = [...new Set([...batasAtas, ...batasBawah])].sort((a, b) => a - b);
    ok('nilai breakpoint hanya dari himpunan yang dikenal (600, 768, 769, 900)',
        nilai.every(n => [600, 768, 769, 900].includes(n)),
        nilai.join(', '));
}

console.log(hasil.join('\n'));
console.log(`\n${pass} ok, ${fail} gagal`);
process.exit(fail === 0 ? 0 : 1);
