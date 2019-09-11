
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const Express = require('express');


// Sets up the Express App
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;


var friend = require("./app/data/friends.js");

app.use(Express.static(__dirname+'/app/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


//The server start listening
app.listen(PORT, function () {
    console.log("you are connected to port :" + PORT);
});