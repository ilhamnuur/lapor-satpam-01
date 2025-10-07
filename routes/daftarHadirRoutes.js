import express from "express";
import { createDaftarHadir, getAllDaftarHadir, reverseGeocode } from "../controllers/DaftarHadirController.js";

const router = express.Router();

// POST create daftar hadir
router.post("/create", createDaftarHadir);

// GET all daftar hadir with optional filter
router.get("/", getAllDaftarHadir);

// POST reverse geocoding proxy to avoid CORS
router.post("/reverse-geocode", reverseGeocode);

export default router;
