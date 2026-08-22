'use client';
import { useState, useEffect } from 'react';

export default function ImageModal({ src, alt, imageStyle }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        style={{ ...imageStyle, cursor: 'zoom-in' }} 
        onClick={() => setIsOpen(true)} 
        title="Klik untuk memperbesar"
      />
      
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
          
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', animation: 'scaleIn 0.2s ease-out' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '35px',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '0 10px',
                lineHeight: '1'
              }}
              title="Tutup"
            >
              &times;
            </button>
            <img 
              src={src} 
              alt={alt} 
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                border: '4px solid white',
                borderRadius: '4px',
                backgroundColor: 'white',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </>
  );
}
