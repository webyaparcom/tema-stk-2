/* surec-adimlar — sunucu tarafı: adımları dile çözer; yer tutucular: saclass sahead sasteps.
   Veri: json.data[] (yoksa json.data.adimlar / desing.adimlar) = [{no?, baslik{}, metin{}, ikon?}] */
var saDes = json.desing || {};
var saLang = json.lang || "tr";

function saEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function saPick(v) { return wmPickLang(v, saLang); }

var saItems = [];
if (Array.isArray(json.data) && json.data.length) { saItems = json.data; }
else if (json.data && Array.isArray(json.data.adimlar)) { saItems = json.data.adimlar; }
else if (Array.isArray(saDes.adimlar)) { saItems = saDes.adimlar; }

var saStil = String(saDes.stil || "yatay");
if (saStil !== "yatay" && saStil !== "dikey" && saStil !== "kartli") { saStil = "yatay"; }
var saStepTpl = saPick(saDes.stepLabel);

var saSteps = "";
var saN = 0;
var sai;
for (sai = 0; sai < saItems.length; sai++) {
  var it = saItems[sai] || {};
  var baslik = saPick(it.baslik);
  var metin = saPick(it.metin);
  if (!baslik && !metin) { continue; }
  saN++;
  var no = it.no != null && String(it.no).trim() !== "" ? String(it.no) : String(saN);
  var etiket = saStepTpl ? saStepTpl.replace(/\{n\}/g, no) : "";
  var ikon = it.ikon ? '<span class="material-symbols-outlined" aria-hidden="true">' + saEsc(it.ikon) + "</span>" : "";
  saSteps += '<li class="modulex-sa-step">' +
    '<span class="modulex-sa-no" aria-hidden="true">' + (saStil === "kartli" && ikon ? ikon : saEsc(no)) + "</span>" +
    '<div class="modulex-sa-govde">' +
    (etiket ? '<span class="modulex-sa-etiket">' + saEsc(etiket) + "</span>" : "") +
    (baslik ? '<h3 class="modulex-sa-h">' + saEsc(baslik) + "</h3>" : "") +
    (metin ? '<p class="modulex-sa-p">' + saEsc(metin) + "</p>" : "") +
    "</div>" +
    '<span class="modulex-sa-ok" aria-hidden="true"><span class="material-symbols-outlined">arrow_forward</span></span>' +
    "</li>";
}
var saCount = Math.max(1, Math.min(6, saN));

var saEyebrow = saPick(saDes.eyebrow);
var saTitle = saPick(saDes.title);
var saDesc = saPick(saDes.description);
var saHead = "";
if (saEyebrow || saTitle || saDesc) {
  saHead = '<header class="modulex-sa-head">' +
    (saEyebrow ? '<p class="modulex-sa-eyebrow">' + saEsc(saEyebrow) + "</p>" : "") +
    (saTitle ? '<h2 class="modulex-sa-title">' + saEsc(saTitle) + "</h2>" : "") +
    (saDesc ? '<p class="modulex-sa-desc">' + saEsc(saDesc) + "</p>" : "") + "</header>";
}

html = html.replace(/\{\{saclass\}\}/g, function () { return " modulex-sa-" + saStil; });
html = html.replace(/\{\{savars\}\}/g, function () { return "--sa-n:" + saCount; });
html = html.replace(/\{\{sahead\}\}/g, function () { return saHead; });
html = html.replace(/\{\{sasteps\}\}/g, function () { return saSteps; });
