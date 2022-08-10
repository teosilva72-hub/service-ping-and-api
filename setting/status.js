const conn = require('./sql/mysql');
const Conn = conn.Conn;
const express = require('express');
const router = express.Router();
Conn.query(`SELECT equip_name, equip_ip, online_status, online_last_status FROM notifications_status`, (e, data) => {
    router.get('/', (req, res) => {
        res.json(data);
        //console.log(JSON.parse(data))
    })

});
const api = async(filds) => {
    //console.log(filds);

}

module.exports = { router: router, api: api };