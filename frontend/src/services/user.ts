import { IResult } from "../types/models";

const base = "http://localhost:4000/api/v1";

export interface IUser{
    _id: string;
    username: string,
    email: string,
}

class UserService{
    async changeUsername(token:string, newUsername:string):Promise<IResult<any>>{
        const res = await fetch(base + "/users/username", {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Authentication": encodeURIComponent(`Bearer ${token}`)
            },
            body: JSON.stringify({username: newUsername})
        });
    
        return await res.json();
    }
}

export default new UserService();