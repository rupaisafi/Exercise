
var PlanningInfoSummaryManager = {
    gridDataSource: function (planDateFrom,planDateTo) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../PlanningInfo/GetPlanningInfoSummary/?planDateFrom=' + planDateFrom + '&planDateTo=' + planDateTo,
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
                        PDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }
                    }
                },
            }
        });
        return gridDataSource;
    }
};

var PlanningInfoSummaryHelper = {
    InitPlanningInfoSummary: function () {
        PlanningInfoSummaryHelper.GenerateDatePicker();
        PlanningInfoSummaryHelper.GeneratePlanningInfoGrid();
        $("#txtSearchPlanDateFrom").change(function () {
            PlanningInfoSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchPlanDateTo").change(function () {
            PlanningInfoSummaryHelper.SearchDateChangeEvent();
        });

        $("#btnSearchPlanning").click(function() {
            PlanningInfoSummaryHelper.SearchDateChangeEvent();
        });

    },

    GeneratePlanningInfoGrid: function () {
        var planDateFrom = $("#txtSearchPlanDateFrom").data("kendoDatePicker").value();
        planDateFrom = kendo.toString(planDateFrom, "dd-MMM-yyyy");

        var planDateTo = $("#txtSearchPlanDateTo").data("kendoDatePicker").value();
        planDateTo = kendo.toString(planDateTo, "dd-MMM-yyyy");

        $("#grdPlanningInfoSummary").kendoGrid({
            dataSource: PlanningInfoSummaryManager.gridDataSource(planDateFrom, planDateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: PlanningInfoSummaryHelper.GeneratePlanningInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GeneratePlanningInfoColumns: function () {
        return columns = [
               { field: "PlanId", hidden: true },
               { field: "SetNo", title: "Set No", width: 30, editable: false },
               { field: "SetLength", title: "Set Length", width: 30, editable: false },
               { field: "StyleCode", title: "Style Code", width: 30 },
               { field: "StyleNo", title: "Style No", width: 30 },
               { field: "OrderRef", title: "Order Ref", width: 30 },
               { field: "OQnty", title: "Order Qty", width: 30 },
               { field: "CustName", title: "Customer Name", width: 70 },
               { field: "BuyerName", title: "Buyer Name", width: 70 },
               { field: "PDate", title: "Plannig Date", width: 50, template: '#=kendo.toString(PDate,"dd-MMM-yyyy")#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 25, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="PlanningInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdPlanningInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            //var tabToActivate = $("#pnlQuality");
            //$("#divPlanningTab").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);

            $("#divPlanDetails").show();
            $("#divPlanningSummary").hide();
            PlanningInfoSaveHelper.FillPlanningDetailsForm(selectedItem);
            PlanningInfoSaveHelper.FillAllGrid(selectedItem);
        }

    },
    SearchDateChangeEvent: function () {
        var planDateFrom = $("#txtSearchPlanDateFrom").data("kendoDatePicker").value();
        planDateFrom = kendo.toString(planDateFrom, "dd-MMM-yyyy");

        var planDateTo = $("#txtSearchPlanDateTo").data("kendoDatePicker").value();
        planDateTo = kendo.toString(planDateTo, "dd-MMM-yyyy");

        var data = PlanningInfoSummaryManager.gridDataSource(planDateFrom == null ? "" : planDateFrom, planDateTo == null ? "" : planDateTo);
        var grid = $("#grdPlanningInfoSummary").data("kendoGrid");
        grid.setDataSource(data);
    },

    GenerateDatePicker: function () {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $("#txtSearchPlanDateFrom").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: firstDay
        });
        $("#txtSearchPlanDateTo").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: lastDay
        });
    }
};

