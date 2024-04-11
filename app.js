const Conta = require("./conta.js");
const Pessoa = require("./pessoa.js");

const Fabiano = new Pessoa("Fabiano", 50000);
const FabConta = new Conta(0, Fabiano);

const Gustavo = new Pessoa("Gustavo", 25);
const GuConta = new Conta(0, Gustavo);

FabConta.depositar(5000);
FabConta.transferir(20, GuConta);
FabConta.depositar(0);
FabConta.depositar(-500);

FabConta.verSaldo();
Fabiano.verDinheiro();
GuConta.verSaldo();
Gustavo.verDinheiro();

console.log(FabConta);
console.log(GuConta);