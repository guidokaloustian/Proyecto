import mongoose from "mongoose";

const cartsSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    {
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  default: [],
});

cartsSchema.pre("find", function (next) {
  this.populate("products");
  next();
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
