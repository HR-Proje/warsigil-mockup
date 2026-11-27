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

| Sayfa | Sorun | Durum |
|---|---|---|
| ana-ekran / ortak Main.dc.html | Kesik klip şekilleri ve border-image düğme kaplamaları yuvarlak biçime çevrildi. | düzeltildi |
| ana-ekran, mod-haritasi, takip-merkezi, techizat-depo, pazar, heykel, sol-cekmece, yapi-yakinlasma, zumrut-ocagi | Edge başlatma `spawn EPERM` ile engellendi; etkileşim, taşma, konsol ve ekran görüntüsü doğrulaması yapılamadı. | açık |

| bas-ekrani | Liste ba�lant�s� sa�a yak�n, sol �stte de�ildi; dokunma alan� 44�44 px alt�ndayd�. | d�zeltildi |
| haklar-listesi | Liste ba�lant�s� sa�a yak�n, sol �stte de�ildi; dokunma alan� 44�44 px alt�ndayd�. | d�zeltildi |
| kilitli-yapi | Liste ba�lant�s� sa�a yak�n, sol �stte de�ildi; dokunma alan� 44�44 px alt�ndayd�. | d�zeltildi |
| komutan-detayi | Liste ba�lant�s� sa�a yak�n, sol �stte de�ildi; dokunma alan� 44�44 px alt�ndayd�. | d�zeltildi |
| avatar-rozetleri | Liste ba�lant�s� sa�a yak�n, sol �stte de�ildi; dokunma alan� 44�44 px alt�ndayd�. | d�zeltildi |
| kisla | Simge d��mesi ovaldi ve 44�36 px idi; daire, 44�44 px yap�ld�. | d�zeltildi |
| bas-ekrani, haklar-listesi, kilitli-yapi, komutan-detayi, avatar-rozetleri, kisla, komutan-dizini, sancak-salonu, cagri-otagi | Playwright Edge ba�latma `spawn EPERM` ile engellendi; g�rsel, ta�ma, etkile�im ve konsol taramas� tamamlanamad�. | a��k |

| kadro-hazirlik, etkinlikler, gorevler, posta, profil, ayarlar, kostum, hikaye, medeniyet-kulesi | Edge `spawn EPERM` nedeniyle ekran g?r?nt?s? ve etkile?im taramas? yap?lamad?; kaynakta Liste ba?lant?lar? ve T?rk?e dil bildirimi do?ruland?. | a??k |
| etkinlikler | Liste ba?lant?s? 44?44 px de?ildi; sol ?stte 44?44 px yap?ld?. | d?zeltildi |
| gorevler | Liste ba?lant?s?nda dairesel ?er?eve ve zemin vard?; sade sol ?st ba?lant? yap?ld?. | d?zeltildi |
| posta | Liste ba?lant?s? sol ?stte de?ildi ve 44?44 px alt?ndayd?; sol ?ste ta??n?p 44?44 px yap?ld?. | d?zeltildi |
| kostum | Liste ba?lant?s?n?n dokunma y?ksekli?i 30 px idi ve sol ?st hizas?nda de?ildi; sol ?stte 44?44 px yap?ld?. | d?zeltildi |

| kusatma | Liste bağlantısı zeminsiz ve 44×44 px değildi. | düzeltildi |
| arena | Liste bağlantısının dokunma alanı 44×44 px değildi. | düzeltildi |
| meydan-okuma | Liste bağlantısında dokunma alanı ve sade biçim standardı birleştirildi. | düzeltildi |
| gorev-modu | Liste bağlantısında 44×44 px dokunma alanı yoktu. | düzeltildi |
| savas-sonucu | Liste bağlantısının dokunma alanı sadeleştirilip 44×44 px yapıldı. | düzeltildi |
| savas-hud | Liste bağlantısı 38 px yüksekliğindeydi. | düzeltildi |
| dukkan | Liste bağlantısında zemin/kenarlık vardı ve dokunma alanı 44×44 px değildi. | düzeltildi |
| paket-acma | Liste bağlantısının sol üst hizası ve 44×44 px alanı sabitlendi. | düzeltildi |
| pazar-raflari | Liste bağlantısında zemin/kenarlık vardı ve dokunma alanı 44×44 px değildi. | düzeltildi |
| kusatma, arena, meydan-okuma, gorev-modu, savas-sonucu, savas-hud, dukkan, paket-acma, pazar-raflari | Edge `spawn EPERM` nedeniyle Playwright açılmadı; ekran görüntüsü, etkileşim, taşma, konsol ve bağlantı kontrolleri yapılamadı. | açık |
