const express = require('express');
const app = express();
const env = require('./setting/var');
const ping = require('./setting/ping');
const router = require('./setting/status')

Server(env.check);

function Server(check) {
    if (check) {
        app.listen(env.port, (error) => {
            if (error) console.log(`:::ERROR\n${error}`);
            else console.log(`Server running to PORT ${env.port}`)
        });
    } else console.log('Server OFF');
}

//setInterval(() => {
ping.run('*', `notifications_status`)
    //}, 5000);
app.use('/', router.router);