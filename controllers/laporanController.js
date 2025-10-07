import Laporan from "../Models/laporanModel.js";

const LaporanController = {
  async get(req, res) {
    try {
      const { tanggal, shift } = req.query;
      if (!tanggal && !shift) {
        return res.json({ kegiatan: [], attendance: [] });  // No filter applied, return empty structure
      }
      const result = await Laporan.findAll({ tanggal, shift });
      res.json(result || { kegiatan: [], attendance: [] });
    } catch (err) {
      console.error("Error ambil laporan:", err);
      res.status(500).json({ message: "❌ Gagal ambil laporan", error: err.message });
    }
  },
};

export default LaporanController;
