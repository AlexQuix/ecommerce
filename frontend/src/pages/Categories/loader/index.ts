import CategoryServices from "../../../services/category";

export async function categoryLoader(){
    let data = await CategoryServices.getAll();
    return data.result;
}