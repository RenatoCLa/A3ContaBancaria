import knex from 'knex';
const kn = knex({
    client: 'sqlite3',
    connection: {
      filename: './conta_bancaria.db'
    },
    useNullAsDefault: true
});

export default kn;