/* stats-2 — sunucu tarafı: sayaçları dile çözer, son değeri biçimli basar; yer tutucular: s2class s2head s2items.
   Veri: json.data[] = [{deger, onek, sonek, ondalik?, etiket{}, aciklama{}, ikon?}] */
var s2Des = json.desing || {};
var s2Lang = json.lang || "tr";

function s2Esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function s2Pick(v) { return wmPickLang(v, s2Lang); }
function s2Bicim(n, ondalik) {
  try {
    return new Intl.NumberFormat(s2Lang + "-u-nu-latn", { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }).format(n);
  } catch (e) { return n.toFixed(ondalik); }
}

var s2Items = Array.isArray(json.data) ? json.data : [];
var s2Stil = String(s2Des.stil || "serit");
if (s2Stil !== "serit" && s2Stil !== "kartli" && s2Stil !== "ayrik-cizgili") { s2Stil = "serit"; }
var s2Desen = String(s2Des.desen || "noktalar");
if (s2Desen !== "noktalar" && s2Desen !== "cizgiler" && s2Desen !== "yok") { s2Desen = "noktalar"; }
var s2Sure = parseInt(s2Des.sure, 10);
if (!isFinite(s2Sure)) { s2Sure = 1000; }

var s2Html = "";
var s2N = 0;
var s2i;
for (s2i = 0; s2i < s2Items.length; s2i++) {
  var it = s2Items[s2i] || {};
  var deger = parseFloat(it.deger);
  var etiket = s2Pick(it.etiket);
  if (!isFinite(deger) || !etiket) { continue; }
  s2N++;
  var ondalik = parseInt(it.ondalik, 10);
  if (!isFinite(ondalik) || ondalik < 0) { ondalik = 0; }
  if (ondalik > 3) { ondalik = 3; }
  var onek = it.onek != null ? String(it.onek) : "";
  var sonek = it.sonek != null ? String(it.sonek) : "";
  var aciklama = s2Pick(it.aciklama);
  s2Html += '<li class="modulex-s2-item">' +
    (it.ikon ? '<span class="modulex-s2-ikon" aria-hidden="true"><span class="material-symbols-outlined">' + s2Esc(it.ikon) + "</span></span>" : "") +
    '<div class="modulex-s2-deger"><bdi dir="ltr">' +
    (onek ? '<span class="modulex-s2-onek">' + s2Esc(onek) + "</span>" : "") +
    '<span class="modulex-s2-sayi" data-s2-hedef="' + deger + '" data-s2-ondalik="' + ondalik + '">' + s2Esc(s2Bicim(deger, ondalik)) + "</span>" +
    (sonek ? '<span class="modulex-s2-sonek">' + s2Esc(sonek) + "</span>" : "") +
    "</bdi></div>" +
    '<p class="modulex-s2-etiket">' + s2Esc(etiket) + "</p>" +
    (aciklama ? '<p class="modulex-s2-aciklama">' + s2Esc(aciklama) + "</p>" : "") +
    "</li>";
}
var s2Count = Math.max(1, Math.min(5, s2N));

var s2Title = s2Pick(s2Des.title);
var s2Desc = s2Pick(s2Des.description);
var s2Head = "";
if (s2Title || s2Desc) {
  s2Head = '<header class="modulex-s2-head">' +
    (s2Title ? '<h2 class="modulex-s2-title">' + s2Esc(s2Title) + "</h2>" : "") +
    (s2Desc ? '<p class="modulex-s2-desc">' + s2Esc(s2Desc) + "</p>" : "") + "</header>";
}

html = html.replace(/\{\{s2class\}\}/g, function () { return " modulex-s2-" + s2Stil + " modulex-s2-desen-" + s2Desen; });
html = html.replace(/\{\{s2dil\}\}/g, function () { return s2Esc(s2Lang); });
html = html.replace(/\{\{s2sure\}\}/g, function () { return String(s2Sure); });
html = html.replace(/\{\{s2vars\}\}/g, function () { return "--s2-n:" + s2Count; });
html = html.replace(/\{\{s2head\}\}/g, function () { return s2Head; });
html = html.replace(/\{\{s2items\}\}/g, function () { return s2Html; });
