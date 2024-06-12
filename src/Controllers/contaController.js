import Banco from '../models/banco.js';
import Conta from '../models/conta.js';

const transferir = (req, res) => {
    const { banco_id, contaid, subContaid } = req.params;
    const { valor } = req.body;
    try {
        const banco = Banco.buscarPorid(bancos, banco_id);
        const conta = banco.buscarConta(contaid);
        const subConta = banco.buscarConta(subContaid);
        console.log(conta, subConta);
        conta.transferir(valor, subConta);
        const saldo1 = conta.saldo;
        const saldo2 = subConta.saldo;
        res.status(200).send({ message: 'Transferência realizada com sucesso!', saldo1, saldo2});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const verSaldo = (req, res) => {
    const { banco_id, contaid } = req.params;
    try {
        const banco = Banco.buscarPorid(bancos, banco_id);
        const conta = banco.buscarConta(contaid);
        const saldo = conta.verSaldo();
        res.status(200).send({ message: `Saldo : ${saldo}`});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

class ContaController{
    
    static listarContas = async (_, res) => {
        try {
            const resultado = await Conta.pegarContas();
            console.log(resultado);
            return res.status(200).json(resultado);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    };

    static listarConta = async (req, res) => {
        const { params } = req;
        try {
            const resultado = await Conta.pegarContaPorId(params.id);
            res.status(200).json(resultado);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static criarConta = async (req, res) => {
        const {nome, cpf, saldo, banco_id} = req.body;
        console.log(nome);
        const conta = new Conta(cpf, nome, saldo, banco_id);
        try {
            const resultado = await conta.criar();
            res.status(201).json({message: 'Conta criada com sucesso!', resultado});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static atualizarConta = async (req, res) => {
        const { id } = req.params;
        const { nome, cpf, saldo, banco_id } = req.body;
        const conta = new Conta(cpf, nome, saldo, banco_id);
        try {
            const resultado = await conta.atualizar(id);
            res.status(200).json(resultado);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static deletarConta = async (req, res) => {
        const { id } = req.params;
        try {
            Conta.excluir(id);
            res.status(200).json({message: 'Conta deletada com sucesso!'});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static sacar = async (req, res) => {
        const { id } = req.params;
        const { valor } = req.body;
        try {
            Conta.sacar(id, valor);
            res.status(200).json({message: 'Saque realizado com sucesso!'});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static depositar = async (req, res) => {
        const { id } = req.params;
        const { valor } = req.body;
        try {
            Conta.depositar(id, valor);
            res.status(200).json({message: 'Deposito realizado com sucesso!'});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static transferir = async (req, res) => {
        const { id, id_trgt } = req.params;
        const { valor } = req.body;
        try {
            Conta.transferir(id, id_trgt, valor);
            res.status(200).json({message: 'Transferência realizada com sucesso!'});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static verSaldo = async (req, res) => {
        const { id } = req.params;
        try {
            const resultado = await Conta.verSaldo(id);
            console.log(resultado);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export default ContaController;