const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'tentang-kami/sambutan-kepala-sekolah', title: 'Sambutan Kepala Sekolah' },
  { path: 'tentang-kami/sejarah-sekolah', title: 'Sejarah Sekolah' },
  { path: 'tentang-kami/profil-sekolah', title: 'Profil Sekolah' },
  { path: 'tentang-kami/visi-misi', title: 'Visi Misi Sekolah' },
  { path: 'tentang-kami/mars-sekolah', title: 'Mars Sekolah' },
  { path: 'tentang-kami/kepala-sekolah', title: 'Kepala Sekolah' },
  { path: 'tentang-kami/komite-sekolah', title: 'Komite Sekolah' },
  { path: 'tentang-kami/kurikulum', title: 'Kurikulum' },
  { path: 'tentang-kami/kesiswaan', title: 'Kesiswaan' },
  { path: 'tentang-kami/sarana-prasarana', title: 'Sarana dan Prasarana' },
  { path: 'tentang-kami/struktur-organisasi', title: 'Struktur Organisasi Sekolah' },
  { path: 'tentang-kami/sumber-daya-manusia', title: 'Sumber Daya Manusia' },
  { path: 'prestasi', title: 'Prestasi' },
  { path: 'ekskul', title: 'Ekstrakurikuler' },
  { path: 'blog', title: 'Blog Sekolah' }
];

pages.forEach(page => {
  const dir = path.join(__dirname, 'src', 'app', ...page.path.split('/'));
  fs.mkdirSync(dir, { recursive: true });
  
  const content = `export default function Page() {
  return (
    <main>
      <header className="page-header">
        <h1 className="page-title">${page.title}</h1>
        <p>Halaman ini sedang dalam tahap pengembangan.</p>
      </header>
      <section className="page-content">
        <h2>${page.title}</h2>
        <p style={{ marginTop: '20px', color: '#475569' }}>
          Ini adalah teks dummy (sementara) untuk halaman ${page.title}. Nantinya Anda dapat mengganti teks ini dengan informasi yang sebenarnya mengenai SMPN 3 Cibungbulang. 
        </p>
        <p style={{ marginTop: '10px', color: '#475569' }}>
          Struktur dan tata letak halaman ini sudah disiapkan agar siap digunakan saat konten asli sudah tersedia.
        </p>
      </section>
    </main>
  );
}`;

  fs.writeFileSync(path.join(dir, 'page.js'), content);
});

console.log('Semua halaman berhasil dibuat.');
