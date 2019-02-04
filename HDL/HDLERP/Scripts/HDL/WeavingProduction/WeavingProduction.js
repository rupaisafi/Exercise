$(document).ready(function () {
    var wProduction = new function () {
        var that = this;
        this.service = new function () {
            this.getNextWeavingID = function (success) {
                AjaxManager.GetJson("../WeavingProduction/GetNextWeavingID/", null, success, function (error) {
                    window.alert(error.statusText);
                });

            };
            this.getAllProductionFitter = function () {
                var objFitter = "";
                var jsonParam = "";
                var serviceUrl = "../WeavingProduction/getAllProductionFitter/";
                AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
                function onSuccess(jsonData) {
                    objFitter = jsonData;
                }
                function onFailed(error) {
                    window.alert(error.statusText);
                }
                return objFitter;
            };
            this.getAllProductionLineman = function () {
                var objFitter = "";
                var jsonParam = "";
                var serviceUrl = "../WeavingProduction/getAllProductionLineman/";
                AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
                function onSuccess(jsonData) {
                    objFitter = jsonData;
                }
                function onFailed(error) {
                    window.alert(error.statusText);
                }
                return objFitter;
            };
            this.getAllProductionOperator = function () {
                var result;
                AjaxManager.GetJsonResult("../WeavingProduction/getAllProductionOperator/", null, false, false, function (res) {
                    result = res;
                }, function (err) {
                    window.alert(err.statusText);
                });
                return result;
            };
            this.getAllProductionSetNo = function () {
                return new kendo.data.DataSource({
                    type: "json",
                    transport: {
                        read: {
                            url: "../WeavingProduction/getAllProductionSetNo/",
                        }
                    }
                });
            };
            this.getAllProductionSLNo = function () {
                debugger
                return {
                    type: "json",
                    serverFiltering: true,
                    transport: {
                        read: {
                            type: "POST",
                            url: "../WeavingProduction/getAllProductionSLNo/",
                        },
                    },
                    schema: {
                        data: function (data) {
                            data.unshift({
                                SSNo: "--- Select ---",
                                SetNo: 0
                            });
                            return data;
                        }
                    }
                }
            };
            this.getAllProductionBeamNo = function () {
                return {
                    type: "json",
                    serverFiltering: true,
                    transport: {
                        read: {
                            type: "POST",
                            url: "../WeavingProduction/getAllProductionSLNo/",
                        }
                    },
                    schema: {
                        data: function (data) {
                            data.unshift({
                                BeamNo: "--- Select ---",
                                SetNo: 0
                            });
                            return data;
                        }
                    }
                }
            }
            this.getAllProductionStyleNo = function () {
                var result;
                AjaxManager.GetJsonResult("../WeavingProduction/getAllProductionStyleNo/", null, false, false, function (res) {
                    result = res;
                }, function (err) {
                    window.alert(err.statusText);
                });
                return result;
            };
            this.saveProductionData = function (master, detail, successCallback) {
                var result;
                var model = {
                    master: master,
                    detail: detail
                };

                console.log(model);
                AjaxManager.GetJson("../WeavingProduction/SaveProductionData", JSON.stringify(model), successCallback, function (err) {
                    window.alert(err.statusText);
                });
                return result;
            };
        };
        this.summary = new function () {
            var self = this;
            this.edit = function (model) {
                that.details.master.setFormData(model);
                that.details.production.clearFormData();
                var dataSource = that.details.production.grid.getDataSource({ wID: model.WID });
                $("#wpdProductionGrid").data("kendoGrid").setDataSource(dataSource);
                $("#wProductionSummary").hide();
                $("#wProductionDetails").show();
            };
            this.addNew = function () {
                that.details.master.clearFormData();
                that.details.production.clearFormData();
                $("#wProductionSummary").hide();
                $("#wProductionDetails").show();
            };
            this.search = function () {
                var model = {};
                model.to = kendo.toString($("#wsToDate").data("kendoDatePicker").value(), "yyyy-MM-dd");
                model.from = kendo.toString($("#wsFromDate").data("kendoDatePicker").value(), "yyyy-MM-dd");
                $("#wsGrid").data("kendoGrid").setDataSource(self.grid.getDataSource(model));
            };
            this.grid = new function () {
                var _grid = this;
                this.getColumns = function () {
                    return [
                        { field: "WID", hidden: true },
                        { field: "", headerTemplate: '<div style="text-align:center;"><span class="glyphicon glyphicon-tasks"></span></div>', width: "30px", template: '<div class="ws-grid-edit-button"><span class="glyphicon glyphicon-edit"></span></div>' },
                        { field: "DeptName", title: "Department", template: "<span style='padding:4px 5px;'>#:DeptName?DeptName:''#</span>" },
                        { field: "WeaveDate", title: "Date", template: "<span style='padding:4px 5px;'>#:WeaveDate?kendo.toString(WeaveDate,'dd-MMM-yyyy'):''#</span>" },
                        { field: "UnitNo", title: "Floor", template: "<span style='padding:4px 5px;'>#:UnitNo?UnitNo:''#</span>" },
                        { field: "UName", title: "Unit", template: "<span style='padding:4px 5px;'>#:UName?UName:''#</span>" },
                        { field: "ShiftName", title: "Shift", template: "<span style='padding:4px 5px;'>#:ShiftName?ShiftName:''#</span>" },
                        { field: "POName", title: "PO", template: "<span style='padding:4px 5px;'>#:POName?POName:''#</span>" },
                        { field: "CaptainName", title: "Captain", template: "<span style='padding:4px 5px;'>#:CaptainName?CaptainName:''#</span>" },
                        { field: "AstSuperName", title: "Asst.Super", template: "<span style='padding:4px 5px;'>#:AstSuperName?AstSuperName:''#</span>" },
                        { field: "LineManName", title: "LineMan", template: "<span style='padding:4px 5px;'>#:LineManName?LineManName:''#</span>" },
                        { field: "BeamFitterName", title: "BeamFitter", template: "<span style='padding:4px 5px;'>#:BeamFitterName?BeamFitterName:''#</span>" },
                        { field: "FitterName", title: "Fitter", template: "<span style='padding:4px 5px;'>#:FitterName?FitterName:''#</span>" },
                    ];
                };
                this.getDataSource = function (model) {
                    return new kendo.data.DataSource({
                        type: "json",
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        allowUnsort: true,
                        pageSize: 10,
                        transport: {
                            read: {
                                url: '../WeavingProduction/GetProductionSummary?from=' + model.from + '&to=' + model.to,
                                type: "POST",
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
                                    WeaveDate: {
                                        type: "date",
                                        template: '#= kendo.toString("dd-MMM-yyyy") #',
                                        editable: false
                                    }
                                }
                            }
                        }
                    });
                }
                this.init = function () {
                    var model = {};
                    model.to = kendo.toString($("#wsToDate").data("kendoDatePicker").value(), "yyyy-MM-dd");
                    model.from = kendo.toString($("#wsFromDate").data("kendoDatePicker").value(), "yyyy-MM-dd");
                    return $("#wsGrid").kendoGrid({
                        pageable: true,
                        selectable: "row",
                        dataSource: _grid.getDataSource(model),
                        columns: _grid.getColumns()
                    }).data("kendoGrid");
                }
            };
            this.init = function () {
                var _date = new Date();
                $("#wsNew").click(self.addNew);
                $("#wsFromDate").kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(_date.getFullYear(), _date.getMonth(), 1)
                })
                    .data("kendoDatePicker")
                    .bind("change", self.search);
                $("#wsToDate").kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date(_date.getFullYear(), _date.getMonth() + 1, 0)
                })
                    .data("kendoDatePicker")
                    .bind("change", self.search);
                var grid = this.grid.init();
                $(document).on("click", ".ws-grid-edit-button", function (e) {
                    var selected = grid.dataItem(grid.select());
                    self.edit(selected);
                });
            };
        };
        this.details = new function () {
            var _details = this;
            this.master = new function () {
                var _master = this;
                var _form = {};
                this.getFormData = function () {
                    var model = {};
                    model.WID = _form.ID.val();
                    model.WeaveDate = _form.Date.value();
                    model.DeptNo = _form.Floor.value();
                    model.DeptName = _form.Floor.value();
                    model.UnitNo = _form.Unit.text();
                    model.UnitCode = _form.Unit.value();
                    model.ShiftCode = _form.Shift.value();
                    model.ShiftName = _form.Shift.text();
                    model.CaptainCode = _form.Captain.value();
                    model.CaptainName = _form.Captain.text();
                    model.POName = _form.PO.text();
                    model.POCode = _form.PO.value();
                    model.FitterName = _form.FitterCaptain.text();
                    model.FitterCode = _form.FitterCaptain.value();
                    return model;
                };
                this.clearFormData = function () {
                    _form.Date.value(new Date());
                    _form.Floor.value('');
                    _form.Unit.value('');
                    _form.Shift.value('');
                    _form.Captain.value('');
                    _form.PO.value('');
                    _form.FitterCaptain.value('');
                    that.service.getNextWeavingID(function (res) {
                        if (res.ID) {
                            _form.ID.val(res.ID);
                        }
                    });
                };
                this.setFormData = function (model) {
                    _master.clearFormData();
                    _form.ID.val(model.WID)
                    _form.Date.value(model.WeaveDate);
                    _form.Floor.value(model.DeptName);
                    _form.Unit.value(model.UnitNo);
                    _form.Shift.value(model.ShiftName);
                    _form.Captain.value(model.CaptainName);
                    _form.PO.value(model.POName);
                    _form.FitterCaptain.value(model.FitterName);
                };
                this.init = function () {
                    _form.ID = $("#wpmIDNo");
                    _form.Date = HdlCommonHelper.datePicker("wpmDate");
                    _form.Floor = HdlCommonHelper.weavingFloorCombo("wpmFloor");
                    _form.Unit = HdlCommonHelper.unitCombo("wpmUnit");
                    _form.Shift = HdlCommonHelper.shiftCombo("wpmShift");
                    _form.Captain = HdlCommonHelper.weavingCaptainCombo("wpmCaptain");
                    _form.PO = HdlCommonHelper.weavingPOCombo("wpmPO");
                    _form.FitterCaptain = HdlCommonHelper.weavingFitterCombo("wpmFitterCaptain");
                    _form.Unit.bind("change", function () {
                        var dataSource = HdlCommonManager.getAllWeavingMachine(this.value());
                        $("#wpdpfLoomName").data("kendoComboBox").value('');
                        $("#wpdpfLoomName").data("kendoComboBox").setDataSource(dataSource);
                    })
                    that.service.getNextWeavingID(function (res) {
                        if (res.ID) {
                            _form.ID.val(res.ID);
                        }
                    });
                };
            };
            this.production = new function () {
                var _production = this;
                var _form = {};
                this.edit = function (model) {
                    console.log(model);
                    _production.setFormData(model);
                }
                this.saveData = function () {
                    var master = that.details.master.getFormData();
                    var detail = this.getFormData();
                    var validator = $("#wpdProductionForm").kendoValidator().data("kendoValidator");
                    if (validator.validate()) {
                        var master = that.details.master.getFormData();
                        var detail = this.getFormData();
                        console.log(master);
                        that.service.saveProductionData(master, detail, function (res) {
                            $("#wpdProductionGrid").data("kendoGrid").dataSource.read();
                            _production.clearFormData();
                        });

                    }
                }
                this.getFormData = function () {
                    var model = {};
                    model.WIID = _form.WIID.val();
                    model.WID = _form.WID.val();
                    model.Loom = _form.Loom.text();
                    model.LoomCode = _form.Loom.value();
                    model.LineManName = _form.Lineman.text();
                    model.LineManCode = _form.Lineman.value();
                    model.OP = _form.Operator.value();
                    model.SetNo = _form.SetNo.value();
                    model.SL = _form.SSNo.value();
                    model.Flange = _form.BeamNo.value();
                    model.StyleNo = _form.Style.text();
                    model.StyleCode = _form.Style.value();
                    model.WarpStop = _form.WarpStop.value();
                    model.WarpCmpx = _form.WarpCmpx.value();
                    model.WeftStop = _form.WeftStop.value();
                    model.WeftCmpx = _form.WeftCmpx.value();
                    model.OtherStop = _form.OtherStop.value();
                    model.RPM = _form.RPM.value();
                    model.RunTime = _form.RunTime.value();
                    model.TotalProd = _form.TotalProduction.value();
                    model.TotalPicks = _form.TotalPicks.value();
                    //model.ActualPicks = _form.ActualPicks.value();
                    //model.PicksDiff = _form.PicksDiff.value();
                    model.MCEfficiency = _form.MCEfficiency.value();
                    model.GaraYarn = _form.GaraYarn.value();
                    model.Remarks = _form.Remarks.val();
                    model.FitterName = _form.Fitter.text();
                    model.FitterCode = _form.Fitter.value();
                    model.RunTime1 = _form.RuntimeMM.value();
                    model.UCode = _form.Unit.value();
                    model.UName = _form.Unit.text();
                    model.ProdEfficiency = '';
                    model.OCode = _form.Operator.value();
                    model.OName = _form.Operator.text();
                    model.Constraction = '';
                    model.ShiftCode = '';
                    model.Shift = '';
                    model.WorkerShift = '';
                    model.UserName = '';
                    model.EDate = '';
                    model.GConstraction = '';
                    model.FConstraction = '';
                    model.Width = '';
                    model.Weave = '';
                    model.Colour = '';
                    model.RunTime2 = '';
                    model.ShortLength = '';
                    return model;
                }
                this.setFormData = function (model) {
                    _production.clearFormData();
                    _form.WIID.val(model.WIID);
                    _form.WID.val(model.WID);
                    _form.Loom.value(model.Loom);
                    _form.Lineman.value(model.LineManName);
                    _form.Operator.value(model.OName);
                    _form.SetNo.value(model.SetNo);
                    _form.SSNo.value(model.SL);
                    _form.BeamNo.value(model.Flange);
                    _form.Style.value(model.StyleNo);
                    _form.WarpStop.value(model.WarpStop);
                    _form.WarpCmpx.value(model.WarpCmpx);
                    _form.WeftStop.value(model.WeftStop);
                    _form.WeftCmpx.value(model.WeftCmpx);
                    _form.OtherStop.value(model.OtherStop);
                    _form.RPM.value(model.RPM);
                    _form.RunTime.value(kendo.toString(model.RunTime, "hh:mm"));
                    _form.TotalProduction.value(model.TotalProd);
                    _form.TotalPicks.value(model.TotalPicks);
                    //_form.ActualPicks.value(model.);
                    //_form.PicksDiff.value(model.);
                    _form.MCEfficiency.value(model.MCEfficiency);
                    _form.GaraYarn.value(model.GaraYarn);
                    _form.Remarks.val(model.Remarks);
                    _form.Fitter.value(model.FitterName);
                    _form.RuntimeMM.value(model.RunTime1);
                    _form.Unit.value(model.UName);
                }
                this.clearFormData = function () {
                    _form.WID.val('');
                    _form.WIID.val('');
                    _form.Loom.value('');
                    _form.Lineman.value('');
                    _form.Operator.value('');
                    _form.SetNo.value('');
                    _form.SSNo.value('');
                    _form.BeamNo.value('');
                    _form.Style.value('');
                    _form.WarpStop.value('');
                    _form.WarpCmpx.value('');
                    _form.WeftStop.value('');
                    _form.WeftCmpx.value('');
                    _form.OtherStop.value('');
                    _form.RPM.value('');
                    _form.RunTime.value('');
                    _form.TotalProduction.value('');
                    _form.TotalPicks.value('');
                    _form.ActualPicks.value('');
                    _form.PicksDiff.value('');
                    _form.MCEfficiency.value('');
                    _form.GaraYarn.value('');
                    _form.Remarks.val('');
                    _form.Fitter.value('');
                    _form.RuntimeMM.value('');
                    _form.Unit.value('');
                }
                this.grid = new function () {
                    var _grid = this;
                    this.getColumns = function () {
                        return [
                            { width: '100px', field: "WIID", hidden: true },
                            { width: '100px', field: "WID", hidden: true },
                            { width: '100px', field: "", headerTemplate: '<div style="text-align:center;"><span class="glyphicon glyphicon-tasks"></span></div>', width: "30px", template: '<div class="wpdf-grid-edit-button"><span class="glyphicon glyphicon-edit"></span></div>' },
                            { width: '100px', field: "Loom", title: "LoomNo", template: "<span style='padding:4px 5px;'>#:Loom?Loom:''#</span>" },
                            { width: '100px', field: "OName", title: "Operator", template: "<span style='padding:4px 5px;'>#:OName?OName:''#</span>" },
                            { width: '100px', field: "LineManName", title: "Lineman", template: "<span style='padding:4px 5px;'>#:LineManName?LineManName:''#</span>" },
                            { width: '100px', field: "SetNo", title: "SetNo", template: "<span style='padding:4px 5px;'>#:SetNo?SetNo:''#</span>" },
                            { width: '100px', field: "SL", title: "SS No", template: "<span style='padding:4px 5px;'>#:SL?SL:''#</span>" },
                            { width: '100px', field: "Flange", title: "Beam No", template: "<span style='padding:4px 5px;'>#:Flange?Flange:''#</span>" },
                            { width: '100px', field: "StyleNo", title: "StyleNo", template: "<span style='padding:4px 5px;'>#:StyleNo?StyleNo:''#</span>" },
                            { width: '100px', field: "WarpStop", title: "WarpStop", template: "<span style='padding:4px 5px;'>#:WarpStop?WarpStop:''#</span>" },
                            { width: '100px', field: "WarpCmpx", title: "WarpCmp", template: "<span style='padding:4px 5px;'>#:WarpCmpx?WarpCmpx:''#</span>" },
                            { width: '100px', field: "WeftStop", title: "WeftStop", template: "<span style='padding:4px 5px;'>#:WeftStop?WeftStop:''#</span>" },
                            { width: '100px', field: "WeftCmpx", title: "WeftCmp", template: "<span style='padding:4px 5px;'>#:WeftCmpx?WeftCmpx:''#</span>" },
                            { width: '100px', field: "OtherStop", title: "OtherStop", template: "<span style='padding:4px 5px;'>#:OtherStop?OtherStop:''#</span>" },
                            { width: '100px', field: "RPM", title: "RPM", template: "<span style='padding:4px 5px;'>#:RPM?RPM:''#</span>" },
                            { width: '100px', field: "RunTime", title: "Runtime", template: "<span style='padding:4px 5px;'>#:RunTime?kendo.toString(RunTime,'hh:mm'):''#</span>" },
                            { width: '100px', field: "TotalProd", title: "TotalProd", template: "<span style='padding:4px 5px;'>#:TotalProd?TotalProd:''#</span>" },
                            { width: '100px', field: "TotalPicks", title: "TotalPicks", template: "<span style='padding:4px 5px;'>#:TotalPicks?TotalPicks:''#</span>" },
                            //{ field: "ActualPicks", title: "ActualPicks", template: "<span style='padding:4px 5px;'>#:ActualPicks?ActualPicks:''#</span>"  }, 
                            //{ field: "PicksDiff", title: "PicksDiff.", template: "<span style='padding:4px 5px;'>#:PicksDiff?PicksDiff:''#</span>"  }, 
                            { width: '100px', field: "MCEfficiency", title: "M/C Eff.", template: "<span style='padding:4px 5px;'>#:MCEfficiency?MCEfficiency:''#</span>" },
                            { width: '100px', field: "GaraYarn", title: "GaraYarn", template: "<span style='padding:4px 5px;'>#:GaraYarn?GaraYarn:''#</span>" },
                            { width: '100px', field: "Remarks", title: "Remarks", template: "<span style='padding:4px 5px;'>#:Remarks?Remarks:''#</span>" },
                            { width: '100px', field: "FitterName", title: "FitterName", template: "<span style='padding:4px 5px;'>#:FitterName?FitterName:''#</span>" },
                            { width: '100px', field: "RunTime1", title: "Runtime(MM)", template: "<span style='padding:4px 5px;'>#:RunTime1?RunTime1:''#</span>" },
                            { width: '100px', field: "UName", title: "UName", template: "<span style='padding:4px 5px;'>#:UName?UName:''#</span>" },
                        ];
                    };
                    this.getDataSource = function (model) {
                        if (model.wID) {
                            return new kendo.data.DataSource({
                                transport: {
                                    read: {
                                        url: "../WeavingProduction/GetProductionDetail?wID=" + model.wID,
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8"
                                    }
                                },
                                schema: {
                                    model: {
                                        fields: {
                                            RunTime: {
                                                type: "date",
                                                template: '#= kendo.toString("hh:mm") #',
                                                editable: false
                                            }
                                        }
                                    }

                                }
                            });
                        }
                    }
                    this.init = function () {
                        return $("#wpdProductionGrid").kendoGrid({
                            selectable: "row",
                            columns: _grid.getColumns()
                        }).data("kendoGrid");
                    }
                };
                this.init = function () {
                    _form.WIID = $("#wProductionWIID");
                    _form.WID = $("#wProductionWID");
                    _form.Loom = HdlCommonHelper.comboBox("wpdpfLoomName", {
                        dataTextField: "MName",
                        dataValueField: "MID",
                        template: "<div><div style='width:50%;display:inline-block;'>#:MName#</div><div style='width:45%;display:inline-block;'>#:MNo#</div></div>",
                    });
                    _form.Lineman = HdlCommonHelper.comboBox("wpdpfLinemanName", {
                        dataTextField: "Name",
                        dataValueField: "CardNo",
                        dataSource: that.service.getAllProductionLineman()
                    });
                    _form.Operator = HdlCommonHelper.comboBox("wpdpfOperatorName", {
                        dataTextField: "Name",
                        dataValueField: "CardNo",
                        cascade: function (e) {
                            console.log(this);
                        },
                        dataSource: that.service.getAllProductionOperator()
                    });
                    _form.SetNo = HdlCommonHelper.comboBox("wpdpfSetNo", {
                        dataTextField: "SetNo",
                        dataValueField: "SetNo1",
                        change: function () {
                            var model = this.dataItem(this.select());
                            _form.Style.value(model.StyleNo);
                        },
                        dataSource: that.service.getAllProductionSetNo()
                    });
                    _form.SSNo = HdlCommonHelper.comboBox("wpdpfSSNo", {
                        index: -1,
                        dataTextField: "SSNo",
                        dataValueField: "SetNo",
                        cascadeFrom: "wpdpfSetNo",
                        dataSource: that.service.getAllProductionSLNo(),
                        change: function () {

                        }
                    });
                    _form.BeamNo = HdlCommonHelper.comboBox("wpdpfBeamNo", {
                        index: -1,
                        dataTextField: "BeamNo",
                        dataValueField: "SetNo",
                        cascadeFrom: "wpdpfSetNo",
                        dataSource: that.service.getAllProductionBeamNo(),
                        change: function () {

                        }
                    });
                    _form.Style = HdlCommonHelper.comboBox("wpdpfStyleNo", {
                        dataTextField: "StyleNo",
                        dataValueField: "StyleCode",
                        dataSource: that.service.getAllProductionStyleNo()
                    });
                    _form.WarpStop = $("#wpdpfWarpStop").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.WarpCmpx = $("#wpdpfWarpCmpx").kendoNumericTextBox().data("kendoNumericTextBox");
                    _form.WeftStop = $("#wpdpfWeftStop").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.WeftCmpx = $("#wpdpfWeftCmpx").kendoNumericTextBox().data("kendoNumericTextBox");
                    _form.OtherStop = $("#wpdpfOtherStop").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.RPM = $("#wpdpfRPM").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.RunTime = $("#wpdpfRunTime").kendoNumericTextBox().data("kendoNumericTextBox");
                    _form.TotalProduction = $("#wpdpfTotalProduction").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.TotalPicks = $("#wpdpfTotalPicks").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.ActualPicks = $("#wpdpfActualPicks").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.PicksDiff = $("#wpdpfPicksDiff").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.MCEfficiency = $("#wpdpfMCEfficiency").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.GaraYarn = $("#wpdpfGaraYarn").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.Remarks = $("#wpdpfRemarks");
                    _form.Fitter = HdlCommonHelper.comboBox("wpdpfFitterName", {
                        dataTextField: "Name",
                        dataValueField: "CardNo",
                        dataSource: that.service.getAllProductionFitter(),
                    });
                    _form.RuntimeMM = $("#wpdpfRuntimeMM").kendoNumericTextBox({ format: "n0" }).data("kendoNumericTextBox");
                    _form.Unit = HdlCommonHelper.GenerateUnitCombo("wpdpfUnitName");
                    $("#wpdpfSave").click(function () {
                        _production.saveData();
                    });
                    $("#wpdpfClear").click(function () {
                        _production.clearFormData();
                    }); //wpdf-grid-edit-button
                    $(document).on("click", ".wpdf-grid-edit-button", function (e) {
                        var grid = $("#wpdProductionGrid").data("kendoGrid");
                        var selected = grid.dataItem(grid.select());
                        _production.edit(selected);
                    });
                    _production.grid.init();
                };
            };
            this.fitter = new function () {
                this.init = function () {

                };
            };
            this.lineman = new function () {
                this.init = function () {

                };
            };
            this.init = function () {
                _details.master.init();
                _details.production.init();
                _details.fitter.init();
                _details.lineman.init();
                HdlCommonHelper.GenerateTabStrip("tabstrip");
                $("#wdSave").click(function () {
                    $("#wProductionSummary").show();
                    $("#wProductionDetails").hide();
                    _details.master.clearFormData();
                    _details.production.clearFormData();
                    var grid = $("#wpdProductionGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                        data: []
                    }));
                });
                $("#wdClear").click(function () {
                    _details.master.clearFormData();
                    _details.production.clearFormData();
                    var grid = $("#wpdProductionGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                        data:[]
                    }));
                });
                $("#wdClose").click(function () {
                    $("#wProductionSummary").show();
                    $("#wProductionDetails").hide();
                    _details.master.clearFormData();
                    _details.production.clearFormData();
                    var grid = $("#wpdProductionGrid").data("kendoGrid").setDataSource(new kendo.data.DataSource({
                        data: []
                    }));
                });
            };
        };
        this.init = function () {
            that.summary.init();
            that.details.init();
        };
    };
    wProduction.init();
});