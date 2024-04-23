class Conta {

    constructor(nome, ID, cpf, saldo){
        this.nome = nome;
        this.saldo = saldo;
        this.cpf = cpf;
        this.ID = ID;
    }

    /* Esperar a criação do banco de dados para implementar essa função
    gerarID(){

    }
    */

    //Notas | Todo

    //Converter os valores imprimidos para valores monetarios; ex: 4 => 04,00
    //Implementar a mudança do saldo da conta no banco de dados em todas as funções

    sacar(valor){
        this.saldo -= valor;
        console.log("Conta " + this.ID + " sacou : R$" + valor + "\n");
    }

    depositar(valor){
        this.saldo += valor;
        console.log("Conta " + this.ID + " depositou : R$" + valor + "\n");
    }

    transferir(valor, conta){
        this.saldo -= valor;
        console.log("Realizado transferência de R$ " + valor + " da conta " + this.ID + " para a conta " + conta.ID + "\n");
        conta.receberTransferencia(valor);
    }

    receberTransferencia(valor){
        this.saldo += valor;
        console.log("Conta " + this.ID + " recebeu transferência de R$" + valor + "\n");
    }

    verSaldo(){
        console.log("O saldo da conta " + this.ID + " é : R$" + this.saldo + "\n");
    }

    /*

    depositar(deposito){
        if(deposito <= 0){
            console.log("numero inválido");
            throw new Error('numero inválido');
        }else if(this.pessoa.dinheiro >= deposito){
            this.saldo += deposito;
            this.pessoa.realizarDeposito(deposito);
        }else{
            console.log("Você não possui dinheiro o suficiente para realizar o deposito.");
            throw new Error('dinheiro insuficiente');
        }
    }

    receberTransferencia(transferencia){
        this.saldo += transferencia;
    }

    sacar(valor){
        if(valor <= 0){
            console.log("numero inválido");
            throw new Error('numero inválido');
        }else if(this.saldo >= valor){
            this.saldo -= valor;
            this.pessoa.receber(valor);
        }else{
            console.log("Você não possui saldo suficiente.");
            throw new Error('Você não possui saldo suficiente');
        }
    }

    transferir(valor, conta){
        if(valor <= 0){
            console.log("numero inválido");
            throw new Error('numero inválido');
        }else if(conta.nome === this.nome){
            console.log("Não é possivel realizar uma tranferência para a sua própria conta.");
            throw new Error('transferencia para a própria conta não é permitido');
        }else if(this.saldo >= valor){
            this.saldo -= valor;
            conta.receberTransferencia(valor);
        }else{
            console.log("Saldo insuficiente.");
            throw new Error('saldo insuficiente');
        }
    }

    verSaldo(){
        console.log("Conta: " + this.nome +" Saldo: R$" + this.saldo);
        return this.saldo;
    }

    */
}

module.exports = Conta;