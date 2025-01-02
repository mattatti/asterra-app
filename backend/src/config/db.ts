import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        port: Number(process.env.DB_PORT),
        logging: console.log, // Set to true for debugging queries
    }
);