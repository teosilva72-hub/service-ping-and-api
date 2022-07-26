const conn = require('./sql/mysql');
const ping = require('ping');
const Conn = conn.Conn;
const log = require('./log');
const fs = require('fs');
const date = new Date;
const today = new Date(date);
const status = require('./status');
const { api } = require('./status');

const writeStream = fs.createWriteStream(`./log/log${today.getDate()}_${today.getMonth()+1}.txt`);
writeStream.rea
async function idGet(filds, constraint) {
    try {
        Conn.query(`SELECT ${filds} FROM ${constraint}`, (e, result) => {
            adressEquip(JSON.parse(JSON.stringify(result)));
            status.api(true)
        });
        Conn.end();
    } catch (e) {
        console.log('erro')
    }
}

function adressEquip(query) {
    for (var i = 0; i < query.length; i++) {
        if ((query[i].equip_ip || query[i].name) != null) {
            let ip = query[i].equip_ip;
            let name = query[i].equip_name;
            let state = query[i].online_status;
            //console.log(i + " <> " + ip)
            Ping(ip, name, state);


        }
    }
}

const Ping = async(ip, name, state) => {
    const x = {};
    // WARNING: -i 2 argument may not work in other platform like windows
    const res = await ping.promise.probe(ip).then(e => {
        const result = [`${name}, ${e.host}, ${e.alive}`];
        log.logs(result, today, writeStream);

    });

}

module.exports = {
    run: idGet
}