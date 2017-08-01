
/*
var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;
    console.log("request for" + pathName + " received");
    
    if(pathName == "/") {
        pathName = "/index.html";
    }
    
    fs.readFile(pathName.substr(1), function(err, data) {
       if(err) {
           console.log(err);
           
           response.writeHead(404, {'Content-Type': 'text/html'});
       } else {
           response.writeHead(200, {'Content-Type': 'text/html'});
           response.write(data.toString());
       }
       response.end();
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
*/

/*
var express = require("express");
var app = express();
var router = require("./router/main")(app);

console.log("dirName " + __dirname);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);
app.use(express.static('public'));

var server = app.listen(8081, function(){
    console.log("Express server has started on port 8081")
});
*/


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var fs = require("fs");

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(8081, function() {
    console.log("Express server has started on port 8081");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret : '@#@$MYSIGN#@$#$',
    resave : false,
    saveUninitialized : true
}));

var router = require("./router/main")(app, fs);
