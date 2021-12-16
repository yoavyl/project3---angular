const express = require("express");
const UserModel = require("../models/user-model");
const auth_dal = require("../data-access-layer/auth-dal");
const { log } = require("console");

const router = express.Router();

// REGISTER
router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const errorsMessages = user.validateRegistration(); 
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const registeredUser = await auth_dal.register(user);
        if (!registeredUser) {
            return response.status(401).send("something went wrong"); 
        }
        response.json(registeredUser);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// LOGIN
router.post("/login", async (request, response) => {
    console.log(request)

    try {
        const user = new UserModel(request.body);
        console.log(user);
        const errorsMessages = user.validateLogin(); 
        console.log("errs: " + errorsMessages);
        if (errorsMessages) {
            response.status(400).send(errorsMessages);
            return;
        }
        const loggedInUser = await auth_dal.login(user);
        if (!loggedInUser) {
            return response.status(401).send("Incorrect email or password"); 
        }
        response.json(loggedInUser);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;