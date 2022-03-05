require('dotenv').config({path: __dirname+ "/envio.env"});

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const PORT = process.env.PORT;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + "/signup.html");

})

app.post("/", function(req, res){
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

console.log(req.body);
console.log(firstName, lastName, email);

res.redirect("/");

})

app.listen(PORT, function () {
  console.log("Server is running on port "+ PORT);

})
