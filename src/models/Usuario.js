const db = require('../database/db');
const Usuario = {};

Usuario.get = async () =>{
    return await db.query('SELECT *FROM usuario');
};

Usuario.insert = async () =>{
    const nombre = req.body.nombre;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const pwd = req.body.pwd;

    db.query(`INSERT INTO usuario (nombre, email, telefono, pwd) VALUES ($1, $2, $3, $4)`,[nombre,email,telefono,pwd], (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/'); 
        }  
    });
    
};

module.exports = Usuario;
