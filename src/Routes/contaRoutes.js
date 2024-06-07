const express = require('express');
const router = express.Router();
const ContaController = require('../Controllers/contaController');

router.put('/saque/:bancoId/:contaId', ContaController.sacar);
router.put('/deposito/:bancoId/:contaId', ContaController.depositar);
router.put('/deposito/:bancoId/:contaId/:subContaId', ContaController.transferir);
router.get('/saldo/:bancoId/:contaId', ContaController.verSaldo);

module.exports = router;