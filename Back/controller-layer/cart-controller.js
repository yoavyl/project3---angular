const express = require("express");
const cart_dal = require("../data-access-layer/cart-dal.js");
const router = express.Router();
const CartModel = require("../models/cart-model");
const dateHelper = require("../helpers/date-helper");

const log = require("../middleware/logger");

// GET LAST CART's ID PER USER
router.get("/user/:uuid", async (request, response) => {
    try {
        const cartModel = new CartModel(request.body);
        cartModel.UserUUID = request.params.uuid;
        const errorsMessages = cartModel.validateUUID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const cart = await cart_dal.getLastCartPerUser(cartModel.UserUUID);
        response.json(cart);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});


// // POST
router.post("", [log], async (request, response) => {
    try {
        const cartModel = new CartModel(request.body);
        const cartDate = new Date(cartModel.Date);
        cartModel.Date = dateHelper.stringifyDate(cartDate);
        const errorsMessages = cartModel.validatePost(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const newCart = await cart_dal.newCart(cartModel);
        if (!newCart) {
            response.status(404).send(`No success`);
            return;
        }
        response.status(201).json(newCart);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

// // DELETE
router.delete("/:id", async (request, response) => {
    try {
        const cartModel = new CartModel(request.body);
        cartModel.CartID = +request.params.id;
        const errorsMessages = cartModel.validateID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const cartIdToDelete = await cart_dal.deleteCart(cartModel.CartID); 
        if (!cartIdToDelete) {
            response.status(404).send(`cart ${cartModel.CartID} not found.`);
            return;
        }
        response.sendStatus(204); 
    } catch(err) {
        response.status(500).send(err.message)  
    }
});


module.exports = router;