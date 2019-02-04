var DepartmentSummaryManager = {
    gridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Department/GetDepartmentSummary/',
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
                        ExpDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }
                    }
                },
            }
        });
        return gridDataSource;
    }
};

var DepartmentSummaryHelper = {
    InitDepartmentSummary: function () {
        DepartmentSummaryHelper.GenerateDepartmentGrid();
    },

    GenerateDepartmentGrid: function () {
        $("#grdDepartmentSummary").kendoGrid({
            dataSource: DepartmentSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DepartmentSummaryHelper.GenerateDepartmentColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateDepartmentColumns: function () {
        return columns = [
               { field: "DepartmentID", hidden: true },
               { field: "DepartmentName", title: "Department Name", width: 70, editable: false },
               { field: "DepartmentNameBan", title: "Department Name Ban", width: 70, editable: false },
               { field: "IsActive", title: "Activity", width: 50, editable: false, template: '#=IsActive==true?"Active":"InActive"#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DepartmentSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdDepartmentSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            DepartmentDetailsHelper.FillForm(selectedItem);
        }
    },
};

