/// <reference path="../employeeweekoff/employeeweekoffsummary.js" />
var EmployeeShiftSummaryManager = {
    gridDataSource: function (empId) {
        var gridDataSource = new window.kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: false,
            transport: {
                read: {
                    url: '../EmployeeShift/GetEmployeeShift/?empId=' + empId,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                    //async: false,
                    //cache: false
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        StartDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        },
                        EndDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }

                    }
                }
            }
        });
        return gridDataSource;
    }

};
var EmployeeShiftSummaryHelper = {
    InitEmployeeShift: function () {
        $("#divShiftSummary").kendoWindow({
            title: "History",
            resizeable: true,
            scrollable: true,
            width: "50%",
            actions: ["Close"], //["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            //  pinned: true,
            animation: {
                close: {
                    effects: "fade:out"
                }
            }
        });
        EmployeeShiftSummaryHelper.GenerateImployeeShiftGrid();
        EmployeeWeekOffSummaryHelper.GenerateImployeeWeekOffGrid();
    },
    clickEventForViewButton: function () {
        var entityGrid = $("#grdEmployee").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#divShiftSummary").data("kendoWindow").open().center();
            var dataSource = EmployeeShiftSummaryManager.gridDataSource(selectedItem.EmpID);
            var grid = $("#grdEmployeeShift").data("kendoGrid");
            grid.setDataSource(dataSource);

            var dataSourceW = EmployeeWeekOffSummaryManager.gridDataSource(selectedItem.EmpID);
            var gridw = $("#grdEmployeeWeekOff").data("kendoGrid");
            gridw.setDataSource(dataSourceW);
        }
    },
    clickEventForRemoveButton: function () {
        var shiftGrid = $("#grdEmployeeShift").data("kendoGrid");
        var selectedItem = shiftGrid.dataItem(shiftGrid.select());
        if (selectedItem != null) {
            debugger;
        }
    },
    GenerateImployeeShiftGrid: function () {
        $("#grdEmployeeShift").kendoGrid({
            dataSource: EmployeeShiftSummaryManager.gridDataSource(),
            filterable: false,
            sortable: true,
            //scrollable:true,
            columns: EmployeeShiftSummaryHelper.GenerateEmployeeShiftColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });
    },
    GenerateEmployeeShiftColumns: function () {
        var columns = [
            { field: "EmpID", hidden: true },
            { field: "ShiftID", hidden: true },
            { field: "ShiftName", title: "Shift", editable: false },
            { field: "StartDate", title: "Start Date", editable: false, template: '#=kendo.toString(StartDate,"dd-MMM-yyyy")#' },
            { field: "EndDate", title: "End Date", editable: false, template: '#=kendo.toString(EndDate==null?"":EndDate,"dd-MMM-yyyy")#' },
            { field: "Remove", title: "Remove", filterable: false, template: '<button type="button" class="btn btn-danger btn-xs" onClick="EmployeeShiftSummaryHelper.clickEventForRemoveButton()" ><span class="glyphicon glyphicon-remove"></span></button>' }
        ];
        return columns;
    }
};