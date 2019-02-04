var gbWarpingProductionData = [];
var WarpingProdDetailsManager = {
    GetWarpingSetNo: function () {
        var objMc = "";
        var jsonParam = "";
        var serviceUrl = "../WarpingProduction/GetWarpingSetNo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objMc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMc;
    },
    GetInfoBySetNo: function (setNo) {
        var objMc = "";
        var jsonParam = "";
        var serviceUrl = "../WarpingProduction/GetInfoBySetNo/?setNo=" + setNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objMc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMc;
    },
    GetWarpingItemBySetNo: function (setNo) {
        var objItmList = "";
        var jsonParam = "";
        var serviceUrl = "../WarpingProduction/GetItemBySetNo/?setNo=" + setNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objItmList = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objItmList;
    },
    GetItemBySetNoAndItem: function (setNo, icNo) {
        var objItm = "";
        var jsonParam = "";
        var serviceUrl = "../WarpingProduction/GetItemBySetNoAndItem/?setNo=" + setNo + "&icNo=" + icNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objItm = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objItm;
    },
    GetLotNoByIName: function (iName) {
        var objLot = "";
        var jsonParam = "";
        var serviceUrl = "../WarpingProduction/GetLotNoByIName/?iName=" + iName;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objLot = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objLot;
    },
    SaveWarpingProdInfo: function () {
        var validator = $("#divWarpProdDetailsMaster").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var warpingObj;
        if (validator.validate()) {
            warpingObj = WarpingProdDetailsHelper.CreateWarpingProdObject();
            var warpProdDetailsList = WarpingProdDetailsHelper.GetWarpingProdDetailsGridList();
            var objWarp = JSON.stringify(warpingObj);
            var objWarpDetails = JSON.stringify(warpProdDetailsList);
            var jsonParam = "objWarp:" + objWarp + ",objWarpDetails:" + objWarpDetails;
            var serviceUrl = "../WarpingProduction/SaveWarpingProdInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (warpingObj.IdNo === "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdWarpingProductionSummary").data("kendoGrid").dataSource.read();
                            $("#hdnIdNo").val(jsonData.IdNo);

                        }
                    }]);
            }
            else if (jsonData.SaveStatus === "Exists") {
                AjaxManager.MsgBox('warning', "center", 'Warning:', "Set No already Used!",
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error1', jsonData.SaveStatus,
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
    GetAllGridData: function (idNo) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../WarpingProduction/GetAllGridData/?idNo=" + idNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                jsonData[i].WarpDate = kendo.parseDate(jsonData[i].WarpDate).toString('dd-MMM-yyyy');
            }
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
};
var WarpingProdDetailsHelper = {
    InitWarpingProduction: function () {
        $("#btnUpdateWarpDetails").hide();
        $("#btnNewDetails").hide();
        WarpingProdDetailsSummaryHelper.InitWarpingProdDetailsSummary();
        WarpingProdDetailsHelper.GenerateDatePicker();
        WarpingProdDetailsHelper.GenerateNumericTextBox();
        HdlCommonHelper.GenerateUnitCombo("cmbUnit");
        HdlCommonHelper.GenerateMcNoCombo("cmbMachineNo");
        HdlCommonHelper.GenerateStyleCombo("cmbStyleNo");
        HdlCommonHelper.GenerateYarnCombo("cmbYarn");
        HdlCommonHelper.GenerateSupplierCombo("cmbSupplier");
        HdlCommonHelper.GenerateShiftCombo("cmbShift");
        HdlCommonHelper.GenerateOperatorWarpingCombo("cmbOperator");
        HdlCommonHelper.GenerateCaptainWarpingCombo("cmbCaptain");
        WarpingProdDetailsHelper.GenerateWarpingSetNoCombo("cmbSetNo");
        WarpingProdDetailsHelper.GenerateWarpingItemCombo("cmbItem");
        WarpingProdDetailsHelper.GenerateLotCombo("cmbYarnLot", 0);

        $("#btnAddNew").click(function () {
            WarpingProdDetailsHelper.ClearFullForm();
            //$("#divWarpingProdDetailsPartial").show();
            $("#divWarpProdDetails").show();
            $("#divWarpProdSummary").hide();
        });

        $("#btnClose").click(function () {
            $("#divWarpProdDetails").hide();
            $("#divWarpProdSummary").show();
        });

        $("#btnClear").click(function () {
            WarpingProdDetailsHelper.ClearFullForm();
        });
        $("#btnAddToList").click(function () {
            WarpingProdDetailsHelper.AddToList();
        });
        $("#btnUpdateWarpDetails").click(function () {
            WarpingProdDetailsHelper.UpdateWarpProdDetailsGrid();
        });

        $("#cmbSetNo").change(function () {
            var setNo = $("#cmbSetNo").data("kendoComboBox").value();
            WarpingProdDetailsHelper.GetInfoBySetNo(setNo);
            WarpingProdDetailsHelper.GetWarpingItem(setNo);
        });
        $("#cmbItem").change(function () {
            WarpingProdDetailsHelper.FillWarpPlanningItemInfo();
        });

        $("#cmbShift").change(function () {
            var shiftObj = $("#cmbShift").data("kendoComboBox").dataItem();
            $("#hdnShiftTime").val(shiftObj.ShiftTime);
        });
        $("#cmbOperator").change(function () {
            var dataitem = $("#cmbOperator").data("kendoComboBox").dataItem();
            $("#cmbCaptain").data("kendoComboBox").value(dataitem.PoName);
        });
        $("#btnSave").click(function () {
            WarpingProdDetailsManager.SaveWarpingProdInfo();
        });

        $("#btnNewDetails").click(function () {
            $("#btnAddToList").show();
            $("#btnUpdateWarpDetails").hide();
            $("#btnNewDetails").hide();
            $("#txtBeamNo").prop('disabled', false);
        });
        WarpingProdDetailsHelper.ChangeEvent();
    },
    GenerateDatePicker: function () {
        $("#txtProgDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()

        });
        $("#txtWarpDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });

    },
    GenerateWarpingSetNoCombo: function (identity) {
        var objWpSet = WarpingProdDetailsManager.GetWarpingSetNo();
        var obj = new Object();
        obj.SetNo1 = "---Select---";
        obj.SetNo = 0;
        objWpSet.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "SetNo1",
            dataValueField: "SetNo",
            dataSource: objWpSet,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GetInfoBySetNo: function (setNo) {
        var obj = WarpingProdDetailsManager.GetInfoBySetNo(setNo);
        $("#txtSetLength").val(obj.SetLength);
        $("#txtYarnCode").val(obj.YarnCounts);
        $("#txtWarpRatio").val(obj.WarpRatio);
        $("#txtEndsPerBeam").val(obj.EndsPerBeam);
        $("#cmbUnit").data("kendoComboBox").value(obj.UnitCode);
        $("#txtNoOfBeam").val(obj.NoOfBeem);
        $("#txtNoOfCreal").val(obj.NoOfCreel);
        $("#txtTotalEnds").val(obj.TotalEnds);
        $("#txtMcSpeed").val(obj.MSpeed);
        $("#txtYarnTension").val(obj.YarnTension);
        $("#txtProcForce").val(obj.ProcessingForce);
        $("#txtProYarnLot").val(obj.ProYarnLot);
        $("#txtProYarnSupp").val(obj.ProYarnSupp);
        $("#cmbStyleNo").data("kendoComboBox").value(obj.StyleCode);
        $("#txtCustName").val(obj.CustomerName);
        $("#hdnCustCode").val(obj.CustCode);
        $("#txtConstruction").val(obj.Construction);
        $("#txtProdType").val(obj.ProdType);
        $("#hdnProdTypeId").val(obj.ProdTypeId);
    },
    GetWarpingItem: function (setNo) {
      
        var objWpItm = WarpingProdDetailsManager.GetWarpingItemBySetNo(setNo);
        var itemcombo = $("#cmbItem").data("kendoComboBox");
        itemcombo.value("");
        itemcombo.text("");
        var obj = new Object();
        obj.ICName = "---Select---";
        obj.ICNo = 0;
        objWpItm.unshift(obj);
        itemcombo.setDataSource(objWpItm);

    },
    GenerateWarpingItemCombo: function (identity) {
        var setNo = $("#cmbSetNo").data("kendoComboBox").value();
        var objWpItm = WarpingProdDetailsManager.GetWarpingItemBySetNo(setNo);
        var obj = new Object();
        obj.ICName = "---Select---";
        obj.ICNo = 0;
        objWpItm.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "ICName",
            dataValueField: "ICNo",
            dataSource: objWpItm,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    FillWarpPlanningItemInfo: function () {
        var setNo = $("#cmbSetNo").data("kendoComboBox").value();
        var icNo = $("#cmbItem").data("kendoComboBox").value();
        if (setNo !== "0" && icNo !== "0") {
            var obj = WarpingProdDetailsManager.GetItemBySetNoAndItem(setNo, icNo);
            var supcombo = $("#cmbSupplier").data("kendoComboBox");
            supcombo.value(obj.SCode);

            var yarncombo = $("#cmbYarn").data("kendoComboBox");
            yarncombo.value(obj.YCode);

            $("#txtBeamNo").val(obj.NoOfBeem);
            $("#txtRate").data("kendoNumericTextBox").value(obj.Rate);
            $("#txtEndsPerBeam1").data("kendoNumericTextBox").value(obj.EndsPerBeem);
            $("#txtBeamNo").val(obj.NoOfBeem);
            $("#txtBeemLength").val(obj.SetLength);
            $("#hdnICount").val(obj.ICount);
            $("#hdnItemUnit").val(obj.Unit);
            $("#hdnStdBrKg").val(obj.StdBrkg);
        }

        var icode = $("#cmbItem").data("kendoComboBox").value();
        var lotcombo = $("#cmbYarnLot").data("kendoComboBox");
        var data = WarpingProdDetailsManager.GetLotNoByIName(icode);
        lotcombo.value("");
        lotcombo.text("");
        lotcombo.setDataSource(data);
        lotcombo.list.width(400);

    },
    GenerateLotCombo: function (identity, iName) {
        var objOType = WarpingProdDetailsManager.GetLotNoByIName(iName);
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
    GenerateNumericTextBox: function () {
        HdlCommonHelper.GenerateNumericTextBox("txtRate");
        HdlCommonHelper.GenerateNumericTextBox("txtIntake");
        HdlCommonHelper.GenerateNumericTextBox("txtReminent");
        HdlCommonHelper.GenerateNumericTextBox("txtRecone");
        HdlCommonHelper.GenerateNumericTextBox("txtWastage");
        HdlCommonHelper.GenerateNumericTextBox("txtProdQty");
        HdlCommonHelper.GenerateNumericTextBox("txtEndsPerBeam1");
        HdlCommonHelper.GenerateNumericTextBox("txtWeakPoint");
        HdlCommonHelper.GenerateNumericTextBox("txtSnarl");
        HdlCommonHelper.GenerateNumericTextBox("txtDoubyleYarn");
        HdlCommonHelper.GenerateNumericTextBox("txtDueToMachine");
        HdlCommonHelper.GenerateNumericTextBox("txtDueToCone");
        HdlCommonHelper.GenerateNumericTextBox("txtBadWind");
        HdlCommonHelper.GenerateNumericTextBox("txtTotalYarnBrkg");
        HdlCommonHelper.GenerateNumericTextBox("txtTermination");
        HdlCommonHelper.GenerateNumericTextBox("txtTotalBreak");
        HdlCommonHelper.GenerateNumericTextBox("txtBreakPoint");
        HdlCommonHelper.GenerateNumericTextBox("txtMpm1");
        HdlCommonHelper.GenerateNumericTextBox("txtRunTime");

    },
    AddToList: function () {
        var validator = $("#divWarpingProdDetailsPartial").kendoValidator().data("kendoValidator"),
          status = $(".status");
        if (validator.validate()) {
            var warpingProdDetailsGrid = $("#grdWarpingProdDetailsSummary").data("kendoGrid");
            var beemNo = $("#txtBeamNo").val();
            if (beemNo !== "0") {
                var gridData = warpingProdDetailsGrid.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var itm = gridData[i];
                    if (parseInt(itm.FlangeNo) === parseInt(beemNo)) {
                        AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'This Beem Already added!',
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
            }

            var objWarp = new Object();
            objWarp.WarpDate = $("#txtWarpDate").data("kendoDatePicker").value();
            objWarp.FlangeNo = $("#txtBeamNo").val();
            objWarp.FlangeLength = $("#txtBeemLength").val();
            objWarp.WeakPoint = $("#txtWeakPoint").data("kendoNumericTextBox").value();
            objWarp.Spiler = "";
            objWarp.Snarl = $("#txtSnarl").data("kendoNumericTextBox").value();
            objWarp.DoubleYarn = $("#txtDoubyleYarn").data("kendoNumericTextBox").value();
            objWarp.DueToMachine = $("#txtDueToMachine").data("kendoNumericTextBox").value();
            objWarp.DueToCone = $("#txtDueToCone").data("kendoNumericTextBox").value();
            objWarp.BadWdg = $("#txtBadWind").data("kendoNumericTextBox").value();
            objWarp.TotalYarnBkg = $("#txtTotalYarnBrkg").data("kendoNumericTextBox").value();
            objWarp.Termination = $("#txtTermination").data("kendoNumericTextBox").value();
            objWarp.Total = $("#txtTotalBreak").data("kendoNumericTextBox").value();
            objWarp.OperatorCardNo = $("#cmbOperator").data("kendoComboBox").value();
            objWarp.OperatorName = $("#cmbOperator").data("kendoComboBox").text();
            objWarp.ShiftCode = $("#cmbShift").data("kendoComboBox").value();
            objWarp.ShiftName = $("#cmbShift").data("kendoComboBox").text();
            objWarp.RemnantPerCreel = $("#hdnRemnantPerCreel").val();
            objWarp.WastagePCreel = $("#hdnWastagePerCreel").val();
            objWarp.ShiftTime = $("#hdnShiftTime").val();
            objWarp.Designation = "";
            objWarp.YarnCode = $("#cmbYarn").data("kendoComboBox").value();
            objWarp.YarnName = $("#cmbYarn").data("kendoComboBox").text();
            objWarp.YarnLot = $("#cmbYarnLot").data("kendoComboBox").value();
            objWarp.ICode = $("#cmbItem").data("kendoComboBox").value();
            objWarp.IName = $("#cmbItem").data("kendoComboBox").text();
            objWarp.SCode = $("#cmbSupplier").data("kendoComboBox").value();
            objWarp.SName = $("#cmbSupplier").data("kendoComboBox").text();
            objWarp.ICount = $("#hdnICount").val();
            objWarp.Unit = $("#hdnItemUnit").val();
            objWarp.EndsBeam = $("#txtEndsPerBeam1").data("kendoNumericTextBox").value();
            objWarp.BreakagePoint = $("#txtBreakPoint").data("kendoNumericTextBox").value();
            objWarp.MSpeed = $("#txtMpm1").data("kendoNumericTextBox").value();
            objWarp.MEffi = $("#hdnMcEffi").val();
            objWarp.Intake = $("#txtIntake").data("kendoNumericTextBox").value();
            objWarp.Reminent = $("#txtReminent").data("kendoNumericTextBox").value();
            objWarp.Recone = $("#txtRecone").data("kendoNumericTextBox").value();
            objWarp.Weastage = $("#txtWastage").data("kendoNumericTextBox").value();
            objWarp.IQnty = $("#txtProdQty").data("kendoNumericTextBox").value();
            objWarp.Rate = $("#txtRate").data("kendoNumericTextBox").value();
            var beemKg = $("#hdnBeemKg").val() === "" ? "0" : $("#hdnBeemKg").val();
            objWarp.BeamValue = parseFloat(beemKg) * parseFloat(objWarp.Rate);
            objWarp.WastageValue = $("#hdnWastagePerCreel").val() * parseFloat(objWarp.Rate);
            objWarp.StdBrkg = $("#hdnStdBrKg").val();
            objWarp.BRunTime = $("#txtRunTime").data("kendoNumericTextBox").value();
            objWarp.CapCode = $("#cmbCaptain").data("kendoComboBox").value();
            objWarp.CapName = $("#cmbCaptain").data("kendoComboBox").text();
            objWarp.Lapper = "";
            gbWarpingProductionData.push(objWarp);
            var gridDataSource = new kendo.data.DataSource({ data: gbWarpingProductionData });
            warpingProdDetailsGrid.setDataSource(gridDataSource);
        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Please Input Required all Fields!',
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
    UpdateWarpProdDetailsGrid: function () {
        var warpingProdDetailsGrid = $("#grdWarpingProdDetailsSummary").data("kendoGrid");
        var selectedItem = warpingProdDetailsGrid.dataItem(warpingProdDetailsGrid.select());
        for (var i = 0; i < gbWarpingProductionData.length; i++) {
            if (gbWarpingProductionData[i].FlangeNo === selectedItem.FlangeNo) {
                gbWarpingProductionData.splice(i, 1);
                break;
            }
        }
        var yarncombo = $("#cmbYarn").data("kendoComboBox");
        var objWarp = new Object();
        objWarp.WarpDate = $("#txtWarpDate").data("kendoDatePicker").value();
        objWarp.FlangeNo = $("#txtBeamNo").val();
        objWarp.FlangeLength = $("#txtBeemLength").val();
        objWarp.WeakPoint = $("#txtWeakPoint").data("kendoNumericTextBox").value();
        objWarp.Spiler = "";
        objWarp.Snarl = $("#txtSnarl").data("kendoNumericTextBox").value();
        objWarp.DoubleYarn = $("#txtDoubyleYarn").data("kendoNumericTextBox").value();
        objWarp.DueToMachine = $("#txtDueToMachine").data("kendoNumericTextBox").value();
        objWarp.DueToCone = $("#txtDueToCone").data("kendoNumericTextBox").value();
        objWarp.BadWdg = $("#txtBadWind").data("kendoNumericTextBox").value();
        objWarp.TotalYarnBkg = $("#txtTotalYarnBrkg").data("kendoNumericTextBox").value();
        objWarp.Termination = $("#txtTermination").data("kendoNumericTextBox").value();
        objWarp.Total = $("#txtTotalBreak").data("kendoNumericTextBox").value();
        objWarp.OperatorCardNo = $("#cmbOperator").data("kendoComboBox").value();
        objWarp.OperatorName = $("#cmbOperator").data("kendoComboBox").text();
        objWarp.ShiftCode = $("#cmbShift").data("kendoComboBox").value();
        objWarp.ShiftName = $("#cmbShift").data("kendoComboBox").text();
        objWarp.RemnantPerCreel = $("#hdnRemnantPerCreel").val();
        objWarp.WastagePCreel = $("#hdnWastagePerCreel").val();
        objWarp.ShiftTime = $("#hdnShiftTime").val();
        objWarp.Designation = "";
        objWarp.YarnCode = yarncombo.value();
        objWarp.YarnName = yarncombo.text();
        objWarp.YarnLot = $("#cmbYarnLot").data("kendoComboBox").value();
        objWarp.ICode = $("#cmbItem").data("kendoComboBox").value();
        objWarp.IName = $("#cmbItem").data("kendoComboBox").text();
        objWarp.SCode = $("#cmbSupplier").data("kendoComboBox").value();
        objWarp.SName = $("#cmbSupplier").data("kendoComboBox").text();
        objWarp.ICount = $("#hdnICount").val();
        objWarp.Unit = $("#hdnItemUnit").val();
        objWarp.EndsBeam = $("#txtEndsPerBeam1").data("kendoNumericTextBox").value();
        objWarp.BreakagePoint = $("#txtBreakPoint").data("kendoNumericTextBox").value();
        objWarp.MSpeed = $("#txtMpm1").data("kendoNumericTextBox").value();
        objWarp.MEffi = $("#hdnMcEffi").val();
        objWarp.Intake = $("#txtIntake").data("kendoNumericTextBox").value();
        objWarp.Reminent = $("#txtReminent").data("kendoNumericTextBox").value();
        objWarp.Recone = $("#txtRecone").data("kendoNumericTextBox").value();
        objWarp.Weastage = $("#txtWastage").data("kendoNumericTextBox").value();
        objWarp.IQnty = $("#txtProdQty").data("kendoNumericTextBox").value();
        objWarp.Rate = $("#txtRate").data("kendoNumericTextBox").value();
        var beemKg = $("#hdnBeemKg").val() === "" ? "0" : $("#hdnBeemKg").val();
        objWarp.BeamValue = parseFloat(beemKg) * parseFloat(objWarp.Rate);
        objWarp.WastageValue = parseFloat($("#hdnWastagePerCreel").val() === "" ? "0" : $("#hdnWastagePerCreel").val()) * parseFloat(objWarp.Rate);
        objWarp.StdBrkg = $("#hdnStdBrKg").val();
        objWarp.BRunTime = $("#txtRunTime").data("kendoNumericTextBox").value();
        objWarp.CapCode = $("#cmbCaptain").data("kendoComboBox").value();
        objWarp.CapName = $("#cmbCaptain").data("kendoComboBox").text();
        objWarp.Lapper = "";

        selectedItem.set("WarpDate", objWarp.WarpDate);
        selectedItem.set("FlangeNo", objWarp.FlangeNo);
        selectedItem.set("FlangeLength", objWarp.FlangeLength);
        selectedItem.set("WeakPoint", objWarp.WeakPoint);
        selectedItem.set("Spiler", objWarp.Spiler);
        selectedItem.set("Snarl", objWarp.Snarl);
        selectedItem.set("DoubleYarn", objWarp.DoubleYarn);
        selectedItem.set("DueToMachine", objWarp.DueToMachine);
        selectedItem.set("DueToCone", objWarp.DueToCone);
        selectedItem.set("BadWdg", objWarp.BadWdg);
        selectedItem.set("TotalYarnBkg", objWarp.TotalYarnBkg);
        selectedItem.set("Termination", objWarp.Termination);
        selectedItem.set("Total", objWarp.Total);
        selectedItem.set("OperatorCardNo", objWarp.OperatorCardNo);
        selectedItem.set("OperatorName", objWarp.OperatorName);
        selectedItem.set("ShiftCode", objWarp.ShiftCode);
        selectedItem.set("ShiftName", objWarp.ShiftName);
        selectedItem.set("RemnantPerCreel", objWarp.RemnantPerCreel);
        selectedItem.set("WastagePCreel", objWarp.WastagePCreel);
        selectedItem.set("ShiftTime", objWarp.ShiftTime);
        selectedItem.set("Designation", objWarp.Designation);
        selectedItem.set("YarnCode", objWarp.YarnCode);
        selectedItem.set("YarnName", objWarp.YarnName);
        selectedItem.set("YarnLot", objWarp.YarnLot);
        selectedItem.set("ICode", objWarp.ICode);
        selectedItem.set("IName", objWarp.IName);
        selectedItem.set("SCode", objWarp.SCode);
        selectedItem.set("SName", objWarp.SName);
        selectedItem.set("ICount", objWarp.ICount);
        selectedItem.set("Unit", objWarp.Unit);
        selectedItem.set("EndsBeam", objWarp.EndsBeam);
        selectedItem.set("BreakagePoint", objWarp.BreakagePoint);
        selectedItem.set("MSpeed", objWarp.MSpeed);
        selectedItem.set("MEffi", objWarp.MEffi);
        selectedItem.set("Intake", objWarp.Intake);
        selectedItem.set("Reminent", objWarp.Reminent);
        selectedItem.set("Recone", objWarp.Recone);
        selectedItem.set("Weastage", objWarp.Weastage);
        selectedItem.set("IQnty", objWarp.IQnty);
        selectedItem.set("Rate", objWarp.Rate);
        selectedItem.set("BeamValue", objWarp.BeamValue);
        selectedItem.set("WastageValue", objWarp.WastageValue);
        selectedItem.set("StdBrkg", objWarp.StdBrkg);
        selectedItem.set("BRunTime", objWarp.BRunTime);
        selectedItem.set("CapCode", objWarp.CapCode);
        selectedItem.set("CapName", objWarp.CapName);
        selectedItem.set("Lapper", objWarp.Lapper);

    },
    FillWarpingDetails: function (objWarp) {
        //fill for update details info
        $("#btnAddToList").hide();
        $("#btnNewDetails").show();
        $("#btnUpdateWarpDetails").show();
        $("#txtBeamNo").attr("disabled", "disabled");

        $("#txtWarpDate").data("kendoDatePicker").value(objWarp.WarpDate);
        $("#txtBeamNo").val(objWarp.FlangeNo);
        $("#txtBeemLength").val(objWarp.FlangeLength);
        $("#txtWeakPoint").data("kendoNumericTextBox").value(objWarp.WeakPoint);
        $("#txtSnarl").data("kendoNumericTextBox").value(objWarp.Snarl);
        $("#txtDoubyleYarn").data("kendoNumericTextBox").value(objWarp.DoubleYarn);
        $("#txtDueToMachine").data("kendoNumericTextBox").value(objWarp.DueToMachine);
        $("#txtDueToCone").data("kendoNumericTextBox").value(objWarp.DueToCone);
        $("#txtBadWind").data("kendoNumericTextBox").value(objWarp.BadWdg);
        $("#txtTotalYarnBrkg").data("kendoNumericTextBox").value(objWarp.TotalYarnBkg);
        $("#txtTermination").data("kendoNumericTextBox").value(objWarp.Termination);
        $("#txtTotalBreak").data("kendoNumericTextBox").value(objWarp.Total);
        $("#cmbOperator").data("kendoComboBox").value(objWarp.OperatorCardNo);
        $("#cmbShift").data("kendoComboBox").value(objWarp.ShiftCode);
        $("#hdnRemnantPerCreel").val(objWarp.RemnantPerCreel);
        $("#hdnWastagePerCreel").val(objWarp.WastagePCreel);
        $("#hdnShiftTime").val(objWarp.ShiftTime);
        $("#cmbYarn").data("kendoComboBox").value(objWarp.YarnCode);
        $("#cmbYarnLot").data("kendoComboBox").value(objWarp.YarnLot);
        $("#cmbItem").data("kendoComboBox").value(objWarp.ICode);
        $("#cmbSupplier").data("kendoComboBox").value(objWarp.SCode);
        $("#hdnICount").val(objWarp.ICount);
        $("#hdnItemUnit").val(objWarp.Unit);
        $("#txtEndsPerBeam1").data("kendoNumericTextBox").value(objWarp.EndsBeam);
        $("#txtBreakPoint").data("kendoNumericTextBox").value(objWarp.BreakagePoint);
        $("#txtMpm1").data("kendoNumericTextBox").value(objWarp.MSpeed);
        $("#hdnMcEffi").val(objWarp.MEffi);
        $("#txtIntake").data("kendoNumericTextBox").value(objWarp.Intake);
        $("#txtReminent").data("kendoNumericTextBox").value(objWarp.Reminent);
        $("#txtRecone").data("kendoNumericTextBox").value(objWarp.Recone);
        $("#txtWastage").data("kendoNumericTextBox").value(objWarp.Weastage);
        $("#txtProdQty").data("kendoNumericTextBox").value(objWarp.IQnty);
        $("#txtRate").data("kendoNumericTextBox").value(objWarp.Rate);
        $("#hdnBeemKg").val(objWarp.BeemKg);
        $("#hdnWastagePerCreel").val(objWarp.WastageValue);
        $("#hdnStdBrKg").val(objWarp.StdBrkg);
        $("#txtRunTime").data("kendoNumericTextBox").value(objWarp.BRunTime);
        $("#cmbCaptain").data("kendoComboBox").value(objWarp.CapCode);
    },
    FillWarpingMasterInformation: function (obj) {
        $("#hdnIdNo").val(obj.IdNo);
        $("#txtProgDate").data("kendoDatePicker").value(obj.PWarpDate);
        $("#txtSetLength").val(obj.WarpLength);
        $("#txtRemarks").val(obj.Remarks);
        $("#cmbSetNo").data("kendoComboBox").value(obj.SetNo);
        $("#txtEndsPerBeam").val(obj.EndsPerBeam);
        $("#txtTotalBeam").val(obj.TotalBeam);
        $("#txtNoOfBeam").val(obj.NoOfBeam);
        $("#txtTotalCreal").val(obj.TotalCreal);
        $("#txtNoOfCreal").val(obj.NoOfCreal);
        $("#txtTotalEnds").val(obj.TotalEnds);
        $("#txtMcSpeed").val(obj.MSpeed);
        $("#txtYarnTension").val(obj.YarnTension);
        $("#txtProcForce").val(obj.ProcessingForce);
        // obj.Code = "";
        //obj.LengthMtr = "";
        // obj.DeptCode = "1";//Warping
        $("#txtWarpRatio").val(obj.WarpRatio);
        $("#txtProYarnLot").val(obj.ProYarnLot);
        $("#txtProYarnSupp").val(obj.ProYarnSupp);
        $("#cmbStyleNo").data("kendoComboBox").value(obj.StyleCode);
        $("#txtConstruction").val(obj.Construction);
        // obj.Width = "";
        // obj.PTCode = "1"; //Prod type =Production;
        $("#hdnCustCode").val(obj.CustCode);
        $("#cmbMachineNo").data("kendoComboBox").value(obj.MCCode);
        $("#cmbUnit").data("kendoComboBox").value(obj.UCode);
        $("#txtYarnCode").val(obj.YarnCounts);

        WarpingProdDetailsHelper.GetWarpingItem(obj.SetNo);
    },
    FillAllGrid: function (idNo) {

        var data = WarpingProdDetailsManager.GetAllGridData(idNo);
        gbWarpingProductionData = [];
        var warpProddetailsGrid = $("#grdWarpingProdDetailsSummary").data("kendoGrid");
        gbWarpingProductionData = data;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbWarpingProductionData });
        warpProddetailsGrid.setDataSource(gridDataSource1);


    },
    ChangeEvent: function () {
        $("#txtBeemLength").change(function () {
            WarpingProdDetailsHelper.CalculateMachineEffi();
            WarpingProdDetailsHelper.CalculateBeemKg();
        });
        $("#txtMpm1").change(function () {
            WarpingProdDetailsHelper.CalculateMachineEffi();
        });
        $("#txtEndsPerBeam1").change(function () {
            WarpingProdDetailsHelper.CalculateBeemKg();
        });
        $("#txtWeakPoint").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });
        $("#txtSnarl").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });
        $("#txtDoubyleYarn").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });
        $("#txtDueToMachine").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });
        $("#txtDueToCone").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });
        $("#txtBadWind").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });
        $("#txtTermination").change(function () {
            WarpingProdDetailsHelper.CalculateTotalYarnBreakage();
        });

    },
    CalculateMachineEffi: function () {
        var flengLgth = $("#txtBeemLength").val();
        var shiftTime = $("#hdnShiftTime").val();
        var mpm1 = $("#txtMpm1").data("kendoNumericTextBox").value() === null ? "0" : $("#txtMpm1").data("kendoNumericTextBox").value();

        var mcEff1 = flengLgth * 100;
        var mcEff2 = shiftTime * mpm1 * 60;
        var mcEff3 = mcEff1 / mcEff2;
        $("#hdnMcEffi").val(mcEff3);
    },
    CalculateBeemKg: function () {
        var flengLgth = $("#txtBeemLength").val() === "" ? "0" : $("#txtBeemLength").val();
        var endsBeem = $("#txtEndsPerBeam1").data("kendoNumericTextBox").value() === "" ? "0" : $("#txtEndsPerBeam1").data("kendoNumericTextBox").value();
        var icount = $("#hdnICount").val() === "" ? "0" : $("#hdnICount").val();
        var kg1 = flengLgth * endsBeem;
        var kg2 = kg1 / icount;
        var kg3 = kg2 / 1.6933;
        var kg5 = kg3 / 1000;
        //  var kg4 = (kg5 / 100) * 2 + kg5;
        $("#hdnBeemKg").val(kg5);
    },
    CalculateBreakagePoint: function () {
        var flengLgth = $("#txtBeemLength").val() === "" ? "0" : $("#txtBeemLength").val();
        var total = $("#txtTotalBreak").data("kendoNumericTextBox").value() === null ? "0" : $("#txtTotalBreak").data("kendoNumericTextBox").value();
        var endsBeem = $("#txtEndsPerBeam1").data("kendoNumericTextBox").value() === null ? "0" : $("#txtEndsPerBeam1").data("kendoNumericTextBox").value();
        var brkg1 = total / endsBeem;
        var brkg2 = brkg1 / flengLgth;
        var brkg3 = brkg2 / 1000000;
        $("#txtBreakPoint").data("kendoNumericTextBox").value(brkg3);
    },
    CalculateTotalYarnBreakage: function () {

        var weakPoint = $("#txtWeakPoint").data("kendoNumericTextBox").value() === null ? "0" : $("#txtWeakPoint").data("kendoNumericTextBox").value();
        var spiler = $("#hdnSpiler").val();
        var snarl = $("#txtSnarl").data("kendoNumericTextBox").value() === null ? "0" : $("#txtSnarl").data("kendoNumericTextBox").value();
        var doubleYarn = $("#txtDoubyleYarn").data("kendoNumericTextBox").value() === null ? "0" : $("#txtDoubyleYarn").data("kendoNumericTextBox").value();
        var dueToMcn = $("#txtDueToMachine").data("kendoNumericTextBox").value() === null ? "0" : $("#txtDueToMachine").data("kendoNumericTextBox").value();
        var dueToCone = $("#txtDueToCone").data("kendoNumericTextBox").value() === null ? "0" : $("#txtDueToCone").data("kendoNumericTextBox").value();
        var badWdg = $("#txtBadWind").data("kendoNumericTextBox").value() === null ? "0" : $("#txtBadWind").data("kendoNumericTextBox").value();
        var totalYarnBrkg1 = parseFloat(weakPoint) + parseFloat(spiler) + parseFloat(snarl) + parseFloat(doubleYarn) + parseFloat(dueToMcn) + parseFloat(dueToCone) + parseFloat(badWdg);
        $("#txtTotalYarnBrkg").data("kendoNumericTextBox").value(totalYarnBrkg1);
        var termination1 = $("#txtTermination").data("kendoNumericTextBox").value() === null ? "0" : $("#txtTermination").data("kendoNumericTextBox").value();
        $("#txtTotalBreak").data("kendoNumericTextBox").value(parseFloat(termination1) + parseFloat(totalYarnBrkg1));


    },
    CreateWarpingProdObject: function () {
        var obj = new Object();
        obj.IdNo = $("#hdnIdNo").val();
        obj.PWarpDate =kendo.toString($("#txtProgDate").data("kendoDatePicker").value(),"yyyy-MM-dd");
        obj.WarpLength = $("#txtSetLength").val();
        obj.Remarks = $("#txtRemarks").val();
        obj.SetNo = $("#cmbSetNo").data("kendoComboBox").value();
        obj.EndsPerBeam = $("#txtEndsPerBeam").val();
        obj.TotalBeam = $("#txtTotalBeam").val();
        obj.NoOfBeam = $("#txtNoOfBeam").val();
        obj.TotalCreal = $("#txtTotalCreal").val();
        obj.NoOfCreal = $("#txtNoOfCreal").val();
        obj.TotalEnds = $("#txtTotalEnds").val();
        obj.MSpeed = $("#txtMcSpeed").val();
        obj.YarnTension = $("#txtYarnTension").val();
        obj.ProcessingForce = $("#txtProcForce").val();
        obj.Code = "";
        obj.LengthMtr = "";
        obj.DeptCode = "1";//Warping
        obj.WarpRatio = $("#txtWarpRatio").val();
        obj.ProYarnLot = $("#txtProYarnLot").val();
        obj.ProYarnSupp = $("#txtProYarnSupp").val();
        obj.StyleNo = $("#cmbStyleNo").data("kendoComboBox").text();
        obj.StyleCode = $("#cmbStyleNo").data("kendoComboBox").value();
        obj.Construction = $("#txtConstruction").val();
        obj.Width = "";
        obj.PTCode = "1"; //Prod type =Production;
        obj.CustCode = $("#hdnCustCode").val();
        obj.MCNo = $("#cmbMachineNo").data("kendoComboBox").text();
        obj.MCCode = $("#cmbMachineNo").data("kendoComboBox").value();
        obj.UCode = $("#cmbUnit").data("kendoComboBox").value();
        obj.YarnCounts = $("#txtYarnCode").val();
        return obj;
    },
    GetWarpingProdDetailsGridList: function () {
        var gridData = $("#grdWarpingProdDetailsSummary").data("kendoGrid").dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].WarpDate = kendo.toString(gridData[i].WarpDate, "yyyy-MM-dd");
        }
        return gridData;
    },
    ClearFullForm:function() {
        $("#hdnIdNo").val("0");
        $("#txtProgDate").data("kendoDatePicker").value(new Date());
        $("#txtSetLength").val("");
        $("#txtRemarks").val("");
        $("#cmbSetNo").data("kendoComboBox").value("");
        $("#txtEndsPerBeam").val("");
        $("#txtTotalBeam").val("");
        $("#txtNoOfBeam").val("");
        $("#txtTotalCreal").val("");
        $("#txtNoOfCreal").val("");
        $("#txtTotalEnds").val("");
        $("#txtMcSpeed").val("");
        $("#txtYarnTension").val("");
        $("#txtProcForce").val("");
        $("#txtWarpRatio").val("");
        $("#txtProYarnLot").val("");
        $("#txtProYarnSupp").val("");
        $("#cmbStyleNo").data("kendoComboBox").value("");
        $("#txtConstruction").val("");
        $("#hdnCustCode").val("");
        $("#cmbMachineNo").data("kendoComboBox").value("");
        $("#cmbUnit").data("kendoComboBox").value("");
        $("#txtYarnCode").val("");

        gbWarpingProductionData = [];
        $("#grdWarpingProdDetailsSummary").data('kendoGrid').dataSource.data([]);

        $("#divWarpProdDetails > form").kendoValidator();
        $("#divWarpProdDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");

        $("#divWarpingProdDetailsPartial > form").kendoValidator();
        $("#divWarpingProdDetailsPartial").find("span.k-tooltip-validation").hide();
        var status1 = $(".status");
        status1.text("").removeClass("invalid");

        WarpingProdDetailsHelper.ClearDeailsPart();
    },
    ClearDeailsPart:function() {
        $("#txtWarpDate").data("kendoDatePicker").value(new Date());
        $("#txtBeamNo").val("");
        $("#txtBeemLength").val("");
        $("#txtWeakPoint").data("kendoNumericTextBox").value("");
        $("#txtSnarl").data("kendoNumericTextBox").value("");
        $("#txtDoubyleYarn").data("kendoNumericTextBox").value("");
        $("#txtDueToMachine").data("kendoNumericTextBox").value("");
        $("#txtDueToCone").data("kendoNumericTextBox").value("");
        $("#txtBadWind").data("kendoNumericTextBox").value("");
        $("#txtTotalYarnBrkg").data("kendoNumericTextBox").value("");
        $("#txtTermination").data("kendoNumericTextBox").value("");
        $("#txtTotalBreak").data("kendoNumericTextBox").value("");
        $("#cmbOperator").data("kendoComboBox").value("");
        $("#cmbShift").data("kendoComboBox").value("");
        $("#hdnRemnantPerCreel").val("");
        $("#hdnWastagePerCreel").val("");
        $("#hdnShiftTime").val("");
        $("#cmbYarn").data("kendoComboBox").value("");
        $("#cmbYarnLot").data("kendoComboBox").value("");
        $("#cmbItem").data("kendoComboBox").value("");
        $("#cmbSupplier").data("kendoComboBox").value("");
        $("#hdnICount").val("");
        $("#hdnItemUnit").val("");
        $("#txtEndsPerBeam1").data("kendoNumericTextBox").value("");
        $("#txtBreakPoint").data("kendoNumericTextBox").value("");
        $("#txtMpm1").data("kendoNumericTextBox").value("");
        $("#hdnMcEffi").val("");
        $("#txtIntake").data("kendoNumericTextBox").value("");
        $("#txtReminent").data("kendoNumericTextBox").value("");
        $("#txtRecone").data("kendoNumericTextBox").value("");
        $("#txtWastage").data("kendoNumericTextBox").value("");
        $("#txtProdQty").data("kendoNumericTextBox").value("");
        $("#txtRate").data("kendoNumericTextBox").value("");
        $("#hdnBeemKg").val("");
        $("#hdnWastagePerCreel").val("");
        $("#hdnStdBrKg").val("");
        $("#txtRunTime").data("kendoNumericTextBox").value("");
        $("#cmbCaptain").data("kendoComboBox").value("");
    }
};