
var MrrInfoSummaryManager = {
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
                    url: '../MReceive/GetMrrInfoSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
                        MrrDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        },
                        InvDate: {
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

var MrrInfoSummaryHelper = {
    InitMrrInfoSummary: function () {
        MrrInfoSummaryHelper.GenerateDatePicker();
        MrrInfoSummaryHelper.GenerateMrrInfoGrid();
        $("#txtSearchDateFrom").change(function () {
            MrrInfoSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            MrrInfoSummaryHelper.SearchDateChangeEvent();
        });
    },

    GenerateMrrInfoGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");
        $("#grdMrrInfoSummary").kendoGrid({
            dataSource: MrrInfoSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: MrrInfoSummaryHelper.GenerateMrrInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });

    },
    GenerateMrrInfoColumns: function () {
        return columns = [
               { field: "RID", hidden: true },
               { field: "MRRNo", title: "Mrr No", width: 40, editable: false, sortable: true },
               { field: "MrrDate", title: "Mrr Date", width: 40, editable: false, template: '#=kendo.toString(MrrDate,"dd-MMM-yyyy")#' },
               { field: "InvNo", title: "Invoice No", width: 80 },
               { field: "InvDate", title: "Invoice Date", width: 80, template: '#=kendo.toString(InvDate,"dd-MMM-yyyy")#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="MrrInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdMrrInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#divMrrInfoDetails").show();
            $("#divMrrSummary").hide();
            MrrInfoDetailsHelper.FillForm(selectedItem);
            MrrInfoDetailsHelper.FillAllGrid(selectedItem.RID);
        }

    },
    GenerateDatePicker: function () {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $("#txtSearchDateFrom").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: firstDay
        });
        $("#txtSearchDateTo").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = MrrInfoSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdMrrInfoSummary").data("kendoGrid");
        grid.setDataSource(data);
    },

};

