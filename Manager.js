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
    connection.connect(function (err) {
        if (err) throw err;
        console.log('aye')
        connection.query("SELECT * FROM PRODUCTS", function (err, res) {
            if (err) throw err;
            console.log(res);

        });
        connection.end(); //return to menu function
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
});