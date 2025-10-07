import api from "../API/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DaftarHadir = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tanggal: "",
    shift: "",
    nama: "",
    lokasi: "", // alamat lengkap
    status: "",
  });

  const [loadingLokasi, setLoadingLokasi] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Ambil lokasi + reverse geocoding via backend proxy
  const handleAmbilLokasi = async () => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung GPS");
      return;
    }

    setLoadingLokasi(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Use backend proxy to avoid CORS
          const response = await api.post("/daftar-hadir/reverse-geocode", { lat, lng });
          const alamat = response.data.alamat;

          setFormData((prev) => ({
            ...prev,
            lokasi: alamat,
          }));
        } catch (err) {
          console.error("Gagal mengambil alamat:", err);
          setFormData((prev) => ({
            ...prev,
            lokasi: `${lat}, ${lng}`,
          }));
          alert("Gagal mengambil alamat lengkap, menggunakan koordinat.");
        }

        setLoadingLokasi(false);
      },
      (err) => {
        alert("Gagal mengambil lokasi: " + err.message);
        setLoadingLokasi(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/daftar-hadir/create", formData);
      console.log("Response server:", res.data);
      alert("✅ Daftar hadir berhasil disimpan");

      // simpan shift dan tanggal ke localStorage (biar bisa dipakai di InputKegiatan)
      localStorage.setItem("shift", formData.shift);
      localStorage.setItem("tanggal", formData.tanggal);

      // reset form
      setFormData({
        tanggal: "",
        shift: "",
        nama: "",
        lokasi: "",
        status: "",
      });

      // Auto redirect to Input Kegiatan
      navigate("/input-kegiatan");
    } catch (err) {
      console.error("❌ Gagal simpan:", err);
      alert("Terjadi kesalahan saat menyimpan ke server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
        Form Daftar Hadir
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mx-auto"
      >
        {/* Tanggal */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-sm sm:text-base">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Shift */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-sm sm:text-base">Shift</label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm sm:text-base"
            required
          >
            <option value="">-- Pilih Shift --</option>
            <option value="Pagi">Pagi</option>
            <option value="Malam">Malam</option>
          </select>
        </div>

        {/* Nama Satpam */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-sm sm:text-base">Nama Satpam</label>
          <select
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm sm:text-base"
            required
          >
            <option value="">-- Pilih Satpam --</option>
            <option value="Johan Ardianto">Johan Ardianto</option>
            <option value="M. Ali Imron">M. Ali Imron</option>
            <option value="Zacky Mubarok">Zacky Mubarok</option>
            <option value="Susik Susanto">Susik Susanto</option>
          </select>
        </div>

        {/* Lokasi */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-sm sm:text-base">Lokasi</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={formData.lokasi}
              readOnly
              className="flex-1 border rounded p-2 bg-gray-100 text-sm sm:text-base"
              placeholder="Klik 'Ambil Lokasi' untuk menampilkan alamat"
            />
            <button
              type="button"
              onClick={handleAmbilLokasi}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-green-700 w-full sm:w-auto"
            >
              {loadingLokasi ? "Mengambil..." : "Ambil Lokasi"}
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-sm sm:text-base">Status Hadir</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm sm:text-base"
            required
          >
            <option value="">-- Pilih Status --</option>
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpha">Alpha</option>
          </select>
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded text-sm sm:text-base hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default DaftarHadir;
