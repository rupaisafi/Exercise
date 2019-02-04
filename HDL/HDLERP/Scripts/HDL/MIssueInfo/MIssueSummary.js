
var MIssueInfoSummaryManager = {
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
                    url: '../MIssue/GetMIssueInfoSummary/?dateFrom=' + dateFrom + '&dateTo=' + dateTo,
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
                        IssueDate: {
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

var MIssueInfoSummaryHelper = {
    InitMIssueInfoSummary: function () {
      
        MIssueInfoSummaryHelper.GenerateDatePicker();
        MIssueInfoSummaryHelper.GenerateMIssueInfoGrid();
        $("#txtSearchDateFrom").change(function () {
            MIssueInfoSummaryHelper.SearchDateChangeEvent();
        });
        $("#txtSearchDateTo").change(function () {
            MIssueInfoSummaryHelper.SearchDateChangeEvent();
        });
    },

    GenerateMIssueInfoGrid: function () {
        var dateFrom = $("#txtSearchDateFrom").data("kendoDatePicker").value();
        dateFrom = kendo.toString(dateFrom, "dd-MMM-yyyy");

        var dateTo = $("#txtSearchDateTo").data("kendoDatePicker").value();
        dateTo = kendo.toString(dateTo, "dd-MMM-yyyy");
        $("#grdMIssueInfoSummary").kendoGrid({
            dataSource: MIssueInfoSummaryManager.gridDataSource(dateFrom, dateTo),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: MIssueInfoSummaryHelper.GenerateMIssueInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });

    },
    GenerateMIssueInfoColumns: function () {
        return columns = [
               { field: "IID", hidden: true },
               { field: "IssueDate", title: "MIssue Date", width: 40, editable: false, template: '#=kendo.toString(IssueDate,"dd-MMM-yyyy")#' },
               { field: "SRNo", title: "SR No", width: 80 },
               { field: "CName", title: "Company", width: 80 },
               { field: "DName", title: "Department", width: 80 },
               { field: "UnitName", title: "Unit", width: 80 },
               { field: "TypeFlag", title: "Yarn/Chemical", width: 80, template: "#=TypeFlag=='Y'?'Yarn':TypeFlag=='C'?'Chemical':'Undefined'#" },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="MIssueInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdMIssueInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#divMIssueInfoDetails").show();
            $("#divMIssueSummary").hide();
            MIssueInfoDetailsHelper.FillForm(selectedItem);
            MIssueInfoDetailsHelper.FillAllGrid(selectedItem.IID);
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

        var data = MIssueInfoSummaryManager.gridDataSource(dateFrom == null ? "" : dateFrom, dateTo == null ? "" : dateTo);
        var grid = $("#grdMIssueInfoSummary").data("kendoGrid");
        grid.setDataSource(data);
    },

};

