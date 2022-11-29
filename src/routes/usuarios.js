const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const routes = express.Router();

routes.get('/usuario', UsuarioController.index);

routes.get('/pdf-usuario', UsuarioController.pendejo);


module.exports = routes;