import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const live = process.argv.includes("--canli");
const siteBase = "https://hr-proje.github.io/warsigil-mockup/";
const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === ".git" || ent.name === "node_modules") continue;
    const file = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(file);
    else if (/\.(html|js|css)$/i.test(ent.name)) files.push(file);
  }
}
walk(root);

const refs = [];
function add(file, line, value) {
  if (!value || value.includes("{{") || /^(?:data:|#|javascript:|mailto:|tel:|blob:)/i.test(value)) return;
  // Only literal paths qualify; ordinary labels/identifiers are not URLs.
  if (!value.includes("/") && !/\.[a-z0-9]{2,8}(?:[?#]|$)/i.test(value)) return;
  if (/^(?:https?:|\/\/)/i.test(value)) return;
  refs.push({ file, line, value });
}

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const activeSource = file.endsWith(".html") ? source.replace(/<!--[\s\S]*?-->/g, "") : source;
  const lines = activeSource.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];
    let match;
    for (const re of [
      /\b(?:href|src|poster|action)\s*=\s*["']([^"']+)["']/gi,
      /\burl\(\s*["']?([^\s"')]+)["']?\s*\)/gi,
    ]) {
      re.lastIndex = 0;
      while ((match = re.exec(text))) add(file, i + 1, match[1]);
    }
    for (const re of [
      /(?:window\.)?location(?:\.href)?\s*=\s*["']([^"']+)["']/gi,
      /(?:window\.)?open\(\s*["']([^"']+)["']/gi,
      /fetch\(\s*["']([^"']+)["']/gi,
      /new\s+URL\(\s*["']([^"']+)["']/gi,
    ]) {
      re.lastIndex = 0;
      while ((match = re.exec(text))) add(file, i + 1, match[1]);
    }
  }
}

const broken = [];
for (const ref of refs) {
  if (ref.value.startsWith("/")) {
    broken.push({ ...ref, reason: "kök yolu" });
    continue;
  }
  if (ref.absolute) continue;
  let pageFile = ref.file;
  if (path.relative(root, pageFile).replaceAll(path.sep, "/") === "assets/tuval/Main.dc.html") {
    // Main.dc is fetched and rendered on ana-ekran; its styles resolve against that page.
    pageFile = path.join(root, "ana-ekran", "index.html");
  }
  let pathname;
  try { pathname = decodeURIComponent(ref.value.split(/[?#]/)[0]); }
  catch { pathname = ref.value.split(/[?#]/)[0]; }
  if (!pathname) continue;
  const target = path.resolve(path.dirname(pageFile), pathname);
  let exists = fs.existsSync(target);
  if (!exists && !path.extname(target)) exists = fs.existsSync(path.join(target, "index.html"));
  if (!exists) broken.push({ ...ref, reason: "dosya yok" });
}

if (live) {
  for (const ref of refs) {
    if (ref.absolute) continue;
    let pageFile = ref.file;
    if (path.relative(root, pageFile).replaceAll(path.sep, "/") === "assets/tuval/Main.dc.html") pageFile = path.join(root, "ana-ekran", "index.html");
    const pathname = decodeURIComponent(ref.value.split(/[?#]/)[0]);
    const target = path.resolve(path.dirname(pageFile), pathname);
    const rel = path.relative(root, target).replaceAll(path.sep, "/");
    ref.absolute = new URL(rel.endsWith("index.html") ? rel.slice(0, -10) : rel, siteBase).href;
  }
  const results = await Promise.allSettled(refs.map(async ref => {
    const response = await fetch(ref.absolute, { signal: AbortSignal.timeout(5000) });
    return { ref, status: response.status };
  }));
  const networkFailure = results.find(result => result.status === "rejected");
  if (networkFailure) console.log(`canlı denetim: ağ yok, canlı kontrol atlandı (${networkFailure.reason.message})`);
  else for (const result of results) if (result.value.status < 200 || result.value.status >= 400)
    broken.push({ ...result.value.ref, reason: `HTTP ${result.value.status}` });
}

for (const ref of broken) {
  console.log(`${path.relative(root, ref.file)}:${ref.line}: ${ref.value} (${ref.reason})`);
}
console.log(broken.length ? `kırık bağlantı: ${broken.length}` : "kırık bağlantı: 0");
