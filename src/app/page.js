import { prisma } from '@/lib/prisma';
import ImageSlider from '@/components/ImageSlider';
import NewsSlider from '@/components/NewsSlider';
import Link from 'next/link';

export const revalidate = 0; // Disable cache for demo purposes so admin changes show immediately

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10 // Increased to allow slider demonstration
  });

  return (
    <main className="container" style={{ paddingBottom: '0' }}>
      
      {/* Slider / Hero goes first now */}
      <ImageSlider />

      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', letterSpacing: '-0.05em', marginBottom: '15px' }}>Selamat Datang di SMPN 3 Cibungbulang</h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Melalui website ini kami berharap dapat memberikan pelayanan informasi yang lebih baik dan cepat kepada seluruh warga sekolah dan masyarakat pada umumnya.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Tentang SMPN 3 Cibungbulang</h2>
      </div>

      {/* 4 Features Grid - Circle Organic Design */}
      <section className="features-grid" style={{ marginBottom: '80px' }}>
        <div className="feature-card">
          <div className="feature-circle">🏫</div>
          <h3 className="feature-title">Fasilitas</h3>
          <p className="feature-desc">Fasilitas lengkap & modern di seluruh lingkungan sekolah.</p>
        </div>
        <div className="feature-card">
          <div className="feature-circle" style={{ background: '#dcfce7', color: '#16a34a' }}>🏅</div>
          <h3 className="feature-title" style={{ color: '#16a34a' }}>Prestasi</h3>
          <p className="feature-desc">Sekolah berprestasi tinggi dalam bidang akademik dan non-akademik.</p>
        </div>
        <div className="feature-card">
          <div className="feature-circle" style={{ background: '#fef3c7', color: '#d97706' }}>🎨</div>
          <h3 className="feature-title" style={{ color: '#d97706' }}>Ekskul</h3>
          <p className="feature-desc">Berbagai kegiatan ekstrakurikuler untuk pengembangan bakat.</p>
        </div>
        <div className="feature-card">
          <div className="feature-circle" style={{ background: '#e0e7ff', color: '#4f46e5' }}>👥</div>
          <h3 className="feature-title" style={{ color: '#4f46e5' }}>SDM</h3>
          <p className="feature-desc">Guru profesional yang siap mendidik komunitas belajar unggul.</p>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah - Organic Layout */}
      <section className="flex-section" style={{ marginBottom: '80px', borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <div className="flex-image">
          <div style={{ padding: '8px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <img src="/images/kepsek.png" alt="Kepala Sekolah" style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} />
          </div>
        </div>
        <div className="flex-content">
          <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '20px' }}>Sambutan Kepala Sekolah</h2>
          <p style={{ color: '#475569', marginBottom: '15px', fontSize: '0.95rem' }}>
            <em>Bismillahirrahmanirrahim</em>
          </p>
          <p style={{ color: '#475569', marginBottom: '15px', fontSize: '0.95rem' }}>
            <em>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh</em>
          </p>
          <p style={{ color: '#475569', marginBottom: '15px', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Puji syukur kami panjatkan kehadirat Allah SWT atas limpahan rahmat-Nya sehingga SMP NEGERI 3 CIBUNGBULANG dapat menyajikan website sekolah. Kemajuan teknologi di era informasi digital menuntut kami untuk terus berinovasi dalam memberikan layanan publik yang terbaik bagi peserta didik, orang tua, dan masyarakat.
          </p>
          <p style={{ color: '#475569', marginBottom: '15px', lineHeight: '1.8', fontSize: '0.95rem' }}>
            Kehadiran website diharapkan dapat meningkatkan Kredibilitas atau kepercayaan masyarakat terhadap sekolah juga sebagai media informasi lembaga, sebagai media untuk publikasi prestasi. Di samping itu dengan adanya web juga dapat memperkenalkan fasilitas sekolah, media promosi dan media informasi kelulusan.
          </p>
          <Link href="/tentang-kami/sambutan-kepala-sekolah" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' }}>
            Selengkapnya ❯
          </Link>
        </div>
      </section>

      {/* Prestasi Siswa - Tabular Meta Layout */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <h2 className="section-title" style={{ color: '#1e293b' }}>Prestasi Siswa</h2>
        <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          
          <Link href="/prestasi/juara-1-sains-nasional" className="prestasi-card">
            <div className="prestasi-image-wrapper" style={{ borderBottomColor: '#2563eb' }}>
              <img src="/images/prestasi1.png" alt="Prestasi" />
            </div>
            <h3 className="prestasi-title">Juara 1 Lomba Sains Tingkat Nasional</h3>
            <table className="prestasi-meta-table">
              <tbody>
                <tr>
                  <td style={{ width: '40%' }}>Kategori</td>
                  <td>Akademik</td>
                </tr>
                <tr>
                  <td>Oleh</td>
                  <td>Anisa Rahma</td>
                </tr>
                <tr>
                  <td>Tingkat</td>
                  <td>Nasional</td>
                </tr>
              </tbody>
            </table>
          </Link>

          <Link href="/prestasi/medali-emas-olimpiade" className="prestasi-card">
            <div className="prestasi-image-wrapper" style={{ borderBottomColor: '#16a34a' }}>
              <img src="/images/prestasi1.png" alt="Prestasi" />
            </div>
            <h3 className="prestasi-title">Medali Emas Olimpiade Matematika</h3>
            <table className="prestasi-meta-table">
              <tbody>
                <tr>
                  <td style={{ width: '40%' }}>Kategori</td>
                  <td>Akademik</td>
                </tr>
                <tr>
                  <td>Oleh</td>
                  <td>Budi Santoso</td>
                </tr>
                <tr>
                  <td>Tingkat</td>
                  <td>Nasional</td>
                </tr>
              </tbody>
            </table>
          </Link>

          <Link href="/prestasi/juara-1-renang" className="prestasi-card">
            <div className="prestasi-image-wrapper" style={{ borderBottomColor: '#d97706' }}>
              <img src="/images/prestasi1.png" alt="Prestasi" />
            </div>
            <h3 className="prestasi-title">Juara 1 Kejuaraan Renang Antar Pelajar</h3>
            <table className="prestasi-meta-table">
              <tbody>
                <tr>
                  <td style={{ width: '40%' }}>Kategori</td>
                  <td>Non-Akademik</td>
                </tr>
                <tr>
                  <td>Oleh</td>
                  <td>Kirana Larasati</td>
                </tr>
                <tr>
                  <td>Tingkat</td>
                  <td>Provinsi</td>
                </tr>
              </tbody>
            </table>
          </Link>

        </div>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Link href="/prestasi" style={{ color: '#2589ff', textDecoration: 'none', fontWeight: 'bold' }}>Lihat Selengkapnya ❯</Link>
        </div>
      </section>

      {/* Guru dan Pegawai - Solid Tag Layout */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <h2 className="section-title" style={{ color: '#1e293b' }}>Guru dan Pegawai</h2>
        <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          
          <Link href="/guru/dra-siti-aminah" className="guru-card">
            <img src="/images/guru1.png" alt="Guru" className="guru-image" />
            <div className="guru-name-tag">
              Dra. Siti Aminah, M.Pd.
            </div>
          </Link>

          <Link href="/guru/ahmad-faisal" className="guru-card">
            <img src="/images/guru1.png" alt="Guru" className="guru-image" />
            <div className="guru-name-tag">
              Ahmad Faisal, S.Si.
            </div>
          </Link>

          <Link href="/guru/rini-puspita" className="guru-card">
            <img src="/images/guru1.png" alt="Guru" className="guru-image" />
            <div className="guru-name-tag">
              Rini Puspita, S.Pd.
            </div>
          </Link>

          <Link href="/guru/hendra-kusuma" className="guru-card">
            <img src="/images/guru1.png" alt="Guru" className="guru-image" />
            <div className="guru-name-tag">
              Hendra Kusuma, S.Or.
            </div>
          </Link>

        </div>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Link href="/tentang-kami/sumber-daya-manusia" style={{ color: '#2589ff', textDecoration: 'none', fontWeight: 'bold' }}>Lihat Selengkapnya ❯</Link>
        </div>
      </section>

      {/* Berita dan Kegiatan - Quote Style Layout */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px', marginBottom: '80px' }} id="berita">
        <h2 className="section-title" style={{ color: '#1e293b' }}>Berita & Kegiatan</h2>
        
        <NewsSlider posts={posts} />
      </section>
    </main>
  );
}
