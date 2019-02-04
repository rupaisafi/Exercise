
var InventoryGroupSummaryManager = {
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
                    url: '../InventoryGroup/GetInventoryGroupSummary/',
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
                        Date: {
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

var InventoryGroupSummaryHelper = {
    InitInventoryGroupSummary: function () {
        InventoryGroupSummaryHelper.GenerateInventoryGroupGrid();
    },

    GenerateInventoryGroupGrid: function () {
        $("#grdInventoryGroupSummary").kendoGrid({
            dataSource: InventoryGroupSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: InventoryGroupSummaryHelper.GenerateInventoryGroupColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateInventoryGroupColumns: function () {
        return columns = [
               { field: "AGIG", hidden: true },
               { field: "IGCode", title: "IG Code", width: 50, editable: false },
               { field: "IGName", title: "IG Name", width: 50, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="InventoryGroupSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdInventoryGroupSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            
            InventoryGroupDetailsHelper.FillForm(selectedItem);
        }

    }
};

