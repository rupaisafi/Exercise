
var WeavingProdSummaryManager = {
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
                    url: '../WarpingProduction/GetWarpingProdSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
                        PWarpDate: {
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

var WeavingProdSummaryHelper = {
    InitWeavingProdSummary: function () {
        WeavingProdSummaryHelper.GenerateDatePicker();
        WeavingProdSummaryHelper.GenerateWeavingProdGrid();
        $("#txtSearchDateFrom").change(function () {
            WeavingProdSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            WeavingProdSummaryHelper.SearchDateChangeEvent();
        });

        $("#btnSearchWeaving").click(function () {
            WeavingProdSummaryHelper.SearchDateChangeEvent();
        });
    },

    GenerateWeavingProdGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#grdWeavingProductionSummary").kendoGrid({
            dataSource: WeavingProdSummaryManager.gridDataSource(dateFrom,dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
               
            },
            filterable: true,
            sortable: true,
            columns: WeavingProdSummaryHelper.GenerateWeavingProdColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",

           
        });

    },
    GenerateWeavingProdColumns: function () {
        return columns = [
               { field: "IdNo", hidden: true },
               { field: "PWarpDate", title: "Program Date", width: 50, editable: false, template: '#=kendo.toString(PWarpDate,"dd-MMM-yyyy")#' },
               { field: "WarpLength", title: "Warp Length", width: 50, editable: false },
               { field: "SetNo", title: "Set No", width: 40 },
               { field: "TotalBeam", title: "Total Beam", width: 50 },
               { field: "TotalEnds", title: "Total Ends", width: 50},
               { field: "StyleNo", title: "Style No", width: 80 },
               { field: "StyleCode", title: "Style Code", width: 80 },
               { field: "UnitName", title: "Unit Name", width: 80 },
               { field: "MCNo", title: "Mc No", width: 80 },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="WeavingProdSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdWeavingProductionSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#divWarpProdDetails").show();
            $("#divWarpProdSummary").hide();
           // $("#divWeavingProdDetailsPartial").hide();

            WeavingProdDetailsHelper.ClearFullForm();
            WeavingProdDetailsHelper.FillWeavingMasterInformation(selectedItem);
            WeavingProdDetailsHelper.FillAllGrid(selectedItem.IdNo);


        }

    },
    SearchDateChangeEvent: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = WeavingProdSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdWeavingProductionSummary").data("kendoGrid");
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

