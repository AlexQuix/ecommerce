import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validation";
import { Roles } from "../utils";
import { valBodyDirection, valShoppicart, valFavorite } from "../validations/client";
import ClientController from "../controllers/client";

const BASE_URL = "/api/v1/clients";
const router = Router();

router.get(BASE_URL, requireAuth(Roles.Admin), ClientController.filter);
router.get(`${BASE_URL}/details`, requireAuth(Roles.Client), ClientController.details);

router.patch(`${BASE_URL}/directions`, requireAuth(Roles.Client), validate(valBodyDirection(), "body"), ClientController.addDirection);
router.delete(`${BASE_URL}/directions`, requireAuth(Roles.Client), validate(valBodyDirection(), "body"), ClientController.removeDirection);

router.get(BASE_URL+"/shopping_cart", requireAuth(Roles.Client), ClientController.getAllProductsFromShoppingCart)
router.patch(`${BASE_URL}/shopping_cart`, requireAuth(Roles.Client), validate(valShoppicart(), "body"), ClientController.addProductToShoppingCart);
router.delete(`${BASE_URL}/shopping_cart`, requireAuth(Roles.Client), validate(valShoppicart(), "body"), ClientController.removeProductFromShoppingCart);

router.get(BASE_URL+"/favorites", requireAuth(Roles.Client), ClientController.getAllProductsFromFavorite)
router.patch(`${BASE_URL}/favorites`, requireAuth(Roles.Client), validate(valFavorite(), "body"), ClientController.addProductToFavorites);
router.delete(`${BASE_URL}/favorites`, requireAuth(Roles.Client), validate(valFavorite(), "body"), ClientController.removeProductFromFavorites);

export default router;