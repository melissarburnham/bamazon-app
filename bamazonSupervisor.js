
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

function start(){
inquirer
  .prompt({
    name: "options",
    type: "rawlist",
    message: "What would you like to do?".blue,
    choices: ["View Product Sales by Department", "Create New Department"]
  })
  .then(function(answer) {
    switch (answer.options) {
      case "View Product Sales by Department":
        viewSales();
        break;

      case "Create New Department":
        createDepartment();
        break;
     }
  });
}

function viewSales(){
  let query = "SELECT joined.item_id, joined.department_name, joined.over_head_costs, SUM(joined.product_sales) AS product_sales, (SUM(joined.product_sales) - joined.over_head_costs) AS total_profit FROM (SELECT departments.item_id, departments.department_name, departments.over_head_costs, products.product_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name) AS joined GROUP BY item_id";
  connection.query(query, function(err, results){
    if (err) throw err;
    console.table(results);
    start();
  })
}

function createDepartment(){
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "Type department name you wish to add.".blue,
        },
        {
        name: "overhead_costs",
        type: "input",
        message: "Enter estimated overhead costs.".blue,
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
        }
      ])
    .then(function(answer) {
      var query = connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.department_name,
          over_head_costs: answer.overhead_costs,
        },
        function(err, res) {
          console.log(res.affectedRows + " product added!\n".magenta);
          // Call updateProduct AFTER the INSERT completes
          start();
        }
      );
  });          
}
