const request = require('supertest');
const app = require('../../../app');

describe('API Tests - Banco', () => {

    test('Criar um banco', async () => {
        const response = await request(app)
        .post('/bancos').send({
            nome: "Santander"
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Banco criado com sucesso!');
        expect(response.body.banco.nome).toBe('Santander');
    });

    test('Deletar um banco', async () => {
        await request(app)
        .post('/bancos').send({
            nome: 'Banco do Brasil'
        });

        const response = await request(app).delete('/bancos/1');

        expect(response.statusCode).toBe(204);
    });

    test('Listar bancos', async () => {
        await request(app)
        .post('/bancos').send({
            nome: 'Banco do Brasil'
        });

        const response = await request(app).get('/bancos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Buscar Banco Por ID', async () => {
        await request(app).post('/bancos')
        .send({
            nome: 'Bradesco'
        });

        const response = await request(app).get('/bancos/4');

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Bradesco");
    });

    test('Atualizar Banco', async () => {
        const response = await request(app).put('/bancos/3')
        .send({
            nome: 'Caixa'
        });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Caixa');
    });

    test('Criar conta', async () => {
        const response = await request(app).post('/2/contas')
        .send({
            cpf: 254343423,
            nome: 'Amélia',
            saldo: 921
        });

        expect(response.status).toBe(200);
        expect(response.body.bancoId).toBe('2');
        expect(response.body.id).toBe(1);
        expect(response.body.cpf).toBe(254343423);
        expect(response.body.nome).toBe('Amélia');
        expect(response.body.saldo).toBe(921);
    });

    test('Listar Conta', async () => {
        await request(app).post('/2/contas').send({
            cpf: 3333322,
            nome: "Fernando",
            saldo: 5032
        });

        const response = await request(app).get('/2/contas');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.contas)).toBe(true);
        expect(response.body.contas.length).toBeGreaterThan(1);
    });

    test('Buscar Conta Por ID', async () => {
        const response = await request(app).get('/2/contas/2');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(2);
        expect(response.body.nome).toBe('Fernando');
        expect(response.body.saldo).toBe(5032);
        expect(response.body.cpf).toBe(3333322);
    });

    test('Atualizar Conta', async () => {
        const response = await request(app).put('/2/contas/2')
        .send({
            nome: "Fátima",
            saldo: 400,
            cpf: 213123
        });
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Conta atualizada com sucesso!');
        expect(response.body.conta.id).toBe(2);
        expect(response.body.conta.nome).toBe('Fátima');
        expect(response.body.conta.saldo).toBe(400);
        expect(response.body.conta.cpf).toBe(213123);
    });

    test('Deletar Conta', async () => {
        const response = await request(app).delete('/2/contas/2');

        expect(response.status).toBe(204);
    });
});