const express = require('express');
const ViviendaController = require('../controllers/ViviendaController');

const routes = express.Router();

routes.get('/vivienda', ViviendaController.index);

routes.get('/pdf-vivenda', ViviendaController.pdf);


module.exports = routes;