import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";
import { uploadFile } from "../utils/fileUpload.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, desc, price, locations } = req.body;

    if (!name) return next("Product name is required");
    if (!desc) return next("Product description is required");
    if (!price) return next("Product price is required");
    if (!locations) return next("Product location is required");

    let image = null;
    if (req.file) {
      const imageLocalPath = req.file?.path;
      image = await uploadFile(imageLocalPath);
    }
    console.log(image);
    const product = await Product.create({
      createdBy: req.user._id,
      name,
      desc,
      price,
      locations,
      image: image.public_id,
    });

    if (!product) return next("Failed to create the product");

    return res.status(200).json({
      success: true,
      message: "Product added",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.param;

    const product = await Product.findById(id)
      .populate({
        path: "createdBy",
        model: User,
        select: "name email",
      })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Product fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyProduct = async (req, res, next) => {
  try {
    const { id } = req.param;
    const { userLoc } = req.body;
    if (!userLoc) return next("Please provide user location");

    const product = await Product.findById(id)
      .populate({
        path: "createdBy",
        model: User,
        select: "name email",
      })
      .lean();

    const store = product.locations.find(
      (location) => location.name === userLoc
    );

    if (store.stock <= 0) {
      return next("Product is out of stock");
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
