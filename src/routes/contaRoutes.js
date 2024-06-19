import express from 'express';
const router = express.Router();
import ContaController from '../controllers/contaController.js';

router.get('/contas', ContaController.listarContas);
router.get('/contas/:id', ContaController.listarConta);
router.post('/contas', ContaController.criarConta);
router.put('/contas/:id', ContaController.atualizarConta);
router.delete('/contas/:id', ContaController.deletarConta);
router.put('/contas/saque/:id', ContaController.sacar);
router.put('/contas/deposito/:id', ContaController.depositar);
router.put('/contas/transferir/:id/:id_trgt', ContaController.transferir);
router.get('/contas/saldo/:id', ContaController.verSaldo);

export default router;