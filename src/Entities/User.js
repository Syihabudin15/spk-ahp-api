import { DB, DataTypes } from "../SequelizeConfig.js";

export const User = DB.define('user', {
    nama: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
},{
    createdAt: false,
    updatedAt: false
});

await User.sync();