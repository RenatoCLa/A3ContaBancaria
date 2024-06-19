import Conta from '../../models/conta.js';

describe('Testes de Conta', () =>{

    let id_test;
    
    it('Deve apresentar as variáveis certas quando criado', async () =>{
        const conta = new Conta(99999, "Testando Criação de Conta", 250, 1);
        const response = await conta.criar();

        let id = response.id;

        id_test = id;

        let conta_req = await Conta.pegarContaPorId(id);

        expect(conta_req[0].nome).toBe("Testando Criação de Conta");
        expect(conta_req[0].saldo).toBe(250);
        expect(conta_req[0].cpf).toBe(99999);
        expect(conta_req[0].id).toBe(id);
        expect(conta_req[0].banco_id).toBe(1);
    });

    it('Deve listar as contas', async ()=> {
        const response = await Conta.pegarContas();

        expect(response.length).toBeGreaterThan(1);
        expect(response[0].nome).toBe("Eduardo");
        expect(response[0].saldo).toBe(25);
        expect(response[0].cpf).toBe(1000);
        expect(response[0].id).toBe(1);
        expect(response[0].banco_id).toBe(1);
    });

    it('Deve listar uma conta, baseado em seu id', async ()=> {
        
        const response = await Conta.pegarContaPorId(1);

        expect(response[0].nome).toBe("Eduardo");
        expect(response[0].saldo).toBe(25);
        expect(response[0].cpf).toBe(1000);
        expect(response[0].id).toBe(1);
        expect(response[0].banco_id).toBe(1);
    });

    it('Deve atualizar uma conta', async ()=> {
        let name;
        
        const response = await Conta.pegarContaPorId(2);

        if(response.nome == "Fabiano"){

            const conta = new Conta(2000, "Danielle");
            conta.atualizar(2);
            name = banco.nome;
        }else{
            const conta = new Conta(2000, "Fabiano");
            conta.atualizar(2);
            name = conta.nome;
        }

        const resultado = await Conta.pegarContaPorId(2);

        expect(resultado[0].nome).toBe(name);
        expect(resultado[0].cpf).toBe(2000);
        expect(resultado[0].saldo).toBe(3000);
        expect(resultado[0].id).toBe(2);
    });

    it('Deve excluir corretamente', async ()=> {
        const response = await Conta.excluir(id_test);

        expect(response[0].nome).toBe("Testando Criação de Conta");
        expect(response[0].saldo).toBe(250);
        expect(response[0].cpf).toBe(99999);
        expect(response[0].id).toBe(id_test);
        expect(response[0].banco_id).toBe(1);
    });

    it('Deve sacar um valor corretamente', async ()=> {

        const conta = new Conta(1323291, "sacar /saldo deve ser 0", 100, 1);
        const response = await conta.criar();


        let id = response.id;

        await Conta.sacar(id, 100);

        await new Promise(resolve => setTimeout(resolve, 15));

        let banco_saldo = await Conta.pegarContaPorId(id);
        
        await Conta.excluir(id);

        expect(banco_saldo[0].saldo).toBe(0);
    })

    it('Deve depositar um valor corretamente', async ()=> {

        const conta = new Conta(1323291, "depositar /saldo deve ser 100", 0, 1);
        const response = await conta.criar();

        let id = response.id;

        await Conta.depositar(id, 100);

        await new Promise(resolve => setTimeout(resolve, 15));

        let banco_saldo = await Conta.pegarContaPorId(id);
        
        await Conta.excluir(id);

        expect(banco_saldo[0].saldo).toBe(100);
    })

    it('Deve transferir um valor corretamente', async ()=> {

        const conta = new Conta(1323291, "transferir /saldo deve ser 0", 100, 1);
        const response = await conta.criar();

        const conta2 = new Conta(376213, "transferido /saldo deve ser 100", 0, 1);
        const response2 = await conta2.criar();

        let id = response.id;

        let id2 = response2.id;

        await Conta.transferir(id, id2, 100);

        await new Promise(resolve => setTimeout(resolve, 15));

        let conta_saldo = await Conta.pegarContaPorId(id);

        let conta_saldo2 = await Conta.pegarContaPorId(id2);
        
        await Conta.excluir(id);

        expect(conta_saldo[0].saldo).toBe(0);
        expect(conta_saldo2[0].saldo).toBe(100);
    })

    it('Deve exibir corretamente o saldo', async ()=> {

        const conta = new Conta(191191, "ver saldo", 100, 1);
        const response = await conta.criar();

        let id = response.id;

        expect(await Conta.verSaldo(id)).toBe('O saldo da conta é de R$ 100');

        await Conta.excluir(id);
    })

});