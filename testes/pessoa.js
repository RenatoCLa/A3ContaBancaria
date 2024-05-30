const Pessoa = require("../pessoa.js");

describe('Teste da classe pessoa', () =>{

    //Variáveis da classe presentes na inicialização - fabio
    it('Deve apresentar corretamente as variáveis recebidas na sua criação', () =>{
        const pessoaTest = new Pessoa("nome", 25);

        expect(typeof pessoaTest).toBe('object');
        expect(pessoaTest.nome).toBe("nome");
        expect(pessoaTest.dinheiro).toBe(25);
    });

    //Realizar deposito - fabio
    it('Deve retirar o valor do dinheiro da pessoa para o deposito', () =>{
        const pessoaTest = new Pessoa("nome", 500);
        pessoaTest.realizarDeposito(250);

        expect(pessoaTest.dinheiro).toBe(250);
    });

    //Receber - fabio
    it('Deve receber o valor de um saque', () =>{
        const pessoaTest = new Pessoa("nome", 15);
        pessoaTest.receber(25);

        expect(pessoaTest.dinheiro).toBe(40);
    });

    //Ver dinheiro - fabio
    it('Deve visualizar corretamente o dinheiro da pessoa', () =>{
        const pessoaTest = new Pessoa("nome", 72);

        expect(pessoaTest.verDinheiro()).toBe(72);
    });
});