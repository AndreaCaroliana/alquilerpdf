const Usuario = require('../models/Usuario')
const PDF = require('pdfkit-construct');
const pdf = require('html-pdf');
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

    const filaname = `Factua ${Date.now()}.pdf`

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
        name: i.n,
        desc: i.des,
        dir:i.dir,
        Hab: i.h,
        Banio:i.bn,
        mt2:i.m,
        Tvivienda: i.dd   
    }
    count++;
    return registro;
   })
    doc.setDocumentHeader({}, () => {

        doc.text('Listado de Viviendas', {
            width:420,
            align: 'center'
        })
    });

    doc.setDocumentFooter({}, () => {

        
    });

    doc.addTable([
        {key: 'nro', label: 'nro', align: 'left'},
        {key: 'name', label: 'Nombre', align: 'left'},
        {key: 'desc', label: 'Descripción', align: 'left'},
        {key: 'dir', label: 'Dirección', align: 'right'},
        {key: 'Hab', label: 'Hab'},
        {key: 'Banio', label: 'Banio'},
        {key: 'mt2', label: 'mt2'},
        {key: 'Tvivienda', label: 'Tvivienda', align: 'right'}
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

    doc.render();
    doc.end();
}

module.exports = UsuarioController;