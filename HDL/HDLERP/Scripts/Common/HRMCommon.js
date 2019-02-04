/// <reference path="common.js" />
var HrmCommonManager = {
    GetAllCompany: function () {
        var objComp = "";
        var jsonParam = "";
        var serviceUrl = "../Company/GetAllCompany/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objComp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objComp;
    },
    GetAllUnit: function () {
        var objUnit = "";
        var jsonParam = "";
        var serviceUrl = "../Unit/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objUnit = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objUnit;
    },
    GetAllDepartment: function () {
        var objDept = "";
        var jsonParam = "";
        var serviceUrl = "../Department/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDept = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objDept;
    },
    GetAllSection: function () {
        var objSec = "";
        var jsonParam = "";
        var serviceUrl = "../Section/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSec = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objSec;
    },
    GetAllWing: function () {
        var objWing = "";
        var jsonParam = "";
        var serviceUrl = "../Wing/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objWing = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objWing;
    },
    GetAllTeam: function () {
        var objTeam = "";
        var jsonParam = "";
        var serviceUrl = "../Team/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objTeam = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objTeam;
    },
    GetAllDesignation: function () {
        var objDes = "";
        var jsonParam = "";
        var serviceUrl = "../Designation/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDes = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objDes;
    },
    GetAllDesignationGroup: function () {
        var objDesGroup = "";
        var jsonParam = "";
        var serviceUrl = "../Designation/GetAllDesignationGroup/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDesGroup = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objDesGroup;
    },
    GetAllPosition: function () {
        var objPos = "";
        var jsonParam = "";
        var serviceUrl = "../Position/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objPos = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objPos;
    },
    GetAllEmploymentStatus: function () {
        var objEmpSt = "";
        var jsonParam = "";
        var serviceUrl = "../EmploymentStatus/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objEmpSt = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objEmpSt;
    },
    GetAllEmploymentType: function () {
        var objEmpTy = "";
        var jsonParam = "";
        var serviceUrl = "../EmploymentType/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objEmpTy = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objEmpTy;
    },
    GetAllEmploymentCategory: function () {
        var objEmpCat = "";
        var jsonParam = "";
        var serviceUrl = "../EmploymentCategory/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objEmpCat = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objEmpCat;
    },

    GetAllCountry: function () {
        var objCou = "";
        var jsonParam = "";
        var serviceUrl = "../Country/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCou = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objCou;
    },
    GetAllDivision: function () {
        var objCou = "";
        var jsonParam = "";
        var serviceUrl = "../Country/GetAllDivision/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCou = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objCou;
    },
    GetAllDistrict: function (divisionId) {
        var objCou = "";
        var jsonParam = "";
        var serviceUrl = "../Country/GetAllDistrict/?divisionId=" + divisionId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCou = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objCou;
    },
    GetAllThana: function (districtId) {
        var objCou = "";
        var jsonParam = "";
        var serviceUrl = "../Country/GetAllThana/?districtId=" + districtId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCou = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objCou;
    },
    GetAllGender: function () {
        var objGen = "";
        var jsonParam = "";
        var serviceUrl = "../Gender/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objGen = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objGen;
    },
    GetAllReligion: function () {
        var objRel = "";
        var jsonParam = "";
        var serviceUrl = "../Religion/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objRel = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objRel;
    },
    GetAllMaritalStatus: function () {
        var objMar = "";
        var jsonParam = "";
        var serviceUrl = "../MaritalStatus/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objMar = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objMar;
    },
    GetAllBloodGroup: function () {
        var objBlo = "";
        var jsonParam = "";
        var serviceUrl = "../BloodGroup/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objBlo = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objBlo;
    },
    GetAllShift: function () {
        var objShift = "";
        var jsonParam = "";
        var serviceUrl = "../EmployeeShift/GetAll/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objShift = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objShift;
    },

    GetAllShiftType: function () {
        var objShiftType = "";
        var jsonParam = "";
        var serviceUrl = "../Shift/GetAllShiftType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objShiftType = jsonData;
        }
        function onFailed(error) {
            alert(error.statusText);
        }
        return objShiftType;
    }
};


var HrmCommonHelper = {

    GenerateCompanyCombo: function (identity) {
        var objComp = HrmCommonManager.GetAllCompany();
        var obj = new Object();
        obj.CompanyName = "---Select---";
        obj.CompanyId = 0;
        objComp.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "CompanyName",
            dataValueField: "CompanyId",
            dataSource: objComp,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateUnitCombo: function (identity) {
        debugger;
        var objUnit = HrmCommonManager.GetAllUnit();
        //var obj = new Object();
        //obj.UnitName = "---Select---";
        //obj.UnitID = 0;
        //objUnit.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "UnitName",
            dataValueField: "UnitId",
            dataSource: objUnit,
            //index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDepartmentCombo: function (identity) {
        var objDepat = HrmCommonManager.GetAllDepartment();
        //var obj = new Object();
        //obj.DepartmentName = "---Select---";
        //obj.DepartmentID = 0;
        //objDepat.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "DepartmentName",
            dataValueField: "DepartmentID",
            dataSource: objDepat,
            //index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateSectionCombo: function (identity) {
        var objSec = HrmCommonManager.GetAllSection();
        var obj = new Object();
        obj.SectionName = "---Select---";
        obj.SectionID = 0;
        objSec.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "SectionName",
            dataValueField: "SectionID",
            dataSource: objSec,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateWingCombo: function (identity) {
        var objWing = HrmCommonManager.GetAllWing();
        var obj = new Object();
        obj.WingName = "---Select---";
        obj.WingID = 0;
        objWing.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "WingName",
            dataValueField: "WingID",
            dataSource: objWing,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateTeamCombo: function (identity) {
        var objTeam = HrmCommonManager.GetAllTeam();
        var obj = new Object();
        obj.TeamName = "---Select---";
        obj.TeamID = 0;
        objTeam.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "TeamName",
            dataValueField: "TeamID",
            dataSource: objTeam,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDesignationCombo: function (identity) {
        var objDes = HrmCommonManager.GetAllDesignation();
        var obj = new Object();
        obj.DesignationName = "---Select---";
        obj.DesignationID = 0;
        objDes.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "DesignationName",
            dataValueField: "DesignationID",
            dataSource: objDes,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDesignationGroupCombo: function (identity) {        
        var objDesGroup = HrmCommonManager.GetAllDesignationGroup();
        var obj = new Object();
        obj.DesGroupName = "---Select---";
        obj.DesGroupID = 0;
        objDesGroup.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "DesGroupName",
            dataValueField: "DesGroupID",
            dataSource: objDesGroup,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GeneratePositionCombo: function (identity) {
        var objPos = HrmCommonManager.GetAllPosition();
        var obj = new Object();
        obj.PositionName = "---Select---";
        obj.PositionID = 0;
        objPos.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "PositionName",
            dataValueField: "PositionID",
            dataSource: objPos,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateStatusCombo: function (identity) {
        var objSta = HrmCommonManager.GetAllEmploymentStatus();
        var obj = new Object();
        obj.EmpStatusName = "---Select---";
        obj.EmpStatusID = 0;
        objSta.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "EmpStatusName",
            dataValueField: "EmpStatusID",
            dataSource: objSta,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateStatusComboALL: function (identity) {
        var objSta = HrmCommonManager.GetAllEmploymentStatus();
        var obj = new Object();
        obj.EmpStatusName = "All";
        obj.EmpStatusID = 0;
        objSta.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "EmpStatusName",
            dataValueField: "EmpStatusID",
            dataSource: objSta,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateTypeCombo: function (identity) {
        var objTyp = HrmCommonManager.GetAllEmploymentType();
        var obj = new Object();
        obj.EmpTypeName = "---Select---";
        obj.EmpTypeID = 0;
        objTyp.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "EmpTypeName",
            dataValueField: "EmpTypeID",
            dataSource: objTyp,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateCategoryCombo: function (identity) {
        var objCat = HrmCommonManager.GetAllEmploymentCategory();
        var obj = new Object();
        obj.EmpCategoryName = "---Select---";
        obj.EmpCategoryID = 0;
        objCat.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "EmpCategoryName",
            dataValueField: "EmpCategoryID",
            dataSource: objCat,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateGenderCombo: function (identity) {
        var objGen = HrmCommonManager.GetAllGender();
        var obj = new Object();
        obj.GenderName = "---Select---";
        obj.GenderID = 0;
        objGen.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "GenderName",
            dataValueField: "GenderID",
            dataSource: objGen,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateReligionCombo: function (identity) {
        var objReli = HrmCommonManager.GetAllReligion();
        var obj = new Object();
        obj.ReligionName = "---Select---";
        obj.ReligionID = 0;
        objReli.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "ReligionName",
            dataValueField: "ReligionID",
            dataSource: objReli,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateMaritalStatusCombo: function (identity) {
        var objMari = HrmCommonManager.GetAllMaritalStatus();
        var obj = new Object();
        obj.MaritalStatusName = "---Select---";
        obj.MaritalStatusID = 0;
        objMari.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "MaritalStatusName",
            dataValueField: "MaritalStatusID",
            dataSource: objMari,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateBloodGroupCombo: function (identity) {
        var objBloo = HrmCommonManager.GetAllBloodGroup();
        var obj = new Object();
        obj.BloodGroupName = "---Select---";
        obj.BloodGroupID = 0;
        objBloo.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "BloodGroupName",
            dataValueField: "BloodGroupID",
            dataSource: objBloo,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateCountryCombo: function (identity) {
        var objCou = HrmCommonManager.GetAllCountry();
        var obj = new Object();
        obj.CountryName = "---Select---";
        obj.CountryID = 0;
        objCou.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "CountryName",
            dataValueField: "CountryID",
            dataSource: objCou,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDivisionCombo: function (identity) {
        var objdiv = HrmCommonManager.GetAllDivision();
        var obj = new Object();
        obj.DivisionName = "---Select---";
        obj.DivisionID = 0;
        objdiv.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "DivisionName",
            dataValueField: "DivisionID",
            dataSource: objdiv,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDistrictCombo: function (identity, divisionId) {
        var objdist = HrmCommonManager.GetAllDistrict(divisionId);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "DistrictName",
            dataValueField: "DistrictID",
            dataSource: objdist,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateThanaCombo: function (identity, districtId) {
        var objThana = HrmCommonManager.GetAllThana(districtId);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "ThanaName",
            dataValueField: "ThanaID",
            dataSource: objThana,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateShiftCombo: function (identity) {
        var objShift = HrmCommonManager.GetAllShift();
        var obj = new Object();
        obj.ShiftName = "---Select---";
        obj.ShiftID = 0;
        objShift.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "Select",
            dataTextField: "ShiftName",
            dataValueField: "ShiftID",
            dataSource: objShift,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateShiftTypeCombo: function (identity) {
    var objShift = HrmCommonManager.GetAllShiftType();
    var obj = new Object();
    obj.ShiftTypeName = "---Select---";
    obj.ShiftTypeID = 0;
    objShift.unshift(obj);
    $("#" + identity).kendoComboBox({
        placeholder: "Select",
        dataTextField: "ShiftTypeName",
        dataValueField: "ShiftTypeID",
        dataSource: objShift,
        index: 0,
        suggest: true,
        filter: "contains",
        change: function () {
            AjaxManager.isValidItem(identity, true);
        }
    });
}

};
