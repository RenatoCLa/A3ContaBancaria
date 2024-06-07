const express = require('express');
const router = express.Router();
const BancoController = require('../Controllers/bancoController');

router.post('/bancos', BancoController.criarBanco);
router.get('/bancos', BancoController.listarBancos);
router.get('/bancos/:bancoId', BancoController.buscarPorIdBanco);
router.put('/bancos/:bancoId', BancoController.atualizarBanco);
router.delete('/bancos/:bancoId', BancoController.deletarBanco);

router.post('/:bancoId/contas', BancoController.criarConta);
router.get('/:bancoId/contas', BancoController.listarContas);
router.get('/:bancoId/contas/:contaId', BancoController.buscarPorIdConta);
router.put('/:bancoId/contas/:contaId', BancoController.atualizarConta);
router.delete('/:bancoId/contas/:contaId', BancoController.deletarConta);

module.exports = router;