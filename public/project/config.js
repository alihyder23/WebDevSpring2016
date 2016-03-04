(function(){
    'use strict';

    angular
        .module("Gunners")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
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
            .when("/forum", {
                templateUrl: "./views/forum/forum.view.html",
                controller: "ForumController"
            })
            .when("/news", {
                templateUrl: "./views/news/news.view.html",
                controller: "NewsController"
            })
            .when("/team", {
                templateUrl: "./views/team/team.view.html",
                controller: "TeamController"
            })
            .when("/fixtures", {
                templateUrl: "./views/fixtures/fixtures.view.html",
                controller: "FixturesController"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();