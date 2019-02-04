/// <reference path="../../Common/HRMCommon.js" />
var UnitDetailsManager = {
    SaveUnit: function () {
        var validator = $("#divUnitDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var UnitObj = UnitDetailsHelper.CreateUnitObject();
            var objUnit = JSON.stringify(UnitObj);
            var jsonParam = 'objUnit:' + objUnit;
            var serviceUrl = "../Unit/SaveUnit/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (UnitObj.UnitId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdUnitSummary").data("kendoGrid").dataSource.read();
                            UnitDetailsHelper.ClearForm();
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

var UnitDetailsHelper = {
    InitUnitDetails: function () {
        HrmCommonHelper.GenerateCompanyCombo("cmbCompany")
        $("#btnSave").click(function () {
            UnitDetailsManager.SaveUnit();
        });
        $("#btnClear").click(function () {
            UnitDetailsHelper.ClearForm();
        });
    },

    CreateUnitObject: function () {
        var obj = new Object();
        obj.UnitId = $("#hdnUnitId").val();
        obj.CompanyId = $("#cmbCompany").val();
        obj.UnitName = $("#txtUnitName").val();
        obj.UnitNameBan = $("#txtUnitNameBan").val();
        if ($('#chkInActive').is(":checked"))
        {
            obj.IsActive = true;
        }
        else
        {
            obj.IsActive = false;
        }
        return obj;
    },

    FillForm: function (obj) {
        var cmbCompany = $("#cmbCompany").data("kendoComboBox");
        if (obj.CompanyId != 0) {
            cmbCompany.value(obj.CompanyId);
        }
        $("#hdnUnitId").val(obj.UnitId);
        $("#txtUnitName").val(obj.UnitName);
        $("#txtUnitNameBan").val(obj.UnitNameBan);
        if (obj.IsActive) {
            $("#chkInActive").prop('checked', true);
        }
        else {
            $("#chkInActive").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnUnitId").val("");
        $("#txtUnitName").val("");
        $("#txtUnitNameBan").val("");
        $("#chkInActive").prop('checked', false);
        var cmbCompany = $("#cmbCompany").data("kendoComboBox");
        cmbCompany.value(0);

        $("#divUnitDetails > form").kendoValidator();
        $("#divUnitDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}