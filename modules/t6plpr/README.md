# tema-stk-2 · t6plpr — Sayfa Listesi Column

## Nedir

tema-stk-2 sitesinin matrix modülü. `Sayfa Listesi Column` şablonu (div kökü,
sınıf `modulex`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (2 KB) |
| `index.html` | Modül şablonu (render hedefi) (6 KB) |
| `index.jpeg` | Önizleme görseli (8 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `page` | `page` |
| `bgcolor` | `#1e3046` |
| `color` | `#fff` |
| `height` | `200px` |
| `font-size` | `18px` |
| `opacity` | `0.5` |
| `chilebgcolor` | `#000` |
| `chilecolor` | `#fff` |

- `name`: `Sayfa Listesi Column`
- Diğer anahtarlar: `category`, `description`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **page**, **bgcolor**, **color**, **height**, **font-size**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/t6plpr/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Sayfa Listesi Column",
  "desing": {
    "page": "page",
    "bgcolor": "#1e3046",
    "color": "#fff",
    "height": "200px",
    "font-size": "18px",
    "opacity": "0.5",
    "chilebgcolor": "#000",
    "chilecolor": "#fff",
    "chilesize": "16px"
  },
  "data": null
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
