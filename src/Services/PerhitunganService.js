import { ResponseServer } from "./Utils.js"
import {Perhitungan} from "../Entities/Perhitungan.js";
import { BobotKriteriaByIdPerhitungan } from "./BobotKriteriaService.js";
import { BobotAlternatifByIdPerhitungan } from "./BobotAlternatifService.js";
import { Alternatif } from "../Entities/Alternatif.js";
import { Op } from "sequelize";

export const BuatPerhitungan = async (req, res, next) => {
    const {nama, deskripsi} = req.body;
    try{
        const find = await Perhitungan.findOne({where: {nama}});
        if(find){
            return ResponseServer(400, "Perhitungan sudah tersedia", res);
        }
        const result = await Perhitungan.create({nama, deskripsi});
        await result.save();
        return ResponseServer(201, "Perhitungan berhasil dibuat", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const SemuaPerhitungan = async (req, res, next) => {
    try{
        const result = await Perhitungan.findAll();
        return ResponseServer(200, "berhasil", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const LihatHasil = async (req, res, next) => {
    const id = req.params.id;
    try{
        const kriteria = await BobotKriteriaByIdPerhitungan(id, res);
        const alternatif = await BobotAlternatifByIdPerhitungan(id, res);
        const perhitungan = await Perhitungan.findOne({where: {id: id}});
        if(!alternatif || !kriteria || !perhitungan){
            return ResponseServer(404, "Data Tidak ditemukan");
        }
        const alter = alternatif.filter((v,i,a) => a.findIndex(v2 => (v2.id_alternatif === v.id_alternatif)) === i);
        const alterForKriteria = [];
        for(let i = 0; i < alter.length; i++){
            const find = await Alternatif.findOne({where: {id: alter[i].id_alternatif}});
            let jmlh = 0.00;
            let obj = {nama_alternatif: find.nama};
            const krit = kriteria.map(k => {
                const alt = alternatif.filter(a => (a.id_alternatif === alter[i].id_alternatif) && (a.id_kriteria === k.id_kriteria));
                console.log("alt nilai rata rata",k.nilai_rata_rata)
                const jumlah = parseFloat(alt[0].nilai_rata_rata) * parseFloat(k.nilai_rata_rata);
                jmlh += parseFloat(jumlah);
                obj[k.id_kriteria] = Math.round(jumlah*100)/100;
            })
            obj['jumlah'] = Math.round(jmlh*100)/100;
            alterForKriteria.push(obj);
        }
        return ResponseServer(200, "berhasil", res, {
            nama_perhitungan: perhitungan.nama,
            tanggal: perhitungan.tanggal.toLocaleDateString(),
            result: alterForKriteria
        });
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const UpdateStatus = async (id, respon) => {
    const result = await Perhitungan.findOne({where: {id}});
    if(!result || result === null){
        return ResponseServer(404, "Perhitungan tidak ditemukan", respon);
    }
    result.selesai = true;
    result.tanggal = new Date();
    await result.save();
    return result;
}


export const CariPerhitungan = async (req, res, next) => {
    const nama = req.query.nama;
    console.log(nama);
    try{
        const result = await Perhitungan.findAll({where: {nama: {[Op.like]: `%${nama}%`}}});
        console.log(result);
        return ResponseServer(200, "berhasil", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}