
/// <reference path="../employeesearch/empsearchparam.js" />
/// <reference path="../employeeweekoff/employeeweekoff.js" />
/// <reference path="employeeseparation.js" />
/// <reference path="../../common/hrmcommon.js" />

$(document).ready(function () {
    pageId = 2;
    EmployeeTreeHelper.InitEmployeeTree();
    EmpSearchParamHelper.InitEmpSearchParam();
    EmployeeSummaryHelper.InitEmployeeSummary();
    $("#grdEmployee").data("kendoGrid").hideColumn(0);
    EmployeeSeparationHelper.InitEmployeeSeparation();
    //EmployeeSeparationSummaryHelper.InitEmployeeSeparation();
});