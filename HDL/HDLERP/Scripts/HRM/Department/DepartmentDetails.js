/// <reference path="../../Common/HRMCommon.js" />
var DepartmentDetailsManager = {
    SaveDepartment: function () {
        var validator = $("#divDepartmentDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var DepartmentObj = DepartmentDetailsHelper.CreateDepartmentObject();
            var objDepartment = JSON.stringify(DepartmentObj);
            var jsonParam = 'objDepartment:' + objDepartment;
            var serviceUrl = "../Department/SaveDepartment/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (DepartmentObj.DepartmentID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdDepartmentSummary").data("kendoGrid").dataSource.read();
                            DepartmentDetailsHelper.ClearForm();
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
}

var DepartmentDetailsHelper = {
    InitDepartmentDetails: function () {
        $("#btnSave").click(function () {
            DepartmentDetailsManager.SaveDepartment();
        });
        $("#btnClear").click(function () {
            DepartmentDetailsHelper.ClearForm();
        });
    },

    CreateDepartmentObject: function () {
        var obj = new Object();
        obj.DepartmentID = $("#hdnDepartmentId").val();
        obj.DepartmentName = $("#txtDepartmentName").val();
        obj.DepartmentNameBan = $("#txtDepartmentNameBan").val();
        if ($('#chkInActive').is(":checked")) {
            obj.IsActive = true;
        }
        else {
            obj.IsActive = false;
        }
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnDepartmentId").val(obj.DepartmentID);
        $("#txtDepartmentName").val(obj.DepartmentName);
        $("#txtDepartmentNameBan").val(obj.DepartmentNameBan);
        if (obj.IsActive) {
            $("#chkInActive").prop('checked', true);
        }
        else {
            $("#chkInActive").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnDepartmentId").val("");
        $("#txtDepartmentName").val("");
        $("#txtDepartmentNameBan").val("");
        $("#chkInActive").prop('checked', false);

        $("#divDepartmentDetails > form").kendoValidator();
        $("#divDepartmentDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}