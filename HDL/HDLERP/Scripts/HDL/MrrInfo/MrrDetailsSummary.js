
var MrrDetailsSummaryManager = {
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
                data: "Items", total: "Totalcount",
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

var MrrDetailsSummaryHelper = {
    InitMrrDetailsSummary: function () {
        MrrDetailsSummaryHelper.GenerateMrrDetailsGrid();
    },

    GenerateMrrDetailsGrid: function () {
        $("#grdMrrDetailsSummary").kendoGrid({
            dataSource: MrrDetailsSummaryManager.gridDataSource(),
            pageable: false,
            filterable: false,
            sortable: false,
            columns: MrrDetailsSummaryHelper.GenerateMrrDetailsColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"
        });

    },
    GenerateMrrDetailsColumns: function () {
        return columns = [
               { field: "RDID", hidden: true },
               { field: "ICode", title: "Item Code", width: 40, editable: false, sortable: true },
               { field: "IName", title: "Item Name", width: 100, editable: false, sortable: true },
               { field: "RQnty", title: "Mrr Qty", width: 100, editable: false },
               { field: "RRate", title: "Rate", width: 100 },
               { field: "RValue", title: "Amount ($)", width: 100 },
               { field: "CRate", title: "Conversion Rate", width: 100 },
               { field: "VTaka", title: "Value (Taka)", width: 100 },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 60, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="MrrDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="MrrDetailsSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }


        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdMrrDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#divMrrDetailsPopup").data("kendoWindow").open().center();
            $("#btnAddToList").hide();
            $("#btnUpdateODetails").show();
            var lcno = $("#cmbLcNo").data("kendoComboBox").value();
            MrrDetailsPopupHelper.GenerateINameCombo("cmbItem", lcno);
            MrrBalanceSummaryHelper.LoadMrrBalanceGrid(lcno);
            $("#cmbItem").data("kendoComboBox").readonly(true);
            MrrDetailsPopupHelper.FillMrrDetailsInformation(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdMrrDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbMrrDetailsGridData.length; i++) {
                if (gbMrrDetailsGridData[i].StyleCode === selectedItem.StyleCode) {
                    gbMrrDetailsGridData.splice(i, 1);
                    break;
                }
            }

        }
    },

};

