
var ProdQualityDetailsManager = {
    SaveProdQuality: function () {
        var validator = $("#divProdQualityDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");

        if (validator.validate()) {
            var prodQualityObj = ProdQualityDetailsHelper.CreateObject();
            var strProdQuality = JSON.stringify(prodQualityObj);
            var jsonParam = 'entity:' + strProdQuality;
            var serviceUrl = "../ProdQuality/SaveProdQuality/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            var msg = "";
            if (prodQualityObj.QID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdProdQualitySummary").data("kendoGrid").dataSource.read();

                            ProdQualityDetailsHelper.ClearForm();
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

var ProdQualityDetailsHelper = {
    InitDetails: function () {

        ProdQualityDetailsHelper.GenerateNumericTextBox();

        $("#btnSave").click(function () {
            ProdQualityDetailsManager.SaveProdQuality();
        });
        $("#btnClear").click(function () {
            ProdQualityDetailsHelper.ClearForm();
        });

    },

    CreateObject: function () {
        var obj = new Object();
        obj.QID = $("#hdnQID").val();
        obj.QCode = $("#txtQCode").data("kendoNumericTextBox").value();
        obj.QName = $("#txtQName").val();
        obj.Remarks = $("#txtRemarks").val();
        obj.Rate = $("#txtRate").data("kendoNumericTextBox").value();

        return obj;
    },

    FillForm: function (obj) {

        $("#hdnQID").val(obj.QID);
        $("#txtQCode").data("kendoNumericTextBox").value(obj.QCode);
        $("#txtQName").val(obj.QName);
        $("#txtRemarks").val(obj.Remarks);
        $("#txtRate").data("kendoNumericTextBox").value(obj.Rate);
    },

    ClearForm: function () {

        $("#hdnQID").val(0);
        $("#txtQCode").data("kendoNumericTextBox").value('');
        $("#txtQName").val('');
        $("#txtRemarks").val('');
        $("#txtRate").data("kendoNumericTextBox").value('');

        $("#divProdQualityDetails > form").kendoValidator();
        $("#divProdQualityDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    GenerateNumericTextBox: function () {
        $("#txtQCode").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtRate").kendoNumericTextBox({ format: "#", min: 0 });
    }

}