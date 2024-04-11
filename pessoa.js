class Pessoa {
    constructor(nome, dinheiro){
        this.nome = nome;
        this.dinheiro = dinheiro;
    }

    pagarDeposito(valor){
        this.dinheiro -= valor;
    }

    receber(valor){
        this.dinheiro += valor;
    }

    verDinheiro(){
        console.log(this.nome + " tem R$" + this.dinheiro);
    }
}

module.exports = Pessoa;