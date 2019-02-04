/// <reference path="../../Common/HRMCommon.js" />
var TeamDetailsManager = {
    SaveTeam: function () {
        var validator = $("#divTeamDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var TeamObj = TeamDetailsHelper.CreateTeamObject();
            var objTeam = JSON.stringify(TeamObj);
            var jsonParam = 'objTeam:' + objTeam;
            var serviceUrl = "../Team/SaveTeam/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (TeamObj.TeamID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdTeamSummary").data("kendoGrid").dataSource.read();
                            TeamDetailsHelper.ClearForm();
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

var TeamDetailsHelper = {
    InitTeamDetails: function () {
        $("#btnSave").click(function () {
            TeamDetailsManager.SaveTeam();
        });
        $("#btnClear").click(function () {
            TeamDetailsHelper.ClearForm();
        });
    },

    CreateTeamObject: function () {
        var obj = new Object();
        obj.TeamID = $("#hdnTeamId").val();
        obj.TeamName = $("#txtTeamName").val();
        obj.TeamNameBan = $("#txtTeamNameBan").val();
        if ($('#chkInActive').is(":checked")) {
            obj.IsActive = true;
        }
        else {
            obj.IsActive = false;
        }
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnTeamId").val(obj.TeamID);
        $("#txtTeamName").val(obj.TeamName);
        $("#txtTeamNameBan").val(obj.TeamNameBan);
        if (obj.IsActive) {
            $("#chkInActive").prop('checked', true);
        }
        else {
            $("#chkInActive").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnTeamId").val("");
        $("#txtTeamName").val("");
        $("#txtTeamNameBan").val("");
        $("#chkInActive").prop('checked', false);

        $("#divTeamDetails > form").kendoValidator();
        $("#divTeamDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}