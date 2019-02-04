
var YarnInfoDetailsManager = {
    SaveYarnInfo: function () {
        var validator = $("#divYarnInfoDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var yarnObj = YarnInfoDetailsHelper.CreateYarnObject();
            var objYarn = JSON.stringify(yarnObj);
            var jsonParam = 'objYarn:' + objYarn;
            var serviceUrl = "../YarnInfo/SaveYarnInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (yarnObj.YarnId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdYarnInfoSummary").data("kendoGrid").dataSource.read();
                            YarnInfoDetailsHelper.ClearForm();
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

var YarnInfoDetailsHelper = {
    InitYarnInfoDetails: function () {
        HdlCommonHelper.GenerateSupplierCombo("cmbSupplier");
        HdlCommonHelper.GenerateINameCombo("cmbItem");
        $("#btnSave").click(function () {
            YarnInfoDetailsManager.SaveYarnInfo();
        });
        $("#btnClear").click(function () {
            YarnInfoDetailsHelper.ClearForm();
        });
    },

    CreateYarnObject: function () {
        var obj = new Object();
        obj.YarnId = $("#hdnYarnId").val();
        obj.YarnName = $("#txtYarnName").val();
        obj.YarnCode = $("#txtYarnCode").val();
        obj.SupplierId = $("#cmbSupplier").data("kendoComboBox").value();
        obj.ICode = $("#cmbItem").data("kendoComboBox").value();
        obj.YarnSpecification = $("#txtYarnSpec").val();
        obj.SlubLengthCM = $("#txtSlubLgthCm").val();
        obj.PauseCM = $("#txtPauseCm").val();
        obj.ThiknessTime = $("#txtThicknessTime").val();
        obj.SlubPerMtr = $("#txtSlubPerMtr").val();
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnYarnId").val(obj.YarnId);
        $("#txtYarnName").val(obj.YarnName);
        $("#txtYarnCode").val(obj.YarnCode);
        $("#cmbSupplier").data("kendoComboBox").value(obj.SupplierId);
        $("#cmbItem").data("kendoComboBox").value( obj.ICode);
        $("#txtYarnSpec").val(obj.YarnSpecification);
        $("#txtSlubLgthCm").val(obj.SlubLengthCM);
        $("#txtPauseCm").val(obj.PauseCM);
        $("#txtThicknessTime").val(obj.ThiknessTime);
        $("#txtSlubPerMtr").val(obj.SlubPerMtr);
    },

    ClearForm: function () {
        $("#hdnYarnId").val("");
        $("#txtYarnName").val("");
        $("#txtYarnCode").val("");
        $("#cmbSupplier").data("kendoComboBox").value("");
        $("#cmbItem").data("kendoComboBox").value("");
        $("#txtYarnSpec").val("");
        $("#txtSlubLgthCm").val("");
        $("#txtPauseCm").val("");
        $("#txtThicknessTime").val("");
        $("#txtSlubPerMtr").val("");
        $("#divYarnInfoDetails > form").kendoValidator();
        $("#divYarnInfoDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },


}