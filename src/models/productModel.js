import { pool } from "../database/connection.js";


export async function getProductById(id) {

    const sql = `
    SELECT 
        * 
    FROM 
        products
    WHERE id = ?
    `

    try {
        const [result] = await pool.execute(sql, [id]);

        console.log("rad 21", result);
        return result;
    }
    catch (err) {
        console.error("Error", err.message);

    }



};