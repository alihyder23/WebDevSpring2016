(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, $scope, FormService){

        refresh();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            FormService.createFormForUser($rootScope.currentUser._id, { title: $scope.formTitle }).then(function(res) {
                $scope.formTitle = null;
                $scope.forms = res.data;
            });
        }

        function updateForm() {
            $scope.selectedForm.title = $scope.formTitle;
            FormService.updateFormById($scope.selectedForm._id, $scope.selectedForm).then(function(res) {
                $scope.selectedForm = null;
                $scope.formTitle = null;
                refresh();
            });

        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id).then(function(res) {
                $scope.forms = res.data;
            })
        }

        function selectForm(index) {
            $scope.selectedForm = $.extend(true, {}, $scope.forms[index]);
            $scope.formTitle = $scope.selectedForm.title;
        }

        function refresh() {
            FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(res) {
               $scope.forms = res.data;
            });
        }
    }
})();