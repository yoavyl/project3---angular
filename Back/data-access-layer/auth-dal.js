const runSQL = require("./db-access");
const jwt = require("jsonwebtoken");
const crypto = require("../helpers/crypto-helper");
const uuid = require("uuid");

async function login(user) {
    user.password = crypto.hash(user.password);
    const users = await runSQL(`SELECT * from users where email = "${user.email}" AND password = "${user.password}"`);
    if (users.length === 0) {
        return null;
    }
    const loggedInUser = users[0];
    loggedInUser.token = jwt.sign({ loggedInUser }, config.jwtKey, { expiresIn: "30m" });
    loggedInUser.Password = "";
    return loggedInUser;
}

async function register(user) {
    user.password = crypto.hash(user.password);
    user.uuid = uuid.v4();
    const result = await runSQL(`INSERT INTO users values("${user.uuid}", "${user.firstName}", "${user.lastName}", "${user.password}", "${user.idcard}", "${user.city}", "${user.street}", "${user.email}", DEFAULT)`);
    if (result.affectedRows === 0) {
        return null;
    }
    user.token = jwt.sign({ user }, config.jwtKey, { expiresIn: "30m" });
    user.isAdmin = false;
    delete user.password;
    return user;
}

module.exports = {
    login,
    register
}