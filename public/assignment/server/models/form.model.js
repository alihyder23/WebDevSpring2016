var q = require("q");

module.exports = function(db, mongoose) {

    var FieldSchema = require('./field.schema.js')(mongoose);
    var FieldModel = mongoose.model('Field', FieldSchema);

    var FormSchema = require('./form.schema.js')(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

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

        form.userId = userId;

        FormModel.create(form, function(err, doc) {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
    }

    function findAllForms() {

        var deferred = q.defer();

        FormModel.find({}, function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function findFormsForUser(userId) {

        var deferred = q.defer();

        FormModel.find({ userId: userId }, function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function findFormById(id) {

        var deferred = q.defer();

        FormModel.findById(id, function(err, doc) {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
    }

    function updateForm(id, form) {

        var deferred = q.defer();

        FormModel.update({ _id: id }, form, function(err, result) {
           if(err) {
               deferred.reject(err);
           } else {
               findFormById(id).then(function(form) {
                  deferred.resolve(form);
               });
           }
        });

        return deferred.promise;
    }

    function deleteForm(id) {

        var deferred = q.defer();

        FormModel.remove({ _id: id }, function(err, result) {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve();
           }
        });

        return deferred.promise;

    }

    function findFormByTitle(title) {

        var deferred = q.defer();

        FormModel.findOne({ title: title }, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function getFieldsByFormId(id) {

        var deferred = q.defer();

        FormModel.findById(id, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });

        return deferred.promise;
    }

    function getFieldById(id) {

        var deferred = q.defer();

        FieldModel.findById(id, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteField(formId, fieldId) {

        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc) {
           if(err) {
               deferred.reject(err);
           } else {
               doc.fields.id(fieldId).remove();
               doc.save()

               FieldModel.findByIdAndRemove(fieldId, function(err, result) {
                   if(err) {
                       deferred.reject(err);
                   } else {
                       deferred.resolve(doc.fields);
                   }
               })
           }
        });

        return deferred.promise;
    }

    function createField(formId, field) {

        var deferred = q.defer();

        FormModel.findById(formId, function(err, formDoc) {
           if(err) {
               deferred.reject(err);
           } else {
               formDoc.fields.push(field);
               formDoc.save();
               deferred.resolve(formDoc.fields[formDoc.fields.length-1]);
           }
        });

        return deferred.promise;
    }

    function updateAllFields(formId, fields) {

        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc) {
           if(err) {
               deferred.reject(err);
           } else {
               // wipe out fields
               doc.fields = [];

               // recreate in new order
               for(var f in fields) {
                   doc.fields.push(fields[f]);
               }

               doc.save();

               deferred.resolve(doc.fields);

           }
        });

        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {

        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                var oldField = doc.fields.id(fieldId);

                oldField.label = field.label;
                oldField.type = field.type;
                oldField.placeholder = field.placeholder;
                oldField.options = field.options;

                doc.save();

                deferred.resolve(oldField);
            }
        });

        return deferred.promise;
    }

};