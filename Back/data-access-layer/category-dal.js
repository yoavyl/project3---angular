const runSQL = require("./db-access");
const fs = require("fs");
const ProductModel = require("../models/product-model");
const path = require("path"); 


async function getAllCategories() {
    const results = await runSQL(`SELECT * from Categories`)   
    return results;
}

async function getProductsPerCategory(categoryId) {
    const results = await runSQL(`SELECT * from products where categoryId = ${categoryId}`);
    const products = [];

    for (let product of results) {      
        const clientProduct = new ProductModel(product);
        clientProduct.imageName = product.ProductID + ".jpg";

        products.push(clientProduct);
    }
    return products;
}

module.exports = {
    getAllCategories,
    getProductsPerCategory
}

