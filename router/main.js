/*
module.exports = function(app) {
    app.get('/', function(req, res) {
        console.log("=== index")
        res.render('index.html');
    });
    app.get('/about', function(req, res) {
        console.log("=== about")
        res.render('about.html');
    });
}
*/

module.exports = function(app, fs) {
    
    app.get('/', function(req, res) {
        var sess = req.session;
        
        res.render('index', {
            title : "my home",
            length : 5,
            name : sess.name,
            userName : sess.userName
        });
    });
    
    app.get('/list', function(req, res) {
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data) {
           console.log(data);
           res.end(data);
        });
    });
    app.get('/getUser/:username', function(req, res) {
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data) {
           var users = JSON.parse(data);
           res.json(users[req.params.username]);
        });
    });
    
    app.post('/addUser/:userName', function(req, res) {
        var result = {};
        var userName = req.params.userName;
        console.log("req : "+req.params);
        
        if(!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
        }
        
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data) {
            var users = JSON.parse(data);
            if(users[userName]) {
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }
            
            users[userName] = req.body;
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                result = {"success" : 1};
                res.json(result);
            });
        });
        
    });
    
    app.put('/updateUser/:userName', function(req, res) {
        var result = {};
        var userName = req.params.userName;
        
        if(!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }
        
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data) {
            var users = JSON.parse(data);

            users[userName] = req.body;
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                result = {"success" : 1};
                res.json(result);
            });
        });
    });
    
    app.delete('/deleteUser/:userName', function(req, res) {
        var result = {};
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data) {
            var users = JSON.parse(data);

            if(!users[req.params.userName]) {
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }
            
            delete users[req.params.userName];
            
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                result = {"success" : 1};
                res.json(result);
            });
        });
    });
    
    app.get('/login/:userName/:password', function(req, res) {
        var sess = req.session;
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data) {
            var users = JSON.parse(data);
            var userName = req.params.userName;
            var password = req.params.password;
            var result = {};
            
            if(!users[req.params.userName]) {
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }
            if(users[userName]["password"] == password) {
                result["success"] = 1;
                sess.userName = userName;
                sess.name = users[userName]["name"];
                res.json(result);
            } else {
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        });
    });
    
    app.get('/logout', function(req, res) {
        var sess = req.session;
        if(sess.userName) {
            req.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
        
    });
}