
var LcDetailsSummaryManager = {
    gridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
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
                        DeliDate: {
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

var LcDetailsSummaryHelper = {
    InitLcDetailsSummary: function () {
        LcDetailsSummaryHelper.GenerateLcDetailsGrid();
    },

    GenerateLcDetailsGrid: function () {
        $("#grdLcDetailsSummary").kendoGrid({
            dataSource: LcDetailsSummaryManager.gridDataSource(),
            pageable: false,
            filterable: false,
            sortable: false,
            columns: LcDetailsSummaryHelper.GenerateLcDetailsColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"
        });

    },
    GenerateLcDetailsColumns: function () {
        return columns = [
               { field: "LcDetailsId", hidden: true },
               { field: "ItemCode", title: "Item Code", width: 40, editable: false, sortable: true },
               { field: "ItemName", title: "Item Name", width: 100, editable: false, sortable: true },
               { field: "Qnty", title: "Lc Qty", width: 100, editable: false },
               { field: "Rate", title: "Rate", width: 100 },
               { field: "Amount", title: "Amount ($)", width: 100 },
               { field: "ConvRate", title: "Conversion Rate", width: 100 },
               { field: "ValueTaka", title: "Value (Taka)", width: 100 },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 60, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="LcDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="LcDetailsSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }


        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdLcDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#divLcDetailsPopup").data("kendoWindow").open().center();
            $("#btnAddToList").hide();
            $("#btnUpdateODetails").show();
            $("#cmbItem").data("kendoComboBox").readonly(true);
            LcDetailsPopupHelper.FillLcDetailsInformation(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdLcDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbLcDetailsGridData.length; i++) {
                if (gbLcDetailsGridData[i].StyleCode === selectedItem.StyleCode) {
                    gbLcDetailsGridData.splice(i, 1);
                    break;
                }
            }

        }
    },

};

