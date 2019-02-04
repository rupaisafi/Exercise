var gbWarpGridData = [];
var WarpingInfoManager = {
    GetLotNoByIName: function (iName) {
        var objOrder = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetLotNoByIName/?iName=" + iName;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrder = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrder;
    },
    GetLotInfoByINameAndLotNo: function (iName, lotNo) {
        var objLotInf = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetLotInfoByINameAndLotNo/?iName=" + iName + "&lotNo=" + lotNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objLotInf = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objLotInf;
    },
};

var WarpingInfoHelper = {
    InitWarpingInfo: function () {
        $("#popupWarpingInfo").kendoWindow({
            title: "Warping Inforamtion",
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
        WarpingInfoHelper.GenerateNumericTextBox();
        HdlCommonHelper.GenerateYarnCombo("cmbYarn");
        HdlCommonHelper.GenerateINameCombo("cmbIName");
        HdlCommonHelper.GenerateSNameCombo("cmbSName");
        WarpingInfoHelper.GenerateLotCombo("cmbYarnLotWp", "0");

        $("#btnAddWarping").click(function () {
            WarpingInfoHelper.ClearWarpingInfo();
            $("#cmbYarn").data("kendoComboBox").enable(true);
            $("#btnAddToList").show();
            $("#btnUpdateWarp").hide();
            $("#popupWarpingInfo").data("kendoWindow").open().center();
        });
        $("#btnCloseWarp").click(function () {
            $("#popupWarpingInfo").data("kendoWindow").close();
            WarpingInfoHelper.ClearWarpingInfo();
        });


        $("#btnAddToList").click(function () {
            WarpingInfoHelper.AddToList();
        });
        $("#btnUpdateWarp").click(function () {
            WarpingInfoHelper.UpdateWarpGrid();
        });
        $("#btnClearWarp").click(function () {
            WarpingInfoHelper.ClearWarpingInfo();
        });

        $("#txtRateWp").change(function () {
            WarpingInfoHelper.CalculateAmount();
        });
        $("#txtQtyWp").change(function () {
            WarpingInfoHelper.CalculateAmount();
        });
        $("#cmbIName").change(function () {
            var iName = $("#cmbIName").data("kendoComboBox").value();
            WarpingInfoHelper.GenerateLotCombo("cmbYarnLotWp", iName);
        });

        $("#cmbYarnLotWp").change(function () {
            WarpingInfoHelper.FillInfoByLot();
        });
    },

    GenerateNumericTextBox: function () {
        $("#txtQtyWp").kendoNumericTextBox({
            format: "#.##",
            min: 0
        });
        $("#txtRateWp").kendoNumericTextBox({
            format: "#.##",
            min: 0
        });
    },
    AddToList: function () {
        var yarncombo = $("#cmbYarn").data("kendoComboBox");
        var yarnQty = $("#txtQtyWp").data("kendoNumericTextBox").value();

        var warpingGrid = $("#grdWarpingSummary").data("kendoGrid");
        if (yarncombo.value() != "0" && yarnQty > 0) {
            var gridData = warpingGrid.dataSource.data();
            for (var i = 0; i < gridData.length; i++) {
                var itm = gridData[i];
                if (itm.YCode == yarncombo.value()) {
                    AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'This Yarn Already Added!',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function($noty) {
                                $noty.close();
                                return;
                            }
                        }
                    ]);
                    return;
                }
            }
            var objWarp = new Object();
            objWarp.YCode = yarncombo.value();
            objWarp.YarnName = yarncombo.text();
            objWarp.Lot = $("#cmbYarnLotWp").data("kendoComboBox").value();
            objWarp.ICode = $("#cmbIName").data("kendoComboBox").value();
            objWarp.IName = $("#cmbIName").data("kendoComboBox").text();
            objWarp.SCode = $("#cmbSName").data("kendoComboBox").value();
            objWarp.NoOfBeem = $("#txtBeemNo").val();
            objWarp.NoOfCreel = $("#txtCreel").val();
            objWarp.EndsPerBeem = $("#txtEndBeem").val();
            objWarp.TEnds = $("#txtTEnds").val();
            objWarp.SetLength = $("#txtBeemLength").data("kendoNumericTextBox").value();
            objWarp.Qnty = $("#txtQtyWp").data("kendoNumericTextBox").value();
            objWarp.Rate = $("#txtRateWp").data("kendoNumericTextBox").value();
            objWarp.Value = $("#txtValueWp").val();
            gbWarpGridData.push(objWarp);
            var gridDataSource = new kendo.data.DataSource({ data: gbWarpGridData });
            warpingGrid.setDataSource(gridDataSource);
        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Please Select Yarn Info!',
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
    FillWarpingInfo: function (obj) {
        $("#cmbYarn").data("kendoComboBox").enable(false);
        $("#cmbIName").data("kendoComboBox").value(obj.ICode);
        $("#cmbSName").data("kendoComboBox").value(obj.SCode);
        $("#cmbYarn").data("kendoComboBox").value(obj.YCode);
        $("#cmbYarnLotWp").data("kendoComboBox").value(obj.Lot);
        $("#txtBeemNo").val(obj.NoOfBeem);
        $("#txtCreel").val(obj.NoOfCreel);
        $("#txtTEnds").val(obj.TEnds);
        $("#txtEndBeem").val(obj.EndsPerBeem);
        $("#txtBeemLength").data("kendoNumericTextBox").value(obj.SetLength);
        $("#txtQtyWp").data("kendoNumericTextBox").value(obj.Qnty);
        $("#txtRateWp").data("kendoNumericTextBox").value(obj.Rate);
        $("#txtValueWp").val(obj.Value);
    },
    UpdateWarpGrid: function () {
        var grid = $("#grdWarpingSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbWarpGridData.length; i++) {
            if (gbWarpGridData[i].YCode === selectedItem.YCode) {
                gbWarpGridData.splice(i, 1);
                break;
            }
        }
        var yarncombo = $("#cmbYarn").data("kendoComboBox");
        var objWarp = new Object();
        objWarp.YCode = yarncombo.value();
        objWarp.YarnName = yarncombo.text();
        objWarp.Lot = $("#cmbYarnLotWp").data("kendoComboBox").value();
        objWarp.ICode = $("#cmbIName").data("kendoComboBox").value();
        objWarp.IName = $("#cmbIName").data("kendoComboBox").text();
        objWarp.SCode = $("#cmbSName").data("kendoComboBox").value();
        objWarp.NoOfBeem = $("#txtBeemNo").val();
        objWarp.NoOfCreel = $("#txtCreel").val();
        objWarp.EndsPerBeem = $("#txtEndBeem").val();
        objWarp.TEnds = $("#txtTEnds").val();
        objWarp.SetLength = $("#txtBeemLength").data("kendoNumericTextBox").value();
        objWarp.Qnty = $("#txtQtyWp").data("kendoNumericTextBox").value();
        objWarp.Rate = $("#txtRateWp").data("kendoNumericTextBox").value();
        objWarp.Value = $("#txtValueWp").val();
        gbWarpGridData.push(objWarp);

        selectedItem.set("Lot", objWarp.Lot);
        selectedItem.set("NoOfBeem", objWarp.NoOfBeem);
        selectedItem.set("NoOfCreel", objWarp.NoOfCreel);
        selectedItem.set("TEnds", objWarp.TEnds);
        selectedItem.set("Qnty", objWarp.Qnty);
        selectedItem.set("Rate", objWarp.Rate);
        selectedItem.set("Value", objWarp.Value);
        selectedItem.set("ICode", objWarp.ICode);
        selectedItem.set("IName", objWarp.IName);
        selectedItem.set("SCode", objWarp.SCode);
        selectedItem.set("EndsPerBeem", objWarp.EndsPerBeem);
        selectedItem.set("SetLength", objWarp.SetLength);

        $("#popupWarpingInfo").data("kendoWindow").close();
    },
    ClearWarpingInfo: function () {
        $("#cmbYarnLotWp").data("kendoComboBox").value("");
        $("#cmbIName").data("kendoComboBox").value("");
        $("#cmbSName").data("kendoComboBox").value("");
        $("#cmbYarn").data("kendoComboBox").value("");
        $("#cmbYarnLotWp").data("kendoComboBox").value("");
        $("#txtBeemNo").val("");
        $("#txtCreel").val("");
        $("#txtTEnds").val("");
        $("#txtEndBeem").val("");
        $("#txtBeemLength").data("kendoNumericTextBox").value("");
        $("#txtQtyWp").data("kendoNumericTextBox").value("");
        $("#txtRateWp").data("kendoNumericTextBox").value("");
        $("#txtValueWp").val("");
    },
    CalculateAmount: function () {
        var rate = $("#txtRateWp").data("kendoNumericTextBox").value();
        var qnty = $("#txtQtyWp").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtValueWp").val(amt);
    },
    GenerateLotCombo: function (identity, iName) {
        var objOType = WarpingInfoManager.GetLotNoByIName(iName);
        var obj = new Object();
        obj.LotNo1 = "---Select---";
        obj.LotNo = "0";
        objOType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "LotNo1",
            dataValueField: "LotNo",
            dataSource: objOType,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    FillInfoByLot: function () {
        var lotNo = $("#cmbYarnLotWp").data("kendoComboBox").value();
        var icno = $("#cmbIName").data("kendoComboBox").value();
        var data = WarpingInfoManager.GetLotInfoByINameAndLotNo(icno, lotNo);
        $("#cmbSName").data("kendoComboBox").value(data.SCode);
        $("#txtRateWp").data("kendoNumericTextBox").value(data.BRate);
        $("#cmbYarn").data("kendoComboBox").value(data.YarnCode);
    },

}