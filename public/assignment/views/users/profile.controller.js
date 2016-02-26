(function(){
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){

        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $scope.update = update;

        function update() {
            UserService.updateUser($scope.updates, callback);

            function callback(user){
                $scope.message = "Updated."
            }
        }
    }
})();