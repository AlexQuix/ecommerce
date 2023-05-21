import { getTokenCookie } from "../../utils/auth";
import ClientService from "../../services/client";
import useRegisterUser from "./useRegisterUser";

export default function useDataLoader(){
    let { register } = useRegisterUser();

    return async function (){
        try{
            if(!getTokenCookie()) return null;
        
            let data = await ClientService.details();
            if(!data.ok) return null;
            
            register(data.result);
            return data.result;
        }catch(e){
            return null;
        }
    }
}