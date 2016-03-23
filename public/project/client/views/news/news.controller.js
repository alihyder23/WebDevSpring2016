(function(){
    'use strict';

    angular.module("Gunners")
        .controller("NewsController", NewsController);

    function NewsController($rootScope, $scope, NewsService){
        $scope.forms = NewsService.forms;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            NewsService.createFormForUser($rootScope.currentUser._id, { title: $scope.formTitle }, callback);

            function callback(form) {
                $scope.formTitle = null;
            }
        }

        function updateForm() {
            $scope.selectedForm.title = $scope.formTitle;
            NewsService.updateFormById($scope.selectedForm._id, $scope.selectedForm, callback);

            function callback(form) {
                $scope.selectedForm = null;
                $scope.formTitle = null;
            }
        }

        function deleteForm(index) {
            NewsService.deleteFormById(NewsService.forms[index]._id, callback);

            function callback() {
            }
        }

        function selectForm(index) {
            $scope.selectedForm = $.extend(true, {}, NewsService.forms[index]);
            $scope.formTitle = $scope.selectedForm.title;
        }
    }
})();