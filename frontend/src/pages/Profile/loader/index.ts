import ClientService from "../../../services/client";

export async function profileLoader(){
    let data = await ClientService.details();
    if(!data.ok) return null;

    return data.result;
}