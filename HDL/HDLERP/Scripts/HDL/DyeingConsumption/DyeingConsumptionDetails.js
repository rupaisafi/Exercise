var DyeingConsumptionDetailsManager = {
    getDyeingConsumptionInfo: function (setNo) {
        var objMc = "";
        var jsonParam = "";
        var serviceUrl = "../DyeingConsumption/GetDyeingConsumptionInfo/?setNo=" + setNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMc = jsonData;
        }
        function onFailed(error) {
            console.log(error);
        }
        return objMc;
    },
    saveDyeingConsumption: function (setNo, model) {

        var validator = $("#divDyeProdDetailsMaster").kendoValidator().data("kendoValidator");
        if (validator.validate()) {
            var jsonParam = "setNo:" + setNo + ",consumptionDetail:" + JSON.stringify(model);
            var serviceUrl = "../DyeingConsumption/SaveDyeingConsumption/";
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

            var msg = "Saved Successfully";
            var DID = $("#DID").val();
            if (DID && DID > 0) {
                msg = "Updated Successfully";
            } else {
                msg = "Saved Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#dcdpGrid").data("kendoGrid").dataSource.read();
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
    }
};
var DyeingConsumptionDetailsHelper = {
    Init: function () {
        //Consumption Master
        var helper = this;
        HdlCommonHelper.GenerateSetNoCombo("dcdSetNo");
        HdlCommonHelper.GenerateDatePicker("dcdProgramDate");
        HdlCommonHelper.GenerateTabStrip("tabStrip");
        HdlCommonHelper.GenerateUnitCombo("dcdUnit");
        HdlCommonHelper.GenerateSetProductionTypeCombo("dcdProdType");
        HdlCommonHelper.GenerateDyeMcNoCombo("dcdMachineNo");
        HdlCommonHelper.GenerateNumericTextBox("dcdSetLengthMtr");
        HdlCommonHelper.GenerateNumericTextBox("dcdSetLengthKg");
        HdlCommonHelper.GenerateStyleCombo("dcdStyleNo");
        HdlCommonHelper.GenerateNumericTextBox("dcdNoOfBeam");
        HdlCommonHelper.GenerateNumericTextBox("dcdRopeBeam");
        HdlCommonHelper.GenerateNumericTextBox("dcdNoOfCreal");
        HdlCommonHelper.GenerateNumericTextBox("dcdTotalEnds");
        HdlCommonHelper.GenerateNumericTextBox("dcdShadeIndigoPer");
        HdlCommonHelper.GenerateNumericTextBox("dcdShadeBlackPer");
        HdlCommonHelper.GenerateNumericTextBox("dcdDyMcSpeed");
        HdlCommonHelper.GenerateNumericTextBox("dcdAvgCount");
        HdlCommonHelper.GenerateNumericTextBox("dcdAftLengthMtr");
        HdlCommonHelper.GenerateNumericTextBox("dcdAftLengthKg");
        HdlCommonHelper.GenerateNumericTextBox("dcdViscosity");
        HdlCommonHelper.GenerateNumericTextBox("dcdMCRunTimehh");
        HdlCommonHelper.GenerateNumericTextBox("dcdMCRunTimemm");

        $("#dcdSave").click(function () {
            DyeingConsumptionDetailsHelper.saveDyeingConsumption();
        });
        $("#dcdClear").click(function () {
            DyeingConsumptionDetailsHelper.clearDyeingConsumptionInfo();
            DyeingConsumptionDetailsSummaryHelper.clearConsumptionDetailForm();
            $("#dcdpGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                pageSize: 10,
                data: []
            }));
        });
        $("#dcdExit").click(function () {
            $("#divDyeingConsumptionDetails").hide();
            $("#divDyeingConsumptionSummary").show();
        });
        $("#dcdSetNo").change(function () {
            var setNo = $("#dcdSetNo").data("kendoComboBox").value();
            if (setNo > 0) {
                DyeingConsumptionDetailsHelper.setDyeingConsumptionInfo(setNo);
            } else {
                DyeingConsumptionDetailsHelper.clearDyeingConsumptionInfo();
            }

        });

        //Consumption Detail
        DyeingConsumptionDetailsSummaryHelper.Init();
    },
    clearDyeingConsumptionInfo: function () {
        var form = DyeingConsumptionDetailsHelper.getDyeingConsumptionInfoForm();
        form.DyeDate.value("");
        form.SetNo.value("");
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
        form.ShadeIndigo.value("");
        form.ShadeBlack.value("");
        form.AfterLengthMtr.value("");
        form.AfterWeightKg.val("")
        form.BathGPL.val("");
        form.FeedingGPL.val("")
    },
    AddToList: function () {
        var validator = $("#divDyeingProdDetailsDyeRopePartial").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            var dyeingProdDetailsGrid = $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid");
            var beemNo = $("#dcdBeamNo").val();
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
    setDyeingConsumptionInfo: function (setNo) {
        var info = DyeingConsumptionDetailsManager.getDyeingConsumptionInfo(setNo);
        if (info) {
            var form = DyeingConsumptionDetailsHelper.getDyeingConsumptionInfoForm();
            form.DyeDate.value(info.DyeDate);
            form.Unit.value(info.UnitName);
            form.PType.value(info.PType);
            form.SetLengthMtr.value(info.SetLengthMtr);
            form.SetWeightKg.value(info.SetLengthKg);
            form.YarnCounts.val(info.YarnCounts);
            form.WarpRatio.val(info.WarpRatio);
            form.NoOfBeam.value(info.NoOfBeam);
            form.NoOfCreal.value(info.NoOfCreel);
            form.TotalEnds.value(info.TotalEnd);
            form.YarnSuppliers.val(info.ProYarnSupp);
            form.YarnLot.val(info.ProYarnLot);
            form.Buyer.val(info.Buyer);
            form.ShadeIndigo.value(info.ShadePercentIndigo);
            form.ShadeBlack.value(info.ShadePercentBlack);
            form.AfterLengthMtr.value(info.AfLengthMtr);
            form.AfterWeightKg.val(info.AfLengthKg)
            form.StyleNo.value(info.StyleNo);
            form.StyleWeight.val(info.Weight);
            form.StyleWidth.val(info.Width);
            form.StyleConstruction.val(info.Construction);
            form.StyleWeave.val(info.Weave);
            form.StyleColor.val(info.ColorName);
            form.BathGPL.val(info.Bath);
            form.FeedingGPL.val(info.Feeding)
        } else {
            DyeingConsumptionDetailsHelper.clearDyeingConsumptionInfo();
        }
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
    getDyeingConsumptionInfoForm: function () {
        return {
            DID: $("#DID"),
            SetNo: $("#dcdSetNo").data("kendoComboBox"),
            DyeDate: $("#dcdProgramDate").data("kendoDatePicker"),
            Unit: $("#dcdUnit").data("kendoComboBox"),
            PType: $("#dcdProdType").data("kendoComboBox"),
            MCNo: $("#dcdMachineNo").data("kendoComboBox"),
            SetLengthMtr: $("#dcdSetLengthMtr").data("kendoNumericTextBox"),
            SetWeightKg: $("#dcdSetLengthKg").data("kendoNumericTextBox"),
            YarnCounts: $("#dcdYarnCount"),
            WarpRatio: $("#dcdWarpRatio"),
            NoOfBeam: $("#dcdNoOfBeam").data("kendoNumericTextBox"),
            RopeBeam: $("#dcdRopeBeam").data("kendoNumericTextBox"),
            NoOfCreal: $("#dcdNoOfCreal").data("kendoNumericTextBox"),
            TotalEnds: $("#dcdTotalEnds").data("kendoNumericTextBox"),
            YarnSuppliers: $("#dcdYarnSuppliers"),
            YarnLot: $("#dcdYarnLot"),
            StyleNo: $("#dcdStyleNo").data("kendoComboBox"),
            StyleWeight: $("#dcdWeight"),
            StyleConstruction: $("#dcdConstruction"),
            StyleWeave: $("#dcdWeave"),
            StyleWidth: $("#dcdWidth"),
            StyleColor: $("#dcdColor"),
            Buyer: $("#dcdBuyer"),
            ShadeIndigo: $("#dcdShadeIndigoPer").data("kendoNumericTextBox"),
            ShadeBlack: $("#dcdShadeBlackPer").data("kendoNumericTextBox"),
            ShadeMatchWith: $("#dcdShadeMatchWith"),
            MCSpeed: $("#dcdDyMcSpeed").data("kendoNumericTextBox"),
            AvgCount: $("#dcdAvgCount").data("kendoNumericTextBox"),
            AfterLengthMtr: $("#dcdAftLengthMtr").data("kendoNumericTextBox"),
            AfterWeightKg: $("#dcdAftWeightKg"),
            MCStartTime: $("#dcdMcStartTime"),
            MCSTopTime: $("#dcdMcStopTime"),
            BathGPL: $("#dcdBathGPL"),
            FeedingGPL: $("#dcdFeedingGPL"),
            Refraction: $("#dcdRefraction"),
            Viscosity: $("#dcdViscosity").data("kendoNumericTextBox"),
            RunHH: $("#dcdMCRunTimehh").data("kendoNumericTextBox"),
            RunMM: $("#dcdMCRunTimemm").data("kendoNumericTextBox"),
            Remarks: $("#dcdRemarks")
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
    saveDyeingConsumption: function () {
        var setNo = $("#dcdSetNo").val();
        var gridData = $("#dcdpGrid").data("kendoGrid").dataSource.data();
        var model = JSON.parse(JSON.stringify(gridData));
        DyeingConsumptionDetailsManager.saveDyeingConsumption(setNo, model);
    }
};