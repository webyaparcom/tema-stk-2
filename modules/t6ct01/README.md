# tema-stk-2 · t6ct01 — İletişim

## Nedir

tema-stk-2 sitesinin matrix modülü. `İletişim` şablonu (div kökü,
sınıf `modulex`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (1 KB) |
| `index.html` | Modül şablonu (render hedefi) (8 KB) |
| `index.jpeg` | Önizleme görseli (25 KB) |
| `index.json` | Veri + tema token'ları (1 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `` |
| `color` | `#000` |
| `name` | `{'tr': 'Bize Ulaşın', 'en': 'Contact Us', 'ar': 'اتصل بنا'}` |
| `margin` | `30px 0px 30px 0px` |
| `linkcolor` | `#1B3A6B` |

- `name`: `İletişim`
- `data`: 3 kayıt. Örnek: `{"icon": "phone", "text": "+90", "url": ""}`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **color**, **name**, **margin**, **linkcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/t6ct01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "İletişim",
  "desing": {
    "stil": "",
    "color": "#000",
    "name": {
      "tr": "Bize Ulaşın",
      "en": "Contact Us",
      "ar": "اتصل بنا"
    },
    "margin": "30px 0px 30px 0px",
    "linkcolor": "#1B3A6B"
  },
  "data": [
    {
      "icon": "phone",
      "text": "+90",
      "url": ""
    },
    {
      "icon": "email",
      "text": ""
    },
    {
      "icon": "map",
      "text": ""
    }
  ]
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
