var DyeingProdSummaryManager = {
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
                    url: '../DyeingProduction/GetDyeingProdSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items",
                total: "TotalCount",
                model: {
                    fields: {
                        DyeDate: {
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

var DyeingProdSummaryHelper = {
    InitDyeingProdSummary: function () {
        DyeingProdSummaryHelper.GenerateDatePicker();
        DyeingProdSummaryHelper.GenerateDyeingProdGrid();
        $("#txtSearchDateFrom").change(function () {
            DyeingProdSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            DyeingProdSummaryHelper.SearchDateChangeEvent();
        });

        $("#btnSearchWarping").click(function () {
            DyeingProdSummaryHelper.SearchDateChangeEvent();
        });
    },
    GenerateDyeingProdGrid: function () {
        var dateFrom = kendo.toString($("#txtSearchDateFrom").data("kendoDatePicker").value(), "dd-MMM-yyyy");
        var dateTo = kendo.toString($("#txtSearchDateTo").data("kendoDatePicker").value(), "dd-MMM-yyyy");

        $("#grdDyeingProductionSummary").kendoGrid({
            dataSource: DyeingProdSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            resizable: true,
            filterable: false,
            sortable: true,
            columns: DyeingProdSummaryHelper.GenerateDyeingProdColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });

    },
    GenerateDyeingProdColumns: function () {
        return columns = [
            { field: "DID", hidden: true },
            { field: "DyeDate", title: "Dye Date", editable: false, template: '#=kendo.toString(DyeDate,"dd-MMM-yyyy")#' },
            { field: "SetNo", title: "Set No" },
            { field: "LengthMtr", title: "LengthMtr" },
            { field: "LengthKg", title: "LengthKg" },
            { field: "Colour", title: "Colour" },
            { field: "YCode", title: "YCode", width:"300px" },
            { field: "StyleNo", title: "Style No" },
            { field: "MCSpeed", title: "MCSpeed" },
            { field: "Edit", title: "Edit", width:"50px", filterable: false, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DyeingProdSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdDyeingProductionSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());       
        if (selectedItem != null) {
            $("#DID").val(selectedItem.DID);
            $("#divDyeingProdDetails").show();
            $("#divDyeingProdSummary").hide();
            DyeingProdDetailsHelper.ClearProductionInfoForm();
            DyeingProdDetailsHelper.SetProductionInfoForm(selectedItem);
            var dyeRopeDataSource = DyeingProdDetailsDyeRopeSummaryManager.gridDataSource(selectedItem.DID);
            var lcbRopeDataSource = DyeingProdDetailsLCBRopeSummaryManager.gridDataSource(selectedItem.DID);
            var sizingDataSource = DyeingProdDetailsSizerSlasherRopeSummaryManager.gridDataSource(selectedItem.DID);
            $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid").setDataSource(dyeRopeDataSource);
            $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid").setDataSource(lcbRopeDataSource);
            $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid").setDataSource(sizingDataSource);
        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = DyeingProdSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdDyeingProductionSummary").data("kendoGrid");
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
    }
};