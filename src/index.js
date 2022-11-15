const express = require('express');
const morgan = require('morgan');
const app = express();
let path = require("path");


app.use(morgan('dev'));
app.set('views', path.join(__dirname,'views'));


app.set('view engine', 'ejs');


app.use(require('./routes'));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000 , () => {
    console.log('listening on port 3000')
});