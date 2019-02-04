var bf = {
    service: {
        saveBeamFinishMaster: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                data: model,
                async: false,
                url: "../BeamFinish/SaveBeamFinish/",
                success: onSuccess,
                error: function (err) {
                    window.alert(err.statusText);
                }
            });
        },
        saveBeamFinishDetail: function (model, onSuccess) {
            $.ajax({
                type: "POST",
                data: model,
                async: false,
                url: "../BeamFinish/SaveBeamFinishDetail/",
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
                            url: "../BeamFinish/GetSummary?from=" + from + "&to=" + to,
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
                bf.summary.grid._self.setDataSource(bf.summary.grid.dataSource(from, to));
            },
            init: function (from, to) {
                bf.summary.grid._self = $("#summaryGrid").kendoGrid({
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
                            bf.master.setFormData(dataItem);
                            bf.detail.grid.setDataSource(dataItem.BID);
                            bf.summary.hide();
                            bf.detail.show();
                        });
                    },
                    columns: bf.summary.grid.columns(),
                    dataSource: bf.summary.grid.dataSource(from, to),
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
                    bf.summary.grid.setDataSource(_from, _to);
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
                    bf.summary.grid.setDataSource(_from, _to);
                });

            bf.summary.grid.init(kendo.toString(fromDate.value(), "dd-MMM-yyyy"), kendo.toString(toDate.value(), "dd-MMM-yyyy"));

            $('#ipsNew').bind("click", function () {
                bf.master.clearFormData();
                bf.detail.grid.setDataSource(new kendo.data.DataSource({
                    type: "json",
                    serverFiltering: true,
                    data: []
                }));
                bf.summary.hide();
                bf.detail.show();
            });
            $('#ipdClose').bind("click", function () {
                bf.detail.hide();
                bf.summary.show();
                $("#summaryGrid").data("kendoGrid").dataSource.read();
            })
        },
    },
    master: {
        form: {
            BID: $("#bfmID"),
            BDate: $("#bfmBDate"),
            UCode: $("#bfmUCode"),
            UName: $("#bfmUName"),
            Remarks: $("#bfmRemarks"),
        },
        getFormData: function () {
            return {
                BID: $("#bfmID").val(),
                BDate: $("#bfmBDate").data("kendoMaskedTextBox").value(),
                UCode: $("#bfmUCode").val(),
                UName: $("#bfmUName").data("kendoComboBox").text(),
                Remarks: $("#bfmRemarks").val(),
            }
        },
        setFormData: function (model) {
            $("#bfmID").val(model.BID)
            $("#bfmBDate").data("kendoMaskedTextBox").value(model.BDate)
            $("#bfmUCode").val(model.UCode)
            $("#bfmUName").data("kendoComboBox").value(model.UName)
            $("#bfmRemarks").val(model.Remarks)
        },
        clearFormData: function () {
            $("#bfmID").val('')
            $("#bfmBDate").data("kendoMaskedTextBox").value('')
            $("#bfmUCode").val('')
            $("#bfmUName").data("kendoComboBox").value('')
            $("#bfmRemarks").val('')
        },
        saveData: function (onSuccess) {
            var model = bf.master.getFormData();
            var date = kendo.parseDate(model.BDate, "dd-MM-yyyy");
            if (date) {
                model.BDate = date.toString("yyyy-MM-dd");
            }
            bf.service.saveBeamFinishMaster(model, onSuccess);
        },
        init: function () {
            bf.master.form.BDate.kendoMaskedTextBox({
                mask: "00-00-0000",
                change: function (e) {
                    console.log(e);
                    bf.master.saveData(function (res) {
                        bf.master.form.BID.val(res.BID);

                    })
                }
            });
            bf.master.form.BDate.keydown(function (e) {
                if (e.keyCode === 13) {
                    bf.master.form.UName.data("kendoComboBox").focus();
                    bf.master.form.UName.data("kendoComboBox").open();
                    bf.master.form.UName.data("kendoComboBox").input.select();
                }
            });
            bf.master.form.UName.kendoComboBox({
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
                        bf.master.form.UCode.val(this.value())
                    } else {
                        bf.master.form.UCode.val('')
                    }
                    bf.master.saveData(function (res) {
                        bf.master.form.BID.val(res.BID);
                    })
                }
            });
            bf.master.form.UName.data("kendoComboBox").input.keydown(function (e) {
                if (e.keyCode === 13) {
                    bf.master.form.Remarks.focus();
                    bf.master.form.Remarks.select();
                }
            });
            bf.master.form.Remarks.bind("change", function () {
                bf.master.saveData(function (res) {
                    bf.master.form.BID.val(res.BID);
                })
            })
            bf.master.clearFormData();
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
                            url: "../BeamFinish/GetDetails?masterID=" + masterID,
                            dataType: "json",
                        },
                        parameterMap: function (options) {
                            return JSON.stringify(options);
                        }
                    },
                    schema: {
                        data: function (res) {
                            res.push(bf.detail.getEmptyModel());
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
                bf.detail.grid._self.setDataSource(bf.detail.grid.getDataSource(masterID));
            }
        },
        show: function () {
            $("#ldtDetail").show();
        },
        hide: function () {
            $("#ldtDetail").hide();
        },
        getEmptyModel: function () {
            return {
                ID: 0,
                Loom: { Id: "", Text: "" },
                SetNo: { Id: "", Text: "" },
                SSNo: { Id: "", Text: "" },
                BeamNo: "",
                Remarks: ""
            };
        },
        saveData: function (model, onSuccess) {
            console.log(model)
            var postModel = {
                BIID: model.BIID,
                BID: bf.master.form.BID.val(),
                Loom: model.Loom.Text,
                SetNo: model.SetNo.Text,
                SS: model.SSNo.Text,
                BeamNo: model.BeamNo,
                Remarks: model.Remarks
            };
            bf.service.saveBeamFinishDetail(postModel, onSuccess);
        },
        init: function () {
            bf.master.init();
            var option = {};
            option.loomData = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../BeamFinish/GetAllLoom"
                    }
                }
            });
            option.setNoData = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../BeamFinish/GetAllDyeingSetNo"
                    }
                }
            });
            option.loomEditor = function (container, options) {
                var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        animation: false,
                        clearButton: false,
                        filter: "contains",
                        dataTextField: "Text",
                        dataValueField: "Id",
                        dataSource: option.loomData,
                    })
                    .data("kendoComboBox");
                editor.input.keydown(function (e) {
                    if (e.keyCode === 13) {
                        editor.trigger("change");
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
                        clearButton: false,
                        filter: "contains",
                        dataTextField: "Text",
                        dataValueField: "Id",
                        dataSource: option.setNoData,
                        dataBound: function () {

                        }
                    })
                    .data("kendoComboBox");
                editor.input.keydown(function (e) {
                    if (e.keyCode === 13) {
                        editor.trigger("change");
                        editor.value() && $(e.currentTarget).closest("td").next().click();
                    }
                });
                editor.input.on("focus", function (e) {
                    var el = $(e.currentTarget);
                    el.select();
                    editor.open();
                });
            };
            option.ssNoEditor = function (container, options) {
                var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        animation: false,
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
                editor.input.keydown(function (e) {
                    if (e.keyCode === 13) {
                        editor.trigger("change");
                        editor.value() && $(e.currentTarget).closest("td").next().click();
                    }
                });
                editor.input.on("focus", function (e) {
                    var el = $(e.currentTarget);
                    el.select();
                    editor.open();
                });
            };
            option.beamNoEditor = function (container, options) {

                $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                    .appendTo(container)
                    .on("focus", function () {
                        $(this).select();
                    })
                    .keyup(function () {
                        $(this).trigger("change");
                    })
                    .keydown(function (e) {
                        var grid = container.closest('.k-grid').data("kendoGrid");
                        if (e.keyCode === 13) {
                            if (container.next("td").length > 0) {
                                container.next("td").click();
                            }
                        }
                    });
                ;
            };
            option.remarkEditor = function (container, options) {
                $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                    .appendTo(container)
                    .on("focus", function () {
                        $(this).select();
                    })
                    .keyup(function () {
                        $(this).trigger("change");
                    })
                    .keydown(function (e) {
                        var grid = container.closest('.k-grid').data("kendoGrid");
                        if (e.keyCode === 13) {
                            $(this).trigger("change");
                            if (container.closest("tr").next("tr").length > 0) {
                                grid.select(container.closest("tr").next("tr"));
                                container.closest("tr").next("tr").find("td").eq(3).click();
                            } else {
                                grid.dataSource.add(bf.detail.getEmptyModel());
                                grid.select(grid.tbody.find("tr").last());
                                grid.tbody.find("tr").last().find("td").eq(3).click();
                            }
                        }
                    });
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
                    { width: "100px", field: "Loom", title: "LoomNo", editor: option.loomEditor, template: "<div style='padding:0px 4px;'>#:Loom.Text?Loom.Text:''#</div>" },
                    { width: "100px", field: "SetNo", title: "SetNo", editor: option.setNoEditor, template: "<div style='padding:0px 4px;'>#:SetNo.Text?SetNo.Text:''#</div>" },
                    { width: "100px", field: "SSNo", title: "SS", editor: option.ssNoEditor, template: "<div style='padding:0px 4px;'>#:SSNo.Text?SSNo.Text:''#</div>" },
                    { width: "100px", field: "BeamNo", title: "BeamNo", editor: option.beamNoEditor, template: "<div style='padding:0px 4px;'>#:BeamNo# </div>" },
                    { field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div style='padding:0px 4px;'>#:Remarks?Remarks:''# </div>" },

                ]
            };
            bf.detail.grid._self = $("#grid").kendoGrid({
                sortable: false,
                autoSync: true,
                editable: {
                    createAt: 'bottom'
                },
                resizable: true,
                selectable: "row",
                columns: option.columns(),
                dataSource: bf.detail.grid.getDataSource(''),
                save: function (e) {
                    window.setTimeout(function () {
                        bf.detail.saveData(e.model, function (res) {
                            e.model.BIID = res.BIID;
                        })
                    });
                },
                beforeEdit: function (e) {
                    var masterID = bf.master.form.BID.val();
                    if (!masterID) {
                        e.preventDefault();
                        bf.master.saveData(function (res) {
                            e.model.BID = res.BID;
                            if (res.BID) {
                                bf.master.form.BID.val(res.BID);
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
        bf.summary.init();
        bf.master.init();
        bf.detail.init();
    }
};
bf.init();