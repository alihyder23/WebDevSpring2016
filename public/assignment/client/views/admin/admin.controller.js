(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }
    }
})();