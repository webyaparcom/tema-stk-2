# tema-stk-2 · t6mn01 — Menu 2

## Nedir

tema-stk-2 sitesinin matrix modülü. `Menu 2` şablonu (div kökü,
sınıf `modulex`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (6 KB) |
| `index.html` | Modül şablonu (render hedefi) (26 KB) |
| `index.jpeg` | Önizleme görseli (14 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `bgcolor` | `#1e3046` |
| `color` | `#ffffff` |
| `activebgcolor` | `#ffffff` |
| `activecolor` | `#000000` |
| `height` | `100px` |
| `ariaToggle` | `{'tr': 'Menüyü aç/kapat', 'en': 'Toggle menu', 'ar': 'تبديل القائمة'}` |
| `ariaClose` | `{'tr': 'Menüyü kapat', 'en': 'Close menu'}` |
| `logobg` | `transparent` |

- `name`: `Menu 2`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **bgcolor**, **color**, **activebgcolor**, **activecolor**, **height**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/t6mn01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Menu 2",
  "desing": {
    "bgcolor": "#1e3046",
    "color": "#ffffff",
    "activebgcolor": "#ffffff",
    "activecolor": "#000000",
    "height": "100px",
    "ariaToggle": {
      "tr": "Menüyü aç/kapat",
      "en": "Toggle menu",
      "ar": "تبديل القائمة"
    },
    "ariaClose": {
      "tr": "Menüyü kapat",
      "en": "Close menu"
    },
    "logobg": "transparent",
    "logoborder": "none",
    "logoradius": "0",
    "logopad": "0",
    "logopadmobil": "0",
    "logomaxh": "100px",
    "logoimg": "",
    "langcolor": "currentColor",
    "langbg": "transparent"
  },
  "data": null
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
