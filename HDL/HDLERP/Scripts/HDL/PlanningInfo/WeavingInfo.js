var gbWeavGridData = [];
var WeavingInfoManager = {
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

var WeavingInfoHelper = {
    InitWeavingInfo: function () {
        $("#popupWeavingInfo").kendoWindow({
            title: "Weaving Inforamtion",
            resizeable: true,
            scrollable: false,
            width: "50%",
            actions: ["Pin", "Close"],
            modal: true,
            animation: {
                close: {
                    effects: "fade:out"
                },
            }
        });
        WeavingInfoHelper.GenerateNumericTextBox();
        HdlCommonHelper.GenerateSelvedgeCombo("cmbSelvedge");
        WeavingInfoHelper.GenerateLeasingCombo("cmbLeasingWv");
        HdlCommonHelper.GenerateINameCombo("cmbINameWv");
        HdlCommonHelper.GenerateSNameCombo("cmbSNameWv");
        HdlCommonHelper.GenerateYarnCombo("cmbYarnWv");
        WeavingInfoHelper.GenerateLotCombo("cmbYarnLotWv", "0");

        $("#btnAddWeaving").click(function () {
            WeavingInfoHelper.ClearWeavingInformation();
            // $("#cmbINameWv").data("kendoComboBox").enable(true);
            $("#btnAddToListWv").show();
            $("#btnUpdateWv").hide();
            $("#popupWeavingInfo").data("kendoWindow").open().center();
        });
        $("#btnCloseWv").click(function () {
            $("#popupWeavingInfo").data("kendoWindow").close();
            WeavingInfoHelper.ClearWeavingInformation();
        });
        $("#cmbINameWv").change(function () {
            var iName = $("#cmbINameWv").data("kendoComboBox").value();
            WeavingInfoHelper.GenerateLotCombo("cmbYarnLotWv", iName);
        });
        $("#btnAddToListWv").click(function () {
            WeavingInfoHelper.AddToList();
        });
        $("#btnUpdateWv").click(function () {
            WeavingInfoHelper.UpdateWeavingGrid();
        });
        $("#btnClearWv").click(function () {
            WeavingInfoHelper.ClearWeavingInformation();
        });

        $("#cmbYarnLotWv").change(function () {
            WeavingInfoHelper.FillInfoByLot();
        });

        $("#txtRateWv").change(function () {
            WeavingInfoHelper.CalculateAmount();
        });
        $("#txtQtyWv").change(function () {
            WeavingInfoHelper.CalculateAmount();
        });
    },

    GenerateNumericTextBox: function () {
        HdlCommonHelper.GenerateNumericTextBox("txtNoOfBeemWv");
        HdlCommonHelper.GenerateNumericTextBox("txtBeemLengthWv");
        HdlCommonHelper.GenerateNumericTextBox("txtQtyWv");
        HdlCommonHelper.GenerateNumericTextBox("txtRateWv");
        HdlCommonHelper.GenerateNumericTextBox("txtYarnCountWv");
    },
    FillWeavingInformation: function (obj) {
        var setLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        var greyLength = ((setLength * 1.02 * 1.0936) * 0.91).toFixed(2);
        $("#txtGreyLgthWv").val(greyLength);
        $("#txtGreyWidthWv").val(obj.GreyWidth);
        $("#txtWeightWv").val(obj.GreyWeigth);
        $("#txtGreyPpiWv").val(obj.GPPI);
        $("#txtWeftRatioWv").val(obj.WeftRatio);
        $("#txtWeftCountsWv").val(obj.Construction);
        $("#txtReedSpaceWv").val(obj.ReedSpace);
        $("#txtReedCountWv").val(obj.ReedCount);
        $("#txtEndDentWv").val(obj.EndsDent);
        //  $("#txtNoOfBeemWv").val(obj.NoOfBeem);
    },
    GenerateLeasingCombo: function (identity) {
        var objOType = [{ Id: 1, Name: "Yes" },
                        { Id: 0, Name: "No" }];
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "Name",
            dataValueField: "Id",
            dataSource: objOType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },


    GenerateLotCombo: function (identity, iName) {
        var objOType = WeavingInfoManager.GetLotNoByIName(iName);
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
    AddToList: function () {
        var yarncombo = $("#cmbYarnWv").data("kendoComboBox");
        var yarnQty = $("#txtQtyWv").data("kendoNumericTextBox").value();

        var weavingGrid = $("#grdWeavingSummary").data("kendoGrid");
        if (yarncombo.value() !== "0" && yarnQty > 0) {
            var gridData = weavingGrid.dataSource.data();
            for (var i = 0; i < gridData.length; i++) {
                var itm = gridData[i];
                if (itm.YCode === yarncombo.value()) {
                    AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'This Yarn Already Added!',
                    [
                        {
                            addClass: "btn btn-primary",
                            text: "Ok",
                            onClick: function ($noty) {
                                $noty.close();
                                return;
                            }
                        }
                    ]);
                    return;
                }
            }
            var objWeaving = new Object();
            objWeaving.YCode = yarncombo.value();
            objWeaving.YarnName = yarncombo.text();
            objWeaving.Lot = $("#cmbYarnLotWv").data("kendoComboBox").value();
            objWeaving.ICode = $("#cmbINameWv").data("kendoComboBox").value();
            objWeaving.IName = $("#cmbINameWv").data("kendoComboBox").text();
            objWeaving.SCode = $("#cmbSNameWv").data("kendoComboBox").value();
            objWeaving.SName = $("#cmbSNameWv").data("kendoComboBox").text();
            objWeaving.YCount = $("#txtYarnCountWv").data("kendoNumericTextBox").value();
            objWeaving.Qnty = $("#txtQtyWv").data("kendoNumericTextBox").value();
            objWeaving.Rate = $("#txtRateWv").data("kendoNumericTextBox").value();
            objWeaving.Value = $("#txtValueWv").val();
            objWeaving.EPI = $("#txtEpIWv").val();
            objWeaving.PPI = $("#txtPpiWv").val();
            objWeaving.WeftRatio = $("#txtWeftRatioWv1").val();
            objWeaving.TWeftRatio = $("#txtTotalRatioWv").val();
            gbWeavGridData.push(objWeaving);
            var gridDataSource = new kendo.data.DataSource({ data: gbWeavGridData });
            weavingGrid.setDataSource(gridDataSource);
        } else {
            AjaxManager.MsgBox("warning", "center", "Warning:", "Please Select Yarn Info!",
                   [
                       {
                           addClass: "btn btn-primary",
                           text: "Ok",
                           onClick: function ($noty) {
                               $noty.close();
                               return;
                           }
                       }
                   ]);
        }

    },
    UpdateWeavingGrid: function () {
        var grid = $("#grdWeavingSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbWeavGridData.length; i++) {
            if (gbWeavGridData[i].YCode === selectedItem.YCode) {
                gbWeavGridData.splice(i, 1);
                break;
            }
        }
        var yarncombo = $("#cmbYarnWv").data("kendoComboBox");
        var objWeaving = new Object();
        objWeaving.YCode = yarncombo.value();
        objWeaving.YarnName = yarncombo.text();
        objWeaving.Lot = $("#cmbYarnLotWv").val();
        objWeaving.ICode = $("#cmbINameWv").data("kendoComboBox").value();
        objWeaving.IName = $("#cmbINameWv").data("kendoComboBox").text();
        objWeaving.SCode = $("#cmbSNameWv").data("kendoComboBox").value();
        objWeaving.SName = $("#cmbSNameWv").data("kendoComboBox").text();
        objWeaving.YCount = $("#txtYarnCountWv").data("kendoNumericTextBox").value();
        objWeaving.Qnty = $("#txtQtyWv").data("kendoNumericTextBox").value();
        objWeaving.Rate = $("#txtRateWv").data("kendoNumericTextBox").value();
        objWeaving.Value = $("#txtValueWv").val();
        objWeaving.EPI = $("#txtEpIWv").val();
        objWeaving.PPI = $("#txtPpiWv").val();
        debugger;
        objWeaving.WeftRatio = $("#txtWeftRatioWv1").val();
        objWeaving.TWeftRatio = $("#txtTotalRatioWv").val();
        gbWarpGridData.push(objWeaving);

        selectedItem.set("Lot", objWeaving.Lot);
        selectedItem.set("ICode", objWeaving.ICode);
        selectedItem.set("IName", objWeaving.IName);
        selectedItem.set("SCode", objWeaving.SCode);
        selectedItem.set("SName", objWeaving.SName);
        selectedItem.set("YCount", objWeaving.YCount);
        selectedItem.set("Qnty", objWeaving.Qnty);
        selectedItem.set("Rate", objWeaving.Rate);
        selectedItem.set("Value", objWeaving.Value);
        selectedItem.set("EPI", objWeaving.EPI);
        selectedItem.set("PPI", objWeaving.PPI);
        selectedItem.set("WeftRatio", objWeaving.WeftRatio);
        selectedItem.set("TWeftRatio", objWeaving.TWeftRatio);

        $("#popupWeavingInfo").data("kendoWindow").close();
    },
    FillWeavingPopup: function (obj) {
        $("#cmbYarnLotWv").data("kendoComboBox").value(obj.Lot);
        $("#cmbINameWv").data("kendoComboBox").value(obj.ICode);
        $("#cmbSNameWv").data("kendoComboBox").value(obj.SCode);
        $("#cmbYarnWv").data("kendoComboBox").value(obj.YCode);
        $("#txtYarnCountWv").data("kendoNumericTextBox").value(obj.YCount);
        $("#txtQtyWv").data("kendoNumericTextBox").value(obj.Qnty);
        $("#txtRateWv").data("kendoNumericTextBox").value(obj.Rate);
        $("#txtValueWv").val(obj.Value);
        $("#txtEpIWv").val(obj.EPI);
        $("#txtPpiWv").val(obj.PPI);
        $("#txtWeftRatioWv1").val(obj.WeftRatio);
        $("#txtTotalRatioWv").val(obj.TWeftRatio);
    },
    ClearWeavingInformation: function () {
        $("#cmbYarnLotWv").data("kendoComboBox").value("");
        $("#cmbINameWv").data("kendoComboBox").value("");
        $("#cmbSNameWv").data("kendoComboBox").value("");
        $("#cmbYarnWv").data("kendoComboBox").value("");
        $("#txtEpIWv").val("");
        $("#txtPpiWv").val("");
        $("#txtWeftRatioWv1").val("");
        $("#txtTotalRatioWv").val("");
        $("#txtYarnCountWv").data("kendoNumericTextBox").value("");
        $("#txtQtyWv").data("kendoNumericTextBox").value("");
        $("#txtRateWv").data("kendoNumericTextBox").value("");
        $("#txtValueWv").val("");
    },
    FillInfoByLot: function () {
        var lotNo = $("#cmbYarnLotWv").data("kendoComboBox").value();
        var icno = $("#cmbINameWv").data("kendoComboBox").value();
        var data = WeavingInfoManager.GetLotInfoByINameAndLotNo(icno, lotNo);
        $("#cmbSNameWv").data("kendoComboBox").value(data.SCode);
        $("#txtRateWv").data("kendoNumericTextBox").value(data.BRate);
        $("#cmbYarnWv").data("kendoComboBox").value(data.YarnCode);
    },
    CalculateAmount: function () {
        var rate = $("#txtRateWv").data("kendoNumericTextBox").value();
        var qnty = $("#txtQtyWv").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtValueWv").val(amt);
    }
};