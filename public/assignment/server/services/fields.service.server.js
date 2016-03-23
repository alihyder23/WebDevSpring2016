module.exports = function(app, formModel) {

    app.get('/api/assignment/form/:formId/field', getFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);
    app.put('/api/assignment/form/:formId/fields', updateAllFields);

    function getFieldsByFormId(req, res) {

        var formId = req.params.formId;

        formModel.getFieldsByFormId(formId).then(function(fields) {
           res.json(fields);
        });
    }

    function getFieldById(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        formModel.getFieldById(formId, fieldId).then(function(field) {
           res.json(field);
        });

    }

    function deleteField(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        formModel.deleteField(formId, fieldId).then(function(fields) {
            res.json(fields);
        });
    }

    function createField(req, res) {

        var formId = req.params.formId;
        var field = req.body;

        formModel.createField(formId, field).then(function(fields) {
           res.json(fields);
        });
    }

    function updateField(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        formModel.updateField(formId, fieldId, field).then(function(field) {
           res.json(field);
        });
    }

    function updateAllFields(req, res) {

        var formId = req.params.formId;
        var fields = req.body;

        formModel.updateAllFields(formId, fields).then(function(fields) {
            res.json(fields);
        })
    }

};