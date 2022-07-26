const mysql = require('mysql/');
const env = require('../var');

const conn = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB
});

module.exports = {
    Conn: conn
}