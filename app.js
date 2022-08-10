const express = require('express');
const app = express();
const env = require('./setting/var');
const ping = require('./setting/ping');
const fs = require('fs');

//setInterval(() => {
ping.run('*', `notifications_status`)
    //}, 5000);