var service = {
    getAllDetail: function (masterID) {
        if (masterID && masterID > 0) {

        }
    }
}
var ui = {
    detail: {
        grid: {
            _self: {},
            _control: {
                invalid: false,
                currentCell: {},
            },
            isValidGrid: function () {
                return true;
            },
            isValidCell: function () {
                //var grid = ui.detail.grid._self;
                var cell = ui.detail.grid._control.currentCell;
                if (cell.length) {
                    var options = cell.data("options");
                    console.log(options.model[options.field])
                    //var dataItem = grid.dataItem(cell.parent());
                    if (options.model[options.field] == '') {
                        alert()
                        return false;
                    } else {
                        return true;
                    }

                } else {
                    return true;
                }

            },
            moveSelection: function (container, e) {
                if (ui.detail.grid.isValidGrid()) {
                    switch (e.keyCode) {
                        case 13:
                        case 39:
                            if (container.next().length) {
                                ui.detail.grid._self.closeCell();
                                ui.detail.grid._self.editCell(container.next());
                            } else if (container.parent().next().length) {
                                ui.detail.grid._self.closeCell();
                                ui.detail.grid._self.editCell(container.parent().next().find('td:visible:eq(0)'));
                            } else {
                                ui.detail.grid._self.table.focus();
                            }
                            break;
                        case 37:
                            if (container.prev("td:visible").length) {
                                ui.detail.grid._self.closeCell();
                                ui.detail.grid._self.editCell(container.prev());
                            } else if (container.parent().prev().length) {
                                ui.detail.grid._self.closeCell();
                                ui.detail.grid._self.editCell(container.parent().prev().find('td:visible:last-of-type'));
                            } else {
                                ui.detail.grid._self.table.focus();
                            }
                            break;
                        case 38:
                            if (container.parent().prev().length) {
                                ui.detail.grid._self.closeCell();
                                ui.detail.grid._self.editCell(container.parent().prev().find('td:eq(' + container.index() + ')'));
                            }
                            break;
                        case 40:
                            if (container.parent().next().length) {
                                ui.detail.grid._self.closeCell();
                                ui.detail.grid._self.editCell(container.parent().next().find('td:eq(' + container.index() + ')'));
                            }
                            break;
                        default:
                            break;
                    }
                } else {
                    ui.detail.grid.isValidCell(container, e);
                }
            },
            loomEditor: function (container, options) {
                if (container) {
                    container.data("options", options);
                    var elm = $('<input class="asdf" name="' + options.field + '"/>');
                    elm.appendTo(container)
                    var wgt = elm.kendoComboBox({
                        autoBind: false,
                        dataTextField: "Name",
                        dataValueField: "Id",
                        dataSource: [
                            { Id: 1, Name: "One" },
                            { Id: 2, Name: "Two" },
                            { Id: 3, Name: "Three" },
                            { Id: 4, Name: "Four" },
                        ]
                    }).data("kendoComboBox");
                    wgt.input.focus(function () {
                        var input = $(this);
                        window.setTimeout(function () {
                            input.select();
                        });
                    });
                    wgt.input.keyup(function (e) {
                        ui.detail.grid.moveSelection(container, e);
                    })
                }
            },
            reasonEditor: function (container, options) {
                if (container) {
                    container.data("options", options);
                    var elm = $('<input class="k-grid-text-box" name="' + options.field + '"/>');
                    elm.appendTo(container);
                    elm.focus(function () {
                        window.setTimeout(function () {
                            elm.select();
                        });
                    });
                    elm.keyup(function (e) {
                        ui.detail.grid.moveSelection(container, e);
                    });
                }
            },
            stopTimeEditor: function (container, options) {
                container.data("options", options);
                var elm = $('<input class="k-grid-text-box" name="' + options.field + '"/>');
                elm.appendTo(container);
                elm.focus(function () {
                    window.setTimeout(function () {
                        elm.select();
                    });
                });
                elm.keyup(function (e) {
                    ui.detail.grid.moveSelection(container, e);
                });
            },
            runTimeEditor: function (container, options) {
                container.data("options", options);
                var elm = $('<input class="k-grid-text-box" name="' + options.field + '"/>');
                elm.appendTo(container);
                elm.focus(function () {
                    window.setTimeout(function () {
                        elm.select();
                    });
                });
                elm.keyup(function (e) {
                    ui.detail.grid.moveSelection(container, e);
                });
            },
            remarkEditor: function (container, options) {
                container.data("options", options);
                var elm = $('<input class="k-grid-text-box" name="' + options.field + '"/>');
                elm.appendTo(container);
                elm.focus(function () {
                    window.setTimeout(function () {
                        elm.select();
                    });
                });
                elm.keyup(function (e) {
                    ui.detail.grid.moveSelection(container, e);
                });
            },
            columns: function () {
                var grid = ui.detail.grid;
                return [
                    { field: "ID", title: "ID", hidden: true },
                    { field: "MasterID", title: "MasterID", hidden: true },
                    { field: "LoomName", title: "Loom", editor: grid.loomEditor },
                    { field: "ReasonType", title: "Reason", editor: grid.reasonEditor },
                    { field: "StopTime", title: "StopTime", editor: grid.stopTimeEditor },
                    { field: "RunTime", title: "RunTime", editor: grid.runTimeEditor },
                    { field: "TotalTime", title: "TotalTime", editor: grid.runTimeEditor },
                    { field: "Remark", title: "Remark", editor: grid.remarkEditor },
                ];
            },
            dataSource: function (masterID) {
                var option = {};
                if (masterID && masterID > 0) {
                    option = {
                        transport: {
                            read: {
                                url: "../LoomDownTime/GetDetail?masterID=" + masterID,
                            }
                        },
                        schema: {
                            model: {
                                id: "ID",
                                fields: {
                                    "ID": { type: "number", editable: false },
                                    "MasterID": { type: "number", editable: false },
                                    "LoomName": { type: "text" },
                                    "ReasonType": { type: "text" },
                                    "StopTime": { type: "text" },
                                    "RunTime": { type: "text" },
                                    "TotalTime": { type: "text" },
                                    "Remark": { type: "text" },
                                }
                            },
                            parse: function (res) {
                                res.push({ "ID": 0, "LoomID": 0, "LoomName": "", "ReasonID": 0, "ReasonType": "", "StopTime": "00:00", "RunTime": "00:00", "TotalTime": "00:00", "Remark": "", "IsDeleted": false, "EntryBy": 0, "EntryDate": "\/Date(-62135596800000)\/", "UpdateBy": 0, "UpdateDate": "\/Date(-62135596800000)\/", "SaveStatus": null })
                                return res;
                            }
                        }
                    };
                } else {
                    option = {
                        data: []
                    };
                }
                return new kendo.data.DataSource(option);
            },
            init: function () {
                ui.detail.grid._self = $("#gridLoomDownTimeDetail").kendoGrid({
                    pageable: false,
                    selectable: true,
                    resizable: true,
                    editable: false,
                    edit: function (e) {
                        e.preventDefault();
                    },
                    change: function (e) {
                        //console.log("change");
                    },
                    save: function (e) {
                        //e.preventDefault();
                        console.log("save data:")
                    },
                    edit: function (e) {
                        e.preventDefault();
                        //console.log("edit:")
                        //console.log(e);
                    },
                    dataBound: function () {
                        var grid = this;
                        grid.tbody.find("td").click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (ui.detail.grid.isValidCell()) {
                                grid.closeCell();
                                grid.editCell(this);
                                ui.detail.grid._control.currentCell = $(this);
                                console.log(this);
                            }
                        });
                    },
                    beforeEdit: function (e) {
                        console.log("beforeEdit")
                        //e.preventDefault();
                    },
                    cellClose: function (e) {
                        console.log("cellClose");
                    },
                    columns: ui.detail.grid.columns(),
                    dataSource: ui.detail.grid.dataSource(1)
                }).data("kendoGrid");
            },
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
