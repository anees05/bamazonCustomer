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

var welcome = "\n ===================================\n" +
    " =====     WELCOME TO BAMAZON   ===== \n"

var goodbye = "\n ===================================n" +
    " =====     THANKS FOR SHOPPING AT BAMAZON   ===== \n" +
    " ======  Have a great day!   ===== \n"

function displayProducts() {
    console.log(welcome);

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id +
                " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
        }

        console.log("==================================");

        inquirer.prompt({
            name: "item_id",
            message: "What is the ID of the product you would like to purchase?",
            type: "input",
            validate: function (value) {

                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\n Please enter a valid item ID.");
                    return false;
                }
            }
        }).then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", {
                item_id: answer.item_id
            }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
                }

                inquirer.prompt({
                    name: "quant",
                    message: "How many units are you wanting to buy?",
                    type: "input",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            console.log("\n Please enter a valid quantity.");
                            return false;
                        }
                    }
                }).then(function (answer) {
                    for (var i = 0; i < res.length; i++) {
                        var price = res[i].price;

                        var quant = parseInt(res[i].stock_quantity);
                        var quantNum = parseInt(answer.quant);
                        var total;

                        if (quant >= quantNum) {
                            var quantityLeft = quant - quantNum;

                            console.log("Updating stock\n");

                            connection.query("UPDATE products SET ? WHERE ?",
                                [{
                                    stock_quantity: quantityLeft
                                },

                                {
                                    item_id: res[i].item_id
                                }
                                ],

                                function () {
                                    shop();
                                }

                            );

                            for (var i = 0; i < res.length; i++) {
                                total = parseInt(price * quantNum);

                                console.log("Thank You! You bought " + res[i].item_id + " " + res[i].product_name + " for " + "$" + total.toFixed() + " successfully!");
                            }

                            console.log(goodbye);

                        } else if (quantNum === 0) {
                            console.log("Please enter an ID");
                            shop();

                        } else {
                            console.log("Insufficient quantity!");
                            shop();
                        }

                    };

                });

            });

        });
    });
};
