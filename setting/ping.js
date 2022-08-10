const conn = require('./sql/mysql');
const ping = require('ping');
const Conn = conn.Conn;
const log = require('./log');
const fs = require('fs');
const date = new Date;
const today = new Date(date);

const writeStream = fs.createWriteStream(`./log/log${today.getDate()}_${today.getMonth()+1}.txt`);

async function idGet(filds, constraint) {
    try {
        Conn.query(`SELECT ${filds} FROM ${constraint}`, (e, result) => {
            adressEquip(JSON.parse(JSON.stringify(result)));
        });
        //Conn.end();
    } catch (e) {
        console.log('erro')
    }
}

async function adressEquip(query) {
    let cont = [];
    try {
        for (var i = 0; i < query.length; i++) {
            if ((query[i].equip_ip || query[i].name) != null) {
                let ip = query[i].equip_ip;
                let name = query[i].equip_name;
                let state = query[i].online_status;
                let id = query[i].notifications_id;
                cont = Ping(ip, name, state, id);
            }
        }
        // console.log(cont)
    } catch (e) {
        console.log(`:::ERROR function adressEquip:::\n ${e}`)
    }
}
var teste = 0;
const Ping = async(ip, name, state, id) => {
    const filds = [];
    // WARNING: -i 2 argument may not work in other platform like windows
    const res = await ping.promise.probe(ip).then(e => {
        let statusOn = 0,
            statusOff = 0,
            ip = '',
            x = [];
        if (e.alive) {
            statusOn = 1;
            statusOff = 0
        } else if (!e.alive) {
            statusOff = 1;
            statusOn = 0
        }
        if (e.host == undefined) ip = '0.0.0.0';
        else ip = e.host;
        const result = [`${id},${name}, ${ip}, ${statusOff}, ${statusOn}`];
        filds[0] = result;
        log.logs(result, today, writeStream);
        Conn.query(`UPDATE notifications_status SET
            online_status = '${statusOn}',
            online_last_status = '${statusOff}'
            WHERE notifications_id = '${id}'
        `, (error, result) => {
            if (error) console.log('Error Update notification_status\n' + error);
        });
        return filds
    });
    //return filds;
}

module.exports = {
    run: idGet
}