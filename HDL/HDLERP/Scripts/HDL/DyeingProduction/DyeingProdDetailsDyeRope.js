
var DyeingProdDetailsDyeRopeManager = {
    dyeRopes: []
};
var DyeingProdDetailsDyeRopeHelper = {
    InitDyeingProdDetailsDyeRope: function () {
        DyeingProdDetailsDyeRopeSummaryHelper.InitDyeingProdDetailsDyeRopeSummary();

        HdlCommonHelper.GenerateDatePicker("txtDyeDate");
        HdlCommonHelper.GenerateShiftCombo("cmbShift");
        HdlCommonHelper.RopeDyePOCombo("cmbPO");
        HdlCommonHelper.RopeDyeOPCombo("cmbOperator");
        HdlCommonHelper.RopeDyeCMCombo("cmbColorMan");
        HdlCommonHelper.RopeDyeCPCombo("cmbCaptain");
        HdlCommonHelper.GenerateNumericTextBox("numBallNo");
        HdlCommonHelper.GenerateNumericTextBox("numCanNo");
        HdlCommonHelper.GenerateNumericTextBox("numWarpLength");
        HdlCommonHelper.GenerateNumericTextBox("numDyeLength");
        HdlCommonHelper.GenerateNumericTextBox("numSpeed");

        $("#btnNewDetailsRopeDye").click(function () {
            var model = DyeingProdDetailsDyeRopeHelper.GetDyeingProdDetailsDyeRopeModel();
            DyeingProdDetailsDyeRopeSummaryManager.gridDataSource().read();
            DyeingProdDetailsDyeRopeHelper.ClearDyeingProdDetailsDyeRopeForm();
        });
        $("#btnUpdateWarpDetailsRopeDye").click(function () {
            var model = DyeingProdDetailsDyeRopeHelper.GetDyeingProdDetailsDyeRopeModel();
            console.log(model)
        });
        $("#btnAddToListRopeDye").click(function () {
            var validator = $("#divDyeingProdDetailsDyeRopePartial").kendoValidator().data("kendoValidator");
            if (validator.validate()) {
                var duid = $("#duid").val();
                var dyeRopeGrid = $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid");
                var data = dyeRopeGrid.dataSource.data();
                var model = DyeingProdDetailsDyeRopeHelper.GetDyeingProdDetailsDyeRopeModel();
                model.iid = kendo.guid();
                console.log(duid);
                if (duid) {
                    console.log(1);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].iid == duid) {
                            data[i] = model;
                        }
                    }
                } else {
                    data.push(model);
                }

                dyeRopeGrid.setDataSource(new kendo.data.DataSource({
                    pageSize: 10,
                    data: data
                }));
                $("#duid").val("");
                DyeingProdDetailsDyeRopeHelper.ClearDyeingProdDetailsDyeRopeForm();

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
        });
        $("#dAddNew").click(function () {
            $("#duid").val("");
            DyeingProdDetailsDyeRopeHelper.ClearDyeingProdDetailsDyeRopeForm();
        })

        DyeingProdDetailsDyeRopeHelper.ClearDyeingProdDetailsDyeRopeForm();

    },
    GetDyeingProdDetailsDyeRopeForm: function () {
        return {
            //DIID:$("#DIID"),
            DID: $("#DID"),
            DDate: $("#txtDyeDate").data("kendoDatePicker"),
            ShiftCode: $("#cmbShift").data("kendoComboBox"),
            BallNo: $("#numBallNo").data("kendoNumericTextBox"),
            CanNo: $("#numCanNo").data("kendoNumericTextBox"),
            WarpLength: $("#numWarpLength").data("kendoNumericTextBox"),
            DyLength: $("#numDyeLength").data("kendoNumericTextBox"),
            Speed: $("#numSpeed").data("kendoNumericTextBox"),
            PO: $("#cmbPO").data("kendoComboBox"),
            OP: $("#cmbOperator").data("kendoComboBox"),
            ColorMan: $("#cmbColorMan").data("kendoComboBox"),
            Captain: $("#cmbCaptain").data("kendoComboBox"),
            StopMark: $("#txtStopMark"),
            Lapper: $("#txtBathLapper"),
            CreelLapper: $("#txtCreelLapper"),
            RopeCut: $("#RopeCutDye"),
            Remarks: $("#txtRemark"),
            CutEndsWr: $("#txtCutEndWr")
        }
    },
    SetDyeingProdDetailsDyeRopeForm: function (SelectedItem) {
        var form = DyeingProdDetailsDyeRopeHelper.GetDyeingProdDetailsDyeRopeForm();
        //form.DIID.val(SelectedItem.DIID);
        form.DID.val(SelectedItem.DID);
        form.DDate.value(SelectedItem.DDate);
        form.ShiftCode.value(SelectedItem.ShiftCode);
        form.BallNo.value(SelectedItem.BallNo);
        form.CanNo.value(SelectedItem.CanNo);
        form.WarpLength.value(SelectedItem.WarpLength);
        form.DyLength.value(SelectedItem.DyLength);
        form.Speed.value(SelectedItem.Speed);
        form.PO.value(SelectedItem.PO);
        form.OP.value(SelectedItem.OP);
        form.ColorMan.value(SelectedItem.ColorMan);
        form.Captain.value(SelectedItem.Captain);
        form.StopMark.val(SelectedItem.StopMark);
        form.Lapper.val(SelectedItem.Lapper);
        form.CreelLapper.val(SelectedItem.CreelLapper);
        form.RopeCut.val(SelectedItem.RopeCut);
        form.CutEndsWr.val(SelectedItem.CutEndsWr);
        form.Remarks.val(SelectedItem.Remarks);
    },
    GetDyeingProdDetailsDyeRopeModel: function () {
        var form = DyeingProdDetailsDyeRopeHelper.GetDyeingProdDetailsDyeRopeForm();
        return {
            DID: form.DID.val(),
            DDate: form.DDate.value(),
            ShiftName: form.ShiftCode.text(),
            ShiftCode: form.ShiftCode.value(),
            BallNo: form.BallNo.value(),
            CanNo: form.CanNo.value(),
            WarpLength: form.WarpLength.value(),
            DyLength: form.DyLength.value(),
            Speed: form.Speed.value(),
            PO: form.PO.text(),
            POName: form.PO.text(),
            OP: form.OP.text(),
            OPName: form.OP.text(),
            ColorMan: form.ColorMan.text(),
            ColorManName: form.ColorMan.text(),
            Captain: form.Captain.text(),
            CaptainName: form.Captain.text(),
            StopMark: form.StopMark.val(),
            Lapper: form.Lapper.val(),
            CreelLapper: form.CreelLapper.val(),
            RopeCut: form.RopeCut.val(),
            CutEndsWr: form.CutEndsWr.val(),
            Remarks: form.Remarks.val(),
        }
    },
    ClearDyeingProdDetailsDyeRopeForm: function () {
        var form = DyeingProdDetailsDyeRopeHelper.GetDyeingProdDetailsDyeRopeForm();
        //form.DIID.val("");
        //form.DID.val("");
        form.DDate.value("");
        form.ShiftCode.value("");
        form.BallNo.value("");
        form.CanNo.value("");
        form.WarpLength.value("");
        form.DyLength.value("");
        form.Speed.value("");
        form.PO.value("");
        form.OP.value("");
        form.ColorMan.value("");
        form.Captain.value("");
        form.StopMark.val("");
        form.Lapper.val("");
        form.CreelLapper.val("");
        form.RopeCut.val("");
        form.CutEndsWr.val("");
        form.Remarks.val("");
    },
};

//[{"DIID":1,"DID":2,"DDate":"\/Date(1542996000000)\/","ShiftCode":1,"BallNo":1,"CanNo":1,"WarpLength":1.0000,"DyLength":1.0000,"Speed":1.0000,"PO":"1","OP":"1","ColorMan":"1","Captain":"1","StopMark":1,"Lapper":1,"CreelLapper":1,"RopeCut":1,"CutEndsWr":1,"Remarks":"1"}]