import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    desc: {
      type: String,
      required: [true, "Product description is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    locations: [
      {
        name: {
          type: String,
          enum: ["gulshan", "bahadurabad", "saddar"],
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);

export const Product = model("Product", ProductSchema);
