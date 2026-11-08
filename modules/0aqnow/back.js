/* testimonial-3 — Yorum karuseli (31 Eki 2026, G8-C).
   Yer tutucular: t3stil t3head t3slides t3dots t3veri t3ctrlclass. data[] = {name, role{}, company, text{}, rating, img, logo}.
   Yıldız puanı hem görsel (ikon) hem metin (aria-label) olarak verilir; renk tek başına bilgi taşımaz. */
var t3D = json.desing || {};
var t3L = json.lang || "tr";
function t3T(v) { return wmPickLang(v, t3L); }
function t3Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function t3Url(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) { return ""; }
  if (/^data:/i.test(s)) { return /^data:image\//i.test(s) ? s : ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + json.id + "/" + s;
}
function t3Bool(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
function t3Bas(ad) {
  var p = String(ad || "").trim().split(/\s+/);
  var b = "";
  for (var i = 0; i < p.length && b.length < 2; i++) { if (p[i]) { b += p[i].charAt(0).toUpperCase(); } }
  return b;
}

var t3Stil = String(t3D.stil || "kart-karusel").trim();
if (t3Stil !== "kart-karusel" && t3Stil !== "buyuk-alinti" && t3Stil !== "masonry") { t3Stil = "kart-karusel"; }
var t3Items = Array.isArray(json.data) ? json.data : [];
var t3N = 0;
var t3Slides = "";
var t3SlideTpl = t3T(t3D.slideLabel);
var t3RateTpl = t3T(t3D.ratingLabel);
for (var t3i = 0; t3i < t3Items.length; t3i++) {
  var it = t3Items[t3i] || {};
  var ad = t3T(it.name).trim();
  var metin = t3T(it.text).trim();
  if (!metin) { continue; }
  t3N++;
  var rol = t3T(it.role).trim();
  var firma = t3T(it.company).trim();
  var puan = parseInt(it.rating, 10);
  if (!isFinite(puan)) { puan = 0; }
  puan = Math.max(0, Math.min(5, puan));
  var img = t3Url(it.img);
  var logo = t3Url(it.logo);

  var yildiz = "";
  if (puan > 0) {
    yildiz = '<span class="modulex-t3__stars" role="img" aria-label="' + t3Esc(t3RateTpl.replace(/\{n\}/g, String(puan))) + '">';
    for (var s = 1; s <= 5; s++) {
      yildiz += '<span class="material-symbols-outlined modulex-t3__star' + (s <= puan ? " modulex-t3__star--on" : "") + '" aria-hidden="true">star</span>';
    }
    yildiz += "</span>";
  }
  var avatar = img
    ? '<img class="modulex-t3__avatar" src="' + t3Esc(img) + '" alt="" width="56" height="56" loading="lazy" decoding="async" />'
    : '<span class="modulex-t3__avatar modulex-t3__avatar--bas" aria-hidden="true">' + t3Esc(t3Bas(ad)) + "</span>";
  var alt = (rol && firma) ? rol + " · " + firma : (rol || firma);

  t3Slides += '<li class="modulex-t3__slide" role="group" aria-roledescription="slide" aria-label="' + t3Esc(t3SlideTpl.replace(/\{i\}/g, String(t3N)).replace(/\{n\}/g, "__T3N__")) + '">' +
    '<article class="modulex-t3__card">' +
      /* üst satır: yıldızlar + alıntı ikonu akış içinde (mutlak konum RTL'de yıldızlarla çakışıyordu) */
      '<div class="modulex-t3__top">' + yildiz + '<span class="modulex-t3__q material-symbols-outlined" aria-hidden="true">format_quote</span></div>' +
      '<blockquote class="modulex-t3__text"><p>' + t3Esc(metin) + "</p></blockquote>" +
      '<footer class="modulex-t3__person">' + avatar +
        '<div class="modulex-t3__who">' + (ad ? '<cite class="modulex-t3__name">' + t3Esc(ad) + "</cite>" : "") + (alt ? '<span class="modulex-t3__role">' + t3Esc(alt) + "</span>" : "") + "</div>" +
        (logo ? '<img class="modulex-t3__logo" src="' + t3Esc(logo) + '" alt="' + t3Esc(firma) + '" height="28" loading="lazy" decoding="async" />' : "") +
      "</footer>" +
    "</article></li>";
}
t3Slides = t3Slides.replace(/__T3N__/g, String(t3N));

var t3Title = t3T(t3D.title);
var t3Desc = t3T(t3D.description);
var t3Head = (t3Title || t3Desc)
  ? '<header class="modulex-t3__head">' + (t3Title ? '<h2 class="modulex-t3__title">' + t3Esc(t3Title) + "</h2>" : "") + (t3Desc ? '<p class="modulex-t3__desc">' + t3Esc(t3Desc) + "</p>" : "") + "</header>"
  : "";

var t3Interval = parseInt(t3D.interval, 10);
if (!isFinite(t3Interval) || t3Interval < 2000) { t3Interval = 5000; }
var t3Veri = JSON.stringify({
  stil: t3Stil,
  autoplay: t3Bool(t3D.autoplay, true) && t3Stil !== "masonry",
  interval: t3Interval,
  dot: t3T(t3D.dotLabel),
  pause: t3T(t3D.pauseLabel),
  play: t3T(t3D.playLabel)
}).replace(/</g, "\\u003c");

html = html.replace(/\{\{t3stil\}\}/g, function () { return t3Stil; });
html = html.replace(/\{\{t3head\}\}/g, function () { return t3Head; });
html = html.replace(/\{\{t3slides\}\}/g, function () { return t3Slides; });
html = html.replace(/\{\{t3ctrlclass\}\}/g, function () { return (t3Stil === "masonry" || t3N < 2) ? " modulex-t3__ctrl--yok" : ""; });
html = html.replace(/\{\{t3veri\}\}/g, function () { return t3Veri; });
