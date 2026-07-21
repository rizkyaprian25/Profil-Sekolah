'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-family)', background: '#f8fafc' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '30px 20px', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>
            SMPN 3 Cibungbulang
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '5px 0 0 0' }}>Admin Panel</p>
        </div>
        
        <nav style={{ flex: 1, padding: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/dashboard" style={{ 
                display: 'block', padding: '12px 15px', color: pathname === '/admin/dashboard' ? 'white' : '#cbd5e1',
                background: pathname === '/admin/dashboard' ? '#1e293b' : 'transparent',
                borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', fontWeight: pathname === '/admin/dashboard' ? 'bold' : 'normal'
              }}>
                Dashboard
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/posts" style={{ 
                display: 'block', padding: '12px 15px', color: pathname === '/admin/posts' ? 'white' : '#cbd5e1',
                background: pathname === '/admin/posts' ? '#1e293b' : 'transparent',
                borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', fontWeight: pathname === '/admin/posts' ? 'bold' : 'normal'
              }}>
                Kelola Berita
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/achievements" style={{ 
                display: 'block', padding: '12px 15px', color: pathname === '/admin/achievements' ? 'white' : '#cbd5e1',
                background: pathname === '/admin/achievements' ? '#1e293b' : 'transparent',
                borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', fontWeight: pathname === '/admin/achievements' ? 'bold' : 'normal'
              }}>
                Kelola Prestasi
              </a>
            </li>
          </ul>
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid #1e293b' }}>
          <a href="/" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '15px' }}>
            &larr; Ke Halaman Utama
          </a>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', padding: '10px', background: '#ef4444', color: 'white', 
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#dc2626'}
            onMouseOut={(e) => e.target.style.background = '#ef4444'}
          >
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
      
    </div>
  );
}
