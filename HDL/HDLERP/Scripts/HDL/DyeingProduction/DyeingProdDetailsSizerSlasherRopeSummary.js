
var DyeingProdDetailsSizerSlasherRopeSummaryManager = {
    gridData: [],
    gridDataSource: function (dID) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../DyeingProduction/GetAllSizingGridData?dID=' + dID,
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
                        SDate: {
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
        return gridDataSource;
    }
};
var DyeingProdDetailsSizerSlasherRopeSummaryHelper = {
    InitDyeingProdDetailsSizerSlasherRopeSummary: function () {
        DyeingProdDetailsSizerSlasherRopeSummaryHelper.GenerateDyeingProdDetailsSizerSlasherRopeGrid();
    },
    GenerateDyeingProdDetailsSizerSlasherRopeGrid: function () {
        $("#grdDyeingProdDetailsSizerSlasherRopeSummary").kendoGrid({
            dataSource: DyeingProdDetailsSizerSlasherRopeSummaryManager.gridDataSource(0),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: false,
            sortable: true,
            columns: DyeingProdDetailsSizerSlasherRopeSummaryHelper.GenerateDyeProdDyeRopeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateDyeProdDyeRopeColumns: function () {
        //DID, SDate, ShiftCode, ShiftName, SSNo, BeamNo, Length, PO, Sizer, DO, Captain, RopeDyeCap, RopeDyePO, StickyEndsLeft,
        //StickyEndsRight, BrkgPoint, StopTime, Stoppage, LapperCreel, LapperDyeing, LapperSizing, NoOfLapper, LapperType,
        //SizingCode, SizingMC, Remarks
        return columns = [
            { field: "SDate", title: "SDate", editable: false, template: '#=kendo.toString(SDate,"dd-MMM-yyyy")#' },
            { field: "ShiftName", title: "ShiftName", editable: false, sortable: true },
            { field: "SSNo", title: "SSNo" },
            { field: "BeamNo", title: "BeamNo" },
            { field: "Length", title: "Length" },
            { field: "PO", title: "PO" },
            { field: "Sizer", title: "Sizer" },
            { field: "DO", title: "DO" },
            { field: "Captain", title: "Captain" },
            { field: "RopeDyeCap", title: "RopeDyeCap" },
            { field: "RopeDyePO", title: "RopeDyePO" },
            { field: "StickyEndsLeft", title: "StickyEndsLeft" },
            { field: "StickyEndsRight", title: "StickyEndsRight" },
            { field: "BrkgPoint", title: "BrkgPoint" },
            { field: "Stoppage", title: "Stoppage" },
            { field: "Edit", title: "Edit/View", filterable: false, width: "50px", template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit1" onClick="DyeingProdDetailsSizerSlasherRopeSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },
    clickEventForEditButton: function () {

        var entityGrid = $("#grdDyeingProdDetailsSizerSlasherRopeSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#suid").val(selectedItem.iid);
            console.log(selectedItem.iid);
            DyeingProdDetailsSizerSlasherRopeHelper.SetDyeingProdDetailsSizerSlasherRopeForm(selectedItem);
            // $("#grdWarpingProdDetailsSummary tbody").find("tr[data-uid=" + selectedItem.uid + "]").css("color", "red");
        }

    },
}

