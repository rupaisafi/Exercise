$(function () {
    var rejectionControl = {
        service: {
            saveWarpingDetail: function (model, onSuccess) {
                $.ajax({
                    type: "POST",
                    url: "../RejectionControl/SaveWarpingDetail/",
                    data: model,
                    success: onSuccess,
                    error: function (err) {
                        window.alert(err.statusText);
                    }
                })
            },
            saveDyeingDetail: function (model, onSuccess) {
                $.ajax({
                    type: "POST",
                    url: "../RejectionControl/SaveDyeingDetail/",
                    data: model,
                    success: onSuccess,
                    error: function (err) {
                        window.alert(err.statusText);
                    }
                })
            },
            saveWeavingDetail: function (model, onSuccess) {
                $.ajax({
                    type: "POST",
                    url: "../RejectionControl/SaveWeavingDetail/",
                    data: model,
                    success: onSuccess,
                    error: function (err) {
                        window.alert(err.statusText);
                    }
                })
            },
            saveFinishingDetail: function (model, onSuccess) {
                $.ajax({
                    type: "POST",
                    url: "../RejectionControl/SaveFinishingDetail/",
                    data: model,
                    success: onSuccess,
                    error: function (err) {
                        window.alert(err.statusText);
                    }
                })
            },
            saveDyeStopRopeDetail: function (model, onSuccess) {
                $.ajax({
                    type: "POST",
                    url: "../RejectionControl/SaveDyeStopRopeDetail/",
                    data: model,
                    success: onSuccess,
                    error: function (err) {
                        window.alert(err.statusText);
                    }
                })
            },
            saveInspectionMaster: function (model, onSuccess) {
                $.ajax({
                    type: "POST",
                    url: "../RejectionControl/SaveInspectionFaultMaster/",
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
                        { width: "30px", field: "", title: "", filterable: false, template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>' },
                        { field: "ID", title: "IDNo", template: "<div style='padding:0px 4px;'>#:ID#</div>" },
                        { field: "SDate", title: "Date", template: "", template: "<div style='padding:0px 4px;'>#:kendo.toString(SDate,'dd-MMM-yyyy')#</div>" },
                        { field: "UName", title: "Unit", template: "<div style='padding:0px 4px;'>#:UName#</div>" },
                        { field: "InsFloorName", title: "Inspection Floor", template: "<div style='padding:0px 4px;'>#:InsFloorName#</div>" },
                        { field: "Ref", title: "Reference", template: "<div style='padding:0px 4px;'>#:Ref?Ref:''#</div>" },
                        { field: "TotalProd", title: "Total Production", template: "<div style='padding:0px 4px;'>#:TotalProd?TotalProd:''#</div>" },
                        { field: "Rejection", title: "Rejection", template: "<div style='padding:0px 4px;'>#:Rejection?Rejection:''#</div>" },
                        { field: "CutPice", title: "CutPiece", template: "<div style='padding:0px 4px;'>#:CutPice?CutPice:''#</div>" },
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
                                url: "../RejectionControl/GetSummary?fromDate=" + from + "&toDate=" + to,
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
                    rejectionControl.summary.grid._self.setDataSource(rejectionControl.summary.grid.dataSource(from, to));
                },
                init: function (from, to) {
                    rejectionControl.summary.grid._self = $("#summaryGrid").kendoGrid({
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
                                rejectionControl.master.setFormData(dataItem);
                                rejectionControl.detail.warping.grid.setDataSource(dataItem.ID);
                                rejectionControl.detail.dyeing.grid.setDataSource(dataItem.ID);
                                rejectionControl.detail.weaving.grid.setDataSource(dataItem.ID);
                                rejectionControl.detail.finishing.grid.setDataSource(dataItem.ID);
                                rejectionControl.detail.dyeStopRope.grid.setDataSource(dataItem.ID);
                                rejectionControl.summary.hide();
                                rejectionControl.master.show();
                            });
                        },
                        columns: rejectionControl.summary.grid.columns(),
                        dataSource: rejectionControl.summary.grid.dataSource(from, to),
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
                var toDate = $("#toDate").kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(date.getFullYear(), date.getMonth() + 1, 0)
                }).data("kendoDatePicker");
                var fromDate = $("#fromDate").kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(date.getFullYear(), date.getMonth(), 1)
                }).data("kendoDatePicker");
                toDate.bind("change", function () {
                    var _from = kendo.toString(fromDate.value(), "dd-MMM-yyyy");
                    var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                    rejectionControl.summary.grid.setDataSource(_from, _to);
                });
                fromDate.bind("change", function () {
                    var _from = kendo.toString(fromDate.value(), "dd-MMM-yyyy");
                    var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                    rejectionControl.summary.grid.setDataSource(_from, _to);
                });
                rejectionControl.summary.grid.init(kendo.toString(fromDate.value(), "dd-MMM-yyyy"), kendo.toString(toDate.value(), "dd-MMM-yyyy"));
                $('#ipsNew').bind("click", function () {
                    rejectionControl.master.clearFormData();
                    rejectionControl.detail.warping.grid.setDataSource('');
                    rejectionControl.detail.dyeing.grid.setDataSource('');
                    rejectionControl.detail.weaving.grid.setDataSource('');
                    rejectionControl.detail.finishing.grid.setDataSource('');
                    rejectionControl.detail.dyeStopRope.grid.setDataSource('');
                    rejectionControl.summary.hide();
                    rejectionControl.master.show();
                })
                $('.btn-data-entry-close').bind("click", function () {
                    rejectionControl.summary.show();
                    rejectionControl.master.hide();
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
            getFormData: function () {
                var SDate = kendo.parseDate(rejectionControl.master.form.SDate.data("kendoMaskedTextBox").value(), "dd-MM-yyyy");
                if (SDate) {
                    SDate = SDate.toString("yyyy-MM-dd");
                }
                return {
                    ID: rejectionControl.master.form.ID.val(),
                    SDate: SDate,
                    UCode: rejectionControl.master.form.UCode.val(),
                    UName: rejectionControl.master.form.UName.data("kendoComboBox").text(),
                    InsFloorCode: rejectionControl.master.form.InsFloorCode.val(),
                    InsFloorName: rejectionControl.master.form.InsFloorName.data("kendoComboBox").text(),
                    TotalProd: rejectionControl.master.form.TotalProd.val()
                }
            },
            setFormData: function (model) {
                rejectionControl.master.form.ID.val(model.ID)
                rejectionControl.master.form.SDate.data("kendoMaskedTextBox").value(model.SDate)
                rejectionControl.master.form.UName.data("kendoComboBox").value(model.UName)
                rejectionControl.master.form.UCode.val(model.UCode)
                rejectionControl.master.form.TotalProd.val(model.TotalProd)
                rejectionControl.master.form.InsFloorName.data("kendoComboBox").value(model.InsFloorName)
                rejectionControl.master.form.InsFloorCode.val(model.InsFloorCode)
            },
            clearFormData: function () {
                rejectionControl.master.form.ID.val('')
                rejectionControl.master.form.SDate.data("kendoMaskedTextBox").value('')
                rejectionControl.master.form.UName.data("kendoComboBox").value('')
                rejectionControl.master.form.UCode.val('')
                rejectionControl.master.form.TotalProd.val('')
                rejectionControl.master.form.InsFloorName.data("kendoComboBox").value('')
                rejectionControl.master.form.InsFloorCode.val('')
            },
            saveData: function (onSuccess) {
                var model = rejectionControl.master.getFormData();
                rejectionControl.service.saveInspectionMaster(model, onSuccess);
            },
            init: function () {
                rejectionControl.master.form.SDate.kendoMaskedTextBox({
                    mask: "00-00-0000",
                });
                rejectionControl.master.form.SDate.keydown(function (e) {
                    if (e.keyCode === 13) {
                        rejectionControl.master.form.UName.data("kendoComboBox").focus();
                        rejectionControl.master.form.UName.data("kendoComboBox").open();
                        rejectionControl.master.form.UName.data("kendoComboBox").input.select();
                    }
                });
                rejectionControl.master.form.UName.kendoComboBox({
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
                            rejectionControl.master.form.UCode.val(this.value())
                        } else {
                            rejectionControl.master.form.UCode.val('')
                        }
                    }
                });
                rejectionControl.master.form.UName.data("kendoComboBox").input.keydown(function (e) {
                    if (e.keyCode === 13) {
                        rejectionControl.master.form.InsFloorName.data("kendoComboBox").focus();
                        rejectionControl.master.form.InsFloorName.data("kendoComboBox").open();
                        rejectionControl.master.form.InsFloorName.data("kendoComboBox").input.select();
                    }
                });
                rejectionControl.master.form.InsFloorName.kendoComboBox({
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
                            rejectionControl.master.form.InsFloorCode.val(this.value())
                        } else {
                            rejectionControl.master.form.InsFloorCode.val('')
                        }
                    }
                });
                rejectionControl.master.form.InsFloorName.data("kendoComboBox").input.keydown(function (e) {
                    if (e.keyCode === 13) {
                        rejectionControl.master.form.TotalProd.focus();
                        rejectionControl.master.form.TotalProd.select();
                    }
                });
                rejectionControl.master.form.TotalProd.keydown(function (e) {
                    if (e.keyCode === 13) {
                        //rejectionControl.master.form.UName.data("kendoComboBox").focus();
                        //rejectionControl.master.form.UName.data("kendoComboBox").open();
                        //rejectionControl.master.form.UName.data("kendoComboBox").input.select();
                    }
                });
                rejectionControl.master.clearFormData();
            }
        },
        detail: {
            warping: {
                getEmptyModel: function () {
                    var model = {
                        DID: "555",
                        ID: "555",
                        StyleCode: "555",
                        StyleNo: "555",
                        Weight: "555",
                        Constraction: "555",
                        Weave: "555",
                        Colour: "555",
                        Width: "555",
                        Prod: "555",
                        Remarks: "555",
                        CCode: "555",
                        CName: "555",
                        TotalRoll: "555",
                        TotalPoint: "555",
                        SetNo: "555",
                        SS: "555",
                        Loom: "555",
                        Beam: "555",
                        ProdB: "555",
                        ProdC: "555",
                        CutPieece: "555",
                        Wastage: "555",
                        ProdG: "555",
                        TotalProd: "555",
                        FCode: "555",
                        FType: "555",
                        DCode: "555",
                        DName: "555",
                        OName: "555",
                        OCode: "555",
                        POName: "555",
                        POCode: "555",
                        SzCode: "555",
                        SzName: "555",
                        CaptainName: "555",
                        CaptainCode: "555",
                        WeavDate: "555",
                        ShiftCode: "555",
                        ShiftName: "555",
                        UserName: "555",
                        EDate: "555",
                        LineManName: "555",
                        LineManCode: "555",
                        SuperVisorName: "555",
                        SuperVisorejectionControlode: "555",
                        FitterName: "555",
                        FitterejectionControlode: "555",
                        OPNo: "555",
                        WarpTotalQnty: "555",
                        InFitterName: "555",
                        InFitterejectionControlode: "555",
                        SCode: "555",
                        SName: "555",
                        LotNo: "555",
                        UCode: "555",
                        UName: "555",
                        FMCCode: "555",
                        FMCName: "555",
                        FOPName: "555",
                        FOPID: "555"
                    };
                    return [model, model, model, model, model];
                    return model;

                },
                saveData: function (model, onSuccess) {
                    if (model.ID) {
                        var postModel = {
                            ID: rejectionControl.master.form.ID.val(),
                            DID: model.DID,
                            StyleNo: model.StyleNo.Text,
                            StyleCode: model.StyleNo.Id,
                            SetNo: model.SetNo,
                            SS: model.SS,
                            Beam: model.Beam,
                            Loom: model.Loom.Text,
                            FType: model.FType.Text,
                            FCode: model.FType.Id,
                            OCode: model.OName.Id,
                            OName: model.OName.Text,
                            CaptainCode: model.Captain.Id,
                            CaptainName: model.Captain.Text,
                            OPNo: model.OPNo,
                            WarpTotalQnty: model.WarpTotalQnty,
                            ProdB: model.ProdB,
                            ProdC: model.ProdC,
                            ProdG: model.ProdG,
                            CutPieece: model.CutPieece,
                            Wastage: model.Wastage,
                            Remarks: model.Remarks
                        };
                        rejectionControl.service.saveWarpingDetail(postModel, onSuccess);
                    }
                },
                grid: {
                    setDataSource: function (masterId) {
                        $("#ircdWarpingGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                            type: "json",
                            serverFiltering: true,
                            transport: {
                                read: {
                                    type: "POST",
                                    dataType: "json",
                                    url: "../RejectionControl/GetWarpingDetail?masterID=" + masterId,
                                    dataType: "json",
                                },
                                parameterMap: function (options) {
                                    return JSON.stringify(options);
                                }
                            },
                            schema: {
                                data: function (res) {
                                    res.push({
                                        DID: '',
                                        ID: rejectionControl.master.form.ID.val(),
                                        StyleNo: { Id: '', Text: '' },
                                        SetNo: '',
                                        SS: '',
                                        Beam: '',
                                        Loom: { Id: '', Text: '' },
                                        FType: { Id: '', Text: '' },
                                        OName: { Id: '', Text: '' },
                                        Captain: { Id: '', Text: '' },
                                        OPNo: '',
                                        WarpTotalQnty: '',
                                        ProdB: '',
                                        ProdC: '',
                                        ProdG: '',
                                        CutPieece: '',
                                        Wastage: '',
                                        Remarks: ''
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
                        }))
                    },
                    init: function () {
                        var option = {};
                        option.styleNoData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../StyleInfo/GetAllStyle/"
                                }
                            },
                            schema: {
                                data: function (res) {
                                    var data = [];
                                    for (var i = 0; i < res.length; i++) {
                                        data.push({ Id: res[i].StyleCode, Text: res[i].StyleNo });
                                    }
                                    return data;
                                }
                            }

                        });
                        option.loomData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllLoom/"
                                }
                            }
                        });
                        option.faultTypeData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllWarpingFaultType/"
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
                        option.styleNoEditor = function (container, options) {
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    suggest: true,
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.styleNoData,
                                    change: function () {
                                        if (this.value() && this.selectedIndex == -1) {
                                            this.dataSource.filter({
                                                value: this.value(),
                                                field: this.options.dataTextField,
                                                operator: "contains"
                                            });
                                            this.select(0);
                                            if (this.selectedIndex == -1) {
                                                this.text("");
                                            }
                                        }
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.faultTypeData,
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
                        option.operatorEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllOperator?setNo=" + options.model.SetNo
                                            }
                                        },
                                    },
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
                        option.captainEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllCaptain?setNo=" + options.model.SetNo
                                            }
                                        },
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
                        option.beamNoEditor = function (container, options) {

                            $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                                .on("focus", function () {
                                    $(this).select();
                                })
                                .keydown(function (e) {
                                    var grid = container.closest('.k-grid').data("kendoGrid");
                                    if (e.keyCode === 13) {
                                        $(this).trigger("change");
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
                                { width: "30px", field: "", title: "", template: "<div style='padding:0px 0px;text-align: center;'><span class='glyphicon glyphicon-edit'></span></div>" },
                                { width: "150px", field: "StyleNo", title: "StyleNo", editor: option.styleNoEditor, template: "<div class='ce-cell'>#:StyleNo.Text?StyleNo.Text:''# </div>" },
                                { width: "100px", field: "SetNo", title: "SetNo", editor: option.textEditor, template: "<div class='ce-cell'>#:SetNo?SetNo:''# </div>" },
                                { width: "100px", field: "SS", title: "SS", editor: option.textEditor, template: "<div class='ce-cell'>#:SS?SS:''# </div>" },
                                { width: "100px", field: "Beam", title: "Beam", editor: option.textEditor, template: "<div class='ce-cell'>#:Beam?Beam:''# </div>" },
                                { width: "100px", field: "Loom", title: "Loom", editor: option.loomEditor, template: "<div class='ce-cell'>#:Loom.Text?Loom.Text:''# </div>" },
                                { width: "150px", field: "FType", title: "FType", editor: option.fTypeEditor, template: "<div class='ce-cell'>#:FType.Text?FType.Text:''# </div>" },
                                { width: "100px", field: "OName", title: "OName", editor: option.operatorEditor, template: "<div class='ce-cell'>#:OName.Text?OName.Text:''# </div>" },
                                { width: "100px", field: "Captain", title: "CaptainName", editor: option.captainEditor, template: "<div class='ce-cell'>#:Captain.Text?Captain.Text:''# </div>" },
                                { width: "100px", field: "OPNo", title: "OPNo", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:OPNo?OPNo:''# </div>" },
                                { width: "100px", field: "WarpTotalQnty", title: "WarpTotalQnty", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:WarpTotalQnty?WarpTotalQnty:''# </div>" },
                                { width: "100px", field: "ProdB", title: "A", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:ProdB?ProdB:''# </div>" },
                                { width: "100px", field: "ProdC", title: "B", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:ProdC?ProdC:''# </div>" },
                                { width: "100px", field: "ProdG", title: "C", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:ProdG?ProdG:''# </div>" },
                                { width: "100px", field: "CutPieece", title: "CutPieece", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:CutPieece?CutPieece:''# </div>" },
                                { width: "100px", field: "Wastage", title: "Wastage", editor: option.beamNoEditor, template: "<div class='ce-cell'>#:Wastage?Wastage:''# </div>" },
                                { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div class='ce-cell'>#:Remarks?Remarks:''# </div>" },
                            ]
                        };
                        option.dataSource = function () {
                            return new kendo.data.DataSource({
                                type: "json",
                                serverFiltering: true,
                                data: []
                            });
                        };
                        option.getEmptyModel = function () {
                            return {
                                DID: '',
                                ID: rejectionControl.master.form.ID.val(),
                                StyleNo: { Id: '', Text: '' },
                                SetNo: '',
                                SS: '',
                                Beam: '',
                                Loom: { Id: '', Text: '' },
                                FType: { Id: '', Text: '' },
                                OName: { Id: '', Text: '' },
                                Captain: { Id: '', Text: '' },
                                OPNo: '',
                                WarpTotalQnty: '',
                                ProdB: '',
                                ProdC: '',
                                ProdG: '',
                                CutPieece: '',
                                Wastage: '',
                                Remarks: ''
                            };
                        };
                        var grid = $("#ircdWarpingGrid").kendoGrid({
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
                                    rejectionControl.detail.warping.saveData(e.model, function (res) {
                                        e.model.DID = res.DID;
                                    });
                                })
                            },
                            beforeEdit: function (e) {
                                if (rejectionControl.master.form.ID.val()) {
                                } else {
                                    e.preventDefault();
                                    rejectionControl.master.saveData(function (res) {
                                        if (res.SaveStatus == 'Success') {
                                            rejectionControl.master.form.ID.val(res.ID);
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
            dyeing: {
                saveData: function (model, onSuccess) {
                    if (model.ID) {
                        var postModel = {
                            ID: rejectionControl.master.form.ID.val(),
                            DID: model.DID,
                            StyleNo: model.StyleNo.Text,
                            StyleCode: model.StyleNo.Id,
                            SetNo: model.SetNo,
                            SS: model.SS,
                            Beam: model.Beam,
                            FType: model.FType.Text,
                            FCode: model.FType.Id,
                            OCode: model.OName.Id,
                            OName: model.OName.Text,
                            CaptainCode: model.Captain.Id,
                            CaptainName: model.Captain.Text,
                            OPNo: model.OPNo,
                            WarpTotalQnty: model.WarpTotalQnty,
                            ProdB: model.ProdB,
                            ProdC: model.ProdC,
                            ProdG: model.ProdG,
                            CutPieece: model.CutPieece,
                            Wastage: model.Wastage,
                            Remarks: model.Remarks
                        };
                        rejectionControl.service.saveDyeingDetail(postModel, onSuccess);
                    }
                },
                grid: {
                    setDataSource: function (masterId) {
                        $("#ircdDyeingGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                            type: "json",
                            serverFiltering: true,
                            transport: {
                                read: {
                                    type: "POST",
                                    dataType: "json",
                                    url: "../RejectionControl/GetDyeingDetail?masterID=" + masterId,
                                    dataType: "json",
                                },
                                parameterMap: function (options) {
                                    return JSON.stringify(options);
                                }
                            },
                            schema: {
                                data: function (res) {
                                    res.push({
                                        DID: '',
                                        ID: rejectionControl.master.form.ID.val(),
                                        StyleNo: { Id: '', Text: '' },
                                        SetNo: '',
                                        SS: '',
                                        Beam: '',
                                        Loom: { Id: '', Text: '' },
                                        FType: { Id: '', Text: '' },
                                        ProdB: '',
                                        ProdC: '',
                                        CutPieece: '',
                                        Wastage: '',
                                        Shift: { Id: '', Text: '' },
                                        OName: { Id: '', Text: '' },                                        
                                        PO: { Id: '', Text: '' },
                                        Sizer: { Id: '', Text: '' },
                                        Captain: { Id: '', Text: '' },
                                        OPNo: '',
                                        WarpTotalQnty: '',                                        
                                        ProdG: '',                                        
                                        Remarks: ''
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
                        }))
                    },
                    init: function () {
                        var option = {};
                        option.styleNoData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../StyleInfo/GetAllStyle/"
                                }
                            },
                            schema: {
                                data: function (res) {
                                    var data = [];
                                    for (var i = 0; i < res.length; i++) {
                                        data.push({ Id: res[i].StyleCode, Text: res[i].StyleNo });
                                    }
                                    return data;
                                }
                            }

                        });
                        option.loomData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllLoom/"
                                }
                            }
                        });
                        option.shiftData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllShift/"
                                }
                            }
                        });
                        option.faultTypeData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllDyeingFaultType/"
                                }
                            }
                        });
                        option.styleNoEditor = function (container, options) {
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
                                    dataSource: option.styleNoData,
                                    dataBound: function () { }
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.loomData,
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.faultTypeData,
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
                        option.shiftEditor = function (container, options) {
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.shiftData,
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
                        option.opEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllDyeingOP?setNo=" + options.model.SetNo + "&ssNo=" + options.model.SS,
                                            }
                                        },
                                    },
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
                        option.poEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllDyeingPO/",
                                            }
                                        },
                                    },
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
                        option.sizerEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllDyeingSizer/",
                                            }
                                        },
                                    },
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
                        option.captainEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllDyeingCaptain/",
                                            }
                                        },
                                    },
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
                        option.textEditor = function (container, options) {
                            $('<input class="k-input k-textbox" name="' + options.field + '"/>')
                                .on("focus", function () {
                                    $(this).select();
                                })
                                .keydown(function (e) {
                                    var grid = container.closest('.k-grid').data("kendoGrid");
                                    if (e.keyCode === 13) {
                                        $(this).trigger("change");
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
                                { width: "100px", field: "StyleNo", title: "StyleNo", editor: option.styleNoEditor, template: "<div class='ce-cell'>#:StyleNo.Text?StyleNo.Text:''# </div>" },
                                { width: "100px", field: "SetNo", title: "SetNo", editor: option.textEditor, template: "<div class='ce-cell'>#:SetNo?SetNo:''# </div>" },
                                { width: "100px", field: "SS", title: "SS", editor: option.textEditor, template: "<div class='ce-cell'>#:SS?SS:''# </div>" },
                                { width: "100px", field: "Beam", title: "Beam", editor: option.textEditor, template: "<div class='ce-cell'>#:Beam?Beam:''# </div>" },
                                { width: "100px", field: "Loom", title: "Loom", editor: option.loomEditor, template: "<div class='ce-cell'>#:Loom.Text?Loom.Text:''# </div>" },
                                { width: "170px", field: "FType", title: "FType", editor: option.fTypeEditor, template: "<div class='ce-cell'>#:FType.Text?FType.Text:''# </div>" },
                                { width: "100px", field: "ProdB", title: "B+", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdB?ProdB:''# </div>" },
                                { width: "100px", field: "ProdC", title: "B", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdC?ProdC:''# </div>" },
                                { width: "100px", field: "CutPieece", title: "CutPieece", editor: option.textEditor, template: "<div class='ce-cell'>#:CutPieece?CutPieece:''# </div>" },
                                { width: "100px", field: "Wastage", title: "Wastage", editor: option.textEditor, template: "<div class='ce-cell'>#:Wastage?Wastage:''# </div>" },
                                { width: "100px", field: "Shift", title: "Shift", editor: option.shiftEditor, template: "<div class='ce-cell'>#:Shift.Text?Shift.Text:''# </div>" },
                                { width: "100px", field: "OName", title: "OName", editor: option.opEditor, template: "<div class='ce-cell'>#:OName.Text?OName.Text:''# </div>" },
                                { width: "100px", field: "PO", title: "PO", editor: option.poEditor, template: "<div class='ce-cell'>#:PO.Text?PO.Text:''# </div>" },
                                { width: "100px", field: "Sizer", title: "Sizer", editor: option.sizerEditor, template: "<div class='ce-cell'>#:Sizer.Text?Sizer.Text:''# </div>" },
                                { width: "100px", field: "Captain", title: "Captain", editor: option.captainEditor, template: "<div class='ce-cell'>#:Captain.Text?Captain.Text:''# </div>" },
                                { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div class='ce-cell'>#:Remarks?Remarks:''# </div>" },
                            ]
                        };
                        option.dataSource = function () {
                            return new kendo.data.DataSource({
                                type: "json",
                                serverFiltering: true,
                                data: []
                            });
                        };
                        option.getEmptyModel = function () {
                            return {
                                DID: '',
                                ID: rejectionControl.master.form.ID.val(),
                                StyleNo: { Id: '', Text: '' },
                                SetNo: '',
                                SS: '',
                                Beam: '',
                                Loom: { Id: '', Text: '' },
                                FType: { Id: '', Text: '' },
                                ProdB: '',
                                ProdC: '',
                                CutPieece: '',
                                Wastage: '',
                                Shift: { Id: '', Text: '' },
                                OName: { Id: '', Text: '' },
                                PO: { Id: '', Text: '' },
                                Sizer: { Id: '', Text: '' },
                                Captain: { Id: '', Text: '' },
                                OPNo: '',
                                WarpTotalQnty: '',
                                ProdG: '',
                                Remarks: ''
                            };
                        };
                        var grid = $("#ircdDyeingGrid").kendoGrid({
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
                                    rejectionControl.detail.dyeing.saveData(e.model, function (res) {
                                        e.model.DID = res.DID;
                                    });
                                });
                                
                            },
                            beforeEdit: function (e) {
                                if (rejectionControl.master.form.ID.val()) {
                                } else {
                                    e.preventDefault();
                                    rejectionControl.master.saveData(function (res) {
                                        if (res.SaveStatus == 'Success') {
                                            rejectionControl.master.form.ID.val(res.ID);
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
            weaving: {
                saveData: function (model, onSuccess) {
                    if (model.ID) {
                        var postModel = {
                            ID: rejectionControl.master.form.ID.val(),
                            DID: model.DID,
                            StyleNo: model.StyleNo.Text,
                            StyleCode: model.StyleNo.Id,
                            SetNo: model.SetNo,
                            SS: model.SS,
                            Beam: model.Beam,
                            FType: model.FType.Text,
                            FCode: model.FType.Id,
                            OCode: model.OName.Id,
                            OName: model.OName.Text,
                            CaptainCode: model.Captain.Id,
                            CaptainName: model.Captain.Text,
                            OPNo: model.OPNo,
                            WarpTotalQnty: model.WarpTotalQnty,
                            ProdB: model.ProdB,
                            ProdC: model.ProdC,
                            ProdG: model.ProdG,
                            CutPieece: model.CutPieece,
                            Wastage: model.Wastage,
                            Remarks: model.Remarks
                        };
                        rejectionControl.service.saveWeavingDetail(postModel, onSuccess);
                    }
                },
                grid: {
                    setDataSource: function (masterId) {
                        $("#ircdWeavingGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                            type: "json",
                            serverFiltering: true,
                            transport: {
                                read: {
                                    type: "POST",
                                    dataType: "json",
                                    url: "../RejectionControl/GetWeavingDetail?masterID=" + masterId,
                                    dataType: "json",
                                },
                                parameterMap: function (options) {
                                    return JSON.stringify(options);
                                }
                            },
                            schema: {
                                data: function (res) {
                                    for (var i = 0; i < res.length; i++) {
                                        var date = kendo.parseDate(res[i].WeavDate);
                                        res[i].WeavDate = date ? date.toString('dd-MM-yyyy') : '';
                                    }
                                    res.push({
                                        DID: '',
                                        ID: rejectionControl.master.form.ID.val(),
                                        StyleNo: { Id: '', Text: '' },
                                        SetNo: '',
                                        SS: '',
                                        Beam: '',
                                        Loom: { Id: '', Text: '' },
                                        FType: { Id: '', Text: '' },
                                        Shift: { Id: '', Text: '' },
                                        OName: { Id: '', Text: '' },
                                        Captain: { Id: '', Text: '' },
                                        PO: { Id: '', Text: '' },
                                        LineMan: { Id: '', Text: '' },
                                        Fitter: { Id: '', Text: '' },
                                        InFitter: { Id: '', Text: '' },
                                        OPNo: '',
                                        WarpTotalQnty: '',
                                        ProdB: '',
                                        ProdC: '',
                                        ProdG: '',
                                        CutPieece: '',
                                        Wastage: '',
                                        WeavDate:'',
                                        Remarks: ''
                                    });
                                    return res;
                                },
                                model: {
                                    fields: {
                                        //WeavDate: {
                                        //    type: "date",
                                        //    template: '#= kendo.toString("dd-MMM-yyyy") #',
                                        //    editable: false
                                        //},
                                    }
                                }
                            }
                        }))
                    },
                    init: function () {
                        var option = {};
                        option.styleNoData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../StyleInfo/GetAllStyle/"
                                }
                            },
                            schema: {
                                data: function (res) {
                                    var data = [];
                                    for (var i = 0; i < res.length; i++) {
                                        data.push({ Id: res[i].StyleCode, Text: res[i].StyleNo });
                                    }
                                    return data;
                                }
                            }

                        });
                        option.loomData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllLoom/"
                                }
                            }
                        });
                        option.shiftData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllShift/"
                                }
                            }
                        });
                        option.fMCData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllFinishingMC/"
                                }
                            }
                        });
                        option.faultTypeData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllWeavingFaultType/"
                                }
                            }
                        });
                        option.styleNoEditor = function (container, options) {
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
                                    dataSource: option.styleNoData,
                                    dataBound: function () { }
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.loomData,
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.faultTypeData,
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.fMCData,
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
                        option.opEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllWeavingOP?loomName=" + options.model.Loom.Text + "&weaveDate=" + options.model.WeavDate + "&shiftCode=" + options.model.Shift.Id,
                                            }
                                        },
                                    },
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
                        option.poEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllWeavingPO?loomName=" + options.model.Loom.Text + "&weaveDate=" + options.model.WeavDate + "&shiftCode=" + options.model.Shift.Id,
                                            }
                                        },
                                    },
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
                        option.linemanEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllWeavingLineman?loomName=" + options.model.Loom.Text + "&weaveDate=" + options.model.WeavDate + "&shiftCode=" + options.model.Shift.Id,
                                            }
                                        },
                                    },
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
                        option.fitterEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllWeavingFitter?loomName=" + options.model.Loom.Text + "&weaveDate=" + options.model.WeavDate + "&shiftCode=" + options.model.Shift.Id,
                                            }
                                        },
                                    },
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
                        option.captainEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllWeavingCaptain?loomName=" + options.model.Loom.Text + "&weaveDate=" + options.model.WeavDate + "&shiftCode=" + options.model.Shift.Id,
                                            }
                                        },
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
                        option.infitterEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllWeavingInFitter?loomName=" + options.model.Loom.Text + "&weaveDate=" + options.model.WeavDate + "&shiftCode=" + options.model.Shift.Id,
                                            }
                                        },
                                    },
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
                        option.shiftEditor = function (container, options) {
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.shiftData,
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
                                { width: "100px", field: "StyleNo", title: "StyleNo", editor: option.styleNoEditor, template: "<div class='ce-cell'>#:StyleNo.Text?StyleNo.Text:''# </div>" },
                                { width: "100px", field: "SetNo", title: "SetNo", editor: option.textEditor, template: "<div class='ce-cell'>#:SetNo?SetNo:''# </div>" },
                                { width: "100px", field: "SS", title: "SS", editor: option.textEditor, template: "<div class='ce-cell'>#:SS?SS:''# </div>" },
                                { width: "100px", field: "Beam", title: "Beam", editor: option.textEditor, template: "<div class='ce-cell'>#:Beam?Beam:''# </div>" },
                                { width: "100px", field: "Loom", title: "Loom", editor: option.loomEditor, template: "<div class='ce-cell'>#:Loom.Text?Loom.Text:''# </div>" },
                                { width: "170px", field: "FType", title: "FType", editor: option.fTypeEditor, template: "<div class='ce-cell'>#:FType.Text?FType.Text:''# </div>" },
                                { width: "100px", field: "ProdB", title: "A", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdB?ProdB:''# </div>" },
                                { width: "100px", field: "ProdC", title: "B", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdC?ProdC:''# </div>" },
                                { width: "100px", field: "CutPieece", title: "CutPieece", editor: option.textEditor, template: "<div class='ce-cell'>#:CutPieece?CutPieece:''# </div>" },
                                { width: "100px", field: "Wastage", title: "Wastage", editor: option.textEditor, template: "<div class='ce-cell'>#:Wastage?Wastage:''# </div>" },
                                { width: "100px", field: "WeavDate", title: "WeavDate", editor: option.textEditor, template: "<div class='ce-cell'>#:WeavDate?WeavDate:''# </div>" },
                                { width: "100px", field: "Shift", title: "Shift", editor: option.shiftEditor, template: "<div class='ce-cell'>#:Shift.Text?Shift.Text:''# </div>" },
                                { width: "100px", field: "OName", title: "OName", editor: option.opEditor, template: "<div class='ce-cell'>#:OName.Text?OName.Text:''# </div>" },
                                { width: "100px", field: "PO", title: "PO", editor: option.poEditor, template: "<div class='ce-cell'>#:PO.Text?PO.Text:''# </div>" },
                                { width: "100px", field: "LineMan", title: "LineMan", editor: option.linemanEditor, template: "<div class='ce-cell'>#:LineMan.Text?LineMan.Text:''# </div>" },
                                { width: "100px", field: "Fitter", title: "Fitter", editor: option.fitterEditor, template: "<div class='ce-cell'>#:Fitter.Text?Fitter.Text:''# </div>" },
                                { width: "100px", field: "Captain", title: "Captain", editor: option.captainEditor, template: "<div class='ce-cell'>#:Captain.Text?Captain.Text:''# </div>" },
                                { width: "100px", field: "InFitter", title: "InFitter", editor: option.infitterEditor, template: "<div class='ce-cell'>#:InFitter.Text?InFitter.Text:''# </div>" },
                                { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div class='ce-cell'>#:Remarks?Remarks:''# </div>" },
                            ]
                        };
                        option.dataSource = function () {
                            return new kendo.data.DataSource({
                                type: "json",
                                serverFiltering: true,
                                data: [],

                            });
                        };
                        option.getEmptyModel = function () {
                            return {
                                DID: '',
                                ID: rejectionControl.master.form.ID.val(),
                                StyleNo: { Id: '', Text: '' },
                                SetNo: '',
                                SS: '',
                                Beam: '',
                                Loom: { Id: '', Text: '' },
                                FType: { Id: '', Text: '' },
                                Shift: { Id: '', Text: '' },
                                OName: { Id: '', Text: '' },
                                Captain: { Id: '', Text: '' },
                                PO: { Id: '', Text: '' },
                                LineMan: { Id: '', Text: '' },
                                Fitter: { Id: '', Text: '' },
                                InFitter: { Id: '', Text: '' },
                                OPNo: '',
                                WarpTotalQnty: '',
                                ProdB: '',
                                ProdC: '',
                                ProdG: '',
                                CutPieece: '',
                                Wastage: '',
                                WeavDate: '',
                                Remarks: ''
                            };
                        };
                        var grid = $("#ircdWeavingGrid").kendoGrid({
                            editable: {
                                createAt: 'bottom'
                            },
                            autoSync: true,
                            resizable: true,
                            sortable: false,
                            selectable: "row",
                            columns: option.columns(),
                            dataSource: option.dataSource(),
                            save: function (e) {
                                window.setTimeout(function () {
                                    rejectionControl.detail.weaving.saveData(e.model, function (res) {
                                        e.model.DID = res.DID;
                                    });
                                });
                            },
                            beforeEdit: function (e) {
                                if (rejectionControl.master.form.ID.val()) {
                                } else {
                                    e.preventDefault();
                                    rejectionControl.master.saveData(function (res) {
                                        if (res.SaveStatus == 'Success') {
                                            rejectionControl.master.form.ID.val(res.ID);
                                            e.model.ID = res.ID;
                                        }
                                    });
                                }
                            }
                        }).data("kendoGrid");
                    }
                }
            },
            finishing: {
                saveData: function (model, onSuccess) {
                    if (model.ID) {
                        var postModel = {
                            ID: rejectionControl.master.form.ID.val(),
                            DID: model.DID,
                            StyleNo: model.StyleNo.Text,
                            StyleCode: model.StyleNo.Id,
                            SetNo: model.SetNo,
                            SS: model.SS,
                            Beam: model.Beam,
                            Loom: model.Loom.Text,
                            ShiftCode: model.Shift.Id,
                            ShiftName: model.Shift.Text,
                            FType: model.FType.Text,
                            FCode: model.FType.Id,
                            //OCode: model.OName.Id,
                            //OName: model.OName.Text,
                            CaptainCode: model.Captain.Id,
                            CaptainName: model.Captain.Text,
                            FOPID: model.FOP.Id,
                            FOPName: model.FOP.Text,
                            FMCCode: model.FMC.Id,
                            FMCName: model.FMC.Text,
                            OPNo: model.OPNo,
                            WarpTotalQnty: model.WarpTotalQnty,
                            ProdB: model.ProdB,
                            ProdC: model.ProdC,
                            ProdG: model.ProdG,
                            CutPieece: model.CutPieece,
                            Wastage: model.Wastage,
                            Remarks: model.Remarks
                        };
                        rejectionControl.service.saveFinishingDetail(postModel, onSuccess);
                    }
                },
                grid: {
                    setDataSource: function (masterId) {
                        $("#ircdFinishingGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                            type: "json",
                            serverFiltering: true,
                            transport: {
                                read: {
                                    type: "POST",
                                    dataType: "json",
                                    url: "../RejectionControl/GetFinishingDetail?masterID=" + masterId,
                                    dataType: "json",
                                },
                                parameterMap: function (options) {
                                    return JSON.stringify(options);
                                }
                            },
                            schema: {
                                data: function (res) {
                                    res.push({
                                        DID: '',
                                        ID: rejectionControl.master.form.ID.val(),
                                        StyleNo: { Id: '', Text: '' },
                                        SetNo: '',
                                        SS: '',
                                        Beam: '',
                                        Loom: { Id: '', Text: '' },
                                        FType: { Id: '', Text: '' },
                                        Shift: { Id: '', Text: '' },
                                        OName: { Id: '', Text: '' },
                                        Captain: { Id: '', Text: '' },
                                        FOP: { Id: '', Text: '' },
                                        FMC: { Id: '', Text: '' },
                                        OPNo: '',
                                        WarpTotalQnty: '',
                                        ProdB: '',
                                        ProdC: '',
                                        ProdG: '',
                                        CutPieece: '',
                                        Wastage: '',
                                        Remarks: ''
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
                        }))
                    },
                    init: function () {
                        var option = {};
                        option.styleNoData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../StyleInfo/GetAllStyle/"
                                }
                            },
                            schema: {
                                data: function (res) {
                                    var data = [];
                                    for (var i = 0; i < res.length; i++) {
                                        data.push({ Id: res[i].StyleCode, Text: res[i].StyleNo });
                                    }
                                    return data;
                                }
                            }

                        });
                        option.loomData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllLoom/"
                                }
                            }
                        });
                        option.shiftData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllShift/"
                                }
                            }
                        });
                        option.fMCData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllFinishingMC/"
                                }
                            }
                        });
                        option.faultTypeData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllFinishingFaultType/"
                                }
                            }
                        });
                        option.styleNoEditor = function (container, options) {
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
                                    dataSource: option.styleNoData,
                                    dataBound: function () { }
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.loomData,
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.faultTypeData,
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.fMCData,
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
                        option.operatorEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllFinishingOperator?setNo=" + options.model.SetNo
                                            }
                                        },
                                    },
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
                        option.captainEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllFinishingCaptain?setNo=" + options.model.SetNo
                                            }
                                        },
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
                        option.shiftEditor = function (container, options) {
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.shiftData,
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
                                { width: "100px", field: "StyleNo", title: "StyleNo", editor: option.styleNoEditor, template: "<div class='ce-cell'>#:StyleNo.Text?StyleNo.Text:''# </div>" },
                                { width: "100px", field: "SetNo", title: "SetNo", editor: option.textEditor, template: "<div class='ce-cell'>#:SetNo?SetNo:''# </div>" },
                                { width: "100px", field: "SS", title: "SS", editor: option.textEditor, template: "<div class='ce-cell'>#:SS?SS:''# </div>" },
                                { width: "100px", field: "Beam", title: "Beam", editor: option.textEditor, template: "<div class='ce-cell'>#:Beam?Beam:''# </div>" },
                                { width: "100px", field: "Loom", title: "Loom", editor: option.loomEditor, template: "<div class='ce-cell'>#:Loom.Text?Loom.Text:''# </div>" },
                                { width: "170px", field: "FType", title: "FType", editor: option.fTypeEditor, template: "<div class='ce-cell'>#:FType.Text?FType.Text:''# </div>" },
                                { width: "100px", field: "ProdB", title: "A", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdB?ProdB:''# </div>" },
                                { width: "100px", field: "ProdC", title: "B", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdC?ProdC:''# </div>" },
                                { width: "100px", field: "CutPieece", title: "CutPieece", editor: option.textEditor, template: "<div class='ce-cell'>#:CutPieece?CutPieece:''# </div>" },
                                { width: "100px", field: "Wastage", title: "Wastage", editor: option.textEditor, template: "<div class='ce-cell'>#:Wastage?Wastage:''# </div>" },
                                { width: "100px", field: "Shift", title: "Shift", editor: option.shiftEditor, template: "<div class='ce-cell'>#:Shift.Text?Shift.Text:''# </div>" },
                                { width: "100px", field: "Captain", title: "Captain", editor: option.captainEditor, template: "<div class='ce-cell'>#:Captain.Text?Captain.Text:''# </div>" },
                                { width: "100px", field: "FOP", title: "FOP", editor: option.operatorEditor, template: "<div class='ce-cell'>#:FOP.Text?FOP.Text:''# </div>" },
                                { width: "100px", field: "FMC", title: "FMC", editor: option.fMCEditor, template: "<div class='ce-cell'>#:FMC.Text?FMC.Text:''# </div>" },
                                { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div class='ce-cell'>#:Remarks?Remarks:''# </div>" },
                            ]
                        };
                        option.dataSource = function () {
                            return new kendo.data.DataSource({
                                type: "json",
                                serverFiltering: true,
                                data: []
                            });
                        };
                        option.getEmptyModel = function () {
                            return {
                                DID: '',
                                ID: rejectionControl.master.form.ID.val(),
                                StyleNo: { Id: '', Text: '' },
                                SetNo: '',
                                SS: '',
                                Beam: '',
                                Loom: { Id: '', Text: '' },
                                FType: { Id: '', Text: '' },
                                Shift: { Id: '', Text: '' },
                                OName: { Id: '', Text: '' },
                                Captain: { Id: '', Text: '' },
                                FOP: { Id: '', Text: '' },
                                FMC: { Id: '', Text: '' },
                                OPNo: '',
                                WarpTotalQnty: '',
                                ProdB: '',
                                ProdC: '',
                                ProdG: '',
                                CutPieece: '',
                                Wastage: '',
                                Remarks: ''
                            };
                        };
                        var grid = $("#ircdFinishingGrid").kendoGrid({
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
                                    rejectionControl.detail.finishing.saveData(e.model, function (res) {
                                        e.model.DID = res.DID;
                                    });
                                });
                            },
                            beforeEdit: function (e) {
                                if (rejectionControl.master.form.ID.val()) {
                                } else {
                                    e.preventDefault();
                                    rejectionControl.master.saveData(function (res) {
                                        if (res.SaveStatus == 'Success') {
                                            rejectionControl.master.form.ID.val(res.ID);
                                        }
                                    });
                                }
                            },
                            dataBound: function () {
                            }
                        }).data("kendoGrid");
                        //var grid = grid.dataSource.add(option.getEmptyModel());
                    }
                }
            },
            dyeStopRope: {
                saveData: function (model, onSuccess) {
                    if (model.ID) {
                        model.ID = rejectionControl.master.form.ID.val();
                    }
                    var postModel = {
                        DID: model.DID,
                        ID: rejectionControl.master.form.ID.val(),
                        StyleNo: model.StyleNo.Text,
                        StyleCode: model.StyleNo.Id,
                        SetNo: model.SetNo,
                        SS: model.SS,
                        Beam: model.Beam,
                        Loom: model.Loom.Text,
                        FType: model.FType.Text,
                        FCode: model.FType.Id,
                        OCode: model.OName.Id,
                        OName: model.OName.Text,
                        CaptainCode: model.Captain.Id,
                        CaptainName: model.Captain.Text,
                        OPNo: model.OPNo,
                        WarpTotalQnty: model.WarpTotalQnty,
                        ProdB: model.ProdB,
                        ProdC: model.ProdC,
                        ProdG: model.ProdG,
                        CutPieece: model.CutPieece,
                        Wastage: model.Wastage,
                        Remarks: model.Remarks
                    };
                    rejectionControl.service.saveDyeStopRopeDetail(postModel, onSuccess);
                },
                grid: {
                    setDataSource: function (masterId) {
                        $("#ircdDyeStopRopeGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                            type: "json",
                            serverFiltering: true,
                            transport: {
                                read: {
                                    type: "POST",
                                    dataType: "json",
                                    url: "../RejectionControl/GetDyeStopRopeDetail?masterID=" + masterId,
                                    dataType: "json",
                                },
                                parameterMap: function (options) {
                                    return JSON.stringify(options);
                                }
                            },
                            schema: {
                                data: function (res) {
                                    res.push({ DID: '', ID: rejectionControl.master.form.ID.val(), StyleNo: { Id: '', Text: '' }, SetNo: '', SS: '', Beam: '', Loom: { Id: '', Text: '' }, FType: { Id: '', Text: '' }, OName: { Id: '', Text: '' }, Captain: { Id: '', Text: '' }, OPNo: '', WarpTotalQnty: '', ProdB: '', ProdC: '', ProdG: '', CutPieece: '', Wastage: '', Remarks: '' });
                                    return res;
                                }
                            }
                        }));

                    },
                    init: function () {
                        var option = {};
                        option.styleNoData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../StyleInfo/GetAllStyle/"
                                }
                            },
                            schema: {
                                data: function (res) {
                                    var data = [];
                                    for (var i = 0; i < res.length; i++) {
                                        data.push({ Id: res[i].StyleCode, Text: res[i].StyleNo });
                                    }
                                    return data;
                                }
                            }

                        });
                        option.loomData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllLoom/"
                                }
                            }
                        });
                        option.faultTypeData = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "../RejectionControl/GetAllDyeStopRopeFaultType/"
                                }
                            }
                        });
                        option.styleNoEditor = function (container, options) {
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
                                    dataSource: option.styleNoData,
                                    dataBound: function () { }
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
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.loomData,
                                    dataBound: function () { }
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
                        option.fTypeEditor = function (container, options) {
                            var editor = $('<input name="' + options.field + '" style="height:24px;"/>')
                                .appendTo(container)
                                .kendoComboBox({
                                    animation: false,
                                    clearButton: false,
                                    filter: "contains",
                                    dataTextField: "Text",
                                    dataValueField: "Id",
                                    dataSource: option.faultTypeData,
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
                        option.operatorEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllDyeStopRopeOperator?setNo=" + options.model.SetNo
                                            }
                                        },
                                    },
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
                        option.captainEditor = function (container, options) {
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
                                                url: "../RejectionControl/GetAllDyeStopRopeCaptain?setNo=" + options.model.SetNo
                                            }
                                        },
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
                                { width: "30px", field: "", title: "", template: "<div style='padding:0px 0px;text-align: center;'><span class='glyphicon glyphicon-edit'></span></div>" },
                                { width: "100px", field: "StyleNo", title: "StyleNo", editor: option.styleNoEditor, template: "<div class='ce-cell'>#:StyleNo.Text?StyleNo.Text:''# </div>" },
                                { width: "100px", field: "SetNo", title: "SetNo", editor: option.textEditor, template: "<div class='ce-cell'>#:SetNo?SetNo:''# </div>" },
                                { width: "100px", field: "SS", title: "SS", editor: option.textEditor, template: "<div class='ce-cell'>#:SS?SS:''# </div>" },
                                { width: "100px", field: "Beam", title: "Beam", editor: option.textEditor, template: "<div class='ce-cell'>#:Beam?Beam:''# </div>" },
                                { width: "100px", field: "Loom", title: "Loom", editor: option.loomEditor, template: "<div class='ce-cell'>#:Loom.Text?Loom.Text:''# </div>" },
                                { width: "170px", field: "FType", title: "FType", editor: option.fTypeEditor, template: "<div class='ce-cell'>#:FType.Text?FType.Text:''# </div>" },
                                { width: "100px", field: "OName", title: "OName", editor: option.operatorEditor, template: "<div class='ce-cell'>#:OName.Text?OName.Text:''# </div>" },
                                { width: "100px", field: "Captain", title: "Captain", editor: option.captainEditor, template: "<div class='ce-cell'>#:Captain.Text?Captain.Text:''# </div>" },
                                { width: "100px", field: "OPNo", title: "OPNo", editor: option.textEditor, template: "<div class='ce-cell'>#:OPNo?OPNo:''# </div>" },
                                { width: "100px", field: "WarpTotalQnty", title: "WarpTotalQnty", editor: option.textEditor, template: "<div class='ce-cell'>#:WarpTotalQnty?WarpTotalQnty:''# </div>" },
                                { width: "100px", field: "ProdB", title: "B+", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdB?ProdB:''# </div>" },
                                { width: "100px", field: "ProdC", title: "B", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdC?ProdC:''# </div>" },
                                { width: "100px", field: "ProdG", title: "A", editor: option.textEditor, template: "<div class='ce-cell'>#:ProdG?ProdG:''# </div>" },
                                { width: "100px", field: "CutPieece", title: "CutPieece", editor: option.textEditor, template: "<div class='ce-cell'>#:CutPieece?CutPieece:''# </div>" },
                                { width: "100px", field: "Wastage", title: "Wastage", editor: option.textEditor, template: "<div class='ce-cell'>#:Wastage?Wastage:''# </div>" },
                                { width: "100px", field: "Remarks", title: "Remarks", editor: option.remarkEditor, template: "<div class='ce-cell'>#:Remarks?Remarks:''# </div>" },
                            ]
                        };
                        option.dataSource = function () {
                            return new kendo.data.DataSource({
                                type: "json",
                                serverFiltering: true,
                                data: [
                                    { DID: '', ID: '', StyleNo: { Id: '', Text: '' }, SetNo: '', SS: '', Beam: '', Loom: { Id: '', Text: '' }, FType: { Id: '', Text: '' }, OName: { Id: '', Text: '' }, Captain: { Id: '', Text: '' }, OPNo: '', WarpTotalQnty: '', ProdB: '', ProdC: '', ProdG: '', CutPieece: '', Wastage: '', Remarks: '' }
                                ]
                            });
                        };
                        option.getEmptyModel = function () {
                            return {
                                DID: '',
                                ID: '',
                                StyleNo: {
                                    Id: '',
                                    Text: ''
                                },
                                SetNo: '',
                                SS: '',
                                Beam: '',
                                Loom: {
                                    Id: '',
                                    Text: ''
                                },
                                FType: {
                                    Id: '',
                                    Text: ''
                                },
                                OName: {
                                    Id: '',
                                    Text: ''
                                },
                                Captain: {
                                    Id: '',
                                    Text: ''
                                },
                                OPNo: '',
                                WarpTotalQnty: '',
                                ProdB: '',
                                ProdC: '',
                                ProdG: '',
                                CutPieece: '',
                                Wastage: '',
                                Remarks: ''
                            };
                        };
                        var grid = $("#ircdDyeStopRopeGrid").kendoGrid({
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
                                    rejectionControl.detail.dyeStopRope.saveData(e.model, function (res) {
                                        e.model.DID = res.DID;
                                    });
                                })
                            },
                            beforeEdit: function (e) {
                                if (rejectionControl.master.form.ID.val()) {

                                } else {
                                    e.preventDefault();
                                    rejectionControl.master.saveData(function (res) {
                                        if (res.SaveStatus == 'Success') {
                                            rejectionControl.master.form.ID.val(res.ID);
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
            init: function () {
                $("#tabstrip").kendoTabStrip({
                    animation: {
                        open: {
                            effects: "fadeIn"
                        }
                    }
                });
                rejectionControl.detail.warping.grid.init();
                rejectionControl.detail.dyeing.grid.init();
                rejectionControl.detail.weaving.grid.init();
                rejectionControl.detail.finishing.grid.init();
                rejectionControl.detail.dyeStopRope.grid.init();
            }
        },
        init: function () {
            rejectionControl.summary.init();
            rejectionControl.master.init();
            rejectionControl.detail.init();
        }
    };
    rejectionControl.init();
});

