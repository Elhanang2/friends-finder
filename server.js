//// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express App
var app = express();
var port = 8080;

var friend = require("./app/data/friends.js");

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

 
//The server start listening
app.listen(port,function(){
    console.log("you are connected to port :"+port);
});
