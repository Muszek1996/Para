

const path = require('path');
const merge = require('lodash').merge;

const config = {
    all :{
        env: process.env.NODE_ENV || 'development',
        apiRootPath: '/api',
        ip:'localhost',
        port: 80,
        mongo: {
            options : {
                useCreateIndex: true,        // DeprecationWarning: collection.ensureIndex is deprecated.
                useNewUrlParser: true           // DeprecationWarning: current URL string parser is deprecated
            }
        },
    },
    test:{},
    development: {
        mongo: {
            uri: 'mongodb://localhost/ie2018-dev',
            options: {
                debug: true
            }
        },
        jwtSecret: 'xda'
    },
    production:{}
};


module.exports = merge(config.all,config[config.all.env]);
