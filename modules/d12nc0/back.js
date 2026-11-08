/* hizmet-sekmeli — sunucu tarafı: hizmet verisini dile çözer, sekme + panel HTML'ini üretir.
   Yer tutucular: hsclass hshead hstabs hspanels hsorient.
   Veri: json.data[] (yoksa json.data.hizmetler ya da desing.hizmetler) = [{ikon, ad{}, ozet{}, maddeler[{}], img, alt{}, url}]
   ikon: Material Symbols adı | satır içi <svg…> | görsel yolu (.svg/.png/.webp/.jpg). */
var hsDes = json.desing || {};
var hsLang = json.lang || "tr";

function hsEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function hsPick(v) { return wmPickLang(v, hsLang); }

/* Güvenli yol: "/", http(s) kabul; javascript: vb. reddedilir; yalın ad → /img/<ad> */
function hsUrl(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (s.charAt(0) === "/" || s.charAt(0) === "#" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function hsHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}

/* İkon: svg satır içi (script/olay yok), görsel ya da Material Symbols adı */
function hsIkon(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return '<span class="material-symbols-outlined" aria-hidden="true">star</span>'; }
  if (/^<svg[\s>]/i.test(s)) {
    if (/<script|on\w+\s*=|javascript:/i.test(s)) { return '<span class="material-symbols-outlined" aria-hidden="true">star</span>'; }
    return s.replace(/<svg/i, '<svg aria-hidden="true" focusable="false"');
  }
  if (/\.(svg|png|webp|jpe?g|gif)(\?.*)?$/i.test(s)) {
    return '<img src="' + hsEsc(hsUrl(s)) + '" alt="" width="24" height="24" loading="lazy" decoding="async" />';
  }
  return '<span class="material-symbols-outlined" aria-hidden="true">' + hsEsc(s) + "</span>";
}

var hsItems = [];
if (Array.isArray(json.data) && json.data.length) { hsItems = json.data; }
else if (json.data && Array.isArray(json.data.hizmetler)) { hsItems = json.data.hizmetler; }
else if (Array.isArray(hsDes.hizmetler)) { hsItems = hsDes.hizmetler; }

var hsStil = String(hsDes.stil || "dikey");
if (hsStil !== "dikey" && hsStil !== "yatay-ust" && hsStil !== "kart-gecis") { hsStil = "dikey"; }
var hsClass = " modulex-hs-" + hsStil;
var hsOrient = hsStil === "dikey" ? "vertical" : "horizontal";

var hsId = String(json.id || "x").replace(/[^a-zA-Z0-9_-]/g, "");
var hsCta = hsPick(hsDes.ctaLabel);
var hsFeat = hsPick(hsDes.featuresLabel);

var hsTabs = "";
var hsPanels = "";
var hsi;
for (hsi = 0; hsi < hsItems.length; hsi++) {
  var it = hsItems[hsi] || {};
  var ad = hsPick(it.ad);
  if (!ad) { continue; }
  var ozet = hsPick(it.ozet);
  var tabId = "hs-" + hsId + "-t" + hsi;
  var panId = "hs-" + hsId + "-p" + hsi;
  var ilk = hsTabs === "";
  var ikon = hsIkon(it.ikon);
  var img = hsUrl(it.img);
  var alt = hsPick(it.alt) || ad;
  var url = hsHref(it.url);

  hsTabs += '<button type="button" class="modulex-hs-tab" role="tab" id="' + tabId + '" aria-controls="' + panId +
    '" aria-selected="' + (ilk ? "true" : "false") + '" tabindex="' + (ilk ? "0" : "-1") + '">' +
    '<span class="modulex-hs-ikon">' + ikon + "</span>" +
    '<span class="modulex-hs-tab-ad">' + hsEsc(ad) + "</span>" +
    '<span class="modulex-hs-ok" aria-hidden="true"><span class="material-symbols-outlined">arrow_forward</span></span></button>';

  var maddeler = "";
  if (Array.isArray(it.maddeler)) {
    var mj;
    for (mj = 0; mj < it.maddeler.length; mj++) {
      var mt = hsPick(it.maddeler[mj]);
      if (mt) { maddeler += '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + hsEsc(mt) + "</span></li>"; }
    }
  }
  var media = img
    ? '<img src="' + hsEsc(img) + '" alt="' + hsEsc(alt) + '" width="1200" height="675" loading="lazy" decoding="async" />'
    : '<span class="modulex-hs-ph" role="img" aria-label="' + hsEsc(alt) + '">' + ikon + "</span>";

  hsPanels += '<div class="modulex-hs-panel' + (ilk ? " modulex-hs-on" : "") + '" role="tabpanel" id="' + panId + '" aria-labelledby="' + tabId + '" tabindex="0">' +
    '<button type="button" class="modulex-hs-acc" aria-expanded="' + (ilk ? "true" : "false") + '" aria-controls="' + panId + '">' +
    '<span class="modulex-hs-ikon">' + ikon + "</span>" +
    '<span class="modulex-hs-tab-ad">' + hsEsc(ad) + "</span>" +
    '<span class="modulex-hs-acc-ok" aria-hidden="true"><span class="material-symbols-outlined">expand_more</span></span></button>' +
    '<div class="modulex-hs-panel-in">' +
    '<div class="modulex-hs-media">' + media + "</div>" +
    '<div class="modulex-hs-metin">' +
    '<h3 class="modulex-hs-panel-ad">' + hsEsc(ad) + "</h3>" +
    (ozet ? '<p class="modulex-hs-panel-ozet">' + hsEsc(ozet) + "</p>" : "") +
    (maddeler ? (hsFeat ? '<p class="modulex-hs-maddeler-baslik">' + hsEsc(hsFeat) + "</p>" : "") + '<ul class="modulex-hs-maddeler">' + maddeler + "</ul>" : "") +
    (url && hsCta ? '<a class="modulex-hs-btn" href="' + hsEsc(url) + '"><span>' + hsEsc(hsCta) + '</span><span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>' : "") +
    "</div></div></div>";
}

var hsEyebrow = hsPick(hsDes.eyebrow);
var hsTitle = hsPick(hsDes.title);
var hsDesc = hsPick(hsDes.description);
var hsHead = "";
if (hsEyebrow || hsTitle || hsDesc) {
  hsHead = '<header class="modulex-hs-head">' +
    (hsEyebrow ? '<p class="modulex-hs-eyebrow">' + hsEsc(hsEyebrow) + "</p>" : "") +
    (hsTitle ? '<h2 class="modulex-hs-title">' + hsEsc(hsTitle) + "</h2>" : "") +
    (hsDesc ? '<p class="modulex-hs-desc">' + hsEsc(hsDesc) + "</p>" : "") + "</header>";
}

html = html.replace(/\{\{hsclass\}\}/g, function () { return hsClass; });
html = html.replace(/\{\{hsorient\}\}/g, function () { return hsOrient; });
html = html.replace(/\{\{hshead\}\}/g, function () { return hsHead; });
html = html.replace(/\{\{hstabs\}\}/g, function () { return hsTabs; });
html = html.replace(/\{\{hspanels\}\}/g, function () { return hsPanels; });
