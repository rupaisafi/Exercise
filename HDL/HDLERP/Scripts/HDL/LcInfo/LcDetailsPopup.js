var gbLcDetailsGridData = [];

var LcDetailsPopupManager = {
    
};

var LcDetailsPopupHelper = {
    InitLcDetailsPopup: function () {
        $("#txtLcRate").change(function () {
            LcDetailsPopupHelper.CalculateAmount();
        });
        $("#txtLcQty").change(function () {
            LcDetailsPopupHelper.CalculateAmount();
        });
        $("#txtConvRate").change(function () {
            LcDetailsPopupHelper.CalculateAmount();
        });
        $("#cmbStyle").change(function () {
            LcDetailsPopupHelper.StyleNoChangeEvent();
        });
        $("#btnClearLcDetails").click(function () {
            LcDetailsPopupHelper.ClearPopupWindoForm();
        });
        $("#btnAddLcDetails").click(function () {
            $("#btnAddToList").show();
            $("#btnUpdateODetails").hide();
            $("#cmbItem").data("kendoComboBox").enable(true);
            LcDetailsPopupHelper.ClearPopupWindoForm();
            $("#divLcDetailsPopup").data("kendoWindow").open().center();
        });
        $("#btnCloseLcDetails").click(function () {
            $("#divLcDetailsPopup").data("kendoWindow").close();
        });
        $("#btnAddToList").click(function () {
            LcDetailsPopupHelper.AddDetailsItemIntoList();
        });
        $("#btnUpdateLcDetails").click(function () {
            LcDetailsPopupHelper.UpdateLcDetailsGrid();
        });

    },

    CalculateAmount: function () {
        var rate = $("#txtLcRate").data("kendoNumericTextBox").value();
        var qnty = $("#txtLcQty").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtLcAmt").data("kendoNumericTextBox").value(amt);
        var convRate = $("#txtConvRate").data("kendoNumericTextBox").value();
     
        var valTaka = amt * (convRate == "" ? "0" : convRate);
        $("#txtValueTaka").data("kendoNumericTextBox").value(valTaka);
    },

    ClearPopupWindoForm: function () {
        $("#cmbItem").data("kendoComboBox").value("");
        $("#txtLcQty").data("kendoNumericTextBox").value("");
        $("#txtLcRate").data("kendoNumericTextBox").value("");
        $("#txtLcAmt").data("kendoNumericTextBox").value("");
        $("#cmbCurrency").data("kendoComboBox").value("");
        $("#txtConvRate").data("kendoNumericTextBox").value("");
        $("#txtValueTaka").data("kendoNumericTextBox").value("");
        $("#txtYarnCode").val("");
        $("#cmbGroupName").data("kendoComboBox").value("");
        $("#lblMessage").text("");
    },

    AddDetailsItemIntoList: function () {
        var itemCombo = $("#cmbItem").data("kendoComboBox");
        var qnty = $("#txtLcQty").data("kendoNumericTextBox").value();
        var lcDetailsGrid = $("#grdLcDetailsSummary").data("kendoGrid");
      
        if (itemCombo.value() !== "0" && qnty > 0) {
            var gridData = lcDetailsGrid.dataSource.data();
            for (var i = 0; i < gridData.length; i++) {
                var itm = gridData[i];
                if (itm.ItemCode == itemCombo.value()) {
                    AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'This Item Already Added!',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                                return;
                            }
                        }
                    ]);
                    return;
                }
            }
            var lcItem = new Object();
            lcItem.ItemName = itemCombo.text();
            lcItem.ItemCode = itemCombo.value();
            lcItem.Qnty = $("#txtLcQty").data("kendoNumericTextBox").value();
            lcItem.Rate = $("#txtLcRate").data("kendoNumericTextBox").value();
            lcItem.Amount = $("#txtLcAmt").data("kendoNumericTextBox").value();
            lcItem.CurrencyId = $("#cmbCurrency").data("kendoComboBox").value();
            lcItem.ConvRate = $("#txtConvRate").data("kendoNumericTextBox").value();
            lcItem.ValueTaka = $("#txtValueTaka").data("kendoNumericTextBox").value();
            lcItem.YarnCode = $("#txtYarnCode").val();
            lcItem.GroupId = $("#cmbGroupName").data("kendoComboBox").value();
         
            gbLcDetailsGridData.push(lcItem);
            var gridDataSource = new kendo.data.DataSource({ data: gbLcDetailsGridData });
            lcDetailsGrid.setDataSource(gridDataSource);

            $("#lblMessage").text("Item Added Successfully!");

        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Required Item & Qnty!',
                   [
                       {
                           addClass: 'btn btn-primary',
                           text: 'Ok',
                           onClick: function ($noty) {
                               $noty.close();
                               return;
                           }
                       }
                   ]);
        }

    },
    FillLcDetailsInformation: function (obj) {
        LcDetailsPopupHelper.ClearPopupWindoForm();
        $("#cmbItem").data("kendoComboBox").value(obj.ItemCode);
        $("#txtLcQty").data("kendoNumericTextBox").value(obj.Qnty);
        $("#txtLcRate").data("kendoNumericTextBox").value(obj.Rate);
        $("#txtLcAmt").data("kendoNumericTextBox").value(obj.Amount);
        $("#cmbCurrency").data("kendoComboBox").value(obj.CurrencyId);
        $("#txtConvRate").data("kendoNumericTextBox").value(obj.ConvRate);
        $("#txtValueTaka").data("kendoNumericTextBox").value(obj.ValueTaka);
        $("#txtYarnCode").val(obj.YarnCode);
        $("#cmbGroupName").data("kendoComboBox").value(obj.GroupId);

    },
    UpdateLcDetailsGrid: function () {
        var grid = $("#grdLcDetailsSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbLcDetailsGridData.length; i++) {
            if (gbLcDetailsGridData[i].ItemCode == selectedItem.ItemCode) {
                gbLcDetailsGridData.splice(i, 1);
                break;
            }
        }
        var itemCombo = $("#cmbItem").data("kendoComboBox");
        var objLc = new Object();
        objLc.ItemCode = itemCombo.text();
        objLc.ItemName = itemCombo.value();
        objLc.Qnty = $("#txtLcQty").data("kendoNumericTextBox").value();
        objLc.Rate = $("#txtLcRate").data("kendoNumericTextBox").value();
        objLc.Amount = $("#txtLcAmt").data("kendoNumericTextBox").value();
        objLc.CurrencyId = $("#cmbCurrency").data("kendoComboBox").value();
        objLc.ConvRate = $("#txtConvRate").data("kendoNumericTextBox").value();
        objLc.ValueTaka = $("#txtValueTaka").data("kendoNumericTextBox").value();
        objLc.YarnCode = $("#txtYarnCode").val();
        objLc.GroupId = $("#cmbGroupName").data("kendoComboBox").value();

        selectedItem.set("Qnty", objLc.Qnty);
        selectedItem.set("Rate", objLc.Rate);
        selectedItem.set("Amount", objLc.Amount);
        selectedItem.set("CurrencyId", objLc.CurrencyId);
        selectedItem.set("ConvRate", objLc.ConvRate);
        selectedItem.set("ValueTaka", objLc.ValueTaka);
        selectedItem.set("YarnCode", objLc.YarnCode);
        selectedItem.set("GroupId", objLc.GroupId);
        $("#divLcDetailsPopup").data("kendoWindow").close();
    },

};