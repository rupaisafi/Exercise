/// <reference path="../../common/common.js" />
/// <reference path="../employeesearch/employeesummary.js" />
var AttendanceProcessManager = {
    ProcessAttendance: function () {
        var empObj = gbSelectiveEmpArray;
        var proObj = AttendanceProcessHelper.generateAttendanceProcessObject();
        var objEmployee = JSON.stringify(empObj);
        var objDate = JSON.stringify(proObj);
        var jsonParam = 'objEmployee:' + objEmployee + ',objDate:' + objDate;
        var serviceUrl = "../AttendanceProcess/Process/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
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

var AttendanceProcessHelper = {
    InitAttendanceProcess: function () {
        $("#txtStartDate").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy",
                value: new Date()
            });
        $("#txtEndDate").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy",
                value: new Date()
            });

        $("#btnProcess").click(function () {
            AttendanceProcessManager.ProcessAttendance();
        });

    },
    generateAttendanceProcessObject: function () {
        var obj = new Object();
        obj.StartDate = $("#txtStartDate").data("kendoDatePicker").value();
        obj.EndDate = $("#txtEndDate").data("kendoDatePicker").value();
        return obj;
    }
};