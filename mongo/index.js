var mongoose = require("mongoose");
mongoose.connect('mongodb://makuvex-node-5175823:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){
    console.log("mongo db connection OK.");
    
    var testSchema = mongoose.Schema({
    name : String,
    address : String
    });

    testSchema.methods.speak = function () {
        var greeting = this.name ? "Meow name is " + this.name : "i don't have a name";
        console.log("greeting : "+greeting);
    };
    
    var TestModel = mongoose.model("TestModel", testSchema);
    var testIns = new TestModel({name: "testIns3", address : "seoul"});
    console.log("create testIns with " + testIns.name);     // 1
    
    testIns.save(function(err, testIns){
        if(err) return console.error(err);
        console.log("save");
        testIns.speak();
    });
    TestModel.find(function(err, models) {
        if(err) return console.error(err);
        console.log("find : " + models);
    });
    
    TestModel.find({name:/^testIns/});

});


