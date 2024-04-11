class Conta {
    constructor(saldo, pessoa){
        this.nome = pessoa.nome;
        this.saldo = saldo;
        this.pessoa = pessoa;
    }

    depositar(deposito){
        if(this.pessoa.dinheiro >= deposito){
            this.saldo += deposito;
            this.pessoa.realizarDeposito(deposito);
        }else{
            console.log("Você não possui dinheiro o suficiente para realizar o deposito.");
        }
    }

    receberTransferencia(transferencia){
        this.saldo += transferencia;
    }

    sacar(valor){
        if(this.saldo >= valor){
            this.saldo -= valor;
            this.pessoa.receber(valor);
        }else{
            console.log("Você não possui saldo suficiente.");
        }
    }

    transferir(valor, conta){
        if(conta.nome === this.nome){
            console.log("Não é possivel realizar uma tranferência para a sua própria conta.");
        }else if(this.saldo >= valor){
            this.saldo -= valor;
            conta.receberTransferencia(valor);
        }else{
            console.log("Saldo insuficiente.");
        }
    }

    verSaldo(){
        console.log("Conta: " + this.nome +" Saldo: R$" + this.saldo);
    }
}

module.exports = Conta;