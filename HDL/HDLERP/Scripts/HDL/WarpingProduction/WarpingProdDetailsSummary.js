
var WarpingProdDetailsSummaryManager = {
    gridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
            // pageSize: 10,
            transport: {
                read: {
                    // url: '../WarpingProdDetails/GetWarpingProdDetailsSummary/',
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
                        WarpDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }
                    }
                },
                parse: function (res) {
                    console.log(res);
                    return res;
                }

            }
        });
        return gridDataSource;
    }
};

var WarpingProdDetailsSummaryHelper = {
    InitWarpingProdDetailsSummary: function () {
        WarpingProdDetailsSummaryHelper.GenerateWarpingProdDetailsGrid();
    },
    GenerateWarpingProdDetailsGrid: function () {
        $("#grdWarpingProdDetailsSummary").kendoGrid({
            dataSource: WarpingProdDetailsSummaryManager.gridDataSource(),
            //pageable: {
            //    refresh: true,
            //    serverPaging: true,
            //    serverFiltering: true,
            //    serverSorting: true,

            //},
            filterable: false,
            sortable: true,
            columns: WarpingProdDetailsSummaryHelper.GenerateWarpingProdDetailsColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateWarpingProdDetailsColumns: function () {
        return columns = [
            { field: "WarpDate", title: "WarpDate", width: 40, editable: false, template: '#:kendo.toString(WarpDate,"dd-MMM-yyyy")#' },
            { field: "IName", title: "Item Name", width: 80, editable: false, sortable: true },
            { field: "YarnLot", title: "Lot", width: 50 },
            { field: "SName", title: "Supplier", width: 90 },
            { field: "YarnCode", title: "Yarn Code", width: 60 },
            { field: "FlangeNo", title: "Beam No", width: 40 },
            { field: "FlangeLength", title: "Beam Length", width: 40 },
            { field: "ShiftName", title: "Shift", width: 30 },
            { field: "OperatorName", title: "Operator", width: 60 },
            { field: "CapName", title: "Captain", width: 60 },
            { field: "Edit", title: "Edit/View", filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit1" onClick="WarpingProdDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },
    clickEventForEditButton: function () {

        var entityGrid = $("#grdWarpingProdDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#divWarpingProdDetailsPartial").show();
            WarpingProdDetailsHelper.FillWarpingDetails(selectedItem);

            // $("#grdWarpingProdDetailsSummary tbody").find("tr[data-uid=" + selectedItem.uid + "]").css("color", "red");
        }

    },
};

