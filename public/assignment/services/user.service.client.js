(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService(){
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunziato"}
        ];

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };

        return api;

        function  createUser(user) {
            var prevId = users[users.length-1]._id;
            var id = prevId + 1;
            var newUser = {_id: id, username: user.username, password: user.password, firstName: user.username, lastName: user.username};
            users.push(newUser);
            return id;
        }

        function  findUserById(userId) {
            for(var u in users){
                user = users[u];
                if(user._id == userId){
                    return user;
                }
            }
            return null;
        }

        function  findUserByUsername(username) {
            for(var u in users){
                user = users[u];
                if(user.username == username){
                    return user;
                }
            }
            return null;
        }

        function  findUserByCredentials(username, password) {

            for(var u in users){
                user = users[u];
                if(user.username == username && user.password == password){
                    return user;
                }
            }
            return null;
        }

        function  updateUser(userId, user) {

        }

        function  deleteUser(userId) {
            users.remove(function (u) {
                return u._id == userId;
            });
        }

    }

})();