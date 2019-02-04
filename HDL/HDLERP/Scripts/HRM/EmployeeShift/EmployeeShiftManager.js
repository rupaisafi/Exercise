
/// <reference path="employeeshiftsummary.js" />
/// <reference path="../employeesearch/empsearchparam.js" />
/// <reference path="employeeshift.js" />
/// <reference path="../employeeweekoff/employeeweekoff.js" />
/// <reference path="../../common/hrmcommon.js" />

$(document).ready(function () {
    pageId = 1;
    EmployeeTreeHelper.InitEmployeeTree();
    EmpSearchParamHelper.InitEmpSearchParam();
    EmployeeSummaryHelper.InitEmployeeSummary();
    //$("#grdEmployee").data("kendoGrid").hideColumn(0);
    //var grid = $("#grdEmployee").data("kendoGrid");
    ////grid.hideColumn("View");

    //var oldOptions = grid.getOptions();
    //oldOptions.columns = [
    //    { field: "View", title: "Shift View", width: 100, filterable: false, template: '<button type="button" class="btn btn-default btn-sm" value="View"  onClick="EmployeeShiftSummaryHelper.clickEventForViewButton()" ><span class="glyphicon glyphicon-edit"></span></button>' }
    //];
    //grid.setOptions(oldOptions);

    EmployeeShiftHelper.InitEmployeeShift();
    EmployeeShiftSummaryHelper.InitEmployeeShift();
    EmployeeWeekOffHelper.InitEmployeeWeekOff();
});


