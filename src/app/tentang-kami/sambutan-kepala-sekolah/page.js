export default function Page() {
  return (
    <main style={{ paddingBottom: '0' }}>
      {/* Banner / Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '300px', 
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/images/slide1.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: '2', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Sambutan Kepala Sekolah</h1>
          <h2 style={{ 
            color: 'rgba(255, 204, 0, 0.8)', 
            fontSize: '5rem', 
            fontWeight: '900', 
            margin: '0', 
            transform: 'scaleY(1.2)', 
            letterSpacing: '-2px',
            textShadow: '4px 4px 0px rgba(0,0,0,0.3)',
            opacity: '0.8'
          }}>
            SMPN 3 CIBUNGBULANG
          </h2>
        </div>
      </section>

      {/* Content Section */}
      <section className="container" style={{ padding: '60px 0 80px 0' }}>
        <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '30px' }}>Sambutan Kepala Sekolah</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
          
          {/* Text Left */}
          <div style={{ flex: '1', minWidth: '300px', color: '#475569', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '20px' }}>
              Bismillahirrahmanirrahim<br/><br/>
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>

            <p style={{ marginBottom: '20px' }}>
              Puji syukur kami panjatkan kehadirat Allah SWT atas limpahan rahmat-Nya sehingga SMP NEGERI 3 CIBUNGBULANG dapat menyajikan website sekolah. Kemajuan teknologi dan tuntutan kebutuhan masyarakat dalam era informasi digital seperti saat ini menuntut SMP NEGERI 3 CIBUNGBULANG untuk dapat memberdayakan teknologi informasi dan komunikasi dalam memberikan layanan publik kepada masyarakat.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              Kehadiran website diharapkan dapat meningkatkan Kredibilitas atau kepercayaan masyarakat terhadap sekolah juga sebagai media informasi lembaga, sebagai media untuk publikasi prestasi. Di samping itu dengan adanya web juga dapat memperkenalkan fasilitas sekolah, media promosi dan media informasi kelulusan.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              Tampilan profil sekolah mulai dari visi, misi, sejarah singkat, galeri, dan yang terpenting adalah untuk mempererat tali silaturahmi antara guru, siswa, dan alumni dalam sebuah kanal forum pada website portal sekolah.
            </p>
            
            <p style={{ marginBottom: '30px' }}>
              Semoga dengan kehadiran web ini akan terjalin informasi dan komunikasi dengan cepat sehingga dapat mengikuti perkembangan dalam pengetahuan yang berkembang.
            </p>

            <p>
              Terimakasih.<br/><br/>
              Wassalamu'alaikum. Warahmatullahi Wabarakatuh.
            </p>
          </div>

          {/* Image Right */}
          <div style={{ flex: '0 0 400px' }}>
            <div style={{ border: '12px solid #e2e8f0', padding: '2px', background: 'white' }}>
              <img 
                src="/images/kepsek.png" 
                alt="Kepala Sekolah" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}