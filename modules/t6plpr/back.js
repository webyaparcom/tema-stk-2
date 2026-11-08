function pcLang(val) {
  if (val == null) { return ""; }
  if (typeof val === "object") {
    if (val[json.lang] != null) { return val[json.lang]; }
    if (val.tr != null) { return val.tr; }
    var pcKeys = Object.keys(val);
    return pcKeys.length ? (val[pcKeys[0]] || "") : "";
  }
  return String(val);
}

var backhtml = "";
var index = 0; // Tracking index for alignment
var delay = 0.3; // Initial delay for staggered animation
for (var iterator of webmakerdata[json.desing.page].data) {
  try {
    var data = fsSync.readFileSync(
      path.join(
        "public/data/proje",
        projePath,
        "web",
        "page",
        iterator.id,
        "index.json",
      ),
      "utf8",
    );
    iterator = JSON.parse(data);

    if (iterator["status"] == "play" && iterator["category"] == "") {
      var alignmentClass = index % 2 === 0 ? "left" : "right";
      iteratorurl = "";
      if (iterator["url"] !== "" && iterator["url"] !== undefined) {
        iteratorurl = iterator["url"];
      } else {
        iteratorurl = wxLangInternalHref(iterator["path"]);
      }

      backhtml += `
      <div style="animation-delay: ${delay}s;" class="modulexbodyitems ${alignmentClass}">
        <div class="modulexbodyitem ${alignmentClass}s">
          <a href="${iteratorurl}" class="modulexbodyitemlink">
            <div class="modulexbodyitemimg">
              ${iterator["img"] ? `<img src="/page/${iterator["id"]}/${iterator["img"]}" alt="${pcLang(iterator["name"])}" loading="lazy">` : ""}
            </div>
            <h2 class="modulexbodyitemtitle">
              ${pcLang(iterator["name"])}
            </h2>
          </a>
          <div class="modulexbodyitechile">
            ${pcLang(iterator["description"])}
          </div>
          <div class="modulexbodyitechilesubpagecontainer">
            ${
              iterator.category === ""
                ? webmakerdata[json.desing.page].data
                    .filter(function(item) { return item.category === iterator.id; })
                    .map(function(item) {
                      var subPageUrl =
                        item["url"] !== "" && item["url"] !== undefined
                          ? item["url"]
                          : wxLangInternalHref(item["path"]);
                      return `<a href="${subPageUrl}" class="modulexbodyitechilesubpage">${item.name[json.lang]}</a>`;
                    })
                    .join("")
                : ""
            }
          </div>
        </div>
        <div class="modulexbodybg"></div>
      </div>`;
      delay += 0.3;
      index++;
    }
  } catch (error) {
    console.error(error);
  }
}
html = html.replace(new RegExp("{{html}}", "g"), backhtml);
