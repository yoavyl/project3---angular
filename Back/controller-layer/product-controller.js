const express = require("express");
const product_dal = require("../data-access-layer/product-dal");
const ProductModel = require("../models/product-model");
const log = require("../middleware/logger");

const runSQL = require("../data-access-layer/db-access");
const verifyLoggedIn = require("../middleware/verify-logged-in.js");

const router = express.Router();

// GET ALL
router.get("", async (request, response) => {
    try {
        const products = await product_dal.getAllProducts();
        response.json(products);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET ONE
router.get("/:id", [log], async (request, response) => {
    try {
        const productModel = new ProductModel(request.body);
        productModel.ProductID = +request.params.id;
        const errorsMessages = productModel.validateID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const product = await product_dal.getOneProduct(+request.params.id);
        if (product.length === 0) {
            response.status(404).send(`ID ${request.params.id} not found.`);
            return;
        }
        response.json(product);
    } catch(err) {
        response.status(500).send(err.message) 
    }
});

// SEARCH
router.get("/search/:query", [log], async (request, response) => {
    try {
        // NO VALIDATION NEEDED
        const products = await product_dal.getProductsBySearch(request.params.query);
        if (products.length === 0) {
            response.status(404).send(`Found no product with ${request.params.query}.`);
            return;
        }
        response.json(products);
    } catch(err) {
        response.status(500).send(err.message) 
    }
});

// POST
router.post("", [verifyLoggedIn], async (request, response) => {
    try {
        console.log(request.body);
        const productModel = new ProductModel(request.body);
        const errorsMessages = productModel.validatePost(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const image = request.files && request.files.image ? request.files.image : null;
        if (!image) return response.status(400).send("Missing image.");
        const newProduct = await product_dal.newProduct(productModel, image);
        if (!newProduct) {
            response.status(404).send(`Didn't succeed in creating new product.`);
            return;
        }
        response.status(201).json(newProduct);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// PUT
router.put("/:id", [verifyLoggedIn], async (request, response) => {
    try {
        const productModel = new ProductModel(request.body);
        productModel.ProductID = +request.params.id;
        const errorsMessages = productModel.validatePut(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const image = request.files && request.files.image ? request.files.image : null;
        if (!image) return response.status(400).send("Missing image.");

        const newProductDetails = await product_dal.updateProduct(productModel, image)
        if (!newProductDetails) {
            response.status(404).send(`ID ${productModel.ProductID} not found.`);
            return;
        }
        response.json(newProductDetails);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// DELETE
router.delete("/:id", async (request, response) => {
    try {
        const productModel = new ProductModel(request.body);
        productModel.ProductID = +request.params.id;
        const errorsMessages = productModel.validateID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const productIdToDelete = await product_dal.deleteProduct(productModel.ProductID); 
        if (!productIdToDelete) {
            response.status(404).send(`ID ${productModel.ProductID} not found.`);
            return;
        }
        response.sendStatus(204); 
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// GET http://localhost:3001/api/products/images/7.jpg
router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        const file = product_dal.getProductImage(name);
        response.sendFile(file);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;