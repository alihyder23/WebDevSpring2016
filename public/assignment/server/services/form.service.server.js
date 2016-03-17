module.exports = function (app, formModel) {

    app.post("/api/assignment/user/:userId/form", addFormForUser);
    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form", getAllForms);
    app.get("/api/assignment/form/:formId", getSingleForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", removeForm);


    function getAllForms(req, res) {
        var userId = req.params.userId;

        formModel.findAllForms().then(function(forms) {
            res.json(forms);
        })
    }

    function getAllFormsForUser(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsforUser(userId).then(function(forms) {
            res.json(forms);
        });

    }

    function addFormForUser(req, res) {
        var userId = req.params.userId;
        formModel.createFormForUser(userId).then(function(form) {
            res.json(form);
        });
    }

    function getSingleForm(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId).then(function(form) {
            res.json(form);
        });
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateForm(formId, form)
    }

    function removeForm(req, res) {
        var formId = req.params.formId;
        formModel.deleteForm(id).then(function(forms) {
            res.json(forms);
        });
    }
};