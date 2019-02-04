var InspRejRefinSummaryManager = {
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
                    url: '../FabRejRefin/GetSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
                            type: "Sdate",
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

var InspRejRefinSummaryHelper = {
    InitInspRejRefinSummary: function () {
        InspRejRefinSummaryHelper.GenerateDatePicker();
        InspRejRefinSummaryHelper.GenerateInspRejRefinGrid();
        $("#txtSearchDateFrom").change(function () {
            InspRejRefinSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            InspRejRefinSummaryHelper.SearchDateChangeEvent();
        });
        $("#btnSearchWarping").click(function () {
            InspRejRefinSummaryHelper.SearchDateChangeEvent();
        });
    },
    GenerateInspRejRefinGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#grdInspRejRefinSummary").kendoGrid({
            dataSource: InspRejRefinSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            filterable: true,
            sortable: true,
            columns: InspRejRefinSummaryHelper.GenerateInspRejRefinColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateInspRejRefinColumns: function () {
        return columns = [
               { field: "ID", title: "ID", width: 50, editable: false, },
               { field: "SDate", title: "SDate", width: 50, editable: false, template: '#=kendo.toString(SDate,"dd-MMM-yyyy")#' },
               { field: "UCode", title: "WV Floor Code", width: 50 },
               { field: "UName", title: "WV Floor", width: 50 },
               { field: "InsFloorCode", title: "Ins Unit Code", width: 50 },
               { field: "InsFloorName", title: "Ins Unit", width: 50 },
               { field: "TotalProd", title: "Total Prod", width: 50 },


               //{ field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FinishingProdSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="InspRejRefinSummaryHelper.clickEventForEditButton(this)" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
        ];
    },
    clickEventForEditButton: function (e) {
        var row = $(e).closest("tr");
        var entityGrid = $("#grdInspRejRefinSummary").data("kendoGrid");
        entityGrid.select(row);
        var selectedItem = entityGrid.dataItem(row)

        if (selectedItem != null) {

            var today = new Date(selectedItem.SDate);
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
            $('#TotalProd').val(selectedItem.TotalProd);
            $("#InsUnit").data("kendoComboBox").value(selectedItem.InsFloorCode)
            $("#WVFloor").data("kendoComboBox").value(selectedItem.UCode)
            angular.element(document.getElementById('mainController')).scope().GetDetail(parseInt(selectedItem.ID));
        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = InspRejRefinSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdInspRejRefinSummary").data("kendoGrid");
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