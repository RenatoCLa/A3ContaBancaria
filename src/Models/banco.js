import kn from '../../knex.js';

class Banco{

    constructor(nome){
        this.nome = nome;
    }

    static async pegarBancos(){
        return kn.select('*').from('banco');
    }

    static async pegarBancoPorId(id){
        const resultado = await kn.select('*').from('banco').where('id', id);
        return resultado[0];
    }

    async criar() {
        return kn('banco').insert(this)
        .then((bancoCriado) => kn('banco')
        .where('id', bancoCriado[0]))
        .then((bancoSelecionado) => new Banco(bancoSelecionado[0]));
    }

    async atualizar(id) {
        await kn('banco').where('id', id).update({... this});
        return kn.select('*').from('banco').where('id', id);
    }

    static async excluir(id) {
        let registro = await kn.select('*').from('banco').where('id', id);
        if(registro.length != 0){
            await kn('banco').where('id', id).delete();
            return registro;
        }else{
            return false;
        }
    }
}

export default Banco;