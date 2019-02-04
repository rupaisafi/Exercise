var FinishingRubberBeltSummaryManager = {
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
                    url: '../FinishingRubberBelt/GetProductionSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
                        SettingDate: {
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

var FinishingRubberBeltSummaryHelper = {
    InitFinishingRubberBeltSummary: function () {
        FinishingRubberBeltSummaryHelper.GenerateDatePicker();
        FinishingRubberBeltSummaryHelper.GenerateFinishingRubberBeltGrid();
        $("#txtSearchDateFrom").change(function () {
            FinishingRubberBeltSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            FinishingRubberBeltSummaryHelper.SearchDateChangeEvent();
        });
        $("#btnSearchWarping").click(function () {
            FinishingRubberBeltSummaryHelper.SearchDateChangeEvent();
        });
    },
    GenerateFinishingRubberBeltGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#grdFinishingRubberBeltSummary").kendoGrid({
            dataSource: FinishingRubberBeltSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            filterable: true,
            sortable: true,
            columns: FinishingRubberBeltSummaryHelper.GenerateFinishingRubberBeltColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateFinishingRubberBeltColumns: function () {
        return columns = [
               { field: "RID", title: "RID", width: 50, editable: false, },
               { field: "SettingDate", title: "SettingDate ", width: 50, editable: false, template: '#=kendo.toString(SettingDate,"dd-MMM-yyyy")#' },
               { field: "MCNo", title: "MCNo", width: 40 },
               { field: "BName", title: "BName", width: 50 },
               { field: "OCountry", title: "OCountry", width: 50 },
               { field: "SerialNo", title: "SerialNo", width: 50 },
               { field: "ThicknessMM", title: "ThicknessMM", width: 50 },
               { field: "Hardness", title: "Hardness", width: 40 },
               { field: "Width", title: "Width", width: 50 },
               { field: "Type", title: "Type", width: 50 },
               { field: "Remarks", title: "Remarks", width: 80 },

               //{ field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="FinishingProdSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
               { field: "Edit", title: "Edit/View", selectable: true, filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="FinishingRubberBeltSummaryHelper.clickEventForEditButton(this)" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
        ];
    },
    clickEventForEditButton: function (e) {
        var row = $(e).closest("tr");
        var entityGrid = $("#grdFinishingRubberBeltSummary").data("kendoGrid");
        entityGrid.select(row);
        var selectedItem = entityGrid.dataItem(row);

        if (selectedItem != null) {

            var today = selectedItem.SettingDate;
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


            $('#RID').val() === undefined || $('#RID').val() === null ? 0 : $('#RID').val(selectedItem.RID);
            $('.SettingDate').val(today);
            $('.BeltName').val(selectedItem.BName);
            $('.Country').val(selectedItem.OCountry);
            $('.Remarks').val(selectedItem.Remarks);
            $('.SerialNo').val(selectedItem.SerialNo);
            $('.ThicknessMM').val(selectedItem.ThicknessMM);
            $('.Hardness').val(selectedItem.Hardness);
            $("#mcType").data("kendoComboBox").text(selectedItem.MCNo);
            $('.Width').val(selectedItem.Width);
            $('.Type').val(selectedItem.Type);
            angular.element(document.getElementById('mainController')).scope().GetDetail(selectedItem);
        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = FinishingRubberBeltSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdFinishingRubberBeltSummary").data("kendoGrid");
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