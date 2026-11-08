# tema-stk-2 · 7getvl — Hızlı İletişim Kartları

## Nedir

tema-stk-2 sitesinin matrix modülü. `Hızlı İletişim Kartları` şablonu (section kökü,
sınıf `modulex-ik`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (8 KB) |
| `index.jpeg` | Önizleme görseli (44 KB) |
| `index.json` | Veri + tema token'ları (4 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `stil` | `kartli` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `bordercolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 16%, transparent)` |
| `accent` | `var(--mx-site-primary, #2563eb)` |

- `name`: `Hızlı İletişim Kartları`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **stil**, **bgcolor**, **textcolor**, **mutedcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-ik`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/7getvl/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Hızlı İletişim Kartları",
    "en": "Quick Contact Cards",
    "ar": "بطاقات الاتصال السريع"
  },
  "desing": {
    "max": "1200px",
    "stil": "kartli",
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 16%, transparent)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "radius": "18px",
    "title": {
      "tr": "Hemen Ulaşın",
      "en"
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
