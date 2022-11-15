const Vivienda = require('../models/Vivienda')
const ViviendaController = {};

ViviendaController.index = (req, results) => {
    const viviendas =  Vivienda.get();
    console.log(viviendas);
    results.render('vivienda', {results : viviendas});
}

module.exports = ViviendaController;