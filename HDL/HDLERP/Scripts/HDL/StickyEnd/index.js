

var SE = {
    service: {
        saveStickyEndData: function (model, onSuccess) {
            console.log(model);
            $.ajax({
                type: "POST",
                url: "../StickyEnd/SaveStickyEndData/",
                data: model,
                dataType: "json",
                success: onSuccess,
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
                    { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>', sortable: false, selectable: true },
                    { field: "SID", title: "ID", width: "50px" },
                    { field: "SDate", title: "Date", template: "#:kendo.toString(SDate,'dd-MMM-yyyy')#", width: "120px" },
                    { field: "DCode", title: "DeptCode", width: "80px" },
                    { field: "DName", title: "DeptName", width: "120px" },
                    { field: "UCode", title: "UnitCode", width: "80px" },
                    { field: "UName", title: "UnitName", width: "120px" },
                    { field: "Remarks", title: "Remarks" },
                    { field: "TrackDate", title: "TrackDate", template: "#:kendo.toString(TrackDate,'dd-MMM-yyyy')#", width: "120px" },
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
                            url: "../StickyEnd/GetSummary?from=" + from + "&to=" + to,
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
                SE.summary.grid._self.setDataSource(SE.summary.grid.dataSource(from, to));
            },
            init: function (from, to) {
                SE.summary.grid._self = $("#divSummaryGrid").kendoGrid({
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
                    navigatable: true,
                    selectable: "row",
                    dataBound: function () {
                        var grid = this;
                        grid.tbody.find(".btn-edit-summary").bind("click", function (e) {
                            var dataItem = grid.dataItem($(e.target).closest("tr"));
                            SE.dataEntry.master.setFormData(dataItem);
                            SE.dataEntry.detail.grid.setDataSource(dataItem.SID);
                            SE.summary.hide();
                            SE.dataEntry.show();
                        });
                    },
                    columns: SE.summary.grid.columns(),
                    dataSource: SE.summary.grid.dataSource(from, to),
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
                SE.summary.grid.setDataSource(_from, _to);
            });
            fromDate.bind("change", function () {
                var _from = kendo.toString(fromDate.value(), "dd-MMM-yyyy");
                var _to = kendo.toString(toDate.value(), "dd-MMM-yyyy");
                SE.summary.grid.setDataSource(_from, _to);
            });
            SE.summary.grid.init(kendo.toString(fromDate.value(), "dd-MMM-yyyy"), kendo.toString(toDate.value(), "dd-MMM-yyyy"));
            $('.btn-add-summary').bind("click", function () {
                SE.summary.hide();
                SE.dataEntry.show();
            })
        },
    },
    dataEntry: {
        show: function () {
            $(".divDetailWraper").show();
        },
        hide: function () {
            $(".divDetailWraper").hide();
        },
        master: {
            _form: {},
            setFormData: function (data) {
                SE.dataEntry.master._form.SID.val(data.SID)
                SE.dataEntry.master._form.Date.value(data.Date)
                SE.dataEntry.master._form.DeptCode.value(data.DName)
                SE.dataEntry.master._form.UnitCode.value(data.UName)
                SE.dataEntry.master._form.Remark.val(data.Remarks)
                SE.dataEntry.detail._form.SID.val(data.SID)
            },
            getFormData: function () {
                return {
                    SID: SE.dataEntry.master._form.SID.val(),
                    SDate: SE.dataEntry.master._form.Date.value(),
                    DCode: SE.dataEntry.master._form.DeptCode.value(),
                    DName: SE.dataEntry.master._form.DeptCode.text(),
                    UCode: SE.dataEntry.master._form.UnitCode.value(),
                    UName: SE.dataEntry.master._form.UnitCode.text(),
                    Remarks: SE.dataEntry.master._form.Remark.val()
                };
            },
            clearFormData: function () {
                SE.dataEntry.master._form.SID.val("")
                SE.dataEntry.master._form.Date.value(new Date())
                SE.dataEntry.master._form.DeptCode.value("")
                SE.dataEntry.master._form.UnitCode.value("")
                SE.dataEntry.master._form.Remark.val("")
            },
            init: function () {
                SE.dataEntry.master._form.SID = $("#semID");
                SE.dataEntry.master._form.Date = $("#semDate").kendoDatePicker({
                    format: "dd-MMM-yyyy",
                    value: new Date()
                }).data("kendoDatePicker");
                SE.dataEntry.master._form.DeptCode = $("#semDeptCode").kendoComboBox({
                    placeholder: "--- Select ---",
                    dataTextField: "Name",
                    dataValueField: "Value",
                    dataSource: {
                        data: []
                    }
                }).data("kendoComboBox");
                SE.dataEntry.master._form.UnitCode = $("#semUnitCode").kendoComboBox({
                    placeholder: "--- Select ---",
                    dataTextField: "Name",
                    dataValueField: "Value",
                    dataSource: {
                        data: []
                    }
                }).data("kendoComboBox");
                SE.dataEntry.master._form.Remark = $("#semRemark").addClass("k-input k-textbox");
                SE.dataEntry.master.clearFormData();
            }
        },
        detail: {
            _form: {},
            _grid: {},
            grid: {
                columns: function () {
                    return [
                        { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-detail"><span class="glyphicon glyphicon-edit"></span></div>', sortable: false },
                        { field: "SIID", title: "SIID", hidden: true, editable: false },
                        { field: "SID", title: "SID" },
                        { field: "Loom", title: "Loom" },
                        { field: "SetNo", title: "SetNo" },
                        { field: "StyleNo", title: "StyleNo" },
                        { field: "SSNo", title: "SSNo" },
                        { field: "BeamNo", title: "BeamNo" },
                        { field: "TEnds", title: "TEnds" },
                        { field: "Knott", title: "Knott" },
                        { field: "ByPass1stDay", title: "ByPass1stDay" },
                        { field: "ByPass2ndDay", title: "ByPass2ndDay" },
                        { field: "Remarks", title: "Remarks" },
                        { field: "BeamLength", title: "BeamLength" },
                        { field: "SizingD", title: "SizingD" },
                        { field: "SizingW", title: "SizingW" },
                        { field: "GConstruction", title: "GConstruction" },
                    ]
                },
                setDataSource: function (sID) {
                    SE.dataEntry.detail._grid.setDataSource(new kendo.data.DataSource({
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
                                url: "../StickyEnd/GetDetail?sID=" + sID,
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
                                    SIID: {
                                        type: "number",
                                        editable: false
                                    },
                                    SID: {
                                        type: "number",
                                        editable: false
                                    }
                                }
                            }
                        }
                    }));
                },
                clearDataSource: function () {
                    SE.dataEntry.detail._grid.setDataSource(new kendo.data.DataSource({
                        type: "json",
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        allowUnsort: true,
                        pageSize: 10,
                        data: []
                    }));
                },
                dataSource: function () {
                    return new kendo.data.DataSource({
                        type: "json",
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        allowUnsort: true,
                        pageSize: 10,
                        data: []
                    });
                },
                init: function () {
                    SE.dataEntry.detail._grid = $(".divDetailGrid").kendoGrid({
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
                        navigatable: true,
                        selectable: "row",
                        dataBound: function () {
                            var grid = this;
                            this.tbody.find(".btn-edit-detail").bind("click", function (e) {
                                var dataItem = grid.dataItem($(e.target).closest("tr"));
                                SE.dataEntry.detail.setFormData(dataItem);
                            });
                        },
                        columns: SE.dataEntry.detail.grid.columns(),
                        dataSource: SE.dataEntry.detail.grid.dataSource(),
                    }).data("kendoGrid");
                }
            },
            setFormData: function (data) {
                SE.dataEntry.detail._form.SIID.val(data.SIID);
                SE.dataEntry.detail._form.SID.val(data.SID);
                SE.dataEntry.detail._form.Loom.value(data.Loom);
                SE.dataEntry.detail._form.SetNo.value(data.SetNo);
                SE.dataEntry.detail._form.StyleNo.val(data.StyleNo);
                SE.dataEntry.detail._form.SSNo.value(data.SSNo);
                SE.dataEntry.detail._form.BeamNo.value(data.BeamNo);
                SE.dataEntry.detail._form.TEnds.value(data.TEnds);
                SE.dataEntry.detail._form.Knott.value(data.Knott);
                SE.dataEntry.detail._form.ByPass2ndDay.value(data.ByPass2ndDay);
                SE.dataEntry.detail._form.Remarks.val(data.Remarks);
                SE.dataEntry.detail._form.BeamLength.value(data.BeamLength);
                SE.dataEntry.detail._form.ByPass1stDay.val(data.ByPass1stDay);
                SE.dataEntry.detail._form.SizingD.value(data.SizingD);
                SE.dataEntry.detail._form.SizingW.value(data.SizingW);
                SE.dataEntry.detail._form.GConstruction.val(data.GConstruction);
                SE.dataEntry.detail._form.ShortEnds.val(data.ShortEnds);
            },
            getFormData: function () {
                return {
                    SIID: SE.dataEntry.detail._form.SIID.val(),
                    SID: SE.dataEntry.detail._form.SID.val(),
                    Loom: SE.dataEntry.detail._form.Loom.text(),
                    SetNo: SE.dataEntry.detail._form.SetNo.value(),
                    StyleNo: SE.dataEntry.detail._form.StyleNo.val(),
                    SSNo: SE.dataEntry.detail._form.SSNo.value(),
                    BeamNo: SE.dataEntry.detail._form.BeamNo.value(),
                    TEnds: SE.dataEntry.detail._form.TEnds.value(),
                    Knott: SE.dataEntry.detail._form.Knott.value(),
                    ByPass2ndDay: SE.dataEntry.detail._form.ByPass2ndDay.value(),
                    Remarks: SE.dataEntry.detail._form.Remarks.val(),
                    BeamLength: SE.dataEntry.detail._form.BeamLength.value(),
                    ByPass1stDay: SE.dataEntry.detail._form.ByPass1stDay.val(),
                    SizingD: SE.dataEntry.detail._form.SizingD.value(),
                    SizingW: SE.dataEntry.detail._form.SizingW.value(),
                    GConstruction: SE.dataEntry.detail._form.GConstruction.val(),
                    ShortEnds: SE.dataEntry.detail._form.ShortEnds.val(),
                };
            },
            clearFormData: function () {
                SE.dataEntry.detail._form.SIID.val('');
                SE.dataEntry.detail._form.SID.val('');
                SE.dataEntry.detail._form.Loom.value('');
                SE.dataEntry.detail._form.SetNo.value('');
                SE.dataEntry.detail._form.StyleNo.val('');
                SE.dataEntry.detail._form.SSNo.value('');
                SE.dataEntry.detail._form.BeamNo.value('');
                SE.dataEntry.detail._form.TEnds.value('');
                SE.dataEntry.detail._form.Knott.value('');
                SE.dataEntry.detail._form.ByPass2ndDay.value('');
                SE.dataEntry.detail._form.Remarks.val('');
                SE.dataEntry.detail._form.BeamLength.value('');
                SE.dataEntry.detail._form.ByPass1stDay.val('');
                SE.dataEntry.detail._form.SizingD.value('');
                SE.dataEntry.detail._form.SizingW.value('');
                SE.dataEntry.detail._form.GConstruction.val('');
                SE.dataEntry.detail._form.ShortEnds.val('');
            },
            init: function () {
                SE.dataEntry.detail._form.SIID = $("#sedID");
                SE.dataEntry.detail._form.SID = $("#sedSID");
                SE.dataEntry.detail._form.Loom = $("#sedLoom").kendoComboBox({
                    placeholder: "--- Select ---",
                    dataTextField: "Name",
                    dataValueField: "Value",
                    dataSource: {
                        data: []
                    }
                }).data("kendoComboBox");
                SE.dataEntry.detail._form.SetNo = $("#sedSetNo").kendoComboBox({
                    placeholder: "--- Select ---",
                    dataTextField: "Name",
                    dataValueField: "Value",
                    dataSource: {
                        data: []
                    }
                }).data("kendoComboBox");
                SE.dataEntry.detail._form.StyleNo = $("#sedStyleNo").addClass("k-input k-textbox");//
                SE.dataEntry.detail._form.SSNo = $("#sedSSNo").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.BeamNo = $("#sedBeamNo").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.TEnds = $("#sedTEnds").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.Knott = $("#sedKnott").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.ByPass2ndDay = $("#sedByPass2ndDay").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.Remarks = $("#sedRemarks").addClass("k-input k-textbox");
                SE.dataEntry.detail._form.BeamLength = $("#sedBeamLength").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.ByPass1stDay = $("#sedByPass1stDay").addClass("k-input k-textbox");
                SE.dataEntry.detail._form.SizingD = $("#sedSizingD").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.SizingW = $("#sedSizingW").kendoNumericTextBox({}).data("kendoNumericTextBox");
                SE.dataEntry.detail._form.GConstruction = $("#sedGConstruction").addClass("k-input k-textbox");
                SE.dataEntry.detail._form.ShortEnds = $("#sedShortEnds").addClass("k-input k-textbox");
                SE.dataEntry.detail._form.RSID = $("#sedSID").addClass("k-input k-textbox");
                SE.dataEntry.detail.grid.init();
                $(".btn-data-entry-detail-save").click(function () {
                    var validator = $("#divWraper").kendoValidator().data("kendoValidator");
                    if (validator.validate()) {
                        var model = {};
                        model.stickyEnd = SE.dataEntry.master.getFormData();
                        model.stickyEndDetail = SE.dataEntry.detail.getFormData();

                        SE.service.saveStickyEndData(model, function (res) {
                            console.log(res);
                            if (res.SaveStatus == 'Success') {
                                SE.dataEntry.detail.clearFormData();
                                SE.dataEntry.detail.grid.setDataSource(res.SID);
                            }

                        });
                    }
                });
                $(".btn-data-entry-detail-clear").click(function () {
                    SE.dataEntry.detail.clearFormData();
                });
                SE.dataEntry.detail.clearFormData();
            },
        },
        init: function () {
            $(".btn-data-entry-save").click(function () {
                var model = {
                    stickyEnd: SE.dataEntry.master.getFormData(),
                    stickyEndDetail: SE.dataEntry.detail.getFormData()
                };
                SE.service.saveStickyEndData(model, function (res) {
                    var jsonData = res;
                    SE.dataEntry.hide();
                    SE.summary.show();
                });
            });
            $(".btn-data-entry-clear").click(function () {

            });
            $(".btn-data-entry-close").click(function () {
                SE.dataEntry.master.clearFormData();
                SE.dataEntry.detail.clearFormData();
                SE.dataEntry.detail.grid.clearDataSource();
                SE.dataEntry.hide();
                SE.summary.show();
            })
            SE.dataEntry.master.init();
            SE.dataEntry.detail.init();
        },
    },
    init: function () {
        SE.summary.init();
        SE.dataEntry.init();
    }
};

SE.init();

