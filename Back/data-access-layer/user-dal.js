const runSQL = require("./db-access");
const fs = require("fs");
const UserModel = require("../models/user-model");
const path = require("path"); 

async function getAllidcardsEmails() {
    const results = await runSQL(`SELECT idcard, email FROM users`)   
    return results;
}


async function checkId(idCard) {
    const results = await runSQL(`SELECT COUNT(idcard) AS count FROM users WHERE idcard=${idCard}`) 
    return results;
}


// usesd "internally" by node js server to get user's details for order-receipt PDF
async function getAllUserDetails(uuid) {    
    const results = await runSQL(`SELECT * FROM users WHERE uuid="${uuid}"`)   
    return results;
}

module.exports = {
    getAllidcardsEmails,
    getAllUserDetails,
}

