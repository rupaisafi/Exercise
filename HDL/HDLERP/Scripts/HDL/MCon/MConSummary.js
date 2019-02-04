
var MConSummaryManager = {
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
                    url: '../MaterialConsumption/GetMConsumptionSummary/',
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
                        OrderDate: {
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

var MConSummaryHelper = {
    InitMConSummary: function () {
        MConSummaryHelper.GenerateMConGrid();
    },

    GenerateMConGrid: function () {
        $("#grdMConSummary").kendoGrid({
            dataSource: MConSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true//,
               // pageSizes: [2, 3, 4, "All"]
            },
            filterable: true,
            sortable: true,
            columns: MConSummaryHelper.GenerateMConColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        
           // columnMenu: true,
        });

    },
    GenerateMConColumns: function () {
        return columns = [
               { field: "MConID", hidden: true },
               { field: "SID", hidden: true },
               { field: "StyleNo", title: "Style", width: 100, editable: false, sortable: true },
               { field: "Remarks", title: "Remarks", width: 100 },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="MConSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdMConSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
     
        if (selectedItem != null) {
            $("#divMConDetails").show();
            $("#divMConSummary").hide();

            MConDetailsHelper.FillForm(selectedItem);
            MConDetailsHelper.FillAllGrid(selectedItem.MConID);
        }

    }


};