(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http){

        var api = {
            login: login,
            logout: logout,
            checkLoggedin: checkLoggedin,
            findLoggedInUser: findLoggedInUser,
            register: register,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };

        return api;

        function  login(user) {
            var url = '/api/login';
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post(url, user);
        }

        function findLoggedInUser() {
            var url = "/api/user";
            return $http.get(url);
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url);
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
            var url = '/api/user/' + userId;
            return $http.put(url, user);
        }

        function  deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url);
        }

        function checkLoggedin() {
            var url = "/api/loggedin";
            return $http.post(url);
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }
    }

})();