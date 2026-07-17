export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-family)' }}>
      <aside style={{ width: '250px', background: '#0f172a', color: 'white', padding: '20px' }}>
        <h2>Admin Panel</h2>
        <nav style={{ marginTop: '30px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}><a href="/admin/dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard</a></li>
            <li style={{ marginBottom: '15px' }}><a href="/admin/posts" style={{ color: '#94a3b8', textDecoration: 'none' }}>Kelola Berita</a></li>
            <li style={{ marginBottom: '15px' }}><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Kembali ke Website</a></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '40px', background: '#f8fafc' }}>
        {children}
      </main>
    </div>
  );
}
