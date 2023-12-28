import { DB, DataTypes } from "../SequelizeConfig.js";
import { Perhitungan } from "./Perhitungan.js";
import { Kriteria } from "./Kriteria.js";
import { Alternatif } from "./Alternatif.js";

export const BobotAlternatif = DB.define('bobot_alternatif', {
    nilai_rata_rata: {type: DataTypes.FLOAT}
},{
    createdAt: false,
    updatedAt: false
})

Perhitungan.hasMany(BobotAlternatif, {foreignKey: "id_perhitungan"});
BobotAlternatif.belongsTo(Perhitungan);

Kriteria.hasMany(BobotAlternatif, {foreignKey: "id_kriteria"});
BobotAlternatif.belongsTo(Kriteria);

Alternatif.hasMany(BobotAlternatif, {foreignKey: "id_alternatif"});
BobotAlternatif.belongsTo(Alternatif);

await BobotAlternatif.sync();