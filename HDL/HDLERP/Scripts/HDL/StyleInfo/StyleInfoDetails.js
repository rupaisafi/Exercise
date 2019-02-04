
var StyleInfoDetailsManager = {
    SaveStyleInfo: function () {
        var validator = $("#divStyleInfoDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var styleObj;
        if (validator.validate()) {
            styleObj = StyleInfoDetailsHelper.CreateStyleObject();
            var styleparamFin = StyleInfoDetailsHelper.CreateStyleParamFinishObject();
            var styleparamGrey = StyleInfoDetailsHelper.CreateStyleParamGreyObject();
            var styleparamFab = StyleInfoDetailsHelper.CreateStyleParamFabricObject();
            var objStyle = JSON.stringify(styleObj);
            var objFinParam = JSON.stringify(styleparamFin);
            var objGreyParam = JSON.stringify(styleparamGrey);
            var objFabParam = JSON.stringify(styleparamFab);
            var jsonParam = "objStyle:" + objStyle + ",objFinParam:" + objFinParam + ",objGreyParam:" + objGreyParam + ",objFabParam:" + objFabParam;
            var serviceUrl = "../StyleInfo/SaveStyleInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (styleObj.SID == "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdStyleInfoSummary").data("kendoGrid").dataSource.read();
                            $("#hdnSID").val(jsonData.SID);
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
    GenerateMaxStyleCode: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../StyleInfo/GenerateMaxStyleCode/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
            $("#txtStyleCode").val(obj.StyleCode);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
}

var StyleInfoDetailsHelper = {
    InitStyleInfoDetails: function () {
        $("#tabStyle").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        });
        StyleInfoDetailsHelper.GenerateNumericTextBox();
        StyleInfoDetailsHelper.GenerateDatePicker();
        HdlCommonHelper.GenerateColorCombo("cmbColor");
        HdlCommonHelper.GenerateUnitCombo("cmbUnit");
        HdlCommonHelper.GeneratecmbFabricTypeCombo("cmbFabricType");
        HdlCommonHelper.GeneratecmbFinishTypeCombo("cmbFinishType");
        HdlCommonHelper.GeneratecmbFinishRouteCombo("cmbFinishRoute");
        HdlCommonHelper.GenerateGradeCombo("cmbGrade");
        HdlCommonHelper.GeneratecmbSpecialityCombo("cmbSpeciality");
        HdlCommonHelper.GenerateYesNoStatus("cmbUpdateStatus");

        $("#btnSave").click(function () {
            StyleInfoDetailsManager.SaveStyleInfo();
        });
        $("#btnClear").click(function () {
            StyleInfoDetailsHelper.ClearForm();
        });
        $("#btnAddNew").click(function () {
            $("#btnGenerateStyleCode").show();
            StyleInfoDetailsHelper.ClearForm();
            StyleInfoDetailsManager.GenerateMaxStyleCode();
            $("#divStyleInfoDetails").show();
            $("#divStyleSummary").hide();
        });

        $("#btnClose").click(function () {
            $("#divStyleInfoDetails").hide();
            $("#divStyleSummary").show();
        });

        $("#btnGenerateStyleCode").click(function () {
            StyleInfoDetailsManager.GenerateMaxStyleCode();
        });


    },

    CreateStyleObject: function () {
        var obj = new Object();
        obj.SID = $("#hdnSID").val();
        obj.UCode = $("#cmbUnit").data("kendoComboBox").value();
        obj.FabricTypeCode = $("#cmbFabricType").data("kendoComboBox").value();
        obj.DevolopmentDate = $("#txtDevolopmentDate").data("kendoDatePicker").value();
        obj.PDNo = $("#txtPDNo").val();
        obj.StyleNo = $("#txtStyleNo").val();
        obj.StyleCode = $("#txtStyleCode").val();
        obj.Weight = $("#txtWeight").data("kendoNumericTextBox").value();
        obj.Weave = $("#txtWeave").val();
        obj.Shrinkage = $("#txtShrinkage").val();
        obj.Width = $("#txtTotalWidth").val();
        obj.CutableWidth = $("#txtCutableWidth").val();
        obj.Construction = $("#txtGreyConstruction").val();
        obj.FConstruction = $("#txtFConstruction").val();
        obj.YarnCode = $("#txtYarnCode").val();
        obj.FabricDesc = $("#txtFabricDesc").val();
        obj.FinishingRoute = $("#cmbFinishRoute").data("kendoComboBox").value();
        obj.FinishTypeCode = $("#cmbFinishType").data("kendoComboBox").value();
        obj.StdShrink = $("#txtStdShrink").data("kendoNumericTextBox").value();
        obj.WarpRatio = $("#txtWarpRatio").val();
        obj.WeftRatio = $("#txtWeftRatio").val();
        obj.TEnds = $("#txtTEnds").data("kendoNumericTextBox").value();
        obj.SetStd = $("#txtSetStd").val();
        obj.ColorId = $("#cmbColor").data("kendoComboBox").value();
        obj.ShadeIndigo = $("#txtShadeIndigo").data("kendoNumericTextBox").value();
        obj.ShadeBlack = $("#txtShadeBlack").data("kendoNumericTextBox").value();
        obj.WarpSupp = $("#txtWarpSupp").val();
        obj.WarpLot = $("#txtWarpLot").val();
        obj.WeftSupp = $("#txtWeftSupp").val();
        obj.WeftLot = $("#txtWeftLot").val();
        obj.StdCrimp = $("#txtStdCrimp").val();
        obj.CSV = $("#txtCSV").val();
        obj.BuyerRef = $("#txtBuyerRef").val();
        obj.GreadCode = $("#cmbGrade").data("kendoComboBox").value();
        obj.SpecialityCode = $("#cmbSpeciality").data("kendoComboBox").value();
        obj.Unit = $("#txtMeasuringUnit").val();
        obj.StatusCode = $("#cmbUpdateStatus").data("kendoComboBox").value();
        obj.PYear = $("#txtProdYear").val();
        //obj.HSCode = $("#txtHSCode").val();
        //obj.SRate = $("#txtSRate").val();
        //obj.Rate1 = $("#txtRate1").val();
        //obj.Trace = $("#txtTrace").val();
        //obj.Remarks = $("#txtRemarks").val();
        //obj.FG = $("#txtFG").val();
        //obj.WarpCons = $("#txtWarpCons").val();
        //obj.WeftCons = $("#txtWeftCons").val();
        //obj.CheCons = $("#txtCheCons").val();
        //obj.RPM = $("#txtRPM").val();
        //obj.Effi = $("#txtEffi").val();

        return obj;
    },
    CreateStyleParamFinishObject: function () {
        var obj = new Object();
        obj.WarpShrinkage = $("#txtWarpShrinkage").val();
        obj.WeftShrinkage = $("#txtWeftShrinkage").val();
        obj.WeightFinish = $("#txtWeightFinish").val();
        obj.WeightWash = $("#txtWeightWash").val();
        obj.Skew = $("#txtSkew").val();
        obj.Movement = $("#txtMovement").val();
        obj.StretchAbblity = $("#txtStretchAbility").val();
        obj.Growth = $("#txtGrowth").val();
        obj.Recovery = $("#txtRecovery").val();
        obj.Remarks = $("#txtRemarksFin").val();
        obj.ShirnkEnzyme = $("#txtShrinkEnzyme").val();
        obj.ShrinkBleach = $("#txtShrinkBleach").val();
        return obj;
    },
    CreateStyleParamGreyObject: function () {
        var obj = new Object();
        obj.GreyShrinkageWarp = $("#txtWarpShrinkageGrey").val();
        obj.GreyShrinkageWeft = $("#txtWeftShrinkageGrey").val();
        obj.GreyWeigth = $("#txtWeightGrey").val();
        obj.GreyWashWeigth = $("#txtWeightWashGrey").val();
        obj.GreySkew = $("#txtSkewGrey").val();
        obj.GreyStretchAbblity = $("#txtStretchAbilityGrey").val();
        obj.GreyWidth = $("#txtWidthGrey").val();
        obj.GEPI = $("#txtGreyEpi").val();
        obj.GPPI = $("#txtGreyPpi").val();
        obj.Remarks = $("#txtRemarksGrey").val();
        obj.RPM = $("#txtCostRpm").val();
        obj.Effi = $("#txtCostEffi").val();
        obj.ReedSpace = $("#txtWarpShrinkage").val();
        obj.ReedCount = $("#txtReedCount").val();
        obj.EndsDent = $("#txtEndsDent").val();
        return obj;
    },
    CreateStyleParamFabricObject: function () {
        var obj = new Object();
        obj.TensileStrengthWarp = $("#txtTensileStrgthWarp").val();
        obj.TensileStrengthWeft = $("#txtTensileStrgthWeft").val();
        obj.TearingStrengthWarp = $("#txtTearingStrgthWarp").val();
        obj.TearingStrengthWeft = $("#txtTearingStrgthWeft").val();
        obj.CrockingFastnessDry = $("#txtCrockingFastnessDry").val();
        obj.CrockingFastnessWeft = $("#txtCrockingFastnessWeft").val();
        obj.ColourFastnessWash = $("#txtColourFastnessWash").val();
        obj.ColourFastnessAcetate = $("#txtColourFastnessAcetate").val();
        obj.ColourFastnessCotton = $("#txtColourFastnessCotton").val();
        obj.ColourFastnessNylon = $("#txtColourFastnessNylon").val();
        obj.ColourFastnessPolyster = $("#txtColourFastnessPolystar").val();
        obj.ColourFastnessAcrylic = $("#txtColourFastnessAcrylic").val();
        obj.ColourFastnessWool = $("#txtColourFastnessWool").val();
        obj.PH = $("#txtPh").val();
        obj.Moisture = $("#txtMoisture").val();
        obj.Steffness = $("#txtSteffness").val();
        obj.PickEffi = $("#txtEffi").val();
        obj.RPM = $("#txtRPM").val();
        obj.ValueLoss = $("#txtValueLoss").val();
        obj.Remarks = "";
        obj.ReedSpace = $("#txtReedSpace").val();
        return obj;
    },

    FillForm: function (obj) {
    
        $("#hdnSID").val(obj.SID);
        $("#cmbUnit").data("kendoComboBox").value(obj.UCode);
        $("#cmbFabricType").data("kendoComboBox").value(obj.FabricTypeCode);
        $("#txtDevolopmentDate").data("kendoDatePicker").value(obj.DevolopmentDate);
        $("#txtPDNo").val(obj.PDNo);
        $("#txtStyleNo").val(obj.StyleNo);
        $("#txtStyleCode").val(obj.StyleCode);
        $("#txtWeight").data("kendoNumericTextBox").value(obj.Weight);
        $("#txtTotalWidth").val(obj.Width);
        $("#txtShrinkage").val(obj.Shrinkage);
        $("#txtGreyConstruction").val(obj.Construction);
        $("#txtFConstruction").val(obj.FConstruction);
        $("#txtYarnCode").val(obj.YarnCode);
        $("#txtFabricDesc").val(obj.FabricDesc);
        $("#cmbFinishRoute").data("kendoComboBox").value(obj.FinishingRoute);
        $("#txtWarpRatio").val(obj.WarpRatio);
        $("#txtWeftRatio").val(obj.WeftRatio);
        $("#txtTEnds").data("kendoNumericTextBox").value(obj.TEnds);
        $("#txtWeave").val(obj.Weave);
        $("#txtSetStd").val(obj.SetStd);
        $("#cmbColor").data("kendoComboBox").value(obj.ColorId);
        $("#txtShadeIndigo").data("kendoNumericTextBox").value(obj.ShadeIndigo);
        $("#txtShadeBlack").data("kendoNumericTextBox").value(obj.ShadeBlack);
        $("#txtWarpSupp").val(obj.WarpSupp);
        $("#txtWarpLot").val(obj.WarpLot);
        $("#txtWeftSupp").val(obj.WeftSupp);
        $("#txtWeftLot").val(obj.WeftLot);
        $("#txtBuyerRef").val(obj.BuyerRef);
        $("#cmbGrade").data("kendoComboBox").value(obj.GreadCode);
        $("#txtProdYear").val(obj.PYear);
        $("#txtUnit").val(obj.Unit);
        $("#txtHSCode").val(obj.HSCode);
        $("#txtSRate").val(obj.SRate);
        $("#txtRate1").val(obj.Rate1);
        $("#cmbUpdateStatus").data("kendoComboBox").value(obj.StatusCode);
        $("#txtTrace").val(obj.Trace);
        $("#txtRemarks").val(obj.Remarks);
        $("#txtMeasuringUnit").val(obj.Unit);
        //$("#txtFG").val(obj.FG);
        //$("#txtWarpCons").val(obj.WarpCons);
        //$("#txtWeftCons").val(obj.WeftCons);
        // $("#txtCheCons").val(obj.CheCons);
        //$("#txtRPM").val(obj.RPM);
        //$("#txtEffi").val(obj.Effi);
        $("#cmbFinishType").data("kendoComboBox").value(obj.FinishTypeCode);
        $("#txtCSV").val(obj.CSV);
        $("#cmbSpeciality").data("kendoComboBox").value(obj.SpecialityCode);
        $("#txtCutableWidth").val(obj.CutableWidth);
        $("#txtStdCrimp").val(obj.StdCrimp);
        $("#txtStdShrink").data("kendoNumericTextBox").value(obj.StdShrink);

    },
    FillFinishInformation: function (obj) {
        $("#txtWarpShrinkage").val(obj.WarpShrinkage);
        $("#txtWeftShrinkage").val(obj.WeftShrinkage);
        $("#txtWeightFinish").val(obj.WeightFinish);
        $("#txtWeightWash").val(obj.WeightWash);
        $("#txtSkew").val(obj.Skew);
        $("#txtMovement").val(obj.Movement);
        $("#txtStretchAbility").val(obj.StretchAbblity);
        $("#txtGrowth").val(obj.Growth);
        $("#txtRecovery").val(obj.Recovery);
        $("#txtRemarksFin").val(obj.RemarksFin);
        $("#txtShrinkEnzyme").val(obj.ShirnkEnzyme);
        $("#txtShrinkBleach").val(obj.ShrinkBleach);
    },
    FillGreyInformation: function (obj) {
        $("#txtWarpShrinkageGrey").val(obj.GreyShrinkageWarp);
        $("#txtWeftShrinkageGrey").val(obj.GreyShrinkageWeft);
        $("#txtWeightGrey").val(obj.GreyWeigth);
        $("#txtWeightWashGrey").val(obj.GreyWashWeigth);
        $("#txtSkewGrey").val(obj.GreySkew);
        $("#txtStretchAbilityGrey").val(obj.GreyStretchAbblity);
        $("#txtWidthGrey").val(obj.GreyWidth);
        $("#txtGreyEpi").val(obj.GEPI);
        $("#txtGreyPpi").val(obj.GPPI);
        $("#txtRemarksGrey").val(obj.RemarksGrey);
        $("#txtCostRpm").val(obj.RPMGrey);
        $("#txtCostEffi").val(obj.EffiGrey);
        $("#txtWarpShrinkage").val(obj.ReedSpaceGrey);
        $("#txtReedCount").val(obj.ReedCount);
        $("#txtEndsDent").val(obj.EndsDent);
    },
    FillFabricInformation: function (obj) {
        $("#txtTensileStrgthWarp").val(obj.TensileStrengthWarp);
        $("#txtTensileStrgthWeft").val(obj.TensileStrengthWeft);
        $("#txtTearingStrgthWarp").val(obj.TearingStrengthWarp);
        $("#txtTearingStrgthWeft").val(obj.TearingStrengthWeft);
        $("#txtCrockingFastnessDry").val(obj.CrockingFastnessDry);
        $("#txtCrockingFastnessWeft").val(obj.CrockingFastnessWeft);
        $("#txtColourFastnessWash").val(obj.ColourFastnessWash);
        $("#txtColourFastnessAcetate").val(obj.ColourFastnessAcetate);
        $("#txtColourFastnessCotton").val(obj.ColourFastnessCotton);
        $("#txtColourFastnessNylon").val(obj.ColourFastnessNylon);
        $("#txtColourFastnessPolystar").val(obj.ColourFastnessPolyster);
        $("#txtColourFastnessAcrylic").val(obj.ColourFastnessAcrylic);
        $("#txtColourFastnessWool").val(obj.ColourFastnessWool);
        $("#txtPh").val(obj.PH);
        $("#txtMoisture").val(obj.Moisture);
        $("#txtSteffness").val(obj.Steffness);
        $("#txtEffi").val(obj.PickEffi);
        $("#txtRPM").val(obj.RPMFab);
        $("#txtValueLoss").val(obj.ValueLoss);
        $("#txtReedSpace").val(obj.ReedSpaceFab);
    },

    ClearForm: function () {
        $("#hdnSID").val("0");
        $("#cmbUnit").data("kendoComboBox").value("");
        $("#cmbFabricType").data("kendoComboBox").value("");
        $("#txtDevolopmentDate").data("kendoDatePicker").value(new Date());
        $("#txtPDNo").val("");
        $("#txtStyleNo").val("");
        $("#txtStyleCode").val("");
        $("#txtWeight").data("kendoNumericTextBox").value("");
        $("#txtTotalWidth").val("");
        $("#txtShrinkage").val("");
        $("#txtGreyConstruction").val("");
        $("#txtFConstruction").val("");
        $("#txtYarnCode").val("");
        $("#txtFabricDesc").val("");
        $("#cmbFinishRoute").data("kendoComboBox").value("");
        $("#txtWarpRatio").val("");
        $("#txtWeftRatio").val("");
        $("#txtTEnds").data("kendoNumericTextBox").value("");
        $("#txtWeave").val("");
        $("#txtSetStd").val("");
        $("#cmbColor").data("kendoComboBox").value("");
        $("#txtShadeIndigo").data("kendoNumericTextBox").value("");
        $("#txtShadeBlack").data("kendoNumericTextBox").value("");
        $("#txtWarpSupp").val("");
        $("#txtWarpLot").val("");
        $("#txtWeftSupp").val("");
        $("#txtWeftLot").val("");
        $("#txtBuyerRef").val("");
        $("#cmbGrade").data("kendoComboBox").value("");
        $("#txtProdYear").val("");
        $("#txtUnit").val("");
        $("#txtHSCode").val("");
        $("#txtSRate").val("");
        $("#txtRate1").val("");
        $("#cmbUpdateStatus").data("kendoComboBox").value("");
        $("#txtTrace").val("");
        $("#txtRemarks").val("");
        $("#txtMeasuringUnit").val("");
        //$("#txtFG").val(obj.FG);
        //$("#txtWarpCons").val(obj.WarpCons);
        //$("#txtWeftCons").val(obj.WeftCons);
        // $("#txtCheCons").val(obj.CheCons);
        //$("#txtRPM").val(obj.RPM);
        //$("#txtEffi").val(obj.Effi);
        $("#cmbFinishType").data("kendoComboBox").value("");
        $("#txtCSV").val("");
        $("#cmbSpeciality").data("kendoComboBox").value("");
        $("#txtCutableWidth").val("");
        $("#txtStdCrimp").val("");
        $("#txtStdShrink").data("kendoNumericTextBox").value("");

        $("#txtWarpShrinkage").val("");
        $("#txtWeftShrinkage").val("");
        $("#txtWeightFinish").val("");
        $("#txtWeightWash").val("");
        $("#txtSkew").val("");
        $("#txtMovement").val("");
        $("#txtStretchAbility").val("");
        $("#txtGrowth").val("");
        $("#txtRecovery").val("");
        $("#txtRemarksFin").val("");
        $("#txtShrinkEnzyme").val("");
        $("#txtShrinkBleach").val("");

        $("#txtWarpShrinkageGrey").val("");
        $("#txtWeftShrinkageGrey").val("");
        $("#txtWeightGrey").val("");
        $("#txtWeightWashGrey").val("");
        $("#txtSkewGrey").val("");
        $("#txtStretchAbilityGrey").val("");
        $("#txtWidthGrey").val("");
        $("#txtGreyEpi").val("");
        $("#txtGreyPpi").val("");
        $("#txtRemarksGrey").val("");
        $("#txtCostRpm").val("");
        $("#txtCostEffi").val("");
        $("#txtWarpShrinkage").val("");
        $("#txtReedCount").val("");
        $("#txtEndsDent").val("");

        $("#txtTensileStrgthWarp").val("");
        $("#txtTensileStrgthWeft").val("");
        $("#txtTearingStrgthWarp").val("");
        $("#txtTearingStrgthWeft").val("");
        $("#txtCrockingFastnessDry").val("");
        $("#txtCrockingFastnessWeft").val("");
        $("#txtColourFastnessWash").val("");
        $("#txtColourFastnessAcetate").val("");
        $("#txtColourFastnessCotton").val("");
        $("#txtColourFastnessNylon").val("");
        $("#txtColourFastnessPolystar").val("");
        $("#txtColourFastnessAcrylic").val("");
        $("#txtColourFastnessWool").val("");
        $("#txtPh").val("");
        $("#txtMoisture").val("");
        $("#txtSteffness").val("");
        $("#txtEffi").val("");
        $("#txtRPM").val("");
        $("#txtValueLoss").val("");
        $("#txtReedSpace").val("");

        $("#divStyleInfoDetails > form").kendoValidator();
        $("#divStyleInfoDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    GenerateDatePicker: function () {
        $("#txtDevolopmentDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
    },
    GenerateNumericTextBox: function () {
        $("#txtWeight").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtStdShrink").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtTEnds").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtShadeIndigo").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtShadeBlack").kendoNumericTextBox({ format: "#.##", min: 0 });

    },

}