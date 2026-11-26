# warsigil-mockup — Codex kuralları

Warsigil (mobil kart-strateji) arayüz taslakları. Her ekran `<ekran-adi>/index.html` tek dosyadır (HTML+CSS+JS, dış kütüphane yok). Yalnız görevde verilen ekran ve dosyalara dokun. Commit ve push yapma.

## Referans ekran kuralı
- Düzen referansın birebir aynısıdır: akış, sekmeler, düğmelerin yeri, ölçüsü ve işlevi, bilgi sırası.
- Görünüş Warsigil'indir (renk ve biçim aşağıda). Referans oyunun görseli, ikonu, ikon şekli, logosu ve metni kullanılmaz; karşılığı olmayan öğenin yeri boş kalır.
- Şekil dili yuvarlaktır: daire düğme ve rozet, panel köşesi 6–8 px, tek ince 1 px antika altın kenar. Kesik köşe, sekizgen, altıgen, oyma, çift çerçeve yok.
- Renkler: zemin #0B1224, panel #121B33, kenar #C9A04E, başlık #F6D88E, metin #F4ECD8, ikincil #A9B4D0, süre #FFB547; kızıl SAVAŞ/kapat, zümrüt DÜKKÂN/satın al. Tam liste: oyun reposunda `Docs/GDD/Arayuz_Tasarimi.md` 2. bölüm.
- Yazı: başlık Cinzel (800–900, büyük harf, `lang="tr"`), arayüz Barlow Semi Condensed. HUD yazısında 1 px siyah kontur. Metinler Türkçe; premium para "Zümrüt". Ekranda açıklama paragrafı yok.

## Biçim ve davranış
- Düğme ailesi: simge düğmeleri (kapat, bilgi, kilit, çekmece kapatma) tam yuvarlak; metinli düğmeler (Aç, Satın Al, Yükselt vb.) oval/hap.
- Altıgen, sekizgen ya da köşeli düğme yok.
- 844×390 yatay çerçeve, ekrana ölçekle sığar (oran korunur). Dokunmatik: pointer olayları, hover'a bağlı işlev yok; dokunma alanı en az 44 px, yazı en az 12 px.
- Sekmeler, pencereler, kaydırmalar örnek veriyle çalışır. Pencere dışına dokunmak kapatır; tam ekran pencerede sağ üstte yuvarlak kapat.
- Görseller `../assets/<dosya>.png`. Görseli olmayan yuva kesik çizgili yer tutucudur: içinde dosya adı ve yuva ölçüsü yazar. Var olan görsel başka yuvaya kırpılıp konmaz.
- Sayı uydurma; kurallar ve sayılar oyun reposunda `Docs/GDD/` altındadır.

## Gezinme (her yeni ekranda zorunlu)
- Ekranın sol üstünde `<a id="liste" href="../">← Liste</a>` bağlantısı olur (bkz. `ana-ekran/index.html`).
- Kök `index.html` listesine bir satır eklenir: `<li><a href="<ekran-adi>/"><span class="ad">…</span><span class="ref">Referans: … · TARİH</span><span class="durum">Onay bekliyor</span></a></li>`.

## Referans kaynakları
- Tarifler: `G:\Github\HR-Project\CommanderUnity\KomutanOyunu\Docs\Referans\Raid\00_Ekran_Tarifleri.md` (önce `^#{1,3} ` başlıklarını ara, yalnız ilgili bölümü oku).
- Küçük görüntüler (bunları kullan): `G:\Github\HR-Project\CommanderUnity\KomutanOyunu\Docs\Referans\Raid\kucuk\*.jpg`; tam boy `Raid\*.png` yalnız gerekirse.

## Bitiş
En fazla 10 satır özet: değişen dosyalar, kontrol sonucu, "Görsel gerekli" listesi, belirsiz kalıp karar verilen yerler.
