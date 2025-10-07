import express from "express";
import LaporanController from "../controllers/laporanController.js";

const router = express.Router();

router.get("/", LaporanController.get);

export default router;
