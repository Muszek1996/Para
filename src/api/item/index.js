const Router = require('express');
const {index, create, show, update, destroy,search} = require('./controller');

const router = new Router();


router.post('/',
    create);

router.get('/',
    index);

router.get('/search/',
    search)

router.get('/:id',
    show);

router.put('/:id',
    update);

router.delete('/:id',
    destroy);

module.exports = router;
