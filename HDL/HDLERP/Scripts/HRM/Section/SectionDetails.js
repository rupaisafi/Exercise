/// <reference path="../../Common/HRMCommon.js" />
var SectionDetailsManager = {
    SaveSection: function () {
        var validator = $("#divSectionDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var SectionObj = SectionDetailsHelper.CreateSectionObject();
            var objSection = JSON.stringify(SectionObj);
            var jsonParam = 'objSection:' + objSection;
            var serviceUrl = "../Section/SaveSection/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (SectionObj.SectionID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdSectionSummary").data("kendoGrid").dataSource.read();
                            SectionDetailsHelper.ClearForm();
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

var SectionDetailsHelper = {
    InitSectionDetails: function () {
        $("#btnSave").click(function () {
            SectionDetailsManager.SaveSection();
        });
        $("#btnClear").click(function () {
            SectionDetailsHelper.ClearForm();
        });
    },

    CreateSectionObject: function () {
        var obj = new Object();
        obj.SectionID = $("#hdnSectionId").val();
        obj.SectionName = $("#txtSectionName").val();
        obj.SectionNameBan = $("#txtSectionNameBan").val();
        if ($('#chkInActive').is(":checked")) {
            obj.IsActive = true;
        }
        else {
            obj.IsActive = false;
        }
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnSectionId").val(obj.SectionID);
        $("#txtSectionName").val(obj.SectionName);
        $("#txtSectionNameBan").val(obj.SectionNameBan);
        if (obj.IsActive) {
            $("#chkInActive").prop('checked', true);
        }
        else {
            $("#chkInActive").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnSectionId").val("");
        $("#txtSectionName").val("");
        $("#txtSectionNameBan").val("");
        $("#chkInActive").prop('checked', false);

        $("#divSectionDetails > form").kendoValidator();
        $("#divSectionDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}