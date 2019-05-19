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