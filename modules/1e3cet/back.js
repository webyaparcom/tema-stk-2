/* ozellik-zigzag — sunucu tarafı: satırları dile çözer; yer tutucular: zzclass zzhead zzrows.
   Veri: json.data[] (yoksa desing.satirlar) = [{baslik{}, metin{}, img, alt{}, url, ctaLabel{}?}] */
var zzDes = json.desing || {};
var zzLang = json.lang || "tr";

function zzEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function zzPick(v) { return wmPickLang(v, zzLang); }
function zzUrl(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function zzHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}
function zzBool(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}

var zzItems = Array.isArray(json.data) && json.data.length ? json.data : (Array.isArray(zzDes.satirlar) ? zzDes.satirlar : []);
var zzStil = String(zzDes.stil || "cerceve");
if (zzStil !== "cerceve" && zzStil !== "yuzen" && zzStil !== "sade") { zzStil = "cerceve"; }
var zzNumara = zzBool(zzDes.numara, true);
var zzCtaDef = zzPick(zzDes.ctaLabel);

var zzRows = "";
var zzN = 0;
var zzi;
for (zzi = 0; zzi < zzItems.length; zzi++) {
  var it = zzItems[zzi] || {};
  var baslik = zzPick(it.baslik);
  var metin = zzPick(it.metin);
  if (!baslik && !metin) { continue; }
  zzN++;
  var img = zzUrl(it.img);
  var alt = zzPick(it.alt) || baslik;
  var url = zzHref(it.url);
  var cta = zzPick(it.ctaLabel) || zzCtaDef;
  var no = zzN < 10 ? "0" + zzN : String(zzN);
  var media = img
    ? '<img class="modulex-zz-img" src="' + zzEsc(img) + '" alt="' + zzEsc(alt) + '" width="1200" height="900" loading="lazy" decoding="async" />'
    : '<span class="modulex-zz-ph" role="img" aria-label="' + zzEsc(alt) + '"><span class="material-symbols-outlined" aria-hidden="true">' +
      zzEsc(it.ikon || "auto_awesome") + "</span></span>";
  zzRows += '<article class="modulex-zz-row">' +
    '<div class="modulex-zz-media">' + media + "</div>" +
    '<div class="modulex-zz-metin">' +
    (zzNumara ? '<span class="modulex-zz-no" aria-hidden="true">' + no + "</span>" : "") +
    (baslik ? '<h3 class="modulex-zz-h">' + zzEsc(baslik) + "</h3>" : "") +
    (metin ? '<p class="modulex-zz-p">' + zzEsc(metin) + "</p>" : "") +
    (url && cta ? '<a class="modulex-zz-link" href="' + zzEsc(url) + '"><span>' + zzEsc(cta) + '</span><span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>' : "") +
    "</div></article>";
}

var zzEyebrow = zzPick(zzDes.eyebrow);
var zzTitle = zzPick(zzDes.title);
var zzDesc = zzPick(zzDes.description);
var zzHead = "";
if (zzEyebrow || zzTitle || zzDesc) {
  zzHead = '<header class="modulex-zz-head">' +
    (zzEyebrow ? '<p class="modulex-zz-eyebrow">' + zzEsc(zzEyebrow) + "</p>" : "") +
    (zzTitle ? '<h2 class="modulex-zz-title">' + zzEsc(zzTitle) + "</h2>" : "") +
    (zzDesc ? '<p class="modulex-zz-desc">' + zzEsc(zzDesc) + "</p>" : "") + "</header>";
}

html = html.replace(/\{\{zzclass\}\}/g, function () { return " modulex-zz-" + zzStil; });
html = html.replace(/\{\{zzhead\}\}/g, function () { return zzHead; });
html = html.replace(/\{\{zzrows\}\}/g, function () { return zzRows; });
