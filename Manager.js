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

connection.connect(function (err) {
    if (err) throw err;

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
});
