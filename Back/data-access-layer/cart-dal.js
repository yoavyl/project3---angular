const runSQL = require("./db-access");
const fs = require("fs");
const CartModel = require("../models/cart-model");
const path = require("path"); 

async function getLastCartPerUser(uuid) {
    const cart = await runSQL(`SELECT * FROM carts WHERE UserUUID="${uuid}" ORDER BY CartID DESC LIMIT 1`);
    return cart;
}


async function newCart(newCart) {
    const sql = `INSERT INTO carts VALUES (DEFAULT, "${newCart.UserUUID}", "${newCart.Date}")`;
    const results = await runSQL(sql)    
    if (results.affectedRows === 0) {
        return null;
    }
    newCart.CartID = results.insertId;
    return newCart;
}

async function deleteCart(id) {
    const sql = `DELETE FROM carts WHERE CartID = ${id}`;
    const results = await runSQL(sql);  
    if (results.affectedRows === 0) {
        return null;
    }
    return results;
}


module.exports = {
    newCart,
    deleteCart,
    getLastCartPerUser,
}

