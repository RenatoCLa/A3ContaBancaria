const Banco = require('../../Models/banco.js');
const Conta = require('../../Models/conta.js');

describe('Testes de Banco', () =>{

    it('Deve apresentar as variáveis certas em sua criação', ()=> {
        const banco = new Banco("Banco do Brasil", 1);
        const conta1 = new Conta(1, 9548382, "Gabriel", 200, banco.id);
        banco.contas.push(conta1);

        expect(typeof banco).toBe('object');
        expect(banco.nome).toBe("Banco do Brasil");
        expect(banco.id).toBe(1);
        expect(banco.contas).toContain(conta1);
    });

    it('Deve adicionar corretamente contas ao banco', ()=> {
        const banco = new Banco("Caixa", 1);
        const conta1 = new Conta(1, 32123, "Tati", 100, banco.id);
        const conta2 = new Conta(2, 943782, "Tadeu", 32, banco.id);

        banco.contas.push(conta1);
        banco.contas.push(conta2);
        
        expect(banco.contas).toContain(conta1 && conta2);

        expect(banco.contas.at(0)).toBe(conta1);
        expect(banco.contas.at(1)).toBe(conta2);
    });
});