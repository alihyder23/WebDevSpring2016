(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($routeParams, $scope, FieldService){
        var formId = $routeParams.formId;

        $scope.newFieldOptions = [
            {
                label: "Single Line Text Field",
                value: "TEXT"
            },
            {
                label: "Multi Line Text Field",
                value: "TEXTAREA"
            },
            {
                label: "Date Field",
                value: "DATE"
            },
            {
                label: "Dropdown Field",
                value: "OPTIONS"
            },
            {
                label: "Checkboxes Field",
                value: "CHECKBOXES"
            },
            {
                label: "Radio Buttons Field",
                value: "RADIOS"
            }
        ];

        $scope.fieldType = $scope.newFieldOptions[0];

        FieldService.getFieldsForForm(formId).then(function(res) {
           $scope.fields = res.data;
        });

        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.editField = editField;
        $scope.labelForType = labelForType();
        $scope.saveField = saveField;

        function labelForType(type) {
            switch(type) {
                case "TEXT":
                    return "Single Line Text Field";
                case "TEXTAREA":
                    return "Mutli Line Text Field";
                case "DATE":
                    return "Date Field";
                case "OPTIONS":
                    return "Dropdown Field";
                case "CHECKBOXES":
                    return "Checkboxes Field";
                case "RADIOS":
                    return "Radio Buttons Field";
                default:
                    return "Edit field";
            }
        }

        function editField(index) {
            $scope.editingField = jQuery.extend(true, {}, $scope.fields[index]);
            $scope.editingOptions = $scope.editingField.options ? optionsToString($scope.editingField.options) : null;
            $scope.editingIndex = index;
            $scope.editingType = labelForType($scope.editingField.type);
        }

        function saveField() {
            if($scope.editingOptions) {
                $scope.editingField.options = stringToOptions($scope.editingOptions);
            }
            FieldService.updateField(formId, $scope.editingField._id, $scope.editingField).then(function(res) {
               $scope.fields[$scope.editingIndex] = res.data;
            });
        }

        $scope.canEditPlaceholder = function() {
            return $scope.editingField && ($scope.editingField.type === "TEXT" ||  $scope.editingField.type === "TEXTAREA");
        };

        $scope.canEditOptions = function () {
            return $scope.editingField && ($scope.editingField.type === "OPTIONS"
                || $scope.editingField.type === "CHECKBOXES" || $scope.editingField.type === "RADIOS");
        };

        function addField() {
            var field;
            switch($scope.fieldType.value) {
                case "TEXT":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New" +
                    " Field"};
                    break;
                case "DATE":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "CHECKBOXES":
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "RADIOS":
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
            }
            FieldService.createFieldForForm(formId, field).then(function(res) {
                $scope.fields = res.data;
            });
        }

        function deleteField(index) {
            FieldService.deleteFieldFromForm(formId, $scope.fields[index]._id).then(function(res) {
               $scope.fields = res.data;
            });
        }

        function cloneField(index) {
            FieldService.createFieldForForm(formId, $scope.fields[index]).then(function(res) {
               $scope.fields = res.data;
            });
        }

        var startIndex = 0;
        var endIndex = 0;

        $( "#sortable" ).sortable({ handle: '.handle', cancel: '' });
        $( "#sortable" ).on( "sortstop", function( event, ui ) {
            endIndex = ui.item.index();
            reorderFields();
        } );
        $( "#sortable" ).on( "sortstart", function( event, ui ) {
            startIndex = ui.item.index();
        } );

        function reorderFields() {
            $scope.fields.splice(endIndex, 0, $scope.fields.splice(startIndex, 1)[0]);
            FieldService.updateAllFields(formId, $scope.fields).then(function(res) {
               $scope.fields = res.data;
            });
        }

        function optionsToString(options) {
            var string = "";
            for(var o in options) {
                var option = options[o];
                string += option.value.toString();
                string += ':';
                string += option.label.toString();
                string += '\n';
            }
            return string;
        }

        function stringToOptions(string) {
            var options = [];
            var split = string.split('\n');
            for(var i in split) {
                var line = split[i];
                if(!line.trim()) {
                    continue;
                }
                var lineSplit = line.split(':');
                var option = {
                    value: lineSplit[0].trim(),
                    label: lineSplit[1].trim()
                };
                options.push(option);
            }
            return options;
        }
    }
})();