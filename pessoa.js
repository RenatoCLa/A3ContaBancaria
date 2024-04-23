//Não é necessário o uso dessa classe para o sistema, remover ela futuramente
class Pessoa {
    constructor(nome, dinheiro){
        this.nome = nome;
        this.dinheiro = dinheiro;
    }

    realizarDeposito(valor){
        this.dinheiro -= valor;
    }

    receber(valor){
        this.dinheiro += valor;
    }

    verDinheiro(){
        console.log(this.nome + " tem R$" + this.dinheiro);
        return this.dinheiro;
    }
}

module.exports = Pessoa;