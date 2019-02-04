
var BuyerInfoSummaryManager = {
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
                    url: '../BuyerInfo/GetBuyerInfoSummary/',
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

var BuyerInfoSummaryHelper = {
    InitBuyerInfoSummary: function () {
        BuyerInfoSummaryHelper.GenerateBuyerInfoGrid();
    },

    GenerateBuyerInfoGrid: function () {
        $("#grdBuyerInfoSummary").kendoGrid({
            dataSource: BuyerInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: BuyerInfoSummaryHelper.GenerateBuyerInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });

    },
    GenerateBuyerInfoColumns: function () {
        return columns = [
               { field: "BuyerId", hidden: true },
               { field: "BuyerName", title: "Name", width: 70, editable: false },
               { field: "PhoneNoPer", title: "Phone", width: 50, editable: false },
               { field: "Email", title: "Email", width: 50 },
               { field: "BuyerAddr", title: "Address", width: 60, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="BuyerInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdBuyerInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            BuyerInfoDetailsHelper.FillForm(selectedItem);
        }

    },
};

