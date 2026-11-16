/* yorum-yapiskan-yigin — Yorum Yapışkan Yığın — kaydırdıkça üst üste binen kartlar (15 Kas 2026 · mcp:webmaker/20261115-224259-bpa9 · D17).
   Geniş yatay kartlar kaydırırken ekranın üstüne yapışıp birbirinin üstüne kademeli biner; kartın bir yanında kişi + puan, diğer yanında alıntı; renkler dönüşümlü.
   Üretici: scripts/modul-fabrika (aile testimonial) — elle düzenleme yerine tanımı değiştirip yeniden üret.
   Veri: data: [{ metin (yorum), ad, unvan?, firma?, puan? (1–5), img? (avatar), logo?, baslik?, tarih?, kaynak? }] — metinler dil sözlüğü; yorumsuz satır atlanır. */
const P = "modulex-yorum-yapiskan-yigin";
const IMG_KOK = `/img/${json.id}/`;
/* --- ortak ön ek (scripts/modul-fabrika/on-ek.js) — dil · güvenlik · sayı yardımcıları --- */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `${IMG_KOK}${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
/* ilk dolu alan: yeni ad önce, eski kuşak şablonun adı yedek (G6 yalnız path değiştirerek takas eder) */
const ilk = (o, ks) => {
  for (const k of ks) {
    const v = o == null ? undefined : o[k];
    if (v == null || v === "") continue;
    if (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length) continue;
    return v;
  }
  return "";
};
const metinAl = (o, ks) => pick(ilk(o, ks)).trim();
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];
const dil = String(json.lang || "");
const sayiBicim = (v, ondalik) => {
  try { return new Intl.NumberFormat(dil || undefined, { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }).format(v); } catch (e) { return String(v); }
};
const ikonH = (ad, sinif) => (ad ? `<span class="${sinif} material-symbols-outlined" aria-hidden="true">${ad}</span>` : "");
const no = (i) => String(i + 1).padStart(2, "0");
const ctaHtml = () => {
  const a1 = metinAl(des, ["cta_ad", "button"]); const u1 = href(ilk(des, ["cta_url", "buttonurl", "url"]));
  const a2 = metinAl(des, ["cta2_ad"]); const u2 = href(ilk(des, ["cta2_url"]));
  const d = (a, u, ek) => (a && u ? `<a class="${P}-dugme${ek}" href="${esc(u)}">${esc(a)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
  const ic = d(a1, u1, "") + d(a2, u2, ` ${P}-dugme--ikincil`);
  return ic ? `<div class="${P}-cta">${ic}</div>` : "";
};
const basHtml = (B, ek) => {
  if (!B.ust && !B.baslik && !B.metin && !ek) return "";
  return `<header class="${P}-bas">`
    + (B.ust ? `<p class="${P}-ust">${esc(B.ust)}</p>` : "")
    + (B.baslik ? `<h2 class="${P}-baslik" id="${P}-{{id}}-b">${esc(B.baslik)}</h2>` : "")
    + (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "")
    + (ek || "")
    + "</header>";
};
/* --- aile: testimonial --- */
const kayitlar = veri.map((o) => {
  const p = parseFloat(ilk(o, ["puan", "rating", "yildiz", "stars"]));
  return {
    metin: metinAl(o, ["metin", "alinti", "text", "yorum", "quote"]), ad: metinAl(o, ["ad", "name"]),
    unvan: metinAl(o, ["unvan", "role", "rol"]), firma: metinAl(o, ["firma", "company"]), baslik: metinAl(o, ["baslik", "title"]),
    tarih: metinAl(o, ["tarih", "date"]), kaynak: metinAl(o, ["kaynak", "source"]),
    puan: Number.isFinite(p) ? Math.max(0, Math.min(5, Math.round(p))) : 0,
    img: medyaUrl(ilk(o, ["img", "image", "avatar", "foto"])), logo: medyaUrl(ilk(o, ["logo"])),
  };
}).filter((k) => k.metin);
const buyuk = (s) => { try { return s.toLocaleUpperCase(dil || undefined); } catch (e) { return s.toUpperCase(); } };
const basHarf = (ad) => buyuk(String(ad || "").split(/\s+/).filter(Boolean).slice(0, 2).map((x) => [...x][0] || "").join(""));
const altYazi = (k) => [k.unvan, k.firma].filter(Boolean).join(" · ");
/* puan: görsel yıldız (süs) + metin karşılığı aria-label (renk tek başına bilgi taşımaz) */
const yildizH = (k, s, t) => (k.puan ? `<${t || "p"} class="${P}-${s || "puan"}" role="img" aria-label="${k.puan}/5">${[1, 2, 3, 4, 5].map((i) => `<span class="material-symbols-outlined${i > k.puan ? ` ${P}-yildiz--bos` : ""}" aria-hidden="true">star</span>`).join("")}</${t || "p"}>` : "");
const avatarH = (k, s) => (k.img ? `<img class="${P}-${s || "avatar"}" src="${esc(k.img)}" alt="" width="96" height="96" loading="lazy" decoding="async" />` : `<span class="${P}-${s || "avatar"} ${P}-harf" aria-hidden="true">${esc(basHarf(k.ad) || "“")}</span>`);
const kisiH = (k, s) => (k.ad || altYazi(k) ? `<span class="${P}-${s || "kisi"}">${k.ad ? `<strong class="${P}-ad">${esc(k.ad)}</strong>` : ""}${altYazi(k) ? `<span class="${P}-unvan">${esc(altYazi(k))}</span>` : ""}</span>` : "");
const alintiH = (k, s) => `<blockquote class="${P}-${s || "alinti"}"><p>${satirlar(k.metin)}</p></blockquote>`;
const yazarH = (k, s, av) => (k.ad || altYazi(k) ? `<figcaption class="${P}-${s || "yazar"}">${av === false ? "" : avatarH(k)}${kisiH(k)}</figcaption>` : "");
const logoH = (k, s) => (k.logo ? `<img class="${P}-${s || "logo"}" src="${esc(k.logo)}" alt="${esc(k.firma)}" width="160" height="60" loading="lazy" decoding="async" />` : "");
/* --- modül: yorum-yapiskan-yigin --- */
const kart = (k, i) => `<li class="${P}-kart" style="--i: ${i}"><figure class="${P}-ic-kart"><figcaption class="${P}-kimlik">${avatarH(k)}${kisiH(k)}${yildizH(k, "", "span")}</figcaption>${alintiH(k)}</figure></li>`;
const sar = (ic) => `<ol class="${P}-deste">${ic}</ol>`;
const B = { ust: metinAl(des, ["ust","badge","kicker"]), baslik: metinAl(des, ["baslik","title"]), metin: metinAl(des, ["metin","description"]) };
/* veri yoksa gövde hiç kurulmaz (sarmalayıcı boş listeye dokunmaz) */
const BOS = !kayitlar.length;
const govde = BOS ? "" : sar(kayitlar.map((k, i) => kart(k, i, kayitlar.length, kayitlar)).join(""), kayitlar, B);
const bas = basHtml(B, "");
const sinif = (bas || B.ust || B.baslik || B.metin ? "" : ` ${P}--bassiz`);
html = html
  .replaceAll("{{fbsinif}}", () => sinif)
  .replaceAll("{{fbetiket}}", () => (B.baslik ? `aria-labelledby="${P}-{{id}}-b"` : ""))
  .replaceAll("{{fbbas}}", () => bas)
  .replaceAll("{{fbgovde}}", () => govde);
if (BOS) html = "";
