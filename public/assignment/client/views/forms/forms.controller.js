(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, $scope, FormService, $location){

        if(!$rootScope.currentUser){
            $location.url('/login')
        }

        console.log($rootScope.currentUser)
        FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(res){
            $scope.forms = res;
        });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            FormService.createFormForUser($rootScope.currentUser._id, {title: $scope.formTitle}).then(function (res) {
                $scope.formTitle = null;
                FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(res){
                    $scope.forms = res;
                });
            });
        }

        function updateForm() {
            $scope.selectedForm.title = $scope.formTitle;

            FormService.updateFormById($scope.selectedForm._id, $scope.selectedForm).then(function(res){
                $scope.selectedForm = null;
                $scope.formTitle = null;
                FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(res){
                    $scope.forms = res;
                });
            });
        }

        function deleteForm(id) {
            FormService.deleteFormById(id).then(function(res){
                $scope.selectedForm = null;
                $scope.formTitle = null;
                FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(res){
                    $scope.forms = res;
                });
            });
        }

        function selectForm(id) {
            FormService.getFormById(id).then(function(res){
                $scope.selectedForm = res;
                $scope.formTitle = $scope.selectedForm.title;
            });
        }
    }
})();