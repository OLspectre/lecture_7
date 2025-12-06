import express from 'express'
import * as productModel from "../models/productModel.js"; // Imports all named functions, first time testing
export const router = express.Router()


// START WITH API GET REQUESTS

router.get("/products/:id", async (req, res) => {
    try {
        const productID = req.params.id;
        console.log(productID);

        const product = await productModel.getProductById(productID);
        console.log(product);

        if (!product) {
            console.log("Found product");

            return res.status(404).json({
                error: "Not found",
                message: `Product with id ${productID} is not in the database`
            });
        }

        res.status(200).json(product);
    }
    catch (err) {
        console.error("Something went wrong when retrieveing product", err.message);
        res.status(500).json({ err: "Internal Server Error" });
    }
});