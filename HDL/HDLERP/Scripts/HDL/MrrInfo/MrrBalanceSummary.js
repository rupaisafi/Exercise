
var MrrBalanceSummaryManager = {
    gridDataSource: function (lcNo) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
           // pageSize: 10,
            transport: {
                read: {
                    url: '../MReceive/GetMrrBalanceSummary/?lcNo=' + lcNo,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    async: false
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items", total: "Totalcount",
                model: {
                    fields: {
                       
                    }
                }

            }
        });
        return gridDataSource;
    }
};

var MrrBalanceSummaryHelper = {
    InitMrrBalanceSummary: function () {
        MrrBalanceSummaryHelper.GenerateMrrBalanceGrid();
    },

    GenerateMrrBalanceGrid: function () {
        $("#grdMrrBalanceSummary").kendoGrid({
            dataSource: [],//MrrBalanceSummaryManager.gridDataSource(),
            pageable: false,
            filterable: false,
            sortable: false,
            columns: MrrBalanceSummaryHelper.GenerateMrrBalanceColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"
        });

    },
    GenerateMrrBalanceColumns: function () {
        return columns = [
               { field: "SupplierName", title: "SupplierName", width:90, editable: false, sortable: true },
               { field: "LCNo", title: "L.C.No", width: 60, editable: false, sortable: true },
               { field: "InvoiceNo", title: "Invoice No", width: 60, editable: false },
               { field: "IcName", title: "Item Name", width: 70 },
               { field: "LCQnty", title: "L.C. Qnty", width: 40 },
               { field: "LCRate", title: "L.C. Rate", width: 40 },
               { field: "LCValue", title: "L.C. Value", width: 40 },
               { field: "RecQnty", title: "Rcv. Qnty", width: 40 },
               { field: "RecValue", title: "Rcv. Value", width: 40 },
               { field: "BalQnty", title: "Bal. Qnty", width: 40 },
               { field: "BalValue", title: "Bal. Value", width: 40 }

        ];
    },
    LoadMrrBalanceGrid: function (lcno) {
        var data = MrrBalanceSummaryManager.gridDataSource(lcno);
        var grid = $("#grdMrrBalanceSummary").data("kendoGrid");
        grid.setDataSource(data);
    }
};

