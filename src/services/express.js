const express = require('express');
const bodyParser = require('body-parser');

const expressConfig = (apiRoot, routes) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(apiRoot, routes);
    app.get('/',(req,res)=>{
        res.send('Welcome on Para - DigitalGamesDistributionPlatform');
    });
    return app
};

module.exports = expressConfig;
