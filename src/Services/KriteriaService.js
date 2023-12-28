import { Kriteria } from "../Entities/Kriteria.js";
import { ResponseServer } from "./Utils.js";
import { Op } from "sequelize";

export const BuatKriteria = async (req, res, next) => {
    const {nama, kode_nama, deskripsi} = req.body;
    if(!nama  || !deskripsi){
        return ResponseServer(400, "Mohon isi semua kolom", res);
    }
    try{
        const findbyNama = await Kriteria.findOne({where: {nama, active: true}});
        if(findbyNama){
            return ResponseServer(404, "Kriteria sudah tersedia", res);
        }
        const result = await Kriteria.create({nama, kode_nama: kode_nama ? kode_nama : null, deskripsi, active: true});
        await result.save();
        return ResponseServer(201, "Kriteria berhasil dibuat", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const SemuaKriteria = async (req, res, next) => {
    try{
        const find = await Kriteria.findAll({where: {active: true}});
        return ResponseServer(200, "Berhasil dapatkan data", res, find);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const EditKriteria = async (req, res, next) => {
    const {id, nama, kode_nama, deskripsi} = req.body;
    try{
        const find = await Kriteria.findOne({where: {id}});
        if(!find){
            return ResponseServer(404, "Kriteria tidak ditemukan!", res);
        }
        find.nama = nama ? nama : find.nama;
        find.deskripsi = deskripsi ? deskripsi : find.deskripsi;
        find.kode_nama = kode_nama ? kode_nama : find.kode_nama;
        await find.save();
        return ResponseServer(200, "Data berhasil di edit", res, find);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const HapusKriteria = async (req, res, next) => {
    const id = req.params.id;
    try{
        const find = await Kriteria.findOne({where: {id}});
        if(!find || find === null){
            return ResponseServer(404, "Kriteria tidak ditemukan", res);
        }
        find.active = false;
        await find.save();
        return ResponseServer(200, "Kriteria berhasil dihapus", res, find);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const KriteriaById = async (req, res, next) => {
    const id = req.params.id;
    try{
        const find = await Kriteria.findOne({where: {id}});
        if(!find || find === null){
            return ResponseServer(404, "Kriteria tidak ditemukan", res)
        }
        return ResponseServer(200, "berhasil", res, find);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const CariKriteria = async (req, res, next) => {
    const nama = req.query.nama;
    try{
        const result = await Kriteria.findAll({where: {nama: {[Op.like]: `%${nama}%`}}});
        console.log(result);
        return ResponseServer(200, "berhasil", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}