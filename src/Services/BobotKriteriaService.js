import { ResponseServer } from "./Utils.js";
import {BobotKriteria} from "../Entities/BobotKriteria.js";
import { Perhitungan } from "../Entities/Perhitungan.js";
import { Kriteria } from "../Entities/Kriteria.js";
import { DB } from "../SequelizeConfig.js";

export const BuatBobotKriteria = async (req, res, next) => {
    const {id_perhitungan, data} = req.body;
    const t = await DB.transaction();
    try{
        if(!data || data.length === 0 || !id_perhitungan || id_perhitungan === null){
            return ResponseServer(400, "Mohon lengkapi data perhitungan", res);
        }
        const detail = await Perhitungan.findOne({where: {id: id_perhitungan}});
        
        const result = [];
        for(let i = 0; i < data.length; i ++){
            const find = await BobotKriteria.findOne({where: {id_perhitungan: id_perhitungan}});
            if(find){
                return ResponseServer(400, "Bobot Kriteria untuk Perhitungan ini sudah tersedia", res);
            }
            const kriteria = await Kriteria.findOne({where: {id: data[i].id_kriteria}});
            result.push({id_perhitungan: detail.id, id_kriteria: kriteria.id, nilai_rata_rata: parseFloat(data[i].nilai_rata_rata)});
        }
        const saved = await BobotKriteria.bulkCreate(result, {t});
        await t.commit();
        return ResponseServer(201, "Bobot Kriteria berhasil dibuat", res);
    }catch(err){
        console.log(err);
        t.rollback();
        return ResponseServer(500, "Server Error", res);
    }
}

export const CekBobotKriteria = async (req, res, next) => {
    const id = req.params.id;
    try{
        const find = await BobotKriteria.findOne({where: {id_perhitungan: id}});
        if(find){
            return ResponseServer(400, "Data bobot kriteria perhitungan ini sudah tersedia", res, find);
        }
        return ResponseServer(200, "Data Bobot Kriteria tidak tersedia", res, find);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const BobotKriteriaByIdPerhitungan = async (id_perhitungan, respon) => {
    // const result = await BobotKriteria.find({id_perhitungan: id_perhitungan});
    const result = await BobotKriteria.findAll({where: {id_perhitungan: id_perhitungan}});
    return result;
}