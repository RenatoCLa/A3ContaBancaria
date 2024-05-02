const express = require('express');
const app = express();
const Conta = require('./conta');

app.use(express.json());

//CRUD

//CREATE (feito)
//READ (feito)
//UPDATE (feito)
//DELETE

//array para armazenamento de contas, enquanto o banco de dados não é implementado
let contas = [];

//pagina inicial
app.get('/', (req, res) => {
    res.send("The website is up");
});

//cria uma nova conta
app.post('/conta', (req, res) =>{
    const conta = Conta.create(contas, req.body);
    res.status(201).json(Conta.returnConta(conta));
})

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
app.delete('/conta/:id', (req, res) =>{
    const deletado = Conta.delete(contas, parseInt(req.params.id));
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