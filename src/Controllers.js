import Express from "express";
import { BuatKriteria, CariKriteria, EditKriteria, HapusKriteria, KriteriaById, SemuaKriteria } from "./Services/KriteriaService.js";
import { AlternatifById, BuatAlternatif, CariAlternatif, EditAlternatif, HapusAlternatif, SemuaAlternatif } from "./Services/AlternatifService.js";
import { BuatPerhitungan, CariPerhitungan, LihatHasil, SemuaPerhitungan } from "./Services/PerhitunganService.js";
import { BuatBobotKriteria, CekBobotKriteria } from "./Services/BobotKriteriaService.js";
import { BuatBobotAlternatif, CekBobotAlternatif } from "./Services/BobotAlternatifService.js";
import { BuatUser, GantiPassword, Login } from "./Services/UserService.js";


const Routers = Express.Router();
// User
Routers.post("/login", Login);
Routers.post("/buat-user", BuatUser);
Routers.patch("/ganti-password", GantiPassword);
// // Kriteria
Routers.post("/buat-kriteria", BuatKriteria);
Routers.get("/semua-kriteria", SemuaKriteria);
Routers.patch("/edit-kriteria", EditKriteria);
Routers.delete("/hapus-kriteria/:id", HapusKriteria);
Routers.get("/kriteria-by-id/:id", KriteriaById);
Routers.get('/cari-kriteria', CariKriteria);
// // Alternatif
Routers.post("/buat-alternatif", BuatAlternatif);
Routers.get("/semua-alternatif", SemuaAlternatif);
Routers.patch("/edit-alternatif", EditAlternatif);
Routers.delete("/hapus-alternatif/:id", HapusAlternatif);
Routers.get("/alternatif-by-id/:id", AlternatifById);
Routers.get("/cari-alternatif", CariAlternatif);
// // Perhitungan
Routers.post("/buat-perhitungan", BuatPerhitungan);
Routers.get("/semua-perhitungan", SemuaPerhitungan);
Routers.get("/lihat-hasil-perhitungan/:id", LihatHasil);
Routers.get("/cari-perhitungan", CariPerhitungan);
// // Bobot Kriteri
Routers.post("/buat-bobot-kriteria", BuatBobotKriteria);
Routers.get("/cek-bobot-kriteria/:id", CekBobotKriteria);
// // Bobot Alternatif
Routers.post("/buat-bobot-alternatif", BuatBobotAlternatif);
Routers.get("/cek-bobot-alternatif/:id", CekBobotAlternatif);

export default Routers;