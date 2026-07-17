# Product Requirements Document (PRD)
**Project Name:** Website Profil Sekolah (SMPN 3 Cibungbulang)
**Version:** 1.0

## 1. Pendahuluan
Website ini dikembangkan untuk menjadi portal informasi digital resmi bagi SMPN 3 Cibungbulang. Tujuannya adalah untuk mempermudah akses informasi publik, memperlihatkan transparansi sekolah, serta mempublikasikan berita dan prestasi sekolah dengan antarmuka yang modern, responsif, dan mudah dinavigasi.

## 2. Objektif
- **Digitalisasi Informasi**: Memberikan akses mudah bagi siswa, orang tua, dan masyarakat luas mengenai profil, sejarah, visi-misi, serta lokasi sekolah.
- **Transparansi Sekolah**: Menampilkan data sumber daya manusia (guru dan pegawai) secara rapi dan profesional.
- **Portal Berita & Publikasi**: Memiliki sistem yang mudah di-_update_ (melalui Admin Panel) untuk publikasi berita, kegiatan, dan prestasi siswa/sekolah.

## 3. Arsitektur & Teknologi
- **Framework Frontend/Backend:** Next.js 14 (App Router)
- **Styling:** Vanilla CSS (`global.css`) tanpa framework (seperti Tailwind) sesuai kebutuhan spesifik (*organic design*).
- **Database ORM:** Prisma
- **Database Engine:** SQLite (File-based, untuk kemudahan pengembangan/deployment awal)
- **Autentikasi:** Custom JWT/Session based (Untuk akses Admin Panel)

## 4. Fitur Utama

### 4.1. Halaman Publik (Frontend)
- **Beranda (Homepage):** 
  - Slider/Hero Header informatif.
  - 4 Pilar Sekolah (Fasilitas, Prestasi, Ekskul, SDM) dengan desain _organic circle_.
  - Cuplikan Sambutan Kepala Sekolah dengan tautan ke halaman detail.
  - Kartu Prestasi Siswa terbaru (layout tabular, aksen warna warni).
  - Profil Singkat Guru dan Pegawai (kartu dengan _blue name tag_).
  - Berita & Kegiatan Sekolah (layout bergaya kutipan/_quote box_ eksklusif).
- **Halaman Detail Dinamis (`/prestasi/[slug]`, `/guru/[slug]`, `/berita/[slug]`):** 
  - Menampilkan informasi lengkap berdasarkan ID/Slug yang dipilih dari halaman beranda.
- **Navigasi & Footer:**
  - Header lengket (_sticky navbar_) yang interaktif dengan menu _dropdown_ (Profil, Prestasi, Berita).
  - Footer komprehensif berisi alamat lengkap, kontak (Telepon/Email), media sosial (Instagram, TikTok, YouTube), serta Google Maps interaktif tersemat (_embed_).

### 4.2. Panel Admin (Backend CMS)
- **Halaman Login:** Keamanan akses untuk administrator menggunakan kredensial yang tersimpan di _database_.
- **Manajemen Berita (CRUD):** Tambah, Edit, Hapus, dan Lihat daftar berita/pengumuman sekolah.
- ***(Rencana)* Manajemen Guru/Prestasi:** Untuk memperbarui data pilar sekolah secara dinamis dari dasbor (sedang dalam pengembangan lanjutan).

## 5. Alur Pengguna (User Flow)
1. **Pengunjung Web**: Membuka `localhost:3000` -> Melihat _slider_ -> Menggulir ke bawah melihat berita terbaru -> Mengklik salah satu berita untuk membaca detailnya.
2. **Admin**: Membuka `/admin` -> _Login_ dengan _Username_ & _Password_ -> Diarahkan ke *Dashboard* -> Menuju Manajemen Berita -> Menambah Berita Baru -> Berita otomatis tayang di Beranda.

## 6. Persyaratan Keamanan
- Folder akses `/admin` harus diproteksi dengan otentikasi.
- *Environment variables* (`.env`) wajib dieksklusi (*gitignore*) agar _Database URL_ dan kredensial sensitif tidak terekspos.
- *Database* SQLite (`dev.db`) diproteksi agar tidak ikut terunggah ke repositori publik.

---
*Dibuat oleh Tim Pengembang (Antigravity AI)*
