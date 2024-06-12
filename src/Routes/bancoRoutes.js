import express from 'express';
const router = express.Router();
import BancoController from '../Controllers/bancoController.js';

router.post('/bancos', BancoController.criarBanco);
router.get('/bancos', BancoController.listarBancos);
router.get('/bancos/:bancoId', BancoController.listarBanco);
router.put('/bancos/:bancoId', BancoController.atualizarBanco);
router.delete('/bancos/:bancoId', BancoController.deletarBanco);

export default router;