const Vivienda = require('../models/Vivienda')
const PDF = require('pdfkit-construct');

const ViviendaController = {};

ViviendaController.index = async (req, res) => {
    const viviendas = await Vivienda.get();
    res.render('vivienda', {viviendas});
};



ViviendaController.pdf = async (req, res) => {

    const doc = new PDF({bufferPages: true});

    const filaname = `Factua ${Date.now()}.pdf`

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment; filaname= ${filaname}`
    })

    doc.on( 'data', (data) =>{stream.write(data)});
    doc.on('end', () => {stream.end()});

    const vivienda = await Vivienda.get(); 
    let c=1;
    

   const registros = vivienda.map ( (i) =>{
   
    const registro = {
        //nro: i.id,
        name: i.n,
        desc: i.des,
        dir:i.dir,
        Hab: i.h,
        Banio:i.bn,
        Tvivienda: i.dd
    }
    c++;
    return registro;
   });

    doc.setDocumentHeader({}, () => {

        doc.text('Listado de Viviendas', {
            width:420,
            align: 'center'
        })
    });

    doc.setDocumentFooter({}, () => {

        
    });

    doc.addTable([
        {key: 'name', label: 'Nombre', align: 'left'},
        {key: 'desc', label: 'Descripción', align: 'left'},
        {key: 'dir', label: 'Dirección', align: 'right'},
        {key: 'Hab', label: 'Hab'},
        {key: 'Banio', label: 'Banio'},
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

module.exports = ViviendaController;