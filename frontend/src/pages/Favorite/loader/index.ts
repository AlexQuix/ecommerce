import ClientService from "../../../services/client";

export async function favoriteLoader(){
    let res = await ClientService.getAllProductFromFavorite();
    if(!res.ok) return null;

    return res.result.favorites;
}