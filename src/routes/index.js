const express = require('express');
const AppController = require('../controllers/AppController');
const ViviendaController = require('../controllers/ViviendaController');

const routes = express.Router();

routes.get('/', AppController.index);
routes.get('/login', AppController.login);
routes.get('/vivienda', ViviendaController.index);

module.exports = routes;