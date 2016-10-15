(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {

            if(user == null)
                vm.error = "Please enter username and password!"

            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user == null) {
                vm.error = "Unable to login!";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($scope) {
        var vm = this;
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var user = UserService.findUserById(userId);
        if(user != null){
            vm.user = user;
        }
    }

})();