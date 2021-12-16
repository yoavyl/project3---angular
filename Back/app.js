global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");

const express = require("express");
const cors = require("cors");
const product_controller = require("./controller-layer/product-controller");
const auth_controller = require("./controller-layer/auth-controller");
const category_controller = require("./controller-layer/category-controller");
const order_controller = require("./controller-layer/order-controller");
const user_controller = require("./controller-layer/user-controller");
const item_controller = require("./controller-layer/item-controller");
const cart_controller = require("./controller-layer/cart-controller.js");
const city_controller = require("./controller-layer/city-controller.js");


const log = require("./middleware/logger");

const preventDelete = require("./middleware/prevent-delete");

const fileUpload = require("express-fileupload");

const server = express();
server.use(cors());
server.use(fileUpload());
server.use(express.json()); 

server.use((err, request, response, next) => {
    response.status(err.status).send(err.message);
});

server.use("/api/auth", auth_controller);
server.use("/api/products", product_controller);
server.use("/api/categories", category_controller);
server.use("/api/orders", order_controller);
server.use("/api/users", user_controller);
server.use("/api/items", item_controller);
server.use("/api/carts", cart_controller);
server.use("/api/cities", city_controller);


server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

server.listen(3030, () => console.log("Server is listening..."));