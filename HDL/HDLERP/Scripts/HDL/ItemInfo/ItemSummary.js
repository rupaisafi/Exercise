
var ItemInfoSummaryManager = {
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
                    url: '../ItemInfo/GetItemInfoSummary/',
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

var ItemInfoSummaryHelper = {
    InitItemInfoSummary: function () {
        ItemInfoSummaryHelper.GenerateItemInfoGrid();
    },

    GenerateItemInfoGrid: function () {
        $("#grdItemInfoSummary").kendoGrid({
            dataSource: ItemInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: ItemInfoSummaryHelper.GenerateItemInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });

    },
    GenerateItemInfoColumns: function () {
        return columns = [
               { field: "IID", hidden: true },
               { field: "ICNo", title: "Item Code", width: 40, editable: false },
               { field: "ICName", title: "Name", width: 80, editable: false },
               { field: "ShortName", title: "Short Name", width: 50, editable: false },
               { field: "Unit", title: "Unit", width: 50 },
               { field: "SRate", title: "Rate", width: 60, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="ItemInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdItemInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            ItemInfoDetailsHelper.FillItemInfo(selectedItem);
        }

    },
};

