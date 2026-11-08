/* iletisim-kartlari — Hızlı iletişim kartları (31 Eki 2026, G8-C).
   Yer tutucular: ikstil ikhead ikcards ikcount. Veri boş olan kart basılmaz; phone/email boşsa setting.phone/email. */
var ikD = json.desing || {};
var ikL = json.lang || "tr";
function ikT(v) { return wmPickLang(v, ikL); }
function ikEsc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function ikUrl(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s || /^\s*(javascript|vbscript|data|file):/i.test(s)) { return ""; }
  return s;
}

var ikStil = String(ikD.stil || "kartli").trim();
if (ikStil !== "kartli" && ikStil !== "ikon-serit" && ikStil !== "dikey-liste") { ikStil = "kartli"; }

var ikSetting = webmakerdata.setting || {};
var ikPhone = ikT(ikD.phone).trim() || (typeof ikSetting.phone === "string" ? ikSetting.phone.trim() : "");
var ikEmail = ikT(ikD.email).trim() || (typeof ikSetting.email === "string" ? ikSetting.email.trim() : "");
var ikWa = String(ikD.whatsapp || "").replace(/\D/g, "") || ikPhone.replace(/\D/g, "");
var ikAddress = ikT(ikD.address).trim();
var ikMaps = ikUrl(ikD.mapsUrl);
if (!ikMaps && ikAddress) { ikMaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ikAddress); }

/* kart: {tur, ikon, baslik, deger, aciklama, href, btn, dis} */
var ikKartlar = [];
if (ikPhone) {
  ikKartlar.push({ tur: "ara", ikon: "call", baslik: ikT(ikD.callTitle), deger: ikPhone, ltr: true, aciklama: ikT(ikD.callText), href: "tel:" + ikPhone.replace(/[^+\d]/g, ""), btn: ikT(ikD.callBtn), dis: false });
}
if (ikWa) {
  ikKartlar.push({ tur: "whatsapp", ikon: "chat", baslik: ikT(ikD.waTitle), deger: "+" + ikWa, ltr: true, aciklama: ikT(ikD.waText), href: "https://wa.me/" + ikWa + (ikT(ikD.waMessage) ? "?text=" + encodeURIComponent(ikT(ikD.waMessage)) : ""), btn: ikT(ikD.waBtn), dis: true });
}
if (ikEmail) {
  ikKartlar.push({ tur: "eposta", ikon: "mail", baslik: ikT(ikD.mailTitle), deger: ikEmail, ltr: true, aciklama: ikT(ikD.mailText), href: "mailto:" + ikEmail, btn: ikT(ikD.mailBtn), dis: false });
}
if (ikMaps) {
  ikKartlar.push({ tur: "yol", ikon: "near_me", baslik: ikT(ikD.mapTitle), deger: ikAddress, ltr: false, aciklama: "", href: ikMaps, btn: ikT(ikD.mapBtn), dis: true });
}

var ikCards = "";
for (var iki = 0; iki < ikKartlar.length; iki++) {
  var k = ikKartlar[iki];
  ikCards += '<li class="modulex-ik__card modulex-ik__card--' + k.tur + '" style="--ik-i:' + iki + '">' +
    '<span class="modulex-ik__icon" aria-hidden="true"><span class="material-symbols-outlined">' + k.ikon + "</span></span>" +
    '<div class="modulex-ik__body">' +
      '<h3 class="modulex-ik__title">' + ikEsc(k.baslik) + "</h3>" +
      (k.deger ? '<p class="modulex-ik__value"' + (k.ltr ? ' dir="ltr"' : "") + ">" + ikEsc(k.deger) + "</p>" : "") +
      (k.aciklama ? '<p class="modulex-ik__text">' + ikEsc(k.aciklama) + "</p>" : "") +
    "</div>" +
    '<a class="modulex-ik__btn" href="' + ikEsc(k.href) + '"' + (k.dis ? ' target="_blank" rel="noopener noreferrer"' : "") + ' aria-label="' + ikEsc(k.btn + " — " + k.baslik) + '">' +
      "<span>" + ikEsc(k.btn) + '</span><span class="material-symbols-outlined modulex-ik__arrow" aria-hidden="true">arrow_forward</span></a>' +
  "</li>";
}

var ikTitle = ikT(ikD.title);
var ikDesc = ikT(ikD.description);
var ikHead = (ikTitle || ikDesc)
  ? '<header class="modulex-ik__head">' + (ikTitle ? '<h2 class="modulex-ik__h2">' + ikEsc(ikTitle) + "</h2>" : "") + (ikDesc ? '<p class="modulex-ik__desc">' + ikEsc(ikDesc) + "</p>" : "") + "</header>"
  : "";

html = html.replace(/\{\{ikstil\}\}/g, function () { return ikStil; });
html = html.replace(/\{\{ikhead\}\}/g, function () { return ikHead; });
html = html.replace(/\{\{ikcards\}\}/g, function () { return ikCards; });
html = html.replace(/\{\{ikcount\}\}/g, function () { return String(ikKartlar.length || 1); });
