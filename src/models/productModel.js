
import { pool } from "../database/connection.js";





export async function getProductById(id) {

    const sql = `
    SELECT 
        product 
    FROM 
        products
    WHERE id = ?
    `
    const [result] = await pool.execute(sql, [id]);

    return result;
};