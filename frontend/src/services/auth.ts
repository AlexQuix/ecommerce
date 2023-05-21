import { IResult } from "../types/models";
import { setTokenCookie } from "../utils/auth";

export interface ILoginBody{
    userOrEmail: string;
    password: string;
}
export interface ISignUpClient{
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

const base = "http://localhost:4000/api/v1";

class AuthService {
    async login(user:ILoginBody):Promise<IResult<string>> {
        let res = await fetch(base + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let data = await res.json() as IResult<string>;
        if(data.ok)
            setTokenCookie(data.result);

        return data;
    }
  
    async signUp(client: ISignUpClient):Promise<IResult<string>> {
        const res = await fetch(base + '/auth/client/signin', {
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = await res.json() as IResult<string>;
        if(data.ok){
            setTokenCookie(data.result);
        }
        
        return data;
    }
}

export default new AuthService();