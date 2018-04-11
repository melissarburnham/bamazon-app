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
('soccer ball','sports', 5.00, 5),
('cleats','sports', 500.00, 100);


USE bamazon_db;



DROP TABLE  IF EXISTS bamazon_db;
CREATE TABLE  bamazon_db;

CREATE TABLE departments(
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30),
  over_head_costs DECIMAL(20,2) default 0,
  PRIMARY KEY (item_id)
);

SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ('electronics', 5000.00),
('furniture', 10000.00),
('baby', 2000.00),
('womens clothing', 5000.00),
('sports', 5000.00);


