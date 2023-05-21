import { IResult } from "../types/models";

export interface IUser{
    _id: string;
    username: string,
    email: string,
}

class UserService{
    async changeUsername(token:string, newUsername:string):Promise<IResult<any>>{
        const res = await fetch("/api/v1/users/username", {
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

const userService = new UserService();
export default userService;