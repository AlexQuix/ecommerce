import { Router } from "express";
import multer from "multer";
import {v4} from "uuid";
import { ProductController } from "../controllers";
import { IMG_FOLDER } from "../controllers/product";
import { verifyProduct, multerIgnoreError } from "../middleware";
import { validate } from "../middleware/validation";
import { validateFilterQuery, validateRemoveImgFromGalleries, validateCreateProduct, validateUpdateProduct, validateProductAddColors, validateProductRemoveColor, validateAddSimilarProduct, validateRemoveSimilarProduct, validateSpecification } from "../validations/product";

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, IMG_FOLDER);
    },
    filename(req, file, cb){
        let filename = `${v4()}.${file.mimetype.match(/\w*$/)?.shift()}`;
        cb(null, filename);
    }
});
const upload = multer({
    storage, 
    fileFilter(req, {mimetype}, cb){
        if(mimetype.match(/((jp(e)?g)|(png)|(gif))$/)?.shift())
            return cb(null, true)
        return cb(null, false);
    }
});

const router:Router = Router();

router.get("/api/v1/products", validate(validateFilterQuery()), ProductController.filter);
router.get("/api/v1/products/:id", ProductController.details);
router.post("/api/v1/products", validate(validateCreateProduct(), "body"), ProductController.create);
router.put("/api/v1/products/:id", validate(validateUpdateProduct(), "body"), ProductController.update);
router.delete("/api/v1/products/:id", ProductController.softDelete);

router.put("/api/v1/products/:id/colors", 
        validate(validateProductAddColors(), "body"), 
        ProductController.addColors);
router.delete("/api/v1/products/:id/colors", 
        verifyProduct,
        validate(validateProductRemoveColor(), "body"), 
        ProductController.removeColors);

router.put("/api/v1/products/:id/similar_product", 
        validate(validateAddSimilarProduct(), "body"), 
        ProductController.addSimilarProducts);
router.delete("/api/v1/products/:id/similar_product", 
        verifyProduct,
        validate(validateRemoveSimilarProduct(), "body"), 
        ProductController.removeSimilarProducts);

router.patch("/api/v1/products/:id/specifications", 
        verifyProduct,
        validate(validateSpecification(), "body"), 
        ProductController.addSpecification);
router.delete("/api/v1/products/:id/specifications", 
        verifyProduct,
        validate(validateSpecification(), "body"), 
        ProductController.removeSpecification);

router.patch("/api/v1/products/:id/main_img", 
        verifyProduct,
        multerIgnoreError(upload.single("img")), 
        ProductController.addMainImg);
        
router.patch("/api/v1/products/:id/galleries", 
        verifyProduct,
        multerIgnoreError(upload.single("img")), 
        ProductController.addImgToGalleries);
router.delete("/api/v1/products/:id/galleries", 
        verifyProduct,
        validate(validateRemoveImgFromGalleries(), "body"), 
        ProductController.removeImgFromGalleries);

export default router;