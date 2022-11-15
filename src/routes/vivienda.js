const express = require('express');
const ViviendaController = require('../controllers/ViviendaController');

const routes = express.Router();

routes.get('/vivienda', ViviendaController.index);


module.exports = routes;