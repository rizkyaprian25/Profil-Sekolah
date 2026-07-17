"use client";
import { useState, useEffect } from 'react';

const slides = [
  { id: 1, src: '/images/slide1.png', caption: 'Fasilitas Sekolah yang Modern dan Nyaman' },
  { id: 2, src: '/images/slide2.png', caption: 'Kegiatan Belajar Mengajar yang Interaktif' },
  { id: 3, src: '/images/slide3.png', caption: 'Mendukung Pengembangan Minat dan Bakat Siswa' },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-container" style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden', borderRadius: '16px', marginTop: '30px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            backgroundImage: `url(${slide.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(15, 23, 42, 0.7)', padding: '20px', color: 'white', textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{slide.caption}</h2>
          </div>
        </div>
      ))}
      <button 
        onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)}
        style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.3)', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ❮
      </button>
      <button 
        onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)}
        style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.3)', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ❯
      </button>
      <div style={{ position: 'absolute', bottom: '80px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {slides.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrent(index)}
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: index === current ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}
