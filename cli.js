import * as productModel from "./src/models/productModel.js"; // Also importing all named functions to this file to be reused

// Functions to handle client commands in terminal, read/SELECT, create/INSERT

async function handleReadProducts() {

    // Read all or a specific id of a products.
    const whatToRead = process.argv[3];


    try {
        if (!whatToRead) {
            console.log("Argument 3 missing! Must include: node cli.js read (all or id)");
            console.log("Example: node cli.js read all");
            console.log("Example: node cli.js read 3");
            return;
        }

        if (whatToRead === "all") {
            console.log("Retrieveing all products...");
            const products = await productModel.getAllProducts();
            console.log("All products in database:");

            products.forEach(p => console.log(`\nProduct ${p.id}:\n`, p));
            // console.log(products);

        } else if (!isNaN(parseInt(whatToRead))) {
            console.log("argument is valid number");
            const productID = parseInt(whatToRead);

            console.log(`Retrievening product with ID: ${productID}`);
            const product = await productModel.getProductById(productID);

            if (!product) {
                console.log(`Product with ${productID} was not found`);
            } else {
                console.log(product[0]);
            }
        }
        else {
            console.error("Argument used is invalid - must be all or an id");
        }
    }
    catch (err) {
        console.error("Something went wrong reading product data:", err.message);
    }
    process.exit(0);
};
handleReadProducts();