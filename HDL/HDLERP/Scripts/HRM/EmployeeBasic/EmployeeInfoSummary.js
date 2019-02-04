/// <reference path="employeeinfodetails.js" />


var EmployeeInfoSummaryManager = {
    gridDataSource: function () {
        var gridDataSource = new window.kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 7,
            transport: {
                read: {
                    url: '../EmployeeBasic/GetEmployeeInfoSummary/',
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
                        JoiningDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        },
                        DateOfBirth: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }

                    }
                }
            }
        });
        return gridDataSource;
    },
    GenerateEmpProfileReport: function(obj) {
        
    }
};

var EmployeeInfoSummaryHelper = {
    InitEmployeeInfoSummary: function () {
        EmployeeInfoSummaryHelper.GenerateImployeeInfoGrid();
    },
    GenerateImployeeInfoGrid: function () {
        $("#grdEmployeeInfo").kendoGrid({
            dataSource: EmployeeInfoSummaryManager.gridDataSource(),

            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: EmployeeInfoSummaryHelper.GenerateEmployeeInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },
    GenerateEmployeeInfoColumns: function () {
        var columns = [
            { field: "Image64", title: "Photo", width: 10, template: "<img style='width:60px;height:60px;' src ='data:image/png;base64,${Image64}'/>" ,filterable:false,sortable:false},
            { field: "EmpID", hidden: true },
            { field: "EmpCode", title: "ID No", width: 8, editable: false },
            { field: "PunchNo", title: "Punch No", width: 10, editable: false },
            { field: "NameEng", title: "Name", width: 25, editable: false },
            { field: "DesignationName", title: "Designation", width: 20, editable: false },
            { field: "JoiningDate", title: "Date of Join", width: 12, editable: false, template: '#=kendo.toString(JoiningDate==null?"":JoiningDate,"dd-MMM-yyyy")#' },
            { field: "UnitName", title: "Unit", width: 20, editable: false },
            { field: "DepartmentName", title: "Department", width: 20, editable: false },
            { field: "SectionName", title: "Section", width: 20, editable: false },
            { field: "Edit", title: "Action", filterable: false, width: 17, template: '<button type="button" class="btn btn-primary btn-sm" onClick="EmployeeInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-success btn-sm" onClick="EmployeeInfoSummaryHelper.clickEventForViewButton()" ><span class="glyphicon glyphicon-eye-open"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" onClick="EmployeeInfoSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }

        ];
        return columns;
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdEmployeeInfo").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem !== null) {
            $("#divEmpDetails").show();
            $("#divEmployeeSummary").hide();
            debugger;
            EmployeeInfoDetailsHelper.FillForm(selectedItem);
            EmployeeInfoDetailsHelper.FillEducationGrid(selectedItem);
            document.getElementById("imgEmpPhoto").src = "data:image/png;base64," + selectedItem.Image64;
            EmployeeInfoDetailsHelper.FillContactInfo(selectedItem);
            EmployeeInfoPassporAndDrivingHelper.FillDrivingForm(selectedItem);
            EmployeeInfoPassporAndDrivingHelper.FillPassportForm(selectedItem);
        }
    },
    clickEventForViewButton: function () {
        var entityGrid = $("#grdEmployeeInfo").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem !== null) {
           // EmployeeInfoSummaryManager.GenerateEmpProfileReport(selectedItem);
        }
    }
};