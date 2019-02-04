
var LcInfoDetailsManager = {
    SaveLcInfo: function () {
        var validator = $("#divLcDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var lcObj;
        if (validator.validate()) {
            lcObj = LcInfoDetailsHelper.CreateLcObject();
            var lcDetailsList = LcInfoDetailsHelper.GetLcDetailsGridList();
            var objLc = JSON.stringify(lcObj);
            var objLcDetails = JSON.stringify(lcDetailsList);
            var jsonParam = "objLc:" + objLc + ",objLcDetails:" + objLcDetails;
            var serviceUrl = "../LcInfo/SaveLcInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (lcObj.LcId === "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdLcInfoSummary").data("kendoGrid").dataSource.read();
                            $("#hdnLcId").val(jsonData.LcId);
                          
                        }
                    }]);
            }
            else if (jsonData.SaveStatus == "Exists") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Lc No already Exists!',
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
    GetAllGridData: function (lcId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../LcInfo/GetAllGridData/?lcId=" + lcId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },

}

var LcInfoDetailsHelper = {
    InitLcInfoDetails: function () {
        $("#divLcDetailsPopup").kendoWindow({
            title: "LC DETAILS INFORMATION",
            resizeable: true,
            scrollable: false,
            width: "50%",
            actions: ["Pin", "Close"],
            modal: true,
            animation: {
                close: {
                    effects: "fade:out"
                },
            }
        });

        LcInfoDetailsHelper.GenerateDatePicker();
        HdlCommonHelper.GenerateSupplierCombo("cmbSupplier");
        HdlCommonHelper.GenerateBankCombo("cmbBank");
        HdlCommonHelper.GenerateBranchCombo("cmbBranch");
        HdlCommonHelper.GenerateLcStatusCombo("cmbLcStatus");
        HdlCommonHelper.GenerateImportTypeCombo("cmbImportType");
        HdlCommonHelper.GenerateINameCombo("cmbItem");
        HdlCommonHelper.GenerateGroupCombo("cmbGroupName");
        HdlCommonHelper.GenerateCurrencyCombo("cmbCurrency");
        LcInfoDetailsHelper.GenerateNumericTextBox();

        LcDetailsSummaryHelper.InitLcDetailsSummary();
        LcDetailsPopupHelper.InitLcDetailsPopup();

        $("#btnSave").click(function () {
            LcInfoDetailsManager.SaveLcInfo();
        });

        $("#btnClear").click(function () {
            LcInfoDetailsHelper.ClearForm();
        });


        $("#btnAddNew").click(function () {
            LcInfoDetailsHelper.ClearForm();
            $("#divLcInfoDetails").show();
            $("#divLcSummary").hide();
        });
        $("#btnClose").click(function () {
            $("#divLcInfoDetails").hide();
            $("#divLcSummary").show();
        });


        $("#btnGenerateLcNo").click(function () {
            LcInfoDetailsManager.GenerateMaxLcId();
        });


    },

    CreateLcObject: function () {
        var obj = new Object();
        obj.LcId = $("#hdnLcId").val();
        obj.LcNo = $("#txtLcNo").val();
        obj.LcDate = $("#txtLcDate").data("kendoDatePicker").value();
        obj.SupplierId = $("#cmbSupplier").data("kendoComboBox").value();
        obj.BankId = $("#cmbBank").data("kendoComboBox").value();
        obj.BranchId = $("#cmbBranch").data("kendoComboBox").value();
        obj.ExpDate = $("#txtLcDate").data("kendoDatePicker").value();
        obj.ShipDate = $("#txtShipDate").data("kendoDatePicker").value();
        obj.SdExt = $("#txtSdExtDate").data("kendoDatePicker").value();
        obj.PiNo = $("#txtPiNo").val();
        obj.PiDate = $("#txtPIDate").data("kendoDatePicker").value();
        obj.InvoiceNo = $("#txtInvNo").val();
        obj.InvDate = $("#txtInvDate").data("kendoDatePicker").value();
        obj.IpNo = $("#txtIpNo").val();
        obj.IpDate = $("#txtIPDate").data("kendoDatePicker").value();
        obj.Vassal = $("#txtVassal").val();
        obj.Etd = $("#txtIPDate").data("kendoDatePicker").value();
        obj.Eta = $("#txtIPDate").data("kendoDatePicker").value();
        obj.ImpTypeId = $("#cmbImportType").data("kendoComboBox").value();
        obj.StatusId = $("#cmbLcStatus").data("kendoComboBox").value();
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnLcId").val(obj.LcId);
        $("#txtLcNo").val(obj.LcNo);
        $("#txtLcDate").data("kendoDatePicker").value(obj.LcDate);
        $("#cmbSupplier").data("kendoComboBox").value(obj.SupplierId);
        $("#cmbBank").data("kendoComboBox").value(obj.BankId);
        $("#cmbBranch").data("kendoComboBox").value(obj.BranchId);
        $("#txtExpDate").data("kendoDatePicker").value(obj.ExpDate);
        $("#txtShipDate").data("kendoDatePicker").value(obj.ShipDate);
        $("#txtSdExtDate").data("kendoDatePicker").value(obj.SdExt);
        $("#txtPiNo").val(obj.PiNo);
        $("#txtPIDate").data("kendoDatePicker").value(obj.PiDate);
        $("#txtInvNo").val(obj.InvoiceNo);
        $("#txtInvDate").data("kendoDatePicker").value(obj.InvDate);
        $("#txtIpNo").val(obj.IpNo);
        $("#txtIPDate").data("kendoDatePicker").value(obj.IpDate);
        $("#txtVassal").val(obj.Vassal);
        $("#txtEtd").data("kendoDatePicker").value(obj.Etd);
        $("#txtEta").data("kendoDatePicker").value(obj.Eta);
        $("#cmbImportType").data("kendoComboBox").value(obj.ImpTypeId);
        $("#cmbLcStatus").data("kendoComboBox").value(obj.StatusId);
    },

    ClearForm: function () {
        $("#hdnLcId").val("");
        $("#txtLcNo").val("");
        $("#txtLcDate").data("kendoDatePicker").value("");
        $("#cmbSupplier").data("kendoComboBox").value("");
        $("#cmbBank").data("kendoComboBox").value("");
        $("#cmbBranch").data("kendoComboBox").value("");
        $("#txtLcDate").data("kendoDatePicker").value("");
        $("#txtShipDate").data("kendoDatePicker").value("");
        $("#txtSdExtDate").data("kendoDatePicker").value("");
        $("#txtPiNo").val("");
        $("#txtPIDate").data("kendoDatePicker").value("");
        $("#txtInvNo").val("");
        $("#txtInvDate").data("kendoDatePicker").value("");
        $("#txtIpNo").val("");
        $("#txtIPDate").data("kendoDatePicker").value("");
        $("#txtVassal").val("");
        $("#txtIPDate").data("kendoDatePicker").value("");
        $("#txtIPDate").data("kendoDatePicker").value("");
        $("#cmbImportType").data("kendoComboBox").value("");
       // $("#cmbLcStatus").data("kendoComboBox").value("");
        gbLcDetailsGridData = [];
        $("#grdLcDetailsSummary").data('kendoGrid').dataSource.data([]);

        $("#divLcDetails > form").kendoValidator();
        $("#divLcDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    GenerateNumericTextBox: function () {
        $("#txtLcQty").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtLcRate").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtLcAmt").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtConvRate").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtValueTaka").kendoNumericTextBox({ format: "#.##", min: 0 });
    },
    GenerateDatePicker: function () {
        $("#txtLcDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
        $("#txtExpDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });
        $("#txtShipDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });
        $("#txtPIDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });
        $("#txtInvDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });
        $("#txtIPDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtSdExtDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtEtd").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtEta").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
    },



    GetLcDetailsGridList: function () {
        var gridData = $("#grdLcDetailsSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },

    FillAllGrid: function (lcId) {

        var data = LcInfoDetailsManager.GetAllGridData(lcId);
        gbLcDetailsGridData = [];
        var lcdetailsGrid = $("#grdLcDetailsSummary").data("kendoGrid");
        gbLcDetailsGridData = data;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbLcDetailsGridData });
        lcdetailsGrid.setDataSource(gridDataSource1);


    },

}