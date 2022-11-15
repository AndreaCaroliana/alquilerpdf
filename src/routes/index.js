const express = require('express');
const AppController = require('../controllers/AppController');

const routes = express.Router();

routes.get('/', AppController.index);

module.exports = routes;