import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('conta_bancaria', (err) => {
    if (err){
        console.error(err.message);
    }
    else{
        db.get("PRAGMA foreign_keys = ON");
        
        db.run(`CREATE TABLE IF NOT EXISTS banco (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)`, (err) => {
            if(err){
                console.error(err.message);
            }else{
                console.log("Table exists");
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS conta (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf INTEGER,
            saldo INTEGER, banco_id INTEGER, FOREIGN KEY (banco_id) REFERENCES banco (id))`,
            (err) => {
                if (err){
                    console.error(err.message);
                }
            }
        );

        db.run(`INSERT INTO banco (nome) VALUES ('Bradesco')`);
        db.run(`INSERT INTO banco (nome) VALUES ('Caixa')`);
        db.run(`INSERT INTO banco (nome) VALUES ('Santander')`);
        db.run(`INSERT INTO banco (nome) VALUES ('Banco do Brasil')`);
    }
});