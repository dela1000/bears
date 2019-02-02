const mysql = require('mysql');
const secrets = require('./secrets');


let db = mysql.createConnection({
    host: "localhost",
    user: secrets.user,
    password: secrets.password,
});

db.query("CREATE DATABASE IF NOT EXISTS bears;", function(err, result) {
    if (err) {
        throw err;
    }
    console.log("+++ db.js Database created/present")
    db.query("USE bears;", function(err, result) {
        let sql = "CREATE TABLE IF NOT EXISTS Sighting (id INT AUTO_INCREMENT PRIMARY KEY, bear_type VARCHAR(255), notes VARCHAR(255), zip_code VARCHAR(255), num_bears INT, created_on DATETIME)";
        db.query(sql, function(err, result) {
            if (err) {
                throw err
            };
            console.log("+++ db.js Table created/present")
        });
    })
});