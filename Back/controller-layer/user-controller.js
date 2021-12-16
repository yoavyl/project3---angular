const express = require("express");
const user_dal = require("../data-access-layer/user-dal");
const router = express.Router();
const UserModel = require("../models/user-model");
const log = require("../middleware/logger");


// GET ALL (only emails in id numbers)
router.get("", async (request, response) => {
    try {
        const users = await user_dal.getAllidcardsEmails();
        response.json(users);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});


// GET ALL (only emails in id numbers)
router.get("/id/:idcard", async (request, response) => {
    try {
        const idcard = request.params.idcard;
        const users = await user_dal.checkId(idcard);
        response.json(users);
    } catch(err) {
        response.status(500).send(err.message)  
    }
});


module.exports = router;