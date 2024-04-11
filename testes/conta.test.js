const Conta = require("../conta.js");
const Pessoa = require("../pessoa.js");

describe('Testes da classe Conta', () =>{
    
    //Variáveis da classe conta na inicialização - fabio
    it('Deve apresentar as variáveis certas quando criado', () =>{
        
    });

    //Depositar um valor positivo a uma conta - gusta
    it('Deve depositar um valor positivo a outra conta', () =>{
        
    });

    //Receber transferencia - gusta
    it('Deve receber um valor e adiciona-lo ao saldo', () =>{
        
    });

    //Sacar um valor positivo - gusta
    it('Deve sacar um valor positivo do seu saldo', () =>{
        
    });

    //Transferir um valor positivo a uma conta - gusta
    it('Deve transferir um valor positivo a outra conta', () =>{
        
    });

    //Ver o saldo da conta - gusta
    it('Deve mostrar corretamente o saldo da conta', () =>{
        
    });
});

describe('Testes de erro da classe Conta', () =>{

    //Depositar um valor negativo - dani
    it('Não deve permitir o deposito de um valor negativo', () =>{
        
    });
    
    //Depositar um valor 0 - dani
    it('Não deve permitir o deposito de 0', () =>{
        
    });

    //Depositar um valor maior do que o seu limite - dani
    it('Não deve permitir o deposito de um valor acima do dinheiro que a pessoa tem em mãos', () =>{
        
    });

    //Sacar um valor negativo - dani
    it('Não deve permitir sacar um valor negativo', () =>{
        
    });

    //Sacar um valor 0 - dani
    it('Não deve permitir sacar um valor 0', () =>{
        
    });

    //Sacar um valor maior que o seu saldo - edu
    it('Não deve permitir sacar um valor que excede o seu saldo', () =>{
        
    });

    //Transferir para a sua propria conta - edu
    it('Não deve permitir a transferencia para a sua própria conta', () =>{
        
    });

    //Transferir um valor negativo - edu
    it('Não deve permitir a transferencia de um valor negativo', () =>{
        
    });

    //Transferir um valor 0 - edu
    it('Não deve permitir a transferencia de um valor 0', () =>{
        
    });

    //Transferir um valor maior que o seu saldo - edu
    it('Não deve permitir a transferencia de um valor que excede o seu saldo', () =>{
        
    });
});