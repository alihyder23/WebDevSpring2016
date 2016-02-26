(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.message = null;
        $scope.login = login;

        function login (user) {
            var user = UserService.findUserByCredentials({username: user.username, password: user.password});
            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
            else {
                $scope.message = "Invalid Username or Password"
            }
        }
    }
})();