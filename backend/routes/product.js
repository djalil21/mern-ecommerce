const express = require("express");

const {
    verifyToken,
    isAuthorized,
    isAdmin,
} = require("../middleware/verifyToken");
const Product = require('../models/Product')

const router = express.Router();

router.post("/", verifyToken, isAdmin, async (req, res) => {
    const { product } = req.body
    const newProduct = new Product(product)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(err)
    }
})

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const { product } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {
            new: true,
        });
        res.status(201).send(updatedProduct);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", verifyToken, isAuthorized, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(201).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const order = req.query.order;
        const category = req.query.category;
        const color = req.query.color;
        const size = req.query.size;


        const query = []

        if (!order && !category && !color) {
            const data = await Product.find()
            return res.status(201).json(data);
        }

        if (category) { query.push({ $match: { categories: { $in: [category] } } }) }
        if (color) { query.push({ $match: { color: color } }) }
        if (size) { query.push({ $match: { size: size } }) }

        if (order) {
            if (order === 'newest') {
                query.push({ $sort: { createdAt: -1 } })
            } else {
                (order === 'asc') && query.push({ $sort: { price: 1 } });
                (order === 'desc') && query.push({ $sort: { price: -1 } });
            }
        }
        const data = await Product.aggregate(query)

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;