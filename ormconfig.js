/* tslint:disable:quotemark object-literal-sort-keys */
import * as dotenv from 'dotenv';

dotenv.config({
    path: `.env`,
});

console.log(process.env);
module.exports = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
        'src/modules/**/*.entity{.ts,.js}',
    ],
    migrations: [
        'src/migrations/*{.ts,.js}',
    ],
    synchronize: false,
};
