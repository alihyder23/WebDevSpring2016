(function(){
    'use strict';

    angular
        .module("Gunners")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./client/views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
            })
            .when("/profile", {
                templateUrl: "./client/views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkCurrentUser
                }
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
                controller: "NewsController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/news/:newsId/content", {
                templateUrl: "client/views/news/content.view.html",
                controller: "ContentController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/mynews", {
                templateUrl: "./client/views/news/mynews.view.html",
                controller: "MyNewsController",
                resolve: {
                    loggedin: checkNews
                }
            })
            .when("/team", {
                templateUrl: "./client/views/team/team.view.html",
                controller: "TeamController"
            })
            .when("/fixtures", {
                templateUrl: "./client/views/fixtures/fixtures.view.html",
                controller: "FixturesController"
            })
            .when("/search", {
                templateUrl: "./client/views/search/search.view.html",
                controller: "SearchController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkNews = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('news') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();