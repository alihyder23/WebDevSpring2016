var mock = require("./form.mock.json");

var q = require("q");

module.exports = function() {

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm,

        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,

        findAllFieldsForForm: findAllFieldsForForm,
        findFieldForForm: findFieldForForm,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function createForm(form) {
        var deferred = q.defer();

        form._id = (new Date()).getTime();
        mock.push(form);
        deferred.resolve(form);

        return deferred.promise;
    }

    function createFormForUser(userId, form) {
        var deferred = q.defer();

        var newForm = {
            _id: (new Date()).getTime(),
            userId: userId,
            title: form.title,
            fields: form.fields
        };
        mock.push(newForm);
        deferred.resolve(newForm);
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function findAllForms() {
        var deferred = q.defer();
        deferred.resolve(mock);
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        var forms = [];
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].userId == userId) {
                forms.push(mock[i]);
            }
        }

        deferred.resolve(forms);
        return deferred.promise;
    }

    function updateForm(formId, form) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                mock[i].title = form.title;
                mock[i].userId = form.userId;
                mock[i].fields = form.fields;
                deferred.resolve(mock[i]);
                return deferred.promise;

            }
        }
    }

    function deleteForm(formId) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id == formId) {
                var form = mock.splice(i, 1);
                deferred.resolve(form);
                return deferred.promise;
            }
        }

        return null;
    }


    function findFormByTitle(title) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i].title === title) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function findAllFieldsForForm(formId) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                deferred.resolve(mock[i].fields);
                return deferred.promise;
            }
        }
        return null;
    }

    function findFieldForForm(formId, fieldId) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j] === fieldId) {
                        deferred.resolve(mock[i].fields[j]);
                        return deferred.promise;
                    }
                }
            }
        }
        return null;
    }

    function deleteField(formId) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j] === fieldId) {
                        deferred.resolve(mock[i].fields.splice(j, 1));
                        return deferred.promise;
                    }
                }
            }
        }
        return null;
    }

    function createField(formId, field) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                field._id = uuid.v4();
                mock[i].fields.push(field);
                deferred.resolve(field);
                return deferred.promise;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();

        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j] === fieldId) {
                        mock[i].fields[j].label = field.label;
                        mock[i].fields[j].type = field.type;
                        mock[i].fields[j].placeholder = field.placeholder;
                        mock[i].fields[j].options = field.options

                        deferred.resolve(field);
                        return deferred.promise;
                    }
                }
            }
        }
    }
};