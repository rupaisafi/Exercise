
var DyeingProdDetailsManager = {
    GetInfoBySetfNo: function (setNo) {
        var objMc = "";
        var jsonParam = "";
        var serviceUrl = "../DyeingProduction/GetInfoBySetNo/?setNo=" + setNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMc = jsonData;
        }
        function onFailed(error) {
            //window.alert(error.statusText);
        }
        return objMc;
    },
    SaveDyeingProdInfo: function () {
        var validator = $("#divDyeProdDetailsMaster").kendoValidator({
            validate: function (e) {
                //$("span.k-invalid-msg").hide();
            }
        }).data("kendoValidator"),
            status = $(".status");
        var info;
        if (validator.validate()) {
            info = DyeingProdDetailsHelper.GetProductionInfoModel();
            var prodInfo = JSON.stringify(info);
            var dye = JSON.stringify(DyeingProdDetailsHelper.GetDyeingProdDetailsDyeGridList());
            var lcb = JSON.stringify(DyeingProdDetailsHelper.GetDyeingProdDetailsLCBGridList());
            var sizing = JSON.stringify(DyeingProdDetailsHelper.GetDyeingProdDetailsSizingGridList());
            var jsonParam = "prodInfo:" + prodInfo + ",dyeRopes:" + dye + ",lCBRopes:" + lcb + ",sizingSlasherRopes:" + sizing;
            var serviceUrl = "../DyeingProduction/SaveDyeingProdInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        } else {
            AjaxManager.MsgBox('error', 'center', 'Error', "Please fill all the required field",
                [{
                    addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (info.DID === "") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdDyeingProductionSummary").data("kendoGrid").dataSource.read();
                            $("#DID").val(jsonData.DID);

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
    GetInfoByStyleCode: function (styleCode) {
        var objMc = "";
        var jsonParam = "";
        var serviceUrl = "../DyeingProduction/GetInfoByStyleCode/?styleCode=" + styleCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMc;
    }
};
var DyeingProdDetailsHelper = {
    InitDyeingProduction: function () {
        var helper = this;
        DyeingProdDetailsDyeRopeHelper.InitDyeingProdDetailsDyeRope();
        DyeingProdDetailsLCBRopeHelper.InitDyeingProdDetailsLCBRope();
        DyeingProdDetailsSizerSlasherRopeHelper.InitDyeingProdDetailsSizerSlasherRope();

        HdlCommonHelper.GenerateTabStrip("tabStrip");
        HdlCommonHelper.GenerateDatePicker("infoDate");
        HdlCommonHelper.GenerateWarpingSetNoCombo("cmbSetNo");
        HdlCommonHelper.GenerateUnitCombo("cmbUnit");
        HdlCommonHelper.GenerateSetProductionTypeCombo("cmbProdType");
        HdlCommonHelper.LCBMcNoCombo("cmbMachineNo");
        HdlCommonHelper.GenerateNumericTextBox("numSetLengthMtr");
        HdlCommonHelper.GenerateNumericTextBox("numSetLengthKg");
        HdlCommonHelper.GenerateStyleCombo("cmbStyleNo");
        HdlCommonHelper.GenerateNumericTextBox("txtNoOfBeam");
        HdlCommonHelper.GenerateNumericTextBox("txtRopeBeam");
        HdlCommonHelper.GenerateNumericTextBox("txtNoOfCreal");
        HdlCommonHelper.GenerateNumericTextBox("txtTotalEnds");
        HdlCommonHelper.GenerateNumericTextBox("txtShadeIndigoPer");
        HdlCommonHelper.GenerateNumericTextBox("txtShadeBlackPer");
        HdlCommonHelper.GenerateNumericTextBox("txtDyMcSpeed");
        HdlCommonHelper.GenerateNumericTextBox("txtAvgCount");
        HdlCommonHelper.GenerateNumericTextBox("txtAftLengthMtr");
        HdlCommonHelper.GenerateNumericTextBox("txtAftLengthKg");
        HdlCommonHelper.GenerateNumericTextBox("numViscosity");
        HdlCommonHelper.GenerateNumericTextBox("numMCRunTimehh");
        HdlCommonHelper.GenerateNumericTextBox("numMCRunTimemm");

        $("#btnAddNew").click(function () {
            DyeingProdDetailsHelper.ClearProductionInfoForm();
            DyeingProdDetailsDyeRopeHelper.ClearDyeingProdDetailsDyeRopeForm();
            DyeingProdDetailsLCBRopeHelper.ClearDyeingProdDetailsLCBRopeForm();
            DyeingProdDetailsSizerSlasherRopeHelper.ClearDyeingProdDetailsSizerSlasherRopeForm();
            $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#divDyeingProdDetails").show();
            $("#divDyeingProdSummary").hide();
        });
        $("#btnClose").click(function () {
            $("#DID").val(0);
            $("#divDyeingProdDetails").hide();
            $("#divDyeingProdSummary").show();
            $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid").dataSource.data([]);
        });
        $("#btnClear").click(function () {
            alert();
            DyeingProdDetailsHelper.ClearProductionInfoForm();
            DyeingProdDetailsDyeRopeHelper.ClearDyeingProdDetailsDyeRopeForm();
            DyeingProdDetailsLCBRopeHelper.ClearDyeingProdDetailsLCBRopeForm();
            $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid").dataSource.data([]);
            $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid").dataSource.data([]);
        });
        $("#btnSave").click(function () {
            DyeingProdDetailsManager.SaveDyeingProdInfo();
        });
        $("#cmbSetNo").change(function () {
            var setNo = $("#cmbSetNo").data("kendoComboBox").value();
            if (setNo > 0) {
                DyeingProdDetailsHelper.SetInfoBySetNo(setNo);
                DyeingProdDetailsLCBRopeHelper.setDyeCapCutEnd(setNo);
            } else {
                DyeingProdDetailsHelper.ClearSetInfo();
                DyeingProdDetailsLCBRopeHelper.clearDyeCapCutEnd(setNo);
            }

        });
        $("#cmbStyleNo").change(function () {
            var styleCode = $("#cmbStyleNo").data("kendoComboBox").value();
            if (styleCode) {
                DyeingProdDetailsHelper.SetInfoByStyleCode(styleCode);
            } else {
                DyeingProdDetailsHelper.ClearSetInfo();
            }
        });

    },
    ClearSetInfo: function () {
        var form = DyeingProdDetailsHelper.GetProductionInfoForm();
        form.Unit.value("");
        form.PType.value("");
        form.SetLengthMtr.value("");
        form.SetWeightKg.value("");
        form.YarnCounts.val("");
        form.WarpRatio.val("");
        form.NoOfBeam.value("");
        form.NoOfCreal.value("");
        form.TotalEnds.value("");
        form.YarnSuppliers.val("");
        form.YarnLot.val("");
        form.StyleNo.value("");
        form.StyleNo.text("");
        form.Buyer.val("");
        form.StyleWeight.val("");
        form.StyleWeave.val("");
        form.StyleConstruction.val("");
        form.StyleWidth.val("");
        form.StyleColor.val("");
    },
    AddToList: function () {
        var validator = $("#divDyeingProdDetailsDyeRopePartial").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var dyeingProdDetailsGrid = $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid");
            var beemNo = $("#txtBeamNo").val();
            if (beemNo !== "0") {
                var gridData = dyeingProdDetailsGrid.dataSource.data();
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

            //var dyeingRope = new Object();
            //dyeingRope.WarpDate = $("#txtWarpDate").data("kendoDatePicker").value();
            //dyeingRope.FlangeNo = $("#txtBeamNo").val();
            //dyeingRope.FlangeLength = $("#txtBeemLength").val();
            //dyeingRope.WeakPoint = $("#txtWeakPoint").data("kendoNumericTextBox").value();
            //dyeingRope.Spiler = "";
            //dyeingRope.Snarl = $("#txtSnarl").data("kendoNumericTextBox").value();
            //dyeingRope.DoubleYarn = $("#txtDoubyleYarn").data("kendoNumericTextBox").value();
            //dyeingRope.DueToMachine = $("#txtDueToMachine").data("kendoNumericTextBox").value();
            //dyeingRope.DueToCone = $("#txtDueToCone").data("kendoNumericTextBox").value();
            //dyeingRope.BadWdg = $("#txtBadWind").data("kendoNumericTextBox").value();
            //dyeingRope.TotalYarnBkg = $("#txtTotalYarnBrkg").data("kendoNumericTextBox").value();
            //dyeingRope.Termination = $("#txtTermination").data("kendoNumericTextBox").value();
            //dyeingRope.Total = $("#txtTotalBreak").data("kendoNumericTextBox").value();
            //dyeingRope.OperatorCardNo = $("#cmbOperator").data("kendoComboBox").value();
            //dyeingRope.OperatorName = $("#cmbOperator").data("kendoComboBox").text();
            //dyeingRope.ShiftCode = $("#cmbShift").data("kendoComboBox").value();
            //dyeingRope.ShiftName = $("#cmbShift").data("kendoComboBox").text();
            //dyeingRope.RemnantPerCreel = $("#hdnRemnantPerCreel").val();
            //dyeingRope.WastagePCreel = $("#hdnWastagePerCreel").val();
            //dyeingRope.ShiftTime = $("#hdnShiftTime").val();
            //dyeingRope.Designation = "";
            //dyeingRope.YarnCode = $("#cmbYarn").data("kendoComboBox").value();
            //dyeingRope.YarnName = $("#cmbYarn").data("kendoComboBox").text();
            //dyeingRope.YarnLot = $("#cmbYarnLot").data("kendoComboBox").value();
            //dyeingRope.ICode = $("#cmbItem").data("kendoComboBox").value();
            //dyeingRope.IName = $("#cmbItem").data("kendoComboBox").text();
            //dyeingRope.SCode = $("#cmbSupplier").data("kendoComboBox").value();
            //dyeingRope.SName = $("#cmbSupplier").data("kendoComboBox").text();
            //dyeingRope.ICount = $("#hdnICount").val();
            //dyeingRope.Unit = $("#hdnItemUnit").val();
            //dyeingRope.EndsBeam = $("#txtEndsPerBeam1").data("kendoNumericTextBox").value();
            //dyeingRope.BreakagePoint = $("#txtBreakPoint").data("kendoNumericTextBox").value();
            //dyeingRope.MSpeed = $("#txtMpm1").data("kendoNumericTextBox").value();
            //dyeingRope.MEffi = $("#hdnMcEffi").val();
            //dyeingRope.Intake = $("#txtIntake").data("kendoNumericTextBox").value();
            //dyeingRope.Reminent = $("#txtReminent").data("kendoNumericTextBox").value();
            //dyeingRope.Recone = $("#txtRecone").data("kendoNumericTextBox").value();
            //dyeingRope.Weastage = $("#txtWastage").data("kendoNumericTextBox").value();
            //dyeingRope.IQnty = $("#txtProdQty").data("kendoNumericTextBox").value();
            //dyeingRope.Rate = $("#txtRate").data("kendoNumericTextBox").value();
            //var beemKg = $("#hdnBeemKg").val() === "" ? "0" : $("#hdnBeemKg").val();
            //dyeingRope.BeamValue = parseFloat(beemKg) * parseFloat(dyeingRope.Rate);
            //dyeingRope.WastageValue = $("#hdnWastagePerCreel").val() * parseFloat(dyeingRope.Rate);
            //dyeingRope.StdBrkg = $("#hdnStdBrKg").val();
            //dyeingRope.BRunTime = $("#txtRunTime").data("kendoNumericTextBox").value();
            //dyeingRope.CapCode = $("#cmbCaptain").data("kendoComboBox").value();
            //dyeingRope.CapName = $("#cmbCaptain").data("kendoComboBox").text();
            //dyeingRope.Lapper = "";
            //gbWarpingProductionData.push(dyeingRope);
            var gridDataSource = new kendo.data.DataSource({
                data: {
                    "DyeingDate": "07-Nov-2018",
                    "BallNo": 15,
                }
            });
            dyeingProdDetailsGrid.setDataSource(gridDataSource);
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
    SetInfoBySetNo: function (setNo) {
        var info = DyeingProdDetailsManager.GetInfoBySetfNo(setNo);
        var form = DyeingProdDetailsHelper.GetProductionInfoForm();
        form.Unit.value(info.UnitCode);
        form.PType.value(info.ProdTypeId);
        form.SetLengthMtr.value(info.SetLengthMtr);
        form.SetWeightKg.value(info.SetLengthKg);
        form.YarnCounts.val(info.YarnCounts);
        form.WarpRatio.val(info.WarpRatio);
        form.NoOfBeam.value(info.NoOfBeem);
        form.NoOfCreal.value(info.NoOfCreel);
        form.TotalEnds.value(info.TotalEnds);
        form.YarnSuppliers.val(info.ProYarnSupp);
        form.YarnLot.val(info.ProYarnLot);
        form.Buyer.val(info.CustomerName);
        form.StyleNo.value(info.StyleCode);
        form.StyleWeight.val(info.Weight);
        form.StyleWidth.val(info.Width);
        form.StyleConstruction.val(info.Construction);
        form.StyleWeave.val(info.Weave);
        form.StyleColor.val(info.ColorName);

    },
    SetInfoByStyleCode: function (styleCode) {
        var info = DyeingProdDetailsManager.GetInfoByStyleCode(styleCode);
        var form = DyeingProdDetailsHelper.GetProductionInfoForm();
        form.StyleWeight.val(info.Weight);
        form.StyleWidth.val(info.Width);
        form.StyleConstruction.val(info.Construction);
        form.StyleWeave.val(info.Weave);
        form.StyleColor.val(info.ColorName);
    },
    GetDyeingProdDetailsDyeGridList: function () {
        return $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid").dataSource.data();
    },
    GetDyeingProdDetailsLCBGridList: function () {
        return $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid").dataSource.data();
    },
    GetDyeingProdDetailsSizingGridList: function () {
        return $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid").dataSource.data();
    },
    GetProductionInfoForm: function () {
        return {
            DID: $("#DID"),
            ProgramDate: $("#infoDate").data("kendoDatePicker"),
            SetNo: $("#cmbSetNo").data("kendoComboBox"),
            Unit: $("#cmbUnit").data("kendoComboBox"),
            PType: $("#cmbProdType").data("kendoComboBox"),
            MCNo: $("#cmbMachineNo").data("kendoComboBox"),
            SetLengthMtr: $("#numSetLengthMtr").data("kendoNumericTextBox"),
            SetWeightKg: $("#numSetLengthKg").data("kendoNumericTextBox"),
            YarnCounts: $("#numYarnCount"),
            WarpRatio: $("#txtWarpRatio"),
            NoOfBeam: $("#txtNoOfBeam").data("kendoNumericTextBox"),
            RopeBeam: $("#txtRopeBeam").data("kendoNumericTextBox"),
            NoOfCreal: $("#txtNoOfCreal").data("kendoNumericTextBox"),
            TotalEnds: $("#txtTotalEnds").data("kendoNumericTextBox"),
            YarnSuppliers: $("#txtYarnSuppliers"),
            YarnLot: $("#txtYarnLot"),
            StyleNo: $("#cmbStyleNo").data("kendoComboBox"),
            StyleWeight: $("#txtWeight"),
            StyleConstruction: $("#txtConstruction"),
            StyleWeave: $("#txtWeave"),
            StyleWidth: $("#txtWidth"),
            StyleColor: $("#textColor"),
            Buyer: $("#txtBuyer"),
            ShadeIndigo: $("#txtShadeIndigoPer").data("kendoNumericTextBox"),
            ShadeBlack: $("#txtShadeBlackPer").data("kendoNumericTextBox"),
            ShadeMatchWith: $("#txtShadeMatchWith"),
            MCSpeed: $("#txtDyMcSpeed").data("kendoNumericTextBox"),
            AvgCount: $("#txtAvgCount").data("kendoNumericTextBox"),
            AfterLengthMtr: $("#txtAftLengthMtr").data("kendoNumericTextBox"),
            AfterWeightKg: $("#txtAftWeightKg"),
            MCStartTime: $("#txtMcStartTime"),
            MCSTopTime: $("#txtMcStopTime"),
            BathGPL: $("#txtBathGPL"),
            FeedingGPL: $("#txtFeedingGPL"),
            Refraction: $("#txtRefraction"),
            Viscosity: $("#numViscosity").data("kendoNumericTextBox"),
            RunHH: $("#numMCRunTimehh").data("kendoNumericTextBox"),
            RunMM: $("#numMCRunTimemm").data("kendoNumericTextBox"),
            Remarks: $("#txtRemarks")
        }
    },
    SetProductionInfoForm: function (selectedItem) {
        var form = DyeingProdDetailsHelper.GetProductionInfoForm();
        form.DID.val(selectedItem.DID);
        form.ProgramDate.value(selectedItem.DyeDate);
        form.SetNo.value(selectedItem.SetNo);
        form.Unit.value(selectedItem.UCode);
        form.MCNo.value(selectedItem.MCNo);
        form.SetLengthMtr.value(selectedItem.LengthMtr);
        form.SetWeightKg.value(selectedItem.LengthKg);
        form.YarnCounts.val(selectedItem.YCode);
        form.WarpRatio.val(selectedItem.WarpRatio);
        form.NoOfBeam.value(selectedItem.NoOfBeam);
        form.RopeBeam.value(selectedItem.RopeBeam);
        form.NoOfCreal.value(selectedItem.NoOfCreel);
        form.TotalEnds.value(selectedItem.TotalEnd);
        form.YarnSuppliers.val(selectedItem.ProYarnSupp);
        form.YarnLot.val(selectedItem.ProYarnLot);
        form.StyleNo.value(selectedItem.StyleNo);
        form.StyleWeight.val(selectedItem.Weigth);
        form.StyleConstruction.val(selectedItem.GConstruction);
        form.StyleWeave.val(selectedItem.Weave);
        form.StyleWidth.val(selectedItem.Width);
        form.StyleColor.val(selectedItem.Colour);
        form.Buyer.val(selectedItem.Buyer);
        form.ShadeIndigo.value(selectedItem.ShadePercentIndigo);
        form.ShadeBlack.value(selectedItem.ShadePercentBlack);
        form.ShadeMatchWith.val(selectedItem.ShadeMatchWith);
        form.MCSpeed.value(selectedItem.MCSpeed);
        form.AvgCount.value(selectedItem.AvgCount);
        form.AfterLengthMtr.value(selectedItem.AfLengthMtr);
        form.AfterWeightKg.val(selectedItem.AfLengthKg);
        form.MCStartTime.val(selectedItem.MCStartTime);
        form.MCSTopTime.val(selectedItem.MCStopTime);
        form.BathGPL.val(selectedItem.Bath);
        form.FeedingGPL.val(selectedItem.Feeding);
        form.Refraction.val(selectedItem.Refraction);
        form.Viscosity.value(selectedItem.Viscosity);
        form.RunHH.value(selectedItem.MCRuntime);
        form.RunMM.value(selectedItem.MCRuntimemm);
        form.Remarks.val(selectedItem.Remarks);
    },
    GetProductionInfoModel: function () {
        var model = {};
        var form = DyeingProdDetailsHelper.GetProductionInfoForm();
        model.DID = form.DID.val();
        model.DyeDate = form.ProgramDate.value();
        model.SetNo = form.SetNo.value();
        model.LengthMtr = form.SetLengthMtr.value();
        model.LengthKg = form.SetWeightKg.value();
        model.Colour = form.StyleColor.val();
        model.YCode = form.YarnCounts.val();
        model.WarpRatio = form.WarpRatio.val();
        model.EndsPerBeam = "999";
        model.NoOfBeam = form.NoOfBeam.value();
        model.RopeBeam = form.RopeBeam.value();
        model.NoOfCreel = form.NoOfCreal.value();
        model.TotalEnd = form.TotalEnds.value();
        model.MCSpeed = form.MCSpeed.value();
        model.DyMCSpeed = "999";
        model.ProYarnLot = form.YarnLot.val();
        model.ProYarnSupp = form.YarnSuppliers.val();
        model.AvgCount = form.AvgCount.value();
        model.MCStartTime = form.MCStartTime.val();
        model.MCStopTime = form.MCSTopTime.val();
        model.MCRuntime = form.RunHH.value();
        model.MCRuntimemm = form.RunMM.value();
        model.ShadePercentIndigo = form.ShadeIndigo.value();
        model.ShadePercentBlack = form.ShadeBlack.value();
        model.ShadeMatchWith = form.ShadeMatchWith.val();
        model.Bath = form.BathGPL.val();
        model.Feeding = form.FeedingGPL.val();
        model.Refraction = form.Refraction.val();
        model.Viscosity = form.Viscosity.value();
        model.Buyer = form.Buyer.val();
        model.StyleNo = form.StyleNo.text();
        model.StyleCode = form.StyleNo.value();
        model.GConstruction = form.StyleConstruction.val();
        model.FConstruction = form.StyleConstruction.val();
        model.Weigth = form.StyleWeight.val();
        model.Weave = form.StyleWeave.val();
        model.Width = form.StyleWidth.val();
        model.AfLengthMtr = form.AfterLengthMtr.value();
        model.AfLengthKg = form.AfterWeightKg.val();
        //model.DCode = "999";
        //model.DName = "999";
        model.PType = form.PType.text();
        model.PTCode = form.PType.value();
        model.MCNo = form.MCNo.text();
        model.MCCode = form.MCNo.value();
        model.UCode = form.Unit.value();
        model.Remarks = form.Remarks.val();
        return model;
    },
    ClearProductionInfoForm: function () {
        var form = DyeingProdDetailsHelper.GetProductionInfoForm();
        form.DID.val(0);
        form.ProgramDate.value("");
        form.SetNo.value("");
        form.Unit.value("");
        form.MCNo.value("");
        form.SetLengthMtr.value("");
        form.SetWeightKg.value("");
        form.YarnCounts.val("");
        form.WarpRatio.val("");
        form.NoOfBeam.value("");
        form.RopeBeam.value("");
        form.NoOfCreal.value("");
        form.TotalEnds.value("");
        form.YarnSuppliers.val("");
        form.YarnLot.val("");
        form.StyleNo.value("");
        form.StyleWeight.val("");
        form.StyleConstruction.val("");
        form.StyleWeave.val("");
        form.StyleWidth.val("");
        form.StyleColor.val("");
        form.Buyer.val("");
        form.ShadeIndigo.value("");
        form.ShadeBlack.value("");
        form.ShadeMatchWith.val("");
        form.MCSpeed.value("");
        form.AvgCount.value("");
        form.AfterLengthMtr.value("");
        form.AfterWeightKg.val("");
        form.MCStartTime.val("");
        form.MCSTopTime.val("");
        form.BathGPL.val("");
        form.FeedingGPL.val("");
        form.Refraction.val("");
        form.Viscosity.value("");
        form.RunHH.value("");
        form.RunMM.value("");
        form.Remarks.val("");
    },
};

