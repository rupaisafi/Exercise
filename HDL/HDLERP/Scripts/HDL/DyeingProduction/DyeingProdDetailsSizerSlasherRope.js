var DyeingProdDetailsSizerSlasherRopeManager = {
    slasherRopes: []
};

var DyeingProdDetailsSizerSlasherRopeHelper = {
    InitDyeingProdDetailsSizerSlasherRope: function () {

        DyeingProdDetailsSizerSlasherRopeSummaryHelper.InitDyeingProdDetailsSizerSlasherRopeSummary();

        HdlCommonHelper.GenerateDatePicker("sizingDate");
        HdlCommonHelper.GenerateShiftCombo("sizingShift");
        HdlCommonHelper.GenerateNumericTextBox("sizingSSNo");
        HdlCommonHelper.GenerateNumericTextBox("sizingLength");
        HdlCommonHelper.SlasherPOCombo("sizingPO");
        HdlCommonHelper.SlasherSZCombo("sizingSizer");
        HdlCommonHelper.SlasherDOCombo("sizingDO");
        HdlCommonHelper.SlasherCPCombo("sizingCaptain");
        HdlCommonHelper.RopeDyeCPCombo("sizingRopeDyeCap");
        HdlCommonHelper.RopeDyePOCombo("sizingRopeDyePO");
        HdlCommonHelper.GenerateNumericTextBox("sizingStickyEndsLeft");
        HdlCommonHelper.GenerateNumericTextBox("sizingStickyEndsRight");
        HdlCommonHelper.GenerateNumericTextBox("sizingBreakagePoint");
        HdlCommonHelper.GenerateNumericTextBox("sizingStopTime");
        HdlCommonHelper.GenerateStoppageCombo("sizingStoppage");
        HdlCommonHelper.GenerateNumericTextBox("sizingLapperCreel");
        HdlCommonHelper.GenerateNumericTextBox("sizingLapperDyeing");
        HdlCommonHelper.GenerateNumericTextBox("sizingLapperSizing");
        HdlCommonHelper.GenerateNumericTextBox("sizingNoOfLapper");
        HdlCommonHelper.GenerateLapperTypeCombo("sizingLapperType");
        HdlCommonHelper.GenerateSizingMcCombo("txtSizingMC");

        $("#sbtnAddToList").click(function () {
            var validator = $("#divWarpingProdDetailsPartial").kendoValidator().data("kendoValidator");
            if (validator.validate()) {
                var suid = $("#suid");
                var sizingGrid = $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid");
                DyeingProdDetailsSizerSlasherRopeManager.slasherRopes = sizingGrid.dataSource.data();
                var model = DyeingProdDetailsSizerSlasherRopeHelper.GetDyeingProdDetailsSizerSlasherRopeModel();
                model.iid = kendo.guid();
                console.log(suid.val())
                if (suid.val()) {
                    console.log(1);
                    for (var i = 0; i < DyeingProdDetailsSizerSlasherRopeManager.slasherRopes.length; i++) {
                        if (DyeingProdDetailsSizerSlasherRopeManager.slasherRopes[i].iid = suid.val()) {
                            DyeingProdDetailsSizerSlasherRopeManager.slasherRopes[i] = model;
                        }
                    }
                } else {
                    console.log(2);
                    DyeingProdDetailsSizerSlasherRopeManager.slasherRopes.push(model);
                }
                var gridDataSource1 = new kendo.data.DataSource({
                    pageSize: 10,
                    data: DyeingProdDetailsSizerSlasherRopeManager.slasherRopes
                });
                sizingGrid.setDataSource(gridDataSource1);
                suid.val("");
                DyeingProdDetailsSizerSlasherRopeHelper.ClearDyeingProdDetailsSizerSlasherRopeForm();
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Warning', "Please fill all the required field",
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
        });
        $("#sbtnClear").click(function () {
            DyeingProdDetailsSizerSlasherRopeHelper.ClearDyeingProdDetailsSizerSlasherRopeForm();
        });

    },
    GetDyeingProdDetailsSizerSlasherRopeForm: function () {
        return {
            DID: $("#DID"),
            SDate: $("#sizingDate").data("kendoDatePicker"),
            ShiftCode: $("#sizingShift").data("kendoComboBox"),
            ShiftName: $("#sizingShift").data("kendoComboBox"),
            SSNo: $("#sizingSSNo").data("kendoNumericTextBox"),
            BeamNo: $("#sizingBeamNo"),
            Length: $("#sizingLength").data("kendoNumericTextBox"),
            PO: $("#sizingPO").data("kendoComboBox"),
            Sizer: $("#sizingSizer").data("kendoComboBox"),
            DO: $("#sizingDO").data("kendoComboBox"),
            Captain: $("#sizingCaptain").data("kendoComboBox"),
            RopeDyeCap: $("#sizingRopeDyeCap").data("kendoComboBox"),
            RopeDyePO: $("#sizingRopeDyePO").data("kendoComboBox"),
            StickyEndsLeft: $("#sizingStickyEndsLeft").data("kendoNumericTextBox"),
            StickyEndsRight: $("#sizingStickyEndsRight").data("kendoNumericTextBox"),
            BrkgPoint: $("#sizingBreakagePoint").data("kendoNumericTextBox"),
            StopTime: $("#sizingStopTime").data("kendoNumericTextBox"),
            Stoppage: $("#sizingStoppage").data("kendoComboBox"),
            LapperCreel: $("#sizingLapperCreel").data("kendoNumericTextBox"),
            LapperDyeing: $("#sizingLapperDyeing").data("kendoNumericTextBox"),
            LapperSizing: $("#sizingLapperSizing").data("kendoNumericTextBox"),
            NoOfLapper: $("#sizingNoOfLapper").data("kendoNumericTextBox"),
            LapperType: $("#sizingLapperType").data("kendoComboBox"),
            SizingCode: $("#txtSizingMC").data("kendoComboBox"),
            SizingMC: $("#txtSizingMC").data("kendoComboBox"),
            Remarks: $("#txtSizingremarks"),
        }
    },
    SetDyeingProdDetailsSizerSlasherRopeForm: function (SelectedItem) {
        //DID, SDate, ShiftCode, ShiftName, SSNo, BeamNo, Length, PO, Sizer, DO, Captain, RopeDyeCap, RopeDyePO, StickyEndsLeft,
        //StickyEndsRight, BrkgPoint, StopTime, Stoppage, LapperCreel, LapperDyeing, LapperSizing, NoOfLapper, LapperType,
        //SizingCode, SizingMC, Remarks
        var form = DyeingProdDetailsSizerSlasherRopeHelper.GetDyeingProdDetailsSizerSlasherRopeForm();
        //form.DIID.val(SelectedItem.DIID);
        form.DID.val(SelectedItem.DID);
        form.SDate.value(SelectedItem.SDate);
        form.ShiftCode.value(SelectedItem.ShiftCode);
        form.ShiftName.value(SelectedItem.ShiftName);
        form.SSNo.value(SelectedItem.SSNo);
        form.BeamNo.val(SelectedItem.BeamNo);
        form.Length.value(SelectedItem.Length);
        form.PO.value(SelectedItem.PO);
        form.Sizer.value(SelectedItem.Sizer);
        form.DO.value(SelectedItem.DO);
        form.Captain.value(SelectedItem.Captain);
        form.RopeDyeCap.value(SelectedItem.RopeDyeCap);
        form.RopeDyePO.value(SelectedItem.RopeDyePO);
        form.StickyEndsLeft.value(SelectedItem.StickyEndsLeft);
        form.StickyEndsRight.value(SelectedItem.StickyEndsRight);
        form.BrkgPoint.value(SelectedItem.BrkgPoint);
        form.StopTime.value(SelectedItem.StopTime);
        form.Stoppage.value(SelectedItem.Stoppage);
        form.LapperCreel.value(SelectedItem.LapperCreel);
        form.LapperDyeing.value(SelectedItem.LapperDyeing);
        form.LapperSizing.value(SelectedItem.LapperSizing);
        form.NoOfLapper.value(SelectedItem.NoOfLapper);
        form.LapperType.value(SelectedItem.LapperType);
        form.SizingCode.value(SelectedItem.SizingCode);
        form.SizingMC.value(SelectedItem.SizingMC);
        form.Remarks.val(SelectedItem.Remarks);
    },
    GetDyeingProdDetailsSizerSlasherRopeModel: function () {
        var form = DyeingProdDetailsSizerSlasherRopeHelper.GetDyeingProdDetailsSizerSlasherRopeForm();
        return {
            DID: form.DID.val(),
            SDate: form.SDate.value(),
            ShiftCode: form.ShiftCode.value(),
            ShiftName: form.ShiftName.text(),
            SSNo: form.SSNo.value(),
            BeamNo: form.BeamNo.val(),
            Length: form.Length.value(),
            PO: form.PO.text(),
            Sizer: form.Sizer.text(),
            DO: form.DO.text(),
            Captain: form.Captain.text(),
            RopeDyeCap: form.RopeDyeCap.text(),
            RopeDyePO: form.RopeDyePO.text(),
            StickyEndsLeft: form.StickyEndsLeft.value(),
            StickyEndsRight: form.StickyEndsRight.value(),
            BrkgPoint: form.BrkgPoint.value(),
            StopTime: form.StopTime.value(),
            Stoppage: form.Stoppage.text(),
            LapperCreel: form.LapperCreel.value(),
            LapperDyeing: form.LapperDyeing.value(),
            LapperSizing: form.LapperSizing.value(),
            NoOfLapper: form.NoOfLapper.value(),
            LapperType: form.LapperType.text(),
            SizingCode: form.SizingCode.value(),
            SizingMC: form.SizingMC.text(),
            Remarks: form.Remarks.val()
        }
    },
    ClearDyeingProdDetailsSizerSlasherRopeForm: function () {
        var form = DyeingProdDetailsSizerSlasherRopeHelper.GetDyeingProdDetailsSizerSlasherRopeForm();
        //DID, SDate, ShiftCode, ShiftName, SSNo, BeamNo, Length, PO, Sizer, DO, Captain, RopeDyeCap, RopeDyePO, StickyEndsLeft,
        //StickyEndsRight, BrkgPoint, StopTime, Stoppage, LapperCreel, LapperDyeing, LapperSizing, NoOfLapper, LapperType,
        //SizingCode, SizingMC, Remarks
        form.SDate.value("");
        form.ShiftCode.value("");
        form.SSNo.value("");
        form.BeamNo.val("");
        form.Length.value("");
        form.PO.value("");
        form.Sizer.value("");
        form.DO.value("");
        form.Captain.value("");
        form.RopeDyeCap.value("");
        form.RopeDyePO.value("");
        form.StickyEndsLeft.value("");
        form.StickyEndsRight.value("");
        form.BrkgPoint.value("");
        form.StopTime.value("");
        form.Stoppage.value("");
        form.LapperCreel.value("");
        form.LapperDyeing.value("");
        form.LapperSizing.value("");
        form.NoOfLapper.value("");
        form.LapperType.value("");
        form.SizingCode.value("");
        form.SizingMC.value("");
        form.Remarks.val("");
    },
};
