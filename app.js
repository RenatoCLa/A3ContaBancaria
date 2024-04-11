const Conta = require("./conta.js");
const Pessoa = require("./pessoa.js");

const Fabiano = new Pessoa("Fabiano", 50000);
const FabConta = new Conta(0, Fabiano);

FabConta.depositar(500);

FabConta.verSaldo();
Fabiano.verDinheiro();

console.log(FabConta);