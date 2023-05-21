import fs from "fs";

export async function removeFileAsync(path:string):Promise<boolean>{
    function _promise(){
        return new Promise((res, rej)=>{
            fs.unlink(path, (err)=>{
                if(err) return rej(err);
                res(true);
            })
        })
    }

    try{
        await _promise();
        return true;
    }catch(err){
        return false;
    }
}
export async function existFileAsync(path:string){
    function _promise(){
        return new Promise((res, rej)=>{
            fs.access(path, fs.constants.F_OK, (err)=>{
                if(err) return rej(false);
                res(true);
            })
        });
    }

    try{
        await _promise();
        return true;
    }catch(err){
        return false;
    }
}