/// <reference path="../../Common/HRMCommon.js" />
var DesignationDetailsManager = {
    SaveDesignation: function () {
        var validator = $("#divDesignationDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var DesignationObj = DesignationDetailsHelper.CreateDesignationObject();
            var objDesignation = JSON.stringify(DesignationObj);
            var jsonParam = 'objDesignation:' + objDesignation;
            var serviceUrl = "../Designation/SaveDesignation/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (DesignationObj.DesignationID === 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData === "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdDesignationSummary").data("kendoGrid").dataSource.read();
                            DesignationDetailsHelper.ClearForm();
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

var DesignationDetailsHelper = {
    InitDesignationDetails: function () {
        HrmCommonHelper.GenerateDesignationGroupCombo("cmbGroup")
        $("#btnSave").click(function () {
            DesignationDetailsManager.SaveDesignation();
        });
        $("#btnClear").click(function () {
            DesignationDetailsHelper.ClearForm();
        });
    },

    CreateDesignationObject: function () {
        var obj = new Object();
        obj.DesignationID = $("#hdnDesignationID").val();
        obj.DesignationName = $("#txtDesignationName").val();
        obj.DesignationNameBan = $("#txtDesignationNameBan").val();
        obj.DesGroupID = $("#cmbGroup").val();
        obj.Grade = $("#txtGrade").val();
        obj.OrderBy = $("#txtOrderBy").val();
        if ($('#chkIsActive').is(":checked"))
        {
            obj.IsActive = true;
        }
        else
        {
            obj.IsActive = false;
        }
        if ($('#chkIsDelete').is(":checked")) {
            obj.IsDelete = true;
        }
        else {
            obj.IsDelete = false;
        }
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnDesignationID").val(obj.DesignationID);
        $("#txtDesignationName").val(obj.DesignationName);
        $("#txtDesignationNameBan").val(obj.DesignationNameBan);

        var cmbGroup = $("#cmbGroup").data("kendoComboBox");
        if (obj.DesGroupID != 0) {
            cmbGroup.value(obj.DesGroupID);
        }

        $("#txtGrade").val(obj.Grade);
        $("#txtOrderBy").val(obj.OrderBy);
        if (obj.IsActive) {
            $("#chkIsActive").prop('checked', true);
        }
        else {
            $("#chkIsActive").prop('checked', false);
        }
        if (obj.IsDelete) {
            $("#chkIsDelete").prop('checked', true);
        }
        else {
            $("#chkIsDelete").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnDesignationID").val("");
        $("#txtDesignationName").val("");
        $("#txtDesignationNameBan").val("");
        var cmbGroup = $("#cmbGroup").data("kendoComboBox");
        cmbGroup.value(0);
        $("#txtGrade").val("");
        $("#txtOrderBy").val("");
        $("#chkIsActive").prop('checked', false);
        $("#chkIsDelete").prop('checked', false);

        $("#divDesignationDetails > form").kendoValidator();
        $("#divDesignationDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}