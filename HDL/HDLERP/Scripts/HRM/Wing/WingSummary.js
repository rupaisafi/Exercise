var WingSummaryManager = {
    gridDataSource: function () {
        debugger
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Wing/GetWingSummary/',
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

var WingSummaryHelper = {
    InitWingSummary: function () {
        WingSummaryHelper.GenerateWingGrid();
    },

    GenerateWingGrid: function () {
        $("#grdWingSummary").kendoGrid({
            dataSource: WingSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: WingSummaryHelper.GenerateWingColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateWingColumns: function () {
        return columns = [
               { field: "WingID", hidden: true },
               { field: "WingName", title: "Wing Name", width: 70, editable: false },
               { field: "WingNameBan", title: "Wing Name Ban", width: 70, editable: false },
               { field: "IsActive", title: "Activity", width: 50, editable: false, template: '#=IsActive==true?"Active":"InActive"#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="WingSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdWingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            WingDetailsHelper.FillForm(selectedItem);
        }
    },
};

