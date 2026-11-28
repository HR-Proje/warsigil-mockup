// Bozuk Türkçe karakter (mojibake), BOM ve meta charset denetimi. Sorun varsa çıkış kodu 1.
import fs from 'node:fs';
import path from 'node:path';
const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const atla = new Set(['.git', 'node_modules', 'denetim']);
// Â tek başına Türkçe'de meşrudur (DÜKKÂN, HİKÂYE); yalnız ardından "bozuk devam" karakteri gelirse sayılır.
const bozuk = /[ÃÄÅÂ][\u0080-\u00BF\u0152\u0153\u0160\u0161\u0178\u017D\u017E\u02C6\u02DC\u2018-\u203A\u20AC]|\uFFFD|â€/;
const sorunlar = [];
(function gez(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (atla.has(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) { gez(p); continue; }
    if (!/\.(html|js|css|json|md|mjs)$/.test(e.name) || e.name === 'package-lock.json') continue;
    const b = fs.readFileSync(p);
    const rel = path.relative(kok, p).split(path.sep).join('/');
    if (b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF) sorunlar.push(`${rel}: BOM var`);
    const t = b.toString('utf-8');
    if (t.includes('\uFFFD') && rel !== 'AGENTS.md') sorunlar.push(`${rel}: U+FFFD (geçersiz UTF-8)`);
    t.split('\n').forEach((l, i) => { if (rel !== 'AGENTS.md' && rel !== 'denetim-araci/karakter.mjs' && bozuk.test(l)) sorunlar.push(`${rel}:${i + 1}: bozuk karakter`); });
    if (e.name === 'index.html' && !/^\s*<!doctype[^>]*>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">/i.test(t) && !/<meta charset="utf-8"/i.test(t)) sorunlar.push(`${rel}: meta charset yok`);
  }
})(kok);
if (sorunlar.length) { console.log(sorunlar.slice(0, 60).join('\n')); console.log(`bozuk karakter: ${sorunlar.length}`); process.exit(1); }
console.log('bozuk karakter: 0');
