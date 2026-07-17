"use client";

import { useState, useEffect } from 'react';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    if(Array.isArray(data)) setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    setTitle('');
    setContent('');
    setLoading(false);
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus berita ini?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    }
  };

  return (
    <div>
      <h1 style={{ color: '#1e293b', marginBottom: '20px' }}>Kelola Berita / Pengumuman</h1>
      
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Tambah Berita Baru</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Judul</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Isi Berita</label>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
              rows="5"
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ background: '#3b82f6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Menyimpan...' : 'Simpan Berita'}
          </button>
        </form>
      </div>

      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>Daftar Berita</h3>
        {posts.length === 0 ? <p>Belum ada berita.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map(post => (
              <li key={post.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{post.title}</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(post.id)} style={{ background: '#ef4444', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
