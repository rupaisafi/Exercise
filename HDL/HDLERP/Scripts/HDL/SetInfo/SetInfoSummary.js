
var SetInfoSummaryManager = {
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
                    url: '../SetInfo/GetSetInfoSummary/',
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

var SetInfoSummaryHelper = {

    InitSetInfoSummary: function () {

        SetInfoSummaryHelper.GenerateSetInfoGrid();
    },

    GenerateSetInfoGrid: function () {
        $("#grdSetInfoSummary").kendoGrid({
            dataSource: SetInfoSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: SetInfoSummaryHelper.GenerateSetInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });

    },
    GenerateSetInfoColumns: function () {
        return [
            { field: "SetId", hidden: true },
            { field: "SetNo", title: "Set No", width: 70, editable: false },
            { field: "WarpDate", title: "Warp Date", width: 40, editable: false, template: '#=kendo.toString(WarpDate,"dd-MMM-yyyy")#' },
            { field: "Length", title: "Length", width: 50, editable: false },
            { field: "MachineNo", title: "Machine No.", width: 50, editable: false },
            { field: "Edit", title: "Edit/View", filterable: false, width: 20, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="SetInfoSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdSetInfoSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {

            SetInfoDetailsHelper.FillForm(selectedItem);
        }
    }

};

