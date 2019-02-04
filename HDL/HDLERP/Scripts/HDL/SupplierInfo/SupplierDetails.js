
var SupplierInfoDetailsManager = {
    SaveSupplierInfo: function () {
        var validator = $("#divSupplierDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var supplierObj;
        if (validator.validate()) {
            supplierObj = SupplierInfoDetailsHelper.CreateSupplierObject();
            var objSupplier = JSON.stringify(supplierObj);
            var jsonParam = 'objSupplier:' + objSupplier;
            var serviceUrl = "../SupplierInfo/SaveSupplierInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (supplierObj.SupplierId === 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData === "Success") {
                AjaxManager.MsgBox('success', "center", "Success:", msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdSupplierInfoSummary").data("kendoGrid").dataSource.read();
                            SupplierInfoDetailsHelper.ClearForm();
                        }
                    }]);
            }
            else if (jsonData === "Exists") {
                AjaxManager.MsgBox('warning', "center", "Warning:", "Supplier Code Already Exist!",
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
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
    GenerateMaxSupplierCode: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../SupplierInfo/GetMaxSupplierCode/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
            $("#txtSupplierCode").val(obj.SupplierCode);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
}

var SupplierInfoDetailsHelper = {
    InitSupplierInfoDetails: function () {
        HdlCommonHelper.GenerateCountryCombo("cmbCountry");
        SupplierInfoDetailsManager.GenerateMaxSupplierCode();
        $("#btnSave").click(function () {
            SupplierInfoDetailsManager.SaveSupplierInfo();
        });
        $("#btnClear").click(function () {
            SupplierInfoDetailsHelper.ClearForm();
        });
      
        $("#btnGenerateSupCode").click(function () {
            SupplierInfoDetailsManager.GenerateMaxSupplierCode();
        });

    },

    CreateSupplierObject:function() {
        var obj = new Object();
        obj.SupplierId = $("#hdnSupplierId").val();
        obj.SupplierCode=$("#txtSupplierCode").val();
        obj.SupplierName = $("#txtSupplierName").val();
        obj.ShortName=$("#txtShortName").val();
        obj.PhoneNoPer=$("#txtPhoneNoPer").val();
        obj.PhoneNoOffice=$("#txtPhoneNoOffice").val();
        obj.PhoneNoHome=$("#txtPhoneNoHome").val();
        obj.FaxNo=$("#txtFaxNo").val();
        obj.ContactPerson=$("#txtContPerson").val();
        obj.CpDesignation = $("#txtContPDesig").val();
        obj.SupplierAddr=$("#txtAddress").val();
        obj.CountryId=$("#cmbCountry").data("kendoComboBox").value();
        obj.Email = $("#txtEmail").val();
        obj.SupplierAddr = $("#txtAddress").val();
        obj.IsActive = $("#chkIsActive").is(":checked") === true ? 1 : 0;
        return obj;
    },

    FillForm:function(obj) {
        $("#hdnSupplierId").val(obj.SupplierId);
        $("#txtSupplierCode").val(obj.SupplierCode);
        $("#txtSupplierName").val(obj.SupplierName);
        $("#txtShortName").val(obj.ShortName);
        $("#txtPhoneNoPer").val(obj.PhoneNoPer);
        $("#txtPhoneNoOffice").val(obj.PhoneNoOffice);
        $("#txtPhoneNoHome").val(obj.PhoneNoHome);
        $("#txtEmail").val(obj.Email);
        $("#txtFaxNo").val(obj.FaxNo);
        $("#txtContPerson").val(obj.ContactPerson);
        $("#txtContPDesig").val(obj.CpDesignation);
        $("#txtAddress").val(obj.SupplierAddr);
        $("#cmbCountry").data("kendoComboBox").value(obj.CountryId);
        if (obj.IsActive === 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeAttr('checked', 'checked');
        }
    },

    ClearForm:function() {
        $("#hdnSupplierId").val("");
        $("#txtSupplierCode").val("");
        $("#txtSupplierName").val("");
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
        $("#txtEmail").val("");
        $("#txtAddress").val("");
        $("#chkIsActive").prop('checked', false);
        $("#divSupplierDetails > form").kendoValidator();
        $("#divSupplierDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
   
}