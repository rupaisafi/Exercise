
var WeavingProdDetailsSummaryManager = {
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
                   // url: '../WeavingProdDetails/GetWeavingProdDetailsSummary/',
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
                        WarpDate: {
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

var WeavingProdDetailsSummaryHelper = {
    InitWeavingProdDetailsSummary: function () {
        WeavingProdDetailsSummaryHelper.GenerateWeavingProdDetailsGrid();
    },

    GenerateWeavingProdDetailsGrid: function () {
        $("#grdWeavingProdDetailsSummary").kendoGrid({
            dataSource: WeavingProdDetailsSummaryManager.gridDataSource(),
            //pageable: {
            //    refresh: true,
            //    serverPaging: true,
            //    serverFiltering: true,
            //    serverSorting: true,

            //},
            filterable: false,
            sortable: true,
            columns: WeavingProdDetailsSummaryHelper.GenerateWeavingProdDetailsColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
          

        });

    },
    GenerateWeavingProdDetailsColumns: function () {
        return columns = [
               { field: "WarpDate", title: "Date", width: 40, editable: false, template: '#=kendo.toString(WarpDate,"dd-MMM-yyyy")#' },
               { field: "IName", title: "Item Name", width: 80, editable: false, sortable: true },
               { field: "YarnLot", title: "Lot", width: 50 },
               { field: "SName", title: "Supplier", width: 90 },
               { field: "YarnCode", title: "Yarn Code", width: 60 },
               { field: "FlangeNo", title: "Beam No", width: 40 },
               { field: "FlangeLength", title: "Beam Length", width: 40 },
               { field: "ShiftName", title: "Shift", width: 30 },
               { field: "OperatorName", title: "Operator", width: 60 },
               { field: "CapName", title: "Captain", width: 60 },
               { field: "Edit", title: "Edit/View", filterable: false, width: 40, template: '<button type="button" class="k-button" value="Edit" id="btnEdit1" onClick="WeavingProdDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {
      
        var entityGrid = $("#grdWeavingProdDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#divWeavingProdDetailsPartial").show();
            WeavingProdDetailsHelper.FillWeavingDetails(selectedItem);
           
           // $("#grdWeavingProdDetailsSummary tbody").find("tr[data-uid=" + selectedItem.uid + "]").css("color", "red");
        }

    },


};

