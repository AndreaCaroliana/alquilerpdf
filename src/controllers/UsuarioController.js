const Usuario = require('../models/Usuario')
const PDF = require('pdfkit-construct');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { options } = require('pdfkit');
const UsuarioController = {};

UsuarioController.index = async (req, res) => {
    const usuario = await Usuario.get();
    res.render('usuario', {usuario});
};

UsuarioController.pendejo = async (req, res) => {

    const doc = new PDF({bufferPages: true});

    const filaname = `Factura ${Date.now()}.pdf`

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment; filaname= ${filaname}`
    })

    doc.on( 'data', (data) =>{stream.write(data)});
    doc.on('end', () => {stream.end()});

    const user = await Usuario.get(); 

    let count=1;
   const registros = user.rows.map(i => {
    console.log(i) ;
   const registro = {
        nro: i.id,
        name: i.nombre ? i.nombre : '',
        email: i.email ? i.email : '',
        pwd: i.pwd ? i.pwd : '',
        tel: i.telefono ? i.telefono : ''
    }
    count++;
    return registro;
   })
    doc.setDocumentHeader({}, () => {

        doc.text('Lista de Usuarios', {
            width:420,
            align: 'center'
        })
    });

    doc.setDocumentFooter({}, () => {

        
    });

    doc.addTable([
        {key: 'nro', label: 'nro', align: 'left'},
        {key: 'name', label: 'Nombre', align: 'left'},
        {key: 'email', label: 'Email', align: 'left'},
        {key: 'pwd', label: 'pwd', align: 'right'},
        {key: 'tel', label: 'Telefono', align: 'right'}
    ], 
    registros, {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'center'
    });

    console.log(doc)
  
       

    doc.render();
    doc.end();
}

module.exports = UsuarioController;