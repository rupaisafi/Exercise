
var FabTypeSummaryManager = {
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
                    url: '../FabricType/GetFabricTypeSummary/',
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

var FabTypeSummaryHelper = {
    InitFabTypeSummary: function () {
        FabTypeSummaryHelper.GenerateFabTypeGrid();
    },

    GenerateFabTypeGrid: function () {
        $("#grdFabTypeSummary").kendoGrid({
            dataSource: FabTypeSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: FabTypeSummaryHelper.GenerateFabTypeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateFabTypeColumns: function () {
        return columns = [
               { field: "FabTypeCode", hidden: true },
               { field: "TypeHead", title: "Type", width: 50, editable: false },
               { field: "Remarks", title: "Remarks", width: 50, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FabTypeSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdFabTypeSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            
            FabTypeDetailsHelper.FillForm(selectedItem);
        }

    }
};

