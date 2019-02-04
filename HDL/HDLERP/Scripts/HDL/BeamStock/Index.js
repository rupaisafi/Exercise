var bs = {
    service: {
        saveBeamStockMaster: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                data: model,
                async: false,
                url: "../BeamStock/SaveBeamStock/",
                success: onSuccess,
                error: function (err) {
                    window.alert(err.statusText);
                }
            });
        },
        saveBeamStockDetail: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                data: model,
                async: false,
                url: "../BeamStock/SaveBeamStockDetail/",
                success: onSuccess,
                dataType: "json",
                error: function (err) {
                    window.alert(err.statusText);
                }
            });
        }
    },
    summary: {
        grid: {
            _self: {},
            columns: function () {
                return [
                    { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>' },
                    { width: "50", field: "BID", title: "ID", template: "<div style='padding:0px 4px;'>#:BID#</div>" },
                    { width: "50", field: "BDate", title: "Date", template: "", template: "<div style='padding:0px 4px;'>#:kendo.toString(BDate,'dd-MMM-yyyy')#</div>" },
                    //{ width: "50", field: "DCode", title: "DeptCode", template: "<div style='padding:0px 4px;'>#:DCode?DCode:''#</div>" },
                    //{ width: "50", field: "DName", title: "DeptName", template: "<div style='padding:0px 4px;'>#:DName?DName:''#</div>" },
                    { width: "50", field: "UCode", title: "UnitCode", template: "<div style='padding:0px 4px;'>#:UCode?UCode:''#</div>" },
                    { width: "50", field: "UName", title: "UnitName", template: "<div style='padding:0px 4px;'>#:UName?UName:''#</div>" },
                    { width: "50", field: "Remarks", title: "Remarks", template: "<div style='padding:0px 4px;'>#:Remarks?Remarks:''#</div>" },
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
                            url: "../BeamStock/GetSummary?from=" + from + "&to=" + to,
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
                                BDate: {
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
                bs.summary.grid._self.setDataSource(bs.summary.grid.dataSource(from, to));
            },
            init: function (from, to) {
                bs.summary.grid._self = $("#summaryGrid").kendoGrid({
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
                            bs.master.setFormData(dataItem);
                            bs.detail.grid.setDataSource(dataItem.BID);
                            bs.summary.hide();
                            bs.detail.show();
                        });
                    },
                    columns: bs.summary.grid.columns(),
                    dataSource: bs.summary.grid.dataSource(from, to),
                }).data("kendoGrid");
            },
        },
        show: function () {
            $(".divSummaryWraper").show();
        },
        hide: function () {
            $(".divSummaryWraper").hide();
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
                    bs.summary.grid.setDataSource(_from, _to);
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
                    bs.summary.grid.setDataSource(_from, _to);
                });

            bs.summary.grid.init(kendo.toString(fromDate.value(), "dd-MMM-yyyy"), kendo.toString(toDate.value(), "dd-MMM-yyyy"));

            $('#ssNew').bind("click", function () {
                bs.master.clearFormData();
                bs.detail.grid.setDataSource(new kendo.data.DataSource({
                    type: "json",
                    serverFiltering: true,
                    data: []
                }));
                bs.summary.hide();
                bs.detail.show();
            });
            $('#bsdClose').bind("click", function () {
                bs.detail.hide();
                bs.summary.show();
                bs.master.clearFormData();
                bs.detail.grid.setDataSource('');
                $("#summaryGrid").data("kendoGrid").dataSource.read();
            })
        },
    },
    master: {
        form: {
            BID: $("#bsdID"),
            BDate: $("#bsdBDate"),
            UCode: $("#bsdUCode"),
            UName: $("#bsdUName"),
            DCode: $("#bsdDCode"),
            DName: $("#bsdDName"),
            Remarks: $("#bsdRemarks"),
        },
        getFormData: function () {
            return {
                BID: bs.master.form.BID.val(),
                BDate: bs.master.form.BDate.data("kendoMaskedTextBox").value(),
                DCode: bs.master.form.DCode.val(),
                UCode: bs.master.form.UCode.val(),
                DName: bs.master.form.DName.data("kendoComboBox").text(),
                UName: bs.master.form.UName.data("kendoComboBox").text(),
                Remarks: bs.master.form.Remarks.val(),
            }
        },
        setFormData: function (model) {
            bs.master.form.BID.val(model.BID)
            bs.master.form.BDate.data("kendoMaskedTextBox").value(model.BDate.toString("dd/MM/yyyy"))
            bs.master.form.UCode.val(model.UCode)
            bs.master.form.UName.data("kendoComboBox").value(model.UName)
            bs.master.form.DCode.val(model.DCode)
            bs.master.form.DName.data("kendoComboBox").value(model.DName)
            bs.master.form.Remarks.val(model.Remarks)
        },
        clearFormData: function () {
            var model = {
                BID: '',
                BDate: '',
                UCode: '',
                UName: '',
                DCode: '',
                DName: '',
                Remarks: '',
            }
            bs.master.form.BID.val(model.BID)
            bs.master.form.BDate.data("kendoMaskedTextBox").value(model.BDate)
            bs.master.form.UCode.val(model.UCode)
            bs.master.form.UName.data("kendoComboBox").value(model.UName)
            bs.master.form.DCode.val(model.DCode)
            bs.master.form.DName.data("kendoComboBox").value(model.DName)
            bs.master.form.Remarks.val(model.Remarks)
        },
        saveData: function (onSuccess) {
            var model = bs.master.getFormData();
            var date = kendo.parseDate(model.BDate, "dd/MM/yyyy");
            if (date) {
                model.BDate = date.toString("yyyy/MM/dd");
            } else {
                return;
            }
            bs.service.saveBeamStockMaster(model, onSuccess);
        },
        init: function () {
            bs.master.form.BDate.kendoMaskedTextBox({
                mask: "00/00/0000",
                change: function (e) {
                    console.log(e);
                    bs.master.saveData(function (res) {
                        bs.master.form.BID.val(res.BID);

                    })
                }
            });
            bs.master.form.BDate.keydown(function (e) {
                if (e.keyCode === 13) {
                    bs.master.form.DName.data("kendoComboBox").focus();
                    bs.master.form.DName.data("kendoComboBox").open();
                    bs.master.form.DName.data("kendoComboBox").input.select();
                }
            });
            bs.master.form.DName.kendoComboBox({
                animation: false,
                filter: "contains",
                clearButton: false,
                dataTextField: "Text",
                dataValueField: "Id",
                dataSource: {
                    transport: {
                        read: {
                            url: "../BeamStock/GetAllDepartment/"
                        }
                    }
                },
                change: function () {
                    if (this.value()) {
                        bs.master.form.DCode.val(this.value())
                    } else {
                        bs.master.form.DCode.val('')
                    }
                    bs.master.saveData(function (res) {
                        bs.master.form.BID.val(res.BID);
                    })
                }
            });
            bs.master.form.DName.data("kendoComboBox").input.keydown(function (e) {
                if (e.keyCode === 13) {
                    bs.master.form.UName.data("kendoComboBox").focus();
                    bs.master.form.UName.data("kendoComboBox").open();
                    bs.master.form.UName.data("kendoComboBox").input.select();
                }
            });
            bs.master.form.UName.kendoComboBox({
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
                        bs.master.form.UCode.val(this.value())
                    } else {
                        bs.master.form.UCode.val('')
                    }
                    bs.master.saveData(function (res) {
                        bs.master.form.BID.val(res.BID);
                    })
                }
            });
            bs.master.form.UName.data("kendoComboBox").input.keydown(function (e) {
                if (e.keyCode === 13) {
                    bs.master.form.Remarks.focus();
                    bs.master.form.Remarks.select();
                }
            });
            bs.master.form.Remarks.bind("change", function () {
                bs.master.saveData(function (res) {
                    bs.master.form.BID.val(res.BID);
                })
            });
            bs.master.form.Remarks.bind("keypress", function (e) {
                if (e.keyCode === 13) {
                    bs.detail.grid._self.tbody.find("tr").eq(0).find("td").eq(3).click()
                }
            });
            bs.master.clearFormData();
        }
    },
    detail: {
        grid: {
            _self: {},
            getDataSource: function (masterID) {
                return new kendo.data.DataSource({
                    type: "json",
                    serverFiltering: true,
                    transport: {
                        read: {
                            type: "POST",
                            dataType: "json",
                            url: "../BeamStock/GetDetails?masterID=" + masterID,
                            dataType: "json",
                        },
                        parameterMap: function (options) {
                            return JSON.stringify(options);
                        }
                    },
                    schema: {
                        data: function (res) {
                            res.push(bs.detail.getEmptyModel());
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
                })
            },
            setDataSource: function (masterID) {
                bs.detail.grid._self.setDataSource(bs.detail.grid.getDataSource(masterID));
            }
        },
        show: function () {
            $(".divDetailWraper").show();
        },
        hide: function () {
            $(".divDetailWraper").hide();
        },
        getEmptyModel: function () {
            return {
                BIID: 0,
                BID: 0,
                SetNo: { Id: "", Text: "" },
                BeamNo: '',
                StyleNo: { Id: "", Text: "" },
                StockDays: "",
                PDate: "",
                PType: { Id: "", Text: "" },
                Remarks: ""
            };
        },
        saveData: function (model, onSuccess) {
            console.log(model)
            var postModel = {
                BIID: model.BIID,
                BID: bs.master.form.BID.val(),
                SetNo: model.SetNo.Text,
                StyleNo: model.StyleNo.Text,
                StyleCode: model.StyleNo.Id,
                StockDays: model.StockDays,
                PDate: model.PDate,
                PType: model.PType.Text,
                PCode: model.PType.Id,
                BeamNo: model.BeamNo,
                Remarks: model.Remarks
            };
            bs.service.saveBeamStockDetail(postModel, onSuccess);
        },
        init: function () {
            bs.master.init();
            var option = {};
            option.setNoData = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../BeamStock/GetAllSetNo/"
                    }
                }
            });
            option.styleNoData = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../InspectionProduction/GetAllStyleNo/"
                    }
                },
                schema: {
                    data: function (res) {
                        return res;
                    }
                }
            });
            option.pTypeData = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../BeamStock/GetAllProductionType/"
                    }
                }
            });
            option.setNoEditor = function (container, options) {
                var editor = $('<input name="' + options.field + '" style="height:22px;"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        suggest: true,
                        animation: false,
                        filter: "contains",
                        clearButton: false,
                        dataTextField: "Text",
                        dataValueField: "Id",
                        dataSource: option.setNoData,
                        change: function () {
                            var item = this.dataItem();
                            options.model.StyleNo.Id = item.StyleCode;
                            options.model.StyleNo.Text = item.StyleNo;
                            options.model.PType.Id = item.PTCode;
                            options.model.PType.Text = item.PType;
                            options.model.StockDays = item.StockDays;
                            option.updateCell(container.closest(".k-grid").data("kendoGrid"), container.parent().find("td").eq(5), options.model);
                            option.updateCell(container.closest(".k-grid").data("kendoGrid"), container.parent().find("td").eq(6), options.model);
                            option.updateCell(container.closest(".k-grid").data("kendoGrid"), container.parent().find("td").eq(8), options.model);
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
                        suggest: true,
                        animation: false,
                        clearButton: false,
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
            option.pDateEditor = function (container, options) {
                $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                    .on("focus", function () {
                        $(this).select();
                    })
                    .keydown(function (e) {
                        var editor = $(this).data("kendoMaskedTextBox");
                        editor.trigger("change");
                        var grid = container.closest('.k-grid').data("kendoGrid");
                        if (e.keyCode === 13) {
                            var date = editor.value();
                            console.log(date);
                            if (kendo.parseDate(date, "dd/MM/yyyy")) {
                                if (container.next("td").length > 0) {
                                    container.next("td").click();
                                }
                            }
                        }
                    })
                    .appendTo(container)
                    .kendoMaskedTextBox({
                        mask: "00/00/0000"
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
                                container.closest("tr").next("tr").find("td").eq(3).click();
                            } else {
                                grid.dataSource.add(bs.detail.getEmptyModel());
                                grid.select(grid.tbody.find("tr").last());
                                grid.tbody.find("tr").last().find("td").eq(3).click();
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
                    { field: "ID", title: "ID", hidden: true },
                    { field: "BID", title: "BID", hidden: true },
                    { field: "SetNo", title: "SetNo", editor: option.setNoEditor, template: "<div style='padding:0px 4px;'>#:SetNo.Text?SetNo.Text:''#</div>" },
                    { field: "BeamNo", title: "BeamNo", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:BeamNo?BeamNo:''#</div>" },
                    { field: "StyleNo", title: "StyleNo", editor: option.styleNoEditor, template: "<div style='padding:0px 4px;'>#:StyleNo.Text?StyleNo.Text:''#</div>" },
                    { field: "StockDays", title: "StockDays", editor: option.textEditor, template: "<div style='padding:0px 4px;'>#:StockDays# </div>" },
                    { field: "PDate", title: "PDate", editor: option.pDateEditor, template: "<div style='padding:0px 4px;'>#:PDate# </div>" },
                    { field: "PType", title: "PType", editor: option.pTypeEditor, template: "<div style='padding:0px 4px;'>#:PType.Text?PType.Text:''# </div>" },
                    { field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div style='padding:0px 4px;'>#:Remarks?Remarks:''# </div>" },

                ]
            };
            bs.detail.grid._self = $("#bsDetailGrid").kendoGrid({
                sortable: false,
                autoSync: true,
                editable: {
                    createAt: 'bottom'
                },
                resizable: true,
                selectable: "row",
                columns: option.columns(),
                dataSource: bs.detail.grid.getDataSource(''),
                save: function (e) {
                    window.setTimeout(function () {
                        bs.detail.saveData(e.model, function (res) {
                            e.model.BIID = res.BIID;
                        })
                    });
                },
                beforeEdit: function (e) {
                    var masterID = bs.master.form.BID.val();
                    if (!masterID) {
                        e.preventDefault();
                        bs.master.saveData(function (res) {
                            e.model.BID = res.BID;
                            if (res.BID) {
                                bs.master.form.BID.val(res.BID);
                            }
                        })
                    }
                },
                dataBound: function () {
                }
            }).data("kendoGrid");
        }
    },
    init: function () {
        bs.summary.init();
        bs.master.init();
        bs.detail.init();
    }
};
bs.init();



