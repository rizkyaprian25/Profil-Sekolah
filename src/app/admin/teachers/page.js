'use client';

import { useState, useEffect } from 'react';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Guru Kelas');
  const [description, setDescription] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [additionalRole, setAdditionalRole] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async (skipSeed = false) => {
    try {
      const res = await fetch('/api/teachers');
      const data = await res.json();
      setTeachers(data);
      
      // Auto seed dummy data if empty, but only try once
      if (data.length === 0 && !skipSeed) {
        seedDummyData();
      }
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
    }
  };

  const seedDummyData = async () => {
    const dummies = [
      { name: 'Dra. Siti Aminah, M.Pd.', subject: 'Kepala Sekolah', photoUrl: '/images/guru1.png', description: 'Beliau adalah salah satu tenaga pendidik terbaik yang memiliki dedikasi tinggi dalam mencerdaskan anak bangsa. Dengan pendekatan mengajar yang inovatif dan interaktif, beliau selalu berupaya menciptakan suasana kelas yang kondusif bagi perkembangan kognitif maupun karakter siswa.', education: 'S2 Manajemen Pendidikan', experience: 'Lebih dari 15 Tahun', additionalRole: 'Penanggung Jawab Kurikulum' },
      { name: 'Ahmad Faisal, S.Si.', subject: 'Guru Matematika', photoUrl: '/images/guru1.png', description: 'Berpengalaman dalam membimbing siswa menuju olimpiade sains nasional.', education: 'S1 Matematika Murni', experience: 'Lebih dari 5 Tahun', additionalRole: 'Pembina Olimpiade Matematika' },
      { name: 'Rini Puspita, S.Pd.', subject: 'Guru Bahasa Inggris', photoUrl: '/images/guru1.png', description: 'Mengutamakan kemampuan public speaking dan conversation dalam bahasa Inggris.', education: 'S1 Pendidikan Bahasa Inggris', experience: 'Lebih dari 8 Tahun', additionalRole: 'Wali Kelas / Pembina English Club' },
      { name: 'Hendra Kusuma, S.Or.', subject: 'Guru Penjaskes', photoUrl: '/images/guru1.png', description: 'Mencetak atlet-atlet muda berbakat dari sekolah.', education: 'S1 Pendidikan Jasmani dan Olahraga', experience: 'Lebih dari 10 Tahun', additionalRole: 'Pelatih Ekstrakurikuler Futsal' }
    ];
    
    for (const dummy of dummies) {
      await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dummy)
      });
    }
    fetchTeachers(true); // Pass true to avoid infinite loop if seeding fails
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !subject) {
      showNotification('Mohon lengkapi data wajib!', 'error');
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = '/images/guru1.png'; // default fallback
      
      // Upload image first if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.imageUrl;
        } else {
          showNotification('Gagal mengunggah foto', 'error');
          setLoading(false);
          return;
        }
      }
      
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, subject, photoUrl: finalImageUrl, description, education, experience, additionalRole })
      });
      
      if (res.ok) {
        setName('');
        setSubject('Guru Kelas');
        setDescription('');
        setEducation('');
        setExperience('');
        setAdditionalRole('');
        setImageFile(null);
        e.target.reset(); // Reset file input
        showNotification('Data Guru berhasil ditambahkan!', 'success');
        fetchTeachers();
      } else {
        throw new Error('Gagal menyimpan data');
      }
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data guru ini?')) return;
    
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Data berhasil dihapus', 'success');
        fetchTeachers();
      }
    } catch (err) {
      showNotification('Gagal menghapus data', 'error');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '30px', fontWeight: 'bold' }}>Kelola Data Guru</h1>
      
      {notification.message && (
        <div style={{ 
          padding: '15px 20px', 
          marginBottom: '25px', 
          borderRadius: '8px',
          background: notification.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: notification.type === 'success' ? '#166534' : '#991b1b',
          border: `1px solid ${notification.type === 'success' ? '#bbf7d0' : '#fecaca'}`
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Form Tambah */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Tambah Guru Baru</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Nama Lengkap & Gelar (Wajib)</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Misal: Drs. Budi Santoso, M.Pd."
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Jabatan / Guru Mapel (Wajib)</label>
              <input 
                type="text" 
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                placeholder="Misal: Guru Bahasa Indonesia"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Biografi / Deskripsi (Opsional)</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Ceritakan secara singkat profil dan dedikasi guru ini..."
                rows={4}
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Pendidikan Terakhir (Opsional)</label>
              <input 
                type="text" 
                value={education} 
                onChange={e => setEducation(e.target.value)} 
                placeholder="Misal: S1 Pendidikan Universitas Negeri"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Masa Bakti (Opsional)</label>
              <input 
                type="text" 
                value={experience} 
                onChange={e => setExperience(e.target.value)} 
                placeholder="Misal: Lebih dari 8 Tahun"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Jabatan Tambahan (Opsional)</label>
              <input 
                type="text" 
                value={additionalRole} 
                onChange={e => setAdditionalRole(e.target.value)} 
                placeholder="Misal: Wali Kelas / Pembina Ekstrakurikuler"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Foto (Opsional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', border: '1px dashed #94a3b8', borderRadius: '6px', background: '#f8fafc' }}
              />
              <small style={{ color: '#64748b', display: 'block', marginTop: '5px' }}>*Jika tidak diisi, akan menggunakan gambar default.</small>
              {imageFile && (
                <div style={{ marginTop: '10px' }}>
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', padding: '12px', background: loading ? '#94a3b8' : '#2563eb', color: 'white', 
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {loading ? 'Menyimpan...' : 'Simpan Data Guru'}
            </button>
          </form>
        </div>

        {/* List Guru */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#1e293b', margin: 0 }}>Daftar Guru</h2>
            <span style={{ background: '#e2e8f0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#475569', fontWeight: 'bold' }}>Total: {teachers.length}</span>
          </div>

          {teachers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <p>Belum ada data guru.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {teachers.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', transition: 'border-color 0.2s' }} onMouseOver={e => e.currentTarget.style.borderColor = '#93c5fd'} onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #e2e8f0' }}>
                    <img src={t.photoUrl || '/images/guru1.png'} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0f172a', fontSize: '1.05rem' }}>{t.name}</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{t.subject}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                    onMouseOver={e => { e.target.style.background = '#fecaca'; }}
                    onMouseOut={e => { e.target.style.background = '#fee2e2'; }}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
