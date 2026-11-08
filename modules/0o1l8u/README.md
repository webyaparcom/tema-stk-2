# tema-stk-2 · 0o1l8u — Menü 10 — Şeffaf overlay

## Nedir

tema-stk-2 sitesinin matrix modülü. `Menü 10 — Şeffaf overlay` şablonu (header kökü,
sınıf `modulex-m10`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (13 KB) |
| `index.jpeg` | Önizleme görseli (45 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `sade` |
| `logo` | `{{logo}}` |
| `logo_acik` | `` |
| `logo_h` | `48px` |
| `max` | `1200px` |
| `showlang` | `True` |
| `menubg` | `var(--mx-site-bg, #ffffff)` |
| `menutext` | `var(--mx-site-text, #1b1b1b)` |

- `name`: `Menü 10 — Şeffaf overlay`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **logo**, **logo_acik**, **logo_h**, **max**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-m10`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/0o1l8u/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Menü 10 — Şeffaf overlay",
    "en": "Menu 10 — Transparent overlay",
    "ar": "القائمة 10 — شفافة فوق الهيرو"
  },
  "desing": {
    "stil": "sade",
    "logo": "{{logo}}",
    "logo_acik": "",
    "logo_h": "48px",
    "max": "1200px",
    "showlang": true,
    "menubg": "var(--mx-site-bg, #ffffff)",
    "menutext": "var(--mx-site-text, #1b1b1b)",
    "menutextOverlay": "#ffffff",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "border": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "cta": {
      "tr": "Teklif al",
      "en": "Get a quote",
      "ar": "اطلب عرضًا"
    
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
