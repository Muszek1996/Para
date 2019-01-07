const { success, notFound } = require('../../services/response');
const Game = require('./model');
const uniqueValidator = require('mongoose-unique-validator');



const index = (req, res, next) =>{
    Game.find()
        .then((games) => games.map((game) => game.view()))
        .then(success(res))
        .catch(next);
};

const create = ({body},res,next) => {
    Game.create(body)
        .then((game)=>game.view(true))
        .then(success(res,201))
        .catch(next)

};

const show = ({ params }, res, next) =>
    Game.findById(params.id)
        .then(notFound(res))
        .then((game) => game ? game.view(true) : null)
        .then(success(res))
        .catch(next);

const update = ({ body, params }, res, next) =>
    Game.findById(params.id)
        .then(notFound(res))
        .then((game) => game ? Object.assign(game, body).save() : null)
        .then((game) => game ? game.view(true) : null)
        .then(success(res))
        .catch(next);

const destroy = ({ params }, res, next) =>
    Game.findById(params.id)
        .then(notFound(res))
        .then((game) => game ? game.remove() : null)
        .then(success(res, 204))
        .catch(next);

const search = ({query}, res, next) => {
    let dbquery = []
    for(const key in query){
        switch (key) {
            case 'description':
                dbquery.push({"description": {$regex: new RegExp(`${query['description']}`), $options: 'i'}})
                break;
            case 'dubbing':
                dbquery.push({"dubbing": {$eq: parseInt(query['dubbing']) }})
                break;
            case 'versionmin':
                dbquery.push({"version": {$gte: parseFloat(query['versionmin']) }})
                break;
            case 'versionmax':
                dbquery.push({"version": {$lte: parseFloat(query['versionmax']) }})
                break;
            case 'title':
                dbquery.push({"title": {$regex: new RegExp(`${query['title']}`), $options: 'i'}})
                break;
            case 'pricemin':
                dbquery.push({"price": {$gte: parseFloat(query['pricemin']) }})
                break;
            case 'pricemax':
                dbquery.push({"price": {$lte: parseFloat(query['pricemax']) }})
                break;
        }
    }
    let def = Game.find({$and : dbquery}).sort({price: (query.direction || -1)}).limit(10);

    if(dbquery.length === 0) return res.json([])

    return def
        .then(notFound(res))
        .then((game) => game ? game.map(game => game.view(true)) : null)
        .then(success(res))
        .catch(next)
}



module.exports = {index, create, show, update, destroy,search};