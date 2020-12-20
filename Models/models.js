import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: false,
  },
  original_price: {
    type: Number,
    require: true,
  },
  discount_price: {
    type: Number,
    require: false,
  },
  main_image: {
    type: String,
    require: true,
  },
  image_2: {
    type: String,
    require: false,
  },
  image_3: {
    type: String,
    require: false,
  },
  image_4: {
    type: String,
    require: false,
  },
});

const productModel = mongoose.model('products', productSchema, 'products');

export { productSchema, productModel };
