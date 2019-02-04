var gbDeyingGridData = [];
var DeyingInfoManager = {

};

var DeyingInfoHelper = {
    InitDeyingInfo: function () {
        HdlCommonHelper.GenerateColorCombo("cmbColorDy");
        HdlCommonHelper.GenerateINameDyeCombo("cmbINameDy");
        HdlCommonHelper.GenerateSNameCombo("cmbSNameDy");

        $("#popupDeyingInfo").kendoWindow({
            title: "Deying Inforamtion",
            resizeable: true,
            scrollable: false,
            width: "50%",
            actions: ["Pin", "Close"],//["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            //  pinned: true,
            animation: {
                close: {
                    effects: "fade:out"
                },
            }
        });

         DeyingInfoHelper.GenerateNumericTextBox();
        $("#btnAddDeying").click(function () {
            DeyingInfoHelper.ClearDeyingInfo();
            $("#cmbINameDy").data("kendoComboBox").enable(true);
            $("#btnAddToListDeying").show();
            $("#btnUpdateDeying").hide();
            $("#popupDeyingInfo").data("kendoWindow").open().center();
        });
        $("#btnCloseDeying").click(function () {
            $("#popupDeyingInfo").data("kendoWindow").close();
            DeyingInfoHelper.ClearDeyingInfo();
        });

        $("#btnAddToListDeying").click(function () {
            DeyingInfoHelper.AddToList();
        });
        $("#btnUpdateDeying").click(function () {
            DeyingInfoHelper.UpdateWarpGrid();
        });
        $("#btnClearDeying").click(function () {
            DeyingInfoHelper.ClearDeyingInfo();
        });
        $("#txtRateDy").change(function () {
            DeyingInfoHelper.CalculateAmount();
        });
        $("#txtQtyDy").change(function () {
            DeyingInfoHelper.CalculateAmount();
        });


    },

    GenerateNumericTextBox: function () {
        $("#txtShadeIndigo").kendoNumericTextBox({
            format: "#.##",
            min: 0
        });
        $("#txtShadeBlack").kendoNumericTextBox({
            format: "#.##",
            min: 0
        });
        $("#txtBeemSpace").kendoNumericTextBox({
            format: "#.##",
            min: 0
        });
        $("#txtBeemLength").kendoNumericTextBox({
            format: "#.##",
            min: 0
        });
        HdlCommonHelper.GenerateNumericTextBox("txtSizeSetLgthDy");
        HdlCommonHelper.GenerateNumericTextBox("txtBeemLengthDy");
        HdlCommonHelper.GenerateNumericTextBox("txtBeemSpaceDy");
        HdlCommonHelper.GenerateNumericTextBox("txtRefStdDy");

        HdlCommonHelper.GenerateNumericTextBox("txtQtyDy");
        HdlCommonHelper.GenerateNumericTextBox("txtRateDy");

    },
    AddToList: function () {
        var iNamecombo = $("#cmbINameDy").data("kendoComboBox");
        var sNamecombo = $("#cmbSNameDy").data("kendoComboBox");
        var deyingGrid = $("#grdDeyingSummary").data("kendoGrid");

        if (iNamecombo.value() != "0") {
            var gridData = deyingGrid.dataSource.data();
            for (var i = 0; i < gridData.length; i++) {
                var itm = gridData[i];
                if (itm.ICode == iNamecombo.value()) {
                    AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'This IName Already Added!',
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
            var objDeying = new Object();
            objDeying.ICode = iNamecombo.value();
            objDeying.IName = iNamecombo.text();
            objDeying.SCode = sNamecombo.value();
            objDeying.SName = sNamecombo.text();
            objDeying.Qnty = $("#txtQtyDy").data("kendoNumericTextBox").value();
            objDeying.Rate = $("#txtRateDy").data("kendoNumericTextBox").value();
            objDeying.Value = $("#txtValueDy").val();
            objDeying.Remarks = $("#txtRemarksDy").val();
            gbDeyingGridData.push(objDeying);
            var gridDataSource = new kendo.data.DataSource({ data: gbDeyingGridData });
            deyingGrid.setDataSource(gridDataSource);
        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Please Input all Info!',
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
    FillDeyingInfo: function (obj) {
        $("#cmbINameDy").data("kendoComboBox").enable(false);
        $("#cmbINameDy").data("kendoComboBox").value(obj.ICode);
      
        $("#cmbSNameDy").data("kendoComboBox").value(obj.SCode);
        $("#txtQtyDy").data("kendoNumericTextBox").value(obj.Qnty);
        $("#txtRateDy").data("kendoNumericTextBox").value(obj.Rate);
        $("#txtValueDy").val(obj.Value);
        $("#txtRemarksDy").val(obj.Remarks);
    },
    UpdateWarpGrid: function () {
        var grid = $("#grdDeyingSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbDeyingGridData.length; i++) {
            if (gbDeyingGridData[i].IcNo == selectedItem.IcNo) {
                gbDeyingGridData.splice(i, 1);
                break;
            }
        }
        var iNamecombo = $("#cmbINameDy").data("kendoComboBox");
        var sNamecombo = $("#cmbSNameDy").data("kendoComboBox");
        var objDeying = new Object();
        objDeying.ICode = iNamecombo.value();
        objDeying.IName = iNamecombo.text();
        objDeying.SCode = sNamecombo.value();
        objDeying.SName = sNamecombo.text();
        objDeying.Qnty = $("#txtQtyDy").data("kendoNumericTextBox").value();
        objDeying.Rate = $("#txtRateDy").data("kendoNumericTextBox").value();
        objDeying.Value = $("#txtValueDy").val();
        objDeying.Remarks = $("#txtRemarksDy").val();
        gbDeyingGridData.push(objDeying);

        selectedItem.set("ICode", objDeying.ICode);
        selectedItem.set("IName", objDeying.IName);
        selectedItem.set("SCode", objDeying.SCode);
        selectedItem.set("SName", objDeying.SName);
        selectedItem.set("Qnty", objDeying.Qnty);
        selectedItem.set("Rate", objDeying.Rate);
        selectedItem.set("Value", objDeying.Value);
        selectedItem.set("Remarks", objDeying.Remarks);

        $("#popupDeyingInfo").data("kendoWindow").close();
    },
    ClearDeyingInfo: function () {
        $("#cmbINameDy").data("kendoComboBox").value("");
        $("#cmbSNameDy").data("kendoComboBox").value("");
        $("#txtQtyDy").data("kendoNumericTextBox").value("");
        $("#txtRateDy").data("kendoNumericTextBox").value("");
        $("#txtValueDy").val("");
        $("#txtRemarksDy").val("");
    },
    CalculateAmount: function () {
        var rate = $("#txtRateDy").data("kendoNumericTextBox").value();
        var qnty = $("#txtQtyDy").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtValueDy").val(amt);
    },


}