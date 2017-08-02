
/*
var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end("Helo world?");
}).listen(8081);

console.log("Server runing at http://127.0.0.1:8081");
*/

/*
var fs = require("fs");
var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("program has ended");
*/

/*
var fs = require("fs");
fs.readFile('input.txt', function(err, data) {
   if(err) return console.error(err);
   console.log(data.toString());
});

// test
*/

var events = require("events");
var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
    console.log("connection successful");  
    
    eventEmitter.emit("data_received");
};

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function() {
    console.log("data received")
});

eventEmitter.emit('connection');

console.log("program has ended");