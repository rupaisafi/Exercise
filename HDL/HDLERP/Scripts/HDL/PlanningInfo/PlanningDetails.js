
var PlanningDetailsManager = {
    GetAllGridData: function (planId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetAllGridData/?planId=" + planId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
    GetAllOrder: function () {
        var objOrder = "";
        var jsonParam = "";
        var serviceUrl = "../OrderInfo/GetAllOrder/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrder = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrder;
    },
    GetSetNoByUnit: function (unitCode) {
        var objOrder = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetSetNoByUnit/?unitCode=" + unitCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrder = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrder;
    },
    GetOrderInfoByOrderNo: function (orderNo) {
        var objOrder = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetOrderInfoByOrderNo/?orderNo=" + orderNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrder = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrder;
    },
    GetStyleInfoByOrderNo: function (orderNo) {
        var objOrder = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetStyleInfoByOrderNo/?orderNo=" + orderNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrder = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrder;
    }
};

var PlanningDetailsHelper = {
    InitPlanningDetails: function () {
        $("#divPlanningTab").kendoTabStrip({
            animation: {
                close: {
                    //duration: 1000,
                    effects: "fadeOut"
                },
                // fade-in new tab over 500 milliseconds
                open: {
                   // duration: 500,
                    effects: "fadeIn"
                }
            }
        });
        WarpingSummaryHelper.GenerateWarpingInfoGrid();
        DeyingSummaryHelper.GenerateDeyingInfoGrid();
        WeavingSummaryHelper.GenerateWeavingInfoGrid();

        PlanningDetailsHelper.GenerateDatePicker();
        PlanningDetailsHelper.GenerateOrderCombo("cmbOrderNo");
        HdlCommonHelper.GenerateUnitCombo("cmbUnit");
        PlanningDetailsHelper.GenerateSetNoCombo();
        HdlCommonHelper.GenerateProdTypeCombo("cmbProdType");
        HdlCommonHelper.GenerateCustomerCombo("cmbCustomer");
        HdlCommonHelper.GenerateMktUserCombo("cmbMktPerson");
        HdlCommonHelper.GenerateProdOrderTypeCombo("cmbOrderType");
        PlanningDetailsHelper.GenerateStyleCombo("cmbStyleNo");
        HdlCommonHelper.GenerateBuyerCombo("cmbBuyer");
        HdlCommonHelper.GeneratecmbFabricTypeCombo("cmbFabricType");
      
        //Quality
        HdlCommonHelper.GenerateColorCombo("cmbColorQ");
        PlanningDetailsHelper.GenerateNumericTextBox();

        WarpingInfoHelper.InitWarpingInfo();
        DeyingInfoHelper.InitDeyingInfo();
        WeavingInfoHelper.InitWeavingInfo();

        PlanningInfoSaveHelper.InitPlanningInfoSave();

        $("#btnAddNewPlanning").click(function () {
            //var tabToActivate = $("#pnlQuality");
            //$("#divPlanningTab").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);

            PlanningInfoSaveHelper.ClearAllPlanningDetailsForm();
            $("#divPlanDetails").show();
            $("#divPlanningSummary").hide();
        });
        $("#btnClosePlan").click(function () {
            $("#divPlanDetails").hide();
            $("#divPlanningSummary").show();
        });
        $("#btnBack").click(function () {
            $("#divPlanDetails").hide();
            $("#divPlanningSummary").show();
        });
       
        $("#cmbUnit").change(function () {
            PlanningDetailsHelper.UnitComboChange();
        });
        $("#cmbOrderNo").change(function () {
            PlanningDetailsHelper.OrderNoChange();
        });

        $("#txtSetLength").change(function () {
            PlanningDetailsHelper.SetLengthChangeEvent();
        });

        $("#cmbStyleNo").change(function () {
            PlanningDetailsHelper.StyleNoChangeEvent();
        });

        $("#txtTakenProd").change(function () {
            PlanningDetailsHelper.ChangeEvent();
        });

        $("#txtPrevDyeProd").change(function () {
            PlanningDetailsHelper.ChangeEvent();
        });
    },

   
    GenerateDatePicker: function () {
        $("#txtPlanDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
        $("#txtLklyDelDate").kendoDatePicker({
            format: "dd-MMM-yyyy"

        });
    },

  

   
    GenerateOrderCombo: function (identity) {
        var objOrder = PlanningDetailsManager.GetAllOrder();
        var obj = new Object();
        obj.OrderName = "---Select---";
        obj.OrderNo = 0;
        objOrder.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "OrderName",
            dataValueField: "OrderNo",
            dataSource: objOrder,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateSetNoCombo: function () {
        $("#cmbSetNo").kendoComboBox({
            dataTextField: "SetNo1",
            dataValueField: "SetNo",
            dataSource: [],
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    UnitComboChange: function () {
        var unitcode = $("#cmbUnit").data("kendoComboBox").value();
        var setnocombo = $("#cmbSetNo").data("kendoComboBox");
        setnocombo.setDataSource([]);
        var data = PlanningDetailsManager.GetSetNoByUnit(unitcode);
        var obj = new Object();
        obj.SetNo1 = "---Select---";
        obj.SetNo = 0;
        data.unshift(obj);
        setnocombo.setDataSource(data);
    },
    GenerateProdTypeCombo: function () {
        $("#cmbProdType").kendoComboBox({
            dataTextField: "Type",
            dataValueField: "TCode",
            dataSource: [],
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GenerateStyleCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "---Select---",
            dataTextField: "StyleNo",
            dataValueField: "StyleCode",
            dataSource: [],
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateNumericTextBox: function () {
        HdlCommonHelper.GenerateNumericTextBox("txtOrderQty");
        HdlCommonHelper.GenerateNumericTextBox("txtPlWidth");
        HdlCommonHelper.GenerateNumericTextBox("txtPlShrink");
        HdlCommonHelper.GenerateNumericTextBox("txtReqOrderProd");
        HdlCommonHelper.GenerateNumericTextBox("txtPrevDyeProd");
        HdlCommonHelper.GenerateNumericTextBox("txtTakenProd");
        HdlCommonHelper.GenerateNumericTextBox("txtRemainingProd");
        HdlCommonHelper.GenerateNumericTextBox("txtDyeLgt");
        HdlCommonHelper.GenerateNumericTextBox("txtWevLgt");
        HdlCommonHelper.GenerateNumericTextBox("txtFinLgt");
        HdlCommonHelper.GenerateNumericTextBox("txtInspLgt");
        HdlCommonHelper.GenerateNumericTextBox("txtRejLgt");
        HdlCommonHelper.GenerateNumericTextBox("txtSetLength");
        HdlCommonHelper.GenerateNumericTextBox("txtMcSpeedW");
        HdlCommonHelper.GenerateNumericTextBox("txtPressingForce");
    },
    OrderNoChange: function () {
        var orderNo = $("#cmbOrderNo").data("kendoComboBox").value();
        if (orderNo > 0) {
            var data = PlanningDetailsManager.GetOrderInfoByOrderNo(orderNo);
            $("#cmbMktPerson").data("kendoComboBox").value(data.MktPerson);
            $("#cmbBuyer").data("kendoComboBox").value(data.BuyerId);
            $("#cmbCustomer").data("kendoComboBox").value(data.CustomerId);

            var styleList = PlanningDetailsManager.GetStyleInfoByOrderNo(orderNo);
            var obj = new Object();
            obj.StyleNo = "---Select---";
            obj.StyleCode = 0;
            styleList.unshift(obj);
            var styleCombo = $("#cmbStyleNo").data("kendoComboBox");
            styleCombo.setDataSource(styleList);


            //var style1Combo = $("#cmbStyleNo1").data("kendoComboBox");
            //style1Combo.setDataSource(styleList);
        } else {
            $("#cmbMktPerson").data("kendoComboBox").value("");
            $("#cmbBuyer").data("kendoComboBox").value("");
            $("#cmbCustomer").data("kendoComboBox").value("");

            var stylecombo = $("#cmbStyleNo").data("kendoComboBox");
            stylecombo.value("");
            stylecombo.text("");
            stylecombo.setDataSource([]);
           // $("#cmbStyleNo1").data("kendoComboBox").value("");
            $("#txtOrderQty").data("kendoNumericTextBox").value("");
            $("#cmbOrderType").data("kendoComboBox").value("");
            $("#txtRate").val("");
            PlanningDetailsHelper.ClearGeneralInfo();
            PlanningDetailsHelper.ClearQualityInfo();
            PlanningDetailsHelper.ClearWarpingDetailsInfo();
            PlanningDetailsHelper.ClearDyeInfo();
            PlanningDetailsHelper.ClearWeavingInfo();
        }

    },
    SetLengthChangeEvent: function () {
        var setLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        var dyeLength = setLength * 1.02;
        var wevLength = dyeLength * 0.89 * 1.0936;
        var finLength = wevLength * 0.87;
        var inspLength = finLength * 0.984;
        var rejLenght = finLength - inspLength;
        $("#txtDyeLgt").data("kendoNumericTextBox").value(dyeLength);
        $("#txtWevLgt").data("kendoNumericTextBox").value(wevLength);
        $("#txtFinLgt").data("kendoNumericTextBox").value(finLength);
        $("#txtInspLgt").data("kendoNumericTextBox").value(inspLength);
        $("#txtRejLgt").data("kendoNumericTextBox").value(rejLenght);
        $("#txtPrevDyeProd").data("kendoNumericTextBox").value(setLength);
        $("#txtTakenProd").data("kendoNumericTextBox").value(setLength);
        $("#txtFinLength").val(finLength.toFixed(2));
        $("#txtWarpSetLgth").val(setLength);
        var reqOrdProd = $("#txtReqOrderProd").data("kendoNumericTextBox").value();
        var prevdye = $("#txtPrevDyeProd").data("kendoNumericTextBox").value();
        var takenProd = $("#txtTakenProd").data("kendoNumericTextBox").value();
        var remProd = reqOrdProd - (prevdye + takenProd);
        $("#txtRemainingProd").data("kendoNumericTextBox").value(remProd);

        //dyeing
        $("#txtSizeSetLgthDy").data("kendoNumericTextBox").value(dyeLength);
    },
    StyleNoChangeEvent: function () {
        var orderNo = $("#cmbOrderNo").data("kendoComboBox").value();
        var styleCode = $("#cmbStyleNo").data("kendoComboBox").value();
        if (orderNo > 0 && styleCode > 0) {
            var url = "../PlanningInfo/GetOrderInfoByByOrderNoAndStyle/?orderNo=" + orderNo + "&styleCode=" + styleCode;
            var data = HdlCommonManager.GetCommonData(url);
            $("#txtOrderQty").data("kendoNumericTextBox").value(data.Qnty);
            $("#cmbOrderType").data("kendoComboBox").value(data.ProdOrderTypeId);
            $("#txtReqOrderProd").data("kendoNumericTextBox").value(data.ReqQnty);
            $("#txtRate").val(data.Rate);
            $("#txtStyleNo1").val($("#cmbStyleNo").data("kendoComboBox").text());
            $("#cmbFabricType").data("kendoComboBox").value(data.FabTypeCode);
            $("#txtWeight").val(data.Weight);
            $("#txtFabricDesc").val(data.FabricDesc);
            $("#txtShadeIndigoQ").val(data.ShadeIndigo);
            $("#txtShadeBlackQ").val(data.ShadeBlack);
            $("#txtWeightFinishQ").val(data.WeightFinish);
            $("#txtWeightWashQ").val(data.WeightWash);
            $("#txtSkewQ").val(data.Skew);
            $("#txtMovementQ").val(data.Movement);
            $("#txtStretchAbilityQ").val(data.StretchAbblity);

            PlanningDetailsHelper.ChangeEvent();
            PlanningDetailsHelper.FillQualityInfo(data);
            PlanningDetailsHelper.FillWarpDetailsInfo(data);
            PlanningDetailsHelper.FillDyeInfo(data);
            WeavingInfoHelper.FillWeavingInformation(data);

        } else {
           
            PlanningDetailsHelper.ClearGeneralInfo();
            PlanningDetailsHelper.ClearQualityInfo();
            PlanningDetailsHelper.ClearWarpingDetailsInfo();
            PlanningDetailsHelper.ClearDyeInfo();
            PlanningDetailsHelper.ClearWeavingInfo();
        }

    },
    ChangeEvent: function () {
        var prevdye = $("#txtPrevDyeProd").data("kendoNumericTextBox").value();
        var takenProd = $("#txtTakenProd").data("kendoNumericTextBox").value();
        var reqOrdProd = $("#txtReqOrderProd").data("kendoNumericTextBox").value();

        var remProd = reqOrdProd - (prevdye + takenProd);
        $("#txtRemainingProd").data("kendoNumericTextBox").value(remProd);
    },
    FillQualityInfo: function (obj) {
        $("#txtStyleNo1").val(obj.StyleNo);
        $("#txtGConstruction").val(obj.Construction);
        $("#txtFConstruction").val(obj.FConstruction);
        $("#txtWarpRatioQ").val(obj.WarpRatio);
        $("#txtWeftRatioQ").val(obj.WeftRatio);
        $("#txtTotalEndsQ").val(obj.TEnds);
        $("#txtWeaveQ").val(obj.Weave);
        $("#cmbColorQ").data("kendoComboBox").value(obj.ColorId);
        $("#txtSetStd").val(obj.SetStd);
        $("#txtFinishWidth").val(obj.Width);
        $("#txtFinRoute").val(obj.FinishingRoute);
        $("#txtYarnCode").val(obj.YarnCode);
        $("#txtGreyWidth").val(obj.GreyWidth);
        $("#txtGreyWeight").val(obj.GreyWeigth);
        $("#txtGreyEpi").val(obj.GEPI);
        $("#txtGreyPpi").val(obj.GPPI);
        $("#txtReedSpace").val(obj.ReedSpace);
        $("#txtReedCount").val(obj.ReedCount);
        $("#txtEndDent").val(obj.EndsDent);

        $("#txtWeftRatioWv").val(obj.WeftRatio);

        var setLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        var finLength = (((setLength * 1.02 * 1.0936) * 0.89) * 0.87).toFixed(2);
    
        $("#txtFinLength").val(finLength);
        $("#txtWarpShrink").val(obj.WarpShrinkage);
        $("#txtWeftShrink").val(obj.WeftShrinkage);
    },
   
    FillWarpDetailsInfo: function (obj) {
        var setLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        $("#txtWarpSetLgth").val(setLength);
        $("#txtWarpRatioW").val(obj.WarpRatio);
        $("#txtTotalEndsW").val(obj.TEnds);
        $("#txtConstructionW").val(obj.Construction);
    },
   
    FillDyeInfo: function (obj) {
        var setLength = $("#txtSetLength").data("kendoNumericTextBox").value();
        var size = setLength * 1.02;
        $("#txtSizeSetLgthDy").data("kendoNumericTextBox").value(size);
        $("#cmbColorDy").data("kendoComboBox").value(obj.ColorId);
    },
    ClearGeneralInfo: function () {
        $("#txtOrderQty").data("kendoNumericTextBox").value("");
        $("#cmbOrderType").data("kendoComboBox").value("");
        $("#txtRate").val("");
        $("#txtReqOrderProd").data("kendoNumericTextBox").value("");

        $("#txtPrevDyeProd").data("kendoNumericTextBox").value("");
        $("#txtTakenProd").data("kendoNumericTextBox").value("");
        $("#txtRemainingProd").data("kendoNumericTextBox").value("");
        $("#txtDyeLgt").data("kendoNumericTextBox").value("");
        $("#txtWevLgt").data("kendoNumericTextBox").value("");
        $("#txtFinLgt").data("kendoNumericTextBox").value("");
        $("#txtInspLgt").data("kendoNumericTextBox").value("");
        $("#txtRejLgt").data("kendoNumericTextBox").value("");
    },
    ClearQualityInfo: function () {
       // $("#cmbStyleNo1").data("kendoComboBox").value("");
        $("#txtGConstruction").val("");
        $("#txtFConstruction").val("");
        $("#txtWarpRatioQ").val("");
        $("#txtWeftRatioQ").val("");
        $("#txtTotalEndsQ").val("");
        $("#txtWeaveQ").val("");
        $("#cmbColorQ").data("kendoComboBox").value("");
        $("#txtSetStd").val("");
        $("#txtFinishWidth").val("");
        $("#txtFinRoute").val("");
        $("#txtYarnCode").val("");
        $("#txtGreyWidth").val("");
        $("#txtGreyWeight").val("");
        $("#txtGreyEpi").val("");
        $("#txtGreyPpi").val("");
        $("#txtReedSpace").val("");
        $("#txtReedCount").val("");
        $("#txtEndDent").val("");
        $("#txtFinLength").val("");
        $("#txtWarpShrink").val("");
        $("#txtWeftShrink").val("");
    },
    ClearWarpingDetailsInfo: function () {
        $("#txtWarpSetLgth").val("");
        $("#txtWarpRatioW").val("");
        $("#txtTotalEndsW").val("");
        $("#txtConstructionW").val("");
    },
    ClearDyeInfo: function() {
        $("#txtSizeSetLgthDy").data("kendoNumericTextBox").value("");
        $("#cmbColorDy").data("kendoComboBox").value("");
    },
    ClearWeavingInfo: function() {
        $("#txtGreyLgthWv").val("");
        $("#txtGreyWidthWv").val("");
        $("#txtWeightWv").val("");
        $("#txtGreyPpiWv").val("");
        $("#txtWeftRatioWv").val("");
        $("#txtWeftCountsWv").val("");
        $("#txtReedSpaceWv").val("");
        $("#txtReedCountWv").val("");
        $("#txtEndDentWv").val("");
    }
    
}