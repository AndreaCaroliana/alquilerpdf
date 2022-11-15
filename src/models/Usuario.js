const db = require('./database/db');
const Usuario = {};

Usuario.get = async () =>{
    return await db.query('SELECT *FROM usuario');
};

module.exports = Usuario;

/*Querys

Contrato -->  SELECT C.id as id, U.nombre as nom, V.nombre as viv, C.finicio as fdate, C.ffinal as fin, C.monto as monto FROM contrato C INNER JOIN usuario U ON C.id_cliente = U.id INNER JOIN vivienda V ON C.id_vivienda = V.id

*/
