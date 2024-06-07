const express = require('express');
const router = express.Router();
const BancoController = require('../Controllers/bancoController');

//criar
router.post('/bancos', BancoController.criarBanco);
//viewall
router.get('/bancos', BancoController.listarBancos);
//viewId
router.get('/bancos/:bancoId', BancoController.buscarPorId);
//update
router.put('/bancos/:bancoId', BancoController.atualizarBanco);
//delete
router.delete('/bancos/:bancoId', BancoController.deletarBanco);

module.exports = router;