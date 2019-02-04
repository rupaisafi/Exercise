var DesignationSummaryManager = {
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
                    url: '../Designation/GetDesignationSummary/',
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

var DesignationSummaryHelper = {
    InitDesignationSummary: function () {
        DesignationSummaryHelper.GenerateDesignationGrid();
    },

    GenerateDesignationGrid: function () {
        $("#grdDesignationSummary").kendoGrid({
            dataSource: DesignationSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DesignationSummaryHelper.GenerateDesignationColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateDesignationColumns: function () {
        return columns = [
               { field: "DesignationID", hidden: true },
               { field: "DesignationName", title: "Designation Name", width: 60, editable: false },
               { field: "DesignationNameBan", title: "Designation Name Ban", width: 60, editable: false },
               { field: "DesGroupName", title: "Group", width: 40, editable: false },
               { field: "Grade", title: "Grade", width: 40, editable: false },
               { field: "OrderBy", title: "Order By", width: 40, editable: false },
               { field: "IsActive", title: "Activity", width: 25, editable: false, template: '#=IsActive==true?"Active":"InActive"#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 18, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DesignationSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdDesignationSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            DesignationDetailsHelper.FillForm(selectedItem);
        }
    },
};

