var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log("connected to mongod server");
});
mongoose.connect('mongodb://makuvex-node-5175823:27017');

var Book = require("./models/book");

var router = require("./routes")(app, Book);
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
});
