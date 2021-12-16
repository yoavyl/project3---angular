const runSQL = require("./db-access");
const fs = require("fs");
const OrderModel = require("../models/order-model");
const path = require("path"); 
const dateHelper = require("../helpers/date-helper");
const pdfHelper = require("../helpers/pdf-helper");


// GET LAST ORDER BY USER -> per OrderID (why not date? because...)
async function getLastOrderByUser(uuid) {
    const result = await runSQL(`SELECT * FROM orders WHERE userUUID="${uuid}" ORDER BY OrderID DESC LIMIT 1`);
    return result;
}

async function countOrders() {
    const results = await runSQL(`SELECT COUNT(OrderID) AS count FROM orders`)    
    return results;
}

async function getFullyBookedDates() {
    const results = await runSQL(`SELECT Delivery, COUNT(Delivery) AS count FROM orders GROUP BY Delivery HAVING count>2`);
    return results;
}

async function newOrder(newOrder) {
    const sql = `INSERT INTO orders VALUES (DEFAULT, '${newOrder.UserUUID}', ${newOrder.CartID}, ${newOrder.TotalPrice}, "${newOrder.City}", "${newOrder.Street}", "${newOrder.Delivery}", "${newOrder.Date}",  "${newOrder.CreditCard}")`;
    const results = await runSQL(sql)    

    if (results.affectedRows === 0) {
        return null;
    }
    newOrder.OrderID = results.insertId;
    pdfHelper.createPDF(newOrder);
    return newOrder;
}

function getOoderPDF(fileName) {
    let absolutePath = path.join(__dirname, "..", "database", "orders", fileName);
    return absolutePath;
}





module.exports = {
    getLastOrderByUser,
    getOoderPDF,
    countOrders,
    newOrder,
    getFullyBookedDates}

