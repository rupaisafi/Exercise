$(function () {
    var dataService = new function () {
        var self = this;
        this.getNextId = function (success) {
            return parseInt(Math.ceil(Math.random() * 10000));
            $.ajax({
                method: "POST",
                url: "../WarpLapper/GetWarpingBySetNo?setNo=" + model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.getYarnDyeMaster = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../WarpLapper/GetWarpingBySetNo?setNo=" + model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.getYarnDyeDetail = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/GetDyeingProcessInfo?setNo=" + model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveYarnDyeingInfo = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../YarnDyeing/SaveYarnDyeingInfo",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };

    };
    var yarnSummary = new function () {
        var self = this;
        this.edit = function () {
            var selected = self.grid.dataItem(self.grid.select());
            yarnDyeMaster.setFormData(selected);
            yarnDyeDetail.setDataSource(selected.DID);

            $("#divSummary").hide();
            $("#divAddOrEdit").show();
        };
        this.getColumns = function () {

            return [
                { field: "DID", title: "DID" },
                { field: "DyeDate", title: "ProdDate", template: '#=kendo.toString(DyeDate,"dd-MMM-yyyy")#' },
                { field: "MCNo", title: "MCNo" },
                { field: "PType", title: "ProdType" },
                { field: "Remarks", title: "Remarks" },
                { field: "Edit", title: "Edit/View", width: "50px", template: '<button type="button" class="btn btn-default btn-sm info-grid-edit-button" value="Edit" id="btnEdit"><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
            ]
        };
        this.setDataSource = function (dateFrom, dateTo) {
            var dataSource = self.getDataSource(dateFrom, dateTo);
            self.grid.setDataSource(dataSource);
        }
        this.getDataSource = function (dateFrom, dateTo) {

            return new kendo.data.DataSource({
                type: "json",
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                allowUnsort: true,
                pageSize: 10,
                transport: {
                    read: {
                        url: "../YarnDyeing/GetDyeingYarnSummary?dateFrom=" + dateFrom + "&dateTo=" + dateTo, type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options) {
                        return JSON.stringify(options);
                    }
                },
                schema: {
                    data: "Items", total: "TotalCount",
                    model: {
                        fields: {
                            DyeDate: {
                                type: "date",
                                template: '#= kendo.toString("dd-MMM-yyyy") #',
                                editable: false
                            }
                        }
                    }

                }
            });
        }
        this.grid = $("#grdDyeingYarnSummary").kendoGrid({
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: false,
            sortable: true,
            columns: self.getColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
            change: function (e) {
                console.log(e)
            }
        }).data("kendoGrid");
        this.dateChange = function () {
            var dateFrom = kendo.toString($("#txtSearchDateFrom").data("kendoDatePicker").value(), "yyyy-MM-dd");
            var dateTo = kendo.toString($("#txtSearchDateTo").data("kendoDatePicker").value(), "yyyy-MM-dd");
            self.setDataSource(dateFrom, dateTo);
        };
        this.init = function () {
            var date = new Date();
            $("#txtSearchDateFrom").kendoDatePicker({
                format: "dd-MMM-yyyy",
                value: new Date(date.getFullYear(), date.getMonth(), 1)
            }).data("kendoDatePicker").bind("change", function () {
                self.dateChange();
            });
            $("#txtSearchDateTo").kendoDatePicker({
                format: "dd-MMM-yyyy",
                value: new Date(date.getFullYear(), date.getMonth(), date.getDate())
            }).data("kendoDatePicker").bind("change", function () {
                self.dateChange();
            });
            $("#ydsNew").click(function () {
                $("#divSummary").hide();
                $("#divAddOrEdit").show();
            });
            $(document).on("click", ".info-grid-edit-button", function (e) {
                self.edit();
            })
            var dateFrom = kendo.toString($("#txtSearchDateFrom").data("kendoDatePicker").value(), "yyyy-MM-dd");
            var dateTo = kendo.toString($("#txtSearchDateTo").data("kendoDatePicker").value(), "yyyy-MM-dd");
            self.setDataSource(dateFrom, dateTo);
        };
    };
    var yarnDyeMaster = new function () {
        var self = this;
        this.clearForm = function () {
            $("#DID").val(''),
                $("#yiProdDate").data("kendoDatePicker").value('')
            $("#yiMCNo").data("kendoComboBox").value('')
            $("#yiProdType").data("kendoComboBox").value('')
            $("#yiRemark").val('')
        };
        this.getFormData = function () {
            return {
                DID: $("#DID").val(),
                DyeDate: kendo.toString($("#yiProdDate").data("kendoDatePicker").value(), "yyyy-MM-dd"),
                MCCode: $("#yiMCNo").data("kendoComboBox").value(),
                MCNo: $("#yiMCNo").data("kendoComboBox").text(),
                PTCode: $("#yiProdType").data("kendoComboBox").value(),
                PType: $("#yiProdType").data("kendoComboBox").text(),
                Remarks: $("#yiRemark").val()
            }
        };
        this.setFormData = function (model) {
            $("#DID").val(model.DID);
            $("#yiProdDate").data("kendoDatePicker").value(model.DyeDate);
            $("#yiMCNo").data("kendoComboBox").value(model.MCNo);
            $("#yiProdType").data("kendoComboBox").value(model.PType);
            $("#yiRemark").val(model.Remarks);
        };
        this.saveYarnDyeInfo = function (success) {
            var model = self.getFormData();
            dataService.saveYarnDyeInfo(model, success);
        };
        this.init = function () {
            HdlCommonHelper.GenerateDatePicker("yiProdDate");
            HdlCommonHelper.GenerateMcNoCombo("yiMCNo", { gCode: 23 });
            HdlCommonHelper.GenerateProdTypeCombo("yiProdType");
            self.clearForm();
            dataService.getNextId(function (res) {
                $("#yiIDNo").val(res.IDNo);
            });
        };
    };
    var yarnDyeDetail = new function () {
        var self = this;
        this.setDataSource = function (dID) {
            if (dID) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../YarnDyeing/GetDyeingYarnDetail?dID=" + dID
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                                PDate: {
                                    type: "date",
                                    template: '#=kendo.toString("dd-MM-yyyy")#',
                                    editable: false
                                }
                            }
                        },
                        data: function (res) {
                            for (var i in res) {
                                res[i].UIID = kendo.guid();
                            }
                            console.log(res);
                            return res;
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.clearDataSource = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                pageSize: 10,
                data: []
            }));
        };
        this.getColumns = function () {
            return [
                { field: "DIID", hidden: true },
                { field: "DID", hidden: true },
                { field: "SetNo", title: "SetNo" },
                { field: "BeamNo", title: "BeamNo", },
                { field: "YName", title: "YarnName", width: "150px" },
                { field: "YCount", title: "YarnCount"},
                { field: "BeamLength", title: "BeamLength" },
                { field: "EndsBeam", title: "EndsBeam" },
                { field: "BeamWeight", title: "BeamWeight" },
                //{ field: "Weight", title: "Weight" },
                { field: "ProdCone", title: "ProdCone" },
                { field: "ShiftName", title: "Shift" },
                { field: "MPM", title: "MPM" },
                { field: "Tension", title: "Tension" },
                { field: "OPName", title: "Operator" },
                { field: "PackingManName", title: "Packager" },
                //{ field: "STime", title: "STime" },
                //{ field: "FTime", title: "FTime" },
                //{ field: "TTime", title: "TTime" },
                //{ field: "Breakge", title: "Breakage" },
                //{ field: "LooseEnds", title: "LooseEnds" },
                //{ field: "Crossing", title: "Crossing" },
                //{ field: "Lapper", title: "Lapper" },
                { field: "Knotting", title: "Knotting" },
                { field: "Remarks", title: "Remark" },
                { field: "Edit", title: "Edit/View", width: "50px", template: '<button type="button" class="btn btn-default btn-sm detail-grid-edit-button" value="Edit" id="btnEdit"><span class="glyphicon glyphicon-edit"></span></button>', sortable: false },
            ]
        };
        this.clearForm = function () {
            $("#DIID").val('')
            $("#ydSetNo").data("kendoComboBox").value('')
            $("#ydBeamNo").data("kendoNumericTextBox").value('')
            $("#ydYarnName").data("kendoComboBox").value('')
            $("#ydYarnCount").val('');
            $("#ydBeamLength").data("kendoNumericTextBox").value('')
            $("#ydEndsBeam").data("kendoNumericTextBox").value('')
            $("#ydBeamWeight").data("kendoNumericTextBox").value('')
            $("#ydWeight").data("kendoNumericTextBox").value('')
            $("#ydProdCone").data("kendoNumericTextBox").value('')
            $("#ydShift").data("kendoComboBox").value('')
            $("#ydMPM").data("kendoNumericTextBox").value('')
            $("#ydTension").data("kendoNumericTextBox").value('')
            $("#ydOperator").val('');
            $("#ydPackager").data("kendoComboBox").value('')
            $("#ydStartTime").data("kendoNumericTextBox").value('')
            $("#ydFinishTime").data("kendoNumericTextBox").value('')
            $("#ydTotalTime").data("kendoNumericTextBox").value('')
            $("#ydBreakage").data("kendoNumericTextBox").value('')
            $("#ydLooseEnds").data("kendoNumericTextBox").value('')
            $("#ydCrossing").data("kendoNumericTextBox").value('')
            $("#ydLapper").data("kendoNumericTextBox").value('')
            $("#ydKnotting").data("kendoNumericTextBox").value('')
            $("#ydRemark").val('');
        };
        this.getFormData = function () {
            return {
                UIID: $("#UIID").val(),
                DIID: $("#DIID").val(),
                DID: $("#DID").val(),
                SetNo: $("#ydSetNo").data("kendoComboBox").value(),
                BeamNo: $("#ydBeamNo").data("kendoNumericTextBox").value(),
                YName: $("#ydYarnName").data("kendoComboBox").text(),
                YCode: $("#ydYarnName").data("kendoComboBox").value(),
                YCount: $("#ydYarnCount").val(),
                BeamLength: $("#ydBeamLength").data("kendoNumericTextBox").value(),
                EndsBeam: $("#ydEndsBeam").data("kendoNumericTextBox").value(),
                BeamWeight: $("#ydBeamWeight").data("kendoNumericTextBox").value(),
                Weight: $("#ydWeight").data("kendoNumericTextBox").value(),
                ProdCone: $("#ydProdCone").data("kendoNumericTextBox").value(),
                ShiftName: $("#ydShift").data("kendoComboBox").text(),
                ShiftCode: $("#ydShift").data("kendoComboBox").value(),
                MPM: $("#ydMPM").data("kendoNumericTextBox").value(),
                Tension: $("#ydTension").data("kendoNumericTextBox").value(),
                OPName: $("#ydOperator").data("kendoComboBox").text(),
                OPCode: $("#ydOperator").data("kendoComboBox").value(),
                PackingManName: $("#ydPackager").data("kendoComboBox").text(),
                PackingManCode: $("#ydPackager").data("kendoComboBox").value(),
                STime: $("#ydStartTime").data("kendoNumericTextBox").value(),
                FTime: $("#ydFinishTime").data("kendoNumericTextBox").value(),
                TTime: $("#ydTotalTime").data("kendoNumericTextBox").value(),
                Breakge: $("#ydBreakage").data("kendoNumericTextBox").value(),
                LooseEnds: $("#ydLooseEnds").data("kendoNumericTextBox").value(),
                Crossing: $("#ydCrossing").data("kendoNumericTextBox").value(),
                Lapper: $("#ydLapper").data("kendoNumericTextBox").value(),
                Knotting: $("#ydKnotting").data("kendoNumericTextBox").value(),
                Remarks: $("#ydRemark").val()
            }
        };
        this.setFormData = function (model) {
            if (model) {
                $("#UIID").val(model.UIID);
                $("#DIID").val(model.DIID);
                $("#ydSetNo").data("kendoComboBox").value(model.SetNo)
                $("#ydBeamNo").data("kendoNumericTextBox").value(model.BeamNo)
                $("#ydYarnName").data("kendoComboBox").value(model.YName)
                $("#ydYarnCount").val(model.YCount);
                $("#ydBeamLength").data("kendoNumericTextBox").value(model.BeamLength)
                $("#ydEndsBeam").data("kendoNumericTextBox").value(model.EndsBeam)
                $("#ydBeamWeight").data("kendoNumericTextBox").value(model.BeamWeight)
                $("#ydWeight").data("kendoNumericTextBox").value(model.Weight)
                $("#ydProdCone").data("kendoNumericTextBox").value(model.ProdCone)
                $("#ydShift").data("kendoComboBox").value(model.ShiftName)
                $("#ydMPM").data("kendoNumericTextBox").value(model.MPM)
                $("#ydTension").data("kendoNumericTextBox").value(model.Tension)
                $("#ydOperator").data("kendoComboBox").value(model.OPName);
                $("#ydPackager").data("kendoComboBox").value(model.PackingManName)
                $("#ydStartTime").data("kendoNumericTextBox").value(model.STime)
                $("#ydFinishTime").data("kendoNumericTextBox").value(model.FTime)
                $("#ydTotalTime").data("kendoNumericTextBox").value(model.TTime)
                $("#ydBreakage").data("kendoNumericTextBox").value(model.Breakge)
                $("#ydLooseEnds").data("kendoNumericTextBox").value(model.LooseEnds)
                $("#ydCrossing").data("kendoNumericTextBox").value(model.Crossing)
                $("#ydLapper").data("kendoNumericTextBox").value(model.Lapper)
                $("#ydKnotting").data("kendoNumericTextBox").value(model.Knotting)
                $("#ydRemark").val(model.Remarks);
            }
            
        };
        this.saveYarnDyeDetail = function () {
            var validator = $("#divDetailInfoForm").kendoValidator().data("kendoValidator");
            if (validator.validate()) {
                var model = self.getFormData();
                var data = self.grid.dataSource.data();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].UIID === model.UIID) {
                        data[i] = model;
                        self.grid.setDataSource(new kendo.data.DataSource({
                            data: data,
                        }))
                    } else {
                        model.UIID = kendo.guid();
                        self.grid.dataSource.add(model);
                    }
                }
            } else {
                AjaxManager.MsgBox('warning', "center", 'Warning:', "Please fill all the required field!",
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }

        };
        this.grid = $("#wdGrid").kendoGrid({
            pageable: false,
            selectable: "row",
            change: function () {

            },
            columns: self.getColumns()
        }).data("kendoGrid");
        this.init = function () {
            HdlCommonHelper.GenerateSetNoCombo("ydSetNo");
            $("#ydBeamNo").kendoNumericTextBox();

            $("#ydYarnName").kendoComboBox({
                cascadeFrom: "ydSetNo",
                placeholder: "--- Select ---",
                dataTextField: "Text2",
                dataValueField: "Text3",
                suggest: true,
                filter: "contains",
                change: function () {
                    var value = this.value();
                    if (value > 0) {
                        var model = this.dataItem(this.select());
                        $("#ydYarnCount").val(model.Text4);
                    } else {
                        $("#ydYarnCount").val('');
                    }
                    AjaxManager.isValidItem("ydYarnName", true);
                },
                dataSource: {
                    type: "json",
                    serverFiltering: true,
                    transport: {
                        read: {
                            type: "POST",
                            url: "../Common/GetAllYarnName/"
                        }
                    },
                    schema: {
                        data: function (res) {
                            res.unshift({ Text2: "---Select---", Text3: 0 });
                            return res;
                        }
                    }
                }
            });

            $("#ydYarnCount");
            $("#ydBeamLength").kendoNumericTextBox();
            $("#ydEndsBeam").kendoNumericTextBox();
            $("#ydBeamWeight").kendoNumericTextBox();
            $("#ydWeight").kendoNumericTextBox();
            $("#ydProdCone").kendoNumericTextBox();
            HdlCommonHelper.GenerateShiftCombo("ydShift");
            $("#ydMPM").kendoNumericTextBox();
            $("#ydTension").kendoNumericTextBox();
            HdlCommonHelper.YarnDyeOPCombo("ydOperator");
            HdlCommonHelper.YarnDyeOPCombo("ydPackager");
            $("#ydStartTime").kendoNumericTextBox();
            $("#ydFinishTime").kendoNumericTextBox();
            $("#ydTotalTime").kendoNumericTextBox();
            $("#ydBreakage").kendoNumericTextBox();
            $("#ydLooseEnds").kendoNumericTextBox();
            $("#ydCrossing").kendoNumericTextBox();
            $("#ydLapper").kendoNumericTextBox();
            $("#ydKnotting").kendoNumericTextBox();
            $("#ydRemark");
            $("#ydNew").click(function () {
                self.clearForm();
            });
            $("#ydSave").click(function () {
                self.saveYarnDyeDetail();
                self.clearForm();
            });
            $(document).on("click", ".detail-grid-edit-button", function () {
                var model = self.grid.dataItem(self.grid.select());
                self.setFormData(model);
            })
            self.clearForm();
        };
    };
    var yarnDye = new function () {
        var that = this;
        this.init = function () {
            $("#ydInfoNew").click(function () {
                yarnDyeMaster.clearForm();
                yarnDyeDetail.clearForm();
                $("#divAddOrEdit").show();
            });
            $("#ydInfoSave").click(function () {
                var model = {};
                model.dyeingYarn = yarnDyeMaster.getFormData();
                model.dyeingYarnDetail = JSON.parse(JSON.stringify(yarnDyeDetail.grid.dataSource.data()));
                dataService.saveYarnDyeingInfo(model, function (res) {
                    $("#divSummary").show();
                    $("#divAddOrEdit").hide();
                    yarnDyeMaster.clearForm();
                    yarnDyeDetail.clearForm();
                })
            });
            $("#ydInfoExit").click(function () {
                $("#divSummary").show();
                $("#divAddOrEdit").hide();
                yarnDyeMaster.clearForm();
                yarnDyeDetail.clearForm();
            });
            yarnSummary.init();
            yarnDyeMaster.init();
            yarnDyeDetail.init();

        };
    };
    yarnDye.init();
});



