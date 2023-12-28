import { ResponseServer } from "./Utils.js";
import { BobotAlternatif } from "../Entities/BobotAlternatif.js";
import { UpdateStatus } from "./PerhitunganService.js";
import { DB } from "../SequelizeConfig.js";

export const BuatBobotAlternatif = async (req, res, next) => {
    const { id_perhitungan, datas } = req.body;
    const t = await DB.transaction();
    try{
        const find = await BobotAlternatif.findOne({where: {id_perhitungan: id_perhitungan}});
        if(find){
            return ResponseServer(400, "Bobot alternatif untuk perhitungan ini sudah tersedia", res);
        }
        if(!datas){
            return ResponseServer(400, "Mohon masukan data", res)
        }
        const result = await datas && datas.map(async (e) => {
            e.data.forEach(async (d) => {
                const saved = await BobotAlternatif.create({
                    id_perhitungan: id_perhitungan,
                    id_kriteria: e.id_kriteria,
                    id_alternatif: d.id_alternatif,
                    nilai_rata_rata: parseFloat(d.nilai_rata_rata)
                }, {t}); 
                await saved.save();
            });
            return e;
        })
        await UpdateStatus(id_perhitungan, res);
        await t.commit();
        return ResponseServer(201, "Bobot alternatif berhasil disimpan. silahkan lihat hasil perhitungan di menu Perhitungan", res, result);
    }catch(err){
        console.log(err);
        t.rollback();
        return ResponseServer(500, "Server Error", res);
    }
}

export const BobotAlternatifByIdPerhitungan = async (id_perhitungan, respon) => {
    const result = await BobotAlternatif.findAll({where: {id_perhitungan: id_perhitungan}});
    return result;
}

export const CekBobotAlternatif = async (req, res, next) => {
    const id = req.params.id;
    try{
        const find = await BobotAlternatif.findOne({where: {id_perhitungan: id}});
        if(find){
            return ResponseServer(400, "Data Bobot Alternatif Tersedia", res);
        }
        return ResponseServer(200, "Data Bobot Alternatif tidak tersedia", res);
    }catch(err){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}