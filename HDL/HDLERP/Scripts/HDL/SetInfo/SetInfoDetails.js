
var SetInfoDetailsManager = {
    SaveSetInfo: function () {
        var validator = $("#divSetInfoDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");

        var onSuccess = function (jsonData) {
            var msg = "";
            if (setObj.SetId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#grdSetInfoSummary").data("kendoGrid").dataSource.read();
                            SetInfoDetailsHelper.ClearForm();
                        }
                    }
                ]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Error1', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
            }
        };

        var onFailed = function(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
            [
                {
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        $noty.close();
                    }
                }
            ]);
        };

        if (validator.validate()) {
            var setObj = SetInfoDetailsHelper.CreateSetObject();
            var strSet = JSON.stringify(setObj);
            var jsonParam = 'setInfoEntity:' + strSet;
            var serviceUrl = "../SetInfo/SaveSetInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        
    }
}

var SetInfoDetailsHelper = {
    InitSetInfoDetails: function () {

        SetInfoDetailsHelper.GenerateDatePicker();
        SetInfoDetailsHelper.GenerateNumericTextBox();
        HdlCommonHelper.GenerateSetProductionTypeCombo("cmbProductionTypeCode");
        HdlCommonHelper.GenerateSetStatusCombo("cmbSetStatusCode");

        $("#btnSave").click(function () {
            SetInfoDetailsManager.SaveSetInfo();
        });
        $("#btnClear").click(function () {
            SetInfoDetailsHelper.ClearForm();
        });
    },

    CreateSetObject: function () {
        var obj = new Object();
        obj.SetId = $("#hdnSetId").val();
        obj.SetNo = $("#txtSetNo").data("kendoNumericTextBox").value();
        obj.WarpDate = $("#txtWarpDate").data("kendoDatePicker").value();
        obj.Length = $("#txtLength").data("kendoNumericTextBox").value();
        obj.EndsPerBeam = $("#txtEndsPerBeam").data("kendoNumericTextBox").value();
        obj.TotalBeam = $("#txtTotalBeam").data("kendoNumericTextBox").value();
        obj.TotalEnds = $("#txtTotalEnds").data("kendoNumericTextBox").value();
        obj.DrumPreasure = $("#txtDrumPreasure").data("kendoNumericTextBox").value();
        obj.YarnTension = $("#txtYarnTension").val();
        obj.BeamCreel = $("#txtBeamCreel").data("kendoNumericTextBox").value();
        obj.MachineNo = $("#txtMachineNo").val();
        obj.ProductionTypeCode = $("#cmbProductionTypeCode").data("kendoComboBox").value();
        obj.SetStatusCode = $("#cmbSetStatusCode").data("kendoComboBox").value();
        obj.Remarks = $("#txtRemarks").val();

        return obj;
    },

    FillForm: function (obj) {
        $("#hdnSetId").val(obj.SetId);
        $("#txtSetNo").data("kendoNumericTextBox").value(obj.SetNo);
        $("#txtWarpDate").data("kendoDatePicker").value(new Date(obj.WarpDate));
        $("#txtLength").data("kendoNumericTextBox").value(obj.Length);
        $("#txtEndsPerBeam").data("kendoNumericTextBox").value(obj.EndsPerBeam);
        $("#txtTotalBeam").data("kendoNumericTextBox").value(obj.TotalBeam);
        $("#txtTotalEnds").data("kendoNumericTextBox").value(obj.TotalEnds);
        $("#txtDrumPreasure").data("kendoNumericTextBox").value(obj.DrumPreasure);
        $("#txtYarnTension").val(obj.YarnTension);
        $("#txtBeamCreel").data("kendoNumericTextBox").value(obj.BeamCreel);
        $("#txtMachineNo").val(obj.MachineNo);
        $("#cmbProductionTypeCode").data("kendoComboBox").value(obj.ProductionTypeCode);
        $("#cmbSetStatusCode").data("kendoComboBox").value(obj.SetStatusCode);
        $("#txtRemarks").val(obj.Remarks);
    },

    ClearForm: function () {
        $("#hdnSetId").val();
        $("#txtSetNo").data("kendoNumericTextBox").value('');
        $("#txtWarpDate").data("kendoDatePicker").value(new Date());
        $("#txtLength").data("kendoNumericTextBox").value('');
        $("#txtEndsPerBeam").data("kendoNumericTextBox").value('');
        $("#txtTotalBeam").data("kendoNumericTextBox").value('');
        $("#txtTotalEnds").data("kendoNumericTextBox").value('');
        $("#txtDrumPreasure").data("kendoNumericTextBox").value('');
        $("#txtYarnTension").val('');
        $("#txtBeamCreel").data("kendoNumericTextBox").value('');
        $("#txtMachineNo").val('');
        $("#cmbProductionTypeCode").data("kendoComboBox").value(0);
        $("#cmbSetStatusCode").data("kendoComboBox").value(0);
        $("#txtRemarks").val('');

        $("#divSetInfoDetails > form").kendoValidator();
        $("#divSetInfoDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    GenerateDatePicker: function () {
        $("#txtWarpDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
    },

    GenerateNumericTextBox: function () {
        $("#txtSetNo").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtLength").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtEndsPerBeam").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtTotalBeam").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtTotalEnds").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtDrumPreasure").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtBeamCreel").kendoNumericTextBox({ format: "#.##", min: 0 });
    }

}
