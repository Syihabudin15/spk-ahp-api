import { DataTypes } from "sequelize";
import { DB } from "../SequelizeConfig.js";

export const Kriteria = DB.define('kriteria', {
    nama: {type: DataTypes.STRING, allowNull: false},
    kode_nama: {type: DataTypes.STRING, allowNull: true},
    deskripsi: {type: DataTypes.STRING, allowNull: false},
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
},{
    createdAt: false,
    updatedAt: false
});
await Kriteria.sync();