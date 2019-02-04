
var DyeingProdDetailsDyeRopeSummaryManager = {
    gridDataSource: function (dID) {
        var source = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../DyeingProduction/GetAllDyeRopeGridData?dID=' + dID,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                //data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        DDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }
                    }
                },
                parse: function (data) {
                    $.each(data, function (i) {
                        data[i].iid = kendo.guid();
                    });
                    return data;
                }
            }
        });
        return source;
    }
};
var DyeingProdDetailsDyeRopeSummaryHelper = {
    InitDyeingProdDetailsDyeRopeSummary: function () {
        DyeingProdDetailsDyeRopeSummaryHelper.GenerateDyeingProdDetailsDyeRopeGrid();
    },
    GenerateDyeingProdDetailsDyeRopeGrid: function () {
        var grid = $("#grdDyeingProdDetailsDyeRopeSummary").kendoGrid({
            dataSource: DyeingProdDetailsDyeRopeSummaryManager.gridDataSource(0),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: false,
            sortable: true,
            columns: DyeingProdDetailsDyeRopeSummaryHelper.GenerateDyeProdDyeRopeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },
    GenerateDyeProdDyeRopeColumns: function () {
        return columns = [
            { field: "DDate", title: "Date", width: "80px", editable: false, template: '#=kendo.toString(DDate,"dd-MMM-yyyy")#' },
            { field: "ShiftName", title: "Shift", editable: false, sortable: true },
            { field: "BallNo", title: "Ball No." },
            { field: "CanNo", title: "Can No." },
            //{ field: "WarpLength", title: "Warp Length" },
            //{ field: "DyLength", title: "Dye Length" },
            //{ field: "Speed", title: "Speed" },
            { field: "PO", title: "PO" },
            { field: "OP", title: "OP" },
            { field: "ColorMan", title: "ColorMan" },
            { field: "Captain", title: "Captain" },
            //{ field: "StopMark", title: "StopMark" },
            { field: "CreelLapper", title: "Creel Lapper" },
            { field: "RopeCut", title: "RopeCut" },
            { field: "Remarks", title: "Remarks" },
            //{ field: "CutEndsWr", title: "CutEndsWr" },
            { field: "Edit", title: "Edit/View", width: "50px", filterable: false, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit1" onClick="DyeingProdDetailsDyeRopeSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },
    clickEventForEditButton: function () {

        var entityGrid = $("#grdDyeingProdDetailsDyeRopeSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#duid").val(selectedItem.iid);
            console.log(selectedItem.iid);
            DyeingProdDetailsDyeRopeHelper.SetDyeingProdDetailsDyeRopeForm(selectedItem);
        }

    },
}

