export default {
    development: {
        storage: "database/db_solera.sqlite",
        dialect: 'sqlite',
    },
    test: {
        storage: ':memory',
        dialect: 'sqlite'
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
}
