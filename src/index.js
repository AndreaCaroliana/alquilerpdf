const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require("path");
const {urlencoded , json} = require('express');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(urlencoded ({extended:false}));
app.use(json());
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));
app.use(require('./routes/vivienda'));


app.listen(3000 , () => {
    console.log('listening on port 3000')
});