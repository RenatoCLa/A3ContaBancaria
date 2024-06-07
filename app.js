const express = require('express');
const BancoRoutes = require('./src/Routes/bancoRoutes');

const app = express();
app.use(express.json());
app.use('/', BancoRoutes);

module.exports = app;