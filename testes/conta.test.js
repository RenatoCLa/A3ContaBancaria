const Conta = require("../conta.js");
const Pessoa = require("../pessoa.js");

describe('Testes da classe Conta', () =>{
    
    //Variáveis da classe conta na inicialização - fabio
    it('Deve apresentar as variáveis certas quando criado', () =>{
        
    });

    //Depositar um valor positivo
    it('Deve depositar um valor positivo', () =>{
        const pessoaTest = new Pessoa("nome", 50);
        const contaTest = new Conta(pessoaTest, 0);

        contaTest.depositar(50);

        expect(contaTest.saldo).toBe(50);
        expect(pessoaTest.dinheiro).toBe(0);
      
    });

    //Receber transferencia 
    it('Deve receber um valor e adiciona-lo ao saldo', () =>{
        const pessoaTest = new Pessoa("nome", 50);
        const contaTest = new Conta(pessoaTest, 0);

        contaTest.receberTransferencia(500);

        expect(contaTest.saldo).toBe(500);

    });

    //Sacar um valor positivo
    it('Deve sacar um valor positivo do seu saldo', () =>{
        const pessoaTest = new Pessoa("nome", 0);
        const contaTest = new Conta(pessoaTest, 500);

        contaTest.sacar(250);
        expect(contaTest.saldo).toBe(250);
        expect(pessoaTest.dinheiro).toBe(250);
        
    });

    //Transferir um valor positivo a uma conta 
    it('Deve transferir um valor positivo a outra conta', () =>{
        const pessoaTest = new Pessoa("Nome", 0);
        const contaTest = new Conta(pessoaTest, 50);

        const pessoaTest2 = new Pessoa("Nome2", 0);
        const contaTest2 = new Conta(pessoaTest2, 0);

        contaTest.transferir(50, contaTest2);

        expect(contaTest.saldo).toBe(0);
        expect(contaTest2.saldo).toBe(50);

        
    });

    //Ver o saldo da conta 
    it('Deve mostrar corretamente o saldo da conta', () =>{
        const pessoaTest = new Pessoa("nome", 0);
        const contaTest = new Conta(pessoaTest, 500);

        expect(contaTest.verSaldo()).toBe(500);
        
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