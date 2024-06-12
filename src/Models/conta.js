import kn from "../../knex.js";

class Conta {

    constructor(cpf, nome, saldo, banco_id) {
        this.nome = nome;
        this.saldo = saldo;
        this.cpf = cpf;
        this.banco_id = banco_id;
    }

    static async pegarContas(){
        return kn.select('*').from('conta');
    }

    static async pegarContaPorId(id){
        return kn.select('*').from('conta').where('id', id);
    }

    async criar() {
        return kn('conta').insert(this)
        .then((contaCriada) => kn('conta')
        .where('id', contaCriada[0]))
        .then((contaSelecionada) => new Conta(contaSelecionada[0]));
    }

    async atualizar(id) {
        await kn('conta').where('id', id).update({... this});
        return kn.select('*').from('conta').where('id', id);
    }

    static async excluir(id) {
        await kn('conta').where('id', id).del();
    }

    static async sacar(id, valor){
        const resultado = await kn.select('saldo').from('conta').where('id', id);
        const saldoAntigo = parseFloat(resultado[0].saldo);
        if(valor > 0.0 && valor < saldoAntigo){
            const saldoNovo = saldoAntigo - valor;
            await kn('conta').where('id', id).update({ saldo: saldoNovo });
        } else{
            throw new Error("Valor invalido");
        }
    }

    static async depositar(id, valor){
        const resultado = await kn.select('saldo').from('conta').where('id', id);
        const saldoAntigo = parseFloat(resultado[0].saldo);
        if(valor > 0.0){
            const saldoNovo = saldoAntigo + valor;
            await kn('conta').where('id', id).update({ saldo: saldoNovo });
        } else{
            throw new Error("Valor invalido");
        }
    }

    static async transferir(id, id_trgt, valor){
        const resultado = await kn.select('saldo').from('conta').where('id', id);
        const saldoAntigo = parseFloat(resultado[0].saldo);

        const resultado_trgt = await kn.select('saldo').from('conta').where('id', id_trgt);
        const saldoAntigo_trgt = parseFloat(resultado_trgt[0].saldo);
        if(valor > 0.0 && valor < saldoAntigo){

            const saldoNovo = saldoAntigo - valor;
            const saldoNovo_trgt = saldoAntigo_trgt + valor;

            await kn('conta').where('id', id).update({ saldo: saldoNovo });
            await kn('conta').where('id', id_trgt).update({ saldo: saldoNovo_trgt });
        } else{
            throw new Error("Valor invalido");
        }
    }
    
    static async verSaldo(id){
        const resultado = await kn.select('saldo').from('conta').where('id', id);
        console.log(resultado);
        const saldo = parseFloat(resultado[0].saldo);
        console.log(saldo);
        return `O saldo da conta é de R$ ${saldo}`;
    }

    verSaldo(){
        console.log("O saldo da conta " + this.id + " é : R$" + this.saldo + "\n");
        return this.saldo;
    }
}

export default Conta;