
var MrrInfoDetailsManager = {
    SaveMrrInfo: function () {
        var validator = $("#divMrrDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var mrrObj;
        if (validator.validate()) {
            mrrObj = MrrInfoDetailsHelper.CreateMrrObject();
            var mrrDetailsList = MrrInfoDetailsHelper.GetMrrDetailsGridList();
            var objMrr = JSON.stringify(mrrObj);
            var objMrrDetails = JSON.stringify(mrrDetailsList);
            var jsonParam = "objMrr:" + objMrr + ",objMrrDetails:" + objMrrDetails;
            var serviceUrl = "../MReceive/SaveMrrInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (mrrObj.RID === "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdMrrInfoSummary").data("kendoGrid").dataSource.read();
                            $("#hdnMrrId").val(jsonData.RID);

                        }
                    }]);
            }
            else if (jsonData.SaveStatus == "Exists") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Mrr No already Exists!',
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
    GetAllGridData: function (mrrId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../MReceive/GetAllGridData/?mrrId=" + mrrId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
    GetLcInfoByLcNo: function (lcNo) {
        var objLc = "";
        var jsonParam = "";
        var serviceUrl = "../MReceive/GetLcInfoByLcNo/?lcNo=" + lcNo;
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objLc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objLc;
    },
    GetAllPartial: function () {
        var objLc = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllPartial/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objLc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objLc;
    }

}

var MrrInfoDetailsHelper = {
    InitMrrInfoDetails: function () {
        $("#divMrrDetailsPopup").kendoWindow({
            title: "MATERIAL RECEIVE DETAILS INFORMATION",
            resizeable: true,
            scrollable: false,
            width: "90%",
            actions: ["Pin", "Close"],
            modal: true,
            animation: {
                close: {
                    effects: "fade:out"
                },
            }
        });

        MrrInfoDetailsHelper.GenerateDatePicker();
        HdlCommonHelper.GenerateSupplierCombo("cmbSupplier");
        HdlCommonHelper.GenerateImportTypeCombo("cmbImportType");
        HdlCommonHelper.GenerateCompanyCombo("cmbCompany");
        HdlCommonHelper.GenerateLcCombo("cmbLcNo");
        MrrInfoDetailsHelper.GeneratePartialCombo();
        MrrInfoDetailsHelper.GeneratePaymentCombo();
        MrrInfoDetailsHelper.GenerateNumericTextBox();

        MrrDetailsSummaryHelper.InitMrrDetailsSummary();
        MrrDetailsPopupHelper.InitMrrDetailsPopup();

        $("#cmbLcNo").change(function () {
            MrrInfoDetailsHelper.FillLcInformation();
        });

        $("#btnSave").click(function () {
            MrrInfoDetailsManager.SaveMrrInfo();
        });

        $("#btnClear").click(function () {
            MrrInfoDetailsHelper.ClearForm();
        });


        $("#btnAddNew").click(function () {
            // MrrInfoDetailsHelper.ClearForm();
            $("#divMrrInfoDetails").show();
            $("#divMrrSummary").hide();
        });
        $("#btnClose").click(function () {
            $("#divMrrInfoDetails").hide();
            $("#divMrrSummary").show();
        });


        $("#btnGenerateMrrNo").click(function () {
            MrrInfoDetailsManager.GenerateMaxMrrId();
        });


    },

    CreateMrrObject: function () {
        var obj = new Object();
        obj.RID = $("#hdnMrrId").val();
        obj.MRRNo = $("#txtMrrNo").val();
        obj.CompanyId = $("#cmbCompany").data("kendoComboBox").value();
        obj.MrrDate = $("#txtMrrDate").data("kendoDatePicker").value();
        obj.LCNo = $("#cmbLcNo").data("kendoComboBox").value();
        obj.LCDate = $("#txtLcDate").data("kendoDatePicker").value();
        obj.SupplierId = $("#cmbSupplier").data("kendoComboBox").value();
        obj.InvNo = $("#txtInvNo").val();
        obj.InvDate = $("#txtInvDate").data("kendoDatePicker").value();
        obj.PINo = $("#txtPiNo").val();
        obj.PIDate = $("#txtPIDate").data("kendoDatePicker").value();
        obj.IPNo = $("#txtIpNo").val();
        obj.IPDate = $("#txtIPDate").data("kendoDatePicker").value();
        obj.ImpTypeId = $("#cmbImportType").data("kendoComboBox").value();
        obj.Remarks = $("#txtRemarks1").val();
        obj.BLNo = $("#txtBlNo").val();
        obj.BLDate = $("#txtBlDate").data("kendoDatePicker").value();
        obj.BENo = $("#txtBeNo").val();
        obj.BEDate = $("#txtBeDate").data("kendoDatePicker").value();
        obj.InvValue = $("#txtInvValue").val();
        obj.TruckNo = $("#txtTruckNo").val();
        obj.PartialNo = $("#cmbPartial").data("kendoComboBox").value();
        obj.CertificateNo = $("#txtCertificateNo").val();
        obj.ChallanNo = $("#txtChallanNo").val();
        obj.ChallanDate = $("#txtChallanDate").data("kendoDatePicker").value();
        obj.PaymentId = $("#cmbPayment").data("kendoComboBox").value();
        obj.Payment = $("#cmbPayment").data("kendoComboBox").text();
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnMrrId").val(obj.RID);
        $("#txtMrrNo").val(obj.MRRNo);
        $("#txtMrrDate").data("kendoDatePicker").value(obj.MrrDate);
        $("#cmbLcNo").data("kendoComboBox").value(obj.LCNo);
        $("#txtLcDate").data("kendoDatePicker").value(obj.LCDate);
        $("#cmbSupplier").data("kendoComboBox").value(obj.SupplierId);
        $("#txtInvNo").val(obj.InvNo);
        $("#txtInvDate").data("kendoDatePicker").value(obj.InvDate);
        $("#txtPiNo").val(obj.PINo);
        $("#txtPIDate").data("kendoDatePicker").value(obj.PIDate);
        $("#txtIpNo").val(obj.IPNo);
        $("#txtIPDate").data("kendoDatePicker").value(obj.IPDate);
        $("#cmbImportType").data("kendoComboBox").value(obj.ImpTypeId);
        $("#txtRemarks1").val(obj.Remarks);
        $("#txtBlNo").val(obj.BLNo);
        $("#txtBlDate").data("kendoDatePicker").value(obj.BLDate);
        $("#txtBeNo").val(obj.BENo);
        $("#txtBeDate").data("kendoDatePicker").value(obj.BEDate);
        $("#txtInvValue").val(obj.InvValue);
        $("#txtTruckNo").val(obj.TruckNo);
        $("#cmbPartial").data("kendoComboBox").value(obj.PartialNo);
        $("#txtCertificateNo").val(obj.CertificateNo);
        $("#txtChallanNo").val(obj.ChallanNo);
        $("#txtChallanDate").data("kendoDatePicker").value(obj.ChallanDate);
        $("#cmbPayment").data("kendoComboBox").value(obj.PaymentId);
        $("#cmbCompany").data("kendoComboBox").value(obj.CompanyId);
    },

    ClearForm: function () {
        $("#hdnMrrId").val("0");
        $("#txtMrrNo").val("");
        $("#txtMrrDate").data("kendoDatePicker").value("");
        $("#cmbLcNo").data("kendoComboBox").value("");
        $("#txtLcDate").data("kendoDatePicker").value("");
        $("#cmbSupplier").data("kendoComboBox").value("");
        $("#txtInvNo").val("");
        $("#txtInvDate").data("kendoDatePicker").value("");
        $("#txtPiNo").val("");
        $("#txtPIDate").data("kendoDatePicker").value("");
        $("#txtIpNo").val("");
        $("#txtIPDate").data("kendoDatePicker").value("");
        $("#cmbImportType").data("kendoComboBox").value("");
        $("#txtRemarks1").val("");
        $("#txtBlNo").val("");
        $("#txtBlDate").data("kendoDatePicker").value("");
        $("#txtBeNo").val("");
        $("#txtBeDate").data("kendoDatePicker").value("");
        $("#txtInvValue").val("");
        $("#txtTruckNo").val("");
        $("#cmbPartial").data("kendoComboBox").value("");
        $("#txtCertificateNo").val("");
        $("#txtChallanNo").val("");
        $("#txtChallanDate").data("kendoDatePicker").value("");
        // $("#cmbPayment").data("kendoComboBox").value("");
        //$("#cmbPayment").data("kendoComboBox").text("");

        gbMrrDetailsGridData = [];
        $("#grdMrrDetailsSummary").data('kendoGrid').dataSource.data([]);

        $("#divMrrDetails > form").kendoValidator();
        $("#divMrrDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    GenerateNumericTextBox: function () {
        $("#txtMrrQty").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtMrrRate").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtMrrAmt").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtConvRate").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtValueTaka").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtWithLcCostRate").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtWithLcCostValue").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtConPerLength").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtConPerBag").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtLcCostPer").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtTotalNoOfBag").kendoNumericTextBox({ format: "#.##", min: 0 });
    },

    GenerateDatePicker: function () {
        $("#txtMrrDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
        $("#txtLcDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });
        $("#txtInvDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });
        $("#txtPIDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            // value: new Date()
        });

        $("#txtIPDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtBlDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtBeDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtChallanDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtMfdDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });
        $("#txtExpDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            //  value: new Date()
        });

    },
    GetMrrDetailsGridList: function () {
        var gridData = $("#grdMrrDetailsSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },

    FillAllGrid: function (mrrId) {

        var data = MrrInfoDetailsManager.GetAllGridData(mrrId);
        gbMrrDetailsGridData = [];
        var MrrdetailsGrid = $("#grdMrrDetailsSummary").data("kendoGrid");
        gbMrrDetailsGridData = data;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbMrrDetailsGridData });
        MrrdetailsGrid.setDataSource(gridDataSource1);


    },
    FillLcInformation: function () {
        var lcNo = $("#cmbLcNo").data("kendoComboBox").value();

        if (lcNo !== "0") {
            var data = MrrInfoDetailsManager.GetLcInfoByLcNo(lcNo);
            $("#txtLcDate").data("kendoDatePicker").value(data.LcDate);
            $("#cmbSupplier").data("kendoComboBox").value(data.SupplierId);
            $("#txtInvNo").val(data.InvoiceNo);
            $("#txtInvDate").data("kendoDatePicker").value(data.InvDate);
            $("#txtPiNo").val(data.PiNo);
            $("#txtPIDate").data("kendoDatePicker").value(data.PiDate);
            $("#txtIpNo").val(data.IpNo);
            $("#txtIPDate").data("kendoDatePicker").value(data.IpDate);
            $("#cmbImportType").data("kendoComboBox").value(data.ImpTypeId);
        } else {
            $("#txtLcDate").data("kendoDatePicker").value("");
            $("#cmbSupplier").data("kendoComboBox").value("");
            $("#txtInvNo").val("");
            $("#txtInvDate").data("kendoDatePicker").value("");
            $("#txtPiNo").val("");
            $("#txtPIDate").data("kendoDatePicker").value("");
            $("#txtIpNo").val("");
            $("#txtIPDate").data("kendoDatePicker").value("");
            $("#cmbImportType").data("kendoComboBox").value("");
        }

    },
    GeneratePartialCombo: function () {
        var objPartial = MrrInfoDetailsManager.GetAllPartial();
        var obj = new Object();
        obj.PartialNo = "---Select---";
        obj.PartialId = 0;
        objPartial.unshift(obj);

        $("#cmbPartial").kendoComboBox({
            placeholder: "Select",
            dataTextField: "PartialNo",
            dataValueField: "PartialId",
            dataSource: objPartial,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem("cmbPartial", true);
            }
        });
    },
    GeneratePaymentCombo: function () {
        $("#cmbPayment").kendoComboBox({
            placeholder: "Select",
            dataTextField: "PayStatus",
            dataValueField: "PayStatusId",
            dataSource: [{ PayStatusId: 1, PayStatus: "No" }, { PayStatusId: 2, PayStatus: "Yes" }],
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },

}