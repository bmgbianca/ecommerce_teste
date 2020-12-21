import mongoose from 'mongoose';
import { productModel as products } from './Models/models.js';
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { router } from './Routes/routes.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', router);

const conectarMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao banco de dados no MongoDB');
  } catch (error) {
    console.log('Erro de conexão com o MongoDB');
    process.exit();
  }
};

app.listen(process.env.PORT || 8080, async () => {
  try {
    await conectarMongoDB();
    const databaseContent = await products.find();
    if (databaseContent.length === 0) {
      let productsData = await fs.readFile('./products.json');
      productsData = JSON.parse(productsData);
      for (let i = 0; i < productsData.products.length; i++) {
        const currentProduct = productsData.products[i];
        await new products({
          name: currentProduct.name,
          type: currentProduct.type,
          color: currentProduct.color,
          original_price: currentProduct.original_price,
          discount_price: currentProduct.discount_price,
          main_image: currentProduct.main_image,
          image_2: currentProduct.image_2,
          image_3: currentProduct.image_3,
          image_4: currentProduct.image_4,
        }).save();
      }
      console.log('Base de dados carregada.');
    }
    console.log('Servidor iniciado');
  } catch (err) {
    console.log('Falha ao tentar levantar o servidor');
  }
});
