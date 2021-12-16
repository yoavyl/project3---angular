const express = require("express");
const cart_item_dal = require("../data-access-layer/item-dal");
const router = express.Router();
const ItemModel = require("../models/item-model");
const log = require("../middleware/logger");

// GET OPEN CART ITEMS
router.get("/:cartId", async (request, response) => {
    try {
        const itemModel = new ItemModel(request.body);
        itemModel.CartID = +request.params.cartId;
        const errorsMessages = itemModel.validateCartID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const items = await cart_item_dal.getOpenCartItems(itemModel.CartID);

        // THIS IS NOT FOR THE USER TO SEE, AMD IF IT's 0 THAN IT MEANS THERE AREN'T ANY

        if (items.length === 0) {
            response.status(404).send(`Found no products in cart ${itemModel.CartID}.`);
            return;
        }
        response.json(items);
    } catch(err) {
        response.status(500).send(err.message) 
    }
});


// // POST
router.post("", [log], async (request, response) => {
    try {
        const itemModel = new ItemModel(request.body);
        const errorsMessages = itemModel.validatePost(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const newItem = await cart_item_dal.newItem(itemModel);
        if (!newItem) {
            response.status(404).send(`No success`);
            return;
        }
        response.status(201).json(newItem);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});


// // DELETE
router.delete("/:id", async (request, response) => {
    try {
        const itemModel = new ItemModel(request.body);
        itemModel.ItemID = +request.params.id;
        const errorsMessages = itemModel.validateID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const cartIdToDelete = await cart_item_dal.deleteItem(itemModel.ItemID); 
        if (!cartIdToDelete) {
            response.status(404).send(`ID ${itemModel.cartID} not found.`);
            return;
        }
        response.sendStatus(204); 
    } catch(err) {
        response.status(500).send(err.message)
    }
});

// DELETE ALL OPEN CART ITEMS PER CART
router.delete("/all/:cartId", async (request, response) => {
    try {
        const itemModel = new ItemModel(request.body);
        itemModel.CartID = +request.params.cartId;
        const errorsMessages = itemModel.validateCartID(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const itemsToDelete = await cart_item_dal.deleteAllItemsOfCart(itemModel.CartID); 
        if (!itemsToDelete) {
            response.status(404).send(`Didn't delete`);
            return;
        }
        response.sendStatus(204); 
    } catch(err) {
        response.status(500).send(err.message)  
    }
});

module.exports = router;