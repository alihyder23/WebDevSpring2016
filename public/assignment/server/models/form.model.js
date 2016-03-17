var q = require("q");
var uuid = require('node-uuid');
var mock = require("./form.mock.json");

module.exports = function() {

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,

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
        form._id = uuid.v4();
        mock.push(form);
        return form;
    }

    function createFormForUser(userId, form) {

        var newForm = {
            _id: uuid.v4(),
            userId: userId,
            title: form.title,
            fields: form.fields
        };
        mock.push(newForm);
        return newForm;
    }

    function findFormById(formId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllForms() {
        var forms = [];
        for (var i = 0; i < mock.length; i++) {
            forms.push(mock[i])
        }
        return forms;
    }

    function findAllFormsForUser(userId) {
        var forms = [];
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].userId == userId) {
                forms.push(mock[i])
            }
        }
        return forms;
    }

    function updateForm(formId, form) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                mock[i].title = form.title;
                mock[i].userId = form.userId;
                mock[i].fields = form.fields;
            }
        }
    }

    function deleteForm(formId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                return mock.splice(i, 1);
            }
        }
        return null;
    }


    function findFormByTitle(title) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].title === title) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllFieldsForForm(formId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                return mock[i].fields;
            }
        }
        return null;
    }

    function findFieldForForm(formId, fieldId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j] === fieldId) {
                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function deleteField(formId) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j] === fieldId) {
                        return mock[i].fields.splice(j, 1);
                    }
                }
            }
        }
        return null;
    }

    function createField(formId, field) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                field._id = uuid.v4();
                mock[i].fields.push(field);
                return field;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i]._id === formId) {
                for (var j = 0; j < mock[i].fields.length; j++) {
                    if (mock[i].fields[j] === fieldId) {
                        mock[i].fields[j].label = field.label;
                        mock[i].fields[j].type = field.type;
                        mock[i].fields[j].placeholder = field.placeholder;
                        mock[i].fields[j].options = field.options;
                    }
                }
            }
        }
        return form;
    }
};

