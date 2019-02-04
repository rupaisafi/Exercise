var FinishingProdSummaryManager = {
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
                    url: '../FinishingProduction/GetProductionSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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

var FinishingProdSummaryHelper = {
    InitFinishingProdSummary: function () {
        FinishingProdSummaryHelper.GenerateDatePicker();
        FinishingProdSummaryHelper.GenerateFinishingProdGrid();
        $("#txtSearchDateFrom").change(function () {
            FinishingProdSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            FinishingProdSummaryHelper.SearchDateChangeEvent();
        });
        $("#btnSearchWarping").click(function () {
            FinishingProdSummaryHelper.SearchDateChangeEvent();
        });
    },
    GenerateFinishingProdGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#grdFinishingProductionSummary").kendoGrid({
            dataSource: FinishingProdSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: true,
            sortable: true,
            columns: FinishingProdSummaryHelper.GenerateFinishingProdColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateFinishingProdColumns: function () {
        return columns = [
               { field: "FID", title: "FID", width: 50, editable: false, },
               { field: "FDate", title: "Production Date", width: 50, editable: false, template: '#=kendo.toString(FDate,"dd-MMM-yyyy")#' },
               { field: "Shift", title: "Shift", width: 50, editable: false },
               { field: "Remarks", title: "Remarks", width: 40 },
               { field: "MCRunTime", title: "MCRunTime", width: 50 },
               { field: "MCOffTime", title: "MCOffTime", width: 50 },
               { field: "MCName", title: "MCName", width: 80 },
               { field: "PType", title: "PType", width: 80 },
               //{ field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FinishingProdSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
               { field: "Edit", title: "Edit/View", selectable: true, filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="FinishingProdSummaryHelper.clickEventForEditButton(this)" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
        ];
    },
    clickEventForEditButton: function (e) {
        var row = $(e).closest("tr");
        var entityGrid = $("#grdFinishingProductionSummary").data("kendoGrid");
        entityGrid.select(row);
        var selectedItem = entityGrid.dataItem(row);

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
            $("#mcType").data("kendoComboBox").value(selectedItem.MCCode);
            $("#mcType").data("kendoComboBox").text(selectedItem.MCName);
            $("#DyeFloor").data("kendoComboBox").value(selectedItem.UCode);
            $("#DyeFloor").data("kendoComboBox").text(selectedItem.UName);
            $("#Shift").data("kendoComboBox").value(selectedItem.ShiftCode);
            $("#Shift").data("kendoComboBox").text(selectedItem.Shift);
            $("#prodType").data("kendoComboBox").value(selectedItem.PCode);
            $("#prodType").data("kendoComboBox").text(selectedItem.PType);
            $("#runtime").val(selectedItem.MCRunTime);
            $("#offTime").val(selectedItem.MCOffTime);
            $(".remarks").val(selectedItem.Remarks);
            $("#Fdate").val(today);
            angular.element(document.getElementById('mainController')).scope().GetDetail(selectedItem.FID);
        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = FinishingProdSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdFinishingProductionSummary").data("kendoGrid");
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