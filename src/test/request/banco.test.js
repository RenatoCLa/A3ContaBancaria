import supertest from "supertest";
import app from '../../../app.js';

//Testes baseados na estrutura do banco de dados de teste

let id;

it('Listar bancos', async () => {
    const response = await supertest(app).get('/bancos');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
})

it('Listar banco', async () => {
    const response = await supertest(app).get('/bancos/1');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(1);
    expect(response.body.nome).toBe("Caixa");
})

it('Criar banco', async () => {
    const response = await supertest(app).post('/bancos')
    .send({
        nome: 'Banco de Teste',
    });

    id = response.body.resultado.nome.id;

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.resultado.nome.nome).toBe("Banco de Teste");
    expect(response.body.message).toBe("Banco criado com sucesso!");
})

it('Atualizar banco', async () => {
    const response = await supertest(app).put(`/bancos/${id}`)
    .send({
        nome: 'Banco de Teste Atualizado',
    });

    console.log(response.body[0].nome);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].nome).toBe("Banco de Teste Atualizado");
})


it('Deletar banco', async () => {
    console.log(id);
    const response = await supertest(app).del(`/bancos/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Banco deletado com sucesso!");
})