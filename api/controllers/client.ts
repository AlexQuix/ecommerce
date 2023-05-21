import { Response } from "express";
import { HttpBadRequest, HttpInternalError, HttpSuccess, HttpSuccessOperation } from "../handlers/handler";
import { Client, User } from "../models";
import { IReqLocals } from "../types";
import { encryptPassword, getToken } from "../helpers/auth";

interface IBodyDirection{
    directions: string;
}

interface ICreateQuery{
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default class ClientController{
    static async filter(req:IReqLocals, res:Response){
        try{
            let data = await Client.find({}, {__v:0});
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    static async details(req:IReqLocals, res:Response){
        try{
            let id = req.locals?.user?._id;
            let data = await Client.findOne({user:id}, 
                                {__v:0, deleted:0})
                            .populate("user", {__v: 0, deleted: 0, password: 0, created_date:0, role: 0});
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }

    static async create(req:IReqLocals, res:Response){
        try {
            let {
                username,
                password,
                confirm_password,
                email
            } = req.body as ICreateQuery;
            let role = req.locals?.role;

            // validate if the password are different
            if(password !== confirm_password)
                return HttpBadRequest(res, "passwords do not match");

            // find the user
            let user = await User.findOne({$or: [{username}, {email}]});
            if(user) return HttpBadRequest(res, "the username or email is already taken");

            // encrypt password
            let hashPassword = await encryptPassword(password);
            if(!hashPassword) return HttpBadRequest(res);

            // create an new user
            let createUser = await new User({
                username, 
                email,
                role,
                password: hashPassword
            }).save();

            let creatingClient = new Client({user: createUser._id});
            await creatingClient.save();
            
            // generate token
            let payload = {_id: createUser._id, role};
            let token = getToken(payload, "1d");
            HttpSuccess(token, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }

    static async addDirection(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {directions} = req.body as IBodyDirection;

            // find the client
            let p = await Client.findOne({user:id});
            if(!p) return HttpBadRequest(res, "the user was not found");

            // update the direction
            p.directions.push(directions);
            await p.save();

            HttpSuccessOperation(res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
    static async removeDirection(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {directions} = req.body as IBodyDirection;

            // find the client
            let c = await Client.findOne({user:id});
            if(!c) return HttpBadRequest(res, "the user was not found");

            // update the direction
            await Client.updateOne({user:id}, {$pull: {directions}});
            HttpSuccessOperation(res);
        } catch (e) {
            HttpInternalError(res);
        }
    }   


    static async getAllProductsFromShoppingCart(req:IReqLocals, res:Response) {
        try {
          let id = req.locals?.user?._id;
      
          // find the client
          let c = await Client.findOne({user:id}).populate('shoping_cart.product');
          if(!c) return HttpBadRequest(res, "the user was not found");

          HttpSuccess(c, res);
        } catch (e) {
          HttpInternalError(res);
        }
    }
    static async addProductToShoppingCart(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {productId, quantity} = req.body;

            // find the client
            let c = await Client.findOne({user:id});
            if(!c) return HttpBadRequest(res, "the user was not found");

            // let filter = c.shoping_cart.filter(p=> increaseQuantity(p, productId!, quantity!));

            let pushNewProduct = true;
            // increase the quantity of an existing product
            for await (let p of c.shoping_cart){
                // if ids are different skip the next steps
                if(`${p.product}` !== productId) continue;

                // increase the quantity and save update the changes
                p.quantity += quantity;
                await c.save();
                pushNewProduct = false;
            }

            // if the variable is true, push the product to shopping cart
            if(pushNewProduct){
                await Client.updateOne({user:id}, {$push: {shoping_cart: {product:productId, quantity}}});
            }

            HttpSuccessOperation(res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
    static async removeProductFromShoppingCart(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {productId, quantity} = req.body;

            // find the client
            let c = await Client.findOne({user:id});
            if(!c) return HttpBadRequest(res, "the user was not found");

            // reduce the quantity of an existing product
            for await (let p of c.shoping_cart) {
                // if ids are different skip the next steps
                if(`${p.product}` !== productId) continue;

                // if the reduces quantity is less than 0
                // the product will be deleted from the shopping cart
                if((p.quantity - quantity) <= 0){
                    await Client.updateOne({user:id}, {$pull: {shoping_cart: p}});
                    continue;
                }
                
                // reduce the quantity and save update the changes
                p.quantity -= quantity;
                await c.save();
            }

            HttpSuccessOperation(res);
        } catch (e) {
            HttpInternalError(res);
        }
    }


    static async getAllProductsFromFavorite(req:IReqLocals, res:Response) {
        try {
          let id = req.locals?.user?._id;
      
          // find the client
          let c = await Client.findOne({user:id}).populate('favorites');
          if(!c) return HttpBadRequest(res, "the user was not found");

          HttpSuccess(c, res);
        } catch (e) {
          HttpInternalError(res);
        }
    }
    static async addProductToFavorites(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {productId} = req.body;

            // find the client
            let c = await Client.findOne({user:id});
            if(!c) return HttpBadRequest(res, "the user was not found");

            // push the product to favorite if it has not been previously added
            let hasAdded = c.favorites.some(p=> `${p}` === productId);
            if(!hasAdded){
                c.favorites.push(productId);
                await c.save();
            }

            HttpSuccessOperation(res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
    static async removeProductFromFavorites(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {productId} = req.body;

            // find the client
            let c = await Client.findOne({user:id});
            if(!c) return HttpBadRequest(res, "the user was not found");

            // remove the product from favorite if it has been previously added
            let hasAdded = c.favorites.some(p=> `${p}` === productId);
            if(hasAdded){
                await Client.updateOne({user:id}, {$pull: {favorites: productId}});
            }

            HttpSuccessOperation(res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
}