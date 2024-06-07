const express = require('express');
const BancoRoutes = require('./src/Routes/bancoRoutes');
const ContaRoutes = require('./src/Routes/contaRoutes');

const app = express();

app.use(express.json());
app.use('/', BancoRoutes);
app.use('/', ContaRoutes);

module.exports = app;