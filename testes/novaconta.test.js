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

});