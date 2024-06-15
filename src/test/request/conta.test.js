import supertest from "supertest";
import app from '../../../app.js';

//Testes baseados na estrutura do banco de dados de teste

let id;

it('Listar contas', async () => {
    const response = await supertest(app).get('/contas');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
})

it('Listar conta', async () => {
    const response = await supertest(app).get('/contas/1');

    expect(response.status).toBe(200);
    expect(response.body[0]).toBeDefined();
    expect(response.body[0].cpf).toBe(1000);
    expect(response.body[0].nome).toBe("Eduardo");
    expect(response.body[0].saldo).toBe(25);
    expect(response.body[0].banco_id).toBe(1);
})

it('Criar conta', async () => {
    const response = await supertest(app).post('/contas')
    .send({
        cpf: "91231",
        nome: "Lucas",
        saldo: 25,
        banco_id: 1,
    });

    id = response.body.resultado.id;

    expect(response.status).toBe(201);
    expect(response.body.resultado).toBeDefined();
    expect(response.body.resultado.cpf).toBe(91231);
    expect(response.body.resultado.nome).toBe("Lucas");
    expect(response.body.resultado.saldo).toBe(25);
    expect(response.body.resultado.banco_id).toBe(1);
})

it('Atualizar banco', async () => {
    const response = await supertest(app).put(`/contas/${id}`)
    .send({
        nome: "Pereira",
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
})

it('Deletar conta', async () => {
    const response = await supertest(app).del(`/contas/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Conta deletada com sucesso!");
})

it('Sacar', async () => {
    const response = await supertest(app).post('/contas')
    .send({
        cpf: "002",
        nome: "Teste de saque / saldo deve ser 0",
        saldo: 30,
        banco_id: 1,
    });

    let id = response.body.resultado.id;
    const resp = await supertest(app).put(`/contas/saque/${id}`)
    .send({
        valor: 30,
    });

    await new Promise(resolve => setTimeout(resolve, 15));
    const saldo_novo = await supertest(app).get(`/contas/${id}`);

    expect(resp.status).toBe(200);
    expect(saldo_novo.body[0].saldo).toBe(0);
    expect(resp.body.message).toBe("Saque realizado com sucesso!");


    /*Remover a função abaixo para poder visualizar as alterações de valores no banco de dados
    Essa função serve para apagar a conta criada nesse teste, para que caso use os testes novamente, outra
    conta seja criada no seu lugar*/

    await supertest(app).del(`/contas/${id}`);
})

it('Depositar', async () => {
    const response = await supertest(app).post('/contas')
    .send({
        cpf: "003",
        nome: "Teste de deposito / saldo deve ser 9",
        saldo: 2,
        banco_id: 1,
    });

    let id = response.body.resultado.id;

    const resp = await supertest(app).put(`/contas/deposito/${id}`)
    .send({
        valor: 7,
    });

    await new Promise(resolve => setTimeout(resolve, 15));
    const saldo_novo = await supertest(app).get(`/contas/${id}`);

    expect(resp.status).toBe(200);
    expect(saldo_novo.body[0].saldo).toBe(9);
    expect(resp.body.message).toBe("Deposito realizado com sucesso!");

    /*Remover a função abaixo para poder visualizar as alterações de valores no banco de dados
    Essa função serve para apagar a conta criada nesse teste, para que caso use os testes novamente, outra
    conta seja criada no seu lugar*/

    await supertest(app).del(`/contas/${id}`);
})

it('Transferir', async () => {
    const response = await supertest(app).post('/contas')
    .send({
        cpf: "004",
        nome: "Teste de transferencia (1) / saldo deve ser 0",
        saldo: 10,
        banco_id: 1,
    });

    let id = response.body.resultado.id;

    const response2 = await supertest(app).post('/contas')
    .send({
        cpf: "005",
        nome: "Teste de transferencia (2) / saldo deve ser 10",
        saldo: 0,
        banco_id: 1,
    });

    let id2 = response2.body.resultado.id;

    const resp = await supertest(app).put(`/contas/transferir/${id}/${id2}`)
    .send({
        valor: 10,
    });

    expect(resp.status).toBe(200);

    await new Promise(resolve => setTimeout(resolve, 15));
    const saldo_novo = await supertest(app).get(`/contas/${id}`);
    const saldo_novo_trans = await supertest(app).get(`/contas/${id2}`);
    
    expect(saldo_novo.body[0].saldo).toBe(0);
    expect(saldo_novo_trans.body[0].saldo).toBe(10);

    /*Remover a função abaixo para poder visualizar as alterações de valores no banco de dados
    Essa função serve para apagar a conta criada nesse teste, para que caso use os testes novamente, outra
    conta seja criada no seu lugar*/
    
    await supertest(app).del(`/contas/${id}`);

    await supertest(app).del(`/contas/${id2}`);
})

it('Ver Saldo', async () => {
    const response = await supertest(app).get('/contas/saldo/2');
    
    expect(response.status).toBe(200);
    expect(response.body).toBe('O saldo da conta é de R$ 3000');
})