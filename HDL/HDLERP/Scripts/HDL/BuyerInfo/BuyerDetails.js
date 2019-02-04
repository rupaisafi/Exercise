
var BuyerInfoDetailsManager = {
    SaveBuyerInfo: function () {
        var validator = $("#divBuyerDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var buyerObj = BuyerInfoDetailsHelper.CreateBuyerObject();
            var objBuyer = JSON.stringify(buyerObj);
            var jsonParam = 'objBuyer:' + objBuyer;
            var serviceUrl = "../BuyerInfo/SaveBuyerInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (buyerObj.BuyerId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdBuyerInfoSummary").data("kendoGrid").dataSource.read();
                            BuyerInfoDetailsHelper.ClearForm();
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
    GenerateMaxBuyerCode: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../BuyerInfo/GenerateMaxBuyerCode/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
            $("#txtBuyerCode").val(obj.BuyerCode);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
}

var BuyerInfoDetailsHelper = {
    InitByerDetails: function () {
        HdlCommonHelper.GenerateCountryCombo("cmbCountry");
        $("#btnSave").click(function () {
            BuyerInfoDetailsManager.SaveBuyerInfo();
        });
        $("#btnClear").click(function () {
            BuyerInfoDetailsHelper.ClearForm();
        });
        $("#btnGenerateBuyerCode").click(function () {
            BuyerInfoDetailsManager.GenerateMaxBuyerCode();
        });
    },

    CreateBuyerObject:function() {
        var obj = new Object();
        obj.BuyerId = $("#hdnBuyerId").val();
        obj.BuyerCode = $("#txtBuyerCode").val();
        obj.BuyerName = $("#txtBuyerName").val();
        obj.ShortName = $("#txtShortName").val();
        obj.PhoneNoPer = $("#txtPhoneNoPer").val();
        obj.PhoneNoOffice = $("#txtPhoneNoOffice").val();
        obj.PhoneNoHome = $("#txtPhoneNoHome").val();
        obj.FaxNo = $("#txtFaxNo").val();
        obj.ContactPerson = $("#txtContPerson").val();
        obj.CpDesignation = $("#txtContPDesig").val();
        obj.Email = $("#txtEmail").val();
        obj.BuyerAddr = $("#txtAddress").val();
        obj.CountryId = $("#cmbCountry").data("kendoComboBox").value();
        obj.IsActive = $("#chkIsActive").is(":checked") === true ? 1 : 0;
        return obj;
    },

    FillForm:function(obj) {
        $("#hdnBuyerId").val(obj.BuyerId);
        $("#txtBuyerCode").val(obj.BuyerCode);
        $("#txtBuyerName").val(obj.BuyerName);
        $("#txtShortName").val(obj.ShortName);
        $("#txtPhoneNoPer").val(obj.PhoneNoPer);
        $("#txtPhoneNoOffice").val(obj.PhoneNoOffice);
        $("#txtPhoneNoHome").val(obj.PhoneNoHome);
        $("#txtEmail").val(obj.Email);
        $("#txtFaxNo").val(obj.FaxNo);
        $("#txtContPerson").val(obj.ContactPerson);
        $("#txtContPDesig").val(obj.CpDesignation);
        $("#txtAddress").val(obj.BuyerAddr);
        $("#cmbCountry").data("kendoComboBox").value(obj.CountryId);
        if (obj.IsActive === 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeAttr('checked', 'checked');
        }
    },

    ClearForm:function() {
        $("#hdnBuyerId").val("");
        $("#txtBuyerCode").val("");
        $("#txtBuyerName").val("");
        $("#txtShortName").val("");
        $("#txtPhoneNoPer").val("");
        $("#txtPhoneNoOffice").val("");
        $("#txtPhoneNoHome").val("");   
        $("#txtEmail").val("");
        $("#txtFaxNo").val("");
        $("#txtContPerson").val("");
        $("#txtContPDesig").val("");
        $("#txtAddress").val("");
        $("#cmbCountry").data("kendoComboBox").value("");
        $("#chkIsActive").prop('checked', false);

        $("#divBuyerDetails > form").kendoValidator();
        $("#divBuyerDetails").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");

    }

}