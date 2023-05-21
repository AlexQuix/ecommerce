import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function encryptPassword(password:string):Promise<null | string>{
    try{
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }catch(e){
        return null;
    }
}

export async function comparePassword(password:string, encrypedPassword:string):Promise<boolean>{
    try{
        return await bcrypt.compare(password, encrypedPassword);
    }catch(e){
        return false;
    }
}

export function getToken(data:any, expiresIn:string = "1h"){
    return jwt.sign(data, process.env.AUTH_SECRET_KEY as string, {expiresIn});
}

export function parseToken(token:string){
    return jwt.verify(token, process.env.AUTH_SECRET_KEY as string);
}