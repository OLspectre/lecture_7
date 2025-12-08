import { pool } from "../database/connection.js";


export async function getAllProducts() {

    const sql = `SELECT * FROM products`;

    try {
        const [result] = await pool.execute(sql, []);
        return result;
    }
    catch (err) {
        console.error("Error", err.message);
    }
};

export async function getSupplierDetailsForProduct(id) {

    const sql = `
    SELECT 
        *
    from 
        products AS p
    INNER JOIN
        suppliers AS s ON p.supplier_id = s.supplier_id
    WHERE
        P.ID = ?
    `
    try {
        const [result] = await pool.execute(sql, [id]);
        console.log(result);
        return result;
    }
    catch (err) {
        console.error("Error", err.message);
    }
};


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
        return result;
    }
    catch (err) {
        console.error("Error", err.message);

    }
};