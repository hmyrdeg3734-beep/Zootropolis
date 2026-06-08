import { MapPoint } from '../pages/MapPage';

interface CompactPoint {
  n: string; // name
  c: string; // category
  a: string; // address
  p?: string; // phone
  w?: string; // website
  h?: string; // hours
  lat: number;
  lng: number;
  is24h?: boolean;
}

const RAW_POINTS: CompactPoint[] = [
  // --- ÜSKÜDAR & KADIKÖY ---
  {
    n: "VETART Veteriner Polikinliği",
    c: "Veteriner",
    a: "İcadiye, Cumhuriyet Cd. No:57, 34674 Üsküdar/İstanbul",
    p: "(0216) 553 01 12",
    w: "http://www.vetart.com.tr/",
    h: "09:30–22:30",
    lat: 41.0285,
    lng: 29.0271
  },
  {
    n: "Dr. Pati Üsküdar Veteriner Kliniği",
    c: "Veteriner",
    a: "Barbaros, Nuhkuyusu Cd No:76, 34662 Üsküdar/İstanbul",
    p: "(0533) 498 96 62",
    w: "https://uskudarveteriner.com/",
    h: "10:00–19:00",
    lat: 41.0182,
    lng: 29.0205
  },
  {
    n: "Da Vinci Üsküdar Veteriner Kliniği",
    c: "Veteriner",
    a: "Mimar Sinan, Dr. Fahri Atabey Cd. no31, 34672 Üsküdar/İstanbul",
    p: "0538 876 92 96",
    w: "http://davinciveteriner.com/",
    h: "09:00–19:00",
    lat: 41.0261,
    lng: 29.0152
  },
  {
    n: "Üsküdar Pet Tower Veteriner Kliniği",
    c: "Veteriner",
    a: "Salacak, Halk Dersanesi Sk. No: 3 D:A, 34668 Üsküdar/İstanbul",
    p: "0506 545 71 02",
    w: "http://pettowerveteriner.com/",
    h: "24 saat açık",
    lat: 41.0185,
    lng: 29.0082,
    is24h: true
  },
  {
    n: "Veterinerim Hayvan Kliniği",
    c: "Veteriner",
    a: "Selamiali mahallesi Cumhuriyet Caddesi 54/A Fıstıkağacı, 34664 Üsküdar/İstanbul",
    p: "(0216) 553 12 03",
    w: "http://www.veteriner.im/",
    h: "10:00–19:00",
    lat: 41.0302,
    lng: 29.0225
  },
  {
    n: "Üsküdar Geçici Hayvan Barınağı",
    c: "Barınak",
    a: "Hekimbaşı, Hemka Sokak No:1, 34766 Ümraniye/İstanbul",
    p: "0216 630 2234",
    w: "http://www.uskudar.bel.tr/hayvanbarinagi",
    h: "24 saat açık",
    lat: 41.0455,
    lng: 29.0852,
    is24h: true
  },
  {
    n: "Üsküdar Hayvan Merkezi",
    c: "Petshop",
    a: "Zeynep Kamil, Dr. Fahri Atabey Cd. No:110/B, 34668 Üsküdar/İstanbul",
    p: "0535 673 89 84",
    h: "10:00-20.30",
    lat: 41.0155,
    lng: 29.0202
  },
  {
    n: "Seçkin Hayvan Dükkanı",
    c: "Petshop",
    a: "Selami Ali, Fıstık Ağacı Sokağı no:2, 34664 Üsküdar/İstanbul",
    p: "(0216) 532 01 85",
    h: "09:00–21:30",
    lat: 41.0305,
    lng: 29.0221
  },
  {
    n: "Petburada Üsküdar",
    c: "Petshop",
    a: "İcadiye, Cumhuriyet Cd. No:51/A, 34674 Üsküdar/İstanbul",
    p: "(0216) 771 91 77",
    h: "09:30–20:00",
    lat: 41.0282,
    lng: 29.0275
  },
  {
    n: "Yunus Evcil Hayvan Dükkanı",
    c: "Petshop",
    a: "İcadiye, Cumhuriyet Cd. No:137, 34664 Üsküdar/İstanbul",
    p: "(0216) 391 45 40",
    h: "10:00–20:00",
    lat: 41.0315,
    lng: 29.0292
  },
  {
    n: "Erka Evcil Hayvan Dükkanı",
    c: "Petshop",
    a: "Murat Reis, Nuhkuyusu Cd 251/B, 34664 Üsküdar/İstanbul",
    p: "(0216) 553 67 98",
    h: "08:00–21:00",
    lat: 41.0195,
    lng: 29.0242
  },
  {
    n: "Loft Pet House",
    c: "Otel",
    a: "Koşuyolu, İsmailpaşa Sk. No:32, 34718 Kadıköy/İstanbul",
    p: "0532 529 0176",
    h: "09:00–18:30",
    lat: 41.0052,
    lng: 29.0305
  },
  {
    n: "Patinga",
    c: "Otel",
    a: "Valide-i Atik, Dr. Fahri Atabey Cd. No:75 D:6, 34664 Üsküdar/İstanbul",
    p: "0216 695 2026",
    h: "24 saat açık",
    lat: 41.0125,
    lng: 29.0201,
    is24h: true
  },
  {
    n: "Kaymak Pet Kuaför Üsküdar",
    c: "Kuaför",
    a: "Ahmediye, Gündoğumu Cd. No:37 D:B, 34672 Üsküdar/İstanbul",
    p: "0501 672 62 34",
    w: "https://kaymakpetkuafor.com/",
    h: "10.00-19.00",
    lat: 41.0235,
    lng: 29.0155
  },
  {
    n: "ZESA Evcil Hayvan Kuaförü",
    c: "Kuaför",
    a: "Acıbadem, Nişantaşı Yolu Sokağı No:13, 34660 Üsküdar/İstanbul",
    p: "0532 234 21 79",
    w: "https://zesapetkuafor.com/",
    h: "10.30-20.00",
    lat: 41.0005,
    lng: 29.0352
  },
  {
    n: "Petico Pet kuaför",
    c: "Kuaför",
    a: "Çengelköy, Mehmet Akif Ersoy, Bosna Blv No:63, 34440 Üsküdar/İstanbul",
    p: "0532 722 68 48",
    w: "http://www.peticopetkuafor.com.tr/",
    h: "10.00-19.00",
    lat: 41.0505,
    lng: 29.0552
  },
  {
    n: "Petcanlar",
    c: "Kuaför",
    a: "Bahçelievler, Zübeyde Hanım Cd. No:6, 34688 Üsküdar/İstanbul",
    p: "(0216) 308 56 37",
    w: "https://www.petcanlar.com/",
    h: "09.30-20.30",
    lat: 41.0552,
    lng: 29.0601
  },
  {
    n: "Ata Pet Kuaför",
    c: "Kuaför",
    a: "Göztepe, Bahariyeli Sk No:33/A, 34738 Kadıköy/İstanbul",
    p: "0532 255 25 30",
    w: "https://www.erenkoypetkuafor.com/",
    h: "10.00-21.00",
    lat: 40.9785,
    lng: 29.0582
  },

  // --- ÇEKMEKÖY ---
  {
    n: "Çekmeköy Veteriner Kliniği",
    c: "Veteriner",
    a: "Mimar Sinan, Mimar Sinan Cd. No:35/A, 34782 Çekmeköy/İstanbul",
    p: "0551 699 20 44",
    w: "https://cekmekoyveterinerklinigi.com/",
    h: "09.00-17.30",
    lat: 41.0361,
    lng: 29.1752
  },
  {
    n: "VetAnimora Veteriner Kliniği",
    c: "Veteriner",
    a: "Mehmet Akif, Mesut Sk. No:1 D:2, 34774 Çekmeköy/İstanbul",
    p: "0 538 745 07 50",
    w: "http://www.vetanimora.com/",
    h: "09.00-20.00",
    lat: 41.0315,
    lng: 29.1782
  },
  {
    n: "Şans Veteriner Kliniği Çekmeköy",
    c: "Veteriner",
    a: "Mimar Sinan, Çavuşbaşı Cd. No:30/B, 34782 Çekmeköy/İstanbul",
    p: "0 216 642 97 07",
    w: "http://www.cekmekoyveteriner.com/",
    h: "09.00-20.00",
    lat: 41.0345,
    lng: 29.1721
  },
  {
    n: "Vet Çizmeli Kedi Çekmeköy Veteriner Kliniği",
    c: "Veteriner",
    a: "Mimar Sinan, Ethem Sk. No:10, 34782 Çekmeköy/İstanbul",
    p: "0 216 612 89 42",
    w: "https://www.vetcizmelikedicekmekoy.com/",
    h: "09.00-12.00",
    lat: 41.0372,
    lng: 29.1741
  },
  {
    n: "Vanilya Veteriner Kliniği",
    c: "Veteriner",
    a: "Mimar Sinan, Ceren Sokağı No:18C, 34782 Çekmeköy/İstanbul",
    p: "0 542 550 31 81",
    w: "http://www.vanilyavet.com/",
    h: "10.30-20.00",
    lat: 41.0355,
    lng: 29.1798
  },
  {
    n: "Aslan Petshop",
    c: "Petshop",
    a: "Mimar Sinan, Bayraktar Sk. No:3 D:2, 34406 Çekmeköy/İstanbul",
    p: "0 552 744 70 54",
    w: "https://www.instagram.com/aslanpetshop2/",
    h: "09.00-21.00",
    lat: 41.0331,
    lng: 29.1765
  },
  {
    n: "Sara Petshop",
    c: "Petshop",
    a: "Hamidiye, Barış Yolu Cd. no:11/B, 34000 Çekmeköy/İstanbul",
    p: "0 507 446 38 39",
    w: "https://instagram.com/sarapetshop_ed?igshid=YmMyMTA2M2Y=",
    h: "09.00-20.30",
    lat: 41.0322,
    lng: 29.1685
  },
  {
    n: "Pet Dream Petshop",
    c: "Petshop",
    a: "Mimar Sinan, Yeşil Kayalar Cd. no:4, 34782 Çekmeköy/İstanbul",
    p: "0 553 809 75 75",
    w: "http://www.petdream.com.tr/",
    h: "24 saat açık",
    lat: 41.0381,
    lng: 29.1711,
    is24h: true
  },
  {
    n: "Ena Petshop",
    c: "Petshop",
    a: "Çamlık, Erciyes Sk. no:4/B, 34782 Çekmeköy/İstanbul",
    p: "0 542 520 71 48",
    w: "https://www.yemeksepeti.com/shop/hzfg/ena-petshop/",
    h: "11.00-22.30",
    lat: 41.0392,
    lng: 29.1733
  },
  {
    n: "Petbox Cadde",
    c: "Petshop",
    a: "Hamidiye, Barış Yolu Cd. No:5, 34782 Çekmeköy/İstanbul",
    p: "0 216 740 01 48",
    w: "http://www.petbox.com.tr/",
    h: "08.30-21.30",
    lat: 41.0411,
    lng: 29.1702
  },
  {
    n: "Çekmeköy Pet Kuaförü",
    c: "Kuaför",
    a: "Mimar Sinan, Mimar Sinan Cd. No:35, 34782 Çekmeköy/İstanbul",
    p: "0 216 640 20 44",
    h: "09.00-18.00",
    lat: 41.0358,
    lng: 29.1752
  },
  {
    n: "Pet Kuaför/Shop",
    c: "Kuaför",
    a: "Mehmet Akif Mahallesi Ulubatli Hasan Caddesi/71a Çekmeköy, İstanbul",
    p: "0 533 132 20 82",
    w: "https://patipetkuafor.com.tr/",
    h: "09.00-21.00",
    lat: 41.0305,
    lng: 29.1699
  },
  {
    n: "Bonita Kuaför",
    c: "Kuaför",
    a: "Hamidiye, Barış Yolu Cd. no:13, 34782 Çekmeköy/İstanbul",
    p: "0 533 314 90 64",
    w: "http://www.bonitapetkuafor.com/",
    h: "11.00-20.00",
    lat: 41.0321,
    lng: 29.1681
  },
  {
    n: "Kirli Pati Pet Kuaför & Shop",
    c: "Kuaför",
    a: "Alemdağ mahallesi Atabey caddesi No:19AC, 34794 Çekmeköy/İstanbul",
    p: "0 531 954 06 09",
    w: "http://www.kirlipatipetkuafor.com.tr/",
    h: "10.00-19.00",
    lat: 41.0442,
    lng: 29.1822
  },
  {
    n: "Paw Pet Kuaför",
    c: "Kuaför",
    a: "Sultançiftliği, Yudum Sk. 3D4 D:34788, 34453 Çekmeköy/İstanbul",
    p: "0 546 165 71 34",
    w: "https://sites.google.com/view/pawpetshopgroomer/",
    h: "10.00-19.00",
    lat: 41.0265,
    lng: 29.1558
  },
  {
    n: "Loyal Friend",
    c: "Otel",
    a: "Çatalmeşe, İSPİNOZ CADDESİ NO 6, 34794 Çekmeköy/İstanbul",
    p: "0 535 550 10 82",
    w: "http://www.loyalfriend.com.tr/",
    h: "08.00-20.30",
    lat: 41.0458,
    lng: 29.1831
  },
  {
    n: "Patili Villam Köpek Oteli",
    c: "Otel",
    a: "Ömerli, 34799 Çekmeköy/İstanbul",
    p: "0 533 580 58 53",
    h: "24 saat açık",
    lat: 41.0652,
    lng: 29.2882,
    is24h: true
  },
  {
    n: "Geçici Hayvan Bakım Evi (Çekmeköy)",
    c: "Barınak",
    a: "Ömerli, Kocatepe Cd., 34794 Çekmeköy/İstanbul",
    p: "0 216 600 06 00",
    h: "Ziyaret saatleri değişebilir",
    lat: 41.0665,
    lng: 29.2895
  },

  // --- PENDİK ---
  {
    n: "Rabi Petshop",
    c: "Petshop",
    a: "Fevzi Çakmak, Erzincan Cd. No:108 D:A, 34899 Pendik/İstanbul",
    p: "0 553 967 57 25",
    h: "08.00-22.00",
    lat: 40.8925,
    lng: 29.2312
  },
  {
    n: "Harmandere Pet Pro Petshop",
    c: "Petshop",
    a: "Harmandere, Ova Sk. No:453 D:34, 34912 Pendik/İstanbul",
    p: "0 216 482 2727",
    w: "http://petpro.com.tr/",
    h: "09.00-20.00",
    lat: 40.9152,
    lng: 29.2612
  },
  {
    n: "Flamingo Petshop",
    c: "Petshop",
    a: "Ertuğrul Gazi, Aydos Cd. 40/A, 34909 Pendik/İstanbul",
    p: "0 532 365 17 24",
    w: "http://www.pendikpetshop.com/",
    h: "09.00-21.30",
    lat: 40.9022,
    lng: 29.2512
  },
  {
    n: "Öz Petshop",
    c: "Petshop",
    a: "Güzelyalı, Yavuz Selim Cd. no:8/C, 34903 Pendik/İstanbul",
    p: "0 536 887 68 71",
    w: "http://www.ozpetshop.com.tr/",
    h: "09.00-22.00",
    lat: 40.8695,
    lng: 29.2152
  },
  {
    n: "Blue Petshop",
    c: "Petshop",
    a: "Doğu, Ihlamur Sk. No:28, 34890 Pendik/İstanbul",
    p: "0 538 553 28 18",
    h: "08.00-21.00",
    lat: 40.8805,
    lng: 29.2315
  },
  {
    n: "Emre Demirören Pet Kuaför",
    c: "Kuaför",
    a: "Batı, Hatboyu Cd. 22/A, 34890 Pendik/İstanbul",
    p: "0 542 102 28 98",
    w: "http://www.emrepetkuafor.com/",
    h: "10.00-22.00",
    lat: 40.8795,
    lng: 29.2285
  },
  {
    n: "Can Pati Pet Kuaför",
    c: "Kuaför",
    a: "Yayalar, Atasever Cd. No:1, 34909 Pendik/İstanbul",
    p: "0 534 892 56 11",
    w: "https://www.instagram.com/cankedioteli",
    h: "10.00-19.00",
    lat: 40.9031,
    lng: 29.2522
  },
  {
    n: "Mona Petshop",
    c: "Kuaför",
    a: "Kurtköy, Ebru Sk No:1, 34400 Pendik/İstanbul",
    p: "0 532 467 12 37",
    h: "10.00-20.00",
    lat: 40.9125,
    lng: 29.2615
  },
  {
    n: "Pembe Köpek Evi",
    c: "Otel",
    a: "Yeşilbağlar, Tayfun Sk. No:14, 34890 Pendik/İstanbul",
    p: "0 539 358 78 29",
    w: "https://www.pembekopekevi.com/",
    lat: 40.8872,
    lng: 29.2185
  },
  {
    n: "Can&Cat",
    c: "Otel",
    a: "Yayalar, 34220 Pendik/İstanbul",
    p: "0 533 816 98 17",
    h: "24 saat açık",
    lat: 40.9035,
    lng: 29.2528,
    is24h: true
  },
  {
    n: "Tepeören Sahipsiz Hayvan Geçici Bakımevi ve Yaşam Alanı",
    c: "Barınak",
    a: "Ballıca, Ballıca Cd. No:68, 34916 Pendik/İstanbul",
    h: "Ziyaret açık",
    lat: 40.9255,
    lng: 29.3312
  },
  {
    n: "Mostar Veteriner",
    c: "Veteriner",
    a: "Bahçelievler, Mostar Blv. 26/A, 34000 Pendik/İstanbul",
    p: "0 533 554 60 34",
    h: "24 saat açık",
    lat: 40.8822,
    lng: 29.2345,
    is24h: true
  },
  {
    n: "İstanimal",
    c: "Veteriner",
    a: "Bahçelievler, Adnan Menderes Blv. No:7/A, 34893 Pendik/İstanbul",
    p: "0 505 610 12 23",
    w: "https://istanimal.com/",
    h: "24 saat açık",
    lat: 40.8835,
    lng: 29.2361,
    is24h: true
  },
  {
    n: "Yenişehir Vet Veteriner Kliniği",
    c: "Veteriner",
    a: "Yenişehir, Mustafa Akyol Sokağı No:11 D:133, 34912 Pendik/İstanbul",
    p: "0 545 768 45 45",
    w: "http://yenisehirveteriner.net/",
    h: "09.30-19.00",
    lat: 40.9161,
    lng: 29.2712
  },
  {
    n: "TuruncuPati",
    c: "Veteriner",
    a: "Yenişehir, Gökay Sk. 22-2, 34912 Pendik/İstanbul",
    p: "0 533 688 14 00",
    w: "https://www.turuncupati.com.tr/",
    h: "09.00-00.00",
    lat: 40.9172,
    lng: 29.2731
  },
  {
    n: "Mario Veteriner Kliniği",
    c: "Veteriner",
    a: "Bahçelievler, Dolayoba Cd. No:10, 34893 Pendik/İstanbul",
    p: "0 538 465 50 00",
    w: "https://www.marioveteriner.com/",
    h: "24 saat açık",
    lat: 40.8845,
    lng: 29.2374,
    is24h: true
  },

  // --- ATAŞEHİR ---
  {
    n: "Esatpaşa Petshop Ataşehir",
    c: "Petshop",
    a: "Esatpaşa, Adnan Menderes Cd No:100/A, 34630 Ataşehir/İstanbul",
    p: "0 541 245 05 32",
    h: "09.00-22.30",
    lat: 40.9922,
    lng: 29.0982
  },
  {
    n: "Prestij Pet Market",
    c: "Petshop",
    a: "Mustafa Kemal, 3004. Cd. no:56, 34758 Ataşehir/İstanbul",
    p: "0 505 266 50 40",
    h: "09.00-21.00",
    lat: 40.9815,
    lng: 29.1122
  },
  {
    n: "PawsEra Petshop",
    c: "Petshop",
    a: "Ataşehir Atatürk Mahallesi, Girne Caddesi No:14, 34758 Ataşehir/İstanbul",
    p: "0 531 377 77 47",
    w: "https://hoppetshop.godaddysites.com/",
    lat: 40.9972,
    lng: 29.1152
  },
  {
    n: "UpHill Petshop",
    c: "Petshop",
    a: "KENT ÇARŞI İçi, Barbaros, Ardıç Sk., 34746 Ataşehir/İstanbul",
    p: "0 501 329 30 30",
    h: "08.00-21.00",
    lat: 40.9852,
    lng: 29.1245
  },
  {
    n: "PetOver",
    c: "Petshop",
    a: "Esatpaşa Mah. Ziyapaşa Cad. Güzelbahar Sok. No:2E Nestiva, 34704 Ataşehir/İstanbul",
    p: "0 505 845 57 05",
    h: "09.00-23.00",
    lat: 40.9912,
    lng: 29.0991
  },
  {
    n: "Patili Dostlar Petshop",
    c: "Petshop",
    a: "Ferhatpaşa, Dursunbey Cd. No:80/A, 34779 Ataşehir/İstanbul",
    p: "0 531 083 78 53",
    w: "http://www.patilidostlarpetshop.com/",
    h: "09.00-19.00",
    lat: 40.9572,
    lng: 29.1512
  },
  {
    n: "Paw Art Pet Salon Ataşehir",
    c: "Kuaför",
    a: "Valide-i Atik, Dr. Fahri Atabey Cd. No:75 D:6, 34664 Üsküdar/İstanbul",
    p: "0 542 521 70 15",
    h: "10.00-20.00",
    lat: 41.0122,
    lng: 29.0205
  },
  {
    n: "Ciko Pet Grooming Ataşehir",
    c: "Kuaför",
    a: "Yenişehir, Kağnıcı Yolu Cd. No: 20/B, 34779 Ataşehir/İstanbul",
    p: "0 531 467 44 02",
    h: "10.00-18.00",
    lat: 40.9782,
    lng: 29.1362
  },
  {
    n: "Tatipet Kuaför",
    c: "Kuaför",
    a: "Yenişehir, Baraj Yolu Cad. No: 38, 34779 Ataşehir/İstanbul",
    p: "0 216 455 20 63",
    w: "http://tatipetkuafor.com/",
    h: "09.00-19.00",
    lat: 40.9791,
    lng: 29.1352
  },
  {
    n: "Keyifli Patim",
    c: "Otel",
    a: "Küçükbakkalköy, Koca Yusuf Sk. No:24, 34750 Ataşehir/İstanbul",
    p: "0 542 550 64 57",
    w: "https://keyiflipatim.com.tr/",
    h: "09.00-19.00",
    lat: 40.9721,
    lng: 29.1112
  },
  {
    n: "Sevinç Kedi Oteli",
    c: "Otel",
    a: "Esatpaşa, Aşık Veysel Cd. No:86 D:10, 34000 Ataşehir/İstanbul",
    p: "0 533 142 01 60",
    w: "https://atasehirpetpansiyon.business.blog/",
    h: "10.00-20.00",
    lat: 40.9931,
    lng: 29.0972
  },

  // --- MALTEPE ---
  {
    n: "Maltepetshop",
    c: "Petshop",
    a: "Bağlarbaşı, İnönü Cd. No:58, 34844 Maltepe/İstanbul",
    p: "0 505 502 08 77",
    h: "10.00-21.00",
    lat: 40.9325,
    lng: 29.1312
  },
  {
    n: "İstanbul Petshop",
    c: "Petshop",
    a: "Feyzullah, Yunus Emre Cd. 2 / 1-A, 34843 Maltepe/İstanbul",
    p: "0 216 305 30 47",
    h: "09.00-20.30",
    lat: 40.9282,
    lng: 29.1345
  },
  {
    n: "Arya Petshop",
    c: "Petshop",
    a: "Bağlarbaşı, Bağdat Cad. No:489/B, 34844 Maltepe/İstanbul",
    p: "0 537 845 30 06",
    w: "https://www.aryapetshop.com/",
    h: "09.30-20.00",
    lat: 40.9315,
    lng: 29.1322
  },
  {
    n: "by PetHaus",
    c: "Petshop",
    a: "Küçükyalı, Mektep Cd. No:5/A, 34840 Maltepe/İstanbul",
    p: "0 505 235 22 35",
    h: "09.00-21.00",
    lat: 40.9412,
    lng: 29.1182
  },
  {
    n: "Yüksel Petshop",
    c: "Petshop",
    a: "Altayçeşme, Farabi Sk. Erdinç Apartmanı No:1/B, 34843 Maltepe/İstanbul",
    p: "0 534 617 11 91",
    h: "10.00-20.00",
    lat: 40.9355,
    lng: 29.1362
  },
  {
    n: "Maltepe Platinum Veteriner Kliniği 7/24",
    c: "Veteriner",
    a: "Girne, Nehir Sk. No:8 D:10B, 34852 Maltepe/İstanbul",
    p: "0 501 686 34 34",
    w: "http://maltepeplatinumveteriner.com/",
    h: "24 saat açık",
    lat: 40.9422,
    lng: 29.1412,
    is24h: true
  },
  {
    n: "Maltepe Veterinary Clinic",
    c: "Veteriner",
    a: "Altayçeşme, Adalı Sokağı No:13, 34843 Maltepe/İstanbul",
    p: "0 216 383 71 77",
    w: "https://www.maltepevet.com/",
    h: "10.00-20.00",
    lat: 40.9362,
    lng: 29.1352
  },
  {
    n: "Modernvet",
    c: "Veteriner",
    a: "Cevizli, Tansel Cd. No: 29A, 34846 Maltepe/İstanbul",
    p: "0 505 034 63 46",
    w: "https://www.modernvetistanbul.com/",
    h: "24 saat açık",
    lat: 40.9212,
    lng: 29.1552,
    is24h: true
  },
  {
    n: "Petzzkuaför (Maltepe)",
    c: "Kuaför",
    a: "Altayçeşme, Bağdat Cad. Dostlar Apt No:313/A, 34843 Maltepe/İstanbul",
    p: "0 216 464 34 34",
    w: "https://petzzkuafor.com/",
    h: "09.00-21.00",
    lat: 40.9345,
    lng: 29.1332
  },
  {
    n: "Armes Pet Kuaför",
    c: "Kuaför",
    a: "Çınar, Dikmen Sk. No:1-3A, 34840 Maltepe/İstanbul",
    p: "0 543 121 31 91",
    w: "https://armespetkuafor.com/",
    h: "09.00-21.00",
    lat: 40.9431,
    lng: 29.1212
  },
  {
    n: "Nish Pet Kuaför",
    c: "Kuaför",
    a: "Zümrütevler, Semazen Sok. no:9/A, 34852 Maltepe/İstanbul",
    p: "0 542 510 39 37",
    w: "https://instagram.com/nishpetkuafor",
    h: "10.00-20.30",
    lat: 40.9462,
    lng: 29.1452
  },
  {
    n: "NilGardens Köpek Oteli",
    c: "Otel",
    a: "Bagdat Caddesi, Küçükyalı, Cami Sk. No:1, 34840 Maltepe/İstanbul",
    p: "0 536 701 37 46",
    w: "http://www.nilgardens.com/",
    h: "24 saat açık",
    lat: 40.9415,
    lng: 29.1172,
    is24h: true
  },
  {
    n: "Colombo Köpek Oteli",
    c: "Otel",
    a: "İdealtepe, Marmara Cd. No:12, 34751 Maltepe/İstanbul",
    p: "0 532 722 62 18",
    h: "24 saat açık",
    lat: 40.9472,
    lng: 29.1282,
    is24h: true
  },
  {
    n: "Maltepe Belediyesi Veteriner Kliniği",
    c: "Barınak",
    a: "Aydınevler, Fener Sk. No:4, 34854 Maltepe/İstanbul",
    h: "Ziyaret saatleri değişebilir",
    lat: 40.9522,
    lng: 29.1312
  },
  {
    n: "Petvet",
    c: "Barınak",
    a: "Altayçeşme, Bağdat Cad. N:285, 34843 Maltepe/İstanbul",
    p: "0 850 888 97 38",
    w: "http://www.petvethayvanhastanesi.com/",
    h: "24 saat açık",
    lat: 40.9358,
    lng: 29.1361,
    is24h: true
  },

  // --- BEYKOZ ---
  {
    n: "Pet Klinikum Veteriner",
    c: "Veteriner",
    a: "Kavacık, Baki Sk No:10, 34800 Beykoz/İstanbul",
    p: "0 542 838 62 83",
    w: "https://www.petklinikum.com/",
    h: "08.30-22.00",
    lat: 41.0922,
    lng: 29.0912
  },
  {
    n: "Beykoz Hayvan Hastanesi",
    c: "Veteriner",
    a: "Çengeldere, Alageyik Çk. no:3/A, 34830 Beykoz/İstanbul",
    p: "0 216 222 21 12",
    w: "http://www.bhh.com.tr/",
    h: "24 saat açık",
    lat: 41.1052,
    lng: 29.1382,
    is24h: true
  },
  {
    n: "Fabella Veteriner Kliniği",
    c: "Veteriner",
    a: "Kavacık, Orhan Veli Kanık Cd. Bulut Apt No:26/1, 34810 Beykoz/İstanbul",
    p: "0 545 216 20 34",
    w: "http://www.fabellavet.com/",
    h: "24 saat açık",
    lat: 41.0911,
    lng: 29.0922,
    is24h: true
  },
  {
    n: "Kavacık Veteriner",
    c: "Veteriner",
    a: "Kavacık, Özgür Cd. No:31, 34810 Beykoz/İstanbul",
    p: "0 553 693 03 88",
    w: "https://kavacikveteriner.com.tr/",
    h: "24 saat açık",
    lat: 41.0931,
    lng: 29.0905,
    is24h: true
  },
  {
    n: "PetHealth Veteriner",
    c: "Veteriner",
    a: "İncirköy mah Polonezyolu üzeri, Soğuksu Cd. no:83/B, 34800 Beykoz/İstanbul",
    p: "0 216 322 76 76",
    h: "09.00-20.00",
    lat: 41.1212,
    lng: 29.1022
  },
  {
    n: "Petihtiyac",
    c: "Petshop",
    a: "Çengeldere, Paşabahçe-Polonezköy Yolu No:64, 34830 Beykoz/İstanbul",
    p: "444 7 250",
    w: "http://www.petihtiyac.com/",
    h: "08.30-20.00",
    lat: 41.1061,
    lng: 29.1372
  },
  {
    n: "Funda Petshop",
    c: "Petshop",
    a: "Kavacık, Kavaklı Sk. A/1, 34800 Beykoz/İstanbul",
    p: "0 534 262 10 83",
    w: "https://instagram.com/funda_petshopp",
    h: "09.00-20.30",
    lat: 41.0925,
    lng: 29.0882
  },
  {
    n: "Melet Petshop",
    c: "Petshop",
    a: "Çubuklu, Beşevler 23/1 İstanbul, 34805 Beykoz/İstanbul",
    p: "0 535 891 23 56",
    w: "https://www.hepsiburada.com/magaza/melet-petshop",
    h: "10.00-22.00",
    lat: 41.1011,
    lng: 29.0845
  },
  {
    n: "Kavacik Petshop",
    c: "Petshop",
    a: "Kavacık, Otağtepe Cd. No:7 D:B, 34810 Beykoz/İstanbul",
    p: "0 216 465 08 58",
    h: "09.00-20.00",
    lat: 41.0892,
    lng: 29.0945
  },
  {
    n: "Pitpit Pet Kuaför",
    c: "Kuaför",
    a: "Paşabahçe, Saip Molla Cd. 10/6, 34800 Beykoz/İstanbul",
    p: "0 507 418 38 16",
    h: "10.00-20.00",
    lat: 41.1155,
    lng: 29.0872
  },
  {
    n: "Kavacık Pet Kuaför",
    c: "Kuaför",
    a: "Kavacık, Otağtepe Cd. no:23/c, 34810 Beykoz/İstanbul",
    p: "0 553 075 45 53",
    w: "https://kavacikpetkuafor.com/",
    h: "10.00-19.00",
    lat: 41.0885,
    lng: 29.0955
  },
  {
    n: "Beykoz Petshop",
    c: "Kuaför",
    a: "Yalıköy, 34820 Beykoz/İstanbul",
    p: "0 554 193 82 62",
    w: "http://www.beykozpet.com/",
    h: "08.00-21.00",
    lat: 41.1252,
    lng: 29.0822
  },
  {
    n: "Neşeli Pet Otel",
    c: "Otel",
    a: "Yavuz Selim, Kamelya Sk. No:2, 34830 Beykoz/İstanbul",
    p: "0 541 342 06 14",
    w: "https://neselipetotel.com.tr/",
    h: "08.00-22.00",
    lat: 41.1121,
    lng: 29.1212
  },
  {
    n: "Kedi Kreşi",
    c: "Otel",
    a: "Kavacık, Fatih Sultan Mehmet Cd., 34810 Beykoz/İstanbul",
    p: "0 541 342 06 14",
    w: "http://www.keyiflikedim.com/",
    lat: 41.0915,
    lng: 29.0911
  },

  // --- KARTAL & TUZLA ---
  {
    n: "Vet34 Kartal Veteriner Kliniği",
    c: "Veteriner",
    a: "Orhantepe, Üsküdar Cd. b blok 192/H, 34865 Kartal/İstanbul",
    p: "0 533 046 08 38",
    w: "https://vet34.com/",
    h: "24 saat açık",
    lat: 40.8982,
    lng: 29.1612,
    is24h: true
  },
  {
    n: "Siyendi Veteriner Kliniği",
    c: "Veteriner",
    a: "Karlıktepe, Yaşar Doğu Cd. NO:33/A, 34870 Kartal/İstanbul",
    p: "0 501 161 81 81",
    w: "https://siyendiveteriner.com/",
    h: "10.00-23.00",
    lat: 40.9012,
    lng: 29.1722
  },
  {
    n: "Kartal Petshop",
    c: "Petshop",
    a: "Karlıktepe, İnönü Cd. No: 65/A, 34394 Kartal/İstanbul",
    p: "0 532 474 07 25",
    h: "08.30-22.00",
    lat: 40.8995,
    lng: 29.1712
  },
  {
    n: "Lala Otel",
    c: "Otel",
    a: "Kordonboyu, Neyzen Tevfik Cd. no : 19, 34582 Kartal/İstanbul",
    h: "24 saat açık",
    lat: 40.8872,
    lng: 29.1552
  },
  {
    n: "Masal Patileri",
    c: "Barınak",
    a: "Yakacık Çarşı, Nizam Sk. No:24, 34876 Kartal/İstanbul",
    h: "10.00-20.00",
    lat: 40.9152,
    lng: 29.2112
  },
  {
    n: "Kartal Belediyesi Veteriner İşleri Müdürlüğü",
    c: "Barınak",
    a: "Cumhuriyet, Vatansever Cd. 4/1, 34876 Kartal/İstanbul",
    p: "0 216 280 63 93",
    w: "https://www.kartal.bel.tr/Belediyemiz/VeterinerlikIsleriMudurlugu",
    lat: 40.9112,
    lng: 29.2082
  },
  {
    n: "Tuzla Belediyesi Koç Pati Rehabilitasyon Merkezi",
    c: "Barınak",
    a: "Akfırat, Göçbeyli Bv No:1, 34959 Tuzla/İstanbul",
    h: "Ziyaret saatleri değişebilir",
    lat: 40.8972,
    lng: 29.3612
  },
  // --- SANCAKTEPE ---
  {
    n: "Sancakpati Veteriner Kliniği",
    c: "Veteriner",
    a: "Akpınar, Kanuni Cd. No : 4 F, 34785 Sancaktepe/İstanbul",
    p: "0 532 743 40 36",
    w: "https://sancakpati.com/",
    h: "24 saat açık",
    lat: 40.9932,
    lng: 29.2524,
    is24h: true
  }
];

// Helper to expand CompactPoint objects into fully functional MapPoint models
export const SAMPLE_POINTS: MapPoint[] = RAW_POINTS.map((rp, idx) => {
  const is24h = rp.is24h || rp.h?.toLowerCase().includes("24 saat") || rp.h?.toLowerCase().includes("7/24") || false;
  
  // Custom generated tags depending on category and specific features
  const tags: string[] = [];
  if (is24h) {
    tags.push("7/24", "Acil");
  } else {
    tags.push(rp.c);
  }
  
  if (rp.c === "Veteriner") {
    tags.push("Muayene", "Teşhis");
  } else if (rp.c === "Barınak") {
    tags.push("Sahiplendirme", "Destek");
  } else if (rp.c === "Petshop") {
    tags.push("Mama", "Oyuncak");
  } else if (rp.c === "Otel") {
    tags.push("Konaklama", "Bakım");
  } else if (rp.c === "Kuaför") {
    tags.push("Tıraş", "Banyo");
  }

  return {
    id: `seeded_${idx}`,
    name: rp.n,
    lat: rp.lat,
    lng: rp.lng,
    category: rp.c,
    address: rp.a,
    phone: rp.p || undefined,
    hours: rp.h || "Belirtilmemiş",
    website: rp.w || undefined,
    is24h,
    tags,
    rating: Number((4.3 + Math.random() * 0.6).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 120) + 12
  };
});
