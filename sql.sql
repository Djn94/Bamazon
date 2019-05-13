DROP DATABASE IF EXISTS products_db;
CREATE DATABASE products_db;
USE products_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  prod_name VARCHAR(45) NOT NULL,
  depart_name VARCHAR(45) NOT NULL,
  cost INTEGER (8) NOT NULL,
  stock INTEGER (4) NOT NULL,
  PRIMARY KEY (id)
);