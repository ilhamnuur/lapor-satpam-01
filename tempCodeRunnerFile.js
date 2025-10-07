const express = require("express");
const cors = require("cors");
require("dotenv").config();

const daftarHadirRoutes = require("./routes/daftarHadirRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // wajib

app.use("/daftar-hadir", daftarHadirRoutes);

app.get("/", (req, res) => res.send("API Daftar Hadir aktif 🚀"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
