var production = {
    service: {
        saveInspectionProductionMaster: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                url: "../InspectionProduction/SaveInspectionProductionMaster/",
                data: model,
                success: onSuccess,
                error: function (err) {
                    window.alert(err.statusText);
                }
            })
        },
        saveInspectionProductionDetail: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                url: "../InspectionProduction/SaveInspectionProductionDetail/",
                data: model,
                success: onSuccess,
                error: function (err) {
                    window.alert(err.statusText);
                }
            })
        },
        saveInspectionOperatorProductionDetail: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                url: "../InspectionProduction/SaveInspectionOperatorProductionDetail/",
                data: model,
                success: onSuccess,
                error: function (err) {
                    window.alert(err.statusText);
                }
            })
        }
    },
    summary: {
        grid: {
            productionToFinishGrid: $("#productionToFinishGrid").kendoGrid({
                toolbar: [
                    { template: '<input type="text" style="border-color:\\\\#428bca;" class="search k-input k-textbox" placeholder="Search here..."/>' }
                ],
                pageable: {
                    refresh: true,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true,

                },
                resizable: true,
                filterable: false,
                sortable: true,
                editable: false,
                selectable: "row",
                columns: [

                    { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>' },
                    { width: "50", field: "ID", title: "ID", template: "<div style='padding:0px 4px;'>#:ID#</div>" },
                    { width: "50", field: "FinishMCName", title: "MC", template: "<div style='padding:0px 4px;'>#:FinishMCName?FinishMCName:''#</div>" },
                    { width: "50", field: "TotalProd", title: "Prod", template: "<div style='padding:0px 4px;'>#:TotalProd?TotalProd:''#</div>" },
                    { width: "50", field: "PType", title: "ProdType", template: "<div style='padding:0px 4px;'>#:PType?PType:''#</div>" },
                    { width: "50", field: "SetNo", title: "SetNo", template: "<div style='padding:0px 4px;'>#:SetNo?SetNo:''#</div>" },
                ],
                dataSource: {
                    type: "json",
                    pageSize: 10,
                    transport: {
                        read: {
                            type: "POST",
                            dataType: "json",
                            url: "../InspectionCheck/GetAllInspectionCheckProductionToFinish/",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        },
                        parameterMap: function (options) {
                            return JSON.stringify(options);
                        }
                    },
                },
            }).data("kendoGrid"),
            inspectionToFinishGrid: $("#inspectionToFinishGrid").kendoGrid({
                toolbar: [
                    { template: '<input type="search" id="searchbox" style="border-color:\\\\#428bca" class="search k-input k-textbox" placeholder="Search here..."/>' }
                ],
                pageable: {
                    refresh: true,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true,

                },
                resizable: true,
                filterable: false,
                sortable: true,
                editable: false,
                selectable: "row",
                dataBound: function () {
                    var grid = this;
                    grid.tbody.find(".btn-edit-summary").bind("click", function (e) {
                        var dataItem = grid.dataItem($(e.target).closest("tr"));
                        production.master.setFormData(dataItem);
                        production.detail.production.grid.setDataSource(dataItem.ID);
                        production.detail.opProduction.grid.setDataSource(dataItem.ID);
                        production.summary.hide();
                        production.master.show();
                    });
                },
                columns: (() => {
                    return [
                        { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>' },
                        { width: "50", field: "ID", title: "ID", template: "<div style='padding:0px 4px;'>#:ID#</div>" },
                        { width: "50", field: "FType", title: "FType", template: "<div style='padding:0px 4px;'>#:FType?FType:''#</div>" },
                        { width: "50", field: "FMCName", title: "MC", template: "<div style='padding:0px 4px;'>#:FMCName?FMCName:''#</div>" },
                        { width: "50", field: "OName", title: "POName", template: "<div style='padding:0px 4px;'>#:OName?OName:''#</div>" },
                        { width: "50", field: "TotalProd", title: "Rejection", template: "<div style='padding:0px 4px;'>#:TotalProd?TotalProd:''#</div>" },
                    ]
                })(),
                dataSource: {
                    type: "json",
                    pageSize: 10,
                    transport: {
                        read: {
                            type: "POST",
                            dataType: "json",
                            url: "../InspectionCheck/GetAllInspectionCheckRejectionToFinish/",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        },
                        parameterMap: function (options) {
                            return JSON.stringify(options);
                        }
                    },
                },
            }).data("kendoGrid"),
        },
    },
    init: function () {
        $("#productionToFinishGrid .search").keyup(function () {
            var val = $(this).val();
            var sval = val.toString();
            var lval = sval.toLowerCase();
            production.summary.grid.productionToFinishGrid.dataSource.filter({
                logic: "or",
                filters: [
                    {
                        field: "ID",
                        operator: "gte",
                        value: parseFloat(lval)
                    },
                    {
                        field: "FinishMCName",
                        operator: "startswith",
                        value: lval
                    },
                    {
                        field: "TotalProd",
                        operator: "gte",
                        value: parseFloat(lval)
                    },
                    {
                        field: "PType",
                        operator: "startswith",
                        value: lval
                    },
                    {
                        field: "SetNo",
                        operator: "gte",
                        value: parseFloat(lval)
                    },
                ]
            });
        });
        $("#inspectionToFinishGrid .search").keyup(function () {
            var val = $(this).val();
            var sval = val.toString();
            var lval = sval.toLowerCase();
            production.summary.grid.inspectionToFinishGrid.dataSource.filter({
                logic: "or",
                filters: [
                    {
                        field: "ID",
                        operator: "gte",
                        value: parseFloat(lval)
                    },
                    {
                        field: "FMCName",
                        operator: "startswith",
                        value: lval
                    },
                    {
                        field: "FType",
                        operator: "startswith",
                        value: lval
                    },
                    {
                        field: "OName",
                        operator: "startswith",
                        value: lval
                    },
                    {
                        field: "TotalProd",
                        operator: "gte",
                        value: parseFloat(lval)
                    },
                ]
            });
        })
    }
};
production.init();
