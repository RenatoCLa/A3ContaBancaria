import Banco from '../models/banco.js';
import Conta from '../models/conta.js';

const criarConta = (req, res) => {
    const { cpf, nome, saldo } = req.body;
    const { bancoId } = req.params;
    try {
        const banco = Banco.buscarPorId(bancos ,bancoId)
        if(!banco){
            throw new Error('Banco inválido');
        }
        if(banco.contas.find(conta => conta.cpf == cpf)){
            throw new Error('Uma conta já esta usando este cpf!');
        }
        const conta = new Conta(cpf, nome, saldo, bancoId);
        console.log(conta);
        banco.associarConta(conta);
        console.log(banco.listarContas());
        res.status(200).send(conta);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const listarContas = (req, res) => {
    const { bancoId } = req.params;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const contas = banco.listarContas();     
        res.status(200).send(contas);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const buscarPorIdConta = (req, res) => {
    const { bancoId } = req.params;
    const { contaId } = req.params;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const conta = banco.buscarConta(contaId);
        res.status(200).send(conta);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const atualizarConta = (req, res) => {
    const { bancoId } = req.params;
    const { contaId } = req.params;
    const { cpf, nome, saldo } = req.body;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const contaU = banco.buscarConta(contaId);
        const conta = Conta.update(contaU, {cpf, nome, saldo});
        res.status(200).send({message: "Conta atualizada com sucesso!", conta});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const deletarConta = (req, res) => {
    const { bancoId } = req.params;
    const { contaId } = req.params;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        const conta = banco.buscarConta(contaId);
        const index = banco.contas.indexOf(conta);
        banco.contas.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

class BancoController{

    static listarBancos = async (_, res) => {
        try {
            const resultado = await Banco.pegarBancos();
            console.log(resultado);
            return res.status(200).json(resultado);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    };

    static listarBanco = async (req, res) => {
        const { params } = req;
        try {
            const resultado = await Banco.pegarBancoPorId(params.bancoId);
            res.status(200).json(resultado);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static criarBanco = async (req, res) => {
        const {nome} = req.body;
        console.log(nome);
        const banco = new Banco(nome);
        try {
            const resultado = await banco.criar();
            res.status(201).json({message: 'Banco criado com sucesso!', resultado});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static atualizarBanco = async (req, res) => {
        const { bancoId } = req.params;
        const { nome } = req.body;
        const banco = new Banco(nome);
        try {
            const resultado = await banco.atualizar(bancoId);
            res.status(200).json(resultado);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static deletarBanco = async (req, res) => {
        const { bancoId } = req.params;
        try {
            Banco.excluir(bancoId);
            res.status(200).json({message: 'Banco deletado com sucesso!'});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

}

export default BancoController;