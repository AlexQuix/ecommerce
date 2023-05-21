import { Router } from "express";
import { requireAuth, assignRoleToLocals } from "../middleware/auth";
import { validate } from "../middleware/validation";
import { valSignin, valLogin } from "../validations/auth";
import { Roles } from "../utils";
import { ClientController, AuthController } from "../controllers";

const BASE_URL = "/api/v1/auth";
const router = Router();

router.post(BASE_URL+"/login", 
    validate(valLogin(), "body"), 
    AuthController.login);

router.post(`${BASE_URL}/signin`, 
    requireAuth(Roles.Admin),
    validate(valSignin(), "body"), 
    assignRoleToLocals(Roles.Admin),
    AuthController.signIn);
    
router.post(`${BASE_URL}/client/signin`, 
    validate(valSignin(), "body"), 
    assignRoleToLocals(Roles.Client),
    ClientController.create);

export default router;