(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "./views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/fields", {
                templateUrl: "./views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();