import express from 'express'
import * as productModel from "../models/productModel.js"; // Imports all named functions, first time testing
export const router = express.Router()



// Must be first so it matches the exakt route "/products". Always static routes first.
router.get("/products", async (req, res) => {

    const { supplier_id, min_quantity } = req.query;
    let filters = {};

    if (supplier_id && min_quantity) {
        return res.status(400).json({ message: "Only one filter is allowed, supplier_id or min_quantity" });
    }

    if (supplier_id) {
        const id = parseInt(supplier_id);

        if (isNaN(id) || id <= 0) {
            console.log("Här");

            return res.status(400).json({ message: "Invalid id, id must be a valid positive number" });
        }
        filters.supplierId = id;

    }

    if (min_quantity) {
        const minQuantity = parseInt(min_quantity);
        if (isNaN(minQuantity) || minQuantity < 0) {
            return res.status(400).json({ message: `The minimum quantity entered is invalid` });
        }
        filters.minQuantity = minQuantity;
    }
    try {
        let products;

        if (Object.keys(filters).length > 0) {
            console.log("filters är true");
            console.log(filters);

            products = await productModel.getFilteredProducts(filters);
            console.log(products);

            if (!products || products.length === 0) {
                return res.status(404).json({
                    error: "Not found",
                    message: `Database of products is empty.`
                });
            }

            return res.status(200).json(products);
        } else {
            products = await productModel.getAllProducts();

            if (!products || products.length === 0) {
                return res.status(404).json({
                    error: "Not found",
                    message: `Database of products is empty.`
                });
            }
            console.log(products);
            return res.status(200).json(products);
        }
    } catch (err) {
        console.error("KRITISKT SERVERFEL:", err.stack);
        console.error("FELMEDDELANDE:", err.message);

        // Använd return
        return res.status(500).json({ err: "Internal Server Error" });
    }
});


router.get("/products/:id/inventory", async (req, res) => {

    const { id } = req.params;

    const productID = parseInt(id);

    if (isNaN(productID) || productID <= 0) {
        console.log("här");

        res.status(400).json({ message: "Invalid id, id must be a valid positive number" });
    }
    try {
        console.log("Id is valid");

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

    const { id } = req.params;

    const productID = parseInt(id);

    if (isNaN(productID) || productID <= 0) {
        res.status(400).json({ message: "Invalid id, id must be a valid positive number" });
    }
    try {
        console.log(`${productID} is a valid id`);
        const supplierData = await productModel.getSupplierDetailsForProduct(productID);

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

    const { id } = req.params;

    const productID = parseInt(id);

    if (isNaN(productID) || productID <= 0) {
        res.status(400).json({ message: "Invalid id, id must be a valid positive number" });
    }

    try {
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

