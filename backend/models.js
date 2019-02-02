let mysql = require('mysql');
let _ = require('lodash');
let moment = require('moment');
const secrets = require('./secrets');

let db = mysql.createConnection({
    host: "localhost",
    user: secrets.user,
    password: secrets.password,
    database: "bears"
});

let models;

module.exports = models = {

    sighting: {
        post: (bearSighting, callback) => {
            
            bear_type = bearSighting.bear_type.toLowerCase();
            notes = bearSighting.notes.toLowerCase();
            zip_code = bearSighting.zip_code.toLowerCase();
            num_bears = bearSighting.num_bears;

            let insertStatement = "INSERT INTO Sighting (bear_type, notes, zip_code, num_bears, created_on) VALUES ('" + bear_type + "', '" + notes + "', '" + zip_code + "', " + num_bears + ", NOW());";

            db.query(insertStatement, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(result);
                }
            });
        },

        getSearchById: (sightingId, callback) => {
            let searchById = "SELECT * FROM Sighting WHERE id=" + sightingId + ";";

            db.query(searchById, (err, result) => {
                if (err) {
                    throw err
                } else {
                    callback(result);
                }
            });
        },

        getSearchbyQuery: (queryData, callback) => {
            let queryString = "SELECT * FROM Sighting where "

            let startDate = moment('1970-01-01').format();
            let endDate = moment().format();
            if(queryData.startDate){
                startDate = queryData.startDate;
            }
            if(queryData.endDate){
                endDate = queryData.endDate;
            }

            queryString = queryString + " created_on >= '" + startDate + "' AND created_on < '" + endDate + "'"

            _.forEach(queryData, (value, key) => {
                if(key === "bear_type" || key === "zip_code"){
                    if(isNaN(value)){
                        value = value.toLowerCase();
                    }
                    queryString = queryString + " AND " + key + "='" + value + "'"
                }
            })

            if(queryData.sort == "true") {
                queryString = queryString + " ORDER BY num_bears ASC"
            } 
            if(queryData.sort == "false") {
                queryString = queryString + " ORDER BY created_on ASC"
            }
    
            queryString = queryString + ";"

            db.query(queryString, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(result);
                }
            });


        }

    }
}