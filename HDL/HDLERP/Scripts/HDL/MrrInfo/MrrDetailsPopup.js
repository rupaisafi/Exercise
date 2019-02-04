var gbMrrDetailsGridData = [];

var MrrDetailsPopupManager = {
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

var MrrDetailsPopupHelper = {
    InitMrrDetailsPopup: function () {
        HdlCommonHelper.GenerateDepartmentCombo("cmbDepartment");
        HdlCommonHelper.GenerateCottonTypeCombo("cmbCottonType");
        HdlCommonHelper.GenerateCurrencyCombo("cmbCurrency");
        HdlCommonHelper.GenerateSetNoCombo("cmbSetNo");
        HdlCommonHelper.GenerateGroupCombo("cmbGroupName");
        HdlCommonHelper.GenerateYarnCombo("cmbYarn");
        MrrBalanceSummaryHelper.GenerateMrrBalanceGrid();
        $("#txtMrrRate").change(function () {
            MrrDetailsPopupHelper.CalculateAmount();
        });
        $("#txtMrrQty").change(function () {
            MrrDetailsPopupHelper.CalculateAmount();
        });
        $("#txtConvRate").change(function () {
            MrrDetailsPopupHelper.CalculateAmount();
        });
        $("#txtLcCostPer").change(function () {
            MrrDetailsPopupHelper.CalculateLcCostAmount();
        });
        $("#cmbStyle").change(function () {
            MrrDetailsPopupHelper.StyleNoChangeEvent();
        });
        $("#btnClearMrrDetails").click(function () {
            MrrDetailsPopupHelper.ClearPopupWindoForm();
        });
        $("#btnAddMrrDetails").click(function () {
            var lcno = $("#cmbLcNo").data("kendoComboBox").value();
            if (lcno !== "0") {
                MrrDetailsPopupHelper.GenerateINameCombo("cmbItem",lcno);
                MrrBalanceSummaryHelper.LoadMrrBalanceGrid(lcno);
                MrrDetailsPopupHelper.ClearPopupWindoForm();
                $("#btnAddToList").show();
                $("#btnUpdateODetails").hide();
                $("#divMrrDetailsPopup").data("kendoWindow").open().center();
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Please Select LC No!',
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

        });
        $("#btnCloseMrrDetails").click(function () {
            $("#divMrrDetailsPopup").data("kendoWindow").close();
        });
        $("#btnAddToList").click(function () {
            MrrDetailsPopupHelper.AddDetailsItemIntoList();
        });
        $("#btnUpdateMrrDetails").click(function () {
            MrrDetailsPopupHelper.UpdateMrrDetailsGrid();
        });

    },

    CalculateAmount: function () {
        var rate = $("#txtMrrRate").data("kendoNumericTextBox").value();
        var qnty = $("#txtMrrQty").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtMrrAmt").data("kendoNumericTextBox").value(amt);
        var convRate = $("#txtConvRate").data("kendoNumericTextBox").value();

        var valTaka = amt * (convRate === "" ? "0" : convRate);
        $("#txtValueTaka").data("kendoNumericTextBox").value(valTaka);
    },

    ClearPopupWindoForm: function () {
        $("#cmbItem").data("kendoComboBox").select(0);
        $("#txtUnit").val("");
        $("#cmbYarn").data("kendoComboBox").value("");
        $("#txtMrrQty").data("kendoNumericTextBox").value("");
        $("#txtWithLcCostRate").data("kendoNumericTextBox").value("");
        $("#txtWithLcCostValue").data("kendoNumericTextBox").value("");
        $("#txtMrrRate").data("kendoNumericTextBox").value("");
        $("#txtMrrAmt").data("kendoNumericTextBox").value("");
        $("#cmbCurrency").data("kendoComboBox").value("");
        $("#txtConvRate").data("kendoNumericTextBox").value("");
        $("#txtValueTaka").data("kendoNumericTextBox").value("");
        $("#txtLotNo").val("");
        $("#txtConPerLength").data("kendoNumericTextBox").value("");
        $("#txtMfdDate").data("kendoDatePicker").value("");
        $("#txtExpDate").data("kendoDatePicker").value("");
        $("#cmbDepartment").data("kendoComboBox").value("");
        $("#cmbSetNo").data("kendoComboBox").value("");
        $("#cmbCottonType").data("kendoComboBox").value("");
        $("#txtRemarks").val("");
        $("#txtLcCostPer").data("kendoNumericTextBox").value("");
        $("#txtConPerBag").data("kendoNumericTextBox").value("");
        $("#txtTotalNoOfBag").data("kendoNumericTextBox").value("");
        $("#cmbGroupName").data("kendoComboBox").value("");

        $("#mrrDetailsWindow > form").kendoValidator();
        $("#mrrDetailsWindow").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    AddDetailsItemIntoList: function () {
        var itemCombo = $("#cmbItem").data("kendoComboBox");
        var qnty = $("#txtMrrQty").data("kendoNumericTextBox").value();
        var mrrDetailsGrid = $("#grdMrrDetailsSummary").data("kendoGrid");

        if (itemCombo.value() !== "0" && qnty > 0) {
            var gridData = mrrDetailsGrid.dataSource.data();
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
            var mrrItem = new Object();
            mrrItem.IName = itemCombo.text();
            mrrItem.ICode = itemCombo.value();
            mrrItem.RQnty = $("#txtMrrQty").data("kendoNumericTextBox").value();
            mrrItem.Unit = $("#txtUnit").val();
            mrrItem.YarnCode = $("#cmbYarn").data("kendoComboBox").value();
            mrrItem.RRate = $("#txtWithLcCostRate").data("kendoNumericTextBox").value();
            mrrItem.RValue = $("#txtWithLcCostValue").data("kendoNumericTextBox").value();
            mrrItem.LCCost = $("#txtLcCostPer").data("kendoNumericTextBox").value();
            mrrItem.WithoutCostRate = $("#txtMrrRate").data("kendoNumericTextBox").value();
            mrrItem.WithoutCostRValue = $("#txtMrrAmt").data("kendoNumericTextBox").value();
            mrrItem.CurCode = $("#cmbCurrency").data("kendoComboBox").value();
            mrrItem.CRate = $("#txtConvRate").data("kendoNumericTextBox").value();
            mrrItem.VTaka = $("#txtValueTaka").data("kendoNumericTextBox").value();
            mrrItem.LotNo = $("#txtLotNo").val();
            mrrItem.ConePerLength = $("#txtConPerLength").data("kendoNumericTextBox").value();
            mrrItem.ConePerBag = $("#txtConPerBag").data("kendoNumericTextBox").value();
            mrrItem.MfdDate = $("#txtMfdDate").data("kendoDatePicker").value();
            mrrItem.ExpDate = $("#txtExpDate").data("kendoDatePicker").value();
            mrrItem.DepartmentId = $("#cmbDepartment").data("kendoComboBox").value();
            mrrItem.SetNo = $("#cmbSetNo").data("kendoComboBox").value();
            mrrItem.CottonTypeId = $("#cmbCottonType").data("kendoComboBox").value();
            mrrItem.Remarks = $("#txtRemarks").val();
            mrrItem.TotalNoOfBag = $("#txtTotalNoOfBag").data("kendoNumericTextBox").value();
            mrrItem.GCode = $("#cmbGroupName").data("kendoComboBox").value();

            gbMrrDetailsGridData.push(mrrItem);
            var gridDataSource = new kendo.data.DataSource({ data: gbMrrDetailsGridData });
            mrrDetailsGrid.setDataSource(gridDataSource);

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
    FillMrrDetailsInformation: function (obj) {
        MrrDetailsPopupHelper.ClearPopupWindoForm();
        $("#cmbItem").data("kendoComboBox").value(obj.ICode);
        $("#txtMrrQty").data("kendoNumericTextBox").value(obj.RQnty);
        $("#txtUnit").val(obj.Unit);
        $("#cmbYarn").data("kendoComboBox").value(obj.YarnCode);
        $("#txtLcCostPer").data("kendoNumericTextBox").value(obj.LCCost);
        $("#txtWithLcCostRate").data("kendoNumericTextBox").value(obj.RRate);
        $("#txtWithLcCostValue").data("kendoNumericTextBox").value(obj.RValue);
        $("#txtMrrRate").data("kendoNumericTextBox").value(obj.WithOutCostRate);
        $("#txtMrrAmt").data("kendoNumericTextBox").value(obj.WithOutCostRValue);
        $("#cmbCurrency").data("kendoComboBox").value(obj.CurCode);
        $("#txtConvRate").data("kendoNumericTextBox").value(obj.CRate);
        $("#txtValueTaka").data("kendoNumericTextBox").value(obj.VTaka);
        $("#txtLotNo").val(obj.LotNo);
        $("#txtConPerLength").data("kendoNumericTextBox").value(obj.ConePerLenght);
        $("#txtConPerBag").data("kendoNumericTextBox").value(obj.ConePerBag);
        $("#txtMfdDate").data("kendoDatePicker").value(obj.MfdDate);
        $("#txtExpDate").data("kendoDatePicker").value(obj.ExpDate);
        $("#cmbDepartment").data("kendoComboBox").value(obj.DepartmentId);
        $("#cmbSetNo").data("kendoComboBox").value(obj.SetNo);
        $("#cmbCottonType").data("kendoComboBox").value(obj.CottonTypeId);
        $("#txtRemarks").val(obj.Remarks);
        $("#txtTotalNoOfBag").data("kendoNumericTextBox").value(obj.TotalNoOfBag);
        $("#cmbGroupName").data("kendoComboBox").value(obj.GCode);
        
    },
    UpdateMrrDetailsGrid: function () {
        var grid = $("#grdMrrDetailsSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbMrrDetailsGridData.length; i++) {
            if (gbMrrDetailsGridData[i].ItemCode == selectedItem.ItemCode) {
                gbMrrDetailsGridData.splice(i, 1);
                break;
            }
        }
        var itemCombo = $("#cmbItem").data("kendoComboBox");
        var mrrItem = new Object();
        mrrItem.ItemCode = itemCombo.text();
        mrrItem.ItemName = itemCombo.value();
        mrrItem.RQnty = $("#txtMrrQty").data("kendoNumericTextBox").value();
        mrrItem.Unit = $("#txtUnit").val();
        mrrItem.YarnCode = $("#cmbYarn").data("kendoComboBox").value();
        mrrItem.RRate = $("#txtWithLcCostRate").data("kendoNumericTextBox").value();
        mrrItem.RValue = $("#txtWithLcCostValue").data("kendoNumericTextBox").value();
        mrrItem.LCCost = $("#txtLcCostPer").data("kendoNumericTextBox").value();
        mrrItem.WithoutCostRate = $("#txtMrrRate").data("kendoNumericTextBox").value();
        mrrItem.WithoutCostRValue = $("#txtMrrAmt").data("kendoNumericTextBox").value();
        mrrItem.CurCode = $("#cmbCurrency").data("kendoComboBox").value();
        mrrItem.CRate = $("#txtConvRate").data("kendoNumericTextBox").value();
        mrrItem.VTaka = $("#txtValueTaka").data("kendoNumericTextBox").value();
        mrrItem.LotNo = $("#txtLotNo").val();
        mrrItem.ConePerLength = $("#txtConPerLength").data("kendoNumericTextBox").value();
        mrrItem.ConePerBag = $("#txtConPerBag").data("kendoNumericTextBox").value();
        mrrItem.MfdDate = $("#txtMfdDate").data("kendoDatePicker").value();
        mrrItem.ExpDate = $("#txtExpDate").data("kendoDatePicker").value();
        mrrItem.DepartmentId = $("#cmbDepartment").data("kendoComboBox").value();
        mrrItem.SetNo = $("#cmbSetNo").data("kendoComboBox").value();
        mrrItem.CottonTypeId = $("#cmbCottonType").data("kendoComboBox").value();
        mrrItem.Remarks = $("#txtRemarks").val();
        mrrItem.TotalNoOfBag = $("#txtTotalNoOfBag").data("kendoNumericTextBox").value();
        mrrItem.GCode = $("#cmbGroupName").data("kendoComboBox").value();

        selectedItem.set("RQnty", mrrItem.RQnty);
        selectedItem.set("RRate", mrrItem.RRate);
        selectedItem.set("RValue", mrrItem.RValue);
        selectedItem.set("Unit", mrrItem.Unit);
        selectedItem.set("YarnCode", mrrItem.YarnCode);
        selectedItem.set("LCCost", mrrItem.LCCost);
        selectedItem.set("WithoutCostRate", mrrItem.WithoutCostRate);
        selectedItem.set("WithoutCostRValue", mrrItem.WithoutCostRValue);
        selectedItem.set("CurCode", mrrItem.CurCode);
        selectedItem.set("VTaka", mrrItem.VTaka);
        selectedItem.set("LotNo", mrrItem.LotNo);
        selectedItem.set("ConePerLength", mrrItem.ConePerLength);
        selectedItem.set("ConePerBag", mrrItem.ConePerBag);
        selectedItem.set("MfdDate", mrrItem.MfdDate);
        selectedItem.set("ExpDate", mrrItem.ExpDate);
        selectedItem.set("DepartmentId", mrrItem.DepartmentId);
        selectedItem.set("SetNo", mrrItem.SetNo);
        selectedItem.set("CottonTypeId", mrrItem.CottonTypeId);
        selectedItem.set("Remarks", mrrItem.Remarks);
        selectedItem.set("TotalNoOfBag", mrrItem.TotalNoOfBag);
        selectedItem.set("GCode", mrrItem.GCode);

        $("#divMrrDetailsPopup").data("kendoWindow").close();
    },
    GenerateINameCombo: function (identity,lcno) {
        var objItemList = MrrDetailsPopupManager.GetItemListByLc(lcno);
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
    },
    CalculateLcCostAmount: function() {
        var rate = $("#txtMrrRate").data("kendoNumericTextBox").value();
        var qnty = $("#txtMrrQty").data("kendoNumericTextBox").value();
        var lccostper = $("#txtLcCostPer").data("kendoNumericTextBox").value();
        var withoutcostrate1 = (rate / 100) * lccostper;
        var withoutcostrate2 = rate + withoutcostrate1;
        var withoutcostratevalue = qnty * withoutcostrate2;
        $("#txtWithLcCostRate").data("kendoNumericTextBox").value(withoutcostrate2);
        $("#txtWithLcCostValue").data("kendoNumericTextBox").value(withoutcostratevalue);
    }
};