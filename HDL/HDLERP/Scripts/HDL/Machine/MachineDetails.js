
var MachineDetailsManager = {
    SaveMachine: function() {
        var validator = $("#divMachineDetails").kendoValidator().data("kendoValidator");
        var status = $(".status");
        var machineObj;

        var onSuccess = function(jsonData) {
            var msg = "";
            if (machineObj.MID == 0) {
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
                        onClick: function($noty) {
                            $noty.close();
                            $("#grdMachineSummary").data("kendoGrid").dataSource.read();
                            MachineDetailsHelper.ClearForm();
                        }
                    }
                ]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Error1', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function($noty) {
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
            machineObj = MachineDetailsHelper.CreateMachineObject();
            var strMachine = JSON.stringify(machineObj);
            var jsonParam = 'machineEntity:' + strMachine;
            var serviceUrl = "../Machine/SaveMachine/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

    }
};

var MachineDetailsHelper = {
    InitMachineDetails: function() {

        HdlCommonHelper.GenerateUnitCombo("cmbUnitCode");
        HdlCommonHelper.GenerateGroupCombo("cmbGCode");
        //HdlCommonHelper.GenerateT

        MachineDetailsHelper.GenerateNumericTextBox();

        $("#btnSave").click(function() {
            MachineDetailsManager.SaveMachine();
        });
        $("#btnClear").click(function() {
            MachineDetailsHelper.ClearForm();
        });
    },

    CreateMachineObject: function() {
        var obj = new Object();
        obj.MID = $("#hdnMID").val();
        obj.UnitCode = $("#cmbUnitCode").data("kendoComboBox").value();
        obj.MNo = $("#txtMNo").data("kendoNumericTextBox").value();
        obj.MName = $("#txtMName").val();
        obj.MachineName = $("#txtMachineName").val();
        obj.GCode = $("#cmbGCode").data("kendoComboBox").value();
        obj.UCode = 0; //$("#cmbUCode").data("kendoComboBox").value();
        obj.TCode = 0; //$("#cmbTCode").data("kendoComboBox").value();
        obj.NoOfMC = $("#txtNoOfMC").data("kendoNumericTextBox").value();
        obj.TotalMC = $("#txtTotalMC").data("kendoNumericTextBox").value();
        obj.ProdCapacity = $("#txtProdCapacity").data("kendoNumericTextBox").value();
        obj.Unit = $("#txtUnit").val();
        obj.CapacityRPM = $("#txtCapacityRPM").data("kendoNumericTextBox").value();
        obj.CountryOfOrgin = $("#txtCountryOfOrgin").val();
        obj.Prod = $("#txtProd").data("kendoNumericTextBox").value();
        obj.Remarks = $("#txtRemarks").val();
        obj.PickPday = $("#txtPickPday").data("kendoNumericTextBox").value();

        return obj;
    },

    FillForm: function(obj) {

        $("#hdnMID").val(obj.MID);
        $("#cmbUnitCode").data("kendoComboBox").value(obj.UnitCode);
        $("#txtMNo").data("kendoNumericTextBox").value(obj.MNo);
        $("#txtMName").val(obj.MName);
        $("#txtMachineName").val(obj.MachineName);
        $("#cmbGCode").data("kendoComboBox").value(obj.GCode);
        //$("#cmbUCode").data("kendoComboBox").value(obj.UCode);
        //$("#cmbTCode").data("kendoComboBox").value(obj.TCode);
        $("#txtNoOfMC").data("kendoNumericTextBox").value(obj.NoOfMC);
        $("#txtTotalMC").data("kendoNumericTextBox").value(obj.TotalMC);
        $("#txtProdCapacity").data("kendoNumericTextBox").value(obj.ProdCapacity);
        $("#txtUnit").val(obj.Unit);
        $("#txtCapacityRPM").data("kendoNumericTextBox").value(obj.CapacityRPM);
        $("#txtCountryOfOrgin").val(obj.CountryOfOrgin);
        $("#txtProd").data("kendoNumericTextBox").value(obj.Prod);
        $("#txtRemarks").val(obj.Remarks);
        $("#txtPickPday").data("kendoNumericTextBox").value(obj.PickPday);
    },

    ClearForm: function() {

        $("#hdnMID").val(0);
        $("#cmbUnitCode").data("kendoComboBox").value(0);
        $("#txtMNo").data("kendoNumericTextBox").value("");
        $("#txtMName").val("");
        $("#txtMachineName").val("");
        $("#cmbGCode").data("kendoComboBox").value(0);
        //$("#cmbUCode").data("kendoComboBox").value(0);
        //$("#cmbTCode").data("kendoComboBox").value(0);
        $("#txtNoOfMC").data("kendoNumericTextBox").value("");
        $("#txtTotalMC").data("kendoNumericTextBox").value("");
        $("#txtProdCapacity").data("kendoNumericTextBox").value("");
        $("#txtUnit").val("");
        $("#txtCapacityRPM").data("kendoNumericTextBox").value("");
        $("#txtCountryOfOrgin").val("");
        $("#txtProd").data("kendoNumericTextBox").value("");
        $("#txtRemarks").val("");
        $("#txtPickPday").data("kendoNumericTextBox").value("");

        $("#divMachineDetails > form").kendoValidator();
        $("#divMachineDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    GenerateNumericTextBox: function() {
        $("#txtMNo").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtNoOfMC").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtTotalMC").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtProdCapacity").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtCapacityRPM").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtProd").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtPickPday").kendoNumericTextBox({ format: "#", min: 0 });
    }

};