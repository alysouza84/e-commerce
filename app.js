var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('./models').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var cartRouter = require('./routes/cart')
var paymentRouter = require('./routes/payment')

var app = express();

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/payment', paymentRouter);

const db = require('./models');

async function applyDataStructure(){
    await db.sequelize.sync({alter: true});
}

applyDataStructure();

var port = 8080;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
