
var ProdQualitySummaryManager = {
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
                    url: '../ProdQuality/GetProdQualitySummary/',
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

var ProdQualitySummaryHelper = {
    InitSummary: function () {
        ProdQualitySummaryHelper.GenerateGrid();
    },

    GenerateGrid: function () {
        $("#grdProdQualitySummary").kendoGrid({
            dataSource: ProdQualitySummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: ProdQualitySummaryHelper.GenerateColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateColumns: function () {
        return columns = [
               { field: "QID", hidden: true },
               { field: "QCode", title: "Quality Code", width: 50, editable: false },
               { field: "QName", title: "Quality Name", width: 50, editable: false },
               { field: "Remarks", title: "Remarks", width: 50, editable: false },
               { field: "Rate", title: "Rate", width: 50, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="ProdQualitySummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdProdQualitySummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            
            ProdQualityDetailsHelper.FillForm(selectedItem);
        }

    }
};

