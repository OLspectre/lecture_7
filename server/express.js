
// IMPORTS
import express from "express";
import pool from "../database/db.js";

import { config } from 'dotenv';
config();

const app = express();

const PORT = 3000;

app.listen(PORT, (err) => {
    (err)
        ? console.error("Server failed to start", err)
        : console.log(`Server running on port ${PORT}`);
});



// CRUD OPERATIONS

app.get("/users", async (req, res) => {

    try {
        const [rows] = await pool.execute("SELECT * FROM users");
        res.json()
    }
    catch (err) {
        res.json({ error: err.message })
    };

});