import { Router } from "express";
import { addProduct, getSingleProduct } from "../controllers/product.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/", verifyAuth, upload.single("image"), addProduct);
router.get("/:id", verifyAuth, getSingleProduct);
router.post('/verify-location', verifyAuth, (req, res) => {
    res.status(200).json({
        message: 'Location verified',
        locationId: 2
    })
})

export default router;
