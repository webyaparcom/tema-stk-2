# tema-stk-2 · 0aqnow — Yorum Karuseli 3

## Nedir

tema-stk-2 sitesinin matrix modülü. `Yorum Karuseli 3` şablonu (section kökü,
sınıf `modulex-t3`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (4 KB) |
| `index.html` | Modül şablonu (render hedefi) (15 KB) |
| `index.jpeg` | Önizleme görseli (57 KB) |
| `index.json` | Veri + tema token'ları (7 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `stil` | `kart-karusel` |
| `autoplay` | `True` |
| `interval` | `5000` |
| `bgcolor` | `var(--mx-site-surface, #f6f6f4)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-surface, #f6f6f4))` |
| `cardbg` | `var(--mx-site-bg, #ffffff)` |

- `name`: `Yorum Karuseli 3`
- `data`: 6 kayıt. Örnek: `{"name": "Elif Kaya", "role": {"tr": "Pazarlama Müdürü", "en": "Marketing Manager", "ar": "مديرة التسويق"}, "company": "Aurora Holding", "t…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **stil**, **autoplay**, **interval**, **bgcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-t3`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/0aqnow/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Yorum Karuseli 3",
    "en": "Testimonial Carousel 3",
    "ar": "شريط آراء العملاء 3"
  },
  "desing": {
    "max": "1200px",
    "stil": "kart-karusel",
    "autoplay": true,
    "interval": 5000,
    "bgcolor": "var(--mx-site-surface, #f6f6f4)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-surface, #f6f6f4))",
    "cardbg": "var(--mx-site-bg, #ffffff)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "starcolor": "color-mix
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
