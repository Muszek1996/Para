const { success, notFound } = require('../../services/response');
const Group = require('./model');

const index = (req, res, next) =>{
    Group.find()
        .then((group) => group.map((group) => group.view()))
        .then(success(res))
        .catch(next);
};

const create = ({body},res,next) => {
    Group.create(body)
        .then((group)=>group.view(true))
        .then(success(res,201))
        .catch(next);
};

const show = ({ params }, res, next) =>
    Group.findById(params.id)
        .then(notFound(res))
        .then((group) => group ? group.view(true) : null)
        .then(success(res))
        .catch(next);

const update = ({ body, params }, res, next) =>
    Group.findById(params.id)
        .then(notFound(res))
        .then((group) => group ? Object.assign(group, body).save() : null)
        .then((group) => group ? group.view(true) : null)
        .then(success(res))
        .catch(next);

const destroy = ({ params }, res, next) =>
    Group.findById(params.id)
        .then(notFound(res))
        .then((group) => group ? group.remove() : null)
        .then(success(res, 204))
        .catch(next);

const search = ({query}, res, next) => {
    let dbquery = [{"name": {$regex: new RegExp(`${query['name']}`), $options: 'i'}}];

    if(dbquery.length === 0) return res.json([]);

    return Group.find({$and : dbquery}).sort({name: -1}).limit(10)
        .then(notFound(res))
        .then((item) => item ? item.map(item => item.view(true)) : null)
        .then(success(res))
        .catch(next)
};

module.exports = {index, create, show, update, destroy, search};