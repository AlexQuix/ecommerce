import { Router } from "express";
import UserController from "../controllers/user";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validation";
import { Roles } from "../utils";
import { valUpdateUsername } from "../validations/user";

const BASE_URL = "/api/v1/users";
const router = Router();

router.get(BASE_URL, requireAuth(Roles.Admin), UserController.filter);
router.get(`${BASE_URL}/details`, requireAuth(Roles.Admin), UserController.details)
router.delete(`${BASE_URL}`, requireAuth(Roles.Admin), UserController.softDelete);
router.patch(`${BASE_URL}/username`, requireAuth(Roles.Client), validate(valUpdateUsername(), "body"), UserController.updateUsername);

export default router;