var PlanningInfoSaveManager = {
    SavePlanningInfo: function () {
        var validator = $("#divPlanningDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var planningObj;
        var msg = "";
        if (validator.validate()) {
            planningObj = PlanningInfoSaveHelper.CreatePlanningObject();
            var planDetailsObj = PlanningInfoSaveHelper.CreatePlanningDetailsObject();
            var warpobj = PlanningInfoSaveHelper.GetWarpingObject();
            var warpingList = PlanningInfoSaveHelper.GetWarpingGridList();
            var dyeobj = PlanningInfoSaveHelper.GetDyeingObject();
            var deyingList = PlanningInfoSaveHelper.GetDyeingGridList();
            var weavobj = PlanningInfoSaveHelper.GetWeavingObject();
            var weavingList = PlanningInfoSaveHelper.GetWeavingGridList();
            var objPlan = JSON.stringify(planningObj);
            var objPlanDetails = JSON.stringify(planDetailsObj);
            var objWarp = JSON.stringify(warpobj);
            var objDye = JSON.stringify(dyeobj);
            var objWeav = JSON.stringify(weavobj);
            var objWarpList = JSON.stringify(warpingList);
            var objDyeList = JSON.stringify(deyingList);
            var objWeavList = JSON.stringify(weavingList);
            var jsonParam = "objPlan:" + objPlan + ",objPlanDetails:" + objPlanDetails + ",objWarp:" + objWarp + ",objWarpList:" + objWarpList + ",objDye:" + objDye + ",objDyeList:" + objDyeList + ",objWeav:" + objWeav + ",objWeavList:" + objWeavList;
            var serviceUrl = "../PlanningInfo/SavePlanningInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            if (planningObj.PID === "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus === "Success") {
                AjaxManager.MsgBox("success", "center", "Success:", msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdPlanningInfoSummary").data("kendoGrid").dataSource.read();
                            $("#hdnPlanId").val(jsonData.PID);
                        }
                    }]);
            }
            else if (jsonData.SaveStatus === "Exists") {
                AjaxManager.MsgBox("warning", "center", "Warning:", "Set No already Exists!",
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
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
};

var PlanningInfoSaveHelper = {
    InitPlanningInfoSave: function () {
        $("#btnSavePlan").click(function () {
            PlanningInfoSaveManager.SavePlanningInfo();
        });

        $("#btnClear").click(function () {
            PlanningInfoSaveHelper.ClearAllPlanningDetailsForm();
        });
    },
    ClearPlanningDetailsForm: function () {
        $("#hdnPlanId").val("0");
        $("#txtSetNo").val("");
        $("#txtSetLength").val("");
        $("#txtPlanDate").data("kendoDatePicker").value(new Date());
        $("#txtPlWidth").val("");
        $("#txtPlShrink").val("");
        $("#cmbOrderNo").data("kendoComboBox").value("");

        $("#grdWarpingSummary").data("kendoGrid").dataSource.data([]);
        $("#grdDeyingSummary").data("kendoGrid").dataSource.data([]);
        $("#grdWeavingSummary").data("kendoGrid").dataSource.data([]);
        gbWarpGridData = [];
        gbDeyingGridData = [];
        gbWeavGridData = [];

        $("#divPlanningDetails > form").kendoValidator();
        $("#divPlanningDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    FillPlanningDetailsForm: function (obj) {
        $("#hdnPlanId").val(obj.PID);
        $("#txtPlanDate").data("kendoDatePicker").value(obj.PDate);
        $("#cmbUnit").data("kendoComboBox").value(obj.UnitCode);
        $("#cmbSetNo").data("kendoComboBox").value(obj.SetNo);
        $("#txtSetLength").data("kendoNumericTextBox").value(obj.SetLength);
        $("#cmbCustomer").data("kendoComboBox").value(obj.CustCode);
        $("#cmbMktPerson").data("kendoComboBox").value(obj.MerkUserId);
        $("#txtOrderQty").data("kendoNumericTextBox").value(obj.OQnty);
        $("#txtRate").val(obj.Rate);
        $("#txtPlShrink").data("kendoNumericTextBox").value(obj.PIShrink);
        $("#txtPlWidth").data("kendoNumericTextBox").value(obj.PIWidth);
        $("#txtSetPlaned").val(obj.SetPlaned);
        $("#txtReqOrderProd").data("kendoNumericTextBox").value(obj.TotalTargetLength);
        $("#txtTakenProd").data("kendoNumericTextBox").value(obj.TakenProd);
        $("#txtRemainingProd").data("kendoNumericTextBox").value(obj.RemainingProd);
        $("#txtRemarks").val(obj.Remarks);
        $("#cmbProdType").data("kendoComboBox").value(obj.ProdTypeId);
        $("#cmbOrderType").data("kendoComboBox").value(obj.OrderTypeId);
        $("#cmbOrderType").data("kendoComboBox").value(obj.OrderStatus);
        $("#cmbBuyer").data("kendoComboBox").value(obj.BuyerId);
        $("#cmbOrderNo").data("kendoComboBox").value(obj.OrderRef);
        $("#cmbStyleNo").data("kendoComboBox").value(obj.StyleCode);
        $("#txtSetLength").data("kendoNumericTextBox").value(obj.WpLength);
        $("#txtDyeLgt").data("kendoNumericTextBox").value(obj.DyLength);
        $("#txtWevLgt").data("kendoNumericTextBox").value(obj.WvLength);
        $("#txtFinLgt").data("kendoNumericTextBox").value(obj.FiLength);
        $("#txtInspLgt").data("kendoNumericTextBox").value(obj.InsLength);
        $("#txtRejLgt").data("kendoNumericTextBox").value(obj.Rej);
        $("#txtPrevDyeProd").data("kendoNumericTextBox").value(obj.DyeProd);
        $("#txtEndBuyer").val(obj.EndBuyer);
        $("#txtCSV").val(obj.CSV);
        $("#txtLklyDelDate").data("kendoDatePicker").value(obj.DeliDate);

        //----------------Quality info--------------------
        $("#txtStyleNo1").val(obj.StyleNo);
        $("#txtWeight").val(obj.Weight);
        $("#cmbFabricType").data("kendoComboBox").value(obj.TypeId);
        $("#txtGConstruction").val(obj.Construction);
        $("#txtFConstruction").val(obj.FConstruction);
        $("#txtWeaveQ").val(obj.Weave);
        $("#cmbColorQ").data("kendoComboBox").value(obj.ColorId);
        $("#txtFabricDesc").val(obj.FabricDesc);
        $("#txtFinRoute").val(obj.FinishingRoute);
        $("#txtWarpRatioQ").val(obj.WarpRatio);
        $("#txtWeftRatioQ").val(obj.WeftRatio);
        $("#txtTotalEndsQ").val(obj.TEnds);
        $("#txtShadeIndigoQ").val(obj.ShadeIndigo);
        $("#txtShadeBlackQ").val(obj.ShadeBlack);
        $("#txtYarnCode").val(obj.YarnCode);
        $("#txtSetStd").val(obj.SetStd);
        $("#txtWarpShrinkageQ").val(obj.WarpShrinkage);
        $("#txtWeftShrinkageQ").val(obj.WeftShrinkage);
        $("#txtWeightFinishQ").val(obj.WeightFinish);
        $("#txtWeightWashQ").val(obj.WeightWash);
        $("#txtSkewQ").val(obj.Skew);
        $("#txtMovementQ").val(obj.Movement);
        $("#txtStretchAbilityQ").val(obj.StretchAbblity);
        $("#txtFinishWidth").val(obj.FinishWidth);
        $("#txtFinLength").val(obj.FinishLength);
        $("#txtGreyWidth").val(obj.GreyWidth);
        $("#txtGreyWeight").val(obj.GreyWeight);
        $("#txtGreyEpi").val(obj.GreyEPI);
        $("#txtGreyPpi").val(obj.GreyPPI);
        $("#txtReedSpace").val(obj.ReedSpace);
        $("#txtReedCount").val(obj.ReedCount);
        $("#txtEndDent").val(obj.EndDent);
        //---------------warping--------------------------
        $("#txtWarpSetLgth").val(obj.SetLength);
        $("#txtConstructionW").val(obj.Construction);

        $("#txtTotalEndsW").val(obj.TotalEnds);
        $("#txtYarnTesionW").val(obj.YarnTension);
        $("#txtMcSpeedW").data("kendoNumericTextBox").value(obj.MSpeed);
        $("#txtPressingForce").data("kendoNumericTextBox").value(obj.ProcessingForce);
        $("#txtYarnCode").val(obj.YarnCounts);
        $("#txtWarpRatioW").val(obj.WarpRatioWp);
        $("#txtProYarnLot").val(obj.ProYarnLot);
        $("#txtProYarnSupp").val(obj.ProYarnSupp);

        //---------------dyeing--------------------------
        $("#txtSizeSetLgthDy").data("kendoNumericTextBox").value(obj.LengthMtr);
        $("#cmbColorDy").data("kendoComboBox").value(obj.ColorId);
        $("#txtBeemSpaceDy").data("kendoNumericTextBox").value(obj.BeamSpace);
        $("#txtBeemLengthDy").data("kendoNumericTextBox").value(obj.BeamLength);
        $("#txtRefStdDy").data("kendoNumericTextBox").value(obj.RefStd);
        //---------------Weaving--------------------------
        $("#txtWeftCountsWv").val(obj.YarnCountsWv);
        $("#txtProYarnLotWv").val(obj.ProYarnLotWv);
        $("#txtProYarnSuppWv").val(obj.ProYarnSuppWv);
        $("#txtWeftRatioWv").val(obj.WeaveRatio);
        $("#txtGreyWidthWv").val(obj.GreyWidthWv);
        $("#txtGreyLgthWv").val(obj.GreyLength);
        $("#cmbSelvedge").data("kendoComboBox").value(obj.Selvedge);
        $("#txtGreyPpiWv").val(obj.GreyPPIWv);
        $("#txtWeightWv").val(obj.Weigth);

    },
    ClearAllPlanningDetailsForm: function () {
        $("#hdnPlanId").val("0");
        $("#txtPlanDate").data("kendoDatePicker").value(new Date());
        $("#cmbUnit").data("kendoComboBox").value("");
        $("#cmbSetNo").data("kendoComboBox").value("");
        $("#txtSetLength").data("kendoNumericTextBox").value("");
        $("#cmbCustomer").data("kendoComboBox").value("");
        $("#cmbMktPerson").data("kendoComboBox").value("");
        $("#txtOrderQty").data("kendoNumericTextBox").value("");
        $("#txtRate").val("");
        $("#txtPlShrink").data("kendoNumericTextBox").value("");
        $("#txtPlWidth").data("kendoNumericTextBox").value("");
        $("#txtSetPlaned").val("");
        $("#txtReqOrderProd").data("kendoNumericTextBox").value("");
        $("#txtTakenProd").data("kendoNumericTextBox").value("");
        $("#txtRemainingProd").data("kendoNumericTextBox").value("");
        $("#txtRemarks").val("");
        $("#cmbProdType").data("kendoComboBox").value("");
        $("#cmbOrderType").data("kendoComboBox").value("");
        $("#cmbOrderType").data("kendoComboBox").value("");
        $("#cmbBuyer").data("kendoComboBox").value("");
        $("#cmbOrderNo").data("kendoComboBox").value("");
        $("#cmbStyleNo").data("kendoComboBox").value("");
        $("#txtSetLength").data("kendoNumericTextBox").value("");
        $("#txtDyeLgt").data("kendoNumericTextBox").value("");
        $("#txtWevLgt").data("kendoNumericTextBox").value("");
        $("#txtFinLgt").data("kendoNumericTextBox").value("");
        $("#txtInspLgt").data("kendoNumericTextBox").value("");
        $("#txtRejLgt").data("kendoNumericTextBox").value("");
        $("#txtPrevDyeProd").data("kendoNumericTextBox").value("");
        $("#txtEndBuyer").val("");
        $("#txtCSV").val("");
        $("#txtLklyDelDate").data("kendoDatePicker").value("");

        //----------------Quality info--------------------
        $("#txtStyleNo1").val("");
        $("#txtWeight").val("");
        $("#cmbFabricType").data("kendoComboBox").value("");
        $("#txtGConstruction").val("");
        $("#txtFConstruction").val("");
        $("#txtWeaveQ").val("");
        $("#cmbColorQ").data("kendoComboBox").value("");
        $("#txtFabricDesc").val("");
        $("#txtFinRoute").val("");
        $("#txtWarpRatioQ").val("");
        $("#txtWeftRatioQ").val("");
        $("#txtTotalEndsQ").val("");
        $("#txtShadeIndigoQ").val("");
        $("#txtShadeBlackQ").val("");
        $("#txtYarnCode").val("");
        $("#txtSetStd").val("");
        $("#txtWarpShrinkageQ").val("");
        $("#txtWeftShrinkageQ").val("");
        $("#txtWeightFinishQ").val("");
        $("#txtWeightWashQ").val("");
        $("#txtSkewQ").val("");
        $("#txtMovementQ").val("");
        $("#txtStretchAbilityQ").val("");
        $("#txtFinishWidth").val("");
        $("#txtFinLength").val("");
        $("#txtGreyWidth").val("");
        $("#txtGreyWeight").val("");
        $("#txtGreyEpi").val("");
        $("#txtGreyPpi").val("");
        $("#txtReedSpace").val("");
        $("#txtReedCount").val("");
        $("#txtEndDent").val("");
        //---------------warping--------------------------
        $("#txtWarpSetLgth").val("");
        $("#txtConstructionW").val("");

        $("#txtTotalEndsW").val("");
        $("#txtYarnTesionW").val("");
        $("#txtMcSpeedW").data("kendoNumericTextBox").value("");
        $("#txtPressingForce").data("kendoNumericTextBox").value("");
        $("#txtYarnCode").val("");
        $("#txtWarpRatioW").val("");
        $("#txtProYarnLot").val("");
        $("#txtProYarnSupp").val("");

        //---------------dyeing--------------------------
        $("#txtSizeSetLgthDy").data("kendoNumericTextBox").value("");
        $("#cmbColorDy").data("kendoComboBox").value("");
        $("#txtBeemSpaceDy").data("kendoNumericTextBox").value("");
        $("#txtBeemLengthDy").data("kendoNumericTextBox").value("");
        $("#txtRefStdDy").data("kendoNumericTextBox").value("");
        //---------------Weaving--------------------------
        $("#txtWeftCountsWv").val("");
        $("#txtProYarnLotWv").val("");
        $("#txtProYarnSuppWv").val("");
        $("#txtWeftRatioWv").val("");
        $("#txtGreyWidthWv").val("");
        $("#txtGreyLgthWv").val("");
        $("#cmbSelvedge").data("kendoComboBox").value("");
        $("#txtGreyPpiWv").val("");
        $("#txtWeightWv").val("");


        $("#grdWarpingSummary").data("kendoGrid").dataSource.data([]);
        $("#grdDeyingSummary").data("kendoGrid").dataSource.data([]);
        $("#grdWeavingSummary").data("kendoGrid").dataSource.data([]);
        gbWarpGridData = [];
        gbDeyingGridData = [];
        gbWeavGridData = [];

        $("#divPlanningDetails > form").kendoValidator();
        $("#divPlanningDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    FillAllGrid: function (obj) {
        var data = PlanningDetailsManager.GetAllGridData(obj.PID);
        var objwarping = data[0].WarpingInfo;
        var objdyeing = data[0].DyeingInfo;
        var objweaving = data[0].WeavingInfo;

        gbWarpGridData = [];
        gbDeyingGridData = [];
        gbWeavGridData = [];

        var warpinggrid = $("#grdWarpingSummary").data("kendoGrid");
        gbWarpGridData = objwarping;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbWarpGridData });
        warpinggrid.setDataSource(gridDataSource1);

        var dyeinggrid = $("#grdDeyingSummary").data("kendoGrid");
        gbDeyingGridData = objdyeing;
        var gridDataSource2 = new kendo.data.DataSource({ data: gbDeyingGridData });
        dyeinggrid.setDataSource(gridDataSource2);

        var weavinggrid = $("#grdWeavingSummary").data("kendoGrid");
        gbWeavGridData = objweaving;
        var gridDataSource3 = new kendo.data.DataSource({ data: gbWeavGridData });
        weavinggrid.setDataSource(gridDataSource3);
    },
    CreatePlanningObject: function () {
        var obj = new Object();
        obj.PID = $("#hdnPlanId").val();
        obj.PDate = $("#txtPlanDate").data("kendoDatePicker").value();
        obj.UnitCode = $("#cmbUnit").data("kendoComboBox").value();
        obj.SetNo = $("#cmbSetNo").val();
        obj.SetLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        obj.CustCode = $("#cmbCustomer").data("kendoComboBox").value();
        obj.MerkUserId = $("#cmbMktPerson").data("kendoComboBox").value();
        obj.OQnty = $("#txtOrderQty").data("kendoNumericTextBox").value();
        obj.Rate = $("#txtRate").val() === "" ? 0 : $("#txtRate").val();
        obj.Value = parseFloat(obj.OQnty) * parseFloat(obj.Rate);
        obj.PIShrink = $("#txtPlShrink").data("kendoNumericTextBox").value();
        obj.PIWidth = $("#txtPlWidth").data("kendoNumericTextBox").value();
        obj.SetPlaned = $("#txtSetPlaned").val();
        obj.TotalTargetLength = $("#txtReqOrderProd").data("kendoNumericTextBox").value();
        obj.TakenProd = $("#txtTakenProd").data("kendoNumericTextBox").value();
        obj.RemainingProd = $("#txtRemainingProd").data("kendoNumericTextBox").value();
        obj.Remarks = $("#txtRemarks").val();
        obj.ProdTypeId = $("#cmbProdType").data("kendoComboBox").value();
        obj.OrderTypeId = $("#cmbOrderType").data("kendoComboBox").value();
        obj.OrderStatus = $("#cmbOrderType").data("kendoComboBox").value();
        obj.BuyerId = $("#cmbBuyer").data("kendoComboBox").value();
        obj.OrderRef = $("#cmbOrderNo").data("kendoComboBox").value();
        obj.StyleCode = $("#cmbStyleNo").data("kendoComboBox").value();
        obj.StyleNo = $("#cmbStyleNo").data("kendoComboBox").text();
        obj.WpLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        obj.DyLength = $("#txtDyeLgt").data("kendoNumericTextBox").value();
        obj.WvLength = $("#txtWevLgt").data("kendoNumericTextBox").value();
        obj.FiLength = $("#txtFinLgt").data("kendoNumericTextBox").value();
        obj.InsLength = $("#txtInspLgt").data("kendoNumericTextBox").value();
        obj.Rej = $("#txtRejLgt").data("kendoNumericTextBox").value();
        obj.DyeProd = $("#txtPrevDyeProd").data("kendoNumericTextBox").value();
        obj.EndBuyer = $("#txtEndBuyer").val();
        obj.CSV = $("#txtCSV").val();
        obj.DeliDate = $("#txtLklyDelDate").data("kendoDatePicker").value();
        return obj;

    },
    CreatePlanningDetailsObject: function () {
        var obj = new Object();
        obj.StyleCode = $("#cmbStyleNo").data("kendoComboBox").value();
        obj.StyleNo = $("#cmbStyleNo").data("kendoComboBox").text();
        obj.Weight = $("#txtWeight").val();
        obj.TypeId = $("#cmbFabricType").data("kendoComboBox").value();
        obj.Construction = $("#txtGConstruction").val();
        obj.FConstruction = $("#txtFConstruction").val();
        obj.Weave = $("#txtWeaveQ").val();
        obj.ColorId = $("#cmbColorQ").data("kendoComboBox").value();
        obj.FabricDesc = $("#txtFabricDesc").val();
        obj.FinishingRoute = $("#txtFinRoute").val();
        obj.WarpRatio = $("#txtWarpRatioQ").val();
        obj.WeftRatio = $("#txtWeftRatioQ").val();
        obj.TEnds = $("#txtTotalEndsQ").val();
        obj.ShadeIndigo = $("#txtShadeIndigoQ").val();
        obj.ShadeBlack = $("#txtShadeBlackQ").val();
        obj.YarnCode = $("#txtYarnCode").val();
        obj.SetStd = $("#txtSetStd").val();
        obj.WarpShrinkage = $("#txtWarpShrinkageQ").val();
        obj.WeftShrinkage = $("#txtWeftShrinkageQ").val();
        obj.WeightFinish = $("#txtWeightFinishQ").val();
        obj.WeightWash = $("#txtWeightWashQ").val();
        obj.Skew = $("#txtSkewQ").val();
        obj.Movement = $("#txtMovementQ").val();
        obj.StretchAbblity = $("#txtStretchAbilityQ").val();
        obj.FinishWidth = $("#txtFinishWidth").val();
        obj.FinishLength = $("#txtFinLength").val();
        obj.GreyWidth = $("#txtGreyWidth").val();
        obj.GreyWeight = $("#txtGreyWeight").val();
        obj.GreyEPI = $("#txtGreyEpi").val();
        obj.GreyPPI = $("#txtGreyPpi").val();
        obj.ReedSpace = $("#txtReedSpace").val();
        obj.ReedCount = $("#txtReedCount").val();
        obj.EndDent = $("#txtEndDent").val();
        obj.Remarks = "";
        return obj;
    },
    GetWarpingGridList: function () {
        var gridData = $("#grdWarpingSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },
    GetDyeingGridList: function () {
        var gridData = $("#grdDeyingSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },
    GetWeavingGridList: function () {
        var gridData = $("#grdWeavingSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },
    GetWarpingObject: function () {
        var obj = new Object();
        obj.TotalEnds = $("#txtTotalEndsW").val();
        obj.YarnTension = $("#txtYarnTesionW").val();
        obj.MSpeed = $("#txtMcSpeedW").data("kendoNumericTextBox").value();
        obj.ProcessingForce = $("#txtPressingForce").data("kendoNumericTextBox").value();
        obj.YarnCounts = $("#txtYarnCode").val();
        obj.WarpRatio = $("#txtWarpRatioW").val();
        obj.ProYarnLot = $("#txtProYarnLot").val();
        obj.ProYarnSupp = $("#txtProYarnSupp").val();
        return obj;
    },
    GetDyeingObject: function () {
        var obj = new Object();
        obj.LengthMtr = $("#txtSizeSetLgthDy").data("kendoNumericTextBox").value();
        obj.ColorId = $("#cmbColorDy").data("kendoComboBox").value();
        obj.BeamSpace = $("#txtBeemSpaceDy").data("kendoNumericTextBox").value();
        obj.BeamLength = $("#txtBeemLengthDy").data("kendoNumericTextBox").value();
        obj.RefStd = $("#txtRefStdDy").data("kendoNumericTextBox").value();
        return obj;
    },
    GetWeavingObject: function () {
        var obj = new Object();
        obj.YarnCounts = $("#txtWeftCountsWv").val();
        obj.ProYarnLot = $("#txtProYarnLotWv").val();
        obj.ProYarnSupp = $("#txtProYarnSuppWv").val();
        obj.WeaveRatio = $("#txtWeftRatioWv").val();
        obj.GreyWidth = $("#txtGreyWidthWv").val();
        obj.GreyLength = $("#txtGreyLgthWv").val();
        obj.Selvedge = $("#cmbSelvedge").data("kendoComboBox").value();
        obj.GreyPPI = $("#txtGreyPpiWv").val();
        obj.Weigth = $("#txtWeightWv").val();
        return obj;
    }
}