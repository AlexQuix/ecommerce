import { Router } from "express";
import ColorControler from "../controllers/color";
import {validate} from "../middleware/validation";
import {validateColor, validateQuery} from "../validations/color";

const BASE_URL = "/api/v1/colors";
const router = Router();

router.get(BASE_URL, validate(validateQuery()), ColorControler.filter);
router.get(`${BASE_URL}/:id`, ColorControler.findById)
router.post(BASE_URL, validate(validateColor(), "body"), ColorControler.create);
router.put(`${BASE_URL}/:id`, validate(validateColor(), "body"), ColorControler.update);

export default router;