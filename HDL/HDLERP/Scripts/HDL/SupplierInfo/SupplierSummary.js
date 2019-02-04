
var SupplierInfoSummaryManager = {
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

var SupplierInfoSummaryHelper = {
    InitSupplierInfoSummary: function () {
        SupplierInfoSummaryHelper.GenerateSupplierInfoGrid();
    },

    GenerateSupplierInfoGrid: function () {
        $("#grdSupplierInfoSummary").kendoGrid({
            dataSource: SupplierInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: SupplierInfoSummaryHelper.GenerateSupplierInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateSupplierInfoColumns: function () {
        return columns = [
               { field: "SupplierId", hidden: true },
               { field: "SupplierCode", title: "Code", width: 50, editable: false },
               { field: "SupplierName", title: "Name", width: 80, editable: false },
               { field: "PhoneNoPer", title: "Phone", width: 50, editable: false },
               { field: "Email", title: "Email", width: 50 },
               { field: "SupplierAddr", title: "Address", width: 60, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="SupplierInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdSupplierInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            SupplierInfoDetailsHelper.FillForm(selectedItem);
        }

    },
};

