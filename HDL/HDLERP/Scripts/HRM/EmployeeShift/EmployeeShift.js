/// <reference path="../employeesearch/employeesummary.js" />
/// <reference path="../../common/common.js" />
/// <reference path="../../common/hrmcommon.js" />
var EmployeeShiftManager = {
    saveEmployeeShift: function () {
        var empObj = gbSelectiveEmpArray;
        var shiftObj = EmployeeShiftHelper.generateShiftObject();
        var objEmployee = JSON.stringify(empObj);
        var objShift = JSON.stringify(shiftObj);
        var jsonParam = 'objEmployee:' + objEmployee + ',objShift:' + objShift;
        var serviceUrl = "../EmployeeShift/Save/";
        window.AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            if (jsonData === "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Save Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }

            else {
                AjaxManager.MsgBox('error', 'center', 'Error1', jsonData,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                [{
                    addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }
    }
};

var EmployeeShiftHelper = {
    InitEmployeeShift: function () {
        HrmCommonHelper.GenerateShiftCombo("cmbShift");
        $("#txtStartDate").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy",
                value: new Date()
            });

        $("#btnSave").click(function () {
            EmployeeShiftManager.saveEmployeeShift();
        });
        
    },
    generateShiftObject: function () {
        var obj = new Object();
        obj.ShiftID = $("#cmbShift").data("kendoComboBox").value();
        obj.StartDate = $("#txtStartDate").data("kendoDatePicker").value();
        return obj;
    }
};