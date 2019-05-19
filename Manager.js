const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "products_db"
});
function selectAll() {

    connection.query("SELECT * FROM PRODUCTS", function (err, res) {
        if (err) throw err;
        console.log(res);
        const productList = res;

    });
};

function selectLoStock() {
    connection.query("SELECT * FROM PRODUCTS WHERE stock<5", function (err, res) {
        if (err) throw err;
        console.log(res);
    });
    connection.end(); //return to menu
}
function updateProducts() {
    connection.query("UPDATE products SET ? WHERE ? ",
        [
            {
                stock: 120
            },
            {
                prod_name: "Slacks"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log('updated')
            selectAll();
            connection.end();
        });
};
function createNew() {
    connection.query("INSERT INTO products SET ?",
        {

            prod_name: "Icecream",
            depart_name: "food",
            stock: 11,
            cost: 4
        }, function (err, res) {
            if (err) throw err;
            selectAll();
        });
}
//inquire prompt to list available options (view all items (selectall()), view Low Stock (selectLoStock()), Order Items (selectall(),
// then inquire prompt which item id to add to, inquire prompt how many to add, the updateItem function to run with the variables, and then a 
//seledt to view the updated item and print the cost, and create new, inquire prompt for prod_name, depart_name, stock, and cost, and then a select
//function for new item.

inquirer.prompt([
    {
        type: "list",
        name: "mainMenuSelect",
        message: "Please select an option from the available list: ",
        choices: ["View all products", "View low stock", "Replenish stock", "Add new item", "Exit"]
    }
]).then(function (user) {

    let userChoice = user.mainMenuSelect;
    if (userChoice === "View all products") {
        console.log('-----------------------------');
        console.log('Here you may view all available products: ');
        selectAll();
    };
    if (userChoice === "View low stock") {
        console.log('---------------------------------------');
        console.log('Here are all products with a stock of five or less: ');
        selectLoStock();
    };
    if (userChoice === "Replenish stock") {
        console.log('--------------------------------------');
        console.log('Here you may order more items: ');
        //would you like to only view low stock items, or all items?
        inquirer.prompt([{
            type: 'list',
            name: 'allOrLow',
            message: 'Would you like to view all products, or only those with low inventory?',
            choices: ["View all products", "View low stock"]
        }]).then(function (user) {
            console.log(userChoice);
            console.log("Add new item");
            if (user.allOrLow === 'View all products') {
                console.log('view all products');
                selectAll();
                console.log('here domes the inquirer');
                inquirer.prompt([{
                    type: 'input',
                    name: 'orderId',
                    message: "Please enter the product's ID you wish to order more of: "
                }]
                ).then(function (useransw) {
                    connection.query("SELECT * FROM PRODUCTS", function (err, res) {
                        if (err) throw err;
                        const productList = res;
                        const arrayIndex = useransw.orderId;
                        const adjustedIndex = (arrayIndex - 1);
                        console.log(productList[adjustedIndex]);
                        const renewItem = productList[adjustedIndex];
                        inquirer.prompt([{
                            type: 'input',
                            name: 'orderAmount',
                            message: 'How many would you like to order? '
                        }]).then(function (newOrder) {
                            const orderNum = newOrder.orderAmount;
                            const itemCost = renewItem.cost;
                            const orderCost = (itemCost * orderNum)
                            console.log(`we will be ordering ${orderNum} units of ${renewItem.prod_name} at a cost of ${orderCost} dollars`)
                        });
                    });
                });
            };
            else if (user.allOrLow === "View low stock") {
                console.log('view low stock');
                selectLoStock();
                inquirer.prompt([{
                    type: 'input',
                    name: 'orderId',
                    message: "Please enter the product's ID you wish to order more of: "
                }]
                ).then(function (useransw) {
                    console.log(useransw);
                    console.log(useransw.orderId);
                    console.log('we will order more of' + useransw.orderId);
                    // connection.end();
                })
            }
        });
        // updateProducts();
    }
    if (userChoice === "Add new item") {
        console.log('---------------------------------')
        console.log('Here you can add new products! ')

    }
    else {

        console.log('Good bye (:')
            // connection.end();
            ;
    }
});
