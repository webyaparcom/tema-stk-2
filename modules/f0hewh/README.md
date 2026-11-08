# tema-stk-2 · f0hewh — Hero 1

## Nedir

tema-stk-2 sitesinin matrix modülü. `Hero 1` şablonu (section kökü,
sınıf `modulex-hero`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (2 KB) |
| `index.html` | Modül şablonu (render hedefi) (14 KB) |
| `index.jpeg` | Önizleme görseli (42 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `` |
| `max` | `1200px` |
| `gradient` | `linear-gradient(135deg, #1e3046 0%, #2a4560 50%, #152a3d 100%)` |
| `overlay` | `linear-gradient(135deg, rgba(30, 48, 70, 0.88) 0%, rgba(21, 42, 61, 0.82) 100%)` |
| `title_accent` | `linear-gradient(135deg, #DE6D26, #e88a4a)` |
| `btn_primary_bg` | `#DE6D26` |
| `btn_primary_color` | `#ffffff` |
| `stat_accent` | `#DE6D26` |

- `name`: `Hero 1`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **max**, **gradient**, **overlay**, **title_accent**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-hero`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/f0hewh/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Hero 1",
  "desing": {
    "stil": "",
    "max": "1200px",
    "gradient": "linear-gradient(135deg, #1e3046 0%, #2a4560 50%, #152a3d 100%)",
    "overlay": "linear-gradient(135deg, rgba(30, 48, 70, 0.88) 0%, rgba(21, 42, 61, 0.82) 100%)",
    "title_accent": "linear-gradient(135deg, #DE6D26, #e88a4a)",
    "btn_primary_bg": "#DE6D26",
    "btn_primary_color": "#ffffff",
    "stat_accent": "#DE6D26",
    "shape1": "linear-gradient(135deg, rgba(222, 109, 38, 0.4), rgba(222, 109, 38, 0.12))",
    "shape2": "linear-gradient(135deg, rgba(42, 69, 96, 0.55), rgba(30, 48, 70, 0.25))",
    "shape3": "linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04))",
    "ti
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
