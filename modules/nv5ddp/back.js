/* cta-3 — sunucu tarafı: butonlar + sağ sütun (WhatsApp kartı / görsel / illüstrasyon); yer tutucular: c3class c3text c3btns c3yan.
   desing: stil (gradient|gorselli|cerceveli-kart), sag (whatsapp|gorsel|yok), btn1Label/btn1Url, btn2Label/btn2Url,
   number (yalnız rakam; boşsa setting.whatsapp/phone), numberText (görünen biçim), waLabel, waTitle, hours, hoursLabel, waMessage, img, alt. */
var c3Des = json.desing || {};
var c3Lang = json.lang || "tr";

function c3Esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function c3Pick(v) { return wmPickLang(v, c3Lang); }
function c3Url(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function c3Href(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}

var c3Stil = String(c3Des.stil || "gradient");
if (c3Stil !== "gradient" && c3Stil !== "gorselli" && c3Stil !== "cerceveli-kart") { c3Stil = "gradient"; }
var c3Sag = String(c3Des.sag || "whatsapp");
if (c3Sag !== "whatsapp" && c3Sag !== "gorsel" && c3Sag !== "yok") { c3Sag = "whatsapp"; }

/* Metin */
var c3Title = c3Pick(c3Des.title);
var c3TitleHtml = c3Title ? '<h2 class="modulex-c3-title">' + c3Esc(c3Title) + "</h2>" : "";
var c3Text = c3Pick(c3Des.text);
var c3TextHtml = c3Text ? '<p class="modulex-c3-text">' + c3Esc(c3Text) + "</p>" : "";

/* Butonlar */
var c3Btns = "";
var c3B1 = c3Pick(c3Des.btn1Label);
var c3U1 = c3Href(c3Des.btn1Url);
var c3B2 = c3Pick(c3Des.btn2Label);
var c3U2 = c3Href(c3Des.btn2Url);
if (c3B1 && c3U1) {
  c3Btns += '<a class="modulex-c3-btn modulex-c3-btn-1" href="' + c3Esc(c3U1) + '"><span>' + c3Esc(c3B1) + '</span><span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>';
}
if (c3B2 && c3U2) {
  c3Btns += '<a class="modulex-c3-btn modulex-c3-btn-2" href="' + c3Esc(c3U2) + '">' + c3Esc(c3B2) + "</a>";
}

/* WhatsApp numarası: desing.number > setting.whatsapp > setting.phone (yalnız rakam) */
var c3Setting = (webmakerdata && webmakerdata.setting) || {};
var c3NumRaw = c3Des.number || c3Setting.whatsapp || c3Setting.phone || "";
var c3Num = String(c3NumRaw).replace(/[^\d]/g, "");
if (c3Num.length < 8) { c3Num = ""; }
var c3NumText = String(c3Des.numberText || "").trim() || (c3Num ? "+" + c3Num : "");

/* Sağ sütun */
var c3Img = c3Url(c3Des.img);
var c3Alt = c3Pick(c3Des.alt);
var c3Yan = "";
var c3WaIkon = '<span class="modulex-c3-wa-ikon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4 5.3 5.3 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg></span>';
if (c3Sag === "whatsapp" && c3Num) {
  var c3Saat = c3Pick(c3Des.hours);
  var c3SaatEt = c3Pick(c3Des.hoursLabel);
  var c3WaLabel = c3Pick(c3Des.waLabel);
  var c3WaTitle = c3Pick(c3Des.waTitle);
  var c3Msg = c3Pick(c3Des.waMessage);
  var c3WaHref = "https://wa.me/" + c3Num + (c3Msg ? "?text=" + encodeURIComponent(c3Msg) : "");
  c3Yan = '<div class="modulex-c3-yan"><div class="modulex-c3-kart">' +
    '<div class="modulex-c3-kart-bas">' + c3WaIkon + (c3WaTitle ? '<p class="modulex-c3-kart-title">' + c3Esc(c3WaTitle) + "</p>" : "") + "</div>" +
    '<a class="modulex-c3-num" href="tel:+' + c3Num + '"><bdi dir="ltr">' + c3Esc(c3NumText) + "</bdi></a>" +
    (c3Saat ? '<p class="modulex-c3-saat"><span class="material-symbols-outlined" aria-hidden="true">schedule</span><span>' +
      (c3SaatEt ? '<span class="modulex-c3-saat-etiket">' + c3Esc(c3SaatEt) + ":</span> " : "") + c3Esc(c3Saat) + "</span></p>" : "") +
    (c3WaLabel ? '<a class="modulex-c3-wa" href="' + c3Esc(c3WaHref) + '" target="_blank" rel="noopener">' + c3WaIkon.replace("modulex-c3-wa-ikon", "modulex-c3-wa-ikon modulex-c3-wa-ikon-kucuk") + "<span>" + c3Esc(c3WaLabel) + "</span></a>" : "") +
    "</div></div>";
} else if (c3Sag !== "yok" && c3Img) {
  c3Yan = '<div class="modulex-c3-yan"><img class="modulex-c3-gorsel" src="' + c3Esc(c3Img) + '" alt="' + c3Esc(c3Alt) + '" width="1200" height="900" loading="lazy" decoding="async" /></div>';
} else if (c3Sag !== "yok") {
  c3Yan = '<div class="modulex-c3-yan"><div class="modulex-c3-ill" role="img" aria-label="' + c3Esc(c3Alt) + '"><span class="material-symbols-outlined" aria-hidden="true">forum</span></div></div>';
}

html = html.replace(/\{\{c3class\}\}/g, function () { return " modulex-c3-" + c3Stil + (c3Yan ? "" : " modulex-c3-tek"); });
html = html.replace(/\{\{c3title\}\}/g, function () { return c3TitleHtml; });
html = html.replace(/\{\{c3text\}\}/g, function () { return c3TextHtml; });
html = html.replace(/\{\{c3btns\}\}/g, function () { return c3Btns; });
html = html.replace(/\{\{c3yan\}\}/g, function () { return c3Yan; });
