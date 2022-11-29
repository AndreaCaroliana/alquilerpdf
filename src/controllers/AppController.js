const AppController = {};

AppController.index = (req, res) => {
    res.render('bienvenido');
}
AppController.login = (req, res) => {
    res.render('login');
}
AppController.viviendas = (req, results) => {
    results.render('vivienda');
}



module.exports = AppController;