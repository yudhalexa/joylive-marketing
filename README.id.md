![Language](https://img.shields.io/badge/lang-IDN-orange)
[![Figma Prototype](https://img.shields.io/badge/Figma-4B0738?logo=figma&logoColor=white)](https://www.figma.com/proto/4JyjKDtydJk6yrQaXoldvu/Video-Marketing-Joylive---Mobile?node-id=362-3700&t=UqhWWzIQLQu4Zmzm-1)
![HTML](https://img.shields.io/badge/HTML/CSS-BF1E2D?logo=htmx)
![JS](https://img.shields.io/badge/JavaScript-BF1E2D?logo=javascript&logoColor=white)
[![Node.js](https://img.shields.io/badge/Node.js-0C6E77?logo=nodedotjs&logoColor=white)](https://nodejs.org/en/download)
[![Apache](https://img.shields.io/badge/Apache-0C6E77?logo=apache&logoColor=white)](https://httpd.apache.org/download.cgi)
[![Laragon](https://img.shields.io/badge/Laragon-46C0CB?logo=laragon&logoColor=white)](https://laragon.org/download)

*Untuk melihat versi README bahasa Inggris, klik di [sini](README.md).*

# Tentang Proyek
Proyek ini merupakan hasil pekerjaan dari pelaksanaan magang selama 5 bulan di *Joylive BSD City*. Dari sebuah konsep, seluruh proyek ini terbentuk, terancang, terprogram, dan terluncur dari awal. Situs web ini diaktifkan sebagai subdomain dari [situs web utama Joylive](https://joylive.id).

## Fitur
<!-- <p align="center">
  <img src="docs/screenshot.jpeg" width="200" border="1">
</p> -->

Situs ini menyajikan antarmuka yang menyerupai *highlight reel* pada media sosial untuk menampilkan tur digital untuk kamar-kamar dan fasilitas pada [hotel Joylive BSD City](https://www.google.com/maps/place/Joylive+BSD+City/@-6.302943,106.638214,17z/data=!4m9!3m8!1s0x2e69fb736dab5b15:0x62b024ef8f72d35f!5m2!4m1!1i2!8m2!3d-6.3029434!4d106.6382135!16s%2Fg%2F11rws99_jb?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D), yang didaftarkan di bawah ini.
* Kamar (*Superior Twin*, *Superior Double*, *Deluxe*)
* 3 Ruang Pertemuan (*Meet Space A*, *Meet Space B*, *Meet Space C*)
* Restoran *Soul Kitchen*
* Pusat Kebugaran (*Gym*)
* Ruang Cuci Pakaian (*Laundromat*)
* Musholla

<!-- <p align="center">
  <img src="docs/reel-scroll.gif" alt="Reel Scroll" width="200" border="1">
  &nbsp;&nbsp;&nbsp;
  <img src="docs/video-clicked.gif" alt="Video Clicked" width="200" border="1">
</p> -->

Ketika ikon kamar/fasilitas di-klik, video tur untuk kamar/fasilitas tersebut akan main dengan antarmuka video kostum, beserta dengan *jingle* hotel yang bisa dimatikan kapanpun dari tombol *floating* pada kanan bawah.

## Penggunaan
### Persyaratan
- Node.js
- PM2
- File `.env` dengan informasi *service account*
- File `credentials.json` dengan kredensial *Google API*

Situs web ini menggunakan folder *Google Drive* dengan akses *service account* untuk menyajikan sistem mekanisme CMS (*Content Management System*) yang memungkinkan karyawan hotel mengganti isi konten kapanpun. Hal ini memerlukan server Node yang terpisah untuk berjalan di belakang sehingga *Google API* dapat menarik media dari folder.

``` cmd
npm install -g pm2
```
Navigasi ke folder `cms` dan jalankan `npm install` yang akan mengunduh persyaratan untuk server *Express* dan *Google Drive API* untuk berjalan.
``` cmd
cd cms
npm install
```
Setelah semua terinstal, daftarkan PM2 sebagai *startup service* untuk server dapat berjalan secara otomatis. Proses ini hanya perlu dilakukan sekali.
> Hanya di Windows.
``` cmd
pm2-windows-startup install
```
ATAU
``` cmd
npx pm2-windows-startup install
```
Setelah PM2 terdaftar, jalankan server dan simpan.
``` cmd
pm2 start ecosystem.config.js --env production
pm2 save
```
Sekarang, server akan berjalan secara otomatis, namun kemungkinan akan memerlukan waktu yang lama untuk memuat media, tergantung ukuran media.

## Lisensi
MIT