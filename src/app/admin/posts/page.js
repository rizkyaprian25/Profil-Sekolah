'use client';

import { useState, useEffect } from 'react';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if(Array.isArray(data)) setPosts(data);
    } catch (err) {
      showNotification('Gagal mengambil data berita.', 'error');
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

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl })
      });
      
      if (res.ok) {
        setTitle('');
        setContent('');
        setImageFile(null);
        e.target.reset(); // Reset file input
        showNotification('Berita berhasil ditambahkan!', 'success');
        fetchPosts();
      } else {
        showNotification('Gagal menambahkan berita (Unauthorized).', 'error');
      }
    } catch (err) {
      showNotification('Terjadi kesalahan jaringan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        if (res.ok) {
          showNotification('Berita berhasil dihapus!', 'success');
          fetchPosts();
        } else {
          showNotification('Gagal menghapus berita (Unauthorized).', 'error');
        }
      } catch (err) {
        showNotification('Terjadi kesalahan jaringan.', 'error');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e293b', margin: 0 }}>Kelola Berita & Kegiatan</h1>
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
            <h3 style={{ margin: 0, color: '#334155' }}>Tambah Berita Baru</h3>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Judul Berita</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                placeholder="Misal: Upacara Kemerdekaan 17 Agustus"
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Gambar Berita (Opsional)</label>
              <input 
                type="file" 
                accept="image/*"
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
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontWeight: 'bold' }}>Isi Berita</label>
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                required 
                rows="8"
                placeholder="Tulis detail berita atau pengumuman di sini..."
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
            <button type="submit" disabled={loading} style={{ 
              width: '100%', background: '#3b82f6', color: 'white', padding: '12px', border: 'none', 
              borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem',
              transition: 'background 0.2s'
            }}>
              {loading ? 'Menyimpan...' : 'Publikasikan Berita'}
            </button>
          </form>
        </div>

        {/* List of Posts */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#334155' }}>Daftar Berita</h3>
            <span style={{ background: '#e2e8f0', color: '#475569', padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Total: {posts.length}
            </span>
          </div>
          
          <div style={{ padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📰</div>
                <p>Belum ada berita yang diterbitkan.</p>
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {posts.map(post => (
                  <li key={post.id} style={{ 
                    borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '20px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', lineHeight: '1.4' }}>{post.title}</h4>
                        {post.imageUrl && (
                          <div style={{ marginBottom: '10px' }}>
                            <img src={post.imageUrl} alt={post.title} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                          </div>
                        )}
                        <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.content}
                        </p>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>
                          📅 {new Date(post.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDelete(post.id)} 
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
