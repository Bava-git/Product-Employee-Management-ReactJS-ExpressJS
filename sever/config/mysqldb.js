const mysql = require("mysql2");
require('dotenv').config();

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const mysqldb = {
    host: "127.0.0.1",
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: "sample_db",
    port: 3310,
};

const connectMySQLdb = mysql.createConnection(mysqldb);

connectMySQLdb.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

module.exports = connectMySQLdb;