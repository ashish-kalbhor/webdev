module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@alice.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@bob.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charly@charly.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunziato", email: "jose@jose.com"}
    ];

    app.get('/api/user', findUser);

    function findUser(req, res) {
        var params = req.params;
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
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send(0);
    }

};