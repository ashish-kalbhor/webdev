module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@alice.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@bob.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charly@charly.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunziato", email: "jose@jose.com"}
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        user.firstName = user.username;
        user.lastName = user.username;
        user.email = user.username + '@gmail.com';
        users.push(user);
        res.send(user);
    }

    function findUser(req, res) {
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req, res);
        }else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users){
            if(users[u].username == username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username == username &&
               users[u].password == password){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        for(var u in users){
            if(users[u]._id == userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function  updateUser(req, res) {
        var userId = req.params.uid;
        var newUser = req.body;
        for(var u in users){
            if(users[u]._id == userId){
                users[u].username = newUser.username;
                users[u].password = newUser.password;
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.send(newUser);
                return;
            }
        }
        res.send('0');
    }

    function  deleteUser(req, res) {
        var userId = req.params.uid;
        for(var i = users.length-1;i--;){
            if(users[i]._id == userId){
                users.splice(i,1);
                return;
            }
        }
        res.send('0');
    }

};