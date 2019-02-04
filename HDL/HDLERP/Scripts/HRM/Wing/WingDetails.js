/// <reference path="../../Common/HRMCommon.js" />
var WingDetailsManager = {
    SaveWing: function () {
        var validator = $("#divWingDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var WingObj = WingDetailsHelper.CreateWingObject();
            var objWing = JSON.stringify(WingObj);
            var jsonParam = 'objWing:' + objWing;
            var serviceUrl = "../Wing/SaveWing/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (WingObj.WingID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdWingSummary").data("kendoGrid").dataSource.read();
                            WingDetailsHelper.ClearForm();
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

var WingDetailsHelper = {
    InitWingDetails: function () {
        $("#btnSave").click(function () {
            WingDetailsManager.SaveWing();
        });
        $("#btnClear").click(function () {
            WingDetailsHelper.ClearForm();
        });
    },

    CreateWingObject: function () {
        var obj = new Object();
        obj.WingID = $("#hdnWingId").val();
        obj.WingName = $("#txtWingName").val();
        obj.WingNameBan = $("#txtWingNameBan").val();
        if ($('#chkInActive').is(":checked")) {
            obj.IsActive = true;
        }
        else {
            obj.IsActive = false;
        }
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnWingId").val(obj.WingID);
        $("#txtWingName").val(obj.WingName);
        $("#txtWingNameBan").val(obj.WingNameBan);
        if (obj.IsActive) {
            $("#chkInActive").prop('checked', true);
        }
        else {
            $("#chkInActive").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnWingId").val("");
        $("#txtWingName").val("");
        $("#txtWingNameBan").val("");
        $("#chkInActive").prop('checked', false);

        $("#divWingDetails > form").kendoValidator();
        $("#divWingDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}