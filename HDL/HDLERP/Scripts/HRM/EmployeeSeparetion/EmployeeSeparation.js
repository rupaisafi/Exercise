/// <reference path="../employeesearch/employeesummary.js" />
/// <reference path="../../common/common.js" />
/// <reference path="../../common/hrmcommon.js" />

var EmployeeSeparationManager = {
    saveEmployeeSeparation: function () {
        var empObj = gbSelectiveEmpArray;
        var sepObj = EmployeeSeparationHelper.generateSeparationObject();
        var objEmployee = JSON.stringify(empObj);
        var objSeparation = JSON.stringify(sepObj);
        var jsonParam = 'objSeparation:' + objSeparation;
        var serviceUrl = "../EmployeeSeparetion/Save/";
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
    },

    GetSeparationHistory: function (emp_id) {

        var objSeparation = "";
        var jsonParam = "";
        var serviceUrl = "../EmployeeSeparetion/GetEmployeeSeparation/?empId=" + emp_id;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            debugger;
            objSeparation = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objSeparation;
    },
};

var EmployeeSeparationHelper = {
    InitEmployeeSeparation: function () {

        HrmCommonHelper.GenerateStatusCombo("cmbEmployeeStatus");
        $("#txtSubDate").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy"
                //value: new Date()
            });
        $("#txtEffectDate").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy"
            });

        $("#btnSave").click(function () {
            EmployeeSeparationManager.saveEmployeeSeparation();
        });

        $("#txtEffectDate").change(function () {
            EmployeeSeparationHelper.GenerateNoticePeriodDuration();

        });
        $("#txtSubDate").change(function () {
            EmployeeSeparationHelper.GenerateNoticePeriodDuration();

        });

    },
    generateSeparationObject: function () {

        var obj = new Object();
        obj.EmpID = $("#hdnEmpID").val();
        obj.EmpStatusID = $("#cmbEmployeeStatus").data("kendoComboBox").value();
        obj.SubmissionDate = $("#txtSubDate").data("kendoDatePicker").value();
        obj.EffectDate = $("#txtEffectDate").data("kendoDatePicker").value();
        obj.NoticePeriod = $("#txtNoticePeriod").val();
        obj.IsWaive = $("#ckhWaive").val();
        obj.Remarks = $("#txtRemarks").val();
        return obj;
    },
    clickEventForEditButton: function () {
        debugger;
        var entityGrid = $("#grdEmployee").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#hdnEmpID").val(selectedItem.EmpID);
            var dataSource = EmployeeSeparationManager.GetSeparationHistory(selectedItem.EmpID)
            if (dataSource != null) {
                $("#cmbEmployeeStatus").data("kendoComboBox").value(dataSource.EmpStatusID);
                $("#txtSubDate").data("kendoDatePicker").value(dataSource.SubmissionDate);
                $("#txtEffectDate").data("kendoDatePicker").value(dataSource.EffectDate);
                $("#txtNoticePeriod").val(dataSource.NoticePeriod);
                if (selectedItem.IsWaive) {
                    $("#ckhWaive").prop('checked', 'checked');
                } else {
                    $("#ckhWaive").removeProp('checked', 'checked');
                }
                //$("#ckhWaive").val(dataSource.IsWaive);
                $("#txtRemarks").val(dataSource.Remarks);
            }
        }
    },
    GenerateNoticePeriodDuration: function () {
        var sDate = $("#txtSubDate").data("kendoDatePicker").value();
        var eDate = $("#txtEffectDate").data("kendoDatePicker").value();
        var days = 0
        if (sDate != null && eDate != null) {
            var subDate = new Date(sDate);
            var effDate = new Date(eDate);
            var diff = new Date(effDate - subDate);
            // get days
            days = diff / 1000 / 60 / 60 / 24;
        }
        $("#txtNoticePeriod").val(days);
    }
};