(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){
        // redirect if not logged in
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $scope.updates = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            email: $rootScope.currentUser.email
        };

        $scope.update = update;

        function update() {
            UserService.updateUser($rootScope.currentUser._id, $scope.updates).then(function(res) {
                UserService.setCurrentUser(res.data);
                $scope.message = "Success! User has been updated."
            });
        }
    }
})();