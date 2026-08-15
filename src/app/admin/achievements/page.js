'use client';

import { useState, useEffect } from 'react';

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Akademik');
  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState('Sekolah');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      if(Array.isArray(data)) setAchievements(data);
    } catch (err) {
      showNotification('Gagal mengambil data prestasi.', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = '';
      
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
          imageUrl = uploadData.imageUrl;
        } else {
          showNotification('Gagal mengunggah gambar.', 'error');
          setLoading(false);
          return;
        }
      }

      const res = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, studentName, level, imageUrl, description })
      });
      
      if (res.ok) {
        setTitle('');
        setCategory('Akademik');
        setStudentName('');
        setLevel('Sekolah');
        setDescription('');
        setImageFile(null);
        e.target.reset(); // Reset file input
        showNotification('Prestasi berhasil ditambahkan!', 'success');
        fetchAchievements();
      } else {
        showNotification('Gagal menambahkan prestasi (Unauthorized).', 'error');
      }
    } catch (err) {
      showNotification('Terjadi kesalahan jaringan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus prestasi ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        const res = await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
        if (res.ok) {
          showNotification('Prestasi berhasil dihapus!', 'success');
          fetchAchievements();
        } else {
          showNotification('Gagal menghapus prestasi (Unauthorized).', 'error');
        }
      } catch (err) {
        showNotification('Terjadi kesalahan jaringan.', 'error');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e293b', margin: 0 }}>Kelola Prestasi Siswa</h1>
      </div>

      {/* Notification Toast */}
      {notification.message && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 1000,
          background: notification.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white', padding: '15px 25px', borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold'
        }}>
          {notification.message}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Form Add Post */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, color: '#334155' }}>Tambah Prestasi Baru</h3>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Judul Prestasi</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                placeholder="Misal: Juara 1 Lomba Sains Tingkat Nasional"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Kategori</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', background: 'white' }}
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Non-Akademik">Non-Akademik</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Tingkat</label>
                <select 
                  value={level} 
                  onChange={e => setLevel(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', background: 'white' }}
                >
                  <option value="Sekolah">Sekolah</option>
                  <option value="Kecamatan">Kecamatan</option>
                  <option value="Kabupaten">Kabupaten</option>
                  <option value="Provinsi">Provinsi</option>
                  <option value="Nasional">Nasional</option>
                  <option value="Internasional">Internasional</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Nama Siswa / Tim (Oleh)</label>
              <input 
                type="text" 
                value={studentName} 
                onChange={e => setStudentName(e.target.value)} 
                required 
                placeholder="Misal: Anisa Rahma"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Deskripsi / Ucapan (Opsional)</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Misal: Alhamdulillah, selamat dan sukses atas pencapaian..."
                rows={4}
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Gambar Prestasi (Wajib)</label>
              <input 
                type="file" 
                accept="image/*"
                required
                onChange={e => setImageFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
              />
              {imageFile && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Preview" 
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} style={{ 
              width: '100%', background: '#3b82f6', color: 'white', padding: '12px', border: 'none', 
              borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem',
              transition: 'background 0.2s'
            }}>
              {loading ? 'Menyimpan...' : 'Tambah Prestasi'}
            </button>
          </form>
        </div>

        {/* List of Achievements */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#334155' }}>Daftar Prestasi</h3>
            <span style={{ background: '#e2e8f0', color: '#475569', padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Total: {achievements.length}
            </span>
          </div>
          
          <div style={{ padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
            {achievements.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏆</div>
                <p>Belum ada data prestasi siswa.</p>
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {achievements.map(ach => (
                  <li key={ach.id} style={{ 
                    borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '20px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', lineHeight: '1.4' }}>{ach.title}</h4>
                        {ach.imageUrl && (
                          <div style={{ marginBottom: '10px' }}>
                            <img src={ach.imageUrl} alt={ach.title} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                          </div>
                        )}
                        <div style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem' }}>
                          <strong>Oleh:</strong> {ach.studentName} <br/>
                          <strong>Kategori:</strong> {ach.category} | <strong>Tingkat:</strong> {ach.level}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(ach.id)} 
                        style={{ 
                          background: '#fee2e2', color: '#ef4444', padding: '8px 12px', border: '1px solid #fecaca', 
                          borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.2s', flexShrink: 0
                        }}
                        onMouseOver={(e) => { e.target.style.background = '#ef4444'; e.target.style.color = 'white'; }}
                        onMouseOut={(e) => { e.target.style.background = '#fee2e2'; e.target.style.color = '#ef4444'; }}
                      >
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
