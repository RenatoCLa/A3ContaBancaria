import express from 'express';
const router = express.Router();
import BancoController from '../Controllers/bancoController.js';

router.post('/bancos', BancoController.criarBanco);
router.get('/bancos', BancoController.listarBancos);
router.get('/bancos/:banco_id', BancoController.listarBanco);
router.put('/bancos/:banco_id', BancoController.atualizarBanco);
router.delete('/bancos/:banco_id', BancoController.deletarBanco);

export default router;