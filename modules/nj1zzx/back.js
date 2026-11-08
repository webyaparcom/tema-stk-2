/* footer-10 — Mega footer, CTA bantlı (31 Eki 2026, G8-C). footer-9 kalıbı + bülten bandı + hizmetler + saatler + yukarı düğmesi.
   Yer tutucular: f10stil f10band f10pages f10services f10contact f10hours f10social f10legal f10cols year f10veri.
   Veri yoksa satır/sütun HİÇ basılmaz (uydurma yok). wmPickLang CF dinamik render'da yok → güvenli sarmal. */
function f10Lang(v) {
  if (v == null) { return ""; }
  if (typeof v !== "object") { return String(v); }
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function f10Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function f10Href(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s || /^\s*(javascript|vbscript|data|file):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto|tel):/i.test(s)) { return s; }
  return wxLangInternalHref(s);
}
function f10Bool(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
var f10D = json.desing || {};
var f10Stil = String(f10D.stil || "koyu").trim();
if (f10Stil !== "koyu" && f10Stil !== "acik" && f10Stil !== "gradient-ust") { f10Stil = "koyu"; }

/* --- sayfalar (footer-9 kalıbı: pagesetting → page listesi, maxpages) --- */
var f10Ps = (webmakerdata.pagesetting && Array.isArray(webmakerdata.pagesetting.data))
  ? webmakerdata.pagesetting.data.find(function (item) { return item.modulestatus && item.modulestatus.page; })
  : null;
var f10Pages = '<li><a class="modulex-f10__link" href="' + wxLangInternalHref("") + '">@home@</a></li>';
if (f10Ps && webmakerdata[f10Ps.path] && Array.isArray(webmakerdata[f10Ps.path].data)) {
  var f10Max = parseInt(f10D.maxpages, 10); if (isNaN(f10Max)) { f10Max = 8; }
  var f10Sayac = 0;
  var f10Liste = webmakerdata[f10Ps.path].data;
  for (var pi = 0; pi < f10Liste.length; pi++) {
    var f10Page = f10Liste[pi];
    if (f10Max > 0 && f10Sayac >= f10Max) { break; }
    if (f10Page && f10Page.status === "play") {
      f10Sayac++;
      f10Pages += '<li><a class="modulex-f10__link" href="' + wxLangInternalHref(f10Page.pathnext || f10Page.path || "") + '">' + f10Esc(f10Lang(f10Page.name)) + "</a></li>";
    }
  }
}

/* --- hizmetler: desing.services [{name, href}] --- */
var f10Services = "";
if (Array.isArray(f10D.services)) {
  for (var si = 0; si < f10D.services.length; si++) {
    var sv = f10D.services[si] || {};
    var svAd = f10Lang(sv.name).trim();
    if (!svAd) { continue; }
    var svHref = f10Href(sv.href);
    f10Services += svHref ? '<li><a class="modulex-f10__link" href="' + f10Esc(svHref) + '">' + f10Esc(svAd) + "</a></li>" : "<li><span>" + f10Esc(svAd) + "</span></li>";
  }
}
var f10ServicesHtml = f10Services ? '<div class="modulex-f10__col modulex-f10__services"><h3 class="modulex-f10__title">' + f10Esc(f10Lang(f10D.title_services)) + '</h3><ul class="modulex-f10__list">' + f10Services + "</ul></div>" : "";

/* --- iletişim: desing → setting --- */
var f10Setting = webmakerdata.setting || {};
var f10Address = f10Lang(f10D.address).trim();
var f10Phone = f10Lang(f10D.phone).trim() || (typeof f10Setting.phone === "string" ? f10Setting.phone.trim() : "");
var f10Email = f10Lang(f10D.email).trim() || (typeof f10Setting.email === "string" ? f10Setting.email.trim() : "");
var f10Contact = "";
if (f10Address) { f10Contact += '<li><span class="material-symbols-outlined" aria-hidden="true">location_on</span><span>' + f10Esc(f10Address) + "</span></li>"; }
if (f10Phone) { f10Contact += '<li><span class="material-symbols-outlined" aria-hidden="true">call</span><a class="modulex-f10__link" href="tel:' + f10Esc(f10Phone.replace(/[^+\d]/g, "")) + '" dir="ltr">' + f10Esc(f10Phone) + "</a></li>"; }
if (f10Email) { f10Contact += '<li><span class="material-symbols-outlined" aria-hidden="true">mail</span><a class="modulex-f10__link" href="mailto:' + f10Esc(f10Email) + '">' + f10Esc(f10Email) + "</a></li>"; }
var f10ContactHtml = f10Contact ? '<div class="modulex-f10__col modulex-f10__contact"><h3 class="modulex-f10__title">' + f10Esc(f10Lang(f10D.title_contact)) + '</h3><ul class="modulex-f10__list modulex-f10__list--ikon">' + f10Contact + "</ul></div>" : "";

/* --- çalışma saatleri: desing.hours [{days, time}] --- */
var f10Hours = "";
if (Array.isArray(f10D.hours)) {
  for (var hi = 0; hi < f10D.hours.length; hi++) {
    var hr = f10D.hours[hi] || {};
    var hrGun = f10Lang(hr.days).trim();
    var hrSaat = f10Lang(hr.time).trim();
    if (!hrGun || !hrSaat) { continue; }
    f10Hours += '<div class="modulex-f10__hour"><dt>' + f10Esc(hrGun) + "</dt><dd>" + f10Esc(hrSaat) + "</dd></div>";
  }
}
var f10HoursHtml = f10Hours ? '<div class="modulex-f10__col modulex-f10__hours"><h3 class="modulex-f10__title">' + f10Esc(f10Lang(f10D.title_hours)) + '</h3><dl class="modulex-f10__dl">' + f10Hours + "</dl></div>" : "";

/* --- sosyal (marka sütununun altında) --- */
var f10Social = "";
if (Array.isArray(f10D.social)) {
  for (var soi = 0; soi < f10D.social.length; soi++) {
    var so = f10D.social[soi] || {};
    var soAd = f10Lang(so.ad || so.name).trim();
    var soUrl = f10Href(so.url);
    if (soAd && soUrl) {
      f10Social += '<a class="modulex-f10__chip" href="' + f10Esc(soUrl) + '" target="_blank" rel="noopener noreferrer">' +
        (so.icon ? '<span class="material-symbols-outlined" aria-hidden="true">' + f10Esc(so.icon) + "</span>" : "") + "<span>" + f10Esc(soAd) + "</span></a>";
    }
  }
}
var f10SocialHtml = f10Social ? '<div class="modulex-f10__socialwrap"><p class="modulex-f10__stitle">' + f10Esc(f10Lang(f10D.title_social)) + '</p><div class="modulex-f10__social">' + f10Social + "</div></div>" : "";

/* --- yasal --- */
var f10Legal = "";
if (Array.isArray(f10D.legal)) {
  for (var li = 0; li < f10D.legal.length; li++) {
    var lg = f10D.legal[li] || {};
    var lgText = f10Lang(lg.text || lg.name).trim();
    var lgHref = f10Href(lg.href || lg.url);
    if (lgText && lgHref) { f10Legal += '<li><a class="modulex-f10__link" href="' + f10Esc(lgHref) + '">' + f10Esc(lgText) + "</a></li>"; }
  }
}
var f10LegalHtml = f10Legal ? '<ul class="modulex-f10__legal">' + f10Legal + "</ul>" : "";

/* --- bülten bandı --- */
var f10NlGonderim = String(f10D.nlGonderim || "mailto").trim() === "kapali" ? "kapali" : "mailto";
var f10NlEmail = f10Lang(f10D.nlEmail).trim() || f10Email;
var f10Band = "";
if (f10Bool(f10D.nlShow, true) && (f10Lang(f10D.nlTitle).trim() || f10Lang(f10D.nlText).trim())) {
  var f10Form = "";
  if (f10NlGonderim === "mailto" && f10NlEmail) {
    f10Form = '<form class="modulex-f10__nlform" novalidate>' +
      '<label class="modulex-f10__nllabel" for="f10-' + json.id + '-nl">' + f10Esc(f10Lang(f10D.nlLabel)) + "</label>" +
      '<div class="modulex-f10__nlrow">' +
        '<input class="modulex-f10__nlinput" id="f10-' + json.id + '-nl" name="email" type="email" inputmode="email" autocomplete="email" required aria-describedby="f10-' + json.id + '-nlerr" />' +
        '<button type="submit" class="modulex-f10__nlbtn"><span>' + f10Esc(f10Lang(f10D.nlBtn)) + '</span><span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></button>' +
      "</div>" +
      '<p class="modulex-f10__nlerr" id="f10-' + json.id + '-nlerr" role="status" aria-live="polite"></p>' +
      (f10Lang(f10D.nlKvkk).trim() ? '<p class="modulex-f10__nlkvkk">' + f10Esc(f10Lang(f10D.nlKvkk)) + "</p>" : "") +
    "</form>";
  }
  f10Band = '<div class="modulex-f10__band"><div class="modulex-f10__bandin">' +
    '<div class="modulex-f10__bandtext">' +
      (f10Lang(f10D.nlTitle).trim() ? '<h2 class="modulex-f10__bandtitle">' + f10Esc(f10Lang(f10D.nlTitle)) + "</h2>" : "") +
      (f10Lang(f10D.nlText).trim() ? '<p class="modulex-f10__bandp">' + f10Esc(f10Lang(f10D.nlText)) + "</p>" : "") +
    "</div>" + f10Form + "</div></div>";
}

/* --- sütun sayısı: marka + sayfalar sabit; diğerleri varsa --- */
var f10Cols = 2 + (f10ServicesHtml ? 1 : 0) + (f10ContactHtml ? 1 : 0) + (f10HoursHtml ? 1 : 0);

var f10Veri = JSON.stringify({
  gonderim: f10NlGonderim, mailto: f10NlEmail,
  subject: f10Lang(f10D.nlSubject), body: f10Lang(f10D.nlBody), err: f10Lang(f10D.nlErr), ok: f10Lang(f10D.nlOk)
}).replace(/</g, "\\u003c");

html = html
  .replace(/\{\{f10stil\}\}/g, function () { return f10Stil; })
  .replace(/\{\{f10band\}\}/g, function () { return f10Band; })
  .replace(/\{\{f10pages\}\}/g, function () { return f10Pages; })
  .replace(/\{\{f10services\}\}/g, function () { return f10ServicesHtml; })
  .replace(/\{\{f10contact\}\}/g, function () { return f10ContactHtml; })
  .replace(/\{\{f10hours\}\}/g, function () { return f10HoursHtml; })
  .replace(/\{\{f10social\}\}/g, function () { return f10SocialHtml; })
  .replace(/\{\{f10legal\}\}/g, function () { return f10LegalHtml; })
  .replace(/\{\{f10cols\}\}/g, function () { return String(f10Cols); })
  .replace(/\{\{f10veri\}\}/g, function () { return f10Veri; })
  .replace(/\{\{year\}\}/g, String(new Date().getFullYear()));
if (!f10Lang(f10D.about).trim()) { html = html.replace(/<p class="modulex-f10__about">[\s\S]*?<\/p>\s*/, ""); }
if (f10D.logo_plate === true || f10D.logo_plate === "true") { html = html.replace('class="modulex-f10__logo"', 'class="modulex-f10__logo modulex-f10__logo--plate"'); }
