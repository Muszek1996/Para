const { success, notFound } = require('../../services/response');
const Item = require('./model');

const index = (req, res, next) =>{
    Item.find()
        .then((items) => items.map((item) => item.view()))
        .then(success(res))
        .catch(next);
};

const create = ({body},res,next) => {
    Item.create(body)
        .then((item)=>item.view(true))
        .then(success(res,201))
        .catch(next);
};

const show = ({ params }, res, next) =>
    Item.findById(params.id)
        .then(notFound(res))
        .then((item) => item ? item.view(true) : null)
        .then(success(res))
        .catch(next);

const update = ({ body, params }, res, next) =>
    Item.findById(params.id)
        .then(notFound(res))
        .then((item) => item ? Object.assign(item, body).save() : null)
        .then((item) => item ? item.view(true) : null)
        .then(success(res))
        .catch(next);

const destroy = ({ params }, res, next) =>
    Item.findById(params.id)
        .then(notFound(res))
        .then((item) => item ? item.remove() : null)
        .then(success(res, 204))
        .catch(next);

const search = ({query}, res, next) => {
    let dbquery = []
    for(const key in query){
        switch (key) {
            case 'name':
                dbquery.push({"name": {$regex: new RegExp(`${query['name']}`), $options: 'i'}})
                break;
            case 'pricemin':
                dbquery.push({"price": {$gte: parseFloat(query['pricemin']) }})
                break;
            case 'pricemax':
                dbquery.push({"price": {$lte: parseFloat(query['pricemax']) }})
                break;
            case 'tradeable':
                dbquery.push({"tradeable": {$eq: parseInt(query['tradeable']) }})
                break;
        }
    }

    if(dbquery.length === 0) return res.json([])

    return Item.find({$and : dbquery}).sort({price: -1}).limit(10)
        .then(notFound(res))
        .then((item) => item ? item.map(item => item.view(true)) : null)
        .then(success(res))
        .catch(next)
}

module.exports = {index, create, show, update, destroy, search};