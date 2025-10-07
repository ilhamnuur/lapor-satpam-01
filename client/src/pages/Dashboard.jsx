import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar di atas */}
      <Navbar />

      {/* Isi halaman utama: Daftar Hadir - Responsive */}
      <div className="p-4 sm:p-6 flex-1 bg-gray-50">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Dashboard / Daftar Hadir</h2>

        <form className="bg-white shadow rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Nama Satpam
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="w-full border rounded p-2 text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Shift
            </label>
            <select className="w-full border rounded p-2 text-sm sm:text-base">
              <option>Pagi</option>
              <option>Siang</option>
              <option>Malam</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Tanggal
            </label>
            <input type="date" className="w-full border rounded p-2 text-sm sm:text-base" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
