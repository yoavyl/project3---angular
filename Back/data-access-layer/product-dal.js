const runSQL = require("./db-access");
const fs = require("fs");
const ProductModel = require("../models/product-model");
const path = require("path"); 

async function getAllProducts() {
    const results = await runSQL(`SELECT * from products`);
    const products = [];

    for (let product of results) {      
        const clientProduct = new ProductModel(product);
        clientProduct.imageName = product.ProductID + ".jpg";
        products.push(clientProduct);
    }
    return products;
}


async function getOneProduct(productId) {
    const result = await runSQL(`SELECT * from productsroductID  where P= ${productId}`);
    const clientProduct = new ProductModel(result[0]);
    clientProduct.imageName = clientProduct.ProductID + ".jpg";
    return clientProduct;
}


async function getProductsBySearch(query) {
    console.log(query);
    const results = await runSQL(`SELECT * from products where LOWER(ProductName) like "%${query}%"`);
    const products = [];

    for (let product of results) {     
        const clientProduct = new ProductModel(product);
        clientProduct.imageName = product.ProductID + ".jpg";
        products.push(clientProduct);
    }
    return products
}

async function newProduct(product, image) {
    const sql = `INSERT INTO Products(ProductID, ProductName, CategoryID, UnitPrice) VALUES (DEFAULT, "${product.ProductName}", ${product.CategoryID}, ${product.UnitPrice})`;
    const results = await runSQL(sql)   
    if (results.affectedRows === 0) {
        return null;
    }
    product.ProductID = results.insertId; 
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product.ProductID + extension;
        product.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath); 
    }
    return product;
}

async function updateProduct(newProduct, image) {
    console.log("new category: " + newProduct.CategoryID);
    const sql = `UPDATE Products SET ProductName = "${newProduct.ProductName}", UnitPrice = ${newProduct.UnitPrice}, 
    CategoryID = ${newProduct.CategoryID} WHERE ProductID = ${newProduct.ProductID}`;
    const results = await runSQL(sql);    
    if (results.affectedRows === 0) {
        return null;
    }
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = newProduct.ProductID + extension; 
        newProduct.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath); 
    }
    return newProduct;
}

function getProductImage(imageName) {
    let absolutePath = path.join(__dirname, "..", "images", "products", imageName);
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
    }

    return absolutePath;
}

module.exports = {
    getOneProduct,
    newProduct,
    getAllProducts,
    updateProduct,
    getProductImage,
    getProductsBySearch
}