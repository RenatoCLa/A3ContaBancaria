const Banco = require('../Models/banco');
const Conta = require('../Models/conta');

//sacar / depositar / transferir / ver saldo

const sacar = (req, res) => {
    const { bancoId, contaId } = req.params;
    const { valor } = req.body;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const conta = banco.buscarConta(contaId);
        conta.sacar(valor);
        res.status(200).send({ message: 'Saque realizado com sucesso!'});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const depositar = (req, res) => {
    const { bancoId, contaId } = req.params;
    const { valor } = req.body;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const conta = banco.buscarConta(contaId);
        conta.depositar(valor);
        res.status(200).send({ message: 'Deposito realizado com sucesso!'});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const transferir = (req, res) => {
    const { bancoId, contaId, subContaId } = req.params;
    const { valor } = req.body;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const conta = banco.buscarConta(contaId);
        const subConta = banco.buscarConta(subContaId);
        conta.transferir(valor, subConta);
        res.status(200).send({ message: 'Transferência realizada com sucesso!'});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const verSaldo = (req, res) => {
    const { bancoId, contaId } = req.params;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const conta = banco.buscarConta(contaId);
        const saldo = conta.verSaldo();
        res.status(200).send({ message: `Saldo : ${saldo}`});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const contaController = {
    sacar,
    depositar,
    transferir,
    verSaldo,
};

module.exports = contaController;