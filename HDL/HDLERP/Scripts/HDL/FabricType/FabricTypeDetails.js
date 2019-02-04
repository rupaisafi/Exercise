
var FabTypeDetailsManager = {
    SaveFabType: function () {
        var validator = $("#divFabTypeDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var fabTypeObj = FabTypeDetailsHelper.CreateFabricTypeObject();
            var strFabType = JSON.stringify(fabTypeObj);
            var jsonParam = 'fabricType:' + strFabType;
            var serviceUrl = "../FabricType/SaveFabricType/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            var msg = "";
            if (fabTypeObj.FabTypeCode == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdFabTypeSummary").data("kendoGrid").dataSource.read();
                            FabTypeDetailsHelper.ClearForm();
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

var FabTypeDetailsHelper = {
    InitFabTypeDetails: function () {

        $("#btnSave").click(function () {
            FabTypeDetailsManager.SaveFabType();
        });
        $("#btnClear").click(function () {
            FabTypeDetailsHelper.ClearForm();
        });
      

    },

    CreateFabricTypeObject: function () {
        var obj = new Object();
        obj.FabTypeCode = $("#hdnFabTypeCode").val();
        obj.TypeHead = $("#txtTypeHead").val();
        obj.Remarks = $("#txtRemarks").val();

        return obj;
    },

    FillForm: function (obj) {

        $("#hdnFabTypeCode").val(obj.FabTypeCode);
        $("#txtTypeHead").val(obj.TypeHead);
        $("#txtRemarks").val(obj.Remarks);
    },

    ClearForm: function () {
        $("#hdnSID").val(0);
        $("#hdnFabTypeCode").val(0);
        $("#txtTypeHead").val("");
        $("#txtRemarks").val("");

        $("#divFabTypeDetails > form").kendoValidator();
        $("#divFabTypeDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    }

}