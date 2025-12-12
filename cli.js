import * as productModel from "./src/models/productModel.js"; // Also importing all named functions to this file to be reused

const fullArgs = process.argv.slice(2);
const instruction = fullArgs[0];
const instructionArgs = fullArgs.slice(1);


// Functions to handle client commands in terminal, read/SELECT, add/INSERT
switch (instruction) {
    case "read":
        await handleReadProducts(instructionArgs[0]);
        break;

    case "add":
        await handleCreateProduct(instructionArgs);
        break;

    default:
        console.log("Instruction must either be read or add");
        break;
};

async function handleReadProducts(whatToRead) {
    // Read all or a specific id of a products.

    try {
        if (!whatToRead) {
            console.log("Argument 3 missing! Must include: node cli.js read (all or id)");
            console.log("Example: node cli.js read all");
            console.log("Example: node cli.js read 3");
            return;
        }

        if (whatToRead === "all") {
            const products = await productModel.getAllProducts();
            console.log("All products in database:");

            products.forEach(p => console.log(`\nProduct ${p.id}:\n`, p));
            process.exit(0);

        } else if (!isNaN(parseInt(whatToRead))) {
            console.log("argument is valid number");
            const productID = parseInt(whatToRead);

            console.log(`Trying to retrieve product iwth ID: ${productID}`);
            const product = await productModel.getProductById(productID);

            if (product.length === 0) {
                console.log(`Product with ${productID} was not found`);
            } else {
                console.log("Product found:");
                console.log(product[0]);
                process.exit(0);
            }
        }
        else {
            console.error("Argument used is invalid - must be all or an id");
        }
    }
    catch (err) {
        console.error("Something went wrong reading product data:", err.message);
        process.exit(1);

    }
};

async function handleCreateProduct(data) {
    // Array of data recieved
    console.log("Will soon create new product");
    console.log(data);

    if (data.length < 3) {
        console.error("Error: You must enter name, price, quantity(default 0) and supplier_id");
        process.exit(1);
    }
    try {
        const newProduct = {
            product_name: data[0],
            category: data[1],
            description: data[2] || null,
            price: parseFloat(data[3]),
            quantity: parseInt(data[4] || 0),
            supplier_id: parseInt(data[5])
        };

        if (isNaN(newProduct.price) || isNaN(newProduct.supplier_id)) {
            console.error("Error: Price and Supplier ID must be a valid number");
            process.exit(1);
        }

        const addedProduct = await productModel.createProduct(newProduct);
        if (addedProduct) console.log(`A new product: ${addedProduct.product_name} was successfully added`);
        process.exit(0);
    }
    catch (err) {
        console.error("Something went wrong adding a product:", err.message);
        process.exit(1);
    }
};