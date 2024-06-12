import db from './configDB.js';

function fillDB(){
    db.run(`INSERT INTO banco (nome) VALUES ('Bradesco')`);
    db.run(`INSERT INTO banco (nome) VALUES ('Caixa')`);
    db.run(`INSERT INTO banco (nome) VALUES ('Santander')`);
    db.run(`INSERT INTO banco (nome) VALUES ('Banco do Brasil')`);
    db.run("INSERT INTO conta (nome, cpf, saldo, banco_id) VALUES ('josué', 02381239012, 250, 3)");
}

function resetDB(){
    db.run("DROP TABLE conta");
    db.run("DROP TABLE banco");
}

//fillDB();
//resetDB();