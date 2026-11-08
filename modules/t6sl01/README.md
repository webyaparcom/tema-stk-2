# tema-stk-2 · t6sl01 — Slider Text

## Nedir

tema-stk-2 sitesinin matrix modülü. `Slider Text` şablonu (div kökü,
sınıf `modulex-textslider-wrap`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (11 KB) |
| `index.jpeg` | Önizleme görseli (8 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `delay` | `5000` |
| `height` | `520px` |
| `max` | `1200px` |
| `overlay` | `0.45` |
| `align` | `left` |
| `layout` | `` |
| `titlecolor` | `#ffffff` |
| `desccolor` | `rgba(255, 255, 255, 0.88)` |

- `name`: `Slider Text`
- `data`: 3 kayıt. Örnek: `{"bg": "1.webp", "img": "", "layout": "left", "title": {"tr": "Doğal Lezzetler", "en": "Natural Flavors"}, "description": {"tr": "Kaliteli …`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **delay**, **height**, **max**, **overlay**, **align**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-textslider-wrap`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/t6sl01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Slider Text",
  "desing": {
    "delay": 5000,
    "height": "520px",
    "max": "1200px",
    "overlay": "0.45",
    "align": "left",
    "layout": "",
    "titlecolor": "#ffffff",
    "desccolor": "rgba(255, 255, 255, 0.88)",
    "btncolor": "#ffffff",
    "btnbg": "#0a58ca",
    "border_radius": "8px",
    "margin": "0",
    "bgcolor": "#111111",
    "prevLabel": {
      "tr": "Önceki slayt",
      "en": "Previous slide",
      "ar": "الشريحة السابقة"
    },
    "nextLabel": {
      "tr": "Sonraki slayt",
      "en": "Next slide",
      "ar": "الشريحة التالية"
    }
  },
  "data": [
    {
      "bg": "1.webp",
      "img": "",
      "layout": "left",
      "title": {
        
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
