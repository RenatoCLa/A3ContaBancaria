const Banco = require('../Models/banco');

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

const buscarPorId = (req, res) => {
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

const BancoController = {
    criarBanco,
    deletarBanco,
    listarBancos,
    buscarPorId,
    atualizarBanco,
};

module.exports = BancoController;