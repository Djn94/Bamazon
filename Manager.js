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
