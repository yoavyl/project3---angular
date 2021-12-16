const mysql = require("mysql");

const connection = mysql.createPool({

    // machine:
    host: config.mysql.host,

    // username:
    user: config.mysql.user,

    // password: 
    password: config.mysql.password,

    // database name: 
    database: config.mysql.name

});

function runSQL(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = runSQL;