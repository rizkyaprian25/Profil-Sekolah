export default async function PrestasiDetail({ params }) {
  const resolvedParams = await params;
  // Format slug to title (e.g., juara-1-sains-nasional -> Juara 1 Sains Nasional)
  const title = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="container" style={{ paddingBottom: '80px' }}>
      <header className="page-header" style={{ marginBottom: '40px' }}>
        <h1 className="page-title">{title}</h1>
        <p>Kategori: Akademik | Tanggal: 12 Agustus 2026</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        <img 
          src="/images/prestasi1.png" 
          alt={title} 
          style={{ width: '100%', height: '400px', objectFit: 'cover', objectPosition: 'center' }}
        />
        
        <div style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '20px' }}>Raihan Prestasi Membanggakan</h2>
          
          <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '15px' }}>
            Siswa/siswi kebanggaan SMPN 3 Cibungbulang kembali menorehkan prestasi gemilang di tingkat nasional. Melalui dedikasi, kerja keras, dan bimbingan intensif dari para guru pembimbing, gelar juara berhasil diraih pada kompetisi bergengsi tahun ini.
          </p>
          
          <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '25px' }}>
            Keberhasilan dalam kategori <strong>{title}</strong> ini diharapkan dapat menjadi motivasi bagi seluruh peserta didik lainnya untuk terus mengembangkan potensi diri, baik di bidang akademik maupun non-akademik. Sekolah akan terus memfasilitasi dan mendukung setiap langkah siswa menuju kesuksesan.
          </p>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Detail Informasi Prestasi:</h3>
            <ul style={{ listStyle: 'none', color: '#475569' }}>
              <li style={{ marginBottom: '8px' }}>🎓 <strong>Nama Siswa:</strong> Anisa Rahma (Perwakilan)</li>
              <li style={{ marginBottom: '8px' }}>🏆 <strong>Tingkat:</strong> Nasional / Provinsi</li>
              <li style={{ marginBottom: '8px' }}>🏢 <strong>Penyelenggara:</strong> Kementerian Pendidikan Nasional</li>
            </ul>
          </div>
          
          <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>❮ Kembali ke Beranda</a>
          </div>
        </div>
      </div>
    </main>
  );
}
