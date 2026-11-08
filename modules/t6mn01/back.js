try {
  var wxPublicSlug = function (it) {
    if (!it) return "";
    var n = it.pathnext;
    if (n != null && String(n).trim() !== "") return String(n).trim();
    return it.path != null ? String(it.path) : "";
  };

  var menu2ItemLabel = function (it) {
    if (!it || !it.name) return "";
    if (typeof it.name === "string") return it.name;
    return it.name[json.lang] || it.name.tr || it.name.en || "";
  };

  // Kök menü path ile kategori JSON dosya adı farklıysa bucket anahtarını bul (ör. yeni-sayfa-jwsf → sevkiyat.json)
  var menu2ResolveBucketKey = function (parentItem) {
    var tryKey = function (key) {
      if (!key || !webmakerdata[key] || !webmakerdata[key].data || !webmakerdata[key].data.length) {
        return "";
      }
      return key;
    };
    var fromPath = tryKey(parentItem.path);
    if (fromPath) return fromPath;
    var fromId = tryKey(parentItem.id);
    if (fromId) return fromId;
    var pnext = parentItem.pathnext;
    if (pnext != null && String(pnext).trim() !== "" && webmakerdata.pagesetting && webmakerdata.pagesetting.data) {
      var slug = String(pnext).trim();
      var psRows = webmakerdata.pagesetting.data;
      for (var pi = 0; pi < psRows.length; pi++) {
        var catRow = psRows[pi];
        if (!catRow || !catRow.path || catRow.path === "page" || catRow.path === "category") continue;
        var bucket = webmakerdata[catRow.path];
        if (!bucket || !bucket.data || !bucket.data.length) continue;
        for (var di = 0; di < bucket.data.length; di++) {
          var row = bucket.data[di];
          if (row && (row.path === slug || row.pathnext === slug)) {
            return catRow.path;
          }
        }
      }
    }
    return parentItem.path != null ? String(parentItem.path) : "";
  };

  var menu2CollectSubPages = function (parentItem) {
    var out = [];
    var seen = {};
    var pushSub = function (sub) {
      if (!sub || sub.status !== "play") return;
      var key = (sub.id != null ? String(sub.id) : "") || (sub.path != null ? String(sub.path) : "");
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push(sub);
    };
    var readBucket = function (bucketKey) {
      if (!bucketKey || !webmakerdata[bucketKey] || !webmakerdata[bucketKey].data) return;
      var arr = webmakerdata[bucketKey].data;
      for (var i = 0; i < arr.length; i++) {
        pushSub(arr[i]);
      }
    };
    var bucketKey = menu2ResolveBucketKey(parentItem);
    if (bucketKey) {
      readBucket(bucketKey);
    }
    var pagesettingForCat = webmakerdata.pagesetting.data.find(
      function (item) { return item.modulestatus && item.modulestatus.page; }
    );
    if (pagesettingForCat && parentItem.id) {
      var rootList = webmakerdata[pagesettingForCat.path].data;
      for (var j = 0; j < rootList.length; j++) {
        var pg = rootList[j];
        if (pg.status === "play" && pg.category === parentItem.id) {
          pushSub(pg);
        }
      }
    }
    return out;
  };

  var menu2BuildDropdown = function (parentItem, currentSlug) {
    var subs = menu2CollectSubPages(parentItem);
    if (!subs.length) return "";
    var inner = "";
    for (var s = 0; s < subs.length; s++) {
      var sub = subs[s];
      var subSlug = wxPublicSlug(sub);
      var subActive = currentSlug === subSlug ? ' class="modulex-menu-list-active"' : "";
      inner += "<a" + subActive + ' href="' + wxLangInternalHref(subSlug) + '">' + menu2ItemLabel(sub) + "</a>";
    }
    return '<div class="dropdown-content-modulex">' + inner + "</div>";
  };

  var menu2BranchActive = function (parentItem, currentSlug) {
    if (wxPublicSlug(parentItem) === currentSlug) return true;
    var subs = menu2CollectSubPages(parentItem);
    for (var i = 0; i < subs.length; i++) {
      if (wxPublicSlug(subs[i]) === currentSlug) return true;
    }
    return false;
  };

  var pagesettingjson = webmakerdata.pagesetting.data.find(
    function (item) { return item.modulestatus && item.modulestatus.page; }
  );
  var currentPagePath = wxPublicSlug(page);
  var backhtml = '<a href="' + wxLangInternalHref("") + '">@home@</a>';

  if (pagesettingjson) {
    for (var iterator of webmakerdata[pagesettingjson.path].data) {
      if (iterator.status == "play" && iterator.category == "") {
        var parentSlug = wxPublicSlug(iterator);
        var dropdownHtml = menu2BuildDropdown(iterator, currentPagePath);
        var isActive = menu2BranchActive(iterator, currentPagePath);
        var linkActive = parentSlug === currentPagePath;

        if (dropdownHtml !== "") {
          var wrapClass = "modulexmenulist-menu";
          if (isActive) {
            wrapClass += " dropdown-content-active-modulex";
          }
          var linkClass = linkActive || isActive ? ' class="modulex-menu-list-active"' : "";
          backhtml +=
            '<div class="' +
            wrapClass +
            '"><a' +
            linkClass +
            ' href="' +
            wxLangInternalHref(parentSlug) +
            '">' +
            menu2ItemLabel(iterator) +
            "</a>" +
            dropdownHtml +
            "</div>";
        } else {
          if (linkActive || isActive) {
            backhtml +=
              '<a class="modulex-menu-list-active" href="' +
              wxLangInternalHref(parentSlug) +
              '">' +
              menu2ItemLabel(iterator) +
              "</a>";
          } else {
            backhtml +=
              '<a href="' + wxLangInternalHref(parentSlug) + '">' + menu2ItemLabel(iterator) + "</a>";
          }
        }
      }
    }
    html = html.replace(new RegExp("{{html}}", "g"), backhtml);
  }

  // Dil seçici: tek üretici (services/webmaker/langBar.js → wmLangHtml). Aktif dil .wm-lang-active, tek dilde "" (30 Eki 2026)
  langhtml = wmLangHtml({ style: "text" });
  // Tek dilde kompakt düğme hiç basılmaz: içi boş ul boşluk metni taşır, CSS :empty eşleşmez (2 Kas 2026).
  // Üst şerit ve çekmece listesi kalır — masaüstü yerleşimi onların kutusuna göre oturmuş.
  if (!langhtml) html = html.replace(/<details class="modulex-lang-top">[\s\S]*?<\/details>\s*/, "");
  html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);
  // Dil çipi logo bandındadır, zemini menü zemini değil sayfa zeminidir: varsayılan (boş / currentColor) modül renklerinden okunanı seçer (2 Kas 2026).
  // Elle verilen langcolor aynen kalır; tek dilde çip yok, çıktı değişmez. CF dinamik render'da wmOkunurRenk yok → eski currentColor.
  var m2LangRenk = json.desing ? json.desing.langcolor : "";
  if (langhtml && (!m2LangRenk || /^currentcolor$/i.test(String(m2LangRenk))) && typeof wmOkunurRenk === "function") {
    var m2Okunur = wmOkunurRenk([json.desing.color, json.desing.bgcolor], json.desing.langbg);
    if (m2Okunur) html = html.replace(/--langcolor--/g, function () { return m2Okunur; });
  }

  // desing.tekSatir doluysa masaüstünde logo + menü + dil tek bantta; boşsa eski iki satır aynen (2 Kas 2026)
  if (json.desing && json.desing.tekSatir) html = html.replace('<div class="modulex">', '<div class="modulex modulex-teksatir">');
  // Logo / site adı: render öncesi önizlemede kırık {{logo}} img yolunu önle
  // desing.logoimg (modül ayarı) doluysa menüde o görsel gösterilir (ör. koyu rozet üstünde açık logo);
  // setting.logo değişmez → schema/og/manifest ana logoyu kullanmaya devam eder.
  // desing.logoimgs {dil: dosya}: dile göre logo (tr/en/ar/ko); yoksa logoimg
  var menu2Logo =
    json.desing && json.desing.logoimgs && json.desing.logoimgs[json.lang]
      ? String(json.desing.logoimgs[json.lang])
      : json.desing && json.desing.logoimg
      ? String(json.desing.logoimg)
      : webmakerdata.setting && webmakerdata.setting.logo
      ? String(webmakerdata.setting.logo)
      : "logo.svg";
  // desing.logoDark (yoksa setting.logoDark): koyu temada ikinci logo (8 Kas 2026). Boşsa logo img'sine dokunulmaz.
  // Sistem koyu tercihi yalnız setting.colorScheme "auto" sitede izlenir; html[data-mx-scheme="dark"] her zaman.
  var m2LogoDark = String((json.desing && json.desing.logoDark) || (webmakerdata.setting && webmakerdata.setting.logoDark) || "").trim();
  if (!/^[^"<>\s]+$/.test(m2LogoDark)) m2LogoDark = "";
  var m2OtoKoyu = !!(webmakerdata.setting && webmakerdata.setting.colorScheme === "auto");
  var m2LogoCss = !m2LogoDark ? "" : ".mx-logo-koyu{display:none!important}" +
    (m2OtoKoyu ? '@media (prefers-color-scheme:dark){:root:not([data-mx-scheme="light"]) .mx-logo-acik{display:none!important}:root:not([data-mx-scheme="light"]) .mx-logo-koyu{display:block!important}}' : "") +
    'html[data-mx-scheme="dark"] .mx-logo-acik{display:none!important}html[data-mx-scheme="dark"] .mx-logo-koyu{display:block!important}';
  if (m2LogoDark) {
    html = html.replace(/<img\s+src="\/img\/\{\{logo\}\}[^>]*?class="modulexbodylogo"[^>]*>/, function (tag) {
      return tag.replace('class="modulexbodylogo"', 'class="modulexbodylogo mx-logo-acik"') +
        tag.replace("{{logo}}", function () { return m2LogoDark; }).replace('class="modulexbodylogo"', 'class="modulexbodylogo mx-logo-koyu"');
    });
    html += "<style>" + m2LogoCss + "</style>";
  }
  html = html.replace(new RegExp("{{logo}}", "g"), menu2Logo);
  if (webmakerdata.setting && webmakerdata.setting.name) {
    var menu2SiteName = menu2ItemLabel({ name: webmakerdata.setting.name });
    if (menu2SiteName) {
      html = html.replace(new RegExp("{{web-name}}", "g"), menu2SiteName);
    }
  }
  // desing.duzen === "kompakt" (8 Kas 2026, sevgane başlığından genelleştirildi): tek satır sticky başlık — sol logo · orta menü
  // (alt sayfası olan öğe açılır düğme) · sağ dil açılır menüsü + tema düğmesi + CTA; ≤1100px tam ekran panel, TEK düğme (hamburger↔X).
  // Sticky yalnız #header'da başka modül (slider …) yokken: aksi hâlde slider da yapışırdı; o zaman başlık yalnız üst katmanda durur.
  // Seçenekler: ctaText {dil:metin} + ctaHref (slug ya da dış adres) · temaDugmesi (yalnız setting.colorScheme "auto" sitede basılır)
  // · temaAnahtar (localStorage adı, varsayılan "mx-scheme"). Boşsa yukarıdaki klasik çıktı aynen kalır.
  if (json.desing && json.desing.duzen === "kompakt") {
    var m2kD = json.desing;
    var m2kTx = function (o) {
      if (o == null) return "";
      if (typeof o === "string") return o;
      return o[json.lang] || o.tr || o.en || "";
    };
    var m2kEsc = function (s) {
      return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };
    var M2KT = {
      main: { tr: "Ana gezinti", en: "Main navigation", ar: "التنقل الرئيسي", de: "Hauptnavigation", es: "Navegación principal" },
      lang: { tr: "Dil", en: "Language", ar: "اللغة", de: "Sprache", es: "Idioma" },
      theme: { tr: "Açık / koyu tema", en: "Light / dark theme", ar: "السمة الفاتحة / الداكنة", de: "Helles / dunkles Design", es: "Tema claro / oscuro" },
      themeShort: { tr: "Tema", en: "Theme", ar: "السمة", de: "Design", es: "Tema" },
      open: { tr: "Menüyü aç", en: "Open menu", ar: "فتح القائمة", de: "Menü öffnen", es: "Abrir menú" },
      close: { tr: "Menüyü kapat", en: "Close menu", ar: "إغلاق القائمة", de: "Menü schließen", es: "Cerrar menú" }
    };
    var M2K_DIL = { tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch", ru: "Русский", es: "Español", fr: "Français", it: "Italiano", ja: "日本語", zh: "中文", ko: "한국어", pt: "Português" };
    var m2kChev = '<svg class="m2k-chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>';
    var m2kCur = function (slug) { return slug === currentPagePath ? ' aria-current="page"' : ""; };

    var m2kItems = "";
    var m2kRows = pagesettingjson && webmakerdata[pagesettingjson.path] ? webmakerdata[pagesettingjson.path].data || [] : [];
    var m2kSay = 0;
    m2kRows.forEach(function (it) {
      if (!it || it.status != "play" || it.category != "") return;
      var slug = wxPublicSlug(it);
      var etiket = m2kEsc(menu2ItemLabel(it));
      var subs = menu2CollectSubPages(it);
      if (!subs.length) {
        m2kItems += '<li class="m2k-item"><a class="m2k-link" href="' + wxLangInternalHref(slug) + '"' + m2kCur(slug) + ">" + etiket + "</a></li>";
        return;
      }
      var gid = "m2k-g-" + ++m2kSay;
      var dal = menu2BranchActive(it, currentPagePath);
      var alt = subs.map(function (sub) {
        var ss = wxPublicSlug(sub);
        return '<li><a class="m2k-link m2k-sublink" href="' + wxLangInternalHref(ss) + '"' + m2kCur(ss) + ">" + m2kEsc(menu2ItemLabel(sub)) + "</a></li>";
      }).join("");
      alt += '<li class="m2k-sub-all"><a class="m2k-link m2k-sublink" href="' + wxLangInternalHref(slug) + '"' + m2kCur(slug) + ">" + etiket + "</a></li>";
      m2kItems += '<li class="m2k-item m2k-has-sub' + (dal ? " m2k-branch-active" : "") + '">' +
        '<button type="button" class="m2k-link m2k-sub-btn" aria-expanded="false" aria-controls="' + gid + '"><span>' + etiket + "</span>" + m2kChev + "</button>" +
        '<ul class="m2k-sub" id="' + gid + '">' + alt + "</ul></li>";
    });

    var m2kCtaMetin = m2kTx(m2kD.ctaText);
    var m2kCtaHedef = String(m2kD.ctaHref == null ? "" : m2kD.ctaHref).trim();
    var m2kCta = m2kCtaMetin && /^[^"<>\s]*$/.test(m2kCtaHedef)
      ? '<a class="m2k-cta" href="' + wxLangInternalHref(m2kCtaHedef.replace(/^\/+|\/+$/g, "")) + '">' + m2kEsc(m2kCtaMetin) + "</a>"
      : "";

    var m2kDiller = [];
    var m2kLangHam = typeof wmLangHtml === "function" ? wmLangHtml({ style: "text" }) : "";
    var m2kRe = /<li class="([^"]*)"><a href="([^"]*)" hreflang="([^"]*)"/g, m2kM;
    while ((m2kM = m2kRe.exec(m2kLangHam))) m2kDiller.push({ code: m2kM[3], href: m2kM[2], active: /wm-lang-active/.test(m2kM[1]) });
    var m2kLangDrop = "", m2kChips = "";
    if (m2kDiller.length > 1) {
      var m2kAktif = (m2kDiller.filter(function (l) { return l.active; })[0] || { code: json.lang || "tr" }).code;
      var m2kLi = m2kDiller.map(function (l) {
        return "<li><a" + (l.active ? ' aria-current="true"' : "") + ' href="' + l.href + '" hreflang="' + l.code + '" lang="' + l.code + '"><span class="m2k-lcode">' +
          l.code.toUpperCase() + "</span><span>" + m2kEsc(M2K_DIL[l.code] || l.code) + "</span></a></li>";
      }).join("");
      m2kLangDrop = '<div class="m2k-lang"><button type="button" class="m2k-lang-btn" aria-expanded="false" aria-haspopup="true" aria-label="' + m2kEsc(m2kTx(M2KT.lang)) + '">' +
        '<span class="m2k-lang-code">' + m2kEsc(m2kAktif.toUpperCase()) + "</span>" + m2kChev + '</button><ul class="m2k-lang-list">' + m2kLi + "</ul></div>";
      m2kChips = '<div class="m2k-chips" role="group" aria-label="' + m2kEsc(m2kTx(M2KT.lang)) + '">' + m2kDiller.map(function (l) {
        return '<a class="m2k-chip"' + (l.active ? ' aria-current="true"' : "") + ' href="' + l.href + '" hreflang="' + l.code + '" lang="' + l.code + '">' + l.code.toUpperCase() + "</a>";
      }).join("") + "</div>";
    }

    var m2kTema = !!m2kD.temaDugmesi && m2OtoKoyu;
    var m2kAnahtar = /^[A-Za-z0-9_-]{1,32}$/.test(String(m2kD.temaAnahtar || "")) ? String(m2kD.temaAnahtar) : "mx-scheme";
    var m2kSun = '<svg class="m2k-ico-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    var m2kMoon = '<svg class="m2k-ico-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    var m2kTemaEt = m2kEsc(m2kTx(M2KT.theme));
    var m2kTemaBtn = m2kTema ? '<button type="button" class="m2k-theme" data-m2k-theme aria-label="' + m2kTemaEt + '" title="' + m2kTemaEt + '">' + m2kSun + m2kMoon + "</button>" : "";
    var m2kTemaSatir = m2kTema ? '<button type="button" class="m2k-theme-row" data-m2k-theme aria-label="' + m2kTemaEt + '"><span class="m2k-theme-ico">' + m2kSun + m2kMoon + "</span><span>" + m2kEsc(m2kTx(M2KT.themeShort)) + "</span></button>" : "";

    var m2kAd = m2kEsc(webmakerdata.setting && webmakerdata.setting.name ? menu2ItemLabel({ name: webmakerdata.setting.name }) : "");
    var m2kLogo = '<img class="m2k-logo-img' + (m2LogoDark ? " mx-logo-acik" : "") + '" src="/img/' + m2kEsc(menu2Logo) + '?v={{random}}" alt="' + m2kAd + '" height="44" decoding="async" />';
    if (m2LogoDark) m2kLogo += '<img class="m2k-logo-img mx-logo-koyu" src="/img/' + m2kEsc(m2LogoDark) + '?v={{random}}" alt="' + m2kAd + '" height="44" decoding="async" />';
    var m2kAc = m2kEsc(m2kTx(json.desing.ariaToggle) || m2kTx(M2KT.open));
    var m2kKapat = m2kEsc(m2kTx(json.desing.ariaClose) || m2kTx(M2KT.close));
    var m2kBurger = '<button type="button" class="m2k-burger" aria-expanded="false" aria-controls="m2k-panel" aria-label="' + m2kAc + '" data-open="' + m2kAc + '" data-close="' + m2kKapat + '">' +
      '<span class="m2k-burger-box" aria-hidden="true"><i></i><i></i><i></i></span></button>';

    var m2kStil = [
      '#header:not(:has(> :not(.m2k,style,script,link,noscript))){position:sticky;top:0;z-index:1000;width:100%}',
      '.m2k{z-index:1000;--m2k-bar:72px;--m2k-logo:44px;--m2k-bg:--bgcolor--;--m2k-text:--color--;--m2k-accent:--activebgcolor--;--m2k-accent-text:--activecolor--;',
      '--m2k-line:color-mix(in srgb,var(--m2k-text) 14%,transparent);position:relative;width:100%;color:var(--m2k-text);font-family:var(--mx-font-sans,inherit)}',
      '.m2k.m2k-sm{--m2k-bar:56px;--m2k-logo:34px}',
      '.m2k *,.m2k *::before,.m2k *::after{box-sizing:border-box}',
      '.m2k :where(ul){list-style:none;margin:0;padding:0}.m2k :where(a){text-decoration:none;color:inherit}',
      '.m2k :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}',
      '.m2k a:focus-visible,.m2k button:focus-visible{outline:2px solid var(--m2k-accent);outline-offset:2px;border-radius:6px}',
      '.m2k::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:color-mix(in srgb,var(--m2k-bg) 94%,transparent);border-bottom:1px solid var(--m2k-line);transition:background .2s ease-out,box-shadow .2s ease-out}',
      '@supports (backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px)){.m2k.m2k-sm::before{background:color-mix(in srgb,var(--m2k-bg) 78%,transparent);-webkit-backdrop-filter:saturate(1.4) blur(14px);backdrop-filter:saturate(1.4) blur(14px);box-shadow:0 6px 24px -14px rgba(0,0,0,.45)}}',
      '.m2k-bar{position:relative;z-index:0;display:flex;align-items:center;gap:20px;max-width:1288px;height:var(--m2k-bar);margin:0 auto;padding:0 24px;transition:height .2s ease-out}',
      '.m2k-logo{position:relative;z-index:2;display:inline-flex;align-items:center;flex:0 0 auto}',
      '.m2k-logo-img{display:block;height:var(--m2k-logo);width:auto;max-width:200px;transition:height .2s ease-out}',
      '.m2k-panel{position:relative;z-index:1;flex:1 1 auto;display:flex;justify-content:center;min-width:0}.m2k-panel-foot{display:none}',
      '.m2k-list{display:flex;align-items:center;gap:4px}.m2k-item{position:relative}',
      '.m2k-link{position:relative;display:inline-flex;align-items:center;gap:4px;min-height:40px;padding:0 12px;font-size:15px;font-weight:500;white-space:nowrap;color:var(--m2k-text);border-radius:8px;transition:color .15s ease-out,background-color .15s ease-out}',
      '.m2k-link:hover{color:var(--m2k-accent);background:color-mix(in srgb,var(--m2k-accent) 10%,transparent)}',
      '.m2k-link[aria-current="page"],.m2k-branch-active>.m2k-sub-btn{color:var(--m2k-accent);font-weight:600}',
      '.m2k-item>.m2k-link[aria-current="page"]::after,.m2k-branch-active>.m2k-sub-btn::after{content:"";position:absolute;inset-inline:12px;bottom:2px;height:2px;border-radius:2px;background:var(--m2k-accent)}',
      '.m2k-chev{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .2s ease-out;flex:0 0 auto}',
      '.m2k-has-sub.m2k-open>.m2k-sub-btn .m2k-chev,.m2k-lang.m2k-open .m2k-chev{transform:rotate(180deg)}',
      '.m2k-sub,.m2k-lang-list{position:absolute;top:calc(100% + 6px);padding:8px;background:var(--m2k-bg);border:1px solid var(--m2k-line);border-radius:12px;box-shadow:0 18px 40px -18px rgba(0,0,0,.5);opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .15s ease-out,transform .15s ease-out,visibility 0s linear .15s}',
      '.m2k-sub{inset-inline-start:0;min-width:250px}.m2k-lang-list{inset-inline-end:0;min-width:170px;padding:6px}',
      '.m2k-has-sub.m2k-open>.m2k-sub,.m2k-lang.m2k-open>.m2k-lang-list{opacity:1;visibility:visible;transform:none;transition-delay:0s}',
      '@media (hover:hover){.m2k-has-sub:hover>.m2k-sub{opacity:1;visibility:visible;transform:none;transition-delay:0s}.m2k-has-sub:hover>.m2k-sub-btn .m2k-chev{transform:rotate(180deg)}}',
      '.m2k-sublink{display:flex;width:100%;min-height:40px;padding:0 12px}',
      '.m2k-sub-all{margin-top:6px;padding-top:6px;border-top:1px solid var(--m2k-line)}',
      '.m2k-sub .m2k-link[aria-current="page"]::after{display:none}',
      '.m2k-sub .m2k-link[aria-current="page"]{color:var(--m2k-text);font-weight:700;border-inline-start:3px solid var(--m2k-accent);padding-inline-start:9px;border-radius:4px 8px 8px 4px}',
      '.m2k-tools{position:relative;z-index:2;display:flex;align-items:center;gap:10px;flex:0 0 auto}',
      '.m2k-theme{width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid var(--m2k-line)}',
      '.m2k-theme svg,.m2k-theme-row svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
      '.m2k .m2k-ico-sun{display:none}',
      'html[data-mx-scheme="dark"] .m2k .m2k-ico-sun{display:block}html[data-mx-scheme="dark"] .m2k .m2k-ico-moon{display:none}',
      '@media (prefers-color-scheme:dark){:root:not([data-mx-scheme="light"]) .m2k .m2k-ico-sun{display:block}:root:not([data-mx-scheme="light"]) .m2k .m2k-ico-moon{display:none}}',
      '.m2k-cta{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 18px;border-radius:8px;background:var(--m2k-accent);color:var(--m2k-accent-text)!important;font-size:14px;font-weight:700;white-space:nowrap;transition:background-color .15s ease-out}',
      '.m2k-cta:hover{background:color-mix(in srgb,var(--m2k-accent) 66%,var(--m2k-text))}',
      '.m2k-lang{position:relative}',
      '.m2k-lang-btn{display:inline-flex;align-items:center;gap:4px;min-height:40px;padding:0 8px 0 12px;border:1px solid var(--m2k-line);border-radius:8px;font-size:13px;font-weight:600;letter-spacing:.04em}',
      '.m2k-lang-btn:hover,.m2k-lang.m2k-open>.m2k-lang-btn{border-color:var(--m2k-accent);background:color-mix(in srgb,var(--m2k-accent) 10%,transparent)}',
      '.m2k-lang-list a{display:flex;align-items:center;gap:10px;min-height:40px;padding:0 10px;border-radius:8px;font-size:14px}',
      '.m2k-lang-list a:hover{background:color-mix(in srgb,var(--m2k-accent) 10%,transparent);color:var(--m2k-accent)}',
      '.m2k-lang-list a[aria-current="true"]{font-weight:700;border-inline-start:3px solid var(--m2k-accent);padding-inline-start:7px}',
      '.m2k-lcode{min-width:24px;font-size:12px;font-weight:700;letter-spacing:.05em}',
      '.m2k-burger{display:none;position:relative;z-index:2;width:48px;height:48px;margin-inline-start:auto;border-radius:10px;align-items:center;justify-content:center}',
      '.m2k-burger-box{position:relative;display:block;width:22px;height:16px}',
      '.m2k-burger-box i{position:absolute;inset-inline:0;height:2px;border-radius:2px;background:currentColor;transition:transform .2s ease-out,opacity .15s ease-out,top .2s ease-out}',
      '.m2k-burger-box i:nth-child(1){top:0}.m2k-burger-box i:nth-child(2){top:7px}.m2k-burger-box i:nth-child(3){top:14px}',
      '.m2k-burger[aria-expanded="true"] .m2k-burger-box i:nth-child(1){top:7px;transform:rotate(45deg)}',
      '.m2k-burger[aria-expanded="true"] .m2k-burger-box i:nth-child(2){opacity:0}',
      '.m2k-burger[aria-expanded="true"] .m2k-burger-box i:nth-child(3){top:7px;transform:rotate(-45deg)}',
      '@media (max-width:1100px){',
      '.m2k-bar{padding:0 16px;gap:12px}.m2k-tools{display:none}.m2k-burger{display:inline-flex}',
      '.m2k-panel{position:fixed;inset:0;z-index:1;display:block;padding:calc(var(--m2k-bar) + 8px) 20px 28px;overflow-y:auto;overscroll-behavior:contain;background:var(--m2k-bg);visibility:hidden;opacity:0;transform:translateY(-8px);transition:opacity .2s ease-out,transform .2s ease-out,visibility 0s linear .2s}',
      '.m2k.m2k-menu-open .m2k-panel{visibility:visible;opacity:1;transform:none;transition-delay:0s}',
      '.m2k-nav{max-width:560px;margin:0 auto}.m2k-list{display:block}.m2k-item{border-bottom:1px solid var(--m2k-line)}',
      '.m2k-link{display:flex;width:100%;min-height:56px;padding:0 4px;font-size:18px;border-radius:0;justify-content:space-between}.m2k-link:hover{background:none}',
      '.m2k-item>.m2k-link[aria-current="page"]::after,.m2k-branch-active>.m2k-sub-btn::after{inset-inline:auto;inset-inline-start:-20px;top:12px;bottom:12px;width:3px;height:auto}',
      '.m2k-sub{position:static;min-width:0;padding:0 0 8px;background:none;border:0;box-shadow:none;border-radius:0;opacity:1;visibility:visible;transform:none;display:none}',
      '.m2k-has-sub.m2k-open>.m2k-sub{display:block}',
      '.m2k-sublink{min-height:52px;padding:0 16px;font-size:16px;font-weight:400;color:var(--m2k-text)}',
      '.m2k-sub-all{margin-top:0;padding-top:0;border-top:0}',
      '.m2k-panel-foot{display:flex;flex-direction:column;gap:16px;max-width:560px;margin:24px auto 0}',
      '.m2k-panel-foot .m2k-cta{min-height:52px;font-size:16px;width:100%}',
      '.m2k-chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(48px,1fr));gap:8px}',
      '.m2k-chip{display:inline-flex;align-items:center;justify-content:center;min-height:48px;border:1px solid var(--m2k-line);border-radius:8px;font-size:14px;font-weight:600;letter-spacing:.04em}',
      '.m2k-chip[aria-current="true"]{border-color:var(--m2k-accent);color:var(--m2k-accent-text);background:var(--m2k-accent)}',
      '.m2k-theme-row{display:inline-flex;align-items:center;gap:12px;min-height:48px;padding:0 4px;font-size:16px}',
      '.m2k-theme-ico{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border:1px solid var(--m2k-line);border-radius:8px}',
      '}',
      '@media (min-width:1101px){.m2k-theme-row{display:none}}',
      '.m2k .m2k-sub-btn>span,.m2k .m2k-theme-row>span:last-child{font-size:inherit;font-weight:inherit;line-height:inherit;letter-spacing:inherit}',
      'html.m2k-lock{overflow:hidden}html.m2k-lock a.whatsapp{display:none}',
      '@media (prefers-reduced-motion:reduce){.m2k *,.m2k *::before,.m2k::before{transition:none!important}}'
    ].join("");

    var m2kBetik = "(function(){var k=" + JSON.stringify(m2kAnahtar) + ",r=document.documentElement;" +
      "try{var s=localStorage.getItem(k);if(s==='light'||s==='dark')r.setAttribute('data-mx-scheme',s)}catch(e){}" +
      "var mq=window.matchMedia('(max-width:1100px)');" +
      "function sync(){var a=r.getAttribute('data-mx-scheme');var d=a==='dark'||(a!=='light'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);" +
      "var b=document.querySelectorAll('[data-m2k-theme]');for(var i=0;i<b.length;i++)b[i].setAttribute('aria-pressed',d?'true':'false');return d}" +
      "var hs=document.querySelectorAll('.m2k:not([data-init])');for(var n=0;n<hs.length;n++)(function(h){h.setAttribute('data-init','1');" +
      "var bg=h.querySelector('.m2k-burger');" +
      "function kapa(ex){var o=h.querySelectorAll('.m2k-open');for(var i=0;i<o.length;i++){if(o[i]===ex)continue;o[i].classList.remove('m2k-open');var b=o[i].querySelector('.m2k-sub-btn,.m2k-lang-btn');if(b)b.setAttribute('aria-expanded','false')}}" +
      "function menu(ac){h.classList.toggle('m2k-menu-open',ac);r.classList.toggle('m2k-lock',ac&&mq.matches);bg.setAttribute('aria-expanded',ac?'true':'false');bg.setAttribute('aria-label',bg.getAttribute(ac?'data-close':'data-open'));" +
      "if(ac){var c=h.querySelector('.m2k-branch-active');if(c){c.classList.add('m2k-open');c.querySelector('.m2k-sub-btn').setAttribute('aria-expanded','true')}}}" +
      "bg.addEventListener('click',function(){menu(!h.classList.contains('m2k-menu-open'))});" +
      "h.addEventListener('click',function(e){var t=e.target.closest?e.target.closest('.m2k-sub-btn,.m2k-lang-btn,[data-m2k-theme],a[href]'):null;if(!t)return;" +
      "if(t.hasAttribute('data-m2k-theme')){var y=sync()?'light':'dark';r.setAttribute('data-mx-scheme',y);try{localStorage.setItem(k,y)}catch(e2){}sync();return}" +
      "if(t.tagName==='A'){if(h.classList.contains('m2k-menu-open'))menu(false);return}" +
      "var x=t.parentNode,ac=!x.classList.contains('m2k-open');if(!mq.matches)kapa(x);x.classList.toggle('m2k-open',ac);t.setAttribute('aria-expanded',ac?'true':'false')});" +
      "document.addEventListener('click',function(e){if(!h.contains(e.target))kapa(null)});" +
      "document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;var m=h.classList.contains('m2k-menu-open');kapa(null);if(m){menu(false);bg.focus()}});" +
      "if(mq.addEventListener)mq.addEventListener('change',function(){menu(false);kapa(null)});" +
      "var tk=false;function sc(){if(tk)return;tk=true;requestAnimationFrame(function(){tk=false;h.classList.toggle('m2k-sm',(window.pageYOffset||r.scrollTop)>12)})}" +
      "window.addEventListener('scroll',sc,{passive:true});sc()})(hs[n]);sync()})();";

    html = '<div class="m2k">' +
      '<div class="m2k-bar">' +
      '<a class="m2k-logo" href="' + wxLangInternalHref("") + '">' + m2kLogo + "</a>" +
      '<div class="m2k-panel" id="m2k-panel">' +
      '<nav class="m2k-nav" aria-label="' + m2kEsc(m2kTx(M2KT.main)) + '"><ul class="m2k-list">' + m2kItems + "</ul></nav>" +
      '<div class="m2k-panel-foot">' + m2kCta + m2kChips + m2kTemaSatir + "</div>" +
      "</div>" +
      '<div class="m2k-tools">' + m2kLangDrop + m2kTemaBtn + (m2kCta ? m2kCta.replace('class="m2k-cta"', 'class="m2k-cta m2k-cta-bar"') : "") + "</div>" +
      m2kBurger +
      "</div></div>" +
      "<style>" + m2kStil + m2LogoCss + "</style>" +
      "<script>" + m2kBetik + "</script>";
  }
} catch (error) {
  console.log("menu-2 back.js", error);
}
