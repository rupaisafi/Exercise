var EmployeeWeekOffSummaryManager = {
    gridDataSource: function (empId) {
        var gridDataSource = new window.kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: false,
            transport: {
                read: {
                    url: '../EmployeeWeekOff/GetEmployeeWeekOff/?empId=' + empId,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
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
var EmployeeWeekOffSummaryHelper = {
    GenerateImployeeWeekOffGrid: function () {
        $("#grdEmployeeWeekOff").kendoGrid({
            dataSource: EmployeeWeekOffSummaryManager.gridDataSource(),
            filterable: false,
            sortable: true,
            //scrollable:true,
            columns: EmployeeWeekOffSummaryHelper.GenerateEmployeeWeekOffColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });
    },
    GenerateEmployeeWeekOffColumns: function () {
        var columns = [
            { field: "EmpID", hidden: true },
            { field: "DayID", hidden: true },
            { field: "DayName", title: "Day", editable: false },
            { field: "StartDate", title: "Start Date", editable: false, template: '#=kendo.toString(StartDate,"dd-MMM-yyyy")#' },
            { field: "EndDate", title: "End Date", editable: false, template: '#=kendo.toString(EndDate==null?"":EndDate,"dd-MMM-yyyy")#' },
            { field: "Remove", title: "Remove", filterable: false, template: '<button type="button" class="btn btn-danger btn-xs"  onClick="EmployeeWeekOffSummaryHelper.clickEventForRemoveButton()" ><span class="glyphicon glyphicon-remove"></span></button>' }
        ];
        return columns;
    }
};