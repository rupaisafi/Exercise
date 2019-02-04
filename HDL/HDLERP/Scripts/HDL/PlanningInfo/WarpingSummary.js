
var WarpingSummaryManager = {
    
};

var WarpingSummaryHelper = {
    InitWarpingSummary: function () {
        WarpingSummaryHelper.GenerateWarpingInfoGrid();
    },

    GenerateWarpingInfoGrid: function () {
        $("#grdWarpingSummary").kendoGrid({
            dataSource:[],
            //pageable: {
            //    refresh: true,
            //    serverPaging: false,
            //    serverFiltering: false,
            //    serverSorting: false
            //},
            filterable: false,
            sortable: false,
            columns: WarpingSummaryHelper.GenerateWarpingInfoColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"

        });

    },
    GenerateWarpingInfoColumns: function () {
        return columns = [
               { field: "IName", title: "Item Name", width: 60, editable: false },
              // { field: "YCode", title: "Yarn Code", width: 60, editable: false },
               { field: "YarnName", title: "Yarn Code", width: 60, editable: false },
               { field: "Lot", title: "Yarn Lot", width: 30, editable: false },
               { field: "NoOfBeem", title: "No Of Beem", width: 30, editable: false },
               { field: "NoOfCreel", title: "No Of Creel", width: 30, editable: false },
               { field: "SetLength", title: "Beem Length", width: 30, editable: false },
               { field: "EndsPerBeem", title: "Ends Per Beem", width: 30, editable: false },
               { field: "Qnty", title: "Qty (Kg)", width: 30 },
               { field: "Rate", title: "Rate", width: 30, editable: false },
               { field: "Value", title: "Value", width: 30, editable: false },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 40, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="WarpingSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="WarpingSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdWarpingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#popupWarpingInfo").data("kendoWindow").open().center();
            $("#btnAddToList").hide();
            $("#btnUpdateWarp").show();
            WarpingInfoHelper.FillWarpingInfo(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdWarpingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbWarpGridData.length; i++) {
                if (gbWarpGridData[i].YCode == selectedItem.YCode) {
                    gbWarpGridData.splice(i, 1);
                    break;
                }
            }

        }
    },
};

