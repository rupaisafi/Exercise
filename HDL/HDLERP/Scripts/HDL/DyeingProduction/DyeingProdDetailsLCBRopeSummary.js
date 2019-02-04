
var DyeingProdDetailsLCBRopeSummaryManager = {
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
                    url: '../DyeingProduction/GetAllLCBRopeGridData?dID=' + dID,
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
                        LDate: {
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
var DyeingProdDetailsLCBRopeSummaryHelper = {
    InitDyeingProdDetailsLCBRopeSummary: function () {
        DyeingProdDetailsLCBRopeSummaryHelper.GenerateDyeingProdDetailsLCBRopeGrid();
    },
    GenerateDyeingProdDetailsLCBRopeGrid: function () {
        $("#grdDyeingProdDetailsLCBRopeSummary").kendoGrid({
            dataSource: DyeingProdDetailsLCBRopeSummaryManager.gridDataSource(0),
            //pageable: {
            //    refresh: true,
            //    serverPaging: true,
            //    serverFiltering: true,
            //    serverSorting: true,

            //},
            filterable: false,
            sortable: true,
            columns: DyeingProdDetailsLCBRopeSummaryHelper.GenerateDyeProdDyeRopeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",


        });

    },
    GenerateDyeProdDyeRopeColumns: function () {
        //DID,LDate,ShiftCode,CanNo,BeamNo,MCNo,Speed,LCBLength,PO,OP,SVisor,Tension,Brkg,CuttingEnds,LooseEnd,
        //RopeCut, Remarks, ReedTime, DyCaptainCEnd, QC, DyOPCEnd
        return columns = [
            { field: "LDate", title: "LDate", editable: false, template: '#=kendo.toString(LDate,"dd-MMM-yyyy")#' },
            { field: "ShiftName", title: "Shift", editable: false, sortable: true },
            //{ field: "CanNo", title: "CanNo"},
            { field: "BeamNo", title: "BeamNo" },
            //{ field: "MCNo", title: "MCNo" },
            { field: "Speed", title: "Speed" },
            //{ field: "LCBLength", title: "LCBLength"},
            { field: "PO", title: "PO" },
            { field: "OP", title: "OP" },
            { field: "SVisor", title: "SVisor" },
            { field: "Tension", title: "Tension" },
            { field: "Brkg", title: "Brkg" },
            //{ field: "CuttingEnds", title: "CuttingEnds" },
            { field: "LooseEnd", title: "LooseEnd" },
            //{ field: "RopeCut", title: "RopeCut" },
            //{ field: "ReedTime", title: "ReedTime" },
            { field: "DyCaptainCEnd", title: "DyCaptainCEnd" },
            { field: "QC", title: "QC" },
            { field: "DyOPCEnd", title: "DyOPCEnd" },
            { field: "Edit", title: "Edit", filterable: false, width: "50px", template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit1" onClick="DyeingProdDetailsLCBRopeSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdDyeingProdDetailsLCBRopeSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        if (selectedItem != null) {
            $("#luid").val(selectedItem.iid);
            console.log(selectedItem.iid);
            DyeingProdDetailsLCBRopeHelper.SetDyeingProdDetailsLCBRopeForm(selectedItem);
        }

    },
}

//[{"DIID":1,"DID":2,"LDate":"\/Date(3436452000000)\/","ShiftCode":1,"CanNo":1,"BeamNo":"1","MCNo":"1","Speed":1,"LCBLength":1.0000,"PO":"1","OP":"1","SVisor":"1","Tension":1.0000,"Brkg":1.0000,"CuttingEnds":1,"LooseEnd":1,"RopeCut":1,"ReedTime":"1","DyCaptainCEnd":"1","QC":"1","DyOPCEnd":"1","Remarks":"1"}]