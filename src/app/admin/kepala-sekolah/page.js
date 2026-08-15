"use client";

import { useState, useEffect, useRef } from "react";

export default function AdminKepalaSekolah() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    nama: "",
    pendidikan: "",
    karir: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchKepalaSekolah();
  }, []);

  const fetchKepalaSekolah = async () => {
    try {
      const res = await fetch("/api/kepala-sekolah");
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        setForm(data);
      }
    } catch (error) {
      console.error("Error fetching Kepala Sekolah:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = form.photoUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.imageUrl;
        } else {
          alert("Gagal mengupload gambar");
          setLoading(false);
          return;
        }
      }

      const payload = { ...form, photoUrl: finalImageUrl };

      const res = await fetch("/api/kepala-sekolah", {
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
      alert("Profil Kepala Sekolah berhasil disimpan!");
      fetchKepalaSekolah();
    } catch (error) {
      console.error("Error updating Kepala Sekolah:", error);
      alert("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div style={{ color: "#334155" }}>Memuat data...</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>Kelola Kepala Sekolah</h2>
      
      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#334155" }}>
          Edit Konten Kepala Sekolah
        </h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Judul Halaman</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Narasi Sejarah Kepemimpinan</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={5}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Nama Kepala Sekolah</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Pendidikan Terakhir</label>
          <input
            type="text"
            name="pendidikan"
            value={form.pendidikan}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Jenjang Karier (pisahkan dengan Enter)</label>
          <textarea
            name="karir"
            value={form.karir}
            onChange={handleChange}
            rows={5}
            placeholder="Tahun 2000 - 2010: Guru&#10;Tahun 2010 - 2020: Kepala Sekolah"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", whiteSpace: "pre-wrap" }}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Foto Galeri Kepala Sekolah</label>
          {form.photoUrl && !imageFile && (
            <div style={{ marginBottom: "10px" }}>
              <img src={form.photoUrl} alt="Kepala Sekolah" style={{ maxWidth: "200px", borderRadius: "8px" }} />
            </div>
          )}
          {imageFile && (
            <div style={{ marginBottom: "10px" }}>
              <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#3b82f6", color: "white", padding: "12px 20px", borderRadius: "6px",
            border: "none", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer",
            marginTop: "10px", alignSelf: "flex-start"
          }}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

      </form>
      </div>
    </div>
  );
}
