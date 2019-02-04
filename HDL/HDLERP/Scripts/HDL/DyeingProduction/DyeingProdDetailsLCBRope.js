var DyeingProdDetailsLCBRopeManager = {
    lcbRopes: []
};
var DyeingProdDetailsLCBRopeHelper = {
    InitDyeingProdDetailsLCBRope: function () {
        var helper = this;
        DyeingProdDetailsLCBRopeSummaryHelper.InitDyeingProdDetailsLCBRopeSummary();

        HdlCommonHelper.GenerateDatePicker("ldate");
        HdlCommonHelper.GenerateShiftCombo("lshift");
        HdlCommonHelper.LCBMcNoCombo("lmcno");
        HdlCommonHelper.GenerateNumericTextBox("lcanno");
        HdlCommonHelper.GenerateNumericTextBox("llength");
        HdlCommonHelper.GenerateNumericTextBox("lspeed");
        HdlCommonHelper.LCBPOCombo("lpo");
        HdlCommonHelper.LCBOPCombo("loperator");
        HdlCommonHelper.LCBSVCombo("lsupervisor")
        HdlCommonHelper.LCBQCCombo("lqc");
        HdlCommonHelper.GenerateNumericTextBox("ltension");
        HdlCommonHelper.GenerateNumericTextBox("lbreakage");
        HdlCommonHelper.GenerateNumericTextBox("lcutendsdye");
        HdlCommonHelper.LCBDyeCapCutEndCombo("ldyecapcutend").bind("cascade", function (e) {
            console.log(e);
        });
        HdlCommonHelper.LCBDyeOpCutEndCombo("ldyeopcutend");
        HdlCommonHelper.GenerateDyeingEmployeCombo("ldyopcend");
        HdlCommonHelper.GenerateNumericTextBox("llooseendwarp");
        HdlCommonHelper.GenerateNumericTextBox("lropecutlcb");
        HdlCommonHelper.GenerateNumericTextBox("lreedtime");

        $("#lbtnAddToList").click(function () {
            helper.AddToList();
        });
        $("#lbtnAddNew").click(function () {
            DyeingProdDetailsLCBRopeHelper.ClearDyeingProdDetailsLCBRopeForm();
        });
    },
    AddToList: function () {
        var validator = $("#divDyeingProdDetailsLCBPartial").kendoValidator().data("kendoValidator");
        if (validator.validate()) {
            var luid = $("#luid");
            var lcbGrid = $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid");
            DyeingProdDetailsLCBRopeManager.lcbRopes = lcbGrid.dataSource.data();
            var model = DyeingProdDetailsLCBRopeHelper.GetDyeingProdDetailsLCBRopeModel();
            model.iid = kendo.guid();
            if (luid.val()) {
                console.log(1);
                for (var i = 0; i < DyeingProdDetailsLCBRopeManager.lcbRopes.length; i++) {
                    if (DyeingProdDetailsLCBRopeManager.lcbRopes[i].iid == luid.val()) {
                        DyeingProdDetailsLCBRopeManager.lcbRopes[i] == model;
                    }
                }
            } else {
                console.log(2);
                DyeingProdDetailsLCBRopeManager.lcbRopes.push(model);
            }

            var gridDataSource = new kendo.data.DataSource({
                pageSize: 10,
                data: DyeingProdDetailsLCBRopeManager.lcbRopes
            });
            lcbGrid.setDataSource(gridDataSource);
            luid.val("");
            DyeingProdDetailsLCBRopeHelper.ClearDyeingProdDetailsLCBRopeForm();
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
    GetDyeingProdDetailsLCBRopeForm: function () {
        //DID,LDate,ShiftCode,CanNo,BeamNo,MCNo,Speed,LCBLength,PO,OP,SVisor,Tension,Brkg,CuttingEnds,LooseEnd,
        //RopeCut, Remarks, ReedTime, DyCaptainCEnd, QC, DyOPCEnd
        return {
            DID: $("#DID"),
            LDate: $("#ldate").data("kendoDatePicker"),
            ShiftCode: $("#lshift").data("kendoComboBox"),
            CanNo: $("#lcanno").data("kendoNumericTextBox"),
            BeamNo: $("#lbeamno"),
            MCNo: $("#lmcno").data("kendoComboBox"),
            Speed: $("#lspeed").data("kendoNumericTextBox"),
            LCBLength: $("#llength").data("kendoNumericTextBox"),
            PO: $("#lpo").data("kendoComboBox"),
            OP: $("#loperator").data("kendoComboBox"),
            SVisor: $("#lsupervisor").data("kendoComboBox"),
            Tension: $("#ltension").data("kendoNumericTextBox"),
            Brkg: $("#lbreakage").data("kendoNumericTextBox"),
            CuttingEnds: $("#lcutendsdye").data("kendoNumericTextBox"),
            LooseEnd: $("#llooseendwarp").data("kendoNumericTextBox"),
            RopeCut: $("#lropecutlcb").data("kendoNumericTextBox"),
            ReedTime: $("#lreedtime").data("kendoNumericTextBox"),
            DyCaptainCEnd: $("#ldyecapcutend").data("kendoComboBox"),
            QC: $("#lqc").data("kendoComboBox"),
            DyOPCEnd: $("#ldyeopcutend").data("kendoComboBox"),
            Remarks: $("#lremarks"),
        }
    },
    SetDyeingProdDetailsLCBRopeForm: function (SelectedItem) {
        var form = DyeingProdDetailsLCBRopeHelper.GetDyeingProdDetailsLCBRopeForm();
        //form.DIID.val(SelectedItem.DIID);
        form.DID.val(SelectedItem.DID);
        form.LDate.value(SelectedItem.LDate);
        form.ShiftCode.value(SelectedItem.ShiftCode);
        form.CanNo.value(SelectedItem.BallNo);
        form.CanNo.value(SelectedItem.CanNo);
        form.BeamNo.val(SelectedItem.BeamNo);
        form.MCNo.value(SelectedItem.MCNo);
        form.Speed.value(SelectedItem.Speed);
        form.LCBLength.value(SelectedItem.LCBLength);
        form.PO.value(SelectedItem.PO);
        form.OP.value(SelectedItem.OP);
        form.SVisor.value(SelectedItem.SVisor);
        form.Tension.value(SelectedItem.Tension);
        form.Brkg.value(SelectedItem.Brkg);
        form.CuttingEnds.value(SelectedItem.CuttingEnds);
        form.LooseEnd.value(SelectedItem.LooseEnd);
        form.RopeCut.value(SelectedItem.RopeCut);
        form.ReedTime.value(SelectedItem.ReedTime);
        form.DyCaptainCEnd.value(SelectedItem.DyCaptainCEnd);
        form.QC.value(SelectedItem.QC);
        form.DyOPCEnd.value(SelectedItem.DyOPCEnd);
        form.Remarks.val(SelectedItem.Remarks);
    },
    GetDyeingProdDetailsLCBRopeModel: function () {
        var form = DyeingProdDetailsLCBRopeHelper.GetDyeingProdDetailsLCBRopeForm();
        return {
            DID: form.DID.val(),
            LDate: form.LDate.value(),
            ShiftCode: form.ShiftCode.value(),
            ShiftName: form.ShiftCode.text(),
            CanNo: form.CanNo.value(),
            BeamNo: form.BeamNo.val(),
            MCNo: form.MCNo.text(),
            Speed: form.Speed.value(),
            LCBLength: form.LCBLength.value(),
            PO: form.PO.text(),
            OP: form.OP.text(),
            SVisor: form.SVisor.text(),
            Tension: form.Tension.value(),
            Brkg: form.Brkg.value(),
            CuttingEnds: form.CuttingEnds.value(),
            LooseEnd: form.LooseEnd.value(),
            RopeCut: form.RopeCut.value(),
            ReedTime: form.ReedTime.value(),
            DyCaptainCEnd: form.DyCaptainCEnd.text(),
            QC: form.QC.text(),
            DyOPCEnd: form.DyOPCEnd.text(),
            Remarks: form.Remarks.val(),
        }
    },
    ClearDyeingProdDetailsLCBRopeForm: function () {
        var form = DyeingProdDetailsLCBRopeHelper.GetDyeingProdDetailsLCBRopeForm();
        form.LDate.value("");
        form.ShiftCode.value("");
        form.CanNo.value("");
        form.BeamNo.val("");
        form.MCNo.value("");
        form.Speed.value("");
        form.LCBLength.value("");
        form.PO.value("");
        form.OP.value("");
        form.SVisor.value("");
        form.Tension.value("");
        form.Brkg.value("");
        form.CuttingEnds.value("");
        form.LooseEnd.value("");
        form.RopeCut.value("");
        form.ReedTime.value("");
        form.DyCaptainCEnd.value("");
        form.QC.value("");
        form.DyOPCEnd.value("");
        form.Remarks.val("");
    },
    setDyeCapCutEnd:function (setNo) {
        var data = HdlCommonManager.GetAllDyeCapCutEnd(setNo);
        $("#ldyeopcutend").data("kendoComboBox").setDataSource(
            new kendo.data.DataSource({
                data: data
            })
        );
    },
    clearDyeCapCutEnd:function (setNo) {
        $("#ldyeopcutend").data("kendoComboBox").setDataSource(
            new kendo.data.DataSource({
                data: []
            })
        );
    }
};


