import Conta from '../models/conta.js';

class ContaController{
    
    static listarContas = async (_, res) => {
        try {
            const resultado = await Conta.pegarContas();
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
            const resultado = await Conta.excluir(id);
            if(resultado == false){
                res.status(500).json({message: 'Conta não encontrada!'});
            }else{
                res.status(200).json({message: 'Conta deletada com sucesso!'});
            }
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