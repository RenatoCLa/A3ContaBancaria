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
        bancoId = response.body.banco.id;
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

    test('Busca ID', async () => {
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

});