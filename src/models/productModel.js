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
        s.supplier_id,
        s.supplier_name,
        s.contact_info
    from 
        products AS p
    INNER JOIN
        suppliers AS s ON p.supplier_id = s.supplier_id
    WHERE
        P.id = ?
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

export async function getInventoryOfProduct(id) {
    console.log("looking for:", id);

    const sql = `
    SELECT 
        id AS product_id,
        supplier_id,
        quantity,
        updated_at
    FROM
        products
    WHERE
    id = ?
    `

    try {
        const [result] = await pool.execute(sql, [id]);
        return result;
    }
    catch (err) {
        console.error("Error", err.message);
    }

};

export async function createProduct(data) {
    console.log("new product to be added:", data);

    const productData = [];
    for (const d in data) {
        productData.push(data[d])
    }
    console.log(productData);


    const sql = `
        INSERT INTO products
            (product_name,
            category,
            description,
            price,
            quantity,
            supplier_id)
        VALUES
            (?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.execute(sql, productData);
        return result;
    }
    catch (err) {
        console.error("Error:", err.message);
    }
};