var FinishingStockSummaryManager = {
    gridDataSource: function (dateFrom, dateTo) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../FinishingFloorStock/GetStockSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
                        FDate: {
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

var FinishingStockSummaryHelper = {
    InitFinishingStockSummary: function () {
        FinishingStockSummaryHelper.GenerateDatePicker();
        FinishingStockSummaryHelper.GenerateFinishingStockGrid();
        $("#txtSearchDateFrom").change(function () {
            FinishingStockSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            FinishingStockSummaryHelper.SearchDateChangeEvent();
        });
        $("#btnSearchWarping").click(function () {
            FinishingStockSummaryHelper.SearchDateChangeEvent();
        });
    },
    GenerateFinishingStockGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#grdFinishingStockSummary").kendoGrid({
            dataSource: FinishingStockSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            filterable: true,
            sortable: true,
            columns: FinishingStockSummaryHelper.GenerateFinishingStockColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateFinishingStockColumns: function () {
        return columns = [
               { field: "FID", title: "FID", width: 50, editable: false, },
               { field: "FDate", title: "Production Date", width: 50, editable: false, template: '#=kendo.toString(FDate,"dd-MMM-yyyy")#' },
               { field: "Remarks", title: "Remarks", width: 40 },
               { field: "Stock", title: "Stock", width: 50 },
              
              
               //{ field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FinishingProdSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="FinishingStockSummaryHelper.clickEventForEditButton(this)" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
        ];
    },
    clickEventForEditButton: function (e) {

        var row = $(e).closest("tr");
        var entityGrid = $("#grdFinishingStockSummary").data("kendoGrid");
        entityGrid.select(row);
        var selectedItem = entityGrid.dataItem(row);

        //var entityGrid = $("#grdFinishingStockSummary").data("kendoGrid");
        //var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {

            var today = selectedItem.FDate;
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = dd + '/' + mm + '/' + yyyy;


            $('#FID').val() === undefined || $('#FID').val() === null ? 0 : $('#FID').val(selectedItem.FID);
            $('#Fdate').val(today);
            $('#remarks').val(selectedItem.Remarks);
            $('#Stock').val(selectedItem.Stock);
           angular.element(document.getElementById('mainController')).scope().GetDetail(selectedItem.FID);
        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = FinishingStockSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdFinishingStockSummary").data("kendoGrid");
        grid.setDataSource(data);
    },
    GenerateDatePicker: function () {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $("#txtSearchDateFrom").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: firstDay
        });
        $("#txtSearchDateTo").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: lastDay
        });
    },
};