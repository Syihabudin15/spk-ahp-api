import { DataTypes } from "sequelize";
import { DB } from "../SequelizeConfig.js";

export const Perhitungan = DB.define('perhitungan', {
    nama: {type: DataTypes.STRING, allowNull: false},
    deskripsi: {type: DataTypes.STRING, allowNull: false},
    selesai: {type: DataTypes.BOOLEAN, defaultValue: false},
    tanggal: {type: DataTypes.DATE, allowNull: true}
},{
    createdAt: false,
    updatedAt: false
});


await Perhitungan.sync();