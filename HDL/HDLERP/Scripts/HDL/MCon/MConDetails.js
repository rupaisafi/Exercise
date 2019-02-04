
var MConDetailsManager = {
    SaveMCon: function () {
        var validator = $("#divMConDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var consumptionObj;
        if (validator.validate()) {
            consumptionObj = MConDetailsHelper.CreateMConObject();
            var consumptionDetailsList = MConDetailsHelper.GetMConDetailsGridList();
            var strConsumption = JSON.stringify(consumptionObj);
            var strMConDetails = JSON.stringify(consumptionDetailsList);
            var jsonParam = "consumption:" + strConsumption + ",consumptionDetails:" + strMConDetails;
            var serviceUrl = "../MaterialConsumption/SaveMaterialConsumption/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (consumptionObj.MConID == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdMConSummary").data("kendoGrid").dataSource.read();
                            $("#hdnMConID").val(jsonData.MConID);
                           // MConDetailsHelper.ClearForm();
                        }
                    }]);
            }
            else if (jsonData.SaveStatus == "Exists") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Order No already Exists!',
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
    GetAllGridData: function (mConID) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../MaterialConsumption/GetAllGridData/?MConID=" + mConID;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
    GetStyleInformation: function (styleCode) {
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetStyleInformation/?styleCode=" + styleCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    },
    StyleNoChangeEvent: function () {
        MConDetailsHelper.ClearStyleInformation();
        var styleCode = $("#cmbStyle").data("kendoComboBox").value();
        if (styleCode != 0) {
            var styleObj = MConDetailsManager.GetStyleInformation(styleCode);
            MConDetailsHelper.FillStyleInformation(styleObj);
        }
    }
}

var MConDetailsHelper = {
    InitMConDetails: function () {
        $("#divMConDetailsPopup").kendoWindow({
            title: "CONSUMPTION DETAILS INFORMATION",
            resizeable: true,
            scrollable: false,
            width: "90%",
            actions: ["Pin", "Close"],
            modal: true,
            animation: {
                close: {
                    effects: "fade:out"
                }
            }
        });

        MConDetailsHelper.GenerateNumericTextBox();
        HdlCommonHelper.GenerateStyleCombo("cmbStyle");
        HdlCommonHelper.GenerateDepartmentCombo("cmbDepartment");
        HdlCommonHelper.GenerateColorCombo("cmbColor");
        HdlCommonHelper.GenerateINameCombo("cmbItem");

        MConDetailsSummaryHelper.InitMConDetailsSummary();
        MConDetailsPopupHelper.InitMConDetailsPopup();

        $("#btnSave").click(function () {
            if (MConDetailsHelper.ValidateForm()) {
                MConDetailsManager.SaveMCon();
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Required Validation', 'Please Select All Fields',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                          }
                      }]);
            }

        });

        $("#btnClear").click(function () {
            MConDetailsHelper.ClearForm();
        });

        $("#btnExportToExcel").kendoButton({
            click: function () {
                $("#grdMConSummary").getKendoGrid().saveAsExcel();
            }
        });
        $("#btnAddNew").click(function () {
            MConDetailsHelper.ClearForm();
            //MConDetailsManager.GenerateMaxOrderId();
            $("#divMConDetails").show();
            $("#divMConSummary").hide();
        });
        $("#btnClose").click(function () {
            $("#divMConDetails").hide();
            $("#divMConSummary").show();
        });
        $("#cmbStyle").change(function () {
            MConDetailsManager.StyleNoChangeEvent();
        });
    },
    FillStyleInformation: function (obj) {
        $("#txtWeave").val(obj.Weave);
        $("#txtWidth").val(obj.Width);
        $("#txtConstruction").val(obj.Construction);
        $("#txtWarpRatio").val(obj.WarpRatio);
        $("#txtWeftRatio").val(obj.WeftRatio);
        $("#cmbColor").data("kendoComboBox").value(obj.ColorId);
        $("#txtTEnd").data("kendoNumericTextBox").value(obj.TEnds);
    },

    ClearStyleInformation: function () {
        $("#txtWeave").val("");
        $("#txtWidth").val("");
        $("#txtConstruction").val("");
        $("#txtWarpRatio").val("");
        $("#txtWeftRatio").val("");
        $("#cmbColor").data("kendoComboBox").value("");
        $("#txtTEnd").data("kendoNumericTextBox").value("");
    },
    CreateMConObject: function () {
        var obj = new Object();
        obj.MConID = $("#hdnMConID").val();
        obj.SID = $("#cmbStyle").data("kendoComboBox").value();
        obj.Remarks = $("#txtRemarks").val();
        
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnMConID").val(obj.MConID);
        $("#cmbStyle").data("kendoComboBox").value(obj.SID); //Actually StyleCode
        $("#txtRemarks").val(obj.Remarks);

        MConDetailsManager.StyleNoChangeEvent();
    },
    ClearForm: function () {
        $("#hdnMConID").val(0);
        $("#cmbStyle").data("kendoComboBox").value(0);
        $("#txtRemarks").val("");

        gbMConDetailsGridData = [];

        $("#grdMConDetailsSummary").data('kendoGrid').dataSource.data([]);

        $("#divMConDetails > form").kendoValidator();
        $("#divMConDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    GenerateNumericTextBox: function () {
        $("#txtQnty").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtTEnd").kendoNumericTextBox({ format: "#.##", min: 0 });
    },
    ValidateForm: function () {
        var res = true;
      
        var style = $("#cmbStyle").data("kendoComboBox");
       
        if (style.selectedIndex <= 0) {
            res = false;
        }
        
        return res;
    },
    GetMConDetailsGridList: function () {
        var gridData = $("#grdMConDetailsSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },
    FillAllGrid: function (mConID) {
      
        var data = MConDetailsManager.GetAllGridData(mConID);
        
        gbMConDetailsGridData = [];
        var detailsGrid = $("#grdMConDetailsSummary").data("kendoGrid");
        gbMConDetailsGridData = data;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbMConDetailsGridData });
        detailsGrid.setDataSource(gridDataSource1);
    }

}