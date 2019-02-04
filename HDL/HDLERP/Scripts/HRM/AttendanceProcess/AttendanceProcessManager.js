
/// <reference path="../employeesearch/empsearchparam.js" />
/// <reference path="../employeeweekoff/employeeweekoff.js" />
/// <reference path="attendanceprocess.js" />
/// <reference path="../../common/hrmcommon.js" />

$(document).ready(function () {
    pageId = 3;
    EmployeeTreeHelper.InitEmployeeTree();
    EmpSearchParamHelper.InitEmpSearchParam();
    EmployeeSummaryHelper.InitEmployeeSummary();
    AttendanceProcessHelper.InitAttendanceProcess();
});