class Banco{
    constructor(nome, id){
        this.nome = nome;
        this.id = id;
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
    static verTodosBancos(bancos){
        return bancos.map(banco => this.returnBanco(banco));
    }

    static buscarPorID(bancos, id){
        return bancos.find(banco => banco.id === id);
    }

    //UPDATE
    static update(bancos, id, data){
        const banco = this.buscarPorID(bancos, id);
        if (banco){
            banco.nome = data.nome || banco.nome;
        }
        return banco;
    }

    //DELETE
    static delete(bancos, id){
        const banco = this.buscarPorID(bancos, id);
        if (banco){
            const index = bancos.indexOf(banco);
            bancos.splice(index, 1);
            return true;
        }
        return false;
    }

    static deleteConta(bancos, contas, id_banco, id_conta){
        const banco = this.buscarPorID(bancos, id_banco);
        if (banco){
            const conta = banco.contas.find(conta => conta.id === id_conta);
            const index = banco.contas.indexOf(conta);
            banco.contas.splice(index, 1);
            const index_c = contas.indexOf(conta);
            contas.splice(index_c, 1);
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