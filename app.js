const express = require('express');
const app = express();
const Conta = require('./conta');
const Banco = require('./banco');

app.use(express.json());

//array para armazenamento de contas, enquanto o banco de dados não é implementado
let contas = [];

let bancos = [];

//pagina inicial
app.get('/', (req, res) => {
    res.send("The website is up");
});

// Banco

//criar um banco
app.post('/banco', (req, res) =>{
    const banco = Banco.create(bancos, req.body);
    res.status(201).json(Banco.returnBanco(banco));
});

//visualizar todos os bancos
app.get('/banco', (req, res) =>{
    const listaBancos = Banco.verTodosBancos(bancos);
    res.send(listaBancos);
});

//atualizar informações do banco
app.put('/banco/:id', (req, res) =>{
    const bancoAtualizado = Banco.update(bancos, parseInt(req.params.id), req.body);
    if (bancoAtualizado){
        res.json(Banco.returnBanco(bancoAtualizado));
    }
    else{
        res.status(404).send('Banco não foi encontrado');
    }
});

//delete banco

app.delete('/banco/:id', (req, res) =>{
    const deletado = Banco.delete(bancos, parseInt(req.params.id));
    if (deletado) {
        res.status(204).send('Banco apagado');
    }
    else{
        res.status(404).send('Banco não foi encontrado');
    }
});

//delete conta from banco

app.delete('/banco/:id_b/:id_c', (req, res) =>{
    const deletado = Banco.deleteConta(bancos, contas, parseInt(req.params.id_b), parseInt(req.params.id_c));
    if (deletado) {
        res.status(204).send('Conta apagada');
    }
    else{
        res.status(404).send('Conta não encontrada');
    }
});

//CONTA

//cria uma nova conta
app.post('/conta', (req, res) =>{
    const conta = Conta.create(contas, bancos, req.body);
    res.status(201).json(Conta.returnConta(conta));
});

//visualizar todas as contas
app.get('/conta', (req, res) =>{
    const listaContas = Conta.verTodasContas(contas);
    res.send(listaContas);
});

//atualizar informações de uma conta
app.put('/conta/:id', (req, res) =>{
    const contaAtualizada = Conta.update(contas, parseInt(req.params.id), req.body);
    if (contaAtualizada){
        res.json(Conta.returnConta(contaAtualizada));
    }
    else{
        res.status(404).send('Conta não foi encontrada');
    }
});

//deleta uma conta
app.delete('/conta/:id_c/:id_b', (req, res) =>{
    const deletado = Conta.delete(contas, bancos, parseInt(req.params.id_c), parseInt(req.params.id_b));
    if (deletado) {
        res.status(204).send('Conta apagada');
    }
    else{
        res.status(404).send('Conta não foi encontrada');
    }
});

//inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Server has started on port:3000");
});