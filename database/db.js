
import mysql from "mysql2";
import { config } from "dotenv";

config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB__USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error(("Database connection failed:", err));
    } else {
        console.log("Database connected successfully");
        connection.release();
    }
});
export default pool;
