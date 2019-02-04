//numeric input
function (evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;

    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        return false;
    } else {
        if (iKeyCode == 46) {
            if (evt.target.data && evt.target.data.hasDigit) {
                return false;
            } else {
                evt.target.data = { hasDigit: true };
                return true;
            }
        } else {
            return true;
        }
    }
    console.log(iKeyCode);
    //console.log($(evt.target).val())

}

var dyeingStopRun = new function () {
    var self = this;
    this.getDataSource = function () {
        return new kendo.data.DataSource({
            pageSize: 10,
            //data: [
            //    { Id: 1, DepartmentName: { Id: 1, Name: "ERP" }, SlowFromTime: "05:20 AM", SlowToTime: "06:01 AM", StopFromTime: "04:26 AM", StopToTime: "04:51 AM", DurationTime: "00:30", Reason: { Id: 1, Name: "Boiler" }, Stop: 100, ProductionLossMeter: 1000, GGradeYarnMeter: 1000 },
            //    { Id: 2, DepartmentName: { Id: 1, Name: "ERP" }, SlowFromTime: "05:21 AM", SlowToTime: "06:02 AM", StopFromTime: "04:27 AM", StopToTime: "04:52 AM", DurationTime: "00:30", Reason: { Id: 2, Name: "Dyeing" }, Stop: 100, ProductionLossMeter: 1000, GGradeYarnMeter: 1000 },
            //    { Id: 3, DepartmentName: { Id: 1, Name: "ERP" }, SlowFromTime: "05:22 AM", SlowToTime: "06:03 AM", StopFromTime: "04:28 AM", StopToTime: "04:53 AM", DurationTime: "00:30", Reason: { Id: 2, Name: "Dyeing" }, Stop: 100, ProductionLossMeter: 1000, GGradeYarnMeter: 1000 },
            //    { Id: 4, DepartmentName: { Id: 1, Name: "ERP" }, SlowFromTime: "05:23 AM", SlowToTime: "06:04 AM", StopFromTime: "04:29 AM", StopToTime: "04:54 AM", DurationTime: "00:30", Reason: { Id: 1, Name: "Boiler" }, Stop: 100, ProductionLossMeter: 1000, GGradeYarnMeter: 1000 }
            //],
            transport: {
                read: {
                    url: "../DyeingUtility/GetAllDyeingUtilityRunAndStop",
                    data: {
                    },
                    dataType: "json"
                },
                update: {
                    url: "../",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "../",
                    dataType: "jsonp"
                },
                create: {
                    url: "../",
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                },
            },
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { editable: false, nullable: true },
                        DepartmentName: { type: "text", defaultValue: "", validation: { required: true } },
                        SlowFromTime: { type: "number", validation: { required: true } },
                        SlowToTime: { type: "number", validation: { required: true } },
                        StopFromTime: { type: "number", validation: { required: true } },
                        StopToTime: { type: "number", validation: { required: true } },
                        Duration: { type: "number", validation: { required: true } },
                        ReasonName: { type: "text", defaultValue: "", validation: { required: true } },
                        ReasonType: { type: "text", validation: { required: true } },
                        ProductionLossMeter: { type: "number", validation: { required: true } },
                        CGradeYarnMeter: { type: "number", validation: { required: true } },
                    }
                }
            }
        });
    };
    this.setDataSource = function (setNo) {
        if (setNo) {
            var dataSource = new kendo.data.DataSource({
                pageSize: 10,
                transport: {
                    read: {
                        url: "../DyeingUtility/GetAllDyeingUtilityRunAndStop?setNo=" + setNo
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
    this.getDeptNameEditor = function (container, options) {
        var widget = $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                filter: "contains",
                autoBind: false,
                dataTextField: "DName",
                dataValueField: "DName",
                dataSource: HdlCommonManager.GetAllDepartment(),
                change: function () {
                    //if (this.selectedIndex === -1 && this.value()) {
                    //    if (this.dataSource.view().length > 0) {
                    //        this.select(0)
                    //    } else {
                    //        this.value("");
                    //    }
                    //}
                },
                select: function () {
                    container.next().click();
                }
            }).data("kendoComboBox");
        widget.open();
    };
    this.getReasonEditor = function (container, options) {
        var widget = $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                filter: "contains",
                autoBind: false,
                dataTextField: "IType",
                dataValueField: "IType",
                dataSource: HdlCommonManager.GetAllItemType(),
                change: function () {
                    //if (this.selectedIndex === -1 && this.value()) {
                    //    if (this.dataSource.view().length > 0) {
                    //        this.select(0)
                    //    } else {
                    //        this.value("");
                    //    }
                    //}
                },
                select: function () {
                    container.next().click();
                }
            }).data("kendoComboBox");
        widget.open();
    };
    this.timePicker = function (container, options) {
        var widget = $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoTimePicker({
                format: "hh:mm tt",
                interval: 1,
                change: function () {
                    container.next().click();
                }
            }).data("kendoTimePicker");
        widget.open();
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
    this.grid = $("#dyeing_stop_run_grid").kendoGrid({
        pageable: true,
        editable: true,
        navigateable: true,
        toolbar: [{ name: "create", text: "Create" }],
        dataSource: self.getDataSource(),
        columns: self.getColumns(),
        edit: function (e) {
            //console.log(e.model);
            //var setNo = $("#bi_set_no").val();
            //if (setNo) {
            //    e.model.SetNo = setNo;
            //    if (e.model.DepartmentName && e.model.ReasonName) {
            //        backend.saveDyeingStopAndRun(e.model, function (res) {
            //            console.log(res);
            //        });
            //    }
            //}
        },
        save: function (e) {
            //var setNo = $("#bi_set_no").val();
            //if (setNo) {
            //    e.model.SetNo = setNo;
            //    if (e.model.DepartmentName && e.model.ReasonName) {
            //        backend.saveDyeingStopAndRun(e.model, function (res) {
            //            //console.log(res);
            //        });
            //    }
            //}
        }

    }).data("kendoGrid");
    this.init = function () {

        HdlCommonHelper.GenerateDepartmentCombo("stop_run_department");
        HdlCommonHelper.GenerateTimePicker("stop_run_slow_from");
        HdlCommonHelper.GenerateTimePicker("stop_run_slow_to");
        HdlCommonHelper.GenerateTimePicker("stop_run_stop_from");
        HdlCommonHelper.GenerateTimePicker("stop_run_stop_to");
        HdlCommonHelper.GenerateTimePicker("stop_run_duration", {
            format: "hh:mm",
            interval: 1,
            value: new Date()
        });
        HdlCommonHelper.GenerateReasonCombo("stop_run_reason");
        $("#stop_run_save").click(function () {

        })
    }
};

function dynamictable() {

    $(".ldtLoomNo").kendoComboBox({
        placeholder: "--- Select ---",
        dataTextField: "Text",
        dataValueField: "Value",
        dataSource: [
            { Text: "A-1", Value: "A" },
            { Text: "B-1", Value: "C" },
            { Text: "C-1", Value: "C" }
        ],
    });
    $(".ldtReason").kendoComboBox({
        placeholder: "--- Select ---",
        dataTextField: "Text",
        dataValueField: "Value",
        dataSource: [
            { Text: "Beam Mounting", Value: "A" },
            { Text: "Beam Running", Value: "C" },
            { Text: "Beam Shortage", Value: "C" }
        ]
    });
    $(".ldtStopTime").kendoNumericTextBox({});
    $(".ldtRuntime").kendoNumericTextBox({});
    $(".ldtTotalTime").kendoNumericTextBox({});
    $(".ldtRemarks").addClass("k-input k-textbox");
    $("#ldtLDate").kendoDatePicker({
        format: "dd-MM-yyyy",
        value: new Date()
    });
    function AddRow(container) {

        //debugger;
    }
    function getCombo(option, container) {
        //var elm = $("<input>")
        //    .appendTo(container);
        //var wgt = elm.kendoComboBox(option).data("kendoComboBox");
        //wgt.input.focus(function () {
        //    wgt.open();
        //});
        //wgt.input.keyup(option.keyup);
        //wgt.bind("change", option.select);
        //wgt.bind("change", option.change);
        //return container;
    }
    AddRow($("#container"));
    +function addRow() { };
    +function newCombo(option, container) {
        //var elm = $("<input>").appendTo(container);
        //var wgt = elm.kendoComboBox(option).data("kendoComboBox");
        //wgt.input.focus(function () {
        //    wgt.open();
        //});
        //wgt.input.keyup(function (e) {
        //    if (e.keyCode === 13) {

        //    }
        //});
        //wgt.bind("change", option.select);
        //wgt.bind("change", option.change);
        //return container;
    };
    +function prevControl(e) {
        var prevTD = $(e.currentTarget).closest("td").prev("td");
        var input = prevTD && prevTD.find("input[data-role]");
        if (input) {
            var role = input.attr('data-role');
            if (role == 'combobox') {
                return input.data("kendoComboBox");
            } else if (role == 'numerictextbox') {
                return input.data("kendoNumericTextBox");
            } else {
                return;
            }
        }
    };
    +function nextControl(e) {
        var nextTD = $(e.currentTarget).closest("td").next("td");
        var input = nextTD && nextTD.find("input[data-role]");
        if (input) {
            var role = input.attr('data-role');
            if (role == 'combobox') {
                return input.data("kendoComboBox");
            } else if (role == 'numerictextbox') {
                return input.data("kendoNumericTextBox");
            } else {
                return;
            }
        }
    };
    +function () {
        //.append(getCombo({
        //    placeholder: "--- Select ---",
        //    dataTextField: "Text",
        //    dataValueField: "Value",
        //    dataSource: [
        //        { Text: "A-1", Value: "A" },
        //        { Text: "B-1", Value: "C" },
        //        { Text: "C-1", Value: "C" }
        //    ],
        //    change: function (e) {
        //        //console.log(e.sender.value());
        //    },
        //    select: function (e) {
        //        console.log(e.sender.value())
        //    },
        //    keyup: function () {
        //        alert()
        //        this.closest("td").next("td").find('input[data-role="combobox"]').data("kendoComboBox").open();
        //    }
        //}, $("<td>")))
        //    .append(getCombo({
        //        placeholder: "--- Select ---",
        //        dataTextField: "Text",
        //        dataValueField: "Value",
        //        dataSource: [
        //            { Text: "A-1", Value: "A" },
        //            { Text: "B-1", Value: "C" },
        //            { Text: "C-1", Value: "C" }
        //        ],
        //        change: function (e) {
        //            //console.log(e.sender.value());
        //        },
        //        select: function (e) {
        //            console.log(e.sender.value())
        //        },
        //        keyup: function () {
        //            alert()
        //        }
        //    }, $("<td>")))
    }
}


var asdf = {
    required: true,
    title: "Operator",
    field: "OperatorName",
    control: {
        type: "combo",
        text: "",
        value: "",
    }
};


//angular helper
function region() {
    var app = angular.module("hdl", ["kendo.directives"])
        .controller("ctrlDetail", function ($scope) {
            $scope.loomDownTime = {
                isValid: true,
            };
            $scope.loomDownTimeData = [
                { ID: 1, Loom: "A-1", Reason: "Reason-1", StopTime: "11:12", RunTime: "12:00", TotalTime: "00.48", Remark: "Test1" },
                { ID: 2, Loom: "B-1", Reason: "Reason-1", StopTime: "11:12", RunTime: "12:00", TotalTime: "00.48", Remark: "Test1" },
                { ID: 3, Loom: "C-1", Reason: "Reason-1", StopTime: "11:12", RunTime: "12:00", TotalTime: "00.48", Remark: "Test1" }
            ];
            $scope.loomOption = {
                filter: "contains",
                placeholder: "---Select---",
                dataValueField: "ID",
                dataTextField: "Name",
                dataSource: [
                    { ID: 1, Name: "A-1" },
                    { ID: 2, Name: "A-2" },
                    { ID: 3, Name: "A-3" },
                    { ID: 4, Name: "B-1" },
                    { ID: 5, Name: "B-2" },
                    { ID: 6, Name: "B-3" },
                    { ID: 7, Name: "C-1" },
                    { ID: 8, Name: "C-2" },
                    { ID: 9, Name: "C-3" },
                    { ID: 10, Name: "D-1" },
                    { ID: 11, Name: "D-2" },
                    { ID: 12, Name: "D-3" },
                    { ID: 13, Name: "E-1" },
                    { ID: 14, Name: "E-2" },
                    { ID: 15, Name: "E-3" },
                ],
            };
            $scope.reasonOption = {
                filter: "contains",
                placeholder: "---Select---",
                dataValueField: "ID",
                dataTextField: "Name",
                dataSource: [
                    { ID: 1, Name: "Reason-1" },
                    { ID: 2, Name: "Reason-2" },
                    { ID: 3, Name: "Reason-3" },
                    { ID: 4, Name: "Reason-3" },
                    { ID: 5, Name: "Reason-3" },
                    { ID: 6, Name: "Reason-3" },
                    { ID: 7, Name: "Reason-3" },
                    { ID: 8, Name: "Reason-3" },
                    { ID: 9, Name: "Reason-3" },
                    { ID: 10, Name: "Reason-3" },
                    { ID: 11, Name: "Reason-3" },
                    { ID: 12, Name: "Reason-3" },
                    { ID: 13, Name: "Reason-3" },
                    { ID: 14, Name: "Reason-3" },
                    { ID: 15, Name: "Reason-3" },
                ],
            };
            $scope.stopTimeOption = {
                mask: "ab:c0",
                rules: {
                    "a": /[012]/,
                    "b": /[0123]/,
                    "c": /[012345]/
                },
                change: function () {
                    console.log(this);
                    console.log(this.value());
                }
            };
            $scope.getTotalTime = function (from, to, total) {
                var minutes = $scope.getMinute(to) - $scope.getMinute(from);
                var result = (parseInt(minutes / 60) + "." + (minutes % 60));
                console.log(result);
                return result;
            }
            $scope.getMinute = function (input) {
                var arr = input.split(":")
                return parseInt(arr[0]) * 60 + parseInt(arr[1]);
            };
            $scope.runTimeOption = {
                mask: "ab:c0",
                rules: {
                    "a": /[012]/,
                    "b": /[0123]/,
                    "c": /[012345]/
                }
            };
            $scope.totalTimeOption = {
                mask: "ab:c0",
                rules: {
                    "a": /[012]/,
                    "b": /[0123]/,
                    "c": /[012345]/
                }
            };
            $scope.newLoomDownTime = function () {
                $scope.loomDownTime.isValid = false;
                var last = $scope.loomDownTimeData[$scope.loomDownTimeData.length - 1].ID;
                $scope.loomDownTimeData.push({ ID: last + 1, Loom: "", Reason: "", StopTime: "", RunTime: "", TotalTime: "", Remark: "", isNew: true });
            }
        })
}