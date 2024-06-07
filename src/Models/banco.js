class Banco{

    static currentId = 1;

    constructor(nome){
        this.nome = nome;
        this.id = Banco.currentId++;
        this.contas = [];
    }

    //CRUD

    static returnBanco(banco){
        return{
            nome: banco.nome,
            id: banco.id,
            contas: banco.contas
        }
    }

    //CREATE
    static create(bancos, data){
        const banco = new Banco(data.nome, bancos.length +1);
        bancos.push(banco);
        return this.returnBanco(banco);
    }

    //READ
    static listarBancos(bancos){
        return bancos.map(banco => this.returnBanco(banco));
    }

    static buscarPorId(bancos, id){
        return bancos.find(banco => banco.id == id);
    }

    //UPDATE
    static update(bancos, id, data){
        const banco = this.buscarPorId(bancos, id);
        if (banco){
            banco.nome = data.nome || banco.nome;
        }
        return banco;
    }

    //DELETE
    static deleteBanco(bancos, id){
        const banco = this.buscarPorId(bancos, id);
        console.log(banco);
        if (banco){
            const index = bancos.indexOf(banco);
            bancos.splice(index, 1);
            return true;
        }
        return false;
    }

    associarConta(conta){
        this.contas.push(conta);
    }

    // adicionar transferência de conta
    // para outro banco
    // transferirConta(conta, banco)
}

module.exports = Banco;