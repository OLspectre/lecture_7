
-- Start of new database for lecture_7

DROP DATABASE IF EXISTS lecture_7_db;
CREATE DATABASE lecture_7_db;
USE lecture_7_db;

CREATE TABLE suppliers(
    supplier_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    supplier_name NVARCHAR(255) NOT NULL,
    contact_info NVARCHAR(255)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name NVARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    supplier_id INT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

