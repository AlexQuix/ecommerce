import { Request, Response } from "express";
import { HttpBadRequest, HttpInternalError, HttpSuccess, HttpSuccessOperation } from "../handlers/handler";
import { User } from "../models";
import { IReqLocals } from "../types";


export default class UserController{
    static async filter(req:Request, res:Response){
        try{
            let data = await User.find({deleted:false},
                                {__v: 0, deleted: 0, password: 0},
                                {limit:20});
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    static async details(req:IReqLocals, res:Response){
        try{
            let id = req.locals?.user?._id;
            let data = await User.findOne({_id:id, deleted:false}, 
                            {__v:0, deleted:0, password: 0, created_date:0, role:0});
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    static async updateUsername(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;
            let {username} = req.body as {username:string};

            // find the user
            let user = await User.findOne({_id:id});
            if(!user) return HttpBadRequest(res, "the user was not found");

            // update the username
            user.username = username;
            await user.save();
            
            HttpSuccessOperation(res);
        } catch (error) {
            HttpInternalError(res);
        }
    }
    static async softDelete(req:IReqLocals, res:Response){
        try {
            let id = req.locals?.user?._id;

            // find the user
            let user = await User.findOne({_id:id});
            if(!user) return HttpBadRequest(res, "the user was not found");

            // delete the user
            user.deleted = true;
            await user.save();

            HttpSuccessOperation(res);
        } catch (error) {
            HttpInternalError(res);
        }
    }
}