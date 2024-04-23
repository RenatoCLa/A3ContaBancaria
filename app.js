const Conta = require("./conta");

//Solução temporária para a criação de IDs de conta
const conta01 = new Conta("joao", (Math.random() * 100000000).toFixed(0), 1012123109, 10);

const conta02 = new Conta("jorge", (Math.random() * 100000000).toFixed(0), 23210321321, 0);

conta01.verSaldo();

conta01.sacar(4);

conta01.verSaldo();

conta01.depositar(5);

conta01.verSaldo();

conta02.verSaldo();

conta01.transferir(10, conta02);

conta01.verSaldo();

conta02.verSaldo();