const AppController = {};

AppController.index = (req, res) => {
    res.render('bienvenido');
}

module.exports = AppController;