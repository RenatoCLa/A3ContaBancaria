class Conta {
    constructor(saldo, pessoa){
        this.nome = pessoa.nome;
        this.saldo = saldo;
        this.pessoa = pessoa;
    }

    depositar(deposito){
        if(this.pessoa.dinheiro >= deposito){
            this.saldo += deposito;
            this.pessoa.pagarDeposito(deposito);
        }else{
            console.log("Você não possui dinheiro o suficiente para realizar o deposito");
        }
        
    }

    sacar(valor){
        this.saldo -= valor;
        this.pessoa.receber(valor);
    }

    transferir(valor, conta){
        this.saldo -= valor;
        conta.depositar(valor);
    }

    verSaldo(){
        console.log("Conta: " + this.nome +" Saldo: R$" + this.saldo);
    }
}

module.exports = Conta;