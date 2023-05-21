import { IResult } from "../types/models";
import { getTokenCookie } from "../utils/auth";
import { IProduct } from "./product";
import { IUser } from "./user";

const base = "http://localhost:4000/api/v1";

export interface IProductFromShoppingCart{
    quantity: number;
    product: IProduct;
}

export interface IClient{
    _id?: string;
    user: IUser;
    directions: string[],
    shoping_cart: IProductFromShoppingCart[],
    favorites: IProduct[]
}

export default class ClientService {
    static async details(): Promise<IResult<IClient>> {
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/details", {
          method: "GET",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          }
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
    
  
    static async addDirection(direction:string):Promise<IResult<any>>{
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/directions", {
          method: "PATCH",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          },
          body: JSON.stringify({directions: direction})
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
  
    static async removeDirection(direction:string):Promise<IResult<any>>{
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/directions", {
          method: "DELETE",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          },
          body: JSON.stringify({directions: direction})
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
  
    static async getAllProductFromFavorite():Promise<IResult<IClient>>{
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/favorites", {
          method: "GET",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          }
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
  
    static async addFavorite(productId:string):Promise<IResult<any>>{
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/favorites", {
          method: "PATCH",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          },
          body: JSON.stringify({ productId })
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
  
    static async removeFavorite(productId:string):Promise<IResult<any>>{
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/favorites", {
          method: "DELETE",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          },
          body: JSON.stringify({ productId })
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
  
  
    static async getAllProductFromShoppingCart():Promise<IResult<IClient>>{
      try {
        let token = getTokenCookie();
        let res = await fetch(base + "/clients/shopping_cart", {
          method: "GET",
          headers: {
            "Content-Type": 'application/json',
            "Authentication": encodeURIComponent(`Bearer ${token}`)
          }
        });
  
        return await res.json();
      } catch (error) {
        return {} as any;
      }
    }
    static async addProductToShoppingCart(productId:string, quantity:number):Promise<IResult<any>>{
        try{
            let token = getTokenCookie();
            let res = await fetch(base + "/clients/shopping_cart", {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "Authentication": encodeURIComponent(`Bearer ${token}`)
                },
                body: JSON.stringify({ productId, quantity })
            });
        
            return await res.json();
        }catch(e){
            return {} as any;
        }
    }
    static async removeProductToShoppingCart(productId:string, quantity:number):Promise<IResult<any>>{
        try{
            let token = getTokenCookie();
            let res = await fetch(base + "/clients/shopping_cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authentication": encodeURIComponent(`Bearer ${token}`)
                },
                body: JSON.stringify({ productId, quantity })
            });
        
            return await res.json();
        }catch(e){
            return {} as any;
        }
    }
}