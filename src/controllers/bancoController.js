import Banco from '../models/banco.js';
import Conta from '../models/conta.js';

class BancoController{

    static listarBancos = async (_, res) => {
        try {
            const resultado = await Banco.pegarBancos();
            return res.status(200).json(resultado);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    };

    static listarBanco = async (req, res) => {
        const { params } = req;
        try {
            const resultado = await Banco.pegarBancoPorId(params.banco_id);
            res.status(200).json(resultado);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static criarBanco = async (req, res) => {
        const {nome} = req.body;
        const banco = new Banco(nome);
        try {
            const resultado = await banco.criar();
            res.status(201).json({message: 'Banco criado com sucesso!', resultado});
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static atualizarBanco = async (req, res) => {
        const { banco_id } = req.params;
        const { nome } = req.body;
        const banco = new Banco(nome);
        try {
            const resultado = await banco.atualizar(banco_id);
            res.status(200).json(resultado);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    static deletarBanco = async (req, res) => {
        const { banco_id } = req.params;
        try {
            const resultado = await Banco.excluir(banco_id);
            if(resultado == false){
                res.status(500).json({message: 'Banco não encontrado!'});
            }else{
                res.status(200).json({message: 'Banco deletado com sucesso!'});
            }
              
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

}

export default BancoController;