
var MIssueInfoDetailsManager = {
    SaveMIssueInfo: function () {
        var validator = $("#divMIssueDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var mIssueObj;
        if (validator.validate()) {
            mIssueObj = MIssueInfoDetailsHelper.CreateMIssueObject();
            var mIssueDetailsList = MIssueInfoDetailsHelper.GetMIssueDetailsGridList();
            var objMIssue = JSON.stringify(mIssueObj);
            var objMIssueDetails = JSON.stringify(mIssueDetailsList);
            var jsonParam = "objMIssue:" + objMIssue + ",objMIssueDetails:" + objMIssueDetails;
            var serviceUrl = "../MIssue/SaveMIssueInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (mIssueObj.RID === "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdMIssueInfoSummary").data("kendoGrid").dataSource.read();
                            $("#hdnMIssueId").val(jsonData.RID);

                        }
                    }]);
            }
            else if (jsonData.SaveStatus == "Exists") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'MIssue No already Exists!',
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
    GetAllGridData: function (missueId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../MIssue/GetAllGridData/?missueId=" + missueId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
   
}

var MIssueInfoDetailsHelper = {
    InitMIssueInfoDetails: function () {
        $("#divMIssueDetailsPopup").kendoWindow({
            title: "MATERIAL ISSUE DETAILS INFORMATION",
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
        MIssueInfoDetailsHelper.GenerateDatePicker();
        MIssueInfoDetailsHelper.GenerateIssueForCombo("cmbIssueType");//yarn/chemical
       // MIssueInfoDetailsHelper.GenerateIssueForCombo("cmbIssueTypeSearch");//yarn/chemical
        HdlCommonHelper.GenerateDepartmentCombo("cmbDepartment");
        HdlCommonHelper.GenerateCompanyCombo("cmbCompany");
        HdlCommonHelper.GenerateUnitCombo("cmbUnit");
      
        HdlCommonHelper.GenerateINameCombo("cmbItem");
        HdlCommonHelper.GenerateSupplierCombo("cmbSupplier");
        HdlCommonHelper.GenerateImportTypeCombo("cmbImportType");
        HdlCommonHelper.GenerateLcCombo("cmbLcNo");
        HdlCommonHelper.GenerateLotCombo("cmbLotNo", "0");

        MIssueInfoDetailsHelper.GenerateNumericTextBox();

        MIssueDetailsSummaryHelper.InitMIssueDetailsSummary();
        MIssueDetailsPopupHelper.InitMIssueDetailsPopup();

        $("#cmbLcNo").change(function () {
            //MIssueInfoDetailsHelper.FillLcInformation();
        });

        $("#btnSave").click(function () {
            MIssueInfoDetailsManager.SaveMIssueInfo();
        });

        $("#btnClear").click(function () {
            MIssueInfoDetailsHelper.ClearForm();
        });


        $("#btnAddNew").click(function () {
            // MIssueInfoDetailsHelper.ClearForm();
            $("#divMIssueInfoDetails").show();
            $("#divMIssueSummary").hide();
        });
        $("#btnClose").click(function () {
            $("#divMIssueInfoDetails").hide();
            $("#divMIssueSummary").show();
        });

        $("#cmbItem").change(function() {
            var icode = $("#cmbItem").data("kendoComboBox").value();
            var lotcombo = $("#cmbLotNo").data("kendoComboBox");
            lotcombo.value("");
            lotcombo.text("");
            HdlCommonHelper.GenerateLotCombo("cmbLotNo", icode);
        });


    },

    CreateMIssueObject: function () {
        var obj = new Object();
        obj.IID = $("#hdnMIssueId").val();
        obj.CompanyId = $("#cmbCompany").data("kendoComboBox").value();
        obj.IssueDate = $("#txtMIssueDate").data("kendoDatePicker").value();
        obj.DepartmentId = $("#cmbDepartment").data("kendoComboBox").value();
        obj.SRNo = $("#txtSRNo").val();
        obj.UnitCode = $("#cmbUnit").data("kendoComboBox").value();
        obj.TypeFlag = $("#cmbIssueType").data("kendoComboBox").value();
        return obj;
    },

    FillForm: function (obj) {
         $("#hdnMIssueId").val(obj.IID);
         $("#cmbCompany").data("kendoComboBox").value(obj.CompanyId);
         $("#txtMIssueDate").data("kendoDatePicker").value(obj.IssueDate);
         $("#cmbDepartment").data("kendoComboBox").value(obj.DepartmentId);
         $("#txtSRNo").val(obj.SRNo);
         $("#cmbUnit").data("kendoComboBox").value(obj.UnitCode);
         $("#cmbIssueType").data("kendoComboBox").value(obj.TypeFlag);
         
    },

    ClearForm: function () {
        $("#hdnMIssueId").val("0");
        $("#cmbCompany").data("kendoComboBox").value("");
        $("#txtMIssueDate").data("kendoDatePicker").value("");
        $("#cmbDepartment").data("kendoComboBox").value("");
        $("#txtSRNo").val("");
        $("#cmbUnit").data("kendoComboBox").value("");
        $("#cmbIssueType").data("kendoComboBox").value("");

        gbMIssueDetailsGridData = [];
        $("#grdMIssueDetailsSummary").data('kendoGrid').dataSource.data([]);

        $("#divMIssueDetails > form").kendoValidator();
        $("#divMIssueDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    GenerateNumericTextBox: function () {
        $("#txtMIssueQty").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtMIssueRate").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtMIssueAmt").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtRateTaka").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtValueTaka").kendoNumericTextBox({ format: "#.##", min: 0 });
    },

    GenerateDatePicker: function () {
        $("#txtMIssueDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
    },
    GetMIssueDetailsGridList: function () {
        var gridData = $("#grdMIssueDetailsSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },

    FillAllGrid: function (mIssueId) {
        var data = MIssueInfoDetailsManager.GetAllGridData(mIssueId);
        gbMIssueDetailsGridData = [];
        var MIssuedetailsGrid = $("#grdMIssueDetailsSummary").data("kendoGrid");
        gbMIssueDetailsGridData = data;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbMIssueDetailsGridData });
        MIssuedetailsGrid.setDataSource(gridDataSource1);


    },
    GenerateIssueForCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "TypeName",
            dataValueField: "TypeId",
            dataSource: [{ TypeId: "Y", TypeName: "YARN" }, { TypeId: "C", TypeName: "CHEMICAL" }],
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },

}