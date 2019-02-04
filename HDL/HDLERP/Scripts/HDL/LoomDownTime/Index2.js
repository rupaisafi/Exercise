function LoomDownTime() {
}
LoomDownTime.table = $("#tblLoomDownTime");
LoomDownTime.newCombo = function (option, container) {
    var container = !container && $("<td>");
    var elm = $("<input>")
        .appendTo(container);
    var wgt = elm.kendoComboBox(option).data("kendoComboBox");
    wgt.input.focus(function () {
        wgt.open();
    });
    wgt.input.keyup(option.keyup);
    wgt.bind("select", option.select);
    wgt.bind("change", option.change);

    return container;
};
LoomDownTime.newTimeMask = function (option, container) {
    var container = !container && $("<td>");
    var elm = $("<input>")
        .appendTo(container);
    var wgt = elm.kendoMaskedTextBox(option.kendo).data("kendoMaskedTextBox");
    //wgt.input.focus(function () {
    //    wgt.open();
    //});
    //wgt.input.keyup(option.keyup);
    //wgt.bind("change", option.change);

    return container;
};
LoomDownTime.newNumericText = function (option, container) {
    var container = !container && $("<td>");
    var elm = $("<input>")
        .appendTo(container);
    var wgt = elm.kendoNumericTextBox(option.kendo).data("kendoNumericTextBox");
    //wgt.input.focus(function () {
    //    wgt.open();
    //});
    //wgt.input.keyup(option.keyup);
    //wgt.bind("change", option.change);

    return container;
};
LoomDownTime.newTextBox = function (option, container) {
    var container = !container && $("<td>");
    $("<input>")
        .addClass("k-input k-textbox")
        .appendTo(container)
        .keyup(function (e) {
            console.log(e.keyCode)
            option.keyup(e);
        });
    return container;
};
LoomDownTime.addRow = function () {
    $("<tr>")
        .append(LoomDownTime.newCombo({
            placeholder: "--- Select ---",
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: [
                { Text: "A-1", Value: "A" },
                { Text: "B-1", Value: "C" },
                { Text: "C-1", Value: "C" }
            ]
        }))
        .append(LoomDownTime.newCombo({
            placeholder: "--- Select ---",
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: [
                { Text: "A-1", Value: "A" },
                { Text: "B-1", Value: "C" },
                { Text: "C-1", Value: "C" }
            ],
            //change: function (e) {
            //    e.sender.element.closest("td").next("td").find("input[data-role='maskedtextbox']").focus();
            //},
            //select: function (e) {
            //    console.log(e.sender.value())
            //}
        }))
        .append(LoomDownTime.newTimeMask({
            kendo: {
                mask: "ab:c0",
                rules: {
                    "a": /[012]/,
                    "b": /[0123]/,
                    "c": /[012345]/
                },
                //change: function (e) {
                //    e.sender.element.closest("td").next("td").find("input[data-role='maskedtextbox']").focus();
                //},
            }
        }))
        .append(LoomDownTime.newTimeMask({
            kendo: {
                mask: "ab:c0",
                rules: {
                    "a": /[012]/,
                    "b": /[0123]/,
                    "c": /[012345]/
                },
                //change: function (e) {
                //    e.sender.element.closest("td").next("td").find("input[data-role='numerictextbox']").data("kendoNumericTextBox")._text.focus();
                //},
            },
            keyup: function () {
            }
        }))
        .append(LoomDownTime.newNumericText({
            kendo: {
                //change: function (e) {
                //    e.sender.element.closest("td").next("td").find("input").focus();
                //},
            }
        }))
        .append(LoomDownTime.newTextBox({
            kendo: {
                mask: "a0-bc-0000",
                rules: {
                    "a": /[0123]/,
                    "b": /[01]/,
                    "c": /[012]/
                },
            },
            //keyup: function (e) {
            //    //debugger;
            //    console.log(e.keyCode)
            //    if (e.keyCode === 13) {
            //        LoomDownTime.addRow();
            //    }
            //}
        }))
        .append(function () {
            console.log(this);
        })
        .appendTo(LoomDownTime.table.find("tbody"));
};
LoomDownTime.init = function () {
    $("#btnNewLoomDownTime").click(function () {
        LoomDownTime.addRow();
    });
    //LoomDownTime.addRow();
};
LoomDownTime.init();
var service = {
    getAll: function (masterID) {

    },
    getDetail: function (masterID) {
        return [
            { ID: 1, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
            { ID: 2, LoomID: 1, ReasonID: 1, StopTime: "10:10", RunTime: "10:10", TotalTime: "10:10", Remark: "Testing...." },
        ]
    }
};

var ui = {
    master: {
        getColumns: function () {
            return [
                { field: "", headerTemplate: '<div style="text-align:center;"><span class="glyphicon glyphicon-tasks"></span></div>', width: "30px", template: '<div class="ws-grid-edit-button"><span class="glyphicon glyphicon-edit"></span></div>' },
                { field: "ID", title: "ID No" },
                { field: "LoomDate", title: "Program Date", template: "#:kendo.toString(LoomDate,'dd-MMM-yyyy')#" },
                { field: "Remark", title: "Remarks" },
            ];
        },
        getGridDataSource: function () {
            var from = $("#ldtsFromDate").data("kendoDatePicker").value();
            from = kendo.toString(from, "yyyy-MM-dd");
            var to = $("#ldtsToDate").data("kendoDatePicker").value();
            to = kendo.toString(to, "yyyy-MM-dd");
            return new kendo.data.DataSource({
                type: "json",
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                allowUnsort: true,
                pageSize: 10,
                transport: {
                    read: {
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "../LoomDownTime/GetSummaryData?from=" + from + "&to=" + to,
                    },
                    parameterMap: function (options) {
                        return JSON.stringify(options);
                    }
                },
                schema: {
                    data: "Items",
                    total: "TotalCount",
                    model: {
                        fields: {
                            LoomDate: {
                                type: "date",
                                template: '#= kendo.toString("dd-MMM-yyyy") #',
                                editable: false
                            }
                        }
                    }
                }
            });
        },
        setGridDataSource: function () {
            var dataSource = ui.master.getGridDataSource();
            $("#ldtsGrid").data("kendoGrid").setDataSource(dataSource);
        },
        initGrid: function () {
            return $("#ldtsGrid").kendoGrid({
                pageable: true,
                selectable: "row",
                columns: ui.master.getColumns(),
                dataSource: ui.master.getGridDataSource(),
            }).data("kendoGrid")
        },
        init: function () {
            var date = new Date();
            $("#ldtsFromDate").kendoDatePicker({
                format: "dd-MMM-yyyy",
                value: new Date(date.getFullYear(), date.getMonth(), 1),
                change: function () {
                    ui.master.setGridDataSource();
                }
            });
            $("#ldtsToDate").kendoDatePicker({
                format: "dd-MMM-yyyy",
                value: new Date(date.getFullYear(), date.getMonth() + 1, 0),
                change: function () {
                    ui.master.setGridDataSource();
                }
            });
            ui.master.initGrid();
        }
    },
    detail: {
        grid: {
            addRow: function (item) {
                var tr = $("<tr>");
                tr.data("model", item);
                tr.append(function () {
                    var td = $("<td style='width:100px;'>");
                    $("<input>")
                        .appendTo(td)
                        .kendoComboBox({
                            placeholder: "--- Select ---",
                            dataTextField: "Text",
                            dataValueField: "Value",
                            dataSource: [
                                { Text: "A-1", Value: "A" },
                                { Text: "B-1", Value: "C" },
                                { Text: "C-1", Value: "C" }
                            ]
                        })
                        .data("kendoComboBox")
                        .value(item.LoomID);
                    return td;
                });
                tr.append(function () {
                    var td = $("<td style='width:200px;'>");
                    $("<input>")
                        .appendTo(td)
                        .kendoComboBox({
                            placeholder: "--- Select ---",
                            dataTextField: "Text",
                            dataValueField: "Value",
                            dataSource: [
                                { Text: "A-1", Value: "A" },
                                { Text: "B-1", Value: "C" },
                                { Text: "C-1", Value: "C" }
                            ]
                        })
                        .data("kendoComboBox")
                        .value(item.LoomID);
                    return td;
                });
                tr.appendTo($("#tblLoomDownTime").find("tbody"));
                console.log(tr);
            },
            setData: function (data) {
                if (data.length) {
                    data.forEach(function (item) {
                        ui.detail.grid.addRow(item);
                    });
                }
            },
            init: function () {
                ui.detail.grid.setData(service.getDetail(1));
            }
        },
        init: function () {
            ui.detail.grid.init();
        }
    },
    init: function () {
        ui.master.init();
        ui.detail.init();
    }
};
ui.init();