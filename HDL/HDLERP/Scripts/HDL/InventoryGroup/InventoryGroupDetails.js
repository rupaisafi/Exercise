
var InventoryGroupDetailsManager = {
    SaveInventoryGroup: function () {
        var validator = $("#divInventoryGroupDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var inventoryGroupObj = InventoryGroupDetailsHelper.CreateInventoryGroupObject();
            var strInventoryGroup = JSON.stringify(inventoryGroupObj);
            var jsonParam = 'groupEntity:' + strInventoryGroup;
            var serviceUrl = "../InventoryGroup/SaveInventoryGroup/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            var msg = "";
            if (inventoryGroupObj.InventoryGroupId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdInventoryGroupSummary").data("kendoGrid").dataSource.read();
                            InventoryGroupDetailsHelper.ClearForm();
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

var InventoryGroupDetailsHelper = {
    InitInventoryGroupDetails: function () {

        InventoryGroupDetailsHelper.GenerateNumericTextBox();

        $("#btnSave").click(function () {
            InventoryGroupDetailsManager.SaveInventoryGroup();
        });
        $("#btnClear").click(function () {
            InventoryGroupDetailsHelper.ClearForm();
        });
       
    },

    CreateInventoryGroupObject: function () {
        var obj = new Object();
        obj.AGIG = $("#hdnAGIG").val();
        obj.IGCode = $("#txtIGCode").data("kendoNumericTextBox").value();
        obj.IGName = $("#txtIGName").val();

        return obj;
    },

    FillForm: function (obj) {

        $("#hdnAGIG").val(obj.AGIG);
        $("#txtIGCode").data("kendoNumericTextBox").value(obj.IGCode);
        $("#txtIGName").val(obj.IGName);
    },

    ClearForm: function () {

        $("#hdnAGIG").val(0);
        $("#txtIGCode").data("kendoNumericTextBox").value('');
        $("#txtIGName").val('');

        $("#divInventoryGroupDetails > form").kendoValidator();
        $("#divInventoryGroupDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    GenerateNumericTextBox: function () {
        $("#txtIGCode").kendoNumericTextBox({ format: "#", min: 0 });
    }

}