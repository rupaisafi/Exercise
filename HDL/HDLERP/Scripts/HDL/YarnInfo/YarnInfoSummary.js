
var YarnInfoSummaryManager = {
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
                    url: '../YarnInfo/GetYarnInfoSummary/',
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

var YarnInfoSummaryHelper = {
    InitYarnInfoSummary: function () {
        YarnInfoSummaryHelper.GenerateYarnInfoGrid();
    },

    GenerateYarnInfoGrid: function () {
        $("#grdYarnInfoSummary").kendoGrid({
            dataSource:YarnInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: YarnInfoSummaryHelper.GenerateYarnInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateYarnInfoColumns: function () {
        return columns = [
               { field: "YarnId", hidden: true },
             //{ field: "YarnName", title: "Yarn Name", width: 70, editable: false },
               { field: "YarnCode", title: "Yarn Code", width: 50, editable: false },
               { field: "ItemName", title: "Item Name", width: 70, editable: false },
             //{ field: "SupplierName", title: "Supplier", width: 50 },
               { field: "SlubLengthCM", title: "Slub Length CM", width: 50 },
               { field: "PauseCM", title: "Pause CM", width: 50 },
               { field: "ThiknessTime", title: "Thikness Time", width: 50 },
               { field: "SlubPerMtr", title: "Slub Per Mtr", width: 50 },
               { field: "Edit", title: "Edit/View", filterable: false, width: 25, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="YarnInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdYarnInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            YarnInfoDetailsHelper.FillForm(selectedItem);
        }

    },
};

