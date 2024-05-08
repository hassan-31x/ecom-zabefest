import { Router } from "express";
import { addProduct, getSingleProduct } from "../controllers/product.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/", verifyAuth, upload.single("image"), addProduct);
router.get("/:id", verifyAuth, getSingleProduct);
router.post("/verify-location", verifyAuth, (req, res) => {
  //? change these 2 to come from database
  const branchLat = 0;
  const branchLng = 0;
  console.log(req.body)

  const { Lat, Lng, Acc } = req.body;
  if (Math.abs(Lat - branchLat) <= Acc && Math.abs(Lng - branchLng) <= Acc) {
    return res.status(200).json({
      message: "Location verified",
      locationId: 1,
    });
  } else {
    return res.status(400).json({
      message: "Location not verified",
    });
  }
});

export default router;
