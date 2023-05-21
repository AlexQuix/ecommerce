import { getTokenCookie } from "../../../../utils/auth";
import { AlertType } from "../../../../components/Alert";
import UserService from "../../../../services/user";

import ModalForm from "../../components/ModalForm";

type Props = {
    username: string;
    alert: (message:string, type:AlertType)=>void
}

export default function Username({ username, alert }:Props){
    return (
        <ModalForm title="Username" 
                    formTitle="Write your new Username"
                    value={username as string} 
                    onSubmit={async ({value})=>{
                        let token = getTokenCookie();
                        let res = await UserService.changeUsername(token as string, value);
                        let type:AlertType = res.ok ? "success" : "danger";
                        
                        alert(res.message, type);
                    }}/>
    )
}