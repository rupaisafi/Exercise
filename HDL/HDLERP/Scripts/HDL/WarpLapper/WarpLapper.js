$(function () {
    var dataService = new function () {
        var self = this;
        this.getWarpMaster = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../WarpLapper/GetWarpingBySetNo?setNo=" + model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.getWarpDetail = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/GetDyeingProcessInfo?setNo=" + model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveWarpDetail = function (model, success) {
            console.log(model);
            $.ajax({
                method: "POST",
                url: "../WarpLapper/SaveWarpingDetail",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        }
    };
    var warpMaster = new function () {
        var self = this;
        this.setForm = function (setNo) {
            dataService.getWarpMaster(setNo, function (model) {
                warpDetail.setDataSource(model.IdNo);
                $("#wiIDNo").val(model.IdNo);
                $("#wiPWarpDate").data("kendoDatePicker").value(model.PWarpDate);
                $("#wiWarpLength").val(model.WarpLength);
                $("#wiEndsPerBeam").val(model.EndsPerBeam);
                $("#wiTotalBeam").val(model.TotalBeam);
                $("#wiNoOfBeam").val(model.NoOfBeam);
                $("#wiTotalEnds").val(model.TotalEnds);
            });
        };
        this.clearForm = function () {
            $("#wiIDNo").val('');
            $("#wiPWarpDate").data("kendoDatePicker").value('');
            $("#wiWarpLength").val('');
            $("#wiEndsPerBeam").val('');
            $("#wiTotalBeam").val('');
            $("#wiNoOfBeam").val('');
            $("#wiTotalEnds").val('');
            warpDetail.clearDataSource();
        };
        this.init = function () {
            HdlCommonHelper.GenerateDatePicker("wiPWarpDate");
            this.clearForm();
        };
    };
    var warpDetail = new function () {
        var self = this;
        this.setDataSource = function (idNo) {
            if (idNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../WarpLapper/GetWarpingDetailByIdNo?idNo=" + idNo
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                                WarpDate: {
                                    type: "date",
                                    template: '#=kendo.toString("dd-MM-yyyy")#',
                                    editable: false
                                }
                            }
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
                { field: "Wdid", hidden: true },
                { field: "WarpDate", title: "WarpDate", template: '#=kendo.toString(WarpDate,"dd-MM-yyyy")#' },
                { field: "IName", title: "IName", },
                { field: "FlangeNo", title: "BeamNo" },
                { field: "Lapper", title: "Lapper" },
                { field: "FlangeLength", title: "BeamLength" },
                { field: "OperatorCardNo", title: "Operator" },
                { field: "CapCode", title: "Captain" }
            ]
        };
        this.clearForm = function () {
            $("#WDID").val('');
            $("#wdWarpDate").data("kendoDatePicker").value('');
            $("#wdIName").data("kendoComboBox").value('');
            $("#wdBeamNo").data("kendoNumericTextBox").value('');
            $("#wdLapper").data("kendoNumericTextBox").value('');
            $("#wdBeamLength").data("kendoNumericTextBox").value('');
            $("#wdOperator").data("kendoComboBox").value('');
            $("#wdCaptain").data("kendoComboBox").value('');
        };
        this.getFormData = function () {
            return {
                Wdid: $("#WDID").val(),
                //WarpDate: kendo.toString($("#wdWarpDate").data("kendoDatePicker").value(),"dd-MM-yyyy"),
                IName: $("#wdIName").data("kendoComboBox").value(),
                FlangeNo: $("#wdBeamNo").data("kendoNumericTextBox").value(),
                Lapper: $("#wdLapper").data("kendoNumericTextBox").value(),
                FlangeLength: $("#wdBeamLength").data("kendoNumericTextBox").value(),
                OperatorCardNo: $("#wdOperator").data("kendoComboBox").value(),
                CapCode: $("#wdCaptain").data("kendoComboBox").value()
            }
        };
        this.setFormData = function (model) {
            console.log(model);
            $("#WDID").val(model.Wdid);
            $("#wdWarpDate").data("kendoDatePicker").value(model.WarpDate);
            $("#wdIName").data("kendoComboBox").value(model.IName);
            $("#wdBeamNo").data("kendoNumericTextBox").value(model.FlangeNo);
            $("#wdLapper").data("kendoNumericTextBox").value(model.Lapper);
            $("#wdBeamLength").data("kendoNumericTextBox").value(model.FlangeLength);
            $("#wdOperator").data("kendoComboBox").value(model.OperatorCardNo);
            $("#wdCaptain").data("kendoComboBox").value(model.CapCode);
        };
        this.saveWarpDetail = function (success) {
            var model = self.getFormData();
            if (model.Wdid > 0) {
                dataService.saveWarpDetail(model, success);
            } else {
                alert("Please Select a Set No!")
            }
        }
        this.grid = $("#wdGrid").kendoGrid({
            pageable: false,
            selectable: "row",
            change: function () {
                var model = self.grid.dataItem(this.select());
                self.setFormData(model);
            },
            columns: self.getColumns()
        }).data("kendoGrid");
        this.init = function () {
            HdlCommonHelper.GenerateDatePicker("wdWarpDate");
            HdlCommonHelper.GenerateINameCombo("wdIName");
            HdlCommonHelper.GenerateNumericTextBox("wdBeamNo");
            HdlCommonHelper.GenerateNumericTextBox("wdLapper");
            HdlCommonHelper.GenerateNumericTextBox("wdBeamLength");
            HdlCommonHelper.GenerateOperatorWarpingCombo("wdOperator");
            HdlCommonHelper.GenerateCaptainWarpingCombo("wdCaptain");
            
            $("#wdSave").click(function () {
                self.saveWarpDetail(function () {
                    self.grid.dataSource.read();
                    self.clearForm();
                });
            });
            $("#wdClear").click(function () {
                self.clearForm();
            });

            self.clearForm();
        }
    };
    var warpLapper = new function () {
        var that = this;
        this.init = function () {
            $("#wiSetNo").kendoComboBox({
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "../WarpingProduction/GetWarpingSetNo",
                        }
                    },
                    schema: {
                        parse: function (data) {
                            data.unshift({ SetId: 0, SetNo: "---Select---" })
                            return data;
                        }
                    }
                }),
                clearButton: true,
                placeholder: "---Select---",
                dataTextField: "SetNo",
                dataValueField: "SetId",
                filter: "contains",
                change: function () {
                    var setNo = this.text();
                    if (setNo > 0) {
                        warpMaster.setForm(setNo);
                    } else {
                        warpMaster.clearForm();
                        warpDetail.clearForm();
                    }
                }
            });
            warpMaster.init();
            warpDetail.init();
        };
    };
    warpLapper.init();
});



