var DyeingConsumptionSummaryManager = {
    getGridDataSource: function (dateFrom, dateTo) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../DyeingConsumption/GetDyeingConsumptionSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
var DyeingConsumptionSummaryHelper = {
    Init: function () {
        var helper = this;
        var date = new Date();
        $("#dcsDateTo").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date(date.getFullYear(), date.getMonth(), date.getDate())
        }).data("kendoDatePicker");
        $("#dcsDateFrom").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date(date.getFullYear(), date.getMonth(), 1)
        }).data("kendoDatePicker");;
        DyeingConsumptionSummaryHelper.generateDyeingConsumptionSummaryGrid();
        $("#dcsDateFrom").change(function () {
            DyeingConsumptionSummaryHelper.searchDateChangeEvent();
        });
        $("#dcsDateTo").change(function () {
            DyeingConsumptionSummaryHelper.searchDateChangeEvent();
        });
        $("#dcsSearch").click(function () {
            DyeingConsumptionSummaryHelper.searchDateChangeEvent();
        });
        $("#dcsNew").click(function () {
            DyeingConsumptionDetailsHelper.clearDyeingConsumptionInfo();
            DyeingConsumptionDetailsSummaryHelper.clearConsumptionDetailForm();
            $("#dcdpGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                pageSize: 10,
                data: []
            }));

            $("#divDyeingConsumptionSummary").hide();
            $("#divDyeingConsumptionDetails").show();
            
        })
    },
    searchDateChangeEvent: function () {
        var dateFrom = $("#dcsDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#dcsDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        var data = DyeingConsumptionSummaryManager.getGridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#dcsGrid").data("kendoGrid");
        grid.setDataSource(data);
    },
    generateDyeingConsumptionSummaryGrid: function () {
        var dateFrom = $("#dcsDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#dcsDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");

        $("#dcsGrid").kendoGrid({
            dataSource: DyeingConsumptionSummaryManager.getGridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,

            },
            filterable: true,
            sortable: true,
            columns: DyeingConsumptionSummaryHelper.generateDyeingConsumptionSummaryGridColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },
    clickEventForEditButton: function () {
        var grid = $("#dcsGrid").data("kendoGrid");
        var selected = grid.dataItem(grid.select());
        if (selected) {
            $("#DID").val(selected.DID);
            $("#dcdSetNo").data("kendoComboBox").value(selected.SetNo);
            $("#dcdSetNo").trigger("change");
        }
        $("#divDyeingConsumptionSummary").hide();
        $("#divDyeingConsumptionDetails").show();
        var dataSource = DyeingConsumptionDetailsSummaryHelper.getConsumptionDetailDataSource();
        $("#dcdpGrid").data("kendoGrid").setDataSource(dataSource);
    },
    generateDyeingConsumptionSummaryGridColumns: function () {
        return [
            { field: "DID", hidden: true },
            { field: "DyeDate", title: "Program Date", width: 50, editable: false, template: '#=kendo.toString(DyeDate,"dd-MMM-yyyy")#' },
            { field: "SetNo", title: "Set No.", width: 40 },
            { field: "NoOfBeam", title: "NoOfBeam", width: 80 },
            { field: "LengthMtr", title: "Length(M)", width: 50, editable: false },
            { field: "LengthKg", title: "Length(Kg)", width: 50 },
            { field: "TotalEnd", title: "TotalEnd", width: 50 },
            { field: "StyleNo", title: "Style No", width: 80 },
            { field: "Colour", title: "Colour", width: 80 },
            { field: "UnitName", title: "Unit Name", width: 80 },
            { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DyeingConsumptionSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    }

};