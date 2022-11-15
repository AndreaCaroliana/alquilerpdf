const Usuario = require('../models')
const UsuarioController = {};

UsuarioController.index = (req, res) => {
    const usuario = Usuario.get();
    res.render('usuario', (usuario));
}

module.exports = UsuarioController;