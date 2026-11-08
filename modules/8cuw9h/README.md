# tema-stk-2 · 8cuw9h — Süreç Adımları

## Nedir

tema-stk-2 sitesinin matrix modülü. `Süreç Adımları` şablonu (section kökü,
sınıf `modulex-sa{{saclass}}`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (2 KB) |
| `index.html` | Modül şablonu (render hedefi) (9 KB) |
| `index.jpeg` | Önizleme görseli (42 KB) |
| `index.json` | Veri + tema token'ları (3 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `yatay` |
| `max` | `1200px` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `surface2` | `var(--mx-site-surface-2, #ececea)` |
| `accent` | `var(--mx-site-primary, #2563eb)` |

- `name`: `Süreç Adımları`
- `data`: 4 kayıt. Örnek: `{"ikon": "forum", "baslik": {"tr": "Tanışma", "en": "Discovery", "ar": "التعارف"}, "metin": {"tr": "Kısa bir görüşmeyle hedefinizi, bütçeni…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **max**, **bgcolor**, **textcolor**, **mutedcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-sa{{saclass}}`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/8cuw9h/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Süreç Adımları",
  "desing": {
    "stil": "yatay",
    "max": "1200px",
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "surface2": "var(--mx-site-surface-2, #ececea)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 16%, transparent)",
    "radius": "16px",
    "eyebrow": {
      "tr": "Nasıl çalışıyoruz?",
      "en": "How we work",
      "ar": "كيف
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
