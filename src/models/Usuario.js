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

/*Querys

Contrato -->  SELECT C.id as id, U.nombre as nom, V.nombre as viv, C.finicio as fdate, C.ffinal as fin, C.monto as monto FROM contrato C INNER JOIN usuario U ON C.id_cliente = U.id INNER JOIN vivienda V ON C.id_vivienda = V.id

*/
