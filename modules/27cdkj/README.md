# tema-stk-2 · 27cdkj — Page Desing 5

## Nedir

tema-stk-2 sitesinin matrix modülü. `Page Desing 5` şablonu (div kökü,
sınıf `modulex-title`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (18 KB) |
| `index.html` | Modül şablonu (render hedefi) (33 KB) |
| `index.jpeg` | Önizleme görseli (14 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `` |
| `height` | `200` |
| `opacity` | `0.5` |
| `font-size` | `32` |
| `backgroundcolor` | `#000` |
| `menu-active` | `#000` |
| `activetext` | `#fff` |
| `textcolor` | `#fff` |

- `name`: `Page Desing 5`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **height**, **opacity**, **font-size**, **backgroundcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-title`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/27cdkj/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Page Desing 5",
  "desing": {
    "stil": "",
    "height": "200",
    "opacity": "0.5",
    "font-size": "32",
    "backgroundcolor": "#000",
    "menu-active": "#000",
    "activetext": "#fff",
    "textcolor": "#fff",
    "bgcolor": "#ffffff",
    "border_radius": "8px",
    "card_shadow": "0 10px 28px rgba(0, 0, 0, 0.08)",
    "color": "#111111",
    "colortitle": "#111111",
    "coloractive": "#000000",
    "ui": {
      "tr": {
        "home": "Anasayfa",
        "products": "Ürünler",
        "dimensions": "Ölçüler",
        "dimNote": "Standart üretim referansıdır; proje bazında özelleştirilebilir.",
        "quote": "Teklif Al",
        "whatsapp": "WhatsApp",
        "
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
