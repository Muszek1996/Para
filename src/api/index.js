const express = require('express');
const gamesRouter = require('./game');
const groupsRouter = require('./group');
const itemsRouter = require('./item');
const usersRouter = require('./user');
const lodash = require("lodash");

const router = new express();




router.use('/games', gamesRouter);
router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/groups', groupsRouter);

// 404 Error handler
router.use((req, res, next) =>  res.status(404).send({errors: ['Routing not found']}))

// Error handler
router.use((err, req, res, next) =>  {
    if(err.name === 'ValidationError'){
        const errors = lodash.map(err.errors, (v) => v.message )
        return res.status(400).send({errors})
    }

    console.error(err)
    res.status(500).send({errors: ['Application error']})
})


router.use((()=>console.log('request')));




module.exports = router;