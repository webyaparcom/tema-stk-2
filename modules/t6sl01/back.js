// slider-text back.js — Her slayt: bg (arka plan) + img (on plan) + metin katmani

// Coklu dil metnini cozer: string veya { tr, en, ... } nesnesi
function modulexTextsliderResolveText(value, lang) {
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object") {
    if (value[lang]) {
      return value[lang];
    }
    if (value.tr) {
      return value.tr;
    }
    if (value.en) {
      return value.en;
    }
  }
  return "";
}

// Slayt gorsel alanlari: bg arka plan, img on plan (eski img/img2 uyumlulugu)
function modulexTextsliderResolveFiles(item) {
  var bgFile = "";
  var frontFile = "";

  if (item.bg) {
    bgFile = String(item.bg).trim();
    if (item.img) {
      frontFile = String(item.img).trim();
    }
  } else if (item.img2) {
    if (item.img) {
      bgFile = String(item.img).trim();
    }
    frontFile = String(item.img2).trim();
  } else if (item.img) {
    bgFile = String(item.img).trim();
  }

  return {
    bg: bgFile,
    front: frontFile
  };
}

// Slayt yerlesimi: left (gorsel sol, metin sag) | right (metin sol, gorsel sag)
function modulexTextsliderResolveLayout(item, index, desing) {
  var raw = "";
  if (item.layout) {
    raw = String(item.layout).toLowerCase().trim();
  } else if (item.imgpos) {
    raw = String(item.imgpos).toLowerCase().trim();
  } else if (desing && desing.layout) {
    raw = String(desing.layout).toLowerCase().trim();
  }

  if (
    raw === "right" ||
    raw === "img-right" ||
    raw === "text-left"
  ) {
    return "right";
  }
  if (
    raw === "left" ||
    raw === "img-left" ||
    raw === "text-right"
  ) {
    return "left";
  }

  return index % 2 === 0 ? "left" : "right";
}

var backhtml = "";
var slideList = json.data || [];
var slideTotal = slideList.length;
var textAlign = "center";
if (json.desing && json.desing.align) {
  textAlign = json.desing.align;
}

for (var i = 0; i < slideTotal; i++) {
  var item = slideList[i];
  var files = modulexTextsliderResolveFiles(item);
  var title = modulexTextsliderResolveText(item.title, json.lang);
  var desc = modulexTextsliderResolveText(item.description, json.lang);
  var btnText = modulexTextsliderResolveText(item.button, json.lang);
  var link = wxLangInternalHref(item.link || "");
  var slideLayout = modulexTextsliderResolveLayout(item, i, json.desing);
  // Öncelik: slayt bgcolor → modül desing.bgcolor → placeholder (instance desing yeterli)
  var slideBg =
    item.bgcolor ||
    (json.desing && json.desing.bgcolor) ||
    "--bgcolor--";
  var hasBg = files.bg.length > 0;
  var hasFront = files.front.length > 0;
  var bgBlock = "";
  var frontImgHtml = "";
  var slideExtraClass = "";
  var visualClass = "modulex-textslide-visual modulex-textslide-visual-empty";

  if (hasBg) {
    var loadingAttr = i === 0 ? "" : ' loading="lazy"';
    bgBlock =
      '<img class="modulex-textslide-bg"' +
      loadingAttr +
      ' src="/img/' +
      json.id +
      "/" +
      files.bg +
      '?v={{random}}" alt="' +
      (title || "{{web-name}}") +
      '" />';
  } else {
    slideExtraClass = " modulex-textslide-plain";
  }

  if (hasFront) {
    visualClass = "modulex-textslide-visual";
    frontImgHtml =
      '<img class="modulex-textslide-frontimg" loading="lazy" src="/img/' +
      json.id +
      "/" +
      files.front +
      '?v={{random}}" alt="' +
      (title || "{{web-name}}") +
      '" />';
  }

  var titleHtml = title
    ? '<h2 class="modulex-textslide-title">' + title + "</h2>"
    : "";
  var descHtml = desc
    ? '<p class="modulex-textslide-desc">' + desc + "</p>"
    : "";
  var btnHtml = "";

  if (btnText && link) {
    btnHtml =
      '<a class="modulex-textslide-btn" href="' +
      link +
      '"><span class="modulex-textslide-btn-label">' +
      btnText +
      "</span></a>";
  } else if (btnText) {
    btnHtml =
      '<span class="modulex-textslide-btn modulex-textslide-btn-static"><span class="modulex-textslide-btn-label">' +
      btnText +
      "</span></span>";
  }

  backhtml +=
    '<div class="swiper-slide modulex-textslide' +
    slideExtraClass +
    '" data-href="' +
    link +
    '" style="--slide-bg--:' +
    slideBg +
    ';">';
  backhtml += '<div class="modulex-textslide-media">';
  backhtml += bgBlock;
  backhtml += '<div class="modulex-textslide-overlay"></div>';
  backhtml += "</div>";
  var contentBlock =
    '<div class="modulex-textslide-content">' +
    titleHtml +
    descHtml +
    btnHtml +
    "</div>";
  var visualBlock =
    '<div class="' + visualClass + '">' + frontImgHtml + "</div>";

  if (hasFront) {
    backhtml +=
      '<div class="modulex-textslide-inner modulex-textslide-hasfront modulex-textslide-layout-' +
      slideLayout +
      " modulex-textslide-align-" +
      textAlign +
      '">';

    if (slideLayout === "left") {
      backhtml += visualBlock + contentBlock;
    } else {
      backhtml += contentBlock + visualBlock;
    }
  } else {
    // On plan img yoksa metin tam ortada
    backhtml +=
      '<div class="modulex-textslide-inner modulex-textslide-textonly modulex-textslide-align-center">';
    backhtml += contentBlock;
  }

  backhtml += "</div>";
  backhtml += "</div>";
}

html = html.replace(new RegExp("{{slides}}", "g"), backhtml);
