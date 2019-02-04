
var LcInfoSummaryManager = {
    gridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../LcInfo/GetLcInfoSummary/',
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
                        LcDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        },
                        InvDate: {
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

var LcInfoSummaryHelper = {
    InitLcInfoSummary: function () {
        LcInfoSummaryHelper.GenerateLcInfoGrid();
    },

    GenerateLcInfoGrid: function () {
        $("#grdLcInfoSummary").kendoGrid({
            dataSource:LcInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: LcInfoSummaryHelper.GenerateLcInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
         
        });

    },
    GenerateLcInfoColumns: function () {
        return columns = [
               { field: "LcId", hidden: true },
               { field: "LcNo", title: "Lc No", width: 40, editable: false, sortable: true },
               { field: "LcDate", title: "Lc Date", width: 40, editable: false, template: '#=kendo.toString(LcDate,"dd-MMM-yyyy")#' },
               { field: "InvoiceNo", title: "Invoice No", width: 80 },
               { field: "InvDate", title: "Invoice Date", width: 80, template: '#=kendo.toString(InvDate,"dd-MMM-yyyy")#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="LcInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdLcInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#divLcInfoDetails").show();
            $("#divLcSummary").hide();
            LcInfoDetailsHelper.FillForm(selectedItem);
            LcInfoDetailsHelper.FillAllGrid(selectedItem.LcId);
        }

    },


};

