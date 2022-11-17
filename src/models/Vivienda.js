const pool = require('../database/db.js');
const Vivienda = {};

Vivienda.get = async () =>{
    return await pool.query('SELECT v.id as id, v.nombre as n, v.descripcion as des , v.direccion  as dir, v.habitaciones as h, v.banios as bn, v.mt2 as m ,t.descripcion as dd FROM vivienda v INNER JOIN tvivienda t ON v.id_vivenda = t.id');
};

module.exports = Vivienda;