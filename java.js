const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "products_db"
});
connection.connect(function (err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let productList = res;
        console.log(productList);
        inquirer.prompt([
            {
                type: 'input',
                message: 'Which item would you like to purchase? Select by ID number (1-10)',
                name: 'selection',
            }

        ]).then(function (response, err) {
            if (err) throw err;
            let selectionIndex = parseInt(response.selection)
            console.log(productList[1]);
            let arrayIndex = (selectionIndex - 1);
            let selectedItem = productList[arrayIndex];
            if (selectionIndex <= 1 || selectionIndex >= 11) {
                console.log('Invalid ID')
            }
            else {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'How many?',
                        name: 'quantity'
                    },
                ]).then(function (response) {
                    let orderAmount = response.quantity;
                    let amountAvailable = selectedItem.stock;
                    if (orderAmount <= amountAvailable) {
                        console.log('we can do that');
                        let newStock = (amountAvailable - orderAmount);
                        console.log("hello")
                        connection.query(

                            'UPDATE products SET stock = 20 WHERE id = 9',

                            function (err, res) {
                                let itemCost = selectedItem.cost;
                                let totalCost = (itemCost * orderAmount);
                                // console.log(query.sql)
                                console.log('Total cost of your order will be ' + totalCost + ' dollars.');

                            }
                        );
                        console.log("bye");
                    }
                    else {
                        console.log("Sorry we don't have that many. We only have " + amountAvailable + " left.");
                    }
                });
            }
        });
    });
    connection.end();
});
