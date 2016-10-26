(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http){
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@alice.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@bob.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charly@charly.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunziato", email: "jose@jose.com"}
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
            var url = '/api/user';
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post(url, user);
        }

        function  findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        function  findUserByUsername(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        function  findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + "&password=" + password;
            return $http.get(url);
        }

        function  updateUser(userId, user) {
            for(var u in users){
                if(users[u]._id == userId){
                    users[u].username = user.username;
                    users[u].password = user.password;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    break;
                }
            }
        }

        function  deleteUser(userId) {
            for(var i = users.length-1;i--;){
                if(users[i]._id == userId){
                    users.splice(i,1);
                }
            }
        }

    }

})();