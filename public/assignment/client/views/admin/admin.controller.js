(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope){

        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

    }
})();