
var DeyingSummaryManager = {
   
};

var DeyingSummaryHelper = {
    InitDeyingSummary: function () {
        DeyingSummaryHelper.GenerateDeyingInfoGrid();
    },

    GenerateDeyingInfoGrid: function () {
        $("#grdDeyingSummary").kendoGrid({
            dataSource: [],// DeyingSummaryManager.gridDataSource(),
            //pageable: {
            //    refresh: false,
            //    serverPaging: false,
            //    serverFiltering: false,
            //    serverSorting: false
            //},
            filterable: false,
            sortable: false,
            columns: DeyingSummaryHelper.GenerateDeyingInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateDeyingInfoColumns: function () {
        return columns = [
               { field: "IcNo", hidden: true },
               { field: "IcName", title: "IName", width: 70, editable: false },
               { field: "SCode", hidden: true },
               { field: "SName", title: "Supplier", width: 50 },
               { field: "Qnty", title: "Qnty", width: 60, editable: false },
               { field: "Rate", title: "Rate", width: 60, editable: false },
               { field: "Value", title: "Value", width: 60, editable: false },
               { field: "Remarks", title: "Remarks", width: 60, editable: false },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DeyingSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="DeyingSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdDeyingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#popupDeyingInfo").data("kendoWindow").open().center();
            $("#btnAddToListDeying").hide();
            $("#btnUpdateDeying").show();
            DeyingInfoHelper.FillDeyingInfo(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdDeyingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbDeyingGridData.length; i++) {
                if (gbDeyingGridData[i].ColorId == selectedItem.ColorId) {
                    gbDeyingGridData.splice(i, 1);
                    break;
                }
            }

        }
    },
};

