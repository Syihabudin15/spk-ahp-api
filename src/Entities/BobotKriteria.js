import { DB, DataTypes } from "../SequelizeConfig.js";
import { Perhitungan } from "./Perhitungan.js";
import { Kriteria } from "./Kriteria.js";

export const BobotKriteria = DB.define('bobot_kriteria', {
    nilai_rata_rata: {type: DataTypes.FLOAT}
}, {
    updatedAt: false,
    createdAt: false
});

Perhitungan.hasMany(BobotKriteria, {foreignKey: 'id_perhitungan'});
BobotKriteria.belongsTo(Perhitungan);

Kriteria.hasMany(BobotKriteria, {foreignKey: 'id_kriteria'});
BobotKriteria.belongsTo(Kriteria);
await BobotKriteria.sync();