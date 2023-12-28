import { Sequelize, DataTypes } from "sequelize";

const DB = new Sequelize('siska_madya', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});


export {DB, DataTypes};