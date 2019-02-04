angular
    .module("ReKnotting", ["kendo.directives"])
    .controller("rkCtrl", function ($scope) {
        var date = new Date();
        var from = new Date(date.getFullYear(), date.getMonth(), 1);
        var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.view = {
            summary: true,
            detail: false
        };
        $scope.summary = {};
        $scope.summary.search = {};
        $scope.summary.search.formDateOptions = {
            change: function () {
                $scope.summary.grid.setDataSource($scope.summary.search.from, $scope.summary.search.to);
            }
        };
        $scope.summary.search.toDateOptions = {
            change: function () {
                $scope.summary.grid.setDataSource($scope.summary.search.from, $scope.summary.search.to);
            }
        };
        $scope.summary.search.from = kendo.toString(from, "dd-MM-yyyy");
        $scope.summary.search.to = kendo.toString(to, "dd-MM-yyyy");

        $scope.summary.addNew = function () {
            $scope.detail.dataEntry.master.model.SDate = kendo.toString(new Date(), "dd-MMM-yyyy");
            $scope.detail.dataEntry.master.model.DName = '';
            $scope.detail.dataEntry.master.model.UName = '';
            $scope.detail.dataEntry.master.model.Remarks = '';
            $scope.view.detail = true;
            $scope.view.summary = false;
            rk.master.clearFormData();
            rk.detail.clearFormData();
            rk.detail.grid._self.setDataSource(new kendo.data.DataSource({
                type: "json",
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                allowUnsort: true,
                pageSize: 10,
                data: []
            }));
        };
        $scope.detail = {};
        $scope.detail.save = function () {
            $scope.view.detail = true;
            $scope.view.summary = false;
        };
        $scope.detail.clear = function () {
            rk.master.clearFormData();
            rk.detail.clearFormData();
            $scope.view.detail = true;
            $scope.view.summary = false;
        };
        $scope.detail.exit = function () {
            rk.master.clearFormData();
            rk.detail.clearFormData();
            $scope.view.detail = false;
            $scope.view.summary = true;
        };
        $scope.detail.dataEntry = {};
        $scope.detail.dataEntry.master = {};
        $scope.detail.dataEntry.master.faultComboOptions = {
            suggest: true,
            placeholder: "---Select---",
            dataTextField: "FaultName",
            dataValueField: "FaultCode",
            dataSource: {
                transport: {
                    read: {
                        type: "POST",
                        dataType: "json",
                        url: "../Common/GetAllQCFault"
                    }
                }
            },
        };
        $scope.detail.dataEntry.master.unitComboOptions = {
            suggest: true,
            placeholder: "---Select---",
            dataTextField: "Name",
            dataValueField: "Id",
            dataSource: {
                data: [
                    { Id: 1, Name: "Denim-1" },
                    { Id: 2, Name: "Denim-2" },
                    { Id: 3, Name: "Denim-3" },
                    { Id: 4, Name: "OutSource" },
                ]
            },
        };
        $scope.detail.dataEntry.master.model = {
            Date: "",
            Department: "",
            Unit: "",
            Remarks: ""
        };
        $scope.detail.dataEntry.detail = {};
        //summary grid
        $scope.summary.grid = {};
        $scope.summary.kendoGrid = {};
        $scope.summary.grid.columns = function () {
            return [
                { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>', sortable: false, selectable: true },
                { field: "ID", title: "ID", width: "100px" },
                { field: "KDate", title: "Date", template: "#:kendo.toString(KDate,'dd-MMM-yyyy')#", width: "100px" },
                { field: "TCode", title: "Fault Code", width: "150px" },
                { field: "Type", title: "Fault Type", width: "150px" },
                { field: "UCode", title: "UnitCode", width: "100px" },
                { field: "UName", title: "UnitName", width: "120px" },
                { field: "Remarks", title: "Remarks" },
                { field: "TrackDate", title: "TrackDate", template: "#:kendo.toString(TrackDate,'dd-MMM-yyyy')#", width: "120px" },
            ];
        };
        $scope.summary.grid.dataSource = function (from, to) {
            var fromDate = kendo.toString(from, "yyyy-MM-dd");
            var toDate = kendo.toString(to, "yyyy-MM-dd");
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
                        url: "../ReKnotting/GetSummary?from=" + fromDate + "&to=" + toDate,
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
                            KDate: {
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
        };
        $scope.summary.grid.setDataSource = function (from, to) {
            $("#divSummaryGrid").data("kendoGrid").setDataSource($scope.summary.grid.dataSource(from, to));
        };
        $scope.summary.grid.options = {
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
                    rk.master.setFormData(dataItem);
                    rk.detail.clearFormData(dataItem);
                    rk.detail.grid._self.setDataSource(rk.detail.grid.getDataSource(dataItem.ID));
                    $scope.$apply(function () {
                        $scope.view.detail = true;
                        $scope.view.summary = false;
                    });
                });

            },
            columns: $scope.summary.grid.columns(),
            dataSource: $scope.summary.grid.dataSource($scope.summary.search.from, $scope.summary.search.to),
        };

        $scope.detail.grid = {};
        $scope.detail.kendoGrid = {};
        $scope.KDateOption = {
            mask: "00-00-0000",
        };

        var rk = {
            service: {
                getLoomData: function (uCode) {
                    var data = [];
                    jQuery.ajax({
                        async: false,
                        url: "../ReKnotting/GetAllLoom?uCode=" + uCode,
                        dataType: "json",
                        success: function (res) {
                            data = res;
                        },
                        error: function (err) {
                            window.alert(err.statusText);
                        }
                    });
                    return data;
                },
                getSSNoData: function (setNo) {
                    var data = [];
                    jQuery.ajax({
                        async: false,
                        url: "../ReKnotting/GetAllDyeingSSNo?setNo=" + setNo,
                        dataType: "json",
                        success: function (res) {
                            data = res;
                        },
                        error: function (err) {
                            window.alert(err.statusText);
                        }
                    });
                    return data;
                },
            },
            master: {
                form: {
                    ID: $("#rkmID"),
                    KDate: $("#rkmKDate"),
                    UName: $("#rkmUName"),
                    UCode: $("#rkmUCode"),
                    Type: $("#rkmType"),
                    TCode: $("#rkmTCode"),
                    Remarks: $("#rkmRemarks"),
                },
                getFormData: function () {
                    return {
                        ID: rk.master.form.ID.val(),
                        KDate: kendo.toString(rk.master.form.KDate.data("kendoMaskedTextBox").value(), "yyyy-MM-dd"),
                        UName: rk.master.form.UName.data("kendoComboBox").text(),
                        UCode: rk.master.form.UCode.val(),
                        Type: rk.master.form.Type.data("kendoComboBox").value(),
                        TCode: rk.master.form.TCode.val(),
                        Remarks: rk.master.form.Remarks.val(),
                    };
                },
                setFormData: function (model) {
                    rk.master.form.ID.val(model.ID);
                    rk.master.form.KDate.data("kendoMaskedTextBox").value(model.KDate);
                    rk.master.form.UName.data("kendoComboBox").value(model.UName);
                    rk.master.form.UName.data("kendoComboBox").input.trigger("change");
                    rk.master.form.UCode.val(model.UCode);
                    rk.master.form.Type.data("kendoComboBox").value(model.Type);
                    rk.master.form.TCode.val(model.TCode);
                    rk.master.form.Remarks.val(model.Remarks);
                    rk.detail.form.Loom.data("kendoComboBox").setDataSource(new kendo.data.DataSource({
                        data: rk.service.getLoomData(model.UCode)
                    }));
                },
                clearFormData: function () {
                    rk.master.form.ID.val('');
                    rk.master.form.KDate.data("kendoMaskedTextBox").value('');
                    rk.master.form.UName.data("kendoComboBox").value('');
                    rk.master.form.UCode.val('');
                    rk.master.form.Type.data("kendoComboBox").value('');
                    rk.master.form.TCode.val('');
                    rk.master.form.Remarks.val('');
                },
                init: function () {
                    rk.master.form.KDate.kendoMaskedTextBox({
                        mask: "00-00-0000",
                    });
                    rk.master.form.KDate.kendoDatePicker({
                        format: "dd-MM-yyyy",
                    });
                    rk.master.form.KDate.closest(".k-datepicker").add(rk.master.form.KDate).removeClass("k-textbox")
                    rk.master.form.KDate.bind("keypress", function (e) {
                        if (e.keyCode === 13) {
                            rk.master.form.UName.data("kendoComboBox").open();
                            rk.master.form.UName.data("kendoComboBox").focus();
                            rk.master.form.UName.data("kendoComboBox").input.select();
                        }
                    });
                    rk.master.form.UName.kendoComboBox({
                        animation: false,
                        dataTextField: "UnitName",
                        dataValueField: "UnitCode",
                        dataSource: {
                            serverFiltering: true,
                            transport: {
                                read: {
                                    type: "POST",
                                    url: "../Common/GetAllUnit/"
                                }
                            }
                        },
                        change: function () {
                            var value = this.value();
                            if (value) {
                                rk.detail.form.Loom.data("kendoComboBox").setDataSource(new kendo.data.DataSource({
                                    data: rk.service.getLoomData(value)
                                }));
                            } else {
                                rk.detail.form.Loom.data("kendoComboBox").setDataSource(new kendo.data.DataSource({
                                    data: []
                                }));
                            }
                            $("#rkmUCode").val(value);
                        }
                    });
                    rk.master.form.UName.data("kendoComboBox").input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            window.setTimeout(function () {
                                rk.master.form.Type.data("kendoComboBox").open();
                                rk.master.form.Type.data("kendoComboBox").focus();
                                rk.master.form.Type.data("kendoComboBox").input.select();
                            })
                        }
                    });
                    rk.master.form.Type.kendoComboBox({
                        animation: false,
                        dataTextField: "FaultName",
                        dataValueField: "FaultCode",
                        dataSource: {
                            transport: {
                                read: {
                                    url: "../Common/GetAllQCFault/"
                                }
                            }
                        },
                        change: function () {
                            var text = this.text();
                            var value = this.value();
                            $("#rkmTCode").val(value);
                        }
                    });
                    rk.master.form.Type.data("kendoComboBox").input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            window.setTimeout(function () {
                                rk.master.form.Remarks.focus();
                                rk.master.form.Remarks.select();
                            });
                        }
                    });
                    rk.master.form.Remarks.bind("keypress", function (e) {
                        if (e.keyCode === 13) {
                            rk.detail.form.Loom.data("kendoComboBox").open();
                            rk.detail.form.Loom.data("kendoComboBox").focus();
                            rk.detail.form.Loom.data("kendoComboBox").input.select();
                        }
                    });
                    rk.master.clearFormData();
                }
            },
            detail: {
                form: {
                    KID: $("rkdKID"),
                    Loom: $("#rkdLoom"),
                    SetNo: $("#rkdSetNo"),
                    SSNo: $("#rkdSSNo"),
                    BeamNo: $("#rkdBeamNo"),
                    StyleNo: $("#rkdStyleNo"),
                    Wastage: $("#rkdWastage"),
                    PO: $("#rkdPO"),
                    Sizer: $("#rkdSizer"),
                    Captain: $("#rkdCaptain"),
                    WarpCount: $("#rkdWarpCount"),
                    SuppLot: $("#rkdSuppLot"),
                    UName: $("#rkdUnit"),
                    Remarks: $("#rkdRemarks"),
                },
                grid: {
                    _self: {},
                    dataSource: function () {
                        return new kendo.data.DataSource({
                            type: "json",
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            allowUnsort: true,
                            pageSize: 10,
                            data: []
                        })
                    },
                    columns: function () {
                        return [
                            { field: "ID", title: "ID", hidden: true },
                            { field: "Loom", title: "Loom", },
                            { field: "SetNo", title: "SetNo", },
                            { field: "SSNo", title: "SSNo", },
                            { field: "BeamNo", title: "BeamNo", },
                            { field: "StyleNo", title: "StyleNo", },
                            { field: "Wastage", title: "Wastage", },
                            { field: "PO", title: "PO", },
                            { field: "Sizer", title: "Sizer", },
                            { field: "Captain", title: "Captain", },
                            { field: "WarpCount", title: "WarpCount", },
                            { field: "SuppLot", title: "SuppLot", },
                            { field: "UName", title: "UName", },
                            { field: "Remarks", title: "Remarks", },
                        ]
                    },
                    getDataSource: function (masterId) {
                        if (masterId > 0) {
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
                                        url: "../ReKnotting/GetDetail?masterID=" + masterId,
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
                                            KDate: {
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
                            })
                        } else {
                            return new kendo.data.DataSource({
                                type: "json",
                                serverPaging: true,
                                serverSorting: true,
                                serverFiltering: true,
                                allowUnsort: true,
                                pageSize: 10,
                                data: []
                            })
                        }
                    },
                    setDataSource: function () {
                        rk.detail.grid._self.setDataSource(rk.detail.grid.getDataSource())
                    },
                    clearDataSource: function () {

                    },
                    init: function () {
                        rk.detail.grid._self = $("#divDetailGrid").kendoGrid({
                            columns: rk.detail.grid.columns(),
                            dataSource: rk.detail.grid.dataSource()
                        }).data("kendoGrid");
                    }
                },
                getFormData: function () {
                    return {
                        KID: rk.detail.form.KID.val(),
                        ID: rk.master.form.ID.val(),
                        Loom: rk.detail.form.Loom.data("kendoComboBox").text(),
                        SetNo: rk.detail.form.SetNo.data("kendoComboBox").text(),
                        SSNo: rk.detail.form.SSNo.data("kendoComboBox").text(),
                        BeamNo: rk.detail.form.BeamNo.val(),
                        StyleNo: rk.detail.form.StyleNo.val(),
                        Wastage: rk.detail.form.Wastage.data("kendoNumericTextBox").value(),
                        PO: rk.detail.form.PO.val(),
                        Sizer: rk.detail.form.Sizer.val(),
                        Captain: rk.detail.form.Captain.val(),
                        WarpCount: rk.detail.form.WarpCount.val(),
                        SuppLot: rk.detail.form.SuppLot.val(),
                        UName: rk.detail.form.UName.val(),
                        Remarks: rk.detail.form.Remarks.val(),
                    }
                },
                setFormData: function (model) {
                    rk.detail.form.KID.val(model.KID);
                    rk.master.form.ID.val(model.KID);
                    rk.detail.form.Loom.data("kendoComboBox").value(model.Loom);
                    rk.detail.form.SetNo.data("kendoComboBox").value(model.SetNo);
                    rk.detail.form.SSNo.data("kendoComboBox").value(model.SSNo);
                    rk.detail.form.BeamNo.val(model.BeamNo);
                    rk.detail.form.StyleNo.val(model.StyleNo);
                    rk.detail.form.Wastage.data("kendoNumericTextBox").value(model.Wastage);
                    rk.detail.form.PO.val(model.PO);
                    rk.detail.form.Sizer.val(model.Sizer);
                    rk.detail.form.Captain.val(model.Captain);
                    rk.detail.form.WarpCount.val(model.WarpCount);
                    rk.detail.form.SuppLot.val(model.SuppLot);
                    rk.detail.form.UName.val(model.UName);
                    rk.detail.form.Remarks.val(model.Remarks);
                },
                clearFormData: function () {
                    rk.detail.form.KID.val('');
                    rk.detail.form.Loom.data("kendoComboBox").value('');
                    rk.detail.form.SetNo.data("kendoComboBox").value('');
                    rk.detail.form.SSNo.data("kendoComboBox").value('');
                    rk.detail.form.BeamNo.val('');
                    rk.detail.form.StyleNo.val('');
                    rk.detail.form.Wastage.data("kendoNumericTextBox").value('');
                    rk.detail.form.PO.val('');
                    rk.detail.form.Sizer.val('');
                    rk.detail.form.Captain.val('');
                    rk.detail.form.WarpCount.val('');
                    rk.detail.form.SuppLot.val('');
                    rk.detail.form.UName.val('');
                    rk.detail.form.Remarks.val('');
                },
                init: function () {
                    rk.detail.grid.init();
                    var loomCombo = rk.detail.form.Loom.kendoComboBox({
                        suggest: true,
                        animation: false,
                        dataTextField: "MName",
                        dataValueField: "MNo",
                        dataSource: [],
                        change: function () {
                        }
                    }).data("kendoComboBox");
                    loomCombo.input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            window.setTimeout(function () {
                                setNoCombo.open();
                                setNoCombo.focus();
                                setNoCombo.input.select();
                            }, 10)
                        }
                    });

                    var setNoCombo = rk.detail.form.SetNo.kendoComboBox({
                        suggest: true,
                        animation: false,
                        dataTextField: "SetNo",
                        dataValueField: "SetNo",
                        dataSource: {
                            transport: {
                                read: {
                                    url: "../ReKnotting/GetAllDyeingSetNo",
                                }
                            }
                        },
                        change: function () {
                            var dataItem = this.dataItem(this.selectedIndex);
                            if (dataItem) {
                                rk.detail.form.StyleNo.val(dataItem.StyleNo);
                                rk.detail.form.WarpCount.val(dataItem.WarpCount);
                                rk.detail.form.SuppLot.val(dataItem.ProYarnSupp);
                                rk.detail.form.UName.val(dataItem.UName);
                                if (dataItem.SetNo > 0) {
                                    rk.detail.form.SSNo.data("kendoComboBox").setDataSource(new kendo.data.DataSource({
                                        data: rk.service.getSSNoData(dataItem.SetNo)
                                    }))
                                } else {
                                    rk.detail.form.SSNo.data("kendoComboBox").setDataSource(new kendo.data.DataSource({
                                        data: []
                                    }))
                                }
                            }
                        }
                    }).data("kendoComboBox");
                    setNoCombo.input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            window.setTimeout(function () {
                                ssNoCombo.open();
                                ssNoCombo.focus();
                                ssNoCombo.input.select();
                            }, 10)
                        }
                    });

                    var ssNoCombo = rk.detail.form.SSNo.kendoComboBox({
                        suggest: true,
                        animation: false,
                        cascadeFrom: "rkdSetNo",
                        dataTextField: "SSNo",
                        dataValueField: "SSNo",
                        dataSource: [],
                        change: function () {
                            var dataItem = this.dataItem(this.selectedIndex);
                            if (dataItem) {
                                rk.detail.form.BeamNo.val(dataItem.BeamNo);
                                rk.detail.form.PO.val(dataItem.PO);
                                rk.detail.form.Sizer.val(dataItem.Sizer);
                                rk.detail.form.Captain.val(dataItem.CaptainName);
                            }
                        }
                    }).data("kendoComboBox");
                    ssNoCombo.input.keydown(function (e) {
                        if (e.keyCode === 13) {
                            window.setTimeout(function () {
                                rk.detail.form.Wastage.siblings(".k-formatted-value.k-input").focus();
                                rk.detail.form.Wastage.siblings(".k-formatted-value.k-input").select();
                            }, 10)
                        }
                    });

                    var wastage = rk.detail.form.Wastage.kendoNumericTextBox().data("kendoNumericTextBox");
                    rk.detail.form.Wastage.keydown(function (e) {
                        if (e.keyCode === 13) {
                            rk.saveData(function (res) {
                                if (res.SaveStatus === 'Success') {
                                    rk.master.form.ID.val(res.ID);
                                    rk.detail.form.KID.val(res.DetailID);
                                    rk.detail.clearFormData();
                                } else {
                                    window.alert("An error Occured saving data");
                                }
                            });
                            rk.detail.form.Loom.data("kendoComboBox").open();
                            rk.detail.form.Loom.data("kendoComboBox").focus();
                            rk.detail.form.Loom.data("kendoComboBox").input.select();
                        }
                    });
                    $(".btn-data-entry-detail-save").bind("click", function () {
                        rk.saveData(function (res) {
                            if (res.SaveStatus === 'Success') {
                                rk.master.form.ID.val(res.ID);
                                rk.detail.form.KID.val(res.DetailID);
                                rk.detail.clearFormData();
                            } else {
                                window.alert("An error Occured saving data");
                            }
                        });
                    });
                    $(".btn-data-entry-detail-clear").bind("click", function () {
                        rk.detail.clearFormData();
                    });
                    rk.detail.clearFormData();
                }
            },
            saveData: function (onSuccess) {
                var validator = $(".divDetailWraper").kendoValidator().data("kendoValidator");
                if (validator.validate()) {
                    var model = {};
                    model.master = rk.master.getFormData();
                    model.detail = rk.detail.getFormData();
                    $.ajax({
                        type: "POST",
                        url: "../ReKnotting/SaveData",
                        data: model,
                        dataType: "json",
                        success: onSuccess,
                        error: function (err) {
                            window.alert(err.statusText);
                        }
                    })
                } else {
                    alert("Please Fill all the required field");
                }
            },
            init: function () {
                rk.master.init();
                rk.detail.init();
            }
        };
        rk.init();

    })