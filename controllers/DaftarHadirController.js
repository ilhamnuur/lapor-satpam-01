import { create, findAll } from "../Models/DaftarHadirModel.js";

export const createDaftarHadir = async (req, res) => {
  try {
    const { tanggal, shift, nama, lokasi, status } = req.body;

    if (!tanggal || !shift || !nama || !status) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    const newData = await create({ tanggal, shift, nama, lokasi, status });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDaftarHadir = async (req, res) => {
  try {
    const { tanggal, shift } = req.query;
    const data = await findAll({ tanggal, shift });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Proxy for reverse geocoding to avoid CORS
export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
      return res.status(400).json({ message: "Lat and lng are required" });
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: {
          'User-Agent': 'LaporanSatpamBPS/1.0'  // Nominatim requires User-Agent
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const alamat = data.display_name || `${lat}, ${lng}`;
    res.json({ alamat });
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    res.status(500).json({ message: "Gagal mengambil alamat", error: error.message });
  }
};
