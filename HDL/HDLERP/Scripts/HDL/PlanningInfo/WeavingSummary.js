
var WeavingSummaryManager = {
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
                    url: '../SupplierInfo/GetSupplierInfoSummary/',
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
                },
            }
        });
        return gridDataSource;
    }
};

var WeavingSummaryHelper = {
    InitWeavingSummary: function () {
        WeavingSummaryHelper.GenerateWeavingInfoGrid();
    },

    GenerateWeavingInfoGrid: function () {
        $("#grdWeavingSummary").kendoGrid({
            dataSource: [],// WeavingSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: WeavingSummaryHelper.GenerateWeavingInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateWeavingInfoColumns: function () {
        return columns = [
               { field: "ICode", hidden: true },
               { field: "IName", title: "IName", width: 70, editable: false },
               { field: "Lot", title: "Lot", width: 50, editable: false },
               { field: "SCode", hidden: true },
               { field: "SName", title: "Supplier", width: 50 },
               { field: "YarnName", title: "Yarn Code", width: 70, editable: false },
               { field: "YCount", title: "Yarn Count", width: 70, editable: false },
               { field: "Qnty", title: "Qty (Kg)", width: 50 },
               { field: "Rate", title: "Rate", width: 60, editable: false },
               { field: "Value", title: "Value", width: 60, editable: false },
               { field: "WeftRatio", title: "WeftRatio", width: 60, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="WeavingSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdWeavingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#popupWeavingInfo").data("kendoWindow").open().center();
            $("#btnAddToListWv").hide();
            $("#btnUpdateWv").show();
            WeavingInfoHelper.FillWeavingPopup(selectedItem);
        }

    },
};

