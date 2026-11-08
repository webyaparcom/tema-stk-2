# tema-stk-2 · nj1zzx — Footer 10 — Mega footer (CTA bantlı)

## Nedir

tema-stk-2 sitesinin matrix modülü. `Footer 10 — Mega footer (CTA bantlı)` şablonu (footer kökü,
sınıf `modulex-f10`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (9 KB) |
| `index.html` | Modül şablonu (render hedefi) (14 KB) |
| `index.jpeg` | Önizleme görseli (63 KB) |
| `index.json` | Veri + tema token'ları (6 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `koyu` |
| `showlang` | `True` |
| `maxpages` | `8` |
| `koyubg` | `color-mix(in srgb, #0f172a 86%, var(--mx-site-primary, #2563eb))` |
| `koyutext` | `#f1f5f9` |
| `acikbg` | `var(--mx-site-surface, #f6f6f4)` |
| `aciktext` | `var(--mx-site-text, #1b1b1b)` |
| `accent` | `var(--mx-site-primary, #2563eb)` |

- `name`: `Footer 10 — Mega footer (CTA bantlı)`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **showlang**, **maxpages**, **koyubg**, **koyutext**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-f10`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/nj1zzx/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Footer 10 — Mega footer (CTA bantlı)",
    "en": "Footer 10 — Mega footer (CTA band)",
    "ar": "تذييل 10 — تذييل ضخم (شريط دعوة)"
  },
  "desing": {
    "stil": "koyu",
    "showlang": true,
    "maxpages": 8,
    "koyubg": "color-mix(in srgb, #0f172a 86%, var(--mx-site-primary, #2563eb))",
    "koyutext": "#f1f5f9",
    "acikbg": "var(--mx-site-surface, #f6f6f4)",
    "aciktext": "var(--mx-site-text, #1b1b1b)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "errcolor": "var(--mx-color-danger, #b42318)",
    "radius": "16px",
    "logo_maxh": "52px",
    "logo_plate": false,
    "about": {
      "t
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
