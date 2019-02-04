
var StyleInfoSummaryManager = {
    gridDataSource: function (dateFrom, dateTo, styleNo) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../StyleInfo/GetStyleInfoSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo + "&styleNo=" + styleNo,
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

var StyleInfoSummaryHelper = {
    InitStyleInfoSummary: function () {
        StyleInfoSummaryHelper.GenerateDatePicker();
        StyleInfoSummaryHelper.GenerateStyleInfoGrid();
        $("#txtSearchDateFrom").change(function () {
            StyleInfoSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            StyleInfoSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchStyleNo").change(function () {
            StyleInfoSummaryHelper.SearchDateChangeEvent();
        });
        $("#btnSearchStyle").click(function () {
            StyleInfoSummaryHelper.SearchDateChangeEvent();
        });
    },

    GenerateStyleInfoGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");
        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");
        var styleNo = $("#txtSearchStyleNo").val();

        $("#grdStyleInfoSummary").kendoGrid({
            dataSource: StyleInfoSummaryManager.gridDataSource(dateFrom, dateTo, styleNo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: StyleInfoSummaryHelper.GenerateStyleInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateStyleInfoColumns: function () {
        return columns = [
               { field: "SID", hidden: true },
               { field: "StyleNo", title: "Style No.", width: 50, editable: false },
               { field: "StyleCode", title: "Style Code", width: 50, editable: false },
               { field: "Weight", title: "Weight", width: 50, editable: false },
               { field: "Width", title: "Width", width: 50, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="StyleInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdStyleInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#btnGenerateStyleCode").hide();
            StyleInfoDetailsHelper.ClearForm();
            $("#divStyleInfoDetails").show();
            $("#divStyleSummary").hide();
            StyleInfoDetailsHelper.FillForm(selectedItem);
            StyleInfoDetailsHelper.FillFinishInformation(selectedItem);
            StyleInfoDetailsHelper.FillGreyInformation(selectedItem);
            StyleInfoDetailsHelper.FillFabricInformation(selectedItem);
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

        var styleNo = $("#txtSearchStyleNo").val();

        var data = StyleInfoSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo, styleNo == "" ? "%" : styleNo);
        var grid = $("#grdStyleInfoSummary").data("kendoGrid");
        grid.setDataSource(data);
    },
};

