
var FinishingSummaryManager = {
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
                    url: '../SupplierInfo/GetSupplierInfoSummary/',
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
                },
            }
        });
        return gridDataSource;
    }
};

var FinishingSummaryHelper = {
    InitFinishingSummary: function () {
        FinishingSummaryHelper.GenerateFinishingInfoGrid();
    },

    GenerateFinishingInfoGrid: function () {
        $("#grdFinishingSummary").kendoGrid({
            dataSource: [],// FinishingSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: FinishingSummaryHelper.GenerateFinishingInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateFinishingInfoColumns: function () {
        return columns = [
               { field: "YarnCode", hidden: true },
               { field: "Colour", title: "Colour", width: 70, editable: false },
               { field: "YarnLot", title: "Yarn Lot", width: 50, editable: false },
               { field: "Qnty", title: "Yarn Qty (Kg)", width: 50 },
               { field: "Rate", title: "Rate", width: 60, editable: false },
               { field: "BeemNo", title: "Beem", width: 60, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FinishingSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdFinishingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            // SupplierInfoDetailsHelper.FillForm(selectedItem);
        }

    },
};

