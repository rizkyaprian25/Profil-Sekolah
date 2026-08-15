import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const ekskuls = await prisma.ekskul.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Jumbotron/Header Style */}
      <div style={{
        background: 'linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), url(/images/hero-bg.png) center center no-repeat',
        backgroundSize: 'cover',
        height: '270px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '60px'
      }}>
        <h1 style={{ color: 'white', fontSize: '3rem', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Ekstrakurikuler
        </h1>
      </div>

      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {ekskuls.map((ekskul) => (
            <div key={ekskul.id} style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '40px',
              alignItems: 'center',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '50px'
            }}>
              
              {/* Content / Left Side */}
              <div style={{ flex: '1', minWidth: '300px' }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  color: '#0f3a54', 
                  marginBottom: '20px', 
                  fontWeight: '600'
                }}>
                  {ekskul.title}
                </h2>
                
                <p style={{ 
                  color: '#666', 
                  fontSize: '1rem', 
                  lineHeight: '1.8', 
                  marginBottom: '30px',
                  textAlign: 'justify'
                }}>
                  {ekskul.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <Link href={`#`} style={{
                    display: 'inline-block',
                    backgroundColor: '#1E90FF', // Blue color from reference
                    color: '#fff',
                    padding: '10px 30px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}>
                    Read More
                  </Link>
                  
                  <div style={{ 
                    color: '#1E90FF', 
                    fontWeight: 'bold', 
                    fontSize: '1.05rem' 
                  }}>
                    Pembina : {ekskul.pembina}
                  </div>
                </div>
              </div>

              {/* Image / Right Side */}
              <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '500px',
                  border: '8px solid #ddd',
                  backgroundColor: '#fff',
                  padding: '4px' // Inner spacing like a frame
                }}>
                  <img 
                    src={ekskul.photoUrl || '/images/hero-bg.png'} 
                    alt={ekskul.title} 
                    style={{ 
                      width: '100%', 
                      height: '300px', 
                      objectFit: 'cover',
                      display: 'block'
                    }} 
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}