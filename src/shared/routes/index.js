const {Router} = require('express');
const fiiRouter = require('./fii.routes')

const routes = Router();

routes.use('/fii', fiiRouter );

module.exports = routes;