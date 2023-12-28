import { DB, DataTypes } from "../SequelizeConfig.js";

export const Alternatif = DB.define('alternatif', {
    nama: {type: DataTypes.STRING, allowNull: false},
    kode_nama: {type: DataTypes.STRING, allowNull: true},
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
}, {
    createdAt: false,
    updatedAt: false
});

await Alternatif.sync();