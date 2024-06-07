const request = require('supertest');
const app = require('../../../app');

describe('API Tests - Conta', () => {
    let contaId;
    let bancoId;
    let subContaId;

    beforeAll(async () => {

        const response = await request(app)
        .post('/bancos').send({
            nome: "Itaú"
        });

        bancoId = response.body.banco.id;

        const contaResponse = await request(app)
        .post(`/${bancoId}/contas`).send({
            cpf: 1231232,
            nome: "Tati",
            saldo: 534
        });

        const subContaResponse = await request(app)
        .post(`/${bancoId}/contas`).send({
            cpf: 829292,
            nome: "Gabriel",
            saldo: 10
        });
        
        contaId = contaResponse.body.id;
        subContaId = subContaResponse.body.id;
    });

    test('Sacar', async () => {
        const response = await request(app).put(`/saque/${bancoId}/${contaId}`)
        .send({
            valor: 100
        });
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Saque realizado com sucesso!');
        expect(response.body.saldo).toBe(434);
    });

    test('Depositar', async () => {
        const response = await request(app).put(`/deposito/${bancoId}/${contaId}`)
        .send({
            valor: 66
        });
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Deposito realizado com sucesso!');
        expect(response.body.saldo).toBe(500);
    });

    test('Transferir', async () => {
        const response = await request(app).put(`/${bancoId}/transferir/${contaId}/${subContaId}`)
        .send({
            valor: 25
        });

        expect(response.status).toBe(200);
        expect(response.body.saldo1).toBe(475);
        expect(response.body.saldo2).toBe(35);
    });

    test('Ver Saldo', async () => {
        const response = await request(app).get(`/saldo/${bancoId}/${contaId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Saldo : 475');
    });
});