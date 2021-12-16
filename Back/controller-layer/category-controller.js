const express = require("express");
const category_dal = require("../data-access-layer/category-dal");
const router = express.Router();
const CategoryModel = require("../models/category-model");
const log = require("../middleware/logger");


// GET ALL 
router.get("", async (request, response) => {
    try {
        const categories = await category_dal.getAllCategories();
        response.json(categories);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// GET PRODUCTS PER CATEGORY
router.get("/:id", [log], async (request, response) => {
    try {
        const categoryModel = new CategoryModel(request.body);
        categoryModel.CategoryID = +request.params.id;
        const errorsMessages = categoryModel.validateID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const products = await category_dal.getProductsPerCategory(categoryModel.CategoryID);
        if (products.length === 0) {
            response.status(404).send(`Found no products in category ${categoryModel.CategoryID}.`);
            return;
        }
        response.json(products);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});


module.exports = router;