export default async function GuruDetail({ params }) {
  const resolvedParams = await params;
  const name = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="container" style={{ paddingBottom: '80px' }}>
      <header className="page-header" style={{ marginBottom: '40px' }}>
        <h1 className="page-title">Profil Pendidik</h1>
        <p>SDM Unggul SMPN 3 Cibungbulang</p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
        
        <div style={{ flex: '0 0 300px' }}>
          <img 
            src="/images/guru1.png" 
            alt={name} 
            style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', objectPosition: 'top', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          />
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', marginBottom: '10px' }}>{name}</h2>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-color)', marginBottom: '20px', fontWeight: '500' }}>Guru Mata Pelajaran Utama</h3>
          
          <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>
            Beliau adalah salah satu tenaga pendidik terbaik di SMPN 3 Cibungbulang yang memiliki dedikasi tinggi dalam mencerdaskan anak bangsa. Dengan pendekatan mengajar yang inovatif dan interaktif, beliau selalu berupaya menciptakan suasana kelas yang kondusif bagi perkembangan kognitif maupun karakter siswa.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Pendidikan Terakhir</p>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>S1 Pendidikan Universitas Negeri</p>
            </div>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Masa Bakti</p>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Lebih dari 8 Tahun</p>
            </div>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Jabatan Tambahan</p>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Wali Kelas / Pembina Ekstrakurikuler</p>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>❮ Kembali ke Beranda</a>
          </div>
        </div>
      </div>
    </main>
  );
}
