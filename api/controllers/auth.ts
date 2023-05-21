import { Response } from "express";
import { Client, User } from "../models";
import { HttpInternalError, HttpBadRequest, HttpSuccess } from "../handlers/handler";
import { encryptPassword, comparePassword, getToken } from "../helpers/auth";
import { IReqLocals } from "../types";

interface ICreateQuery{
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default class AuthController{
    static async login(req:IReqLocals, res:Response){
        try {
            let {
                userOrEmail,
                password
            } = req.body;

            // verify if the user exists
            let user = await User.findOne({$or: [{username:userOrEmail}, {email:userOrEmail}]});
            if(!user) return HttpBadRequest(res, "The user or the password are incorrect");

            // verify if the password are equal
            let areEqual = await comparePassword(password, user.password as string);
            if(!areEqual) return HttpBadRequest(res, "The user or the password are incorrect");

            let token = getToken({_id: user._id, role: user.role}, "1d");
            HttpSuccess(token, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
    static async signIn(req:IReqLocals, res:Response){
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
            let creatingUser = new User({
                username, 
                email,
                role,
                password: hashPassword
            });

            await creatingUser.save();
            
            // generate token
            let payload = {_id: creatingUser._id, role};
            let token = getToken(payload, "1d");
            HttpSuccess(token, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
}