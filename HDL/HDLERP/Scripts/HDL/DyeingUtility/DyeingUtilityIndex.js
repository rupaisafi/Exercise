$(function () {
    var backend = new function () {
        var self = this;
        this.getBasicInfo = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/GetDyeingProcessInfo?setNo=" + model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveBasicInfo = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveDyeingProcessInfo",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveRunAndStop = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveRunAndStop",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveTimeUtilization = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveTimeUtilization",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveWastageDetail = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveWastageDetail",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveDrainageDetail = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveDrainageDetail",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveCreelUnit = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveCreelUnit",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveDyeingParameter = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveDyeingParameter",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveSizingParameter = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveSizingParameter",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveHeadStock = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveHeadStock",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveCompensator = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveCompensator",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveRecipe = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveRecipe",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
        this.saveCreelLoading = function (model, success) {
            $.ajax({
                method: "POST",
                url: "../DyeingUtility/SaveCreelLoading",
                data: model,
                success: success,
                error: function (err) {
                    console.log(err)
                }
            });
        };
    }
    var basicInfo = new function () {
        var self = this;
        this.setForm = function (setID, setNo) {
            backend.getBasicInfo(setNo, function (model) {
                $("#PID").val(model.ID);
                $("#bi_set_no").val(model.SetNo);
                $("#bi_id_no").val(setID);
                $("#bi_program_dye_date").data("kendoDatePicker").value(model.DyeDate);
                $("#bi_set_length_mtr").val(model.LengthMtr);
                $("#bi_set_length_kg").val(model.LengthKg);
                $("#bi_yarn_count").val(model.YarnCode);
                $("#bi_warp_ratio").val(model.WarpRatio);
                $("#bi_no_of_beam").val(model.NoOfBeam);
                $("#bi_no_of_creel").val(model.NoOfCreel);
                $("#bi_total_ends").val(model.TotalEnd);
                $("#bi_yarn_supplier").val(model.ProYarnSupplier);
                $("#bi_yarn_lot").val(model.ProYarnLot);
                $("#bi_buyer").val(model.Buyer);
                $("#bi_style_no").val(model.StyleNo);
                $("#bi_style_code").val(model.StyleCode);
                $("#bi_weight").val(model.Weight);
                $("#bi_width").val(model.Width);
                $("#bi_weave").val(model.Weave);
                $("#bi_colour").val(model.Colour);
                $("#bi_construction").val(model.GreyConstruction);
                $("#bi_shade_indigo").data("kendoNumericTextBox").value(model.ShadeIndigoPercent);
                $("#bi_shade_black").data("kendoNumericTextBox").value(model.ShadeBlackPercent);
                $("#bi_shade_match_with").data("kendoNumericTextBox").value(model.ShadeMatchWith);
                $("#bi_mc_speed").data("kendoNumericTextBox").value(model.MCSpeed);
                $("#bi_dye_set_length_mtr").data("kendoNumericTextBox").value(model.AfterLengthMeter);
                $("#bi_dye_set_length_kg").data("kendoNumericTextBox").value(model.AfterLengthKg);
                $("#bi_mc_start").data("kendoNumericTextBox").value(model.MCStartTime);
                $("#bi_mc_stop").data("kendoNumericTextBox").value(model.MCStopTime);
                $("#bi_avg_count").data("kendoNumericTextBox").value(model.AvgCount);
                $("#bi_run_hh").data("kendoNumericTextBox").value(model.MCRunTimeHour);
                $("#bi_run_mm").data("kendoNumericTextBox").value(model.MCRunTimeMinute);
                $("#bi_bath").data("kendoNumericTextBox").value(model.Bath);
                $("#bi_feeding").data("kendoNumericTextBox").value(model.Feeding);
                $("#bi_refraction").data("kendoNumericTextBox").value(model.Refraction);
                $("#bi_viscosity").data("kendoNumericTextBox").value(model.Viscosity);
                $("#bi_indigo_redox").data("kendoNumericTextBox").value(model.IndigoRedox);
                $("#bi_indigo_ph").data("kendoNumericTextBox").value(model.IndigoPH);
                $("#bi_indigo_dosing").data("kendoNumericTextBox").value(model.IndigoDosing);
                $("#bi_sulpher_redox").data("kendoNumericTextBox").value(model.SulpherRedox);
                $("#bi_sulpher_ph").data("kendoNumericTextBox").value(model.SulpherPH);
                $("#bi_sulpher_dosing").data("kendoNumericTextBox").value(model.SulpherDosing);
                $("#bi_sulpher_temperature").data("kendoNumericTextBox").value(model.SulpherTemperature);
                $("#bi_hydro_dosing").data("kendoNumericTextBox").value(model.HydroDosing);
                $("#bi_custic_dosing").data("kendoNumericTextBox").value(model.CusticDosing);
                $("#bi_custic_concen").data("kendoNumericTextBox").value(model.CusticConcentration);
                $("#bi_remark").val(model.Remark);
            });
        };
        this.clearForm = function () {
            $("#bi_set_no").data("kendoComboBox").value(0);
            $("#bi_id_no").val('');
            $("#bi_program_dye_date").data("kendoDatePicker").value(Date());
            $("#bi_set_length_mtr").val('');
            $("#bi_set_length_kg").val('');
            $("#bi_yarn_count").val('');
            $("#bi_warp_ratio").val('');
            $("#bi_no_of_beam").val('');
            $("#bi_no_of_creel").val('');
            $("#bi_total_ends").val('');
            $("#bi_yarn_supplier").val('');
            $("#bi_yarn_lot").val('');
            $("#bi_buyer").val('');
            $("#bi_style_no").val('');
            $("#bi_style_code").val('');
            $("#bi_weight").val('');
            $("#bi_width").val('');
            $("#bi_weave").val('');
            $("#bi_colour").val('');
            $("#bi_construction").val('');
            $("#bi_shade_indigo").data("kendoNumericTextBox").value('');
            $("#bi_shade_black").data("kendoNumericTextBox").value('');
            $("#bi_shade_match_with").data("kendoNumericTextBox").value('');
            $("#bi_mc_speed").data("kendoNumericTextBox").value('');
            $("#bi_dye_set_length_mtr").data("kendoNumericTextBox").value('');
            $("#bi_dye_set_length_kg").data("kendoNumericTextBox").value('');
            $("#bi_mc_start").data("kendoNumericTextBox").value('');
            $("#bi_mc_stop").data("kendoNumericTextBox").value('');
            $("#bi_avg_count").data("kendoNumericTextBox").value('');
            $("#bi_run_hh").data("kendoNumericTextBox").value('');
            $("#bi_run_mm").data("kendoNumericTextBox").value('');
            $("#bi_bath").data("kendoNumericTextBox").value('');
            $("#bi_feeding").data("kendoNumericTextBox").value('');
            $("#bi_refraction").data("kendoNumericTextBox").value('');
            $("#bi_viscosity").data("kendoNumericTextBox").value('');
            $("#bi_indigo_redox").data("kendoNumericTextBox").value('');
            $("#bi_indigo_ph").data("kendoNumericTextBox").value('');
            $("#bi_indigo_dosing").data("kendoNumericTextBox").value('');
            $("#bi_sulpher_redox").data("kendoNumericTextBox").value('');
            $("#bi_sulpher_ph").data("kendoNumericTextBox").value('');
            $("#bi_sulpher_dosing").data("kendoNumericTextBox").value('');
            $("#bi_sulpher_temperature").data("kendoNumericTextBox").value('');
            $("#bi_hydro_dosing").data("kendoNumericTextBox").value('');
            $("#bi_custic_dosing").data("kendoNumericTextBox").value('');
            $("#bi_custic_concen").data("kendoNumericTextBox").value('');
            $("#bi_remark").val('');
        };
        this.getFormData = function () {
            return {
                ID: $("#PID").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                SetCode: $("#bi_set_no").data("kendoComboBox").value(),
                DyeingID: $("#bi_id_no").val(),
                DyeDate: kendo.toString($("#bi_program_dye_date").data("kendoDatePicker").value(), "dd-MM-yyyy"),
                LengthMtr: $("#bi_set_length_mtr").val(),
                LengthKg: $("#bi_set_length_kg").val(),
                YarnCode: $("#bi_yarn_count").val(),
                WarpRatio: $("#bi_warp_ratio").val(),
                NoOfBeam: $("#bi_no_of_beam").val(),
                NoOfCreel: $("#bi_no_of_creel").val(),
                TotalEnd: $("#bi_total_ends").val(),
                ProYarnSupplier: $("#bi_yarn_supplier").val(),
                ProYarnLot: $("#bi_yarn_lot").val(),
                Buyer: $("#bi_buyer").val(),
                StyleNo: $("#bi_style_no").val(),
                StyleCode: $("#bi_style_code").val(),
                Weight: $("#bi_weight").val(),
                Width: $("#bi_width").val(),
                Weave: $("#bi_weave").val(),
                Colour: $("#bi_colour").val(),
                GreyConstruction: $("#bi_construction").val(),
                ShadeIndigoPercent: $("#bi_shade_indigo").data("kendoNumericTextBox").value(),
                ShadeBlackPercent: $("#bi_shade_black").data("kendoNumericTextBox").value(),
                ShadeMatchWith: $("#bi_shade_match_with").data("kendoNumericTextBox").value(),
                MCSpeed: $("#bi_mc_speed").data("kendoNumericTextBox").value(),
                AfterLengthMeter: $("#bi_dye_set_length_mtr").data("kendoNumericTextBox").value(),
                AfterLengthKg: $("#bi_dye_set_length_kg").data("kendoNumericTextBox").value(),
                MCStartTime: $("#bi_mc_start").data("kendoNumericTextBox").value(),
                MCStopTime: $("#bi_mc_stop").data("kendoNumericTextBox").value(),
                AvgCount: $("#bi_avg_count").data("kendoNumericTextBox").value(),
                MCRunTimeHour: $("#bi_run_hh").data("kendoNumericTextBox").value(),
                MCRunTimeMinute: $("#bi_run_mm").data("kendoNumericTextBox").value(),
                Bath: $("#bi_bath").data("kendoNumericTextBox").value(),
                Feeding: $("#bi_feeding").data("kendoNumericTextBox").value(),
                Refraction: $("#bi_refraction").data("kendoNumericTextBox").value(),
                Viscosity: $("#bi_viscosity").data("kendoNumericTextBox").value(),
                IndigoRedox: $("#bi_indigo_redox").data("kendoNumericTextBox").value(),
                IndigoPH: $("#bi_indigo_ph").data("kendoNumericTextBox").value(),
                IndigoDosing: $("#bi_indigo_dosing").data("kendoNumericTextBox").value(),
                SulpherRedox: $("#bi_sulpher_redox").data("kendoNumericTextBox").value(),
                SulpherPH: $("#bi_sulpher_ph").data("kendoNumericTextBox").value(),
                SulpherDosing: $("#bi_sulpher_dosing").data("kendoNumericTextBox").value(),
                SulpherTemperature: $("#bi_sulpher_temperature").data("kendoNumericTextBox").value(),
                HydroDosing: $("#bi_hydro_dosing").data("kendoNumericTextBox").value(),
                CusticDosing: $("#bi_custic_dosing").data("kendoNumericTextBox").value(),
                CusticConcentration: $("#bi_custic_concen").data("kendoNumericTextBox").value(),
                Remark: $("#bi_remark").val()
            };
        };
        this.saveBasicInfo = function () {
            var model = this.getFormData();
            if (model.SetCode > 0) {
                backend.saveBasicInfo(model, function (res) {
                    console.log(res);
                    $("#PID").val(1);
                });
            }
        }
        this.showDetail = function (setID, setNo) {
            self.setForm(setID, setNo);
            $("#basic_info").show();
        };
        this.hideDetail = function () {
            self.clearForm();
        };
        this.init = function () {
            $("#du_set_no").val('');
            HdlCommonHelper.GenerateDatePicker("bi_program_dye_date");
            HdlCommonHelper.GenerateNumericTextBox("bi_shade_indigo");
            HdlCommonHelper.GenerateNumericTextBox("bi_shade_black");
            HdlCommonHelper.GenerateNumericTextBox("bi_shade_match_with");
            HdlCommonHelper.GenerateNumericTextBox("bi_mc_speed");
            HdlCommonHelper.GenerateNumericTextBox("bi_dye_set_length_mtr");
            HdlCommonHelper.GenerateNumericTextBox("bi_dye_set_length_kg");
            HdlCommonHelper.GenerateNumericTextBox("bi_mc_start");
            HdlCommonHelper.GenerateNumericTextBox("bi_mc_stop");
            HdlCommonHelper.GenerateNumericTextBox("bi_avg_count");
            HdlCommonHelper.GenerateNumericTextBox("bi_run_hh");
            HdlCommonHelper.GenerateNumericTextBox("bi_run_mm");
            HdlCommonHelper.GenerateNumericTextBox("bi_bath");
            HdlCommonHelper.GenerateNumericTextBox("bi_feeding");
            HdlCommonHelper.GenerateNumericTextBox("bi_refraction");
            HdlCommonHelper.GenerateNumericTextBox("bi_viscosity");

            HdlCommonHelper.GenerateNumericTextBox("bi_indigo_redox").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_indigo_ph").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_indigo_dosing").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_sulpher_redox").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_sulpher_ph").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_sulpher_dosing").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_sulpher_temperature").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_hydro_dosing").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_custic_dosing").bind("change", function () {
                self.saveBasicInfo();
            });
            HdlCommonHelper.GenerateNumericTextBox("bi_custic_concen").bind("change", function () {
                self.saveBasicInfo();
            });
            $("#bi_remark").bind("change", function () {
                self.saveBasicInfo();
            });
            this.clearForm();
        };
    };
    var dyeingStopRun = new function () {
        var self = this;
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllRunAndStop?setNo=" + setNo
                        }
                    },
                    schema: {
                        model: {
                            id: "Id",
                            fields: {
                                Id: { editable: false, nullable: true },
                                DepartmentName: { validation: { required: true } },
                                SlowFromTime: { validation: { required: true } },
                                SlowToTime: { validation: { required: true } },
                                StopFromTime: { validation: { required: true } },
                                StopToTime: { validation: { required: true } },
                                DurationTime: { editable: false, validation: { required: true } },
                                Reason: { validation: { required: true } },
                                ReasonType: { type: "text", validation: { required: true } },
                                ProductionLossMeter: { type: "number", validation: { required: true } },
                                GGradeYarnMeter: { type: "number", validation: { required: true } },
                            }
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.getColumns = function () {
            return [
                { field: "ID", hidden: true },
                { field: "DepartmentName", title: "DepartmentName", editor: self.getDeptNameEditor },
                { field: "SlowFromTime", title: "SlowFromTime", },
                { field: "SlowToTime", title: "SlowToTime" },
                { field: "StopFromTime", title: "StopFromTime" },
                { field: "StopToTime", title: "StopToTime" },
                { field: "Duration", title: "DurationTime" },
                { field: "ReasonName", title: "ReasonName", editor: self.getReasonEditor, },
                { field: "ReasonType", title: "Stop" },
                { field: "ProductionLossMeter", title: "ProductionLossMeter", },
                { field: "CGradeYarnMeter", title: "CGradeYarnMeter", },
                //{ title: "&nbsp;", command: ["edit", "destroy"], width: "150px" }
            ]
        };
        this.showDetail = function (setNo) {
            self.setDataSource(setNo);
            $("#dyeing_stop_run").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#dyeing_stop_run").hide();
        };
        this.clearForm = function () {
            $("#stop_run_id").val('');
            $("#stop_run_dyeing_utility_id").val('');
            $("#stop_run_department").data("kendoComboBox").value('');
            $("#stop_run_department").data("kendoComboBox").text('');
            $("#stop_run_slow_from").data("kendoNumericTextBox").value('');
            $("#stop_run_slow_to").data("kendoNumericTextBox").value('');
            $("#stop_run_stop_from").data("kendoNumericTextBox").value('');
            $("#stop_run_stop_to").data("kendoNumericTextBox").value('');
            $("#stop_run_duration").data("kendoNumericTextBox").value('');
            $("#stop_run_reason").data("kendoComboBox").value('');
            $("#stop_run_reason").data("kendoComboBox").text('');
            $("#stop_run_reson_type").val('');
            $("#stop_run_production_loss").data("kendoNumericTextBox").value('');
            $("#stop_run_cgrade_yarn_meter").val('');
        };
        this.getFormData = function () {
            return {
                ID: $("#stop_run_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                DyeingUtilityID: $("#stop_run_dyeing_utility_id").val(),
                DepartmentID: $("#stop_run_department").data("kendoComboBox").value(),
                DepartmentName: $("#stop_run_department").data("kendoComboBox").text(),
                SlowFromTime: $("#stop_run_slow_from").data("kendoNumericTextBox").value(),
                SlowToTime: $("#stop_run_slow_to").data("kendoNumericTextBox").value(),
                StopFromTime: $("#stop_run_stop_from").data("kendoNumericTextBox").value(),
                StopToTime: $("#stop_run_stop_to").data("kendoNumericTextBox").value(),
                Duration: $("#stop_run_duration").data("kendoNumericTextBox").value(),
                ReasonID: $("#stop_run_reason").data("kendoComboBox").value(),
                ReasonName: $("#stop_run_reason").data("kendoComboBox").text(),
                ReasonType: $("#stop_run_reson_type").val(),
                ProductionLossMeter: $("#stop_run_production_loss").data("kendoNumericTextBox").value(),
                CGradeYarnMeter: $("#stop_run_cgrade_yarn_meter").val()
            }
        };
        this.saveRunAndStopInfo = function (success) {
            var model = self.getFormData();
            if (model.SetNo > 0) {
                backend.saveRunAndStop(model, success)
            } else {
                alert("Please Select a Set No!")
            }
        }
        this.grid = $("#dyeing_stop_run_grid").kendoGrid({
            pageable: false,
            columns: self.getColumns()
        }).data("kendoGrid");
        this.init = function () {
            HdlCommonHelper.GenerateDepartmentCombo("stop_run_department");
            $("#stop_run_slow_from").kendoNumericTextBox();
            $("#stop_run_slow_to").kendoNumericTextBox();
            $("#stop_run_stop_from").kendoNumericTextBox();
            $("#stop_run_stop_to").kendoNumericTextBox();
            $("#stop_run_duration").kendoNumericTextBox();
            $("#stop_run_production_loss").kendoNumericTextBox();
            $("#stop_run_cgrade_yarn_meter").kendoNumericTextBox();
            HdlCommonHelper.GenerateReasonCombo("stop_run_reason");
            $("#stop_run_save").click(function () {
                self.saveRunAndStopInfo(function (res) {
                    console.log(res);
                    self.grid.dataSource.read();
                    self.clearForm();
                });
            });
            self.clearForm();
        }
    };
    var dyeingTimeUtilization = new function () {
        var self = this;
        this.setDataSource = function (setNo) {
            if (setNo) {

                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllTimeUtilization?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.grid = $("#dyeing_stop_run_time_utilization").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            columns: [
                { field: "TimeUtilizationName", title: "TimeUtilization" },
                { field: "MCRunFrom", title: "MCRunFrom", format: "{0:0.00}" },
                { field: "MCRunTo", title: "MCRunTo", format: "{0:0.00}" },
                { field: "TotalTimeHour", title: "TotalTime", format: "{0:0.00}" },
                { field: "CalculatedRunHour", title: "CalculatedRunTime", format: "{0:0.00}" }
            ],
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            }
        }).data("kendoGrid");
        this.clearForm = function () {
            $("#time_utilization_id").val('');
            $("#time_utilization_name").data("kendoComboBox").value('');
            $("#time_utilization_mc_run_from").data("kendoNumericTextBox").value('');
            $("#time_utilization_mc_run_to").data("kendoNumericTextBox").value('');
            $("#time_utilization_total_time").data("kendoNumericTextBox").value('');
            $("#time_utilization_calculated_run_time").data("kendoNumericTextBox").value('');
        };
        this.getFormData = function () {
            return {
                ID: $("#time_utilization_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                TimeUtilizationID: $("#time_utilization_name").data("kendoComboBox").value(),
                TimeUtilizationName: $("#time_utilization_name").data("kendoComboBox").text(),
                MCRunFrom: $("#time_utilization_mc_run_from").data("kendoNumericTextBox").value(),
                MCRunTo: $("#time_utilization_mc_run_to").data("kendoNumericTextBox").value(),
                TotalTimeHour: $("#time_utilization_total_time").data("kendoNumericTextBox").value(),
                CalculatedRunHour: $("#time_utilization_calculated_run_time").data("kendoNumericTextBox").value()
            }
        };
        this.setFormData = function (model) {
            $("#time_utilization_id").val(model.ID);
            $("#time_utilization_name").data("kendoComboBox").value(model.TimeUtilizationID);
            $("#time_utilization_mc_run_from").data("kendoNumericTextBox").value(model.MCRunFrom);
            $("#time_utilization_mc_run_to").data("kendoNumericTextBox").value(model.MCRunTo);
            $("#time_utilization_total_time").data("kendoNumericTextBox").value(model.TotalTimeHour);
            $("#time_utilization_calculated_run_time").data("kendoNumericTextBox").value(model.CalculatedRunHour);
        }
        this.saveTimeUtilization = function (success) {
            var model = self.getFormData();
            backend.saveTimeUtilization(model, success);
        };
        this.showDetail = function (setNo) {
            self.setDataSource(setNo);
            $("#div_time_utilization").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_time_utilization").hide();
        };
        this.init = function () {
            $("#time_utilization_name").kendoComboBox({
                autoBind: false,
                filter: "contains",
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    data: [
                        { Id: 1, Name: "Bath Preparation" },
                        { Id: 2, Name: "Creel Loading" },
                        { Id: 3, Name: "Knotting" },
                        { Id: 4, Name: "Delay" },
                    ]
                }
            });
            $("#time_utilization_mc_run_from").kendoNumericTextBox();
            $("#time_utilization_mc_run_to").kendoNumericTextBox();
            $("#time_utilization_total_time").kendoNumericTextBox();
            $("#time_utilization_calculated_run_time").kendoNumericTextBox();
            $("#time_utilization_save").click(function () {
                self.saveTimeUtilization(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                })
            });
            self.clearForm();
        };

    };
    var dyeingWastageDetail = new function () {
        var self = this;
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllWastageDetail?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.grid = $("#dyeing_stop_run_wastage_detail").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            columns: [
                { field: "WastageTypeName", title: "SetWastageType", },
                { field: "QuantityKg", title: "QuantityKg", format: "{0:0.00}" }
            ],
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            }
        }).data("kendoGrid");
        this.clearForm = function () {
            $("#wastage_detail_id").val('');
            $("#wastage_detail_set_wastage_type").data("kendoComboBox").value('');
            $("#wastage_detail_quantity_kg").data("kendoNumericTextBox").value('');
        };
        this.getFormData = function () {
            return {
                ID: $("#wastage_detail_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                WastageTypeID: $("#wastage_detail_set_wastage_type").data("kendoComboBox").value(),
                WastageTypeName: $("#wastage_detail_set_wastage_type").data("kendoComboBox").text(),
                QuantityKg: $("#wastage_detail_quantity_kg").data("kendoNumericTextBox").value(),
            }
        };
        this.setFormData = function (model) {
            ID: $("#wastage_detail_id").val(model.ID);
            SetNo: $("#bi_set_no").data("kendoComboBox").value(model.SetNo);
            WastageTypeID: $("#wastage_detail_set_wastage_type").data("kendoComboBox").value(model.WastageTypeID);
            WastageTypeName: $("#wastage_detail_set_wastage_type").data("kendoComboBox").text(model.WastageTypeName);
            QuantityKg: $("#wastage_detail_quantity_kg").data("kendoNumericTextBox").value(model.QuantityKg);
        };
        this.showDetail = function (setNo) {
            self.setDataSource(setNo);
            $("#div_wastage_detail").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_wastage_detail").hide();
        };
        this.saveWastageDetail = function (success) {
            var model = this.getFormData();
            backend.saveWastageDetail(model, success);
        };
        this.init = function () {
            HdlCommonHelper.GenerateItemTypeCombo("wastage_detail_set_wastage_type");
            $("#wastage_detail_quantity_kg").kendoNumericTextBox();
            $("#wastage_detail_save").click(function () {
                self.saveWastageDetail(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                })
            });
            self.clearForm();
        };
    };
    var dyeingDrainageDetail = new function () {
        var self = this;
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllDrainageDetail?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.grid = $("#dyeing_stop_run_drainage_detail").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            columns: [
                { field: "ItemName", title: "ItemName" },
                { field: "Rate", title: "Rate", format: "{0:0.00}" },
                { field: "QuantityLiter", title: "QuantityLiter", format: "{0:0.00}" },
                { field: "Concentration", title: "Conc(gpl)", format: "{0:0.00}" },
                { field: "QuantityKg", title: "QntyKg", format: "{0:0.00}" },
                { field: "Cost", title: "Cost", format: "{0:0.00}" },
                { field: "ShiftName", title: "Shift" },
                { field: "PO", title: "PO" },
                { field: "ReasonName", title: "Reason" }
            ],
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            }
        }).data("kendoGrid");
        this.saveDrainageDetail = function (success) {
            var model = self.getFormData();
            backend.saveDrainageDetail(model, success);
        };
        this.clearForm = function () {
            $("#drainage_detail_id").val('');
            $("#drainage_detail_item_name").data("kendoComboBox").value('');
            $("#drainage_detail_concentration").data("kendoNumericTextBox").value('');
            $("#drainage_detail_quantity_liter").data("kendoNumericTextBox").value('');
            $("#drainage_detail_rate").data("kendoNumericTextBox").value('');
            $("#drainage_detail_quantity_kg").data("kendoNumericTextBox").value('');
            $("#drainage_detail_cost").data("kendoNumericTextBox").value('');
            $("#drainage_detail_shift").data("kendoComboBox").value('');
            $("#drainage_detail_po").data("kendoComboBox").value('');
            $("#drainage_detail_reason").data("kendoComboBox").value('');
        }
        this.getFormData = function () {
            return {
                ID: $("#drainage_detail_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                ItemName: $("#drainage_detail_item_name").data("kendoComboBox").text(),
                Rate: $("#drainage_detail_rate").data("kendoNumericTextBox").value(),
                QuantityLiter: $("#drainage_detail_quantity_liter").data("kendoNumericTextBox").value(),
                Concentration: $("#drainage_detail_concentration").data("kendoNumericTextBox").value(),
                QuantityKg: $("#drainage_detail_quantity_kg").data("kendoNumericTextBox").value(),
                Cost: $("#drainage_detail_cost").data("kendoNumericTextBox").value(),
                ShiftCode: $("#drainage_detail_shift").data("kendoComboBox").value(),
                ShiftName: $("#drainage_detail_shift").data("kendoComboBox").text(),
                PO: $("#drainage_detail_po").data("kendoComboBox").text(),
                CardNo: $("#drainage_detail_po").data("kendoComboBox").value(),
                ReasonID: $("#drainage_detail_reason").data("kendoComboBox").value(),
                ReasonName: $("#drainage_detail_reason").data("kendoComboBox").text(),
            }
        };
        this.setFormData = function (model) {
            $("#drainage_detail_id").val(model.ID);
            $("#drainage_detail_item_name").data("kendoComboBox").value(model.ItemName);
            $("#drainage_detail_concentration").data("kendoNumericTextBox").value(model.Concentration);
            $("#drainage_detail_quantity_liter").data("kendoNumericTextBox").value(model.QuantityLiter);
            $("#drainage_detail_rate").data("kendoNumericTextBox").value(model.Rate);
            $("#drainage_detail_quantity_kg").data("kendoNumericTextBox").value(model.QuantityKg);
            $("#drainage_detail_cost").data("kendoNumericTextBox").value(model.Cost);
            $("#drainage_detail_shift").data("kendoComboBox").value(model.ShiftName);
            $("#drainage_detail_po").data("kendoComboBox").value(model.PO);
            $("#drainage_detail_reason").data("kendoComboBox").value(model.ReasonName);
        };
        this.showDetail = function (setNo) {
            self.setDataSource(setNo);
            $("#div_drainage_detail").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_drainage_detail").hide();
        };
        this.init = function () {
            HdlCommonHelper.GenerateItemTypeCombo("drainage_detail_item_name");
            $("#drainage_detail_rate").kendoNumericTextBox();
            $("#drainage_detail_quantity_liter").kendoNumericTextBox();
            $("#drainage_detail_concentration").kendoNumericTextBox();
            $("#drainage_detail_quantity_kg").kendoNumericTextBox();
            $("#drainage_detail_cost").kendoNumericTextBox();
            HdlCommonHelper.GenerateShiftCombo("drainage_detail_shift");
            HdlCommonHelper.GenerateDyeingEmployeCombo("drainage_detail_po");
            HdlCommonHelper.GenerateReasonCombo("drainage_detail_reason");
            $("#drainage_detail_save").click(function () {
                self.saveDrainageDetail(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                })
            })
            self.clearForm();
        }
    };
    var creelUnit = new function () {
        var self = this;
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_creel_unit").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_creel_unit").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllCreelUnit?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.grid = $("#dyeing_parameter_creel_unit").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            columns: [
                { field: "LoadCellTension", title: "LoadCellTension(N)", format: "{0:0.00}" },
                { field: "TakeOfForce", title: "TakeOffForce(N)", format: "{0:0.00}" }
            ],
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            }
        }).data("kendoGrid");
        this.clearForm = function () {
            $("#creel_unit_set_wastage_type").val('');
            $("#creel_unit_load_cell_tension").data("kendoNumericTextBox").value('');
            $("#creel_unit_takeof_force").data("kendoNumericTextBox").value('');
        }
        this.getFormData = function () {
            return {
                ID: $("#creel_unit_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                LoadCellTension: $("#creel_unit_load_cell_tension").data("kendoNumericTextBox").value(),
                TakeOfForce: $("#creel_unit_takeof_force").data("kendoNumericTextBox").value(),
            }
        }
        this.setFormData = function (model) {
            $("#creel_unit_id").val(model.ID);
            $("#creel_unit_load_cell_tension").data("kendoNumericTextBox").value(model.LoadCellTension);
            $("#creel_unit_takeof_force").data("kendoNumericTextBox").value(model.TakeOfForce);
        }
        this.saveCreelUnit = function (success) {
            var model = this.getFormData();
            backend.saveCreelUnit(model, success);
        }
        this.init = function () {
            $("#creel_unit_load_cell_tension").kendoNumericTextBox();
            $("#creel_unit_takeof_force").kendoNumericTextBox();
            $("#creel_unit_save").click(function () {
                self.saveCreelUnit(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                })
            });
            self.clearForm();
        }
    };
    var dyeingParameter = new function () {
        var self = this;
        this.clearForm = function () {
            $("#dyeing_parameter_id").val('');
            $("#dyeing_parameter_bath_no").data("kendoNumericTextBox").value('');
            $("#dyeing_parameter_bath_in_process").data("kendoComboBox").value('');
            $("#dyeing_parameter_temperature").data("kendoNumericTextBox").value('');
            $("#dyeing_parameter_squeeze_pressure").data("kendoNumericTextBox").value('');
            $("#dyeing_parameter_tension").data("kendoNumericTextBox").value('');
            $("#dyeing_parameter_water_flow").data("kendoNumericTextBox").value('');
        }
        this.getFormData = function () {
            return {
                ID: $("#dyeing_parameter_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                BathNo: $("#dyeing_parameter_bath_no").data("kendoNumericTextBox").value(),
                BathInProcess: $("#dyeing_parameter_bath_in_process").data("kendoComboBox").text(),
                Temperature: $("#dyeing_parameter_temperature").data("kendoNumericTextBox").value(),
                SqueezePressure: $("#dyeing_parameter_squeeze_pressure").data("kendoNumericTextBox").value(),
                Tension: $("#dyeing_parameter_tension").data("kendoNumericTextBox").value(),
                WaterFlow: $("#dyeing_parameter_water_flow").data("kendoNumericTextBox").value(),
            }
        }
        this.saveDyeingParameter = function (success) {
            var model = self.getFormData();
            backend.saveDyeingParameter(model, success);
        }
        this.grid = $("#dyeing_parameter_dyeing").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            },
            columns: [
                { field: "BathNo", title: "BathNo" },
                { field: "BathInProcess", title: "BathInProcess" },
                { field: "Temperature", title: "Temperature(C)" },
                { field: "SqueezePressure", title: "SqueezePressure(KN)" },
                { field: "Tension", title: "Tension(N)" },
                { field: "WaterFlow", title: "WaterFlow(m3/h)" }
            ],
        }).data("kendoGrid");
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_dyeing_parameter").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_dyeing_parameter").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllDyeingParameter?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.setFormData = function (model) {
            $("#dyeing_parameter_id").val(model.ID);
            $("#dyeing_parameter_bath_no").data("kendoNumericTextBox").value(model.BathNo);
            $("#dyeing_parameter_bath_in_process").data("kendoComboBox").value(model.BathInProcess);
            $("#dyeing_parameter_temperature").data("kendoNumericTextBox").value(model.Temperature);
            $("#dyeing_parameter_squeeze_pressure").data("kendoNumericTextBox").value(model.SqueezePressure);
            $("#dyeing_parameter_tension").data("kendoNumericTextBox").value(model.Tension);
            $("#dyeing_parameter_water_flow").data("kendoNumericTextBox").value(model.WaterFlow);
        }
        this.init = function () {
            $("#dyeing_parameter_bath_no").kendoNumericTextBox();
            $("#dyeing_parameter_bath_in_process").kendoComboBox({
                filter: "contains",
                autoBind: false,
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    data: [
                        { Id: 1, Name: "Black" },
                        { Id: 2, Name: "Bottoming" },
                        { Id: 3, Name: "Custic" },
                        { Id: 4, Name: "Indigo" },
                    ]
                },
                change: function () {
                    if (this.selectedIndex === -1 && this.value()) {
                        if (this.dataSource.view().length > 0) {
                            this.select(0)
                        } else {
                            this.value("");
                        }
                    }
                },
                select: function () {
                    //container.next().click();
                }
            });
            $("#dyeing_parameter_temperature").kendoNumericTextBox();
            $("#dyeing_parameter_squeeze_pressure").kendoNumericTextBox();
            $("#dyeing_parameter_tension").kendoNumericTextBox();
            $("#dyeing_parameter_water_flow").kendoNumericTextBox();
            $("#dyeing_parameter_save").click(function () {
                self.saveDyeingParameter(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                });
            });
            self.clearForm();
        }
    };
    var sizingParameter = new function () {
        var self = this;
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_sizing_parameter").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_sizing_parameter").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllSizingParameter?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.setFormData = function (model) {
            $("#sizing_parameter_id").val(model.ID);
            $("#sizing_parameter_sowbox_temperature").data("kendoNumericTextBox").value(model.SowBoxTemperature);
            $("#sizing_parameter_cooking_temperature").data("kendoNumericTextBox").value(model.CookingTemperature);
            $("#sizing_parameter_squeeze_pressure1").data("kendoNumericTextBox").value(model.SqueezePressure1);
            $("#sizing_parameter_squeeze_pressure2").data("kendoNumericTextBox").value(model.SqueezePressure2);
        };
        this.grid = $("#dyeing_parameter_sizing").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            },
            columns: [
                { field: "SowBoxTemperature", title: "SowBoxTemperature(C)" },
                { field: "CookingTemperature", title: "CookingTemperature(C)" },
                { field: "SqueezePressure1", title: "SqueezePressure1(KN)" },
                { field: "SqueezePressure2", title: "SqueezePressure2(KN)" }
            ],
        }).data("kendoGrid");
        this.clearForm = function () {
            $("#sizing_parameter_id").val('');
            $("#sizing_parameter_sowbox_temperature").data("kendoNumericTextBox").value('');
            $("#sizing_parameter_cooking_temperature").data("kendoNumericTextBox").value('');
            $("#sizing_parameter_squeeze_pressure1").data("kendoNumericTextBox").value('');
            $("#sizing_parameter_squeeze_pressure2").data("kendoNumericTextBox").value('');

        }
        this.getFormData = function () {
            return {
                ID: $("#sizing_parameter_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                SowBoxTemperature: $("#sizing_parameter_sowbox_temperature").data("kendoNumericTextBox").value(),
                CookingTemperature: $("#sizing_parameter_cooking_temperature").data("kendoNumericTextBox").value(),
                SqueezePressure1: $("#sizing_parameter_squeeze_pressure1").data("kendoNumericTextBox").value(),
                SqueezePressure2: $("#sizing_parameter_squeeze_pressure2").data("kendoNumericTextBox").value(),
            }
        }
        this.saveSizingParameter = function (success) {
            var model = self.getFormData();
            backend.saveSizingParameter(model, success);
        }
        this.init = function () {
            $("#sizing_parameter_sowbox_temperature").kendoNumericTextBox();
            $("#sizing_parameter_cooking_temperature").kendoNumericTextBox();
            $("#sizing_parameter_squeeze_pressure1").kendoNumericTextBox();
            $("#sizing_parameter_squeeze_pressure2").kendoNumericTextBox();
            $("#sizing_parameter_save").click(function () {
                self.saveSizingParameter(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                });
            });
        }
    };
    var headStock = new function () {
        var self = this;
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_head_stock").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_head_stock").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllHeadStock?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.setFormData = function (model) {
            $("#head_stock_id").val(model.ID);
            $("#head_stock_dividing_table_tension").data("kendoNumericTextBox").value(model.DividingTableTension);
            $("#head_stock_winding_tension").data("kendoNumericTextBox").value(model.WindingTension);
            $("#head_stock_pressing_tension").data("kendoNumericTextBox").value(model.PressingTension);
            $("#head_stock_moisture").data("kendoNumericTextBox").value(model.Moisture);
        };
        this.grid = $("#dyeing_parameter_head_stock").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            },
            columns: [
                { field: "DividingTableTension", title: "DividingTableTension(N)" },
                { field: "WindingTension", title: "WindingTension(N)" },
                { field: "PressingTension", title: "PressingTension(N)" },
                { field: "Moisture", title: "Moisture(%)" }
            ],
        }).data("kendoGrid");
        this.clearForm = function () {
            $("#head_stock_id").val('');
            $("#head_stock_dividing_table_tension").data("kendoNumericTextBox").value('');
            $("#head_stock_winding_tension").data("kendoNumericTextBox").value('');
            $("#head_stock_pressing_tension").data("kendoNumericTextBox").value('');
            $("#head_stock_moisture").data("kendoNumericTextBox").value('');
        };
        this.getFormData = function () {
            return {
                ID: $("#head_stock_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                DividingTableTension: $("#head_stock_dividing_table_tension").data("kendoNumericTextBox").value(),
                WindingTension: $("#head_stock_winding_tension").data("kendoNumericTextBox").value(),
                PressingTension: $("#head_stock_pressing_tension").data("kendoNumericTextBox").value(),
                Moisture: $("#head_stock_moisture").data("kendoNumericTextBox").value(),
            }
        };
        this.saveHeadStock = function (success) {
            var model = this.getFormData();
            backend.saveHeadStock(model, success);
        }
        this.init = function () {
            $("#head_stock_dividing_table_tension").kendoNumericTextBox();
            $("#head_stock_winding_tension").kendoNumericTextBox();
            $("#head_stock_pressing_tension").kendoNumericTextBox();
            $("#head_stock_moisture").kendoNumericTextBox();
            $("#head_stock_save").click(function () {
                self.saveHeadStock(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                })
            });
            self.clearForm();
        }
    };
    var compensator = new function () {
        var self = this;
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_compensator").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_compensator").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllCompensator?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.setFormData = function (model) {
            $("#compensator_id").val(model.ID);
            $("#compensator_hydrolic_pressure").data("kendoNumericTextBox").value(model.HydrolicPressure);
            $("#compensator_tension").data("kendoNumericTextBox").value(model.Tension);
        };
        this.clearForm = function () {
            $("#compensator_id").val('');
            $("#compensator_hydrolic_pressure").data("kendoNumericTextBox").value('');
            $("#compensator_tension").data("kendoNumericTextBox").value('');
        };
        this.getFormData = function () {
            return {
                ID: $("#compensator_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                HydrolicPressure: $("#compensator_hydrolic_pressure").data("kendoNumericTextBox").value(),
                Tension: $("#compensator_tension").data("kendoNumericTextBox").value()
            }
        };
        this.saveCompensator = function (success) {
            var model = self.getFormData();
            backend.saveCompensator(model, success);
        }
        this.grid = $("#dyeing_parameter_compensator").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            },
            columns: [
                { field: "HydrolicPressure", title: "HydrolicPressure(Bar)" },
                { field: "Tension", title: "Tension(N)" },
            ],
        }).data("kendoGrid");
        this.init = function () {
            $("#compensator_hydrolic_pressure").kendoNumericTextBox();
            $("#compensator_tension").kendoNumericTextBox();
            $("#compensator_save").click(function () {
                self.saveCompensator(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                })
            });
            self.clearForm();
        }
    };
    var recipe = new function () {
        var self = this;
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_recipe").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_recipe").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllRecipe?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.setFormData = function (model) {
            $("#recipe_id").val(model.ID);
            $("#recipe_type").data("kendoComboBox").value(model.RecipeType);
            $("#recipe_item_name").data("kendoComboBox").value(model.ItemName);
            $("#recipe_quantity").data("kendoNumericTextBox").value(model.QuantityGpl);
        };
        this.grid = $("#dyeing_parameter_recipe").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            },
            columns: [
                { field: "RecipeType", title: "RecipeType" },
                { field: "ItemName", title: "ItemName" },
                { field: "QuantityGpl", title: "Quantity(gpl)" }
            ],
        }).data("kendoGrid");
        this.clearForm = function () {
            $("#recipe_id").val('');
            $("#recipe_type").data("kendoComboBox").value('');
            $("#recipe_item_name").data("kendoComboBox").value('');
            $("#recipe_quantity").data("kendoNumericTextBox").value('');
        };
        this.getFormData = function () {
            return {
                ID: $("#recipe_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                RecipeID: $("#recipe_type").data("kendoComboBox").value(),
                RecipeType: $("#recipe_type").data("kendoComboBox").text(),
                ItemID: $("#recipe_item_name").data("kendoComboBox").value(),
                ItemName: $("#recipe_item_name").data("kendoComboBox").text(),
                QuantityGpl: $("#recipe_quantity").data("kendoNumericTextBox").value(),
            }
        };
        this.saveRecipe = function (success) {
            var model = self.getFormData();
            backend.saveRecipe(model, success)
        };
        this.init = function () {
            $("#recipe_type").kendoComboBox({
                autoBind: false,
                filter: "contains",
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    data: [
                        { Id: 1, Name: "Black" },
                        { Id: 2, Name: "Bottoming" },
                        { Id: 3, Name: "Custic" },
                        { Id: 4, Name: "Indigo" },
                    ]
                },
                change: function () {
                    if (this.selectedIndex === -1 && this.value()) {
                        if (this.dataSource.view().length > 0) {
                            this.select(0)
                        } else {
                            this.value("");
                        }
                    }
                },
                select: function () {
                    //container.next().click();
                }
            }).data("kendoComboBox");
            $("#recipe_item_name").kendoComboBox({
                filter: "contains",
                autoBind: false,
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    data: [
                        { Id: 1, Name: "Acitic Acid" },
                        { Id: 2, Name: "Apex A" },
                        { Id: 3, Name: "Apex B" },
                        { Id: 4, Name: "Apex A-90" },
                    ]
                },
                change: function () {
                    if (this.selectedIndex === -1 && this.value()) {
                        if (this.dataSource.view().length > 0) {
                            this.select(0)
                        } else {
                            this.value("");
                        }
                    }
                },
                select: function () {
                    //container.next().click();
                }
            }).data("kendoComboBox");
            HdlCommonHelper.GenerateNumericTextBox("recipe_quantity");
            $("#recipe_save").click(function () {
                self.saveRecipe(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                });
            });
            self.clearForm();
        }
    };
    var creelLoading = new function () {
        var self = this;
        this.showDetail = function (setNo) {
            this.setDataSource(setNo);
            $("#div_creel_loading").show();
        };
        this.hideDetail = function () {
            self.grid.setDataSource(new kendo.data.DataSource({
                data: [],
                pageSize: 10,
            }));
            $("#div_creel_loading").hide();
        };
        this.setDataSource = function (setNo) {
            if (setNo) {
                var dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllCreelLoading?setNo=" + setNo
                        }
                    }
                });
                self.grid.setDataSource(dataSource);
            }
        };
        this.clearForm = function () {
            $("#creel_load_id").val('');
            $("#creel_load_upper_beam_no").data("kendoNumericTextBox").value('');
            $("#creel_load_upper_yarn_count").val('');
            $("#creel_load_lower_beam_no").data("kendoNumericTextBox").value('');
            $("#creel_load_lower_yarn_count").val('');
        };
        this.getFormData = function () {
            return {
                ID: $("#creel_load_id").val(),
                SetNo: $("#bi_set_no").data("kendoComboBox").text(),
                UpperCreelBeamNo: $("#creel_load_upper_beam_no").data("kendoNumericTextBox").value(),
                UpperCreelYarnCount: $("#creel_load_upper_yarn_count").val(),
                LowerCreelBeamNo: $("#creel_load_lower_beam_no").data("kendoNumericTextBox").value(),
                LowerCreelYarnCount: $("#creel_load_lower_yarn_count").val(),
            }
        };
        this.setFormData = function (model) {
            $("#creel_load_id").val(model.ID);
            $("#creel_load_upper_beam_no").data("kendoNumericTextBox").value(model.UpperCreelBeamNo);
            $("#creel_load_upper_yarn_count").val(model.UpperCreelYarnCount);
            $("#creel_load_lower_beam_no").data("kendoNumericTextBox").value(model.LowerCreelBeamNo);
            $("#creel_load_lower_yarn_count").val(model.LowerCreelYarnCount);
        };
        this.grid = $("#dyeing_parameter_creel_loading").kendoGrid({
            height: "225px",
            pageable: false,
            selectable: "row",
            change: function (arg) {
                var selected = this.select();
                self.setFormData(self.grid.dataItem(selected));
            },
            columns: [
                { field: "UpperCreelBeamNo", title: "UpperCreelBeamNo" },
                { field: "UpperCreelYarnCount", title: "UpperCreelYarnCount", },
                { field: "LowerCreelBeamNo", title: "LowerCreelBeamNo" },
                { field: "LowerCreelYarnCount", title: "LowerCreelYarnCount", }
            ],
        }).data("kendoGrid");
        this.saveCreelLoading = function (success) {
            var model = self.getFormData();
            backend.saveCreelLoading(model, success);
        };
        this.init = function () {
            HdlCommonHelper.GenerateNumericTextBox("creel_load_upper_beam_no");
            HdlCommonHelper.GenerateNumericTextBox("creel_load_lower_beam_no");
            $("#creel_load_save").click(function () {
                self.saveCreelLoading(function (res) {
                    self.grid.dataSource.read();
                    self.clearForm();
                });
            });
            self.clearForm();
        }
    };
    var dyeingUtilityHelper = new function () {
        var self = this;
        this.reset = function () {
            $("#bi_set_no").data("kendoComboBox").value('');
            $("#bi_set_no").data("kendoComboBox").trigger('change');
        }
        this.showDetail = function (setID, setNo) {
            basicInfo.showDetail(setID, setNo);
            dyeingStopRun.showDetail(setNo);
            dyeingTimeUtilization.showDetail(setNo);
            dyeingWastageDetail.showDetail(setNo);
            dyeingDrainageDetail.showDetail(setNo);
            creelUnit.showDetail(setNo);
            dyeingParameter.showDetail(setNo);
            sizingParameter.showDetail(setNo);
            headStock.showDetail(setNo);
            compensator.showDetail(setNo);
            creelLoading.showDetail(setNo);
            recipe.showDetail(setNo);
            $("#button_container").show();
            $("#div_button_container").show();
        };
        this.hideDetail = function () {
            basicInfo.hideDetail();
            dyeingStopRun.hideDetail();
            dyeingTimeUtilization.hideDetail();
            dyeingWastageDetail.hideDetail();
            dyeingDrainageDetail.hideDetail();
            creelUnit.hideDetail();
            dyeingParameter.hideDetail();
            sizingParameter.hideDetail();
            headStock.hideDetail();
            compensator.hideDetail();
            creelLoading.hideDetail();
            recipe.hideDetail();
            $("#button_container").hide();
            $("#div_button_container").hide();
        };
        this.init = function () {
            $("#bi_set_no").kendoComboBox({
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "../DyeingUtility/GetAllDyeingSet",
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
                    var setID = this.value();
                    if (setID != 0) {
                        dyeingUtilityHelper.showDetail(setID, setNo);
                    } else {
                        dyeingUtilityHelper.hideDetail(setNo);
                    }
                }
            });
            basicInfo.init();
            dyeingStopRun.init();
            dyeingTimeUtilization.init();
            dyeingWastageDetail.init();
            dyeingDrainageDetail.init();
            creelUnit.init();
            dyeingParameter.init();
            sizingParameter.init();
            headStock.init();
            compensator.init();
            recipe.init();
            creelLoading.init();
            $("#utilitySave").click(self.reset);
            $("#utilityClear").click(self.reset);
            $("#utilityExit").click(self.reset);
            btnDU
        };
    };
    dyeingUtilityHelper.init();
});



