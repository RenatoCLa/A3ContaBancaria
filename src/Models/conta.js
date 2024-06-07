class Conta {

    static currentId = 1;

    constructor(cpf, nome, saldo, bancoId){
        this.nome = nome;
        this.saldo = saldo;
        this.cpf = cpf;
        this.id = Conta.currentId++;
        this.bancoId = bancoId;
    }

    //Converter os valores imprimidos para valores monetarios; ex: 4 => 04,00
    //Implementar a mudança do saldo da conta no banco de dados em todas as funções

    //funções crud

    //retorna os dados de uma conta, para que possa ser exibida após um request
    static returnConta(conta){
        return{
            id: conta.id,
            cpf: conta.cpf,
            nome: conta.nome,
            saldo: conta.saldo,
            bancoId: conta.bancoId
        }
    }

    //função statica para criar uma conta bancária
    static create(contas, bancos, data){
        const banco = bancos.find(banco => banco.id === data.id_banco);
        const createdConta = new Conta(data.cpf, data.nome, data.saldo, banco.id);
        contas.push(createdConta);
        banco.associarConta(createdConta);
        return this.returnConta(createdConta);
    }

    //retorna todas as contas presentes no sistema
    static listarContas(contas){
        return contas.map(conta => this.returnConta(conta));
    }

    //retorna a busca de uma conta, baseada em seu id
    static buscarPorId(contas, id){
        return contas.find(conta => conta.id === id);
    };

    //atualiza as informações de uma conta
    static update(conta, data){
        if (conta) {
            conta.cpf = data.cpf || conta.cpf;
            conta.nome = data.nome || conta.nome;
            conta.saldo = data.saldo || conta.saldo;
        }
        return conta;
    };

    //deleta uma conta
    static delete(contas, bancos, id_c, id_b){
        const deletarConta = this.buscarPorId(contas, id_c);
        if (deletarConta) {
            const index = contas.indexOf(deletarConta);
            const banco = bancos.find(banco => banco.id === id_b);
            const index_c = banco.contas.indexOf(deletarConta);
            banco.contas.splice(index_c, 1);
            contas.splice(index, 1);
            return true;
        }
        return false;
    };

    //funções

    sacar(valor){
        if(valor > 0.0 && valor <= this.saldo){
            this.saldo -= valor;
            console.log("Conta " + this.id + " sacou : R$" + valor + "\n");
        }
        else{
            throw new Error("Valor invalido");
        }
    }

    depositar(valor){
        if(valor > 0.0){
            this.saldo += valor;
        console.log("Conta " + this.id + " depositou : R$" + valor + "\n");
        }else{
            throw new Error('Valor invalido');
        }
    }

    transferir(valor, conta){
        if(valor === 0){
            throw new Error('Valor invalido');
        }
        if(valor > this.saldo){
            throw new Error('Saldo insuficiente');
        }
        if(conta === this || !conta){
            throw new Error('Conta invalida');
        }
        this.saldo -= valor;
        console.log("Realizado transferência de R$ " + valor + " da conta " + this.id + " para a conta " + conta.id + "\n");
        conta.receberTransferencia(valor);
    }

    receberTransferencia(valor){
        this.saldo += valor;
        console.log("Conta " + this.id + " recebeu transferência de R$" + valor + "\n");
    }

    verSaldo(){
        console.log("O saldo da conta " + this.id + " é : R$" + this.saldo + "\n");
        return this.saldo;
    }
}

module.exports = Conta;