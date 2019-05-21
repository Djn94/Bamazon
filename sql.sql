DROP TABLE products;
CREATE DATABASE IF NOT EXISTS products_db;
USE products_db;
CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL AUTO_INCREMENT,
  prod_name VARCHAR(45) NOT NULL,
  depart_name VARCHAR(45) NOT NULL,
  cost INTEGER (8) NOT NULL,
  stock INTEGER (4) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO products (prod_name, depart_name, cost, stock)
VALUES ("Shoes", 'clothing', 60.00, 6), 
("DressShirt", 'clothing', 30.00, 12), 
("Slacks", 'clothing', 45.00, 18), 
("DVD", 'electronics', 15.00, 205), 
("Headphones", 'electronics', 20.00, 15), 
("PhoneCharger", 'electronics', 5.00, 45), 
("BluRay", 'electronics', 20.00, 113), 
("Ribeye", 'steak', 14.00, 10), 
("Tbone", 'steak', 19.00, 44), 
("Filet", "steak", 64.00, 4);
SELECT * FROM PRODUCTS;

