
var OrderInfoSummaryManager = {
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
                    url: '../OrderInfo/GetOrderInfoSummary/',
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
                        OrderDate: {
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

var OrderInfoSummaryHelper = {
    InitOrderInfoSummary: function () {
        OrderInfoSummaryHelper.GenerateOrderInfoGrid();
    },

    GenerateOrderInfoGrid: function () {
        $("#grdOrderInfoSummary").kendoGrid({
            dataSource: OrderInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
               // pageSizes: [2, 3, 4, "All"]
            },
            filterable: true,
            sortable: true,
            columns: OrderInfoSummaryHelper.GenerateOrderInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        
           // columnMenu: true,
        });

    },
    GenerateOrderInfoColumns: function () {
        return columns = [
               { field: "OrderId", hidden: true },
               { field: "OrderNo", title: "Order No", width: 40, editable: false,sortable:true },
               { field: "OrderDate", title: "Date", width: 40, editable: false, template: '#=kendo.toString(OrderDate,"dd-MMM-yyyy")#' },
               { field: "BuyerName", title: "Buyer", width: 80 },
               { field: "CustomerName", title: "Customer", width: 80 },
               { field: "UserName", title: "Mkt Person", width: 80, hidden: true },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="OrderInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
               
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdOrderInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
     
        if (selectedItem != null) {
            $("#divOrderInfoDetails").show();
            $("#divOrderSummary").hide();
            $("#btnGenerateOrderNo").hide();
            OrderInfoDetailsHelper.FillForm(selectedItem);
            OrderInfoDetailsHelper.FillAllGrid(selectedItem.OrderNo);

          
        }

    },


};

