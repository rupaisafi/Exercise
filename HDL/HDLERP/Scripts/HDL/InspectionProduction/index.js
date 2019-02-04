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
            _self: {},
            columns: function () {
                return [
                    { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>' },
                    { width: "50", field: "ID", title: "ID", template: "<div style='padding:0px 4px;'>#:ID#</div>" },
                    { width: "50", field: "SDate", title: "Date", template: "", template: "<div style='padding:0px 4px;'>#:kendo.toString(SDate,'dd-MMM-yyyy')#</div>" },
                    { width: "50", field: "DCode", title: "DeptCode", template: "<div style='padding:0px 4px;'>#:DCode?DCode:''#</div>" },
                    { width: "50", field: "DName", title: "DeptName", template: "<div style='padding:0px 4px;'>#:DName?DName:''#</div>" },
                    { width: "50", field: "UCode", title: "UnitCode", template: "<div style='padding:0px 4px;'>#:UCode?UCode:''#</div>" },
                    { width: "50", field: "UName", title: "UnitName", template: "<div style='padding:0px 4px;'>#:UName?UName:''#</div>" },
                    { width: "50", field: "Ref", title: "Reference", template: "<div style='padding:0px 4px;'>#:Ref?Ref:''#</div>" },
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
                            url: "../InspectionProduction/GetSummary?from=" + from + "&to=" + to,
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
                                SDate: {
                                    type: "date",
                                    template: '#= kendo.toString("dd-MMM-yyyy") #',
                                    editable: false
                                },
                                TrackDate: {
                                    type: "date",
                                    template: '#= kendo.toString("dd-MMM-yyyy") #',
                                    editable: false
                                }
                            }
                        }
                    }
                });
            },
            setDataSource: function (from, to) {
                production.summary.grid._self.setDataSource(production.summary.grid.dataSource(from, to));
            },
            init: function (from, to) {
                production.summary.grid._self = $("#summaryGrid").kendoGrid({
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
                    columns: production.summary.grid.columns(),
                    dataSource: production.summary.grid.dataSource(from, to),
                }).data("kendoGrid");
            },
        },
        show: function () {
            $("#inpSummary").show();
        },
        hide: function () {
            $("#inpSummary").hide();
        },
        init: function () {
            var date = new Date();
            var toDate = $("#toDate")
                .kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(date.getFullYear(), date.getMonth() + 1, 0)
                })
                .data("kendoDatePicker")
                .bind("change", function () {
                    var _from = kendo.toString(fromDate.value(), "dd-MMM-yyyy");
                    var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                    production.summary.grid.setDataSource(_from, _to);
                });

            var fromDate = $("#fromDate")
                .kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(date.getFullYear(), date.getMonth(), 1)
                })
                .data("kendoDatePicker")
                .bind("change", function () {
                    var _from = kendo.toString(this.value(), "dd-MMM-yyyy");
                    var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                    production.summary.grid.setDataSource(_from, _to);
                });

            production.summary.grid.init(kendo.toString(fromDate.value(), "dd-MMM-yyyy"), kendo.toString(toDate.value(), "dd-MMM-yyyy"));

            $('#ipsNew').bind("click", function () {
                production.master.clearFormData();
                production.detail.production.grid.setDataSource('');
                production.detail.opProduction.grid.setDataSource('');
                production.summary.hide();
                production.master.show();
            });
            $('#ipdClose').bind("click", function () {
                production.master.hide();
                production.summary.show();
                $("#summaryGrid").data("kendoGrid").dataSource.read();
            })
        },
    },
    master: {
        form: {
            ID: $("#ipmID"),
            SDate: $("#ipmSDate"),
            TotalProd: $("#ipmTotalProd"),
            UCode: $("#ipmUCode"),
            UName: $("#ipmUName"),
            InsFloorCode: $("#ipmInsFloorCode"),
            InsFloorName: $("#ipmInsFloorName"),
        },
        show: function () {
            $("#detail").show();
        },
        hide: function () {
            $("#detail").hide();
        },
        saveData: function (onSuccess) {
            var model = production.master.getFormData();
            var date = kendo.parseDate(model.SDate, "dd-MM-yyyy");
            if (date) {
                model.SDate = date.toString("yyyy-MM-dd");
            } else {
                model.SDate = kendo.toString(new Date(), "yyyy-MM-dd");
            }
            production.service.saveInspectionProductionMaster(model, onSuccess)
        },
        getFormData: function () {
            return {
                ID: production.master.form.ID.val(),
                SDate: production.master.form.SDate.data("kendoMaskedTextBox").value(),
                TotalProd: production.master.form.TotalProd.val(),
                UCode: production.master.form.UCode.val(),
                UName: production.master.form.UName.data("kendoComboBox").text(),
                InsFloorCode: production.master.form.InsFloorCode.val(),
                InsFloorName: production.master.form.InsFloorName.data("kendoComboBox").text(),
            }
        },
        setFormData: function (model) {
            production.master.form.ID.val(model.ID)
            production.master.form.SDate.data("kendoMaskedTextBox").value(model.SDate)
            production.master.form.TotalProd.val(model.TotalProd)
            production.master.form.UCode.val(model.UCode)
            production.master.form.UName.data("kendoComboBox").value(model.UName)
            production.master.form.InsFloorCode.val(model.InsFloorCode)
            production.master.form.InsFloorName.data("kendoComboBox").value(model.InsFloorName)
            //production.master.form.ID.val(model.Remarks)
        },
        clearFormData: function () {
            production.master.setFormData({
                ID: '',
                SDate: '',
                UCode: '',
                UName: '',
                TotalProd: '',
                InsFloorCode: '',
                InsFloorName: '',
            });
        },
        init: function () {
            production.master.form.SDate.kendoMaskedTextBox({
                mask: "00-00-0000",
                change: function () {
                    production.master.saveData(function (res) {
                        production.master.form.ID.val(res.ID);
                    })
                }
            });
            production.master.form.SDate.keydown(function (e) {
                if (e.keyCode === 13) {
                    production.master.form.TotalProd.focus();
                    production.master.form.TotalProd.select();
                }
            });
            production.master.form.TotalProd.keydown(function (e) {
                if (e.keyCode === 13) {
                    production.master.form.UName.data("kendoComboBox").focus();
                    production.master.form.UName.data("kendoComboBox").open();
                    production.master.form.UName.data("kendoComboBox").input.select();
                }
            });
            production.master.form.TotalProd.change(function () {
                production.master.saveData(function (res) {
                    production.master.form.ID.val(res.ID);
                })
            })
            production.master.form.UName.kendoComboBox({
                animation: false,
                filter: "contains",
                clearButton: false,
                dataTextField: "Text",
                dataValueField: "Id",
                dataSource: {
                    transport: {
                        read: {
                            url: "../BeamFinish/GetAllUnit"
                        }
                    }
                },
                change: function () {
                    if (this.value()) {
                        production.master.form.UCode.val(this.value())
                    } else {
                        production.master.form.UCode.val('')
                    }
                    production.master.saveData(function (res) {
                        production.master.form.ID.val(res.ID);
                    })
                }
            });
            production.master.form.UName.data("kendoComboBox").input.keydown(function (e) {
                if (e.keyCode === 13) {
                    production.master.form.InsFloorName.data("kendoComboBox").focus();
                    production.master.form.InsFloorName.data("kendoComboBox").open();
                    production.master.form.InsFloorName.data("kendoComboBox").input.select();
                }
            });
            production.master.form.InsFloorName.kendoComboBox({
                animation: false,
                filter: "contains",
                clearButton: false,
                dataTextField: "Text",
                dataValueField: "Id",
                dataSource: {
                    transport: {
                        read: {
                            url: "../BeamFinish/GetAllUnit"
                        }
                    }
                },
                change: function () {
                    if (this.value()) {
                        production.master.form.InsFloorCode.val(this.value())
                    } else {
                        production.master.form.InsFloorCode.val('')
                    }
                    production.master.saveData(function (res) {
                        production.master.form.ID.val(res.ID);
                    })
                }
            });
            production.master.form.InsFloorName.data("kendoComboBox").input.keydown(function (e) {
                if (e.keyCode === 13) {
                    //production.master.form.Remarks.focus();
                    //production.master.form.Remarks.select();
                }
            });
            production.master.clearFormData();
        }
    },
    detail: {
        production: {
            saveData: function (model, onSuccess) {
                var postModel = {
                    DID: model.DID,
                    ID: production.master.form.ID.val(),
                    StyleCode: model.Style.Id,
                    StyleNo: model.Style.Text,
                    Weight: model.Weight,
                    Constraction: model.Constraction,
                    Weave: model.Weave,
                    Colour: model.Colour,
                    Width: model.Width,
                    QCode: model.QCode,
                    FabQuality: model.FabQuality,
                    Prod: model.Prod,
                    FabReturn: model.FabReturn,
                    Remarks: model.Remarks,
                    CCode: model.CCode,
                    CName: model.CName,
                    TotalRoll: model.TotalRoll,
                    TotalPoint: model.TotalPoint,
                    SetNo: model.Set.Text,
                    SS: model.SS,
                    Loom: model.Loom,
                    Beam: model.Beam,
                    ProdB: model.ProdB,
                    ProdC: model.ProdC,
                    CutPieece: model.CutPieece,
                    Wastage: model.Wastage,
                    ProdG: model.ProdG,
                    TotalProd: model.TotalProd,
                    FCode: model.FType.Id,
                    FType: model.FType.Text,
                    UserName: model.UserName,
                    EDate: model.EDate,
                    PType: model.PType.Text,
                    PCode: model.PType.Id,
                    UCode: model.UCode,
                    UName: model.UName,
                    FinishMCName: model.FinishMC.Text,
                    FinishMCCode: model.FinishMC.Id
                };
                production.service.saveInspectionProductionDetail(postModel, onSuccess);
            },
            grid: {
                self: {},
                setDataSource: function (masterID) {
                    production.detail.production.grid.self.setDataSource(new kendo.data.DataSource({
                        type: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                type: "POST",
                                dataType: "json",
                                url: "../InspectionProduction/GetProductionDetail?masterID=" + masterID,
                                dataType: "json",
                            },
                            parameterMap: function (options) {
                                return JSON.stringify(options);
                            }
                        },
                        schema: {
                            data: function (res) {
                                res.push({
                                    DID: "",
                                    ID: masterID,
                                    Set: { Id: "", Text: "" },
                                    Style: { Id: "", Text: "" },
                                    Width: "",
                                    FabQuality: "",
                                    ProdB: "",
                                    ProdC: "",
                                    ProdG: "",
                                    CutPieece: "",
                                    Wastage: "",
                                    TotalRoll: "",
                                    PType: { Id: "", Text: "" },
                                    FinishMC: { Id: "", Text: "" },
                                    FType: { Id: "", Text: "" },
                                    Remarks: "",
                                });
                                return res;
                            },
                            model: {
                                fields: {
                                    //BDate: {
                                    //    type: "date",
                                    //    template: '#= kendo.toString("dd-MMM-yyyy") #',
                                    //    editable: false
                                    //},
                                }
                            }
                        }
                    }));
                },
                init: function () {
                    var option = {};
                    option.setNoData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllSetNo/"
                            }
                        }
                    });
                    option.styleNoData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllStyleNo/"
                            }
                        }
                    });
                    option.pTypeData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllPType/"
                            }
                        }
                    });
                    option.finishMCData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllFinishingMC/"
                            }
                        }
                    });
                    option.fTypeData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllFType/"
                            }
                        }
                    });
                    option.setNoEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.setNoData,
                                change: function () {
                                    var item = this.dataItem();
                                    options.model.Style.Id = item.StyleCode;
                                    options.model.Style.Text = item.StyleNo;
                                    options.model.PType.Id = item.PCode;
                                    options.model.PType.Text = item.PType;
                                    option.updateCell(container.closest(".k-grid").data("kendoGrid"), container.next(), options.model);
                                    option.updateCell(container.closest(".k-grid").data("kendoGrid"), container.parent().find("td").eq(11), options.model);
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
                    option.styleNoEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.styleNoData,
                                dataBound: function () { }
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
                    option.pTypeEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.pTypeData,
                                dataBound: function () { }
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
                    option.fMCEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.finishMCData,
                                dataBound: function () { }
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
                    option.fTypeEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.fTypeData,
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

                        function isTextSelected(input) {
                            if (typeof input.selectionStart == "number") {
                                return input.selectionStart == 0 && input.selectionEnd == input.value.length;
                            } else if (typeof document.selection != "undefined") {
                                input.focus();
                                return document.selection.createRange().text == input.value;
                            }
                        }
                    };
                    option.textEditor = function (container, options) {
                        $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                            .on("focus", function () {
                                $(this).select();
                            })
                            .keydown(function (e) {
                                $(this).trigger("change");
                                var grid = container.closest('.k-grid').data("kendoGrid");
                                if (e.keyCode === 13) {
                                    if (container.next("td").length > 0) {
                                        container.next("td").click();
                                    } else if (container.closest("tr").next("tr").length > 0) {
                                        grid.select(container.closest("tr").next("tr"))
                                        container.closest("tr").next("tr").find("td").eq(0).click();
                                    } else {
                                        grid.dataSource.add({ Id: '', Name: "", Category: "", Category1: { id: null, text: "" }, Category2: { id: null, text: "" }, Category3: "", Category4: "", Category5: "", Category6: "", Category7: "", Category8: "", Category9: "", Category10: "", Status: '' });
                                        grid.select(grid.tbody.find("tr").last());
                                        grid.tbody.find("tr").last().find("td").eq(0).click();
                                    }
                                }
                            })
                            .appendTo(container);
                    };
                    option.remarkEditor = function (container, options) {
                        $('<input class="k-input k-textbox" name="' + options.field + '"/>')
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
                            })
                            .appendTo(container);
                    };
                    option.updateRow = function (grid, row) {
                        var dataItem = grid.dataItem(row);

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
                    option.columns = function () {
                        return [
                            { width: "30px", field: "", title: "", template: "<div style='padding:0px 0px;text-align: center;'><span class='glyphicon glyphicon-trash'></span></div>" },
                            { width: "100px", field: "Set", title: "SetNo", editor: option.setNoEditor, template: "<div style='padding:0px 4px;'>#:Set.Text?Set.Text:''#</div>" },
                            { width: "150px", field: "Style", title: "StyleNo", editor: option.styleNoEditor, template: "<div style='padding:0px 4px;'>#:Style.Text?Style.Text:''#</div>" },
                            { width: "100px", field: "Width", title: "Width", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:Width?Width:''#</div>" },
                            { width: "100px", field: "FabQuality", title: "FabQuality", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:FabQuality# </div>" },
                            { width: "100px", field: "ProdB", title: "A", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:ProdB# </div>" },
                            { width: "100px", field: "ProdC", title: "B+", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:ProdC# </div>" },
                            { width: "100px", field: "ProdG", title: "B", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:ProdG# </div>" },
                            { width: "100px", field: "CutPieece", title: "CutPieece", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:CutPieece# </div>" },
                            { width: "100px", field: "Wastage", title: "Wastage", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:Wastage# </div>" },
                            { width: "100px", field: "TotalRoll", title: "TotalRoll", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:TotalRoll# </div>" },
                            { width: "150px", field: "PType", title: "PType", editor: option.pTypeEditor, template: "<div style='padding:0px 4px;'>#:PType.Text?PType.Text:''# </div>" },
                            { width: "150px", field: "FinishMC", title: "FinishMCName", editor: option.fMCEditor, template: "<div style='padding:0px 4px;'>#:FinishMC.Text?FinishMC.Text:''# </div>" },
                            { width: "170px", field: "FType", title: "FType", editor: option.fTypeEditor, template: "<div style='padding:0px 4px;'>#:FType.Text?FType.Text:''# </div>" },
                            { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div style='padding:0px 4px;'>#:Remarks?Remarks:''# </div>" },

                        ]
                    };
                    option.dataSource = function () {
                        return new kendo.data.DataSource({
                            data: []
                        });
                    };
                    option.getEmptyModel = function () {
                        return {
                            DID: "",
                            ID: production.master.form.ID.val(),
                            Set: { Id: "", Text: "" },
                            Style: { Id: "", Text: "" },
                            Width: "",
                            FabQuality: "",
                            ProdB: "",
                            ProdC: "",
                            ProdG: "",
                            CutPieece: "",
                            Wastage: "",
                            TotalRoll: "",
                            PType: { Id: "", Text: "" },
                            FinishMC: { Id: "", Text: "" },
                            FType: { Id: "", Text: "" },
                            Remarks: "",
                        };
                    };
                    production.detail.production.grid.self = $("#ipdProductionGrid").kendoGrid({
                        sortable: false,
                        autoSync: true,
                        editable: {
                            createAt: 'bottom'
                        },
                        resizable: true,
                        selectable: "row",
                        columns: option.columns(),
                        dataSource: option.dataSource(),
                        save: function (e) {
                            window.setTimeout(function () {
                                production.detail.production.saveData(e.model, function (res) {
                                    e.model.DID = res.DID;
                                })
                            })
                        },
                        beforeEdit: function (e) {
                            console.log(production.master.form.ID.val())
                            if (production.master.form.ID.val()) {
                            } else {
                                e.preventDefault();
                                production.master.saveData(function (res) {
                                    if (res.SaveStatus == 'Success') {
                                        production.master.form.ID.val(res.ID);
                                        e.model.ID = res.ID;
                                    }
                                });
                            }
                        },
                        dataBound: function () {
                        }
                    }).data("kendoGrid");
                }
            }
        },
        opProduction: {
            saveData: function (model, onSuccess) {
                var postModel = {
                    DID: model.DID,
                    ID: production.master.form.ID.val(),
                    OCode: model.OName.Id,
                    OName: model.OName.Text,
                    CapName: model.Captain.Text,
                    CapCode: model.Captain.Id,
                    Desig: model.Desig,
                    AcProd: model.AcProd,
                    ReFinish: model.ReFinish,
                    ReInspection: model.ReInspection,
                    Sample: model.Sample,
                    QCCheque: model.QCCheque,
                    Hold: model.Hold,
                    CP: model.CP,
                    CutPeace: model.CutPeace,
                    GreyMending: model.GreyMending,
                    ShiftCode: model.Shift.Id,
                    Shift: model.Shift.Text,
                    STimeHr: model.STimeHr,
                    UName: model.UName,
                    EDate: model.EDate,
                    Remarks: model.Remarks,
                };
                production.service.saveInspectionOperatorProductionDetail(postModel, onSuccess);
            },
            grid: {
                self: {},
                setDataSource: function (masterID) {
                    production.detail.opProduction.grid.self.setDataSource(new kendo.data.DataSource({
                        type: "json",
                        serverFiltering: true,
                        transport: {
                            read: {
                                type: "POST",
                                dataType: "json",
                                url: "../InspectionProduction/GetOperatorProductionDetail?masterID=" + masterID,
                                dataType: "json",
                            },
                            parameterMap: function (options) {
                                return JSON.stringify(options);
                            }
                        },
                        schema: {
                            data: function (res) {
                                res.push({
                                    DID: "",
                                    ID: "",
                                    Shift: { Id: "", Text: "" },
                                    OName: { Id: "", Text: "" },
                                    Desig: "",
                                    Captain: { Id: "", Text: "" },
                                    AcProd: "",
                                    ReFinish: "",
                                    ReInspection: "",
                                    Sample: "",
                                    QCCheque: "",
                                    Hold: "",
                                    CP: "",
                                    CutPeace: "",
                                    STimeHr: "",
                                    GreyMending: "",
                                    Remarks: "",
                                });
                                return res;
                            },
                            model: {
                                fields: {
                                    //BDate: {
                                    //    type: "date",
                                    //    template: '#= kendo.toString("dd-MMM-yyyy") #',
                                    //    editable: false
                                    //},
                                }
                            }
                        }
                    }));
                },
                init: function () {
                    var option = {};
                    option.shiftData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../Common/GetShiftData/"
                            }
                        },
                        schema: {
                            data: function (res) {
                                for (var i = 0; i < res.length; i++) {
                                    res[i] = { Text: res[i].Shift, Id: res[i].ShiftNo }
                                }
                                console.log(res);
                                return res;
                            }
                        }
                    });
                    option.opData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllOperator"
                            }
                        }
                    });
                    option.capData = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "../InspectionProduction/GetAllCaptain"
                            }
                        }
                    });

                    option.shiftEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.shiftData,
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
                    option.opEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.opData,
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
                    option.capEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: option.capData,
                                template: "<div class='row' style='margin:0px;'><div class='col-md-8' style='padding:0px;'>#:Text#</div><div class='col-md-4'  style='padding:0px;'>#:Id#</div></div>",
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
                    option.setNoEditor = function (container, options) {
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
                                dataSource: option.setNoData,
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
                    option.ssNoEditor = function (container, options) {
                        var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                animation: false,
                                cascadeFrom: options.field + options.model.ID,
                                clearButton: false,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Id",
                                dataSource: {
                                    transport: {
                                        read: {
                                            url: "../BeamFinish/GetAllDyeingSSNo?setNo=" + options.model['SetNo'].Id,
                                        }
                                    }
                                },
                                change: function () {
                                    var dataItem = this.dataItem(this.selectedIndex);
                                    options.model.BeamNo = dataItem.BeamNo;
                                    option.updateCell(container.closest('.k-grid').data("kendoGrid"), container.next(), options.model);
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
                    };
                    option.textEditor = function (container, options) {
                        $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                            .on("focus", function () {
                                $(this).select();
                            })
                            .keydown(function (e) {
                                $(this).trigger("change");
                                var grid = container.closest('.k-grid').data("kendoGrid");
                                if (e.keyCode === 13) {
                                    if (container.next("td").length > 0) {
                                        container.next("td").click();
                                    } else if (container.closest("tr").next("tr").length > 0) {
                                        grid.select(container.closest("tr").next("tr"))
                                        container.closest("tr").next("tr").find("td").eq(0).click();
                                    } else {
                                        grid.dataSource.add({ Id: '', Name: "", Category: "", Category1: { id: null, text: "" }, Category2: { id: null, text: "" }, Category3: "", Category4: "", Category5: "", Category6: "", Category7: "", Category8: "", Category9: "", Category10: "", Status: '' });
                                        grid.select(grid.tbody.find("tr").last());
                                        grid.tbody.find("tr").last().find("td").eq(0).click();
                                    }
                                }
                            })
                            .appendTo(container);
                    };
                    option.remarkEditor = function (container, options) {
                        $('<input class="k-input k-textbox" name="' + options.field + '"/>')
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
                            })
                            .appendTo(container);
                    };
                    option.updateRow = function (grid, row) {
                        var dataItem = grid.dataItem(row);

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
                    option.columns = function () {
                        return [
                            { width: "30px", field: "", title: "", template: "<div style='padding:0px 0px;text-align: center;'><span class='glyphicon glyphicon-trash'></span></div>" },
                            { width: "100px", field: "Shift", title: "Shift", editor: option.shiftEditor, template: "<div style='padding:0px 4px;'>#:Shift.Text?Shift.Text:''#</div>" },
                            { width: "150px", field: "OName", title: "OName", editor: option.opEditor, template: "<div style='padding:0px 4px;'>#:OName.Text?OName.Text:''#</div>" },
                            { width: "100px", field: "Desig", title: "Desig", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:Desig# </div>" },
                            { width: "150px", field: "Captain", title: "CapName", editor: option.capEditor, template: "<div style='padding:0px 4px;'>#:Captain.Text?Captain.Text:''# </div>" },
                            { width: "100px", field: "AcProd", title: "AcProd", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:AcProd# </div>" },
                            { width: "100px", field: "ReFinish", title: "ReFinish", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:ReFinish# </div>" },
                            { width: "100px", field: "ReInspection", title: "ReInspection", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:ReInspection# </div>" },
                            { width: "100px", field: "Sample", title: "Sample", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:Sample# </div>" },
                            { width: "100px", field: "QCCheque", title: "QCCheque", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:QCCheque# </div>" },
                            { width: "100px", field: "Hold", title: "Hold", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:Hold# </div>" },
                            { width: "100px", field: "CP", title: "CP", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:CP# </div>" },
                            { width: "100px", field: "CutPeace", title: "CutPeace", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:CutPeace# </div>" },
                            { width: "100px", field: "STimeHr", title: "STimeHr", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:STimeHr# </div>" },
                            { width: "100px", field: "GreyMending", title: "GreyMending", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:GreyMending# </div>" },
                            { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div style='padding:0px 4px;'>#:Remarks?Remarks:''# </div>" },

                        ]
                    };
                    option.dataSource = function () {
                        return new kendo.data.DataSource({
                            data: []
                        });
                    };
                    option.getEmptyModel = function () {
                        return {
                            DID: "",
                            ID: "",
                            Shift: { Id: "", Text: "" },
                            OName: { Id: "", Text: "" },
                            Desig: "",
                            Captain: { Id: "", Text: "" },
                            AcProd: "",
                            ReFinish: "",
                            ReInspection: "",
                            Sample: "",
                            QCCheque: "",
                            Hold: "",
                            CP: "",
                            CutPeace: "",
                            STimeHr: "",
                            GreyMending: "",
                            Remarks: "",
                        };
                    };
                    production.detail.opProduction.grid.self = $("#ipdOPProductionGrid").kendoGrid({
                        sortable: false,
                        autoSync: true,
                        editable: {
                            createAt: 'bottom'
                        },
                        resizable: true,
                        selectable: "row",
                        columns: option.columns(),
                        dataSource: option.dataSource(),
                        save: function (e) {
                            window.setTimeout(function () {
                                console.log(e.model)
                                production.detail.opProduction.saveData(e.model, function (res) {
                                    e.model.DID = res.DID;
                                })
                            })
                        },
                        beforeEdit: function (e) {
                            if (production.master.form.ID.val()) {
                            } else {
                                e.preventDefault();
                                production.master.saveData(function (res) {
                                    if (res.SaveStatus == 'Success') {
                                        production.master.form.ID.val(res.ID);
                                        e.model.ID = res.ID;
                                    }
                                });
                            }
                        }
                    }).data("kendoGrid");
                }
            }
        },
        init: function () {
            $("#tabstrip").kendoTabStrip({
                animation: {
                    open: {
                        effects: "fadeIn"
                    }
                }
            });
            production.detail.production.grid.init();
            production.detail.opProduction.grid.init();
        }
    },
    init: function () {
        production.summary.init();
        production.master.init();
        production.detail.init();

    }
};
production.init();
