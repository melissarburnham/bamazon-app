require("dotenv").config();
const keys = require("./keys.js");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
let chosenItem;


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
      name: "whatToDo",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
      "View Products for Sale", 
      "View Low Inventory", 
      "Add to Inventory", 
      "Add New Product"
      ]
    })
    .then(function(answer) {
        switch (answer.whatToDo) {
        case "View Products for Sale":
          viewProducts();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          pickProduct();
          break;
  
        case "Add New Product":
          addProduct();
          break;
        }
      });
  }

  function viewProducts(){
    let query = "SELECT item_id, product_name, price, stock_quantity FROM products";  
    connection.query(query, function(err, results){
      if (err) throw err;
      console.table(results);
      start();
    })
  }

  function lowInventory(){
    let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";  
    connection.query(query, function(err, results){
      if (err) throw err;
      console.table(results);
      start();
    })
  }

  // function addInventory(){
  //   console.log("Add inventory working."); 
  //   start();
       
  // }


  function pickProduct() {
    let query = "SELECT item_id, product_name, stock_quantity FROM products";  
    connection.query(query, function(err, results){
      if (err) throw err;
      console.table(results);  
      inquirer
        .prompt([
          {
            name: "itemChoice",
            type: "input",
            message: "To which product do you want to add inventory? (enter item_id)",
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
              message: "How much do you want to add?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
        .then(function(answer) {
          results.forEach(function(res){
            if(answer.itemChoice == res.item_id){
              chosenItem = res
            }
          })
          let newQuantity = parseInt(answer.quantity) + parseInt(chosenItem.stock_quantity);
          addInventory(chosenItem.item_id, newQuantity)
        });  
    });          
  }
  
  function addInventory(item, newQuantity) {
    console.log("Updating quantity...\n");
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
        if (err) throw err;
        console.log(res.affectedRows + " rows updated!\n");
        // Call updateProduct AFTER the INSERT completes
        start();
      }
    );
  }


  function addProduct(){
    console.log("Add products working");
    start(); 
  }
