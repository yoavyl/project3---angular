const express = require("express");
const city_dal = require("../data-access-layer/city-dal");
const router = express.Router();
const log = require("../middleware/logger");


// GET ALL 
router.get("", async (request, response) => {
    try {
        const cities = await city_dal.getAllCities();
        response.json(cities);
    } catch(err) {
        response.status(500).send(err.message) 
    }
});



module.exports = router;