
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

ALTER TABLE products ADD
COLUMN category NVARCHAR(50)
AFTER product_name;

INSERT INTO products 
(product_name, category, description, price, quantity, supplier_id) 
VALUES 
(
    'Digital Powerbank 10000mAh',
    'Elektronik', -- NY VÄRDE
    'Kompakt powerbank med snabbladdning. Perfekt för resor och nödladdning.',
    349.00,
    120,
    1  -- Leverantör GlobalTech Solutions
),
(
    'Ergonomisk Trähammare',
    'Verktyg', -- NY VÄRDE
    'Välbalanserad hammare med stötdämpande handtag. Utmärkt för snickeri.',
    499.00,
    55,
    2  -- Leverantör Lokala Trävaror & Co
),
(
    'Grön Jutesnöre 200m',
    'Trädgård', -- NY VÄRDE
    'Biologiskt nedbrytbart snöre för trädgårdsarbete och paketering.',
    79.90,
    30,
    3  -- Leverantör Nordic Import & Export
),
(
    'CAT 6 Nätverkskabel (10m)',
    'Elektronik', -- NY VÄRDE
    'Högpresterande nätverkskabel för stabil internetanslutning.',
    129.50,
    180,
    1  -- Leverantör GlobalTech Solutions
),
(
    'Digital Vattenpass Pro',
    'Verktyg', -- NY VÄRDE
    'Vattenpass med hög precision, digital display och vinkelminne.',
    899.95,
    20,
    2  -- Leverantör Lokala Trävaror & Co
);
