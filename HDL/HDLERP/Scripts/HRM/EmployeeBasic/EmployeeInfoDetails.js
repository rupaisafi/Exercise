/// <reference path="../../common/common.js" />
/// <reference path="employeeeducationsummary.js" />
/// <reference path="photoupload.js" />
/// <reference path="employeepassportanddriving.js" />
/// <reference path="../../common/hrmcommon.js" />

var EmployeeInfoDetailsManager = {
    SaveEmployeeInfo: function () {
        var validator = $("#divEmployeeDetails").kendoValidator().data("kendoValidator");
        var empObj;
        if (validator.validate()) {
            empObj = EmployeeInfoDetailsHelper.CreateEmployeeObject();
            var eduObj = EmployeeInfoDetailsHelper.CreateEducationList();
            var contactObj = EmployeeInfoDetailsHelper.CreateContactObject();
            var passportObj = EmployeeInfoPassporAndDrivingHelper.GeneratePassportObject();
            var drivingObj = EmployeeInfoPassporAndDrivingHelper.GenerateDrivingLicenseObject();

            var objEmployee = JSON.stringify(empObj);
            var objEducation = JSON.stringify(eduObj);
            var objContact = JSON.stringify(contactObj);
            var objPassport = JSON.stringify(passportObj);
            var objDriving = JSON.stringify(drivingObj);

            var jsonParam = 'objEmployeeBasic:' + objEmployee + ',objEducation:' + objEducation + ',objContact:' + objContact + ',objPassport:' + objPassport + ',objDriving:' + objDriving;
            var serviceUrl = "../EmployeeBasic/Save/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        } else {
            AjaxManager.MsgBox('warning', 'center', 'required', 'Please select all required field.',
                [{
                    addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }
        function onSuccess(jsonData) {
            var msg;
            if (empObj.EmpID === "0") {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveMessage === "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', msg,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#hdnEmpID").val(jsonData.EmpID);
                            $("#txtEmpCode").val(jsonData.EmpCode);
                            $("#txtPunchNo").val(jsonData.PunchNo);
                            $("#txtEmpCode").prop("disabled", true);
                            $("#txtEmpTitle").prop("disabled", true);
                            $("#txtEmpName").prop("disabled", true);
                            $("#txtEmpTitleBan").prop("disabled", true);
                            $("#txtEmpNameBan").prop("disabled", true);
                            $("#grdEmployeeInfo").data("kendoGrid").dataSource.read();
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
    },
    GetEducationGridData: function (obj) {
        var objEmpEdu = "";
        var jsonParam = "";
        var serviceUrl = "../Education/GetEmpEducation/?EmpID=" + obj;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objEmpEdu = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objEmpEdu;
    }
}

var EmployeeInfoDetailsHelper = {
    InitEmployeeInfoDetails: function () {

        EmployeeInfoPassporAndDrivingHelper.InitEmployeeInfoPassporAndDriving();

        HrmCommonHelper.GenerateDivisionCombo("ddlPreDivision");
        HrmCommonHelper.GenerateDistrictCombo("ddlPreDistrict", 0);
        HrmCommonHelper.GenerateThanaCombo("ddlPreThana", 0);

        HrmCommonHelper.GenerateDivisionCombo("ddlPerDivision");
        HrmCommonHelper.GenerateDistrictCombo("ddlPerDistrict", 0);
        HrmCommonHelper.GenerateThanaCombo("ddlPerThana", 0);

        EmployeeInfoDetailsHelper.ChangeEventForDivisionCombo();
        EmployeeInfoDetailsHelper.ChangeEventForDistrictCombo();

        $("#btnNew").click(function () {
            $("#divEmpDetails").show();
            $("#divEmployeeSummary").hide();
        });

        $("#btnClose").click(function () {
            $("#divEmpDetails").hide();
            $("#divEmployeeSummary").show();
            EmployeeInfoDetailsHelper.ClearForm();
        });

        $("#btnPartialClear").click(function () {
            EmployeeInfoDetailsHelper.PartialClearForm();
        });

        $("#btnClear").click(function () {
            EmployeeInfoDetailsHelper.ClearForm();
        });

        $("#tabstrip").kendoTabStrip({});

        $("#txtJoinDate").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy",
                value: new Date()
            });

        $("#txtDateOfBirth").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy",
                max: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            });
        
        HrmCommonHelper.GenerateUnitCombo("ddlUnit");
        HrmCommonHelper.GenerateDepartmentCombo("ddlDepartment");
        HrmCommonHelper.GenerateSectionCombo("ddlSection");
        HrmCommonHelper.GenerateWingCombo("ddlWing");
        HrmCommonHelper.GenerateTeamCombo("ddlTeam");
        HrmCommonHelper.GenerateDesignationCombo("ddlDesignation");
        HrmCommonHelper.GeneratePositionCombo("ddlPosition");
        HrmCommonHelper.GenerateGenderCombo("ddlGender");
        HrmCommonHelper.GenerateReligionCombo("ddlReligion");
        HrmCommonHelper.GenerateMaritalStatusCombo("ddlMaritalStatus");
        HrmCommonHelper.GenerateBloodGroupCombo("ddlBloodGroup");
        HrmCommonHelper.GenerateCountryCombo("ddlCountry");
        HrmCommonHelper.GenerateStatusCombo("ddlEmpStatus");
        HrmCommonHelper.GenerateTypeCombo("ddlEmpType");
        HrmCommonHelper.GenerateCategoryCombo("ddlEmpCategory");

        EmployeeEduvationInfoSummaryHelper.InitEmployeeEduvationInfoSummary();
        PhotoUploadHelper.InitPhotoUpload();
        EmployeeInfoDetailsHelper.CheckBoxChange();
        $("#btnSave").click(function () {
            EmployeeInfoDetailsManager.SaveEmployeeInfo();
        });
    },
    CreateEmployeeObject: function () {
        var obj = new Object();
        obj.EmpID = $("#hdnEmpID").val();
        obj.EmpCode = $("#txtEmpCode").val();
        obj.PunchNo = $("#txtPunchNo").val();
        obj.Title = $("#txtEmpTitle").val();
        obj.Name = $("#txtEmpName").val();
        obj.TitleBan = $("#txtEmpTitleBan").val();
        obj.NameBan = $("#txtEmpNameBan").val();
        obj.JoiningDate = $("#txtJoinDate").data("kendoDatePicker").value();
        obj.DesignationID = $("#ddlDesignation").data("kendoComboBox").value();
        obj.PositionID = $("#ddlPosition").data("kendoComboBox").value();
        obj.EmpStatusID = $("#ddlEmpStatus").data("kendoComboBox").value();
        obj.EmpCategoryID = $("#ddlEmpCategory").data("kendoComboBox").value();
        obj.EmpTypeID = $("#ddlEmpType").data("kendoComboBox").value();
        obj.UnitID = $("#ddlUnit").data("kendoComboBox").value();
        obj.DepartmentID = $("#ddlDepartment").data("kendoComboBox").value();
        obj.SectionID = $("#ddlSection").data("kendoComboBox").value();
        obj.WingID = $("#ddlWing").data("kendoComboBox").value();
        obj.TeamID = $("#ddlTeam").data("kendoComboBox").value();
        obj.DateOfBirth = $("#txtDateOfBirth").data("kendoDatePicker").value();
        obj.FathersName = $("#txtFathersName").val();
        obj.MothersName = $("#txtMothersName").val();
        obj.SpouseName = $("#txtSpouseName").val();
        obj.GenderID = $("#ddlGender").data("kendoComboBox").value();
        obj.ReligionID = $("#ddlReligion").data("kendoComboBox").value();
        obj.MaritalStatusID = $("#ddlMaritalStatus").data("kendoComboBox").value();
        obj.BloodGroupID = $("#ddlBloodGroup").data("kendoComboBox").value();
        obj.NIDNo = $("#txtNID").val();
        obj.BirthCertificateNo = $("#txtBirthCertificate").val();
        obj.CountryID = $("#ddlCountry").data("kendoComboBox").value();
        return obj;
    },
    FillForm: function (obj) {
        EmployeeInfoDetailsHelper.ClearForm();
        $("#hdnEmpID").val(obj.EmpID);
        $("#txtEmpCode").val(obj.EmpCode);
        $("#txtPunchNo").val(obj.PunchNo);
        $("#txtEmpTitle").val(obj.Title);
        $("#txtEmpName").val(obj.Name);
        $("#txtEmpTitleBan").val(obj.TitleBan);
        $("#txtEmpNameBan").val(obj.NameBan);
        $("#txtJoinDate").data("kendoDatePicker").value(obj.JoiningDate);
        $("#ddlDesignation").data("kendoComboBox").value(obj.DesignationID);
        $("#ddlPosition").data("kendoComboBox").value(obj.PositionID);
        $("#ddlEmpStatus").data("kendoComboBox").value(obj.EmpStatusID);
        $("#ddlEmpCategory").data("kendoComboBox").value(obj.EmpCategoryID);
        $("#ddlEmpType").data("kendoComboBox").value(obj.EmpTypeID);
        $("#ddlUnit").data("kendoComboBox").value(obj.UnitID);
        $("#ddlDepartment").data("kendoComboBox").value(obj.DepartmentID);
        $("#ddlSection").data("kendoComboBox").value(obj.SectionID);
        $("#ddlWing").data("kendoComboBox").value(obj.WingID);
        $("#ddlTeam").data("kendoComboBox").value(obj.TeamID);
        $("#txtDateOfBirth").data("kendoDatePicker").value(obj.DateOfBirth);
        $("#txtFathersName").val(obj.FathersName);
        $("#txtMothersName").val(obj.MothersName);
        $("#txtSpouseName").val(obj.SpouseName);
        $("#ddlGender").data("kendoComboBox").value(obj.GenderID);
        $("#ddlReligion").data("kendoComboBox").value(obj.ReligionID);
        $("#ddlMaritalStatus").data("kendoComboBox").value(obj.MaritalStatusID);
        $("#ddlBloodGroup").data("kendoComboBox").value(obj.BloodGroupID);
        $("#txtNID").val(obj.NIDNo);
        $("#txtBirthCertificate").val(obj.BirthCertificateNo);
        $("#ddlCountry").data("kendoComboBox").value(obj.CountryID);
    },
    FillViewForm: function (obj) {
        EmployeeInfoDetailsHelper.ClearForm();
        $("#vhdnEmpID").val(obj.EmpID);
        $("#vtxtEmpCode").val(obj.EmpCode);
        $("#vtxtEmpTitle").val(obj.Title);
        $("#vtxtEmpName").val(obj.Name);
        $("#vtxtEmpTitleBan").val(obj.TitleBan);
        $("#vtxtEmpNameBan").val(obj.NameBan);
        $("#vtxtJoinDate").data("kendoDatePicker").value(obj.JoiningDate);
        $("#vddlDesignation").data("kendoComboBox").value(obj.DesignationID);
        $("#vddlPosition").data("kendoComboBox").value(obj.PositionID);
        $("#vddlEmpStatus").data("kendoComboBox").value(obj.EmpStatusID);
        $("#vddlEmpCategory").data("kendoComboBox").value(obj.EmpCategoryID);
        $("#vddlEmpType").data("kendoComboBox").value(obj.EmpTypeID);
        $("#vddlUnit").data("kendoComboBox").value(obj.UnitID);
        $("#vddlDepartment").data("kendoComboBox").value(obj.DepartmentID);
        $("#vddlSection").data("kendoComboBox").value(obj.SectionID);
        $("#vddlWing").data("kendoComboBox").value(obj.WingID);
        $("#vddlTeam").data("kendoComboBox").value(obj.TeamID);
        $("#vtxtDateOfBirth").data("kendoDatePicker").value(obj.DateOfBirth);
        $("#vtxtFathersName").val(obj.FathersName);
        $("#vtxtMothersName").val(obj.MothersName);
        $("#vtxtSpouseName").val(obj.SpouseName);
        $("#vddlGender").data("kendoComboBox").value(obj.GenderID);
        $("#vddlReligion").data("kendoComboBox").value(obj.ReligionID);
        $("#vddlMaritalStatus").data("kendoComboBox").value(obj.MaritalStatusID);
        $("#vddlBloodGroup").data("kendoComboBox").value(obj.BloodGroupID);
        $("#vtxtNID").val(obj.NIDNo);
        $("#vtxtBirthCertificate").val(obj.BirthCertificateNo);
        $("#vddlCountry").data("kendoComboBox").value(obj.CountryID);
    },
    FillContactInfo: function (obj) {
        $("#txtMobileNO").val(obj.Mobile);
        $("#txtPhoneNO").val(obj.Phone);
        $("#txtEmailPersonal").val(obj.Email);
        $("#txtEmailOfficial").val(obj.EmailOffice);
        $("#txtEmergencyContact").val(obj.EmergContact);
        $("#txtEmergencyContactName").val(obj.EmergContactName);
        $("#txtRelationWith").val(obj.RelationWith);
        $("#txtFax").val(obj.Fax);
        $("#txtSocialMediaID").val(obj.SocialMediaID);
        $("#txtPreVillage").val(obj.PreVillage);
        $("#txtPerVillage").val(obj.PerVillage);
        $("#txtPreRoad").val(obj.PreRoad);
        $("#txtPerRoad").val(obj.PerRoad);
        $("#txtBusStop").val(obj.BusStop);

        $("#ddlPreDivision").data("kendoComboBox").value(obj.PreDivisionID);
        var predivisionId = $("#ddlPreDivision").data("kendoComboBox").value();
        HrmCommonHelper.GenerateDistrictCombo("ddlPreDistrict", predivisionId === null ? 0 : predivisionId);
        $("#ddlPreDistrict").data("kendoComboBox").value(obj.PreDistrictID);

        $("#ddlPerDivision").data("kendoComboBox").value(obj.PerDivisionID);
        var perdivisionId = $("#ddlPerDivision").data("kendoComboBox").value();
        HrmCommonHelper.GenerateDistrictCombo("ddlPerDistrict", perdivisionId === null ? 0 : perdivisionId);
        $("#ddlPerDistrict").data("kendoComboBox").value(obj.PerDistrictID);

        var preddistrictId = $("#ddlPreDistrict").data("kendoComboBox").value();
        HrmCommonHelper.GenerateThanaCombo("ddlPreThana", preddistrictId === null ? 0 : preddistrictId);
        $("#ddlPreThana").data("kendoComboBox").value(obj.PreThanaID);

        var perddistrictId = $("#ddlPerDistrict").data("kendoComboBox").value();
        HrmCommonHelper.GenerateThanaCombo("ddlPerThana", perddistrictId === null ? 0 : perddistrictId);
        $("#ddlPerThana").data("kendoComboBox").value(obj.PerThanaID);


        $("#txtPrePostOffice").val(obj.PrePostOffice);
        $("#txtPerPostOffice").val(obj.PerPostOffice);
        $("#txtPrePostCode").val(obj.PrePostCode);
        $("#txtPerPostCode").val(obj.PerPostCode);
        $("#txtPreVillageBan").val(obj.PreVillageBan);
        $("#txtPerVillageBan").val(obj.PerVillageBan);
        $("#txtPreRoadBan").val(obj.PreRoadBan);
        $("#txtPerRoadBan").val(obj.PerRoadBan);
        $("#txtPrePostOfficeBan").val(obj.PrePostOfficeBan);
        $("#txtPerPostOfficeBan").val(obj.PerPostOfficeBan);
    },
    FillEducationGrid: function (obj) {
        var griddata = EmployeeEduvationInfoSummaryManager.gridDataSource(obj.EmpID);
        var edugird = $("#grdEducation").data("kendoGrid");
        edugird.setDataSource(griddata);
    },
    PartialClearForm: function () {
        var tabToActivate = $("#tabBasic");
        $("#tabstrip").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);

        $("#hdnEmpID").val("0");
        $("#txtEmpCode").val("");
        $("#txtPunchNo").val("");
        $("#txtEmpTitle").prop("disabled", false);
        $("#txtEmpName").prop("disabled", false);
        $("#txtEmpTitleBan").prop("disabled", false);
        $("#txtEmpNameBan").prop("disabled", false);
        $("#txtEmpTitle").val("");
        $("#txtEmpName").val("");
        $("#txtEmpTitleBan").val("");
        $("#txtEmpNameBan").val("");

        document.getElementById("imgEmpPhoto").src = "#";

        $("#divEmployeeDetails > form").kendoValidator();
        $("#divEmployeeDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    ClearForm: function () {
        $("#hdnEmpID").val("0");
        $("#txtEmpCode").val("");
        $("#txtPunchNo").val("");
        $("#txtEmpTitle").prop("disabled", false);
        $("#txtEmpName").prop("disabled", false);
        $("#txtEmpTitleBan").prop("disabled", false);
        $("#txtEmpNameBan").prop("disabled", false);
        $("#txtEmpTitle").val("");
        $("#txtEmpName").val("");
        $("#txtEmpTitleBan").val("");
        $("#txtEmpNameBan").val("");
        $("#txtJoinDate").data("kendoDatePicker").value(new Date());
        $("#ddlDesignation").data("kendoComboBox").value(0);
        $("#ddlPosition").data("kendoComboBox").value(0);
        $("#ddlEmpStatus").data("kendoComboBox").value(0);
        $("#ddlEmpCategory").data("kendoComboBox").value(0);
        $("#ddlEmpType").data("kendoComboBox").value(0);
        $("#ddlUnit").data("kendoComboBox").value(0);
        $("#ddlDepartment").data("kendoComboBox").value(0);
        $("#ddlSection").data("kendoComboBox").value(0);
        $("#ddlWing").data("kendoComboBox").value(0);
        $("#ddlTeam").data("kendoComboBox").value(0);
        $("#txtDateOfBirth").data("kendoDatePicker").value("");
        $("#txtFathersName").val("");
        $("#txtMothersName").val("");
        $("#txtSpouseName").val("");
        $("#ddlGender").data("kendoComboBox").value(0);
        $("#ddlReligion").data("kendoComboBox").value(0);
        $("#ddlMaritalStatus").data("kendoComboBox").value(0);
        $("#ddlBloodGroup").data("kendoComboBox").value(0);
        $("#txtNID").val("");
        $("#txtBirthCertificate").val("");
        $("#ddlCountry").data("kendoComboBox").value(0);

        $("#grdEducation").data("kendoGrid").dataSource.data([]);

        document.getElementById("imgEmpPhoto").src = "#";

        EmployeeInfoDetailsHelper.ClearContactInfo();
        EmployeeInfoPassporAndDrivingHelper.ClearDrivingForm();
        EmployeeInfoPassporAndDrivingHelper.ClearPassportForm();

        $("#divEmployeeDetails > form").kendoValidator();
        $("#divEmployeeDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    ClearContactInfo: function () {
        $("#txtMobileNO").val("");
        $("#txtPhoneNO").val("");
        $("#txtEmailPersonal").val("");
        $("#txtEmailOfficial").val("");
        $("#txtEmergencyContact").val("");
        $("#txtEmergencyContactName").val("");
        $("#txtRelationWith").val("");
        $("#txtFax").val("");
        $("#txtSocialMediaID").val("");
        $("#txtPreVillage").val("");
        $("#txtPerVillage").val("");
        $("#txtPreRoad").val("");
        $("#txtPerRoad").val("");
        $("#ddlPreDivision").data("kendoComboBox").value(0);
        $("#ddlPerDivision").data("kendoComboBox").value(0);
        $("#ddlPreThana").data("kendoComboBox").value("");
        $("#ddlPerThana").data("kendoComboBox").value("");
        $("#ddlPreDistrict").data("kendoComboBox").value("");
        $("#ddlPerDistrict").data("kendoComboBox").value("");
        $("#txtPrePostOffice").val("");
        $("#txtPerPostOffice").val("");
        $("#txtPrePostCode").val("");
        $("#txtPerPostCode").val("");
        $("#txtPreVillageBan").val("");
        $("#txtPerVillageBan").val("");
        $("#txtPreRoadBan").val("");
        $("#txtPerRoadBan").val("");
        $("#txtPrePostOfficeBan").val("");
        $("#txtPerPostOfficeBan").val("");
        $("#txtBusStop").val("");
    },
    CreateEducationList: function () {
        var gridData = $("#grdEducation").data("kendoGrid").dataSource.data();
        return gridData;
    },
    ChangeEventForDivisionCombo: function () {

        $("#ddlPreDivision").change(function () {
            var distCombo = $("#ddlPreDistrict").data("kendoComboBox");
            var thanaCombo = $("#ddlPreThana").data("kendoComboBox");
            distCombo.value("");
            distCombo.text("");
            distCombo.setDataSource([{ DistrictID: 0, DistrictName: '---Select---' }]);

            var divid = $("#ddlPreDivision").data("kendoComboBox").value();
            var districtList = HrmCommonManager.GetAllDistrict(divid);
            distCombo.setDataSource(districtList);
            thanaCombo.value("");
            thanaCombo.text("");
            thanaCombo.setDataSource([{ ThanaID: 0, ThanaName: '---Select---' }]);

        });
        $("#ddlPerDivision").change(function () {
            var distComboPer = $("#ddlPerDistrict").data("kendoComboBox");
            var thanaCombo = $("#ddlPerThana").data("kendoComboBox");
            distComboPer.value("");
            distComboPer.text("");
            distComboPer.setDataSource([{ DistrictID: 0, DistrictName: '---Select---' }]);

            var divid2 = $("#ddlPerDivision").data("kendoComboBox").value();
            var districtPerList = HrmCommonManager.GetAllDistrict(divid2);
            distComboPer.setDataSource(districtPerList);
            thanaCombo.value("");
            thanaCombo.text("");
            thanaCombo.setDataSource([{ ThanaID: 0, ThanaName: '---Select---' }]);
        });
    },
    ChangeEventForDistrictCombo: function () {
        $("#ddlPreDistrict").change(function () {
            var thanaCombo = $("#ddlPreThana").data("kendoComboBox");
            thanaCombo.value("");
            thanaCombo.text("");
            thanaCombo.setDataSource([{ ThanaID: 0, ThanaName: '---Select---' }]);

            var distid = $("#ddlPreDistrict").data("kendoComboBox").value();
            var thanaList = HrmCommonManager.GetAllThana(distid);
            thanaCombo.setDataSource(thanaList);
        });
        $("#ddlPerDistrict").change(function () {
            var thanaCombo = $("#ddlPerThana").data("kendoComboBox");
            thanaCombo.value("");
            thanaCombo.text("");
            thanaCombo.setDataSource([{ ThanaID: 0, ThanaName: '---Select---' }]);

            var distid = $("#ddlPerDistrict").data("kendoComboBox").value();
            var thanaList = HrmCommonManager.GetAllThana(distid);
            thanaCombo.setDataSource(thanaList);
        });
    },
    CreateContactObject: function () {
        var obj = new Object();
        obj.Mobile = $("#txtMobileNO").val();
        obj.Phone = $("#txtPhoneNO").val();
        obj.Email = $("#txtEmailPersonal").val();
        obj.EmailOffice = $("#txtEmailOfficial").val();
        obj.EmergContact = $("#txtEmergencyContact").val();
        obj.EmergContactName = $("#txtEmergencyContactName").val();
        obj.RelationWith = $("#txtRelationWith").val();
        obj.Fax = $("#txtFax").val();
        obj.SocialMediaID = $("#txtSocialMediaID").val();
        obj.PreVillage = $("#txtPreVillage").val();
        obj.PerVillage = $("#txtPerVillage").val();
        obj.PreRoad = $("#txtPreRoad").val();
        obj.PerRoad = $("#txtPerRoad").val();
        obj.PreDivisionID = $("#ddlPreDivision").data("kendoComboBox").value();
        obj.PerDivisionID = $("#ddlPerDivision").data("kendoComboBox").value();
        obj.PreThanaID = $("#ddlPreThana").data("kendoComboBox").value();
        obj.PerThanaID = $("#ddlPerThana").data("kendoComboBox").value();
        obj.PreDistrictID = $("#ddlPreDistrict").data("kendoComboBox").value();
        obj.PerDistrictID = $("#ddlPerDistrict").data("kendoComboBox").value();
        obj.PrePostOffice = $("#txtPrePostOffice").val();
        obj.PerPostOffice = $("#txtPerPostOffice").val();
        obj.PrePostCode = $("#txtPrePostCode").val();
        obj.PerPostCode = $("#txtPerPostCode").val();
        obj.PreVillageBan = $("#txtPreVillageBan").val();
        obj.PerVillageBan = $("#txtPerVillageBan").val();
        obj.PreRoadBan = $("#txtPreRoadBan").val();
        obj.PerRoadBan = $("#txtPerRoadBan").val();
        obj.PrePostOfficeBan = $("#txtPrePostOfficeBan").val();
        obj.PerPostOfficeBan = $("#txtPerPostOfficeBan").val();
        obj.BusStop = $("#txtBusStop").val();
        return obj;
    },
    CheckBoxChange: function () {
        $('#chkSameAsPresent').on('click', function (e) {
            var $cb = $(this);
            if ($cb.is(":checked")) {
                $("#txtPerVillage").val($("#txtPreVillage").val());
                $("#txtPerRoad").val($("#txtPreRoad").val());
                $("#txtPerPostOffice").val($("#txtPrePostOffice").val());
                $("#txtPerPostCode").val($("#txtPrePostCode").val());
                $("#txtPerVillageBan").val($("#txtPreVillageBan").val());
                $("#txtPerRoadBan").val($("#txtPreRoadBan").val());
                $("#txtPerPostOfficeBan").val($("#txtPrePostOfficeBan").val());
                $("#ddlPerDivision").data("kendoComboBox").value($("#ddlPreDivision").data("kendoComboBox").value());

                var perdivisionId = $("#ddlPerDivision").data("kendoComboBox").value();
                HrmCommonHelper.GenerateDistrictCombo("ddlPerDistrict", perdivisionId === null ? 0 : perdivisionId);
                $("#ddlPerDistrict").data("kendoComboBox").value($("#ddlPreDistrict").data("kendoComboBox").value());

                var perddistrictId = $("#ddlPerDistrict").data("kendoComboBox").value();
                HrmCommonHelper.GenerateThanaCombo("ddlPerThana", perddistrictId === null ? 0 : perddistrictId);
                $("#ddlPerThana").data("kendoComboBox").value($("#ddlPreThana").data("kendoComboBox").value());

            } else {
                $("#txtPerVillage").val("");
                $("#txtPerRoad").val("");
                $("#txtPerPostOffice").val("");
                $("#txtPerPostCode").val("");
                $("#txtPerVillageBan").val("");
                $("#txtPerRoadBan").val("");
                $("#txtPerPostOfficeBan").val("");
                $("#ddlPerDivision").data("kendoComboBox").value(0);

                var perdivisionId1 = $("#ddlPerDivision").data("kendoComboBox").value();
                HrmCommonHelper.GenerateDistrictCombo("ddlPerDistrict", perdivisionId1 === null ? 0 : perdivisionId1);
                $("#ddlPerDistrict").data("kendoComboBox").value(0);

                var perddistrictId1 = $("#ddlPerDistrict").data("kendoComboBox").value();
                HrmCommonHelper.GenerateThanaCombo("ddlPerThana", perddistrictId1 === null ? 0 : perddistrictId1);
                $("#ddlPerThana").data("kendoComboBox").value(0);

            }

        });

    }
}