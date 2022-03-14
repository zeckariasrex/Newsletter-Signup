require('dotenv').config({path: __dirname+ "/envio.env"});
const fs = require('fs')
//const mailchimp = require("@mailchimp/mailchimp_marketing");


const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const PORT = process.env.PORT;
const app = express();
const https = require('https');
var htmlErrorPass = null;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + "/signup.html");

});



app.get("/failure", function(req,res){
  console.log(__dirname);
  res.sendFile(__dirname + "/failure.html");
if(htmlErrorPass === null){
  document.getElementById('error') = htmlErrorPass;
}else{
  document.getElementById('error')= "no error passed."
}

});



app.post("/", function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
console.log(req.body);
console.log(firstName, lastName, email);

const url = "https://"+ process.env.prf + ".api.mailchimp.com/3.0/lists/" + process.env.list_ID ;
//const listId = process.env.list_ID;
const jAPI = "anystring:" + process.env.chimpAPI;

var data =  {
      members:[
          {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
          }
        }
      ]
    };

var jsonData = JSON.stringify(data);

const options = {
method: "POST",
auth: jAPI
}


console.log(jAPI);
console.log(url);


const hreq = https.request(url, options, (res) => {

  if(res.statusCode === 200){
    res.send("Success");
  }else{ res.send("Error")};
  
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
    console.log(data);

  });

  res.on('end', () => {
    console.log('No more data in response.');
  });


});

hreq.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
hreq.write(jsonData);
hreq.end();



});






app.listen(PORT, function () {
  console.log("Server is running on port "+ PORT);

});
