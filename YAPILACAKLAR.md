# YAPILACAKLAR — mockup sayfaları

GDD değildir. Durum: bekliyor / yapıldı / Hami notu var / düzeltildi. Hami telefonda baktıktan sonra "Hami notu" sütununa eksikleri yazar ve durum "Hami notu var" olur; sıradaki yeni sayfadan önce Codex'e düzeltme olarak verilir.
Adres: https://hr-proje.github.io/warsigil-mockup/<slug>/

| # | slug | Ekran | Raid ref | Durum | Hami notu |
|---|---|---|---|---|---|
| 1 | takip-merkezi | Takip Merkezi | Raid 46–49 (Drive Referans_Gelen) | yapıldı | |
| 2 | kisla | Kışla | Raid 25–27 | yapıldı | |
| 3 | komutan-dizini | Komutan Dizini | Raid 28 | yapıldı | |
| 4 | sancak-salonu | Sancak Salonu | Raid 29–30 | yapıldı | |
| 5 | cagri-otagi | Çağrı Otağı | Raid 31–32 | yapıldı | |
| 6 | kadro-hazirlik | Kadro hazırlık | Raid 5 | yapıldı | |
| 7 | etkinlikler | Etkinlikler ve Fetih Yarışı | Raid 35–37 | yapıldı | |
| 8 | gorevler | Görevler | Raid 38–39 | yapıldı | |
| 9 | posta | Posta | Raid 40 | yapıldı | |
| 10 | profil | Profil | Raid 41 | yapıldı | |
| 11 | ayarlar | Ayarlar | Raid 42 | yapıldı | |
| 12 | kostum | Kostüm | Raid 43 | yapıldı | |
| 13 | hikaye | Hikâye | Raid 3–4 | yapıldı |  |
| 14 | medeniyet-kulesi | Medeniyet Kulesi | Raid 6–8 (gevşek) | yapıldı |  |
| 15 | kusatma | Kuşatma | Raid 9–11 | yapıldı |  |
| 16 | arena | Arena | Raid 44–45 | yapıldı |  |
| 17 | meydan-okuma | Meydan Okuma | MK Challenge | yapıldı |  |
| 18 | gorev-modu | Görev Modu / Sefer Haritası | MK Quest | yapıldı |  |
| 19 | savas-sonucu | Savaş sonucu | Raid 46 Sonuç | yapıldı |  |
| 20 | savas-hud | Savaş HUD'u | Warsigil'e özgü | yapıldı |  |
| 21 | dukkan | Dükkân | Raid 34 | yapıldı |  |
| 22 | paket-acma | Paket açma ve kopya birleşme | Warsigil'e özgü | yapıldı |  |
| 23 | pazar-raflari | Pazar rafları | Raid Bilet Tüccarı, Klan Dükkânı | yapıldı |  |
| 24 | sezon-bileti | Sezon Bileti | Warsigil'e özgü | yapıldı |  |
| 25 | vazifeler-basarimlar | İlerleme Vazifeleri, Başarımlar | Raid 38 (gevşek) | yapıldı |  |
| 26 | gunluk-giris-oduller | Günlük Giriş, Seviye Ödülleri, Oynayış Ödülleri | Warsigil'e özgü | yapıldı |  |
| 27 | sinirli-teklif | Sınırlı Teklif | Raid 34 Teklif | yapıldı |  |
| 28 | davet-promosyon | Davet Programı, Promosyon Kodu | Warsigil'e özgü | yapıldı |  |
| 29 | bilgi-rehber | Eşya Bilgi Kartı, Rehber | Warsigil'e özgü | yapıldı |  |

Atlananlar: İttifak (Yakında), komutan detayının iki kilitli sekmesi.
Önceki turda düzeltilenler (X, Yükselt menüsü, Pazar köşeleri, Heykel, mod haritası, Arena kartı) Hami'nin telefon kontrolünü bekliyor.

## Denetim bulguları

Sayfa | Sorun | Durum
--- | --- | ---
ana-ekran | HUD etiket/rozet çerçeveleri kesikti; raporda kaynağı belirtilmeyen 404 hatası da var, görüntüde eksik görsel seçilemiyor | Çerçeve düzeltildi; 404 açık
mod-haritasi | Doğrulanmış görsel veya işlev sorunu yok | Düzeltildi (bulgu yok)
takip-merkezi | Doğrulanmış görsel veya işlev sorunu yok | Düzeltildi (bulgu yok)
techizat-depo | HUD etiket/rozet çerçeveleri kesikti; rapordaki düğmelerin handler’ları `goProfil`, `op` ve state güncellemelerine bağlı | Düzeltildi (CSS düzeltildi; ölü alarmı yanlış)
pazar | Boş envanter yuvası raporu; yuva kartlarında “Görsel gerekli” ve dosya/ölçü bilgisi var | Düzeltildi (yanlış alarm; sorun yok)
heykel | Heykel seçme düğmeleri raporda ölü göründü; `statuePick` eşlemesi durumu değiştiriyor | Düzeltildi (işlev doğrulandı)
sol-cekmece | Çekmece ve HUD çerçeveleri kesikti; işaretli düğmelerin `onClick` handler’ları menü/panel veya gezinme başlatıyor | Düzeltildi (CSS düzeltildi; ölü alarmı yanlış)
yapi-yakinlasma | HUD etiketleri ve sayaç rozetlerinde PNG kesik çerçeveler | Düzeltildi (`Main.dc.html`)
zumrut-ocagi | HUD etiketleri ve sayaç rozetlerinde PNG kesik çerçeveler; panel PNG çerçevesi | Düzeltildi (`Main.dc.html`)
bas-ekrani | Rapor dış/çakışma sinyalleri tuval taşması; ekran görüntüsünde gerçek metin/öğe taşması, kesilme, bozuk düğme veya işaretsiz boş yuva doğrulanmadı | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
haklar-listesi | Rapor iç içe kart/HUD çakışması; ekranda gerçek taşma veya kesilme doğrulanmadı | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
kilitli-yapi | Görselde kilitli yapı penceresi ve liste akışı sığıyor; rapor dış ölçümleri arka plan tuvalinden | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
komutan-detayi | Ekran görüntülerinde komutan kartları, açılır pencereler ve liste akışı sığıyor; gerçek çakışma yok | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
avatar-rozetleri | Rapor iç içe HUD/rozet çakışmaları; görünen sayfa ve pencerelerde doğrulanmış kesilme yok | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
kisla | Kışla ekranında metin ve kontroller sığıyor; kaydırma sinyalleri beklenen yatay içerik | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
komutan-dizini | Dizin kartları ve seçili durum penceresi sığıyor; raporda gerçek dışarı taşma yok | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
sancak-salonu | Sancak kartları/paneli sığıyor; kaydırma sinyali içerik şeridinden | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
cagri-otagi | Cagri ekrani ve pencereleri gorunur alana sigiyor; rapor dis olcumleri tuval katmanlarindan | Duzeltildi (yanlis alarm; dogrulanmis sorun yok)
kadro-hazirlik | Rapor kaydırma/iç içe çakışma; görsel yuvaları işaretli, içerik sığıyor | Düzeltildi (yanlış alarm)
etkinlikler | İç içe kart ölçümleri; metin ve düğmeler sığıyor, işlevler bağlı | Düzeltildi (yanlış alarm)
gorevler | Özet/kart iç içe çakışma ölçümleri; sekme ve görev düğmeleri çalışıyor | Düzeltildi (yanlış alarm)
posta | Satır içi öğelerin çakışma ölçümü; işlem düğmeleri bağlı, metin sığıyor | Düzeltildi (yanlış alarm)
profil | Raporun ölü dediği görsel yuvaları bilgi/yer tutucu; Düzenle düğmeleri açılır pencereyi çalıştırıyor | Düzeltildi (yanlış alarm)
ayarlar | Doğrulanmış taşma, kesilme veya işlev sorunu yok | Düzeltildi (bulgu yok)
kostum | Doğrulanmış taşma, kesilme veya işlev sorunu yok; görsel yuvası işaretli | Düzeltildi (bulgu yok)
hikaye | Uzun Boss görsel dosya adları dar yuvalardan bölüm kartlarına taşıyordu | Düzeltildi (yuva içi satır kırma eklendi)
medeniyet-kulesi | Türkçe metinler mojibake nedeniyle bozuktu | Düzeltildi (metin kodlaması UTF-8 olarak onarıldı)
arena | Aray?z metinleri mojibake nedeniyle bozuktu | D?zeltildi (UTF-8 metinleri onar?ld?)
savas-hud | Aray?z metinleri mojibake nedeniyle bozuktu | D?zeltildi (UTF-8 metinleri onar?ld?)
savas-sonucu | ?d?l dosya adlar? k???k yuvalarda ta??p sat?rlar? ?ak??t?r?yordu | D?zeltildi (yuvalar sat?r k?racak ?ekilde b?y?t?ld?)
assets/tuval/Main.dc.html | Sekme ?er?evesi PNG border-image ile kesik k??eli g?r?n?yordu | D?zeltildi (yuvarlak CSS kenarl?k)
arena | Arayüz metinleri mojibake nedeniyle bozuktu | Düzeltildi (UTF-8 metinleri onarıldı)
dukkan | Boş yuva ve erişilemeyen düğmeler raporu; görsel yuvaları işaretli, sekmeler ve ayrıntı işlemleri kodda bağlı | Düzeltildi (yanlış alarm)
gorev-modu | Harita ile başlık/kart çakışma raporu; harita dekor katmanı ve ekran görüntüsünde içerik okunaklı | Düzeltildi (yanlış alarm)
kusatma | Liste bağlantısı başlık alanında; görselde metin ve düğmeler sığıyor | Düzeltildi (doğrulanmış sorun yok)
meydan-okuma | Beşinci kule yatay kaydırma şeridinde; dışarı taşma kaydırılabilir devam içeriği | Düzeltildi (yanlış alarm)
paket-acma | Birleştirme parıltısı ve VS alanı iç içe; işlevsiz düğme ya da taşma yok | Düzeltildi (yanlış alarm)
pazar-raflari | Boş yuva ve sahne dışı kart raporu; yuvalar işaretli, kartlar yatay kaydırılabilir | Düzeltildi (yanlış alarm)
savas-hud | Arayüz metinleri mojibake nedeniyle bozuktu | Düzeltildi (UTF-8 metinleri onarıldı)
savas-sonucu | Ödül dosya adları küçük yuvalarda taşıp satırları çakıştırıyordu | Düzeltildi (yuvalar satır kıracak şekilde büyütüldü)
assets/tuval/Main.dc.html | Sekme çerçevesi PNG border-image ile kesik köşeli görünüyordu | Düzeltildi (yuvarlak CSS kenarlık)
