"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SaranaFormContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchSarana(id);
    }
  }, [id]);

  const fetchSarana = async (saranaId) => {
    try {
      const res = await fetch(`/api/sarana/${saranaId}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.title || "",
          content: data.content || "",
          photoUrl: data.photoUrl || "",
        });
      } else {
        alert("Fasilitas tidak ditemukan");
        router.push("/admin/sarana");
      }
    } catch (error) {
      console.error("Error fetching Sarana:", error);
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

      const url = id ? `/api/sarana/${id}` : "/api/sarana";
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
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

      alert("Fasilitas berhasil disimpan!");
      router.push("/admin/sarana");
    } catch (error) {
      console.error("Error updating Sarana:", error);
      alert("Terjadi kesalahan sistem");
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div style={{ color: "#334155" }}>Memuat data...</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#1e293b" }}>
        {id ? "Edit Fasilitas" : "Tambah Fasilitas"}
      </h2>
      
      <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Nama Fasilitas</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Misal: Ruang Kelas"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Deskripsi Fasilitas</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              placeholder="Tambahkan deskripsi tentang fasilitas ini..."
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Foto Fasilitas</label>
            {form.photoUrl && !imageFile && (
              <div style={{ marginBottom: "10px" }}>
                <img src={form.photoUrl} alt="Fasilitas" style={{ maxWidth: "300px", borderRadius: "8px", border: "2px solid #e2e8f0" }} />
              </div>
            )}
            {imageFile && (
              <div style={{ marginBottom: "10px" }}>
                <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ maxWidth: "300px", borderRadius: "8px", border: "2px solid #e2e8f0" }} />
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

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#3b82f6", color: "white", padding: "12px 20px", borderRadius: "6px",
                border: "none", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Menyimpan..." : "Simpan Fasilitas"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/sarana")}
              style={{
                background: "#94a3b8", color: "white", padding: "12px 20px", borderRadius: "6px",
                border: "none", fontWeight: "bold", cursor: "pointer"
              }}
            >
              Batal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function AdminSaranaForm() {
  return (
    <Suspense fallback={<div>Memuat form...</div>}>
      <SaranaFormContent />
    </Suspense>
  );
}
