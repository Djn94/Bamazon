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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let productList = res;
        console.log(productList);
        inquirer.prompt([
            {
                type: 'input',
                message: 'Which item would you like to purchase? Select by ID number',
                name: 'selection',
            }]).then(function (response, err) {
                if (err) throw err;
                let selectionIndex = parseInt(response.selection)
                let arrayIndex = (selectionIndex - 1);
                let selectedItem = productList[arrayIndex];
                if (selectionIndex <= 0 || selectionIndex >= 11) {
                    console.log('Invalid ID')
                }
                else {
                    console.log(selectedItem)
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
                            console.log(`We have enough in stock to fill your ${orderAmount} order(s) of ${selectedItem.prod_name}.  `);
                            let newStock = (amountAvailable - orderAmount);
                            connection.query(
                                `UPDATE products SET stock = ${newStock} WHERE id = ${selectedItem.id}`,
                                function (err, res) {
                                    if (err) throw err;
                                    let itemCost = selectedItem.cost;
                                    let totalCost = (itemCost * orderAmount);
                                    console.log('Total cost of your order will be ' + totalCost + ' dollars.');
                                    console.log("Good bye");
                                    connection.end();

                                })
                        }
                        else {
                            console.log("Sorry we don't have that many. We only have " + amountAvailable + " left.");
                            connection.end();
                        }
                    });
                }
            });
    });
});
