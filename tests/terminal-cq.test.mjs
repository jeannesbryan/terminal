/* Guards for the container query block in terminal.css. Run: node tests/terminal-cq.test.mjs

   This file exists because the failure mode of a breakpoint is silent. Two
   overlapping ranges, or a one-pixel hole between them, produce no error, no
   warning, and no visual clue until someone resizes a window to exactly the
   wrong width. T2 in this repository is that bug already: a `max-width: 768px`
   block and a `min-width: 768px` block that are both true at 768px.

   So the rules below check complementarity rather than intent. Every pair of
   adjacent breakpoints must meet exactly: the upper bound of one range plus one
   equals the lower bound of the next. That is arithmetic, not style, and it
   catches the mistake no matter how the block is rewritten.

   Nothing here proves the queries work in a browser. That was measured
   separately, and the measurements are written in the CSS comment. What this
   file protects is the structure that makes those measurements remain valid.
*/

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const AKAR = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssMentah = readFileSync(join(AKAR, 'terminal.css'), 'utf8');

/* Komentar dibuang sebelum parsing, dan itu bukan kerapian belaka.

   Komentar dokumentasi di terminal.css menyebut istilah `@container` ketika
   menerangkan bahwa CSS tidak punya cara mengalias satu blok @container ke dua
   nama. Parser sederhana di bawah ini mencari pola `@container ... {`, jadi
   kalimat di dalam komentar itu ikut tertangkap dan menghasilkan satu blok
   palsu dengan kondisi berisi potongan kalimat. Akibatnya blok asli sesudahnya
   salah diklasifikasikan, dan pemeriksaan partisi melaporkan celah yang tidak
   ada.

   Parser CSS sungguhan membuang komentar lebih dulu; yang ini melakukan hal
   yang sama secara eksplisit. */
const css = cssMentah.replace(/\/\*[\s\S]*?\*\//g, '');

let pass = 0, fail = 0;
const hasil = [];
function ok(nama, syarat, detail) {
    if (syarat) { pass++; hasil.push(`  ok   ${nama}`); }
    else { fail++; hasil.push(`  FAIL ${nama}${detail ? ' -> ' + detail : ''}`); }
}

/* ---- 1. kurung seimbang di seluruh berkas ---- */
{
    const buka = (css.match(/\{/g) || []).length;
    const tutup = (css.match(/\}/g) || []).length;
    ok('kurung kurawal seimbang', buka === tutup, `{ ${buka} vs } ${tutup}`);
}

/* ---- 2. ambil semua blok @container dan isinya ---- */
function blokContainer(sumber) {
    const out = [];
    const re = /@container\s+([^{]+)\{/g;
    let m;
    while ((m = re.exec(sumber)) !== null) {
        // hitung sampai kurung penutup yang cocok
        let depth = 1, i = re.lastIndex;
        while (i < sumber.length && depth > 0) {
            if (sumber[i] === '{') depth++;
            else if (sumber[i] === '}') depth--;
            i++;
        }
        out.push({ kondisi: m[1].trim(), badan: sumber.slice(re.lastIndex, i - 1) });
    }
    return out;
}

const blok = blokContainer(css);
ok('ada blok @container', blok.length >= 8, `ditemukan ${blok.length}`);

/* ---- 3. konteks opt-in didefinisikan ---- */
ok('.t-cq mendefinisikan container-type: inline-size',
    /\.t-cq\s*\{[^}]*container-type:\s*inline-size/.test(css));
ok('.t-cq-panel memakai container-name', /\.t-cq-panel\s*\{[^}]*container-name:\s*t-panel/.test(css));

/* ---- 4. pengaman anti-tumpang-tindih ----
   Kumpulkan batas per kelompok kondisi untuk satu nama konteks (tanpa nama vs
   t-panel), lalu pastikan rentangnya bersambung tanpa celah dan tanpa irisan. */
/* Rentang diperiksa PER SELECTOR, bukan global.

   Dua blok @container yang berbeda selector memang boleh menempati koordinat
   yang sama: `.t-grid-2` boleh 520..infinity sementara `.t-grid-3` hanya
   520..779. Yang tidak boleh adalah dua blok untuk selector yang SAMA saling
   menimpa, atau meninggalkan lubang di antaranya. Memeriksa secara global akan
   melaporkan tumpang tindih palsu pada CSS yang benar. */
function rentangUntuk(selector, namaKonteks) {
    const keluar = [];
    for (const b of blok) {
        if (!b.badan.includes(selector)) continue;
        // Konteks bernama dan tanpa nama adalah ruang terpisah. Keduanya boleh
        // punya rentang yang sama persis tanpa saling menimpa, karena query
        // tanpa nama menyasar konteks terdekat dan t-panel menyasar yang
        // bernama. Mencampurnya menghasilkan tumpang tindih palsu.
        const punyaNama = /^t-panel\s/.test(b.kondisi);
        if (punyaNama !== Boolean(namaKonteks)) continue;
        const min = b.kondisi.match(/min-width:\s*(\d+)px/);
        const max = b.kondisi.match(/max-width:\s*(\d+)px/);
        if (!min && !max) continue;
        keluar.push({
            min: min ? Number(min[1]) : 0,
            max: max ? Number(max[1]) : Infinity,
            kondisi: b.kondisi
        });
    }
    keluar.sort((a, b) => a.min - b.min || a.max - b.max);
    return keluar;
}

function periksaPartisi(selector, namaKonteks) {
    const r = rentangUntuk(selector, namaKonteks);
    const celah = [], tumpang = [];
    for (let i = 1; i < r.length; i++) {
        const prev = r[i - 1], cur = r[i];
        if (prev.max === Infinity) continue;
        if (cur.min > prev.max + 1) celah.push(`${prev.max + 1}..${cur.min - 1}`);
        if (cur.min <= prev.max) tumpang.push(`${cur.min} vs ${prev.max}`);
    }
    return { r, celah, tumpang };
}

const KONTEKS = [[null, 'tanpa nama'], ['t-panel', 't-panel']];
for (const [nama, label] of KONTEKS) {
    let jumlahDiperiksa = 0;
    for (const sel of ['.t-grid-2', '.t-grid-3', '.t-metric-grid', '.t-kv', '.t-action-grid', '.t-masonry']) {
        const { r, celah, tumpang } = periksaPartisi(sel, nama);
        if (r.length === 0) continue;   // selector ini tidak dipakai di konteks itu
        jumlahDiperiksa++;
        ok(`${label} ${sel}: rentang tidak bertumpuk`, tumpang.length === 0, tumpang.join(', '));
        ok(`${label} ${sel}: tidak ada celah satu piksel`, celah.length === 0, celah.join(', '));
        ok(`${label} ${sel}: minimal 2 rentang`, r.length >= 2, `${r.length}`);
    }
    ok(`konteks ${label} mencakup minimal 5 selector`, jumlahDiperiksa >= 5, `${jumlahDiperiksa}`);
}

/* ---- 5. komponen yang dijanjikan ikut lebar wadah benar-benar punya aturan ---- */
for (const komponen of ['.t-grid-2', '.t-grid-3', '.t-metric-grid', '.t-kv', '.t-action-grid', '.t-masonry']) {
    const muncul = blok.some(b => b.badan.includes(komponen));
    ok(`${komponen} punya aturan @container`, muncul);
}

/* ---- 6. fallback lama tidak dihapus ----
   Media query lama harus tetap ada, karena ia yang melayani browser tanpa
   dukungan container query dan elemen di luar .t-cq. */
ok('media query .t-metric-grid masih ada',
    /@media[^{]*max-width:\s*768px[^{]*\{[^}]*\.t-metric-grid/.test(css.replace(/\n/g, ' ')));
/* Tidak menyebut angka batas di sini dengan sengaja. Baris 174 masih memakai
   min-width: 768px yang bertabrakan dengan max-width: 768px di baris 118; itu
   T2, tugas terpisah. Mengunci angka sekarang akan membuat tes ini merah
   begitu T2 dikerjakan, padahal perbaikannya benar. Yang dijaga di sini hanya
   keberadaan fallback-nya. */
ok('media query .t-grid-2 masih ada (fallback viewport)',
    /@media[^{]*min-width:\s*\d+px[^{]*\{[^}]*\.t-grid-2/.test(css.replace(/\n/g, ' ')));
ok('media query .t-masonry masih ada',
    /@media[^{]*max-width:\s*900px[^{]*\{[^}]*\.t-masonry/.test(css.replace(/\n/g, ' ')));

/* ---- 7. t-cq tidak dipasang otomatis pada kontainer bawaan ----
   Kalau .t-container ikut jadi query context, setiap halaman berubah perilaku
   tanpa memilih. Itu harus keputusan eksplisit. */
ok('.t-container tidak dipasangi container-type',
    !/\.t-container\s*\{[^}]*container-type/.test(css));
ok('.t-container-fluid tidak dipasangi container-type',
    !/\.t-container-fluid\s*\{[^}]*container-type/.test(css));

/* ---- 8. dokumentasi pengukuran ada ----
   Klaim di komentar bahwa container-type berbeda dari contain harus punya
   jejak, supaya orang berikutnya tahu itu hasil ukur, bukan dugaan. */
// Memakai cssMentah, karena yang diperiksa justru isi komentarnya.
ok('komentar mencatat hasil ukur contain vs container-type',
    /contain: layout\s+->\s+child at x=301/.test(cssMentah) &&
    /container-type: inline-size\s+->\s+child at x=0/.test(cssMentah));

console.log(hasil.join('\n'));
console.log(`\n${pass} ok, ${fail} gagal`);
process.exit(fail === 0 ? 0 : 1);
