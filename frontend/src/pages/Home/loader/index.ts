import ClientService from "../../../services/client";

export async function homeLoader(){
    try{
        let res = await ClientService.details();
        return res.result;
    }catch(e){
        console.error(e);
    }
}