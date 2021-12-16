const runSQL = require("./db-access");


async function getAllCities() {
    // This is a very impressive query :)
        const results = await runSQL(`SELECT *
        FROM
          ( SELECT city, population
            FROM cities
            ORDER BY population DESC
            LIMIT 10
          ) AS tmp
        ORDER BY city ASC`);

        return results;
}

module.exports = {
    getAllCities
}