/* menu-10 — Şeffaf overlay menü (31 Eki 2026, G8-A).
   Yer tutucular: m10stil m10menu m10cta m10logoacik — koşulsuz. {{langbar}} moduleRender çözer.
   Öğeler: @home@ + pagesetting sayfaları (status play, category "") + json.data[] ({name{}, url}).
   logo_acik verilirse köke modulex-m10-logolu-acik sınıfı eklenir (şeffaf durumda açık logo). Yalnız var + klasik for. */
function m10Dil(v) {
  if (v == null) { return ""; }
  if (typeof v !== "object") { return String(v); }
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function m10Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function m10Href(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) { return s; }
  return wxLangInternalHref(s);
}

var m10Des = json.desing || {};
var m10Sayfa = page || {};
var m10Stil = String(m10Des.stil || "sade").trim();
if (m10Stil !== "sade" && m10Stil !== "cta-butonlu") { m10Stil = "sade"; }

/* --- menü --- */
var m10Menu = '<li><a class="modulex-m10-oge" href="' + wxLangInternalHref("") + '"' + (!m10Sayfa.path ? ' aria-current="page"' : "") + ">@home@</a></li>";
var m10Ps = (webmakerdata && webmakerdata.pagesetting && Array.isArray(webmakerdata.pagesetting.data))
  ? webmakerdata.pagesetting.data.find(function (it) { return it && it.modulestatus && it.modulestatus.page; })
  : null;
if (m10Ps && webmakerdata[m10Ps.path] && Array.isArray(webmakerdata[m10Ps.path].data)) {
  var m10Satirlar = webmakerdata[m10Ps.path].data;
  for (var m10i = 0; m10i < m10Satirlar.length; m10i++) {
    var m10R = m10Satirlar[m10i] || {};
    if (m10R.status !== "play" || (m10R.category || "") !== "") { continue; }
    var m10Ad = m10Dil(m10R.name).trim();
    if (!m10Ad) { continue; }
    var m10Aktif = !!m10Sayfa.path && m10Sayfa.path === m10R.path;
    m10Menu += '<li><a class="modulex-m10-oge" href="' + m10Esc(wxLangInternalHref(m10R.pathnext || m10R.path || "")) + '"' + (m10Aktif ? ' aria-current="page"' : "") + ">" + m10Esc(m10Ad) + "</a></li>";
  }
}
var m10Ek = Array.isArray(json.data) ? json.data : [];
for (var m10j = 0; m10j < m10Ek.length; m10j++) {
  var m10E = m10Ek[m10j] || {};
  var m10EAd = m10Dil(m10E.name || m10E.text).trim();
  var m10EUrl = m10Href(m10E.url || m10E.href);
  if (m10EAd && m10EUrl) { m10Menu += '<li><a class="modulex-m10-oge" href="' + m10Esc(m10EUrl) + '">' + m10Esc(m10EAd) + "</a></li>"; }
}

/* --- CTA (yalnız cta-butonlu) --- */
var m10Cta = "";
var m10CtaAd = m10Dil(m10Des.cta).trim();
var m10CtaUrl = m10Href(m10Des.cta_url);
if (m10Stil === "cta-butonlu" && m10CtaAd && m10CtaUrl) {
  m10Cta = '<a class="modulex-m10-cta" href="' + m10Esc(m10CtaUrl) + '">' + m10Esc(m10CtaAd) + '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>';
}

/* --- açık logo --- */
var m10LogoAcik = "";
var m10LA = String(m10Des.logo_acik || "").trim();
if (m10LA && !/^\s*(javascript|vbscript|data):/i.test(m10LA)) {
  var m10LAYol = (m10LA.charAt(0) === "/" || /^https?:\/\//i.test(m10LA)) ? m10LA : "/img/" + m10LA;
  m10LogoAcik = '<img class="modulex-m10-logo-acik" src="' + m10Esc(m10LAYol) + '" alt="" aria-hidden="true" loading="eager" decoding="async" />';
  html = html.replace('class="modulex-m10 ', 'class="modulex-m10 modulex-m10-logolu-acik ');
}

html = html
  .replace(/\{\{m10stil\}\}/g, function () { return m10Stil; })
  .replace(/\{\{m10menu\}\}/g, function () { return m10Menu; })
  .replace(/\{\{m10cta\}\}/g, function () { return m10Cta; })
  .replace(/\{\{m10logoacik\}\}/g, function () { return m10LogoAcik; });
