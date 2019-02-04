
var ColorInfoDetailsManager = {
    SaveColorInfo: function () {
        var validator = $("#divColorDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var colorObj = ColorInfoDetailsHelper.CreateColorObject();
            var objColor = JSON.stringify(colorObj);
            var jsonParam = 'objColor:' + objColor;
            var serviceUrl = "../ColorInfo/SaveColorInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (colorObj.ColorId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdColorInfoSummary").data("kendoGrid").dataSource.read();
                            ColorInfoDetailsHelper.ClearForm();
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

var ColorInfoDetailsHelper = {
    InitColorInfoDetails: function () {
        $("#btnSave").click(function () {
            ColorInfoDetailsManager.SaveColorInfo();
        });
        $("#btnClear").click(function () {
            ColorInfoDetailsHelper.ClearForm();
        });
    },

    CreateColorObject: function () {
        var obj = new Object();
        obj.ColorId = $("#hdnColorId").val();
        obj.ColorName = $("#txtColorName").val();
        obj.ColorCode = $("#txtColorCode").val();
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnColorId").val(obj.ColorId);
        $("#txtColorName").val(obj.ColorName);
        $("#txtColorCode").val(obj.ColorCode);
    },

    ClearForm: function () {
        $("#hdnColorId").val("");
        $("#txtColorName").val("");
        $("#txtColorCode").val("");
        $("#divColorDetails > form").kendoValidator();
        $("#divColorDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    }

}