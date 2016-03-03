(function(){
    'use strict';

    angular.module("Gunners")
        .controller("ForumController", ForumController);

    function ForumController($rootScope, $scope, ForumService){
        $scope.forms = ForumService.forms;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            ForumService.createFormForUser($rootScope.currentUser._id, { title: $scope.formTitle }, callback);

            function callback(form) {
                $scope.formTitle = null;
            }
        }

        function updateForm() {
            $scope.selectedForm.title = $scope.formTitle;
            ForumService.updateFormById($scope.selectedForm._id, $scope.selectedForm, callback);

            function callback(form) {
                $scope.selectedForm = null;
                $scope.formTitle = null;
            }
        }

        function deleteForm(index) {
            ForumService.deleteFormById(ForumService.forms[index]._id, callback);

            function callback() {
            }
        }

        function selectForm(index) {
            $scope.selectedForm = $.extend(true, {}, ForumService.forms[index]);
            $scope.formTitle = $scope.selectedForm.title;
        }
    }
})();