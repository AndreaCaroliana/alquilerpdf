const express = require('express');
const AppController = require('../controllers/AppController');
const UsuarioController = require('../controllers/UsuarioController');
const ViviendaController = require('../controllers/ViviendaController');

const routes = express.Router();

routes.get('/', AppController.index);
routes.get('/login', AppController.login);
routes.get('/vivienda', ViviendaController.index);
routes.get('/usuario', UsuarioController.index);

module.exports = routes;