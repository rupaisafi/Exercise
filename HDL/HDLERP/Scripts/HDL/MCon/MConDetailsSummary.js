
var MConDetailsSummaryManager = {
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

var MConDetailsSummaryHelper = {
    InitMConDetailsSummary: function () {
        MConDetailsSummaryHelper.GenerateMConDetailsGrid();
    },

    GenerateMConDetailsGrid: function () {
        $("#grdMConDetailsSummary").kendoGrid({
            dataSource: MConDetailsSummaryManager.gridDataSource(""),
            pageable: false,
            filterable: false,
            sortable: false,
            columns: MConDetailsSummaryHelper.GenerateMConDetailsColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"
        });

    },
    GenerateMConDetailsColumns: function () {
        return columns = [
               { field: "MConDtlID", hidden: true },
               { field: "ItemCode", hidden: true },
               { field: "ItemName", title: "Item", width: 100, editable: false, sortable: true },
               { field: "Unit", title: "Unit", width: 100, editable: false },
               { field: "Qnty", title: "Qty", width: 100, editable: false },
               { field: "DepartmentCode", hidden: true },
               { field: "DepartmentName", title: "Department", width: 100 },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 60, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="MConDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="MConDetailsSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }

        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdMConDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#divMConDetailsPopup").data("kendoWindow").open().center();
            $("#btnUpdateDetails").show();
            $("#btnAddToList").hide();
            $("#cmbStyle").data("kendoComboBox").readonly(true);
            MConDetailsPopupHelper.FillMConDetailsInformation(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdMConDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbMConDetailsGridData.length; i++) {
                if (gbMConDetailsGridData[i].StyleCode === selectedItem.StyleCode) {
                    gbMConDetailsGridData.splice(i, 1);
                    break;
                }
            }

        }
    }
    
};

