const mysql = require('mysql');
const inquirer = require('inquirer');
let selectedID = '';
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
    connection.end();
});
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
        let selectedItem = productList[response.selection]
        inquirer.prompt([
            {
                type: 'input',
                message: 'How many?',
                name: 'quantity'
            },
        ]).then(function (response) {
            let orderAmount = response.quantity;
            let amountAvailable = selectedItem.stock;
            console.log(orderAmount)
            console.log(amountAvailable)
            if (orderAmount < amountAvailable) {
                console.log('we can do that');
                let newStock = (amountAvailable - orderAmount);
                console.log(newStock)
            }
            else {
                console.log("sorry we don't have that many");
            }

        });
    }
    );
});
