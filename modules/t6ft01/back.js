/* footer-1-b — sayfa linkleri + logo + arkaplan rengi.
   wmPickLang motor enjekte (backJs.js); dil fallback: lang → tr → en → ilk anahtar.
   prefix tasimasi sirasinda modulex-moduleimg placeholder; page/desing guard'lari. */

var backhtml =
  '<li class="modulex-menu__item"><a class="modulex-menu__link" href="' +
  wxLangInternalHref("") +
  '">@home@</a></li>';
var f1bRows =
  webmakerdata["page"] && Array.isArray(webmakerdata["page"].data)
    ? webmakerdata["page"].data
    : [];
for (var f1bI = 0; f1bI < f1bRows.length; f1bI++) {
  var iterator = f1bRows[f1bI];
  if (iterator.status == "play") {
    var f1bName = wmPickLang(iterator.name, json.lang);
    if (!f1bName) {
      continue;
    }
    var f1bHref = wxLangInternalHref(iterator.pathnext || iterator.path);
    backhtml +=
      '<li class="modulex-menu__item"><a class="modulex-menu__link" href="' +
      f1bHref +
      '">' +
      f1bName +
      "</a></li>";
  }
}
html = html.replace(new RegExp("{{html}}", "g"), backhtml);

var bgcolor =
  json.desing && json.desing.bgcolor ? String(json.desing.bgcolor) : "";
bgcolor = bgcolor.replace(new RegExp("#", "g"), "");

var moduleimgHtml = "";
if (json.desing && json.desing.img) {
  moduleimgHtml =
    '<div class="modulex-moduleimg">\n  <img src="/img/' +
    json.id +
    "/" +
    json.desing.img +
    '" alt="Logo" />\n</div>';
}

html = html.replace(new RegExp("{{modulex-moduleimg}}", "g"), moduleimgHtml);
html = html.replace(new RegExp("#bgcolor#", "g"), bgcolor);

/* Sosyal liste: yalnız dolu hesaplar, ikon satır içi svg; hesap yoksa kabuk hiç basılmaz (services/webmaker/sosyalBar.js). CF dinamik render'da wmSocialBar yok → boş. */
var f1bSosyal = typeof wmSocialBar === "function" ? wmSocialBar({ liste: "social-icon", oge: "social-icon__item", baglanti: "social-icon__link social-icon__link--{ag}" }) : "";
html = html.replace(new RegExp("{{socialbar}}", "g"), function () { return f1bSosyal; });
