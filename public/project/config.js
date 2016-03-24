(function(){
    'use strict';

    angular
        .module("Gunners")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/profile", {
                templateUrl: "./client/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "./client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "./client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/news", {
                templateUrl: "./client/views/news/news.view.html",
                controller: "NewsController"
            })
            .when("/mynews", {
                templateUrl: "./client/views/mynews/mynews.view.html",
                controller: "MyNewsController"
            })
            .when("/team", {
                templateUrl: "./client/views/team/team.view.html",
                controller: "TeamController"
            })
            .when("/fixtures", {
                templateUrl: "./client/views/fixtures/fixtures.view.html",
                controller: "FixturesController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();