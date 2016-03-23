(function(){
    'use strict';

    angular
        .module("Gunners")
        .factory("ForumService", ForumService);

    function ForumService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "ARSENAL WIN THE PREMIER LEAGUE", "date": (new Date).toDateString(), "author" : "Mesut Ozil", "userId": 234, "content" : "we won!"},
                {"_id": "000", "title": "The Arsenal destroy Chelsea in the final game of the season", "date": (new Date).toDateString(), "author" : "Ali Hyder", "userId": 123, "content" : "we won!"},
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function createFormForUser(userId, form, callback){
            form._id = (new Date).getTime();
            form.userId = userId;
            model.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formsForUser = [];
            for(var form in model.forms){
                if(model.forms[form].userId === userId) {
                    formsForUser.push(model.forms[form]);
                }
            }
            callback(formsForUser);
        }

        function deleteFormById(formId, callback) {
            for(var f in model.forms) {
                if(model.forms[f]._id === formId) {
                    model.forms.splice(f, 1);
                    callback(model.forms);
                }
            }
            callback(null);
        }

        function updateFormById(formId, newForm, callback) {
            for(var f in model.forms) {
                if(model.forms[f]._id === formId) {
                    var form = model.forms[f];
                    form.userId = newForm.userId;
                    form.title = newForm.title;
                    callback(form);
                }
            }
        }
    }
})();