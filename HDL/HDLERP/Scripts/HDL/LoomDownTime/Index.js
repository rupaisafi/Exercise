var ldt = {
    service: {
        saveLoomDownTimeMaster: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                url: "../LoomDownTime/SaveLoomDownTimeMaster",
                data: model,
                success: onSuccess,
                error: function (err) {
                    window.alert(err.statusText);
                }
            })
        },
        saveLoomDownTimeDetail: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                url: "../LoomDownTime/SaveLoomDownTimeDetail",
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
            _self: {},
            columns: function () {
                return [
                    { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>' },
                    { width: "50", field: "ID", title: "ID", template: "<div style='padding:0px 4px;'>#:ID#</div>" },
                    { width: "50", field: "LoomDate", title: "Date", template: "", template: "<div style='padding:0px 4px;'>#:kendo.toString(LoomDate,'dd-MMM-yyyy')#</div>" },
                    { width: "50", field: "Remark", title: "Remark", template: "<div style='padding:0px 4px;'>#:Remark?Remark:''#</div>" },
                    //{ width: "50", field: "DName", title: "DeptName", template: "<div style='padding:0px 4px;'>#:DName?DName:''#</div>" },
                    //{ width: "50", field: "UCode", title: "UnitCode", template: "<div style='padding:0px 4px;'>#:UCode?UCode:''#</div>" },
                    //{ width: "50", field: "UName", title: "UnitName", template: "<div style='padding:0px 4px;'>#:UName?UName:''#</div>" },
                    //{ width: "50", field: "Ref", title: "Reference", template: "<div style='padding:0px 4px;'>#:Ref?Ref:''#</div>" },
                ];
            },
            dataSource: function (from, to) {
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
                            url: "../LoomDownTime/GetSummary?from=" + from + "&to=" + to,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
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
                                },
                                //TrackDate: {
                                //    type: "date",
                                //    template: '#= kendo.toString("dd-MMM-yyyy") #',
                                //    editable: false
                                //}
                            }
                        }
                    }
                });
            },
            setDataSource: function (from, to) {
                ldt.summary.grid._self.setDataSource(ldt.summary.grid.dataSource(from, to));
            },
            init: function (from, to) {
                ldt.summary.grid._self = $("#summaryGrid").kendoGrid({
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
                            dataItem.LoomDate = kendo.toString(dataItem.LoomDate, "dd-MM-yyyy");
                            ldt.master.setFormData(dataItem);
                            ldt.detail.grid.setDataSource(dataItem.ID);
                            console.log(dataItem);
                            ldt.summary.hide();
                            ldt.master.show();
                        });
                    },
                    columns: ldt.summary.grid.columns(),
                    dataSource: ldt.summary.grid.dataSource(from, to),
                }).data("kendoGrid");
            },
        },
        show: function () {
            $("#ldtSummary").show();
        },
        hide: function () {
            $("#ldtSummary").hide();
        },
        init: function () {
            var date = new Date();
            var toDate = $("#ldtsToDate")
                .kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(date.getFullYear(), date.getMonth() + 1, 0)
                })
                .data("kendoDatePicker")
                .bind("change", function () {
                    var _from = kendo.toString(fromDate.value(), "dd-MMM-yyyy");
                    var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                    ldt.summary.grid.setDataSource(_from, _to);
                });

            var fromDate = $("#ldtsFromDate")
                .kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(date.getFullYear(), date.getMonth(), 1)
                })
                .data("kendoDatePicker")
                .bind("change", function () {
                    var _from = kendo.toString(this.value(), "dd-MMM-yyyy");
                    var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                    ldt.summary.grid.setDataSource(_from, _to);
                });

            ldt.summary.grid.init(kendo.toString(fromDate.value(), "dd-MMM-yyyy"), kendo.toString(toDate.value(), "dd-MMM-yyyy"));

            $('#wsNew').bind("click", function () {
                ldt.master.clearFormData();
                ldt.detail.grid.setDataSource('');
                ldt.summary.hide();
                ldt.master.show();
            });
            $('#ipdClose').bind("click", function () {
                ldt.master.hide();
                ldt.summary.show();
                $("#summaryGrid").data("kendoGrid").dataSource.read();
            })
        },
    },
    master: {
        form: {
            IDNo: $("#ldtIDNo"),
            LDate: $("#ldtLDate"),
            Remarks: $("#ldtRemarks"),
        },
        show: function () {
            $("#ldtDetail").show();
        },
        hide: function () {
            $("#ldtDetail").hide();
        },
        getFormData: function () {
            return {
                ID: ldt.master.form.IDNo.val(),
                LoomDate: kendo.parseDate(ldt.master.form.LDate.val(), "dd/MM/yyyy"),
                Remarks: ldt.master.form.Remarks.val(),
            }
        },
        setFormData: function (model) {
            ldt.master.form.IDNo.val(model.ID);
            ldt.master.form.LDate.val(model.LoomDate);
            ldt.master.form.Remarks.val(model.Remark);
        },
        clearFormData: function () {
            ldt.master.form.IDNo.val('');
            ldt.master.form.LDate.val('');
            ldt.master.form.Remarks.val('');
        },
        isValid: function (model) {
            if (model.LoomDate) {
                model.LoomDate = kendo.toString(model.LoomDate, "yyyy/MM/dd");
                return true;
            } else {
                return false;
            }
        },
        saveData: function (onSuccess) {
            var model = ldt.master.getFormData();
            if (ldt.master.isValid(model)) {
                ldt.service.saveLoomDownTimeMaster(model, onSuccess);
            } else {
                window.alert("Please fill all the required field");
            }
        },
        init: function () {
            ldt.master.form.LDate.kendoMaskedTextBox({
                mask: "00/00/0000",
            });
            ldt.master.form.LDate.keypress(function (e) {
                if (e.keyCode === 13) {
                    var date = kendo.parseDate($(this).val(), "dd/MM/yyyy");
                    console.log(date)
                    if (date) {
                        ldt.master.form.Remarks.focus();
                    } else {
                        window.alert("Please enter a valid date");
                        ldt.master.form.LDate.focus();
                    }
                }
            });
            ldt.master.form.LDate.change(function (e) {
                var date = kendo.parseDate($(this).val(), "dd/MM/yyyy");
                if (date) {
                    ldt.master.form.Remarks.focus();
                } else {
                    return window.alert("Please enter a valid date");
                }
                ldt.master.saveData(function (res) {
                    if (res.SaveStatus == "Success") {
                        ldt.master.form.IDNo.val(res.ID);
                    } else {
                        window.alert("An Error occured saving data.");
                    }
                })
            });
            ldt.master.form.Remarks.keydown(function (e) {
                if (e.keyCode === 13) {
                    ldt.master.saveData(function (res) {
                        if (res.SaveStatus == "Success") {
                            ldt.master.form.IDNo.val(res.ID);
                        } else {
                            window.alert("An Error occured saving data.");
                        }
                    })
                }
            })
        }
    },
    detail: {
        grid: {
            _self: {},
            setDataSource: function (masterID) {
                ldt.detail.grid._self.setDataSource(new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "../LoomDownTime/GetDetail?masterID=" + masterID,
                        }
                    },
                    schema: {
                        data: function (res) {
                            res.push({ "ID": "", "Loom": { "Id": "", "Text": "" }, "Reason": { "Id": "", "Text": "" }, "StopTime": "", "RunTime": "", "TotalTime": "", "Remarks": "" });
                            return res;
                        },
                        model: {
                            id: "ID",
                            //fields: {
                            //    Category1: { defaultValue: '' }
                            //}
                        }
                    }
                }));
            },
            init: function () {
                var option = {};
                option.getEmptyModel = function () {
                    var model = {
                        ID: "",
                        Loom: {
                            Id: "",
                            Text: ""
                        },
                        Reason: {
                            Id: "",
                            Text: ""
                        },
                        StopTime: "",
                        RunTime: "",
                        TotalTime: "",
                        Remarks: ""
                    };
                    return model;
                };
                option.loomData = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "../LoomDownTime/GetAllLoom"
                        }
                    }
                });
                option.reasonData = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "../LoomDownTime/GetAllReason"
                        }
                    }
                });
                option.category1Editor = function (container, options) {
                    var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                        .appendTo(container)
                        .kendoComboBox({
                            animation: false,
                            cascadeFrom: options.field + options.model.ID,
                            clearButton: false,
                            filter: "contains",
                            //template:"<div style='width:220px;'>#:Text#</div>",
                            dataTextField: "Text",
                            dataValueField: "Id",
                            //dataSource: {
                            //    transport: {
                            //        read: {
                            //            url: "../Home/ComboList?uid=" + options.model.Category
                            //        }
                            //    }
                            //},
                            dataSource: option.categoryData,
                            dataBound: function () {

                            }
                        })
                        .data("kendoComboBox");
                    editor.input
                        .keydown(function (e) {
                            if (e.keyCode === 13) {
                                editor.value() && $(e.currentTarget).closest("td").next().click();
                            }
                        });
                    editor
                        .input
                        .on("focus", function (e) {
                            var el = $(e.currentTarget);
                            el.select();
                            editor.open();
                        });

                    function isTextSelected(input) {
                        if (typeof input.selectionStart == "number") {
                            return input.selectionStart == 0 && input.selectionEnd == input.value.length;
                        } else if (typeof document.selection != "undefined") {
                            input.focus();
                            return document.selection.createRange().text == input.value;
                        }
                    }
                };
                option.loomEditor = function (container, options) {
                    var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                        .appendTo(container)
                        .kendoComboBox({
                            animation: false,
                            clearButton: false,
                            filter: "contains",
                            dataTextField: "Text",
                            dataValueField: "Id",
                            dataSource: option.loomData,
                            dataBound: function () {

                            }
                        })
                        .data("kendoComboBox");
                    editor.input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            editor.value() && $(e.currentTarget).closest("td").next().click();
                        }
                    });
                    editor.input.on("focus", function (e) {
                        var el = $(e.currentTarget);
                        el.select();
                        editor.open();
                    });
                };
                option.reasonEditor = function (container, options) {
                    var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                        .appendTo(container)
                        .kendoComboBox({
                            animation: false,
                            cascadeFrom: options.field + options.model.ID,
                            clearButton: false,
                            filter: "contains",
                            dataTextField: "Text",
                            dataValueField: "Id",
                            dataSource: option.reasonData,
                            dataBound: function () {

                            }
                        })
                        .data("kendoComboBox");
                    editor.input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            editor.value() && $(e.currentTarget).closest("td").next().click();
                        }
                    });
                    editor.input.on("focus", function (e) {
                        var el = $(e.currentTarget);
                        el.select();
                        editor.open();
                    });
                };
                option.stopTimeEditor = function (container, options) {
                    var editor = $('<input class="k-input k-textbox" name="' + options.field + '" style="height:24px;"/>')
                        .appendTo(container)
                        .kendoMaskedTextBox({
                            mask: "ab:c0",
                            value: "00:00",
                            rules: {
                                "a": /[012]/,
                                "b": /[0123]/,
                                "c": /[012345]/,
                            }
                        }).data("kendoMaskedTextBox");
                    console.log(editor)
                    editor.element.on("focus", function () {
                        $(this).select();
                    })
                    editor.element.keyup(function (e) {
                        $(this).trigger("change");
                    })
                    editor.element.keydown(function (e) {
                        var grid = container.closest('.k-grid').data("kendoGrid");
                        if (e.keyCode === 13) {
                            $(this).trigger("change");
                            if (container.next("td").length > 0) {
                                container.next("td").click();
                            }
                        }
                    })
                };
                option.runTimeEditor = function (container, options) {
                    var editor = $('<input class="k-input k-textbox" name="' + options.field + '" style="height:24px;"/>')
                        .appendTo(container)
                        .kendoMaskedTextBox({
                            mask: "ab:c0",
                            value: "00:00",
                            rules: {
                                "a": /[012]/,
                                "b": /[0123]/,
                                "c": /[012345]/,
                            }
                        }).data("kendoMaskedTextBox");
                    console.log(editor)
                    editor.element.on("focus", function () {
                        $(this).select();
                    })
                    editor.element.keyup(function (e) {
                        $(this).trigger("change");
                    })
                    editor.element.keydown(function (e) {
                        var grid = container.closest('.k-grid').data("kendoGrid");
                        if (e.keyCode === 13) {
                            $(this).trigger("change");
                            if (container.next("td").length > 0) {
                                container.next("td").click();
                            }
                        }
                    })
                };
                option.totalTimeEditor = function (container, options) {
                    var editor = $('<input class="k-input k-textbox" name="' + options.field + '" style="height:24px;"/>')
                        .appendTo(container)
                        .kendoMaskedTextBox({
                            mask: "ab:c0",
                            value: "00:00",
                            rules: {
                                "a": /[012]/,
                                "b": /[0123]/,
                                "c": /[012345]/,
                            }
                        }).data("kendoMaskedTextBox");
                    console.log(editor)
                    editor.element.on("focus", function () {
                        $(this).select();
                    })
                    editor.element.keyup(function (e) {
                        $(this).trigger("change");
                    })
                    editor.element.keydown(function (e) {
                        var grid = container.closest('.k-grid').data("kendoGrid");
                        if (e.keyCode === 13) {
                            $(this).trigger("change");
                            if (container.next("td").length > 0) {
                                container.next("td").click();
                            }
                        }
                    })
                };
                option.remarkEditor = function (container, options) {
                    $('<input class="k-input k-textbox" name="' + options.field + '" style="height:24px;"/>')
                        .appendTo(container)
                        .on("focus", function () {
                            $(this).select();
                        })
                        .keyup(function () {
                            $(this).trigger("change");
                        })
                        .keydown(function (e) {
                            $(this).trigger("change");
                            var grid = container.closest('.k-grid').data("kendoGrid");
                            if (e.keyCode === 13) {
                                if (container.closest("tr").next("tr").length > 0) {
                                    grid.select(container.closest("tr").next("tr"));
                                    container.closest("tr").next("tr").find("td").eq(1).click();
                                } else {
                                    grid.dataSource.add(option.getEmptyModel());
                                    grid.select(grid.tbody.find("tr").last());
                                    grid.tbody.find("tr").last().find("td").eq(1).click();
                                }
                            }
                        });
                };
                option.getColumn = function () {
                    return [
                        { width: "30px", field: "", title: "", template: "<div style='padding:0px 0px;text-align: center;'><span class='glyphicon glyphicon-trash'></span></div>" },
                        { width: "100px", field: "Loom", title: "LoomNo", editor: option.loomEditor, template: "<div style='padding:2px 4px;'>#:Loom.Text?Loom.Text:''#</div>" },
                        { width: "200px", field: "Reason", title: "Reason", editor: option.reasonEditor, template: "<div style='padding:2px 4px;'>#:Reason.Text?Reason.Text:''#</div>" },
                        { width: "100px", field: "StopTime", title: "StopTime", editor: option.stopTimeEditor, template: "<div style='padding:2px 4px;'>#:StopTime# </div>" },
                        { width: "100px", field: "RunTime", title: "RunTime", editor: option.runTimeEditor, template: "<div style='padding:2px 4px;'>#:RunTime# </div>" },
                        { width: "100px", field: "TotalTime", title: "TotalTime", editor: option.totalTimeEditor, template: "<div style='padding:2px 4px;'>#:TotalTime # </div>" },
                        { field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div style='padding:2px 4px;'>#:Remarks # </div>" },

                    ]
                };
                option.updateRow = function (grid, row, data) {
                    var dataItem;
                    if (data) {
                        dataItem = data;
                    } else {
                        dataItem = grid.dataItem(row);
                    }
                    var rowChildren = $(row).children('td[role="gridcell"]');

                    for (var i = 0; i < grid.columns.length; i++) {

                        var column = grid.columns[i];
                        var template = column.template;
                        var cell = rowChildren.eq(i);

                        if (template !== undefined) {
                            var kendoTemplate = kendo.template(template);

                            // Render using template
                            cell.html(kendoTemplate(dataItem));
                        } else {
                            var fieldValue = dataItem[column.field];

                            var format = column.format;
                            var values = column.values;

                            if (values !== undefined && values != null) {
                                // use the text value mappings (for enums)
                                for (var j = 0; j < values.length; j++) {
                                    var value = values[j];
                                    if (value.value == fieldValue) {
                                        cell.html(value.text);
                                        break;
                                    }
                                }
                            } else if (format !== undefined) {
                                // use the format
                                cell.html(kendo.format(format, fieldValue));
                            } else {
                                // Just dump the plain old value
                                cell.html(fieldValue);
                            }
                        }
                    }
                };
                option.updateCell = function (grid, cell, dataItem) {
                    var column = grid.columns[cell.index()];
                    var template = column.template;
                    if (template !== undefined) {
                        var kendoTemplate = kendo.template(template);

                        // Render using template
                        cell.html(kendoTemplate(dataItem));
                    } else {
                        var fieldValue = dataItem[column.field];

                        var format = column.format;
                        var values = column.values;

                        if (values !== undefined && values != null) {
                            // use the text value mappings (for enums)
                            for (var j = 0; j < values.length; j++) {
                                var value = values[j];
                                if (value.value == fieldValue) {
                                    cell.html(value.text);
                                    break;
                                }
                            }
                        } else if (format !== undefined) {
                            // use the format
                            cell.html(kendo.format(format, fieldValue));
                        } else {
                            // Just dump the plain old value
                            cell.html(fieldValue);
                        }
                    }
                };
                option.getDataSource = function (masterID) {
                    return new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../LoomDownTime/GetDetail?masterID=" + masterID,
                            }
                        },
                        schema: {
                            data: function (res) {
                                res.push({ "ID": "", "Loom": { "Id": "", "Text": "" }, "Reason": { "Id": "", "Text": "" }, "StopTime": "", "RunTime": "", "TotalTime": "", "Remarks": "" });
                                return res;
                            },
                            model: {
                                id: "ID",
                                fields: {
                                    Category1: { defaultValue: '' }
                                }
                            }
                        }
                    })
                };
                option.setDataSource = function (masterID) {
                    ldt.detail.grid._self.setDataSource(option.getDataSource(masterID));
                };
                option.getDetailModel = function (dataItem) {
                    return {
                        ID: dataItem.ID,
                        MasterID: ldt.master.form.IDNo.val(),
                        LoomID: dataItem.Loom.Id,
                        ReasonID: dataItem.Reason.Id,
                        StopTime: dataItem.StopTime,
                        RunTime: dataItem.RunTime,
                        TotalTime: dataItem.TotalTime,
                        Remark: dataItem.Remarks,
                    }
                };
                option.saveLoomDownTimeDetail = function (dataItem, onSuccess) {
                    var model = option.getDetailModel(dataItem);
                    ldt.service.saveLoomDownTimeDetail(model, onSuccess);
                };
                ldt.detail.grid._self = $("#grid").kendoGrid({
                    sortable: false,
                    autoSync: true,
                    editable: {
                        mode: "incell",
                        createAt: 'bottom'
                    },
                    resizable: true,
                    selectable: "row",
                    columns: option.getColumn(),
                    dataSource: option.getDataSource(),
                    save: function (e) {
                        window.setTimeout(function () {
                            option.saveLoomDownTimeDetail(e.model, function (res) {
                                if (res.SaveStatus == "Success") {
                                    e.model.ID = res.ID;
                                    e.model.MasterID = res.MasterID;
                                } else {
                                    //window.alert("An Error occured saving data.");
                                }
                            })
                        })
                    },
                    beforeEdit: function (e) {
                        var masterId = ldt.master.form.IDNo.val();
                        if (!masterId) {
                            e.preventDefault();
                        }
                    }
                }).data("kendoGrid");
            }
        },
        init: function () {
            ldt.detail.grid.init();
        }
    },
    init: function () {
        ldt.summary.init();
        ldt.master.init();
        ldt.detail.init();
    }
};
ldt.init();

//angular
//    .module("hdl", ["kendo.directives"])
//    .controller("ctrlDetail", function ($scope) {
//    });
