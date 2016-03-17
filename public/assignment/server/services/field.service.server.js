module.exports = function (app, formModel) {

    app.post("/api/assignment/form/:formId/field", addField);
    app.get("/api/assignment/form/:formId/field", getAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getSingleFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeField);

    function getAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        formModel.findFieldsForForm(formId).then(function (fields){
            res.json(fields);
        });
    }

    function getSingleFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFieldForForm(formId, fieldId).then(function(field) {
           res.json(field);
        });
    }

    function removeField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteField(formId, fieldId).then(function(fields) {
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

    function addField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createField(formId, field).then(function(field) {
            res.json(field);
        });
    }
};