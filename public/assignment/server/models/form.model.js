var mock = require("./form.mock.json");
var q = require("q");

module.exports = function() {
    "use strict";
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findAllFieldsByFormId: findAllFieldsByFormId,
        findFieldByFormId: findFieldByFormId,
        deleteFieldById: deleteFieldById,
        updateFieldById: updateFieldById,
        createFieldById: createFieldById,
        updateAllFields: updateAllFields
    };
    return api;

    function createForm(form) {
        var deferred = q.defer();

        form._id = (new Date).getTime().toString();
        mock.push(form);
        deferred.resolve(form);
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        deferred.resolve(mock);
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i]._id === formId) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i].title === title) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        var deferred = q.defer();

        var userForms = [];
        for (var i in mock) {
            if (mock[i].userId === userId) {
                userForms.push(mock[i])
            }
        }
        deferred.resolve(userForms);
        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i] = form;
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function deleteForm(formId) {
        var newForms = [];
        for (var i in mock) {
            if (mock[i]._id !== formId) {
                newForms.push(mock[i]);
            }
        }
        mock = newForms;
    }

    function findAllFieldsByFormId(formId) {
        var deferred = q.defer();

        var form = findFormById(formId)
        if (form) {
            deferred.resolve(form.fields);
            return deferred.promise;
        }
        return null;
    }

    function findFieldByFormId(formId, fieldId) {
        var deferred = q.defer();

        var fields = findAllFieldsByFormId(formId);
        for (var i in fields) {
            if (fields[i]._id === fieldId) {
                deferred.resolve(fields[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function deleteFieldById(formId, fieldId) {
        var deferred = q.defer();

        var newFields = [];
        var currentFields = findAllFieldsByFormId(formId);
        for (var i in currentFields) {
            if (currentFields[i]._id !== fieldId) {
                newFields.push(currentFields[i]);
            }
        }

        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i].fields = newFields;
                deferred.resolve(mock[i].fields);
                return deferred.promise;
            }
        }
        return null;
    }

    function updateFieldById(formId, fieldId, newField) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i]._id === formId) {
                for (var j in mock[i].fields) {
                    if (mock[i].fields[j]._id === fieldId) {
                        mock[i].fields[j] = newField;
                        deferred.resolve(mock[i].fields[j]);
                        return deferred.promise;
                    }
                }
            }
        }
        return null;
    }

    function updateAllFields(formId, newFields) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i].fields = newFields;
                deferred.resolve(mock[i].fields);
                return deferred.promise;
            }
        }
        return null;
    }

    function createFieldById(formId, newField) {
        var deferred = q.defer();

        newField._id = (new Date).getTime().toString();
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i].fields.push(newField);
                deferred.resolve(mock[i].fields);
                return deferred.promise;
            }
        }
        return null;
    }
};