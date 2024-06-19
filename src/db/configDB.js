import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('conta_bancaria.db', (err) => {
    if (err){
        console.error(err.message);
    }
    else{
        db.get("PRAGMA foreign_keys = ON");
        
        db.run(`CREATE TABLE IF NOT EXISTS banco (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            nome TEXT NOT NULL)`,
            (err) => {
            if(err){
                console.error(err.message);
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS conta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf INTEGER NOT NULL UNIQUE,
            saldo INTEGER NOT NULL,
            banco_id INTEGER NOT NULL,
            FOREIGN KEY (banco_id) REFERENCES banco (id))`,
            (err) => {
                if (err){
                    console.error(err.message);
                }
            }
        );

        
    }
});

export default db;