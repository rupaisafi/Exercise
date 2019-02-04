/// <reference path="../../common/hrmcommon.js" />

var EmployeeInfoPassporAndDrivingManager = {

};
var EmployeeInfoPassporAndDrivingHelper = {
    InitEmployeeInfoPassporAndDriving: function () {
        HrmCommonHelper.GenerateCountryCombo("ddlPAuthorityCountry");
        HrmCommonHelper.GenerateCountryCombo("ddlDAuthorityCountry");
        EmployeeInfoPassporAndDrivingHelper.GenerateDatePicker();
    },
    GeneratePassportObject: function () {
        var obj = new Object();
        obj.PassportNo = $("#txtPassportNO").val();
        obj.PIssueDate = $("#txtPIssueDate").val();
        obj.PExpireDate = $("#txtPExpireDate").val();
        obj.PAuthorityCountryID = $("#ddlPAuthorityCountry").data("kendoComboBox").value();
        return obj;
    },
    GenerateDrivingLicenseObject: function () {
        var obj = new Object();
        obj.DrivingLicense = $("#txtDrivingLicenseNo").val();
        obj.DIssueDate = $("#txtDIssueDate").val();
        obj.DExpireDate = $("#txtDExpireDate").val();
        obj.DAuthorityCountryID = $("#ddlDAuthorityCountry").data("kendoComboBox").value();
        return obj;
    },
    ClearPassportForm: function () {
        $("#txtPassportNO").val("");
        $("#txtPIssueDate").val("");
        $("#txtPExpireDate").val("");
        $("#ddlPAuthorityCountry").data("kendoComboBox").value(0);
    },
    ClearDrivingForm: function () {
        $("#txtDrivingLicenseNo").val("");
        $("#txtDIssueDate").val("");
        $("#txtDExpireDate").val("");
        $("#ddlDAuthorityCountry").data("kendoComboBox").value(0);
    },
    FillPassportForm: function (obj) {
        $("#txtPassportNO").val(obj.PassportNo);
        $("#txtPIssueDate").data("kendoDatePicker").value(obj.PIssueDate);
        $("#txtPExpireDate").data("kendoDatePicker").value(obj.PExpireDate);
        $("#ddlPAuthorityCountry").data("kendoComboBox").value(obj.PAuthorityCountryID);
    },
    FillDrivingForm: function (obj) {
        $("#txtDrivingLicenseNo").val(obj.DrivingLicense);
        $("#txtDIssueDate").data("kendoDatePicker").value(obj.DIssueDate);
        $("#txtDExpireDate").data("kendoDatePicker").value(obj.DExpireDate);
        $("#ddlDAuthorityCountry").data("kendoComboBox").value(obj.DAuthorityCountryID);
    },
    GenerateDatePicker: function () {
        $("#txtPIssueDate").kendoDatePicker({ format: "dd-MMMM-yyyy" });
        $("#txtDIssueDate").kendoDatePicker({ format: "dd-MMMM-yyyy" });
        $("#txtPExpireDate").kendoDatePicker({ format: "dd-MMMM-yyyy" });
        $("#txtDExpireDate").kendoDatePicker({ format: "dd-MMMM-yyyy" });
    }
};