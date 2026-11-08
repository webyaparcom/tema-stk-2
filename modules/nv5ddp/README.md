# tema-stk-2 · nv5ddp — Bant CTA (zengin) — CTA 3

## Nedir

tema-stk-2 sitesinin matrix modülü. `Bant CTA (zengin) — CTA 3` şablonu (section kökü,
sınıf `modulex-c3{{c3class}}`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (10 KB) |
| `index.jpeg` | Önizleme görseli (40 KB) |
| `index.json` | Veri + tema token'ları (3 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `gradient` |
| `sag` | `whatsapp` |
| `max` | `1200px` |
| `bgcolor` | `var(--mx-site-primary, #2563eb)` |
| `textcolor` | `var(--mx-site-primary-contrast, #ffffff)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-primary-contrast, #ffffff) 90%, var(--mx-site-primary, #2563eb))` |
| `pagebg` | `var(--mx-site-bg, #ffffff)` |
| `cardbg` | `var(--mx-site-surface, #ffffff)` |

- `name`: `Bant CTA (zengin) — CTA 3`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **sag**, **max**, **bgcolor**, **textcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-c3{{c3class}}`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/nv5ddp/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Bant CTA (zengin) — CTA 3",
  "desing": {
    "stil": "gradient",
    "sag": "whatsapp",
    "max": "1200px",
    "bgcolor": "var(--mx-site-primary, #2563eb)",
    "textcolor": "var(--mx-site-primary-contrast, #ffffff)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-primary-contrast, #ffffff) 90%, var(--mx-site-primary, #2563eb))",
    "pagebg": "var(--mx-site-bg, #ffffff)",
    "cardbg": "var(--mx-site-surface, #ffffff)",
    "cardtext": "var(--mx-site-text, #1b1b1b)",
    "cardmuted": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-surface, #ffffff))",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "radius"
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
