
var MIssueDetailsSummaryManager = {
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

var MIssueDetailsSummaryHelper = {
    InitMIssueDetailsSummary: function () {
        MIssueDetailsSummaryHelper.GenerateMIssueDetailsGrid();
    },

    GenerateMIssueDetailsGrid: function () {
        $("#grdMIssueDetailsSummary").kendoGrid({
            dataSource: MIssueDetailsSummaryManager.gridDataSource(),
            pageable: false,
            filterable: false,
            sortable: false,
            columns: MIssueDetailsSummaryHelper.GenerateMIssueDetailsColumns(),
            editable: false,
            navigatable: false,
            selectable: "row"
        });

    },
    GenerateMIssueDetailsColumns: function () {
        return columns = [
               { field: "IID", hidden: true },
               { field: "ICode", title: "Item Code", width: 40, editable: false, sortable: true },
               { field: "IName", title: "Item Name", width: 100, editable: false, sortable: true },
               { field: "Qnty", title: "MIssue Qty", width: 100, editable: false },
               { field: "Rate", title: "Rate", width: 100 },
               { field: "Value", title: "Amount ($)", width: 100 },
               { field: "RateTaka", title: "Rate Taka", width: 100 },
               { field: "ValueTaka", title: "Value (Taka)", width: 100 },
               { field: "Edit", title: "Edit/Delete", filterable: false, width: 60, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="MIssueDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;<button type="button" class="btn btn-danger btn-sm" value="Delete" id="btnEdit" onClick="MIssueDetailsSummaryHelper.clickEventForDeleteButton()" ><span class="glyphicon glyphicon-remove"></span></button>', sortable: false }


        ];
    },
    clickEventForEditButton: function () {
        var entityGrid = $("#grdMIssueDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#divMIssueDetailsPopup").data("kendoWindow").open().center();
            $("#btnAddToList").hide();
            $("#btnUpdateMIssueDetails").show();
            $("#cmbItem").data("kendoComboBox").readonly(true);
            MIssueDetailsPopupHelper.FillMIssueDetailsInformation(selectedItem);
        }

    },
    clickEventForDeleteButton: function () {
        var entityGrid = $("#grdMIssueDetailsSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            entityGrid.dataSource.remove(selectedItem);
            for (var i = 0; i < gbMIssueDetailsGridData.length; i++) {
                if (gbMIssueDetailsGridData[i].StyleCode === selectedItem.StyleCode) {
                    gbMIssueDetailsGridData.splice(i, 1);
                    break;
                }
            }

        }
    },

};

