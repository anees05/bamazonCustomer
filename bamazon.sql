DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price decimal (10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop","Electronices",1199.99,10),
("T-shirt", "Apparel", 19.99, 50),
("Jeans", "Apparel", 49.99, 40),
("Avengers", "Movies", 19.99, 10),
("Monopoly", "Board Games", 19.99, 20),
("Dominoes", "Board Games", 9.99, 20),
("Lord of the Rings", "Movies", 19.99, 10),
("TV", "Electronics", 600, 10),
("Chips", "Food & Drink", 2.99, 100),
("Water", "Food & Drink", 1.99, 100) 