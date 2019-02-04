var ui = {

    detail: {
        colums: function () {

        },
        grid: {
            data: function () {
                return $("#ldtdGrid").data("kendoGrid");
            },
            dataSource: function () {
                return new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: crudServiceBaseUrl + "/Products",
                            dataType: "jsonp"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            dataType: "jsonp"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            dataType: "jsonp"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            dataType: "jsonp"
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                return { models: kendo.stringify(options.models) };
                            }
                        }
                    },
                    batch: true,
                    pageSize: 10,
                    schema: {
                        model: {
                            id: "ID",
                            fields: {
                                ID: { editable: false, nullable: true },
                                LoomID: { type: "number", validation: { required: true } },
                                ReasonID: { type: "number", validation: { required: true, min: 1 } },
                                StopTime: { type: "number" },
                                RunTime: { type: "number", validation: { min: 0, required: true } },
                                TotalTime: { type: "number" },
                                Remark: { type: "text" },
                            }
                        }
                    }
                });
            },
            columns: function () {
                return [
                    { field: "ID", title: "ID", hidden: true },
                    { field: "LoomID", title: "Loom", },
                    { field: "ReasonID", title: "Reason", },
                    { field: "StopTime", title: "StopTime", },
                    { field: "RunTime", title: "RunTime", },
                    { field: "TotalTime", title: "TotalTime", },
                    { field: "Remark", title: "Remark", },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
                ];
            },
            init: function () {
                $("#ldtdGrid").kendoGrid({
                    pageable: true,
                    editable: "true",
                    columns: ui.detail.grid.columns(),
                    dataSource: [
                        { ID: 1, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
                        { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." }
                    ],
                });
            }
        },
        init: function () {
            ui.detail.grid.init();
        }
    },
    init: function () {
        ui.detail.init();
    }
};
ui.init();