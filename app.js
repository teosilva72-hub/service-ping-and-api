const express = require('express');
const app = express();
const env = require('./setting/var');
const ping = require('./setting/ping');
const router = require('./setting/status')
const fs = require('fs');
Server(env.check);
const date = new Date;
const today = new Date(date);
fs.readFile('./log/log10_8.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    //console.log(data);
});


//setInterval(() => {
ping.run('*', `notifications_status`)
    //}, 5000);
app.use('/', router.router);

function Server(check) {
    if (check) {
        app.listen(env.port, (error) => {
            if (error) console.log(`:::ERROR\n${error}`);
            else console.log(`Server running to PORT ${env.port}`)
        });
    } else console.log('Server OFF');
}