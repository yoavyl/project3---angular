const runSQL = require("./db-access");
const fs = require("fs");
const path = require("path"); 
const dateHelper = require("../helpers/date-helper");
const ItemModel = require("../models/item-model");



async function getOpenCartItems(cartId) {
    const results = await runSQL(`SELECT items.Quantity, items.CartID, items.ItemID, items.ProductID, items.TotalPrice, products.ProductName FROM items, products WHERE (items.ProductID = products.ProductID) AND (items.CartID = ${cartId})`);
    console.log(results);
    const  items = [];
    for (let item of results) {     
        const clientItem = new ItemModel(item);
        clientItem.imageName = item.ProductID + ".jpg";

        items.push(clientItem);
    }
    return items;
}

async function newItem(newItem) {
    const sql = `INSERT INTO items VALUES (DEFAULT, ${newItem.ProductID}, ${newItem.Quantity}, ${newItem.TotalPrice}, ${newItem.CartID})`;
    const results = await runSQL(sql)    
    if (results.affectedRows === 0) {
        return null;
    }
    newItem.ItemID = results.insertId;
    return newItem;
}

async function deleteItem(id) {
    const sql = `DELETE FROM items WHERE ItemID = "${id}"`;
    const results = await runSQL(sql);    
    if (results.affectedRows === 0) {
        return null;
    }
    return results;
}


async function deleteAllItemsOfCart(cartId) {
    const sql = `DELETE FROM items WHERE (CartID = "${cartId}")`;
    const results = await runSQL(sql);  
    if (results.affectedRows === 0) {
        return null;
    }
    return results;
}

module.exports = {
    newItem,
    deleteItem,
    getOpenCartItems,
    deleteAllItemsOfCart
}

