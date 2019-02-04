var ItemInfoDetailsManager = {
    SaveItemInfo: function () {
        var validator = $("#divItemInfoDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var itemObj;
        if (validator.validate()) {
            itemObj = ItemInfoDetailsHelper.CreateIteminfoObject();
            var objItem = JSON.stringify(itemObj);
            var jsonParam = "objItem:" + objItem;
            var serviceUrl = "../ItemInfo/SaveItemInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (itemObj.IID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdItemInfoSummary").data("kendoGrid").dataSource.read();
                            ItemInfoDetailsHelper.ClearAllInfo();
                        }
                    }]);
            }
            else if (jsonData == "Exists") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', "Item Code Already Exists!",
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
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
    GenerateMaxItemCode: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../ItemInfo/GenerateMaxItemCode/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
            $("#txtItemCode").val(obj.ItemCode);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
};

var ItemInfoDetailsHelper = {
    InitItemDetails: function () {
        HdlCommonHelper.GenerateGroupCombo("cmbGroupName");
        HdlCommonHelper.GenerateItemTypeCombo("cmbItemType");
        ItemInfoDetailsHelper.GenerateNumericTextBox();

        $("#btnSave").click(function() {
            ItemInfoDetailsManager.SaveItemInfo();
        });
        $("#btnClear").click(function () {
            ItemInfoDetailsHelper.ClearAllInfo();
        });

        ItemInfoDetailsManager.GenerateMaxItemCode();
        $("#btnGenerateItemCode").click(function () {
            ItemInfoDetailsManager.GenerateMaxItemCode();
        });
    },

    GenerateNumericTextBox: function () {
        HdlCommonHelper.GenerateNumericTextBox("txtMinQnty");
        HdlCommonHelper.GenerateNumericTextBox("txtMaxQnty");
        HdlCommonHelper.GenerateNumericTextBox("txtOdQnty");
        HdlCommonHelper.GenerateNumericTextBox("txtStdRate");
    },

    CreateIteminfoObject: function () {
        var obj = new Object();
        obj.IID = $("#hdnItemId").val();
        obj.Togcn = $("#cmbGroupName").data("kendoComboBox").value();
        obj.ICNo = $("#txtItemCode").val();
        obj.ICName = $("#txtItemName").val();
        obj.ShortName = $("#txtShortName").val();
        obj.Unit = $("#txtUnit").val();
        obj.MinQnty = $("#txtMinQnty").data("kendoNumericTextBox").value();
        obj.MaxQnty = $("#txtMaxQnty").data("kendoNumericTextBox").value();
        obj.OdQnty = $("#txtOdQnty").data("kendoNumericTextBox").value();
        obj.SRate = $("#txtStdRate").data("kendoNumericTextBox").value();
        obj.ITCode = $("#cmbItemType").data("kendoComboBox").value();
        obj.Remarks = $("#txtRemarks").val();
        return obj;
    },
    FillItemInfo: function (obj) {
        $("#hdnItemId").val(obj.IID);
        $("#cmbGroupName").data("kendoComboBox").value(obj.Togcn);
        $("#txtItemCode").val(obj.ICNo);
        $("#txtItemName").val(obj.ICName);
        $("#txtShortName").val(obj.ShortName);
        $("#txtUnit").val(obj.Unit);
        $("#txtMinQnty").data("kendoNumericTextBox").value(obj.MinQnty);
        $("#txtMaxQnty").data("kendoNumericTextBox").value(obj.MaxQnty);
        $("#txtOdQnty").data("kendoNumericTextBox").value(obj.OdQnty);
        $("#txtStdRate").data("kendoNumericTextBox").value(obj.SRate);
        $("#cmbItemType").data("kendoComboBox").value(obj.ITCode);
        $("#txtRemarks").val(obj.Remarks);
    },
    ClearAllInfo: function () {
        $("#hdnItemId").val("");
        $("#cmbGroupName").data("kendoComboBox").value("");
        $("#txtItemCode").val("");
        $("#txtItemName").val("");
        $("#txtShortName").val("");
        $("#txtUnit").val("");
        $("#txtMinQnty").data("kendoNumericTextBox").value("");
        $("#txtMaxQnty").data("kendoNumericTextBox").value("");
        $("#txtOdQnty").data("kendoNumericTextBox").value("");
        $("#txtStdRate").data("kendoNumericTextBox").value("");
        $("#cmbItemType").data("kendoComboBox").value("");
        $("#txtRemarks").val("");
    }
};