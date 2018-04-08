require("dotenv").config();
const keys = require("./keys.js");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');



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
          addInventory();
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
      
      // results.forEach(res => {
        // console.log("\n" + res.item_id + "|" + res.product_name + "|" + res.price + "|" + res.stock_quantity);
      // });
      start();
    })
  }

  function lowInventory(){
    console.log("Low inventory working.");  
    start();
      
  }

  function addInventory(){
    console.log("Add inventory working."); 
    start();
       
  }

  function addProduct(){
    console.log("Add products working");
    start();
        
  }
