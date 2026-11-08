# tema-stk-2 · t6in01 — Tanıtım Modülü

## Nedir

tema-stk-2 sitesinin matrix modülü. `Tanıtım Modülü` şablonu (div kökü,
sınıf `modulex-out`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (1 KB) |
| `index.html` | Modül şablonu (render hedefi) (10 KB) |
| `index.jpeg` | Önizleme görseli (38 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `` |
| `name` | `{'tr': 'Bizi Tanıyın', 'en': 'About Us', 'ar': 'تعرف علينا'}` |
| `description` | `{'tr': 'Yılların deneyimi ve uzman kadromuzla kurumsal çözümler sunuyoruz. Kalite, güven ve sürdürülebilir büyüme odaklı çalışıyoruz.', 'en': 'With years of experience and an expert team we deliver corporate solutions focused on quality, trust and sustainable growth.', 'ar': 'نقدم حلولاً مؤسسية بخبرة سنوات وفريق متخصص. نعمل بتركيز على الجودة والثقة والنمو المستدام.'}` |
| `name2` | `{'tr': 'Vizyonumuz', 'en': 'Our Vision', 'ar': 'رؤيتنا'}` |
| `spot2` | `{'tr': 'Sektörümüzde yenilikçi yaklaşımlarla öncü olmak.', 'en': 'To lead our industry with innovative approaches.', 'ar': 'أن نكون روّاداً في قطاعنا بمقاربات مبتكرة.'}` |
| `icon2` | `visibility` |
| `name3` | `{'tr': 'Misyonumuz', 'en': 'Our Mission', 'ar': 'مهمتنا'}` |
| `spot3` | `{'tr': 'İhtiyaç duyulan çözümleri hızlı ve şeffaf sunmak.', 'en': 'Deliver needed solutions quickly and transparently.', 'ar': 'تقديم الحلول المطلوبة بسرعة وشفافية.'}` |

- `name`: `Tanıtım Modülü`
- Diğer anahtarlar: `local`, `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **name**, **description**, **name2**, **spot2**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-out`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-stk-2 sitesinde `web/matrix/modules/t6in01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Tanıtım Modülü",
  "desing": {
    "stil": "",
    "name": {
      "tr": "Bizi Tanıyın",
      "en": "About Us",
      "ar": "تعرف علينا"
    },
    "description": {
      "tr": "Yılların deneyimi ve uzman kadromuzla kurumsal çözümler sunuyoruz. Kalite, güven ve sürdürülebilir büyüme odaklı çalışıyoruz.",
      "en": "With years of experience and an expert team we deliver corporate solutions focused on quality, trust and sustainable growth.",
      "ar": "نقدم حلولاً مؤسسية بخبرة سنوات وفريق متخصص. نعمل بتركيز على الجودة والثقة والنمو المستدام."
    },
    "name2": {
      "tr": "Vizyonumuz",
      "en": "Our Vision",
      "ar": "رؤيتنا"
    },
    "spot2": {
      "tr": "Sektö
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
