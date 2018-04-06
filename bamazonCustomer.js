const mysql = require("mysql");
const inquirer = require("inquirer");
let chosentItem;

// / create the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start(){
  inquirer
    .prompt({
      name: "goShopping",
      type: "rawlist",
      message: "Would you like to got shopping at bamazon?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.goShopping.toUpperCase() === "YES") {
      displayAll();
      }
      else {
      console.log("Well, then why are you here?")
      start();
      }
    });
}

function displayAll(){
  connection.query("SELECT * FROM products", function(err, results) {
    results.forEach(function(res){
        console.log(res.item_id + " | " + res.product_name + " | " + res.price);        
    })
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
            message: "What item would you like to buy? (Enter id number)",
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
              message: "Enter the quantity you wish to buy.",
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
              if(res.item_id == answer.itemChoice){
                  chosentItem = res;
              }
          });
          if(chosentItem.stock_quantity < parseInt(answer.quantity)){
            //   connection.query(
            console.log("Not enough in stock!")
            itemToBuy();
            //   );
          }
        });  
    });          
}


// choices: function (){
//     var choiceArray= [];
//     results.forEach(function(res){
//       choiceArray.push(res.item_id + " | " + res.product_name + " | " + res.price);        
//     })
//     return choiceArray;
//     }
    
  

