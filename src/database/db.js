const Pool = require('pg').Pool;

const pool = new  Pool({
    user: "postgres",
    host:"localhost",
    database:"alquiler",
    password: "root",
    port: 5432
})

pool.connect ((error) => {
    if(error){
        console.log('Error en la conexion '+error);
        return
    }
    console.log('Conectado en la base de datos');
})

module.exports = pool;