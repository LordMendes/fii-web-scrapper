const {Router} = require('express');
const fiiRouter = require('./fiis.routes')

const routes = Router();

routes.use('/fiis', fiiRouter );

module.exports = routes;