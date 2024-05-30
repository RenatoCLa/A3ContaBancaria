const Conta = require('../conta.js');
const Banco = require('../banco.js');

describe('Testes de Conta', () =>{

    it('Deve apresentar as variáveis certas quando criado', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 100, banco.id);
        banco.contas.push(conta);

        expect(typeof conta).toBe('object');

        expect(conta.nome).toBe("Caio");
        expect(conta.saldo).toBe(100);
        expect(conta.cpf).toBe(100231);
        expect(conta.id).toBe(1);

        expect(typeof conta.banco).toBe('number');

        expect(conta.banco).toBe(banco.id);
        
        expect(banco.contas).toContain(conta);
    });

    it('Deve depositar um valor positivo', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 0, banco.id);

        conta.depositar(100);

        expect(conta.saldo).toBe(100);
    });

    it('Deve sacar um valor positivo', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 50, banco.id);

        conta.sacar(40);

        expect(conta.saldo).toBe(10);
    });

    it('Deve transferir um valor a uma conta', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 50, banco.id);
        const conta2 = new Conta(2, 321296, "Fabio", 0, banco.id);

        conta.transferir(30, conta2);

        expect(conta.saldo).toBe(20);
        expect(conta2.saldo).toBe(30);
    });

    it('Deve exibir corretamente o saldo da conta', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 0, banco.id);

        expect(conta.verSaldo()).toBe(0);

        conta.depositar(125.31);

        expect(conta.verSaldo()).toBe(125.31);
    });
});

describe('Testes de erro de Conta', () =>{

    it('Não deve realizar uma transferência sem uma conta de destino', ()=>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 10, banco.id);

        expect(() => conta.transferir(10, undefined)).toThrowError('Conta invalida');
    });

    it('Não deve realizar uma transferência para a sua própria conta', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 10, banco.id);

        expect(() => conta.transferir(10, conta)).toThrowError('Conta invalida');
    });

    it('Não deve realizar uma transferência com um valor maior que o de seu saldo', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 5, banco.id);
        const conta2 = new Conta(2, 298321, "Fernando", 0, banco.id);

        expect(() => conta.transferir(10, conta2)).toThrowError('Saldo insuficiente');
    });

    it('Não deve realizar um saque que exceda o saldo', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 99, banco.id);

        expect(() => conta.sacar(100)).toThrowError('Valor invalido');
    });
    
    it('Não deve realizar um saque de valor 0', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 5, banco.id);

        expect(() => conta.sacar(0)).toThrowError('Valor invalido');
    });

    it('Não deve realizar um deposito de valor 0', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 5, banco.id);

        expect(() => conta.depositar(0)).toThrowError('Valor invalido');
    });

    it('Não deve realizar um saque de um valor negativo', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 5, banco.id);

        expect(() => conta.sacar(-2)).toThrowError('Valor invalido');
    });

    it('Não deve realizar um deposito de um valor negativo', () =>{
        const banco = new Banco("Bradesco", 1);
        const conta = new Conta(1, 100231, "Caio", 5, banco.id);

        expect(() => conta.depositar(-2)).toThrowError('Valor invalido');
    });

});