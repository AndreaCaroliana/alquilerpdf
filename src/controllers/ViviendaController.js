const Vivienda = require('../models/Vivienda')
const PDF = require('pdfkit-construct');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { options } = require('pdfkit');

const ViviendaController = {};

ViviendaController.index = async (req, res) => {
    const viviendas = await Vivienda.get();
    res.render('viviendac', {viviendas});
};

ViviendaController.pendejo = async (req, res) => {

    const doc = new PDF({bufferPages: true});

    const filaname = `Factua ${Date.now()}.pdf`

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment; filaname= ${filaname}`
    })

    doc.on( 'data', (data) =>{stream.write(data)});
    doc.on('end', () => {stream.end()});

    const vivi = await Vivienda.get(); 

    /////console.log("vivi: ",vivi.rows);
    let count=1;
   const registros = vivi.rows.map(i => {
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



ViviendaController.prueba = async (req, res) => {

    const lista = await Vivienda.get();
    console.log(lista);
    const filePath = path.join(__dirname,"../views/PDF/pdfVivienda.ejs")
    ejs.renderFile(filePath, {lista} ,(err, data) => {
        
        if (err) {
              return res.send(lista);
        } 
            
        const options = {
            height: "11.25in",
            with: "6.51in",
            header: {
                height:"20mm"
            },
            footer:{
                height:"20mm"
            }
        }
            pdf.create(data, options).toFile("report.pdf", (err, data)=> {
                if (err) {
                    res.send(err);
                } else {
                    console.log("estoy en la funcion")
                    res.render("bienvenido");
                }
            });
        
    
        return res.send(data);
    })
}


module.exports = ViviendaController;