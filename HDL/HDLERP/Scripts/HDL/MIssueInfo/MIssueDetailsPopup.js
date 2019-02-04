var gbMIssueDetailsGridData = [];

var MIssueDetailsPopupManager = {
    GetItemListByLc: function (lcno) {
        var objIName = "";
        var jsonParam = "";
        var serviceUrl = "../MReceive/GetItemByLcNo/?lcNo=" + lcno;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objIName = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objIName;
    },
};

var MIssueDetailsPopupHelper = {
    InitMIssueDetailsPopup: function () {

        HdlCommonHelper.GenerateCottonTypeCombo("cmbCottonType");
        HdlCommonHelper.GenerateCurrencyCombo("cmbCurrency");
        HdlCommonHelper.GenerateSetNoCombo("cmbSetNo");
        HdlCommonHelper.GenerateGroupCombo("cmbGroupName");
        HdlCommonHelper.GenerateYarnCombo("cmbYarn");

        $("#txtMIssueRate").change(function () {
            MIssueDetailsPopupHelper.CalculateAmount();
        });
        $("#txtMIssueQty").change(function () {
            MIssueDetailsPopupHelper.CalculateAmount();
        });
        $("#txtRateTaka").change(function () {
            MIssueDetailsPopupHelper.CalculateAmount();
        });
        //$("#txtLcCostPer").change(function () {
        //    MIssueDetailsPopupHelper.CalculateLcCostAmount();
        //});
        $("#cmbStyle").change(function () {
            MIssueDetailsPopupHelper.StyleNoChangeEvent();
        });
        $("#btnClearMIssueDetails").click(function () {
            MIssueDetailsPopupHelper.ClearPopupWindoForm();
        });
        $("#btnAddMIssueDetails").click(function () {
            var type = $("#cmbIssueType").data("kendoComboBox").value();
            if (type !== "") {
                var lbltitle = type === "Y" ? "YARN INFORMATION ENTRY" : "CHEMICAL INFORMATION ENTRY";
                $("#lblTitle").text(lbltitle);
                MIssueDetailsPopupHelper.ClearPopupWindoForm();
                $("#btnAddToList").show();
                $("#btnUpdateMIssueDetails").hide();
                $("#divMIssueDetailsPopup").data("kendoWindow").open().center();
            } else {
                AjaxManager.MsgBox("warning", "center", "Warning:", "Please Select Yarn/Chemical",
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
           

        });
        $("#btnCloseMIssueDetails").click(function () {
            $("#divMIssueDetailsPopup").data("kendoWindow").close();
        });
        $("#btnAddToList").click(function () {
            MIssueDetailsPopupHelper.AddDetailsItemIntoList();
        });
        $("#btnUpdateMIssueDetails").click(function () {
            MIssueDetailsPopupHelper.UpdateMIssueDetailsGrid();
        });
      


    },

    CalculateAmount: function () {
        var rate = $("#txtMIssueRate").data("kendoNumericTextBox").value();
        var qnty = $("#txtMIssueQty").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtMIssueAmt").data("kendoNumericTextBox").value(amt);
        var convRate = $("#txtRateTaka").data("kendoNumericTextBox").value();

        var valTaka = amt * (convRate === "" ? "0" : convRate);
        $("#txtValueTaka").data("kendoNumericTextBox").value(valTaka);
    },

    ClearPopupWindoForm: function () {
        $("#cmbItem").data("kendoComboBox").select(0);
        $("#txtUnit").val("");
        $("#cmbYarn").data("kendoComboBox").value("");
        $("#txtMIssueQty").data("kendoNumericTextBox").value("");
        $("#txtMIssueRate").data("kendoNumericTextBox").value("");
        $("#txtMIssueAmt").data("kendoNumericTextBox").value("");
        $("#cmbCurrency").data("kendoComboBox").value("");
        $("#txtRateTaka").data("kendoNumericTextBox").value("");
        $("#txtValueTaka").data("kendoNumericTextBox").value("");
        $("#cmbLotNo").data("kendoComboBox").value("");
        $("#cmbSetNo").data("kendoComboBox").value("");
        $("#cmbCottonType").data("kendoComboBox").value("");
        $("#txtRemarks").val("");
        $("#cmbGroupName").data("kendoComboBox").value("");
        $("#cmbImportType").data("kendoComboBox").value("");
        $("#cmbLcNo").data("kendoComboBox").value("");
        $("#cmbSupplier").data("kendoComboBox").value("");
        $("#txtInvNo").val("");
        $("#lblMessage").val("");

        $("#MIssueDetailsWindow > form").kendoValidator();
        $("#MIssueDetailsWindow").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    AddDetailsItemIntoList: function () {
        var itemCombo = $("#cmbItem").data("kendoComboBox");
        var qnty = $("#txtMIssueQty").data("kendoNumericTextBox").value();
        var mIssueDetailsGrid = $("#grdMIssueDetailsSummary").data("kendoGrid");

        if (itemCombo.value() !== "0" && qnty > 0) {
            var gridData = mIssueDetailsGrid.dataSource.data();
            for (var i = 0; i < gridData.length; i++) {
                var itm = gridData[i];
                if (itm.ItemCode === itemCombo.value()) {
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
            var mIssueItem = new Object();
            mIssueItem.IName = itemCombo.text();
            mIssueItem.ICode = itemCombo.value();
            mIssueItem.Qnty = $("#txtMIssueQty").data("kendoNumericTextBox").value();
            mIssueItem.Unit = $("#txtUnit").val();
            mIssueItem.YarnCode = $("#cmbYarn").data("kendoComboBox").value();
            mIssueItem.Rate = $("#txtMIssueRate").data("kendoNumericTextBox").value();
            mIssueItem.Value = $("#txtMIssueAmt").data("kendoNumericTextBox").value();
            mIssueItem.CurCode = $("#cmbCurrency").data("kendoComboBox").value();
            mIssueItem.RateTaka = $("#txtRateTaka").data("kendoNumericTextBox").value();
            mIssueItem.ValueTaka = $("#txtValueTaka").data("kendoNumericTextBox").value();
            mIssueItem.LotNo = $("#cmbLotNo").data("kendoComboBox").value();
            mIssueItem.SetNo = $("#cmbSetNo").data("kendoComboBox").value();
            mIssueItem.CottonTypeId = $("#cmbCottonType").data("kendoComboBox").value();
            mIssueItem.Remarks = $("#txtRemarks").val();
            mIssueItem.GCode = $("#cmbGroupName").data("kendoComboBox").value();
            mIssueItem.ImpTypeId = $("#cmbImportType").data("kendoComboBox").value();
            mIssueItem.LCNo = $("#cmbLcNo").data("kendoComboBox").value();
            mIssueItem.SCode = $("#cmbSupplier").data("kendoComboBox").value();
            mIssueItem.InvNo = $("#txtInvNo").val();

            gbMIssueDetailsGridData.push(mIssueItem);
            var gridDataSource = new kendo.data.DataSource({ data: gbMIssueDetailsGridData });
            mIssueDetailsGrid.setDataSource(gridDataSource);

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
    FillMIssueDetailsInformation: function (obj) {
        MIssueDetailsPopupHelper.ClearPopupWindoForm();
        $("#cmbItem").data("kendoComboBox").value(obj.ICode);
        $("#txtMIssueQty").data("kendoNumericTextBox").value(obj.Qnty);
        $("#txtUnit").val(obj.Unit);
        $("#cmbYarn").data("kendoComboBox").value(obj.YarnCode);
        $("#txtMIssueRate").data("kendoNumericTextBox").value(obj.Rate);
        $("#txtMIssueAmt").data("kendoNumericTextBox").value(obj.Value);
        $("#cmbCurrency").data("kendoComboBox").value(obj.CurCode);
        $("#txtRateTaka").data("kendoNumericTextBox").value(obj.RateTaka);
        $("#txtValueTaka").data("kendoNumericTextBox").value(obj.ValueTaka);
        $("#cmbLotNo").data("kendoComboBox").value(obj.LotNo);
        $("#cmbSetNo").data("kendoComboBox").value(obj.SetNo);
        $("#cmbCottonType").data("kendoComboBox").value(obj.CottonTypeId);
        $("#txtRemarks").val(obj.Remarks);
        $("#cmbGroupName").data("kendoComboBox").value(obj.GCode);
        $("#cmbImportType").data("kendoComboBox").value(obj.ImpTypeId);
        $("#cmbLcNo").data("kendoComboBox").value(obj.LCNo);
        $("#cmbSupplier").data("kendoComboBox").value(obj.SCode);
        $("#txtInvNo").val(obj.InvNo);

    },
    UpdateMIssueDetailsGrid: function () {
        var grid = $("#grdMIssueDetailsSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbMIssueDetailsGridData.length; i++) {
            if (gbMIssueDetailsGridData[i].ItemCode === selectedItem.ItemCode) {
                gbMIssueDetailsGridData.splice(i, 1);
                break;
            }
        }
        var itemCombo = $("#cmbItem").data("kendoComboBox");
        var mIssueItem = new Object();
        mIssueItem.ItemCode = itemCombo.text();
        mIssueItem.ItemName = itemCombo.value();
        mIssueItem.Qnty = $("#txtMIssueQty").data("kendoNumericTextBox").value();
        mIssueItem.Rate = $("#txtMIssueRate").data("kendoNumericTextBox").value();
        mIssueItem.Value = $("#txtMIssueAmt").data("kendoNumericTextBox").value();
        mIssueItem.Unit = $("#txtUnit").val();
        mIssueItem.YarnCode = $("#cmbYarn").data("kendoComboBox").value();
        mIssueItem.CurCode = $("#cmbCurrency").data("kendoComboBox").value();
        mIssueItem.RateTaka = $("#txtRateTaka").data("kendoNumericTextBox").value();
        mIssueItem.ValueTaka = $("#txtValueTaka").data("kendoNumericTextBox").value();
        mIssueItem.LotNo = $("#cmbLotNo").data("kendoComboBox").value();
        mIssueItem.SetNo = $("#cmbSetNo").data("kendoComboBox").value();
        mIssueItem.CottonTypeId = $("#cmbCottonType").data("kendoComboBox").value();
        mIssueItem.Remarks = $("#txtRemarks").val();
        mIssueItem.GCode = $("#cmbGroupName").data("kendoComboBox").value();
        mIssueItem.ImpTypeId = $("#cmbImportType").data("kendoComboBox").value();
        mIssueItem.LCNo = $("#cmbLcNo").data("kendoComboBox").value();
        mIssueItem.SCode = $("#cmbSupplier").data("kendoComboBox").value();
        mIssueItem.InvNo = $("#txtInvNo").val();

        selectedItem.set("Qnty", mIssueItem.Qnty);
        selectedItem.set("Rate", mIssueItem.Rate);
        selectedItem.set("Value", mIssueItem.Value);
        selectedItem.set("Unit", mIssueItem.Unit);
        selectedItem.set("YarnCode", mIssueItem.YarnCode);
        selectedItem.set("CurCode", mIssueItem.CurCode);
        selectedItem.set("RateTaka", mIssueItem.RateTaka);
        selectedItem.set("ValueTaka", mIssueItem.ValueTaka);
        selectedItem.set("LotNo", mIssueItem.LotNo);
        selectedItem.set("SetNo", mIssueItem.SetNo);
        selectedItem.set("CottonTypeId", mIssueItem.CottonTypeId);
        selectedItem.set("Remarks", mIssueItem.Remarks);
        selectedItem.set("GCode", mIssueItem.GCode);
        selectedItem.set("ImpTypeId", mIssueItem.ImpTypeId);
        selectedItem.set("LCNo", mIssueItem.LCNo);
        selectedItem.set("SCode", mIssueItem.SCode);
        selectedItem.set("InvNo", mIssueItem.InvNo);

        $("#divMIssueDetailsPopup").data("kendoWindow").close();
    },
    GenerateINameCombo: function (identity, lcno) {
        var objItemList = MIssueDetailsPopupManager.GetItemListByLc(lcno);
        var obj = new Object();
        obj.ICName = "---Select---";
        obj.ICNo = 0;
        objItemList.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "ICName",
            dataValueField: "ICNo",
            dataSource: objItemList,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    }
 
};