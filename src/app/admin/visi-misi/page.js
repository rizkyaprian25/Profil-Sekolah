"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function VisiMisiAdmin() {
  const [form, setForm] = useState({ 
    visi: "",
    misi: "",
    photoUrl: "" 
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const fetchVisiMisi = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/visi-misi");
      const data = await res.json();
      if (data && data.id) {
        setForm({
          visi: data.visi || "",
          misi: data.misi || "",
          photoUrl: data.photoUrl || ""
        });
      }
    } catch (error) {
      console.error("Error fetching visi-misi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisiMisi();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = form.photoUrl;

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
          alert("Gagal mengunggah gambar.");
          setLoading(false);
          return;
        }
      }

      const payload = { ...form, photoUrl: finalImageUrl };

      const res = await fetch("/api/visi-misi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Sesi Anda telah habis, silakan login kembali.");
          window.location.href = "/admin/login";
        } else {
          alert("Gagal menyimpan data.");
        }
        setLoading(false);
        return;
      }
      
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Visi & Misi berhasil disimpan!");
      fetchVisiMisi();
    } catch (error) {
      console.error("Error saving visi-misi:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Visi & Misi</h2>

      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
            
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                Foto Sekolah (Sisi Kanan)
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              />
              {imageFile ? (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Preview" 
                    style={{ width: '300px', height: 'auto', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : form.photoUrl ? (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Foto Saat Ini:</p>
                  <img 
                    src={form.photoUrl} 
                    alt="Current" 
                    style={{ width: '300px', height: 'auto', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              ) : null}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                Visi Sekolah
              </label>
              <textarea 
                name="visi" 
                value={form.visi} 
                onChange={handleChange} 
                rows="4"
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} 
                required 
              />
              <small style={{ color: "#64748b" }}>Tuliskan visi sekolah dalam bentuk paragraf.</small>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#475569", fontWeight: "bold" }}>
                Misi Sekolah
              </label>
              <textarea 
                name="misi" 
                value={form.misi} 
                onChange={handleChange} 
                rows="8"
                style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px" }} 
                required 
              />
              <small style={{ color: "#64748b", display: "block", marginTop: "5px" }}>
                Pisahkan setiap poin misi dengan menekan tombol <strong>Enter (Baris Baru)</strong>. Sistem akan otomatis mengubahnya menjadi daftar bernomor 1, 2, 3 di halaman publik.
              </small>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold" }}>
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
