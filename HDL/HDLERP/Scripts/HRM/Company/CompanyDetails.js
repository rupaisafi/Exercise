var CompanyDetailsManager = {
    SaveCompany: function () {
        var validator = $("#divCompanyDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var CompanyObj = CompanyDetailsHelper.CreateCompanyObject();
            var objCompany = JSON.stringify(CompanyObj);
            var jsonParam = 'objCompany:' + objCompany;
            var serviceUrl = "../Company/SaveCompany/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (CompanyObj.CompanyId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdCompanySummary").data("kendoGrid").dataSource.read();
                            CompanyDetailsHelper.ClearForm();
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
}

var CompanyDetailsHelper = {
    InitCompanyDetails: function () {
        $("#btnSave").click(function () {
            CompanyDetailsManager.SaveCompany();
        });
        $("#btnClear").click(function () {
            CompanyDetailsHelper.ClearForm();
        });
    },

    CreateCompanyObject: function () {
        var obj = new Object();
        obj.CompanyId = $("#hdnCompanyId").val();
        obj.CompanyName = $("#txtCompanyName").val();
        obj.CompanyNameBan = $("#txtCompanyNameBan").val();
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
        $("#hdnCompanyId").val(obj.CompanyId);
        $("#txtCompanyName").val(obj.CompanyName);
        $("#txtCompanyNameBan").val(obj.CompanyNameBan);
        if (obj.IsActive) {
            $("#chkInActive").prop('checked', true);
        }
        else {
            $("#chkInActive").prop('checked', false);
        }
    },

    ClearForm: function () {
        $("#hdnCompanyId").val("");
        $("#txtCompanyName").val("");
        $("#txtCompanyNameBan").val("");
        $("#chkInActive").prop('checked', false);
        
        $("#divCompanyDetails > form").kendoValidator();
        $("#divCompanyDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}