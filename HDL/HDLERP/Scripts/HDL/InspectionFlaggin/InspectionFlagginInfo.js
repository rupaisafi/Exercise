var FlagginSummaryManager = {
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
                    url: '../InspectionFlaggin/GetSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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

var FlagginSummaryHelper = {
    InitSummary: function () {
        FlagginSummaryHelper.GenerateDatePicker();
        FlagginSummaryHelper.GenerateGrid();
        $("#txtSearchDateFrom").change(function () {
            FlagginSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            FlagginSummaryHelper.SearchDateChangeEvent();
        });
        $("#btnSearchWarping").click(function () {
            FlagginSummaryHelper.SearchDateChangeEvent();
        });
    },
    GenerateGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#grdSummary").kendoGrid({
            dataSource: FlagginSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            filterable: true,
            sortable: true,
            columns: FlagginSummaryHelper.GenerateColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateColumns: function () {
        return columns = [
               { field: "ID", title: "ID", width: 50, editable: false, },
               { field: "FDate", title: "FDate", width: 50, editable: false, template: '#=kendo.toString(FDate,"dd-MMM-yyyy")#' },
               { field: "InsFloorCode", title: "Ins Unit Code", width: 50 },
               { field: "InsFloorName", title: "Ins Unit", width: 50 },
               { field: "Remarks", title: "Remarks", width: 50 },


               //{ field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FinishingProdFlagginSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="FlagginSummaryHelper.clickEventForEditButton(this)" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
        ];
    },
    clickEventForEditButton: function (e) {
        var row = $(e).closest("tr");
        var entityGrid = $("#grdSummary").data("kendoGrid");
        entityGrid.select(row);
        var selectedItem = entityGrid.dataItem(row)

        if (selectedItem != null) {

            var today = new Date(selectedItem.FDate);
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


            $('#ID').val() === undefined || $('#ID').val() === null ? 0 : $('#ID').val(selectedItem.ID);
            $('#Fdate').val(today);
            $("#InsUnit").data("kendoComboBox").value(selectedItem.InsFloorCode);
            $('#remarks').val(selectedItem.Remarks);
            angular.element(document.getElementById('mainController')).scope().GetDetail(parseInt(selectedItem.ID));
        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = FlagginSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdSummary").data("kendoGrid");
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