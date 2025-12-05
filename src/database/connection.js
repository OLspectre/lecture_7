
import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

let pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'lecture_7_db',
    port: process.env.DB_PORT
});
export default pool;



