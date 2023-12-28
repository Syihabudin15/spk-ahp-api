import {ResponseServer} from "./Utils.js";
import { Alternatif } from "../Entities/Alternatif.js";
import { Op } from "sequelize";

export const BuatAlternatif = async (req, res, next) => {
    const {nama, kode_nama} = req.body;
    if(!nama || nama === null){
        return ResponseServer(400, "Nama alternatif wajib diisi", res);
    }
    try{
        const find = await Alternatif.findOne({where: {nama: nama, active: true}});
        if(find){
            return ResponseServer(400, "Alternatif sudah tersedia", res);
        }
        const result = await Alternatif.create({nama, kode_nama});
        await result.save();
        return ResponseServer(201, "Alternatif berhasil dibuat", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const SemuaAlternatif = async (req, res, next) => {
    try{
        const result = await Alternatif.findAll({where: {active: true}});
        return ResponseServer(200, "Semua Alternatif berhasil di dapatkan", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const EditAlternatif = async (req, res, next) => {
    const {id, nama, kode_nama} = req.body;
    if(!id || id === null){
        return ResponseServer(400, "Wajib memasukan parameter id untuk akses ini", res);
    }
    try{
        const find = await Alternatif.findOne({where: {id: id}});
        if(!find || find === null){
            return ResponseServer(404, "Alternatif tidak ditemukan", res);
        }
        find.nama = nama ? nama : find.nama;
        find.kode_nama = kode_nama ? kode_nama : find.kode_nama;
        await find.save();
        return ResponseServer(200, "Edit data alternatif berhasil", res);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const HapusAlternatif = async (req, res, next) => {
    const id = req.params.id;
    if(!id || id === null){
        return ResponseServer(400, "Wajib memasukan parameter id untuk akses ini", res);
    }
    try{
        const find = await Alternatif.findOne({where: {id: id}});
        if(!find || find === null){
            return ResponseServer(404, "Alternatif tidak ditemukan", res);
        }
        find.active = false;
        await find.save();
        return ResponseServer(200, "Alternatif berhasil dihapus", res);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const AlternatifById = async (req, res, next) => {
    const id = req.params.id;
    try{
        const find = await Alternatif.findOne({where: {id: id}});
        if(!find || find === null){
            return ResponseServer(404, "Alternatif tidak ditemukan", res);
        }
        return ResponseServer(200, "berhasil",res, find);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const CariAlternatif = async (req, res, next) => {
    const nama = req.query.nama;
    try{
        const result = await Alternatif.findAll({where: {nama: {[Op.like]: `%${nama}%`}}});
        return ResponseServer(200, "berhasil", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}