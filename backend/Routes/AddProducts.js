const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.post('/addproducts', async (req, res) => {
  try {
    const { CategoryName, name, options, description, img } = req.body;

    // Ensure options is an array
    const optionsArray = Array.isArray(options) ? options : [options];

    const product = new Product({
      CategoryName,
      name,
      options: optionsArray,
      description,
      img
    });

    const savedProduct = await product.save();
    res.status(200).json({ success: true, itemId: savedProduct._id });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
