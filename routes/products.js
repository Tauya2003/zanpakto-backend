const express = require('express');
const Product = require('../models/ProductModel');

const router = express.Router();

//  Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Search for products
router.get('/search/:name', async (req, res) => {
  try {
    const products = await Product.find({ name: { $regex: req.params.name, $options: 'i' } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creating a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    supplier: req.body.supplier,
    price: req.body.price,
    description: req.body.description,
    rating: req.body.rating,
    image: req.body.image,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// DELETE a new product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Deleted product' });
  } catch (err) {
    res.status(500).json({ mssg: err.message });
  }
});

// UPDATE a new product
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.supplier != null) {
    res.product.supplier = req.body.supplier;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.rating != null) {
    res.product.rating = req.body.rating;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ mssg: err.message });
  }
});


async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;

