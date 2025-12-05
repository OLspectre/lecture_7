import { app } from "./express.js";


// Develop at IIFE startServer 
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    (err)
        ? console.error("Server failed to start", err)
        : console.log(`Server running on port ${PORT}`);
});