DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(20,2),
  stock_quantity INTEGER(20),
  PRIMARY KEY (item_id)
);


SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('television','electronics', 500.00, 100),
('ipad','electronics', 300.00, 100),
('couch','furniture', 1000.00, 100),
('loveseat','furniture', 500.00, 100),
('diapers','baby', 20.00, 100),
('rattle','baby', 10.00, 100),
('high heels','womens clothing', 50.00, 100),
('blouse','womens clothing', 50.00, 100),
('soccer','sports', 500.00, 100),
('cleats','sports', 500.00, 100);