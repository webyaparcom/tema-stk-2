# tema-stk-2 · t6mp01 — Maps

## Nedir

tema-stk-2 sitesinin matrix modülü. `Maps` şablonu (a kökü,
sınıf `modulex2`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (14 KB) |
| `index.jpeg` | Önizleme görseli (36 KB) |
| `index.json` | Veri + tema token'ları (1 KB) |
| `map.png` | Harita önizlemesi / referans görseli (40 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `` |
| `height` | `200` |
| `opacity` | `0.5` |
| `backgroundcolor` | `#ffffff` |
| `color` | `#1e3046` |
| `img` | `map.png` |
| `externalUrl` | `` |
| `address` | `` |

- `name`: `Maps`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **height**, **opacity**, **backgroundcolor**, **color**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex2`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/t6mp01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Maps",
  "desing": {
    "stil": "",
    "height": "200",
    "opacity": "0.5",
    "backgroundcolor": "#ffffff",
    "color": "#1e3046",
    "img": "map.png",
    "externalUrl": "",
    "address": "",
    "phone": "",
    "email": "",
    "badgeText": {
      "tr": "Konumumuz",
      "en": "Our Location",
      "ar": "موقعنا"
    },
    "infoTitle": {
      "tr": "Bize Ulaşın",
      "en": "Contact Us",
      "ar": "اتصل بنا"
    },
    "directions": {
      "tr": "Yol tarifi al",
      "en": "Get directions",
      "ar": "احصل على الاتجاهات"
    }
  },
  "data": null
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
