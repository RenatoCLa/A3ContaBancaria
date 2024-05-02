class Conta {

    constructor(id, cpf, nome, saldo){
        this.nome = nome;
        this.saldo = saldo;
        this.cpf = cpf;
        this.id = id;
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
            saldo: conta.saldo
        }
    }

    //função statica para criar uma conta bancária
    static create(contas, data){
        const createdConta = new Conta(contas.length +1, data.cpf, data.nome, data.saldo);
        contas.push(createdConta);
        return this.returnConta(createdConta);
    }

    //retorna todas as contas presentes no sistema
    static verTodasContas(contas){
        return contas.map(conta => this.returnConta(conta));
    }

    //retorna a busca de uma conta, baseada em seu id
    static buscarPorid(contas, id){
        return contas.find(conta => conta.id === id);
    };

    //atualiza as informações de uma conta
    static update(contas, id, data){
        const conta = this.buscarPorid(contas, id);
        if (conta) {
            conta.cpf = data.cpf || conta.cpf;
            conta.nome = data.nome || conta.nome;
            conta.saldo = data.saldo || conta.saldo;
        }
        return conta;
    };

    //deleta uma conta
    static delete(contas, id){
        const deletarConta = this.buscarPorid(contas, id);
        if (deletarConta) {
            const index = contas.indexOf(deletarConta);
            contas.splice(index, 1);
            return true;
        }
        return false;
    };

    //funções

    sacar(valor){
        this.saldo -= valor;
        console.log("Conta " + this.id + " sacou : R$" + valor + "\n");
    }

    depositar(valor){
        this.saldo += valor;
        console.log("Conta " + this.id + " depositou : R$" + valor + "\n");
    }

    transferir(valor, conta){
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
    }
}

module.exports = Conta;