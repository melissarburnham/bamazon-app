require("dotenv").config();
const keys = require("./keys.js");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const colors = require('colors');

// / create the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.mysql.password,
  database: "bamazon_db"
});

//if connection works, run start function
connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  //prompts user to shop at bamazon
function start(){
  inquirer
    .prompt({
      name: "goShopping",
      type: "rawlist",
      message: "Would you like to got shopping at bamazon?".blue,
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.goShopping.toUpperCase() === "YES") {
      displayAll();
      }
      else {
      console.log("Well, then why are you here?".red);
      start();
      }
    });
}

function displayAll(){
  let query = "SELECT item_id, product_name, price, stock_quantity FROM products"
  connection.query(query, function(err, results) {
    console.table(results);        
    console.log("-----------------------------------");
    itemToBuy();
    });
  }

function itemToBuy(){
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;  
      inquirer
        .prompt([
          {
            name: "itemChoice",
            type: "input",
            message: "Enter the ID of the product you would like to buy.".blue,
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
              name: "quantity",
              type: "input",
              message: "Enter the quantity you wish to buy.".blue,
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
        .then(function(answer) {
          stockCheck(answer.itemChoice, answer.quantity)
        });  
    });          
}

function stockCheck(item, quantity){
    connection.query("SELECT * FROM products", function(err, res){
      if(err)throw err;
      if(res[item-1].stock_quantity < parseInt(quantity)){
        console.log("Not enough in stock!".red)
        itemToBuy();
      } else {
          console.log("we have enough!".green);
          showTotal(item, quantity);
      }
    });
}

function showTotal(item, quantity){
    connection.query("SELECT * FROM products", function(err, res){
        if(err)throw err;
        let quantityInStock = res[item - 1].stock_quantity;
		let newQuantity = quantityInStock - quantity;
		let priceOfItem = res[item - 1].price;
		let amountOwed = priceOfItem * quantity;
		console.log("\nYou owe ".green +"$" + amountOwed + ". You can send credit card info to Melissa Burnham ;)".green);
		updateTable(item, newQuantity);
    })
}  

function updateTable(item, newQuantity){
    console.log("Updating stock!".magenta);
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newQuantity
        },
        {
          item_id: item
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " product updated!\n".magenta);
        start();
      }
    );
  }


  

