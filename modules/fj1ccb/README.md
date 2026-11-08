# tema-stk-2 · fj1ccb — Sayaç Şeridi (Stats 2)

## Nedir

tema-stk-2 sitesinin matrix modülü. `Sayaç Şeridi (Stats 2)` şablonu (section kökü,
sınıf `modulex-s2{{s2class}}`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (8 KB) |
| `index.jpeg` | Önizleme görseli (43 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `serit` |
| `desen` | `noktalar` |
| `max` | `1200px` |
| `bgcolor` | `var(--mx-site-primary, #2563eb)` |
| `textcolor` | `var(--mx-site-primary-contrast, #ffffff)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-primary-contrast, #ffffff) 90%, var(--mx-site-primary, #2563eb))` |
| `bordercolor` | `color-mix(in srgb, var(--mx-site-primary-contrast, #ffffff) 26%, transparent)` |
| `radius` | `16px` |

- `name`: `Sayaç Şeridi (Stats 2)`
- `data`: 4 kayıt. Örnek: `{"deger": 1250, "onek": "", "sonek": "+", "ikon": "task_alt", "etiket": {"tr": "Tamamlanan proje", "en": "Completed projects", "ar": "مشروع…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **desen**, **max**, **bgcolor**, **textcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-s2{{s2class}}`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/fj1ccb/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Sayaç Şeridi (Stats 2)",
  "desing": {
    "stil": "serit",
    "desen": "noktalar",
    "max": "1200px",
    "bgcolor": "var(--mx-site-primary, #2563eb)",
    "textcolor": "var(--mx-site-primary-contrast, #ffffff)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-primary-contrast, #ffffff) 90%, var(--mx-site-primary, #2563eb))",
    "bordercolor": "color-mix(in srgb, var(--mx-site-primary-contrast, #ffffff) 26%, transparent)",
    "radius": "16px",
    "sure": 1000,
    "title": {
      "tr": "Rakamlarla biz",
      "en": "By the numbers",
      "ar": "نحن بالأرقام"
    },
    "description": {
      "tr": "",
      "en": "",
      "ar": ""
    }
  },
  "data": [
    {
     
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
