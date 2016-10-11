(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function  Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "/views/user/profile.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/user/register.view.client.html"
            })
            .when("/website", {
                templateUrl: "/views/website/website-list.view.client.html"
            })
            .when("/website/:wid/edit", {
                templateUrl: "/views/website/website-edit.view.client.html"
            })
            .when("/website/:wid/new", {
                templateUrl: "/views/website/website-new.view.client.html"
            })
            .otherwise({
                redirectTo: "/views/user/login.view.client.html"
            })
    }
})