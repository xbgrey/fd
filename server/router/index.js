const Router = require('koa-router');

const user = require('./user');

const router = new Router();

router.use('/', user.routes());

module.exports = router;
