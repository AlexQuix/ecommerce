import {Router} from "express";
import CategoryController from "../controllers/category";
import { validate } from "../middleware/validation";
import { validateCategory, validateQuery } from "../validations/category";

const router:Router = Router();

router.get("/api/v1/categories", validate(validateQuery()), CategoryController.filter);
router.get("/api/v1/categories/:id", CategoryController.findById);
router.post("/api/v1/categories", validate(validateCategory(), "body"), CategoryController.create);
router.put("/api/v1/categories/:id", validate(validateCategory(), "body"), CategoryController.update);

export default router;