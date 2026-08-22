# Product Requirements Document (PRD)
**Project Name:** Website Profil Sekolah (SMPN 3 Cibungbulang)
**Version:** 1.2 (Updated)

## 1. Pendahuluan
Website ini dikembangkan untuk menjadi portal informasi digital resmi bagi SMPN 3 Cibungbulang. Tujuannya adalah mempermudah akses informasi publik, memperlihatkan transparansi sekolah, serta mempublikasikan berita, kegiatan ekstrakurikuler, tenaga kependidikan (SDM), sejarah, profil, visi misi, dan prestasi sekolah. Website dibangun dengan antarmuka yang mengusung prinsip **Soft UI modern**, responsif, dan sangat mudah dinavigasi.

## 2. Objektif
- **Digitalisasi Informasi**: Memberikan akses terpadu bagi siswa, orang tua, dan masyarakat luas mengenai profil, sejarah, visi-misi, serta informasi umum lainnya.
- **Transparansi Sekolah**: Menampilkan data Sumber Daya Manusia (guru dan pegawai) secara rapi, elegan, dan profesional.
- **Portal Berita & Publikasi**: Memiliki sistem CMS (Content Management System) internal yang mempermudah admin sekolah untuk memperbarui hampir seluruh data website secara dinamis (seperti Sejarah, Visi Misi, Berita, dll).

## 3. Arsitektur & Teknologi (Tech Stack)

### 3.1. Teknologi Inti (Pondasi)
- **Next.js (App Router dengan Turbopack):** Framework tingkat lanjut dari React yang bertindak sebagai mesin utama web ini. Berfungsi untuk menyatukan tampilan depan (Frontend) dan sistem belakang (Backend/API) menjadi satu kesatuan berkecepatan tinggi berkat fitur *pre-rendering*.
- **React.js:** Library antarmuka yang memungkinkan interaksi website (UI) berjalan mulus tanpa perlu *reload* halaman.

### 3.2. Desain & Tampilan (Frontend)
- **Vanilla CSS (`global.css`):** Menggunakan murni CSS tanpa mengandalkan framework eksternal besar. 
  - **Fungsi:** Membuat *loading* website menjadi ekstra kilat dan memungkinkan kebebasan mendesain tema eksklusif bergaya **Premium Soft UI** (bayangan halus, sudut melengkung, hover interaktif).

### 3.3. Basis Data (Database)
- **SQLite:** Sistem basis data tunggal (`dev.db`) yang berbasis file lokal. 
  - **Fungsi:** Menyimpan seluruh data teks dengan struktur yang sangat sederhana untuk dipindahkan (backup), tanpa memerlukan instalasi server database mandiri. Sangat cocok dan hemat biaya untuk lingkungan sekolah.
- **Prisma ORM:** Jembatan komunikasi antara Next.js dan SQLite.
  - **Fungsi:** Memudahkan manipulasi data menggunakan kode JavaScript modern yang bersih, sekaligus menjamin keamanan ketat anti-SQL Injection.

### 3.4. Keamanan & Autentikasi
- **Bcrypt.js:** Teknologi enkripsi *hashing* searah.
  - **Fungsi:** Merubah kata sandi asli administrator menjadi kode rahasia acak di dalam database agar tidak dapat diretas.
- **Jose (JSON Web Tokens):** Sistem manajemen sesi berbasis JWT *cookies*.
  - **Fungsi:** Menciptakan tiket keamanan (*session*) yang memverifikasi pengakses panel `/admin`. Sistem ini memproteksi rute sensitif dan menolak akses (*unauthorized*) otomatis bagi penyusup.
- **Node FS (File System):** Modul penyimpanan bawaan untuk *upload* gambar.
  - **Fungsi:** Mengelola manajemen file *upload* ke folder `public/uploads`, menerapkan filter batasan ukuran maksimal (5MB), serta menghapus foto fisik secara otomatis dari folder jika ada pembaruan atau penghapusan data.

## 4. Fitur Utama

### 4.1. Halaman Publik (Frontend)
- **Beranda (Homepage):** 
  - Slider/Hero Header informatif.
  - Tautan cepat ke bagian penting website.
  - Kartu Prestasi Siswa dengan tata letak rapi, menggunakan rasio foto 4:3.
  - Profil Singkat Guru dan Pegawai (kartu bergaya modern dengan *hover effect* sinematik, *shadow*, dan tanpa bingkai tebal).
  - Slider interaktif untuk Berita & Kegiatan Sekolah.
- **Tentang Kami (Informasi Sekolah):**
  - **Sambutan Kepala Sekolah (`/tentang-kami/sambutan-kepala-sekolah`)**
  - **Sejarah Sekolah (`/tentang-kami/sejarah-sekolah`)**: Menampilkan sejarah dengan desain teks berdampingan dengan foto.
  - **Profil Sekolah (`/tentang-kami/profil-sekolah`)**: Menyajikan informasi terstruktur sekolah (Status, Tahun Berdiri, Akreditasi, dll) bergaya tabel grid dinamis.
  - **Visi Misi (`/tentang-kami/visi-misi`)**: Tata letak dua kolom responsif dengan poin misi *auto-list*.
  - **Mars Sekolah (`/tentang-kami/mars-sekolah`)**: Mengintegrasikan sematan video YouTube dan lirik lagu Mars.
- **Halaman Direktori & Detail Dinamis:** 
  - **SDM (`/sdm` & `/sdm/lihat/[id]/[slug]`):** Halaman direktori yang menampilkan seluruh pegawai dengan *banner* premium. Halaman detail menggunakan tata letak profil profesional dengan *badge* informasi dan tombol navigasi responsif.
  - **Prestasi (`/prestasi`):** Halaman dedikasi untuk pencapaian siswa.
  - **Ekstrakurikuler (`/ekskul` & `/ekskul/page/[id]`):** Menampilkan daftar kegiatan penunjang minat bakat siswa.
- **Navigasi & Footer:**
  - Header *sticky* yang interaktif dengan menu *dropdown* lengkap (termasuk berbagai sub-menu di bawah "Tentang Kami").
  - Footer komprehensif berisi alamat lengkap (SMPN 3 Cibungbulang, Cijujung), kontak (Telepon/Email), media sosial (Instagram, YouTube, TikTok), serta Google Maps interaktif tersemat (*embed*).

### 4.2. Panel Admin (Backend CMS)
- **Halaman Login:** Keamanan akses untuk administrator menggunakan kredensial yang tersimpan di *database*.
- **Manajemen Tentang Kami:**
  - **Kelola Sambutan**: Mengubah foto dan teks sambutan Kepala Sekolah.
  - **Kelola Sejarah**: Memperbarui teks panjang narasi sejarah beserta foto pendukung.
  - **Kelola Profil**: Memperbarui 10+ data krusial sekolah (NPSN, Status, Tahun Berdiri, dll).
  - **Kelola Visi Misi**: Memisahkan entri teks Visi, dan secara otomatis mendeteksi baris baru pada Misi menjadi poin (*list*) di halaman publik.
  - **Kelola Mars**: Memasukkan *URL Embed* YouTube dan Lirik Mars opsional.
- **Manajemen Konten Utama:**
  - **Kelola Berita (CRUD):** Tambah, Edit, Hapus, dan Lihat daftar berita/pengumuman sekolah.
  - ***(Rencana Lanjutan)*:** Modul manajemen Guru, Ekstrakurikuler, dan Prestasi agar terintegrasi langsung dengan dasbor admin.

## 5. Alur Pengguna (User Flow)
1. **Pengunjung Web**: Membuka `localhost:3000` -> Mengakses menu *dropdown* "Tentang Kami" untuk melihat Sejarah, Visi Misi, atau Mars Sekolah -> atau langsung melihat direktori "Guru dan Pegawai" (`/sdm`) -> Mengklik profil guru untuk melihat detail riwayat.
2. **Admin**: Membuka `/admin` -> *Login* dengan kredensial rahasia -> Diarahkan ke Dashboard -> Membuka menu navigasi kiri ("Kelola Tentang Kami" atau "Kelola Konten Utama") -> Memperbarui teks/foto sekolah -> Perubahan otomatis direfleksikan di halaman publik secara *real-time*.

## 6. Persyaratan Keamanan
- Folder rute `/admin` diproteksi secara terpusat menggunakan `proxy.js` (sebagai pengganti `middleware.js` guna menghindari konflik konfigurasi) yang memvalidasi *cookies-based session* (JWT). API terkait memverifikasi ulang JWT ini secara independen.
- **Penting:** Jangan membuat atau menggunakan *file* `middleware.js` atau `middleware.ts` karena akan berbenturan dengan konfigurasi `proxy.js` bawaan *platform*.
- *Environment variables* (`.env`) wajib dieksklusi (*gitignore*) agar rahasia JWT, *Database URL*, dan kredensial sensitif tidak terekspos ke repositori kontrol versi.
- *Database* SQLite (`dev.db` dan `prisma/dev.db`) diproteksi agar data uji coba tidak bocor.

---
*Dibuat oleh Tim Pengembang (Antigravity AI)*
