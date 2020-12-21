import express from 'express';
import { productModel as products } from '../Models/models.js';
import dotenv from 'dotenv';

dotenv.config();

export const router = express.Router();

router.get('/:limit/:page', async (req, res, next) => {
  try {
    const itemsPerPage = Number(req.params.limit);
    const pageNumber = Number(req.params.page);
    let filterParameter = {};
    if (req.query.search) {
      const regex = new RegExp(`.*${req.query.search}.*`);
      filterParameter = {
        $or: [
          {
            name: { $regex: regex, $options: 'i' },
          },
          { type: { $regex: regex, $options: 'i' } },
          { color: { $regex: regex, $options: 'i' } },
        ],
      };
    }
    const list = await products
      .find(filterParameter)
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const totalProducts = await products.countDocuments(filterParameter);
    res.send({
      totalPages: Math.ceil(totalProducts / itemsPerPage),
      totalProducts: totalProducts,
      currentProductsList: list,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:limit/:string', async (req, res, next) => {
  try {
    const newItemsPerPage = Number(req.params.limit);
    const searchedString = req.params.string;
    const regex = new RegExp(`.*${searchedString}.*`);
    const fullSearchList = await products.find({
      $or: [
        {
          name: { $regex: regex, $options: 'i' },
        },
        { type: { $regex: regex, $options: 'i' } },
        { color: { $regex: regex, $options: 'i' } },
      ],
    });
    const newListPerPage = [];
    for (let i = 0; i < fullSearchList.length / newItemsPerPage; i++) {
      const newList = await products
        .find({
          $or: [
            {
              name: { $regex: regex, $options: 'i' },
            },
            { type: { $regex: regex, $options: 'i' } },
            { color: { $regex: regex, $options: 'i' } },
          ],
        })
        .skip(newListPerPage.length * newItemsPerPage)
        .limit(newItemsPerPage);
      newListPerPage.push(newList);
    }
    res.send(newListPerPage);
  } catch (err) {
    next(err);
  }
});

router.use((err, _req, res) => {
  res.status(err.status || 404).send(`Ocorreu um erro: ${err.message}`);
});
