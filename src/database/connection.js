
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

pool.getConnection((err, connection) => {
    if (err) {
        console.error(("Database connection failed:", err));
    } else {
        console.log("Database connected successfully");
        connection.release();
    }
});

