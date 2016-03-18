var mock = require("./form.mock.json");

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
        form._id = (new Date).getTime().toString();
        form.label = null;
        form.type = null;
        form.fields = []
        mock.push(form);
        return form;
    }

    function findAllForms() {
        return mock;
    }

    function findFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                return mock[i];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var i in mock) {
            if (mock[i].title === title) {
                return mock[i];
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        var userForms = [];
        for (var i in mock) {
            if (mock[i].userId === userId) {
                userForms.push(mock[i])
            }
        }
        return userForms;
    }

    function updateForm(formId, form) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i] = form;
                return mock[i];
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
        var form = findFormById(formId)
        if (form) {
            return form.fields;
        }
        return null;
    }

    function findFieldByFormId(formId, fieldId) {
        var fields = findAllFieldsByFormId(formId);
        for (var i in fields) {
            if (fields[i]._id === fieldId) {
                return fields[i];
            }
        }
        return null;
    }

    function deleteFieldById(formId, fieldId) {
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
                return mock[i].fields;
            }
        }
        return null;
    }

    function updateFieldById(formId, fieldId, newField) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                for (var j in mock[i].fields) {
                    if (mock[i].fields[j]._id === fieldId) {
                        mock[i].fields[j] = newField;
                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateAllFields(formId, newFields) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i].fields = newFields;
                return mock[i].fields;
            }
        }
        return null;
    }

    function createFieldById(formId, newField) {
        newField._id = (new Date).getTime().toString();
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i].fields.push(newField);
                return mock[i].fields;

            }
        }
        return null;
    }
};