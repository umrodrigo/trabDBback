require('dotenv').config();

const rootPath = process.env.NODE_ENV?.toLocaleLowerCase() === 'production'
    ? 'dist'
    : 'src';

module.exports = {
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    migrations: [
        `${rootPath}/core/data/database/migrations/**/*`
    ],
    entities: [
        `${rootPath}/core/data/database/entities/**/*`
    ],
    cli: {
        entitiesDir: 'src/core/data/database/entities',
        migrationsDir: 'src/core/data/database/migrations',
    },
}