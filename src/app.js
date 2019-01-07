const http = require('http');
const { env, port, ip, apiRootPath, mongo } = require('./config');
const express = require('./services/express');
const apiRouter = require('./api');
const mongoose = require('./services/mongoose')

const app = express(apiRootPath,apiRouter);

const server = http.createServer(app);

mongoose.connect(mongo.uri);

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    })
})

module.exports = app;