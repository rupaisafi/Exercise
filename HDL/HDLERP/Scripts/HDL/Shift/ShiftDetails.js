
var ShiftDetailsManager = {
    SaveShift: function () {
        var validator = $("#divShiftDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var shiftObj;
        if (validator.validate()) {
            shiftObj = ShiftDetailsHelper.CreateShiftObject();
            var strShift = JSON.stringify(shiftObj);
            var jsonParam = 'shift:' + strShift;
            var serviceUrl = "../Shift/SaveShift/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            var msg = "";
            if (shiftObj.ShiftId === 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#grdShiftSummary").data("kendoGrid").dataSource.read();
                            ShiftDetailsHelper.ClearForm();
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
    }
}

var ShiftDetailsHelper = {
    InitShiftDetails: function () {

        ShiftDetailsHelper.GenerateNumericTextBox();

        $("#btnSave").click(function () {
            ShiftDetailsManager.SaveShift();
            
        });
        $("#btnClear").click(function () {
            ShiftDetailsHelper.ClearForm();
        });
    },

   

    CreateShiftObject: function () {
        var obj = new Object();
        obj.ShiftId = $("#hdnShiftId").val();
        obj.ShiftNo = $("#txtShiftNo").data("kendoNumericTextBox").value();
        obj.ShiftHead = $("#txtShiftHead").val();
        obj.ShiftDuration = $("#txtShiftDuration").data("kendoNumericTextBox").value();

        return obj;
    },

    FillForm: function (obj) {

        $("#hdnShiftId").val(obj.ShiftId);
        $("#txtShiftNo").data("kendoNumericTextBox").value(obj.ShiftNo);
        $("#txtShiftHead").val(obj.ShiftHead);
        $("#txtShiftDuration").data("kendoNumericTextBox").value(obj.ShiftDuration);
    },

    ClearForm: function () {

        $("#hdnShiftId").val(0);
        $("#txtShiftNo").data("kendoNumericTextBox").value('');
        $("#txtShiftHead").val('');
        $("#txtShiftDuration").data("kendoNumericTextBox").value('');

        $("#divShiftDetails > form").kendoValidator();
        $("#divShiftDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    GenerateNumericTextBox: function () {
        $("#txtShiftNo").kendoNumericTextBox({ format: "#", min: 0 });
        $("#txtShiftDuration").kendoNumericTextBox({ format: "#", min: 0 });
    }

}