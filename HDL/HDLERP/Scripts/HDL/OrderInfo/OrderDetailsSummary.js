
var OrderDetailsSummaryManager = {
    gridDataSource: function (url) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: url,
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

var OrderDetailsSummaryHelper = {
    InitOrderDetailsSummary: function () {
        OrderDetailsSummaryHelper.GenerateOrderDetailsGrid();
    },

    GenerateOrderDetailsGrid: function () {
        $("#grdOrderDetailsSummary").kendoGrid({
            dataSource: OrderDetailsSummaryManager.gridDataSource(""),
            pageable: false,
            filterable: false,
            sortable: false,
            columns: OrderDetailsSummaryHelper.GenerateOrderDetailsColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"
        });

    },
    GenerateOrderDetailsColumns: function () {
        return columns = [
               { field: "OrderDetailsId", hidden: true },
               { field: "StyleNo", title: "Style No", width: 100, editable: false, sortable: true },
               { field: "StyleCode", title: "Style Code", width: 100, editable: false },
               { field: "DeliDate", title: "Delivery Date", width: 100, editable: false,  template: '#=kendo.toString(DeliDate,"dd-MMM-yyyy")#' },
               { field: "Qnty", title: "Order Qty", width: 100, editable: false },
               { field: "Rate", title: "Rate", width: 100 },
               { field: "Amount", title: "Amount", width: 100 },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 60, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="OrderDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="OrderDetailsSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }


        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdOrderDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#divOrderDetailsPopup").data("kendoWindow").open().center();
            $("#btnUpdateODetails").show();
            $("#btnAddToList").hide();
            $("#cmbStyle").data("kendoComboBox").readonly(true);
            OrderDetailsPopupHelper.FillOrderDetailsInformation(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdOrderDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbOrderDetailsGridData.length; i++) {
                if (gbOrderDetailsGridData[i].StyleCode === selectedItem.StyleCode) {
                    gbOrderDetailsGridData.splice(i, 1);
                    break;
                }
            }

        }
    },
    
};

