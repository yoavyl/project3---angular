const express = require("express");
const order_dal = require("../data-access-layer/order-dal");
const router = express.Router();
const OrderModel = require("../models/order-model");
const dateHelper = require("../helpers/date-helper");

const log = require("../middleware/logger");

// GET LAST ORDER BY USER -> per OrderID (why not date? because...)
router.get("/user/:uuid", async (request, response) => {
    try {
        const orderModel = new OrderModel(request.body);
        orderModel.UserUUID = request.params.uuid;
        const errorsMessages = orderModel.validateUUID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }

        const orders = await order_dal.getLastOrderByUser(orderModel.UserUUID);

        // THIS IS NOT FOR THE USER TO SEE, AMD IF IT's 0 THAN IT MEANS THERE AREN'T ANY
        if (orders.length === 0) {
            response.status(404).send(`Found no previous orders for user ${orderModel.UserUUID}.`);
            return;
        }
        response.json(orders);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// COUNT ORDERS - THERE's no reason ao get ALL orders from ALL users, just the coun
router.get("/count", async (request, response) => {
    // NO VALIDATION NEEDED
    try {
        const count = await order_dal.countOrders();

        // THIS IS NOT FOR THE USER TO SEE, AMD IF IT's 0 THAN IT MEANS THERE AREN'T ANY
        if (count === undefined) {
            response.status(404).send(`No success in count.`);
            return;
        }
        response.json(count);
    } catch(err) {
        response.status(500).send(err.message) 
    }
});

// GET ALL DATES WITH 3 ORDERS
router.get("/count/dates", [log], async (request, response) => {
    // NO VALIDATION NEEDED
    try {
        const count = await order_dal.getFullyBookedDates();

        // THIS IS NOT FOR THE USER TO SEE, AMD IF IT's 0 THAN IT MEANS THERE AREN'T ANY
        if (count === undefined) {
            response.status(404).send(`No success in count.`);
            return;
        }
        response.json(count);
    } catch(err) {
        response.status(500).send(err.message)
    }
});

// // POST
router.post("", log, async (request, response) => {
    try {
        const orderModel = new OrderModel(request.body);
        // assaf said it should be here / business logic
        const delivery = new Date(orderModel.Delivery);
        orderModel.Delivery = dateHelper.stringifyDate(delivery);
        const currentDate = new Date(orderModel.Date);
        orderModel.Date = dateHelper.stringifyDate(currentDate);
        const errorsMessages = orderModel.validatePost(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const newOrder = await order_dal.newOrder(orderModel);
        if (!newOrder) {
            response.status(404).send(`didn't make it.`);
            return;
        }
        response.status(201).json(newOrder);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// GET http://localhost:3030/api/orders/pdf/Order61.pdf
router.get("/pdf/:name", (request, response) => {
    try {
        const name = request.params.name;
        const file = order_dal.getOoderPDF(name);
        console.log("file: " + file)
        response.download(file);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});





module.exports = router;