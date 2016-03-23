var mock = require("./form.mock.json");

// load q promise library
var q = require("q");
var uuid = require("node-uuid");

module.exports = function() {

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormsForUser: findFormsForUser,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        getFieldsByFormId: getFieldsByFormId,
        getFieldById: getFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField,
        updateAllFields: updateAllFields
    };

    return api;

    function createForm(userId, form) {

        var deferred = q.defer();

        form._id = uuid.v4();
        form.userId = userId;
        form.fields = [];
        mock.push(form);

        console.log("newForm: "+form);

        findFormsForUser(userId).then(function(forms) {
           deferred.resolve(forms);
        });

        return deferred.promise;
    }

    function findAllForms() {

        var deferred = q.defer();

        deferred.resolve(mock);

        return deferred.promise;
    }

    function findFormsForUser(userId) {

        var deferred = q.defer();

        findAllForms().then(function(forms) {

            var userForms = [];

            for(var f in forms) {
                if(forms[f].userId === userId) {
                    userForms.push(forms[f]);
                }
            }

            deferred.resolve(userForms);
        });

        return deferred.promise;
    }

    function findFormById(id) {

        var deferred = q.defer();

        var form = null;

        for(var f in mock) {
            if (mock[f]._id === id) {
                form = mock[f];
            }
        }

        deferred.resolve(form);

        return deferred.promise;
    }

    function updateForm(id, form) {

        var deferred = q.defer();

        findFormById(id).then(function(oldForm) {
            oldForm.title = form.title;
            oldForm.userId = form.userId;
            oldForm.fields = form.fields;

            deferred.resolve(oldForm);
        });

        return deferred.promise;
    }

    function deleteForm(id) {

        var deferred = q.defer();

        for(var f in mock) {
            if(mock[f]._id === id) {

                console.log(mock[f]._id + " === " + id);


                var userId = mock[f].userId;
                mock.splice(f, 1);

                console.log('just spliced. finding forms for user '+userId);

                findFormsForUser(userId).then(function(forms) {
                    console.log('found them, now resolving...');
                    deferred.resolve(forms);
                });
            }
            else {
                console.log(mock[f]._id + " !== " + id);
            }
        }

        return deferred.promise;

    }

    function findFormByTitle(title) {

        var deferred = q.defer();

        var form = null;

        for(var f in mock) {
            if (mock[f].title === title) {
                form = mock[f];
            }
        }

        deferred.resolve(form);

        return deferred.promise;
    }

    function getFieldsByFormId(id) {

        var deferred = q.defer();

        findFormById(id).then(function(form) {
            deferred.resolve(form.fields);
        });

        return deferred.promise;
    }

    function getFieldById(formId, fieldId) {

        var deferred = q.defer();

        getFieldsByFormId(formId).then(function(fields) {

            for(var f in fields) {
                if(fields[f]._id === fieldId) {
                    deferred.resolve(fields[f]);
                }
            }

        });

        return deferred.promise;
    }

    function deleteField(formId, fieldId) {

        var deferred = q.defer();

        for(var formIndex in mock) {
            if(mock[formIndex]._id === formId) {
                var formFields = mock[formIndex].fields;
                for(var fieldIndex in formFields) {
                    if(formFields[fieldIndex]._id === fieldId) {
                        formFields.splice(fieldIndex, 1);
                        deferred.resolve(formFields);
                    }
                }
            }
        }

        return deferred.promise;
    }

    function createField(formId, field) {

        var deferred = q.defer();

        field._id = uuid.v4();

        getFieldsByFormId(formId).then(function(fields) {
            fields.push(field);
            deferred.resolve(fields);
        });

        return deferred.promise;
    }

    function updateAllFields(formId, fields) {

        var deferred = q.defer();

        findFormById(formId).then(function(form) {
            form.fields = fields;
            deferred.resolve(fields);
        });

        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {

        var deferred = q.defer();

        findFormById(formId).then(function(form) {
            for(var f in form.fields) {
                if(form.fields[f]._id === fieldId) {
                    form.fields[f] = field;
                    deferred.resolve(field);
                }
            }
        });

        return deferred.promise;
    }

};