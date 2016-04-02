(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "client/views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/form/:formId/fields", {
                templateUrl: "client/views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();