var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mowgli1!",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    shop();
});

function shop() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "Welcome to Bamazon, what would you like to do?",
        choices: ["Purchase item", "Exit"]
    }).then(function (answer) {

        switch (answer.action) {
            case "Purchase item":
                displayProducts();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

