import express from 'express'
import * as productModel from "../models/productModel.js"; // Imports all named functions, first time testing
export const router = express.Router()


// START WITH API GET REQUESTS

// Must be first so it matches the exakt route "/products". Always static routes first.
router.get("/products", async (req, res) => {

    try {
        const products = await productModel.getAllProducts();
        console.log(products);

        if (!products) {
            return res.status(404).json({
                error: "Not found",
                message: `Database of products is empty.`
            })
        }

        res.status(200).json(products);
    }
    catch (err) {
        console.error("Something went wrong when retrieveing product", err.message);
        res.status(500).json({ err: "Internal Server Error" });
    }
});


router.get("/products/:id/inventory", async (req, res) => {

    try {
        const productID = req.params.id;
        const inventoryOfProduct = await productModel.getInventoryOfProduct(productID);

        if (!inventoryOfProduct) {
            return res.status(404).json({
                error: "Not found",
                message: `Product with id ${productID} is not in the database`
            });
        }

        res.status(200).json(inventoryOfProduct);
    }
    catch (err) {
        console.error("Something went wrong when retrieveing product", err.message);
        res.status(500).json({ err: "Internal Server Error" });
    }
});


router.get("/products/:id/supplier", async (req, res) => {
    try {
        const productID = req.params.id;
        console.log("id of wanted product:", productID);

        const supplierData = await productModel.getSupplierDetailsForProduct(productID);
        console.log(`${productID} is a valid id`);
        console.log(supplierData);

        if (!supplierData) {

            return res.status(404).json({
                error: "Not found",
                message: `Product with id ${productID} is not in the database`
            });
        }
        res.status(200).json(supplierData);
    }
    catch (err) {
        console.error("Something went wrong when retrieveing product", err.message);
        res.status(500).json({ err: "Internal Server Error" });
    }
});


router.get("/products/:id", async (req, res) => {
    try {
        const productID = req.params.id;
        console.log(productID);

        const product = await productModel.getProductById(productID);
        console.log(product);

        if (!product) {

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

