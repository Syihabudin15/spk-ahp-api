import { User } from "../Entities/User.js";
import { ResponseServer } from "./Utils.js";
import bcryptjs from "bcryptjs";


export const BuatUser = async (req, res, next) => {
    const {nama, username, password} = req.body;
    if(!username || !password || !nama || username === null || password === null || nama === null){
        return ResponseServer(400, "Mohon masukan nama, username dan password", res);
    }
    try{
        const hash = await bcryptjs.hash(password, 10);
        console.log(hash);
        const result = await User.create({nama, username, password: hash});
        await result.save();
        return ResponseServer(201, "Admin berhasil ditambahkan", res, result);
    }catch(err){
        console.log(err);
        return ResponseServer(400, "Username sudah digunakan", res);
    }
}

export const Login = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const find = await User.findOne({where: {username}});
        if(!find || find === null){
            return ResponseServer(401, "Username atau Password Salah", res);
        }
        const compare = await bcryptjs.compare(password, find.password);
        if(!compare){
            return ResponseServer(401, "Username atau Password Salah", res);
        }
        return ResponseServer(200, "Berhasil Login", res, find);
    }catch(er){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}

export const GantiPassword = async (req, res, next) => {
    const {id, password, new_password} = req.body;
    try{
        const find = await User.findOne({where: {id: id}});
        if(!find || find === null){
            return ResponseServer(404, "User tidak ditemukan. mohon login", res);
        }
        const compare = await bcryptjs.compare(password, find.password);
        const compareNew = await bcryptjs.compare(new_password, find.password);
        if(!compare){
            return ResponseServer(401, "Password yang anda masukan salah", res);
        }
        if(compareNew){
            return ResponseServer(400, "Mohon jangan gunakan password yang sudah dipakai sebelumnya", res);
        }
        const hash = await bcryptjs.hash(new_password, 10);
        find.password = hash;
        await find.save();
        return ResponseServer(200, "Ganti password berhasil", res);
    }catch(er){
        console.log(err);
        return ResponseServer(500, "Server Error", res);
    }
}