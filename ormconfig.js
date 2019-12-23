/* tslint:disable:quotemark object-literal-sort-keys */
import * as dotenv from 'dotenv';
import {SnakeNamingStrategy } from './src/snake-naming.strategy'

dotenv.config({
    path: `.env`,
});

module.exports = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    keepConnectionAlive: true,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
        'src/modules/**/*.entity{.ts,.js}',
    ],
    migrations: [
        'src/migrations/*{.ts,.js}',
    ],
    synchronize: false,
};
