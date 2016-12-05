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

            UserService
                .login(user)
                .success(function(user){
                    if(user && user._id) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error = "Unable to login!";
                    }
                })
                .error(function (err) {
                    if (err === "Unauthorized") {
                        vm.error = "User not found!!";
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
            if(user == null || user.username == null){
                vm.error = "Enter valid name !";
            }else{

                if(user.password == user.verify){
                    UserService
                        .register(user)
                        .success(function (user) {
                            $location.url("/user/" + user._id);
                        })
                        .error(function () {

                        });

                }else{
                    vm.error = "Passwords do not match !"
                }
            }
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        UserService
            .findUserById(userId)
            .success(function(user){
                if(user != '0'){
                    vm.user = user;
                }
            })
            .error(function () {

            });

        vm.updateUser = updateUser;
	    vm.deleteUser = deleteUser;
        vm.logout = logout;

        function updateUser(user) {
            UserService
                .updateUser(userId, user)
                .success(function(user){

                })
                .error(function () {

                });
        }

	function deleteUser() {
	    UserService
                .deleteUser(userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function (error) {
                    console.error(error);
                });
	}

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                })
                .error(function (err) {
                    console.log(err);
                });
        }

    }

})();
