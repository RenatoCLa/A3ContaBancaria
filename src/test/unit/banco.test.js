import Banco from '../../models/banco.js';

describe('Testes de Banco', () =>{

    let id_test;

    it('Deve apresentar as variáveis certas em sua criação', async ()=> {
        const banco = new Banco("Banco Do Nordeste");
        const response = await banco.criar();

        let id = response.nome.id;

        id_test = id;

        let banco_req = await Banco.pegarBancoPorId(id);

        expect(banco_req.nome).toBe("Banco Do Nordeste");
        expect(banco_req.id).toBe(id);
    });

    it('Deve listar os bancos', async ()=> {

        const response = await Banco.pegarBancos();

        expect(response[0].id).toBe(1);
        expect(response[0].nome).toBe("Caixa");
    });

    it('Deve listar um banco, baseado em seu id', async ()=> {
        
        const response = await Banco.pegarBancoPorId(1);

        expect(response.nome).toBe("Caixa");
        expect(response.id).toBe(1);
    });

    it('Deve atualizar um banco', async ()=> {

        let name;
        
        const response = await Banco.pegarBancoPorId(4);

        if(response.nome == "Banco Central"){

            const banco = new Banco("Bradesco");
            banco.atualizar(4);
            name = banco.nome;
        }else{
            const banco = new Banco("Banco Central");
            banco.atualizar(4);
            name = banco.nome;
        }

        const resultado = await Banco.pegarBancoPorId(4);

        expect(resultado.nome).toBe(name);
        expect(resultado.id).toBe(4);
    });

    it('Deve excluir corretamente', async ()=> {
        const response = await Banco.excluir(id_test);

        expect(response[0].nome).toBe("Banco Do Nordeste");
        expect(response[0].id).toBe(id_test);
    });
});