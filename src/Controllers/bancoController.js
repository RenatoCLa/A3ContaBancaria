const Banco = require('../Models/banco');
const Conta = require('../Models/conta');

let bancos = [];

const criarBanco = (req, res) => {
    const {nome} = req.body;
    try {
        const banco = new Banco(nome);
        bancos.push(banco);
        res.status(201).send({message: 'Banco criado com sucesso!', banco});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deletarBanco = (req, res) => {
    const { bancoId } = req.params;
    try {
        Banco.deleteBanco(bancos, bancoId);
        res.status(201).send({ message: 'Banco deletado com sucesso!'});
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const listarBancos = (req, res) => {
    try {
        res.status(200).send(bancos);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const buscarPorIdBanco = (req, res) => {
    const { bancoId } = req.params;
    try {
        const banco = Banco.buscarPorId(bancos, bancoId);
        res.status(200).send(banco);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const atualizarBanco = (req, res) => {
    const { bancoId } = req.params;
    try {
        const banco = Banco.update(bancos, bancoId, req.body);
        res.status(200).send(banco);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

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

//CONTA
//deletar

const BancoController = {
    criarBanco,
    deletarBanco,
    listarBancos,
    buscarPorIdBanco,
    atualizarBanco,
    criarConta,
    listarContas,
    buscarPorIdConta,
    atualizarConta,
    deletarConta,
};

module.exports = BancoController;