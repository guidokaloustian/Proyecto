import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 30
  },
  description: {
    type: String,
    required: true,
    maxLength: 100
  },
  category: {
    type: String,
    required: true,
    maxLength: 20
  },
  price: {
    type: Number,
    required: true
  },
  thumbnails: {
    type: String
  },
  code: {
    type: Number,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema);
