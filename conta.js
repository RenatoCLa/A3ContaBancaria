class Conta {
    constructor(saldo, pessoa){
        this.nome = pessoa.nome;
        this.saldo = saldo;
        this.pessoa = pessoa;
    }

    depositar(deposito){
        if(deposito <= 0){
            console.log("numero inválido");
            return "numero inválido";
        }else if(this.pessoa.dinheiro >= deposito){
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
        if(valor <= 0){
            console.log("numero inválido");
            return "numero inválido";
        }else if(this.saldo >= valor){
            this.saldo -= valor;
            this.pessoa.receber(valor);
        }else{
            console.log("Você não possui saldo suficiente.");
        }
    }

    transferir(valor, conta){
        if(valor <= 0){
            console.log("numero inválido");
            return "numero inválido";
        }else if(conta.nome === this.nome){
            console.log("Não é possivel realizar uma tranferência para a sua própria conta.");
            return "transferencia para a própria conta";
        }else if(this.saldo >= valor){
            this.saldo -= valor;
            conta.receberTransferencia(valor);
        }else{
            console.log("Saldo insuficiente.");
        }
    }

    verSaldo(){
        console.log("Conta: " + this.nome +" Saldo: R$" + this.saldo);
        return this.saldo;
    }
}

module.exports = Conta;