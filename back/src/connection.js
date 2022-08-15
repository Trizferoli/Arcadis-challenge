
// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         user: 'postgres',
//         password: '071011',
//         database: 'arcadis',
//     }

// });

// module.exports = knex;
const knex = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    }

});

module.exports = knex;