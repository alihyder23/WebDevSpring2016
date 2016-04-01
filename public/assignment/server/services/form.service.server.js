module.exports = function(app, formModel) {

    app.get('/api/assignment/user/:userId/form', findFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateForm);

    function findFormsForUser(req, res) {

        var userId = req.params.userId;

        formModel.findFormsForUser(userId).then(function(forms) {
           res.json(forms);
        });
    }

    function findFormById(req, res) {

        var id = req.params.formId;

        formModel.findFormById(id).then(function(form) {
           res.json(form);
        });
    }

    function deleteForm(req, res) {

        var id = req.params.formId;

        formModel.deleteForm(id).then(function(forms) {
            res.json(forms);
        });
    }

    function createForm(req, res) {

        var userId = req.params.userId;
        var form = req.body;

        console.log(req.body);

        formModel.createForm(userId, form).then(function(forms) {
            res.json(forms);
        });
    }

    function updateForm(req, res) {

        var id = req.params.formId;
        var form = req.body;

        formModel.updateForm(id, form).then(function(form) {
            res.json(form);
        });
    }

};