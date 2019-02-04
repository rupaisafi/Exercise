var app = angular.module('myApp', ['kendo.directives']);

app.controller('finishingProductionCtrl', function ($scope, $q) {
    // var src=FinishingProduction
    var vm = this;
    $scope.finishingMaster = false;
    $scope.finishingDetail = false;
    $scope.finishingGrid = true;
    $scope.btnClose = false;

    $scope.newData = function () {
        $scope.finishingMaster = true;
        $scope.finishingDetail = true;
        $scope.finishingGrid = false;
        $scope.btnClose = true;
    }
    $scope.close = function () {
        $scope.finishingMaster = false;
        $scope.finishingDetail = false;
        $scope.finishingGrid = true;
        $scope.btnClose = false;
        FinishingProdSummaryHelper.InitFinishingProdSummary()
        $scope.data = [];


        $('#FID').val('')
        $("#mcType").data("kendoComboBox").value('');
        $("#mcType").data("kendoComboBox").text('');
        $("#DyeFloor").data("kendoComboBox").value('');
        $("#DyeFloor").data("kendoComboBox").text('');
        $("#Shift").data("kendoComboBox").value('');
        $("#Shift").data("kendoComboBox").text('');
        $("#prodType").data("kendoComboBox").value('');
        $("#prodType").data("kendoComboBox").text('');
        $("#runtime").val('');
        $("#offTime").val('');
        $(".remarks").val('');
        $("#Fdate").val('');
    }
    $scope.masterObj = {};


    //==========move next start ======================

    //mastermove//
    $scope.masterMoveDown = function (e, classname, combo) {
        if (e.keyCode === 13) {
            if (combo === 'combo') {
                $('.' + classname + '[data-role="combobox"]').data("kendoComboBox").focus();
            } else {
                $('.' + classname).focus();
            }


        }
    }
    $scope.aaaa = function (e, classname) {

        if (e.keyCode === 13) {

            var doc = e.currentTarget.classList[0];
            var ClassInc = doc.split('r');
            var getIncclass = parseInt(ClassInc[1]) + 10;
            $('.r' + getIncclass + '[data-role="combobox"]').data("kendoComboBox").focus();
        }
    }
    $scope.aaaa1 = function (e, classname, ind) {
        if (e.keyCode === 13) {
            if (ind > 9) {
                var doc = e.currentTarget.classList[0];
                var ClassInc = doc.split('r');
                var getIncclass = parseInt(ClassInc[1]) + 100;
                $('.r' + getIncclass).focus();
            } else {
                var doc = e.currentTarget.classList[0];
                var ClassInc = doc.split('r');
                var getIncclass = parseInt(ClassInc[1]) + 10;
                $('.r' + getIncclass).focus();
            }

        }
    }
    $scope.aaaa4 = function (e, classname, ind) {
        if (e.keyCode === 13) {
            if (ind > 9) {
                var doc = e.currentTarget.classList[0];
                var ClassInc = doc.split('r');
                var getIncclass = parseInt(ClassInc[1]) + 400;
                $('.r' + getIncclass).focus();
            } else {
                var doc = e.currentTarget.classList[0];
                var ClassInc = doc.split('r');
                var getIncclass = parseInt(ClassInc[1]) + 40;
                $('.r' + getIncclass).focus();
            }

        }
    }
    $scope.aaaa2 = function (e, classname, ind) {
        debugger
        if (e.keyCode === 13) {
            if (ind > 9) {
                $scope.addNewRow()
                var doc = e.currentTarget.classList[0];
                var ClassInc = doc.split('r');
                var getIncclass = parseInt(ClassInc[1]) + 100;
                $('.r' + getIncclass).focus();
            } else {
                $scope.addNewRow()
                var doc = e.currentTarget.classList[0];
                var ClassInc = doc.split('r');
                var getIncclass = parseInt(ClassInc[1]) + 10;
                $('.r' + getIncclass).focus();
            }

        }
    }

    $scope.saveMaster = function (e) {
        if (e.keyCode === 13) {
            //convert date


            $scope.masterObj.FID = $('#FID').val() === undefined || $('#FID').val() === null ? 0 : $('#FID').val();
            $scope.masterObj.McCode = $("#mcType").data("kendoComboBox").value();
            $scope.masterObj.McName = $("#mcType").data("kendoComboBox").text();
            $scope.masterObj.Remarks = $scope.remarks === undefined ? '' : $scope.remarks;

            $scope.masterObj.UCode = $("#DyeFloor").data("kendoComboBox").value();
            $scope.masterObj.UName = $("#DyeFloor").data("kendoComboBox").text();
            $scope.masterObj.ShiftCode = $("#Shift").data("kendoComboBox").value();
            $scope.masterObj.Shift = $("#Shift").data("kendoComboBox").text();
            $scope.masterObj.PCode = $("#prodType").data("kendoComboBox").value();
            $scope.masterObj.PType = $("#prodType").data("kendoComboBox").text();
            $scope.masterObj.MCRunTime = $("#runtime").val();
            $scope.masterObj.MCOffTime = $("#offTime").val();
            if ($scope.masterObj.Fdate === "" || $scope.masterObj.McCode === "0" || $scope.masterObj.UCode === "0" || $scope.masterObj.ShiftCode === "0" || $scope.masterObj.Prodcode === "0") {
                if ($('#Fdate').val() === "") {
                    $.bootstrapGrowl("Please Input Date", {
                        ele: 'body',
                        type: 'danger',
                        offset: { from: 'bottom', amount: 50 },
                        align: 'right',
                        width: 250,
                        delay: 4000,
                        allow_dismiss: true,
                    });
                    return;
                }
                if ($scope.masterObj.McCode === "0") {
                    $.bootstrapGrowl("Please select M/C Type", {
                        ele: 'body',
                        type: 'danger',
                        offset: { from: 'bottom', amount: 50 },
                        align: 'right',
                        width: 250,
                        delay: 4000,
                        allow_dismiss: true,
                    });
                    return;
                }
                if ($scope.masterObj.UCode === "0") {
                    $.bootstrapGrowl("Please select Dye Floor", {
                        ele: 'body',
                        type: 'danger',
                        offset: { from: 'bottom', amount: 50 },
                        align: 'right',
                        width: 250,
                        delay: 4000,
                        allow_dismiss: true,
                    });
                    return;
                }
                if ($scope.masterObj.ShiftCode === "0") {
                    $.bootstrapGrowl("Please select Shift ", {
                        ele: 'body',
                        type: 'danger',
                        offset: { from: 'bottom', amount: 50 },
                        align: 'right',
                        width: 250,
                        delay: 4000,
                        allow_dismiss: true,
                    });
                    return;
                }

                if ($scope.masterObj.Prodcode === "0") {
                    $.bootstrapGrowl("Please select Prod Type ", {
                        ele: 'body',
                        type: 'danger',
                        offset: { from: 'bottom', amount: 50 },
                        align: 'right',
                        width: 250,
                        delay: 4000,
                        allow_dismiss: true,
                    });
                    return;
                }
            } else {
                var currentdate = $('#Fdate').val();
                var splitDate = currentdate.split('/');
                var newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]
                $scope.masterObj.Fdate = newDate;
                var objdata = $scope.masterObj;
                if (objdata.FID === 0 || objdata.FID === "0" || objdata.FID === "") {
                    $.ajax({
                        type: "POST",
                        url: "../FinishingProduction/SaveFinishingMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            //debugger;
                            if (parseInt(data) > 0) {
                                $scope.masterObj.FID = parseInt(data);
                                $('#FID').val(parseInt(data));
                                $scope.masterObj

                                $.bootstrapGrowl("Successfully Saved ", {
                                    ele: 'body',
                                    type: 'success',
                                    offset: { from: 'bottom', amount: 50 },
                                    align: 'right',
                                    width: 250,
                                    delay: 4000,
                                    allow_dismiss: true,
                                });
                            }

                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        url: "../FinishingProduction/SaveFinishingMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            //debugger;
                            $scope.masterObj.FID = parseInt(data);
                            $('#FID').val(parseInt(data));
                            $scope.masterObj

                            $.bootstrapGrowl("Successfully Updated ", {
                                ele: 'body',
                                type: 'success',
                                offset: { from: 'bottom', amount: 50 },
                                align: 'right',
                                width: 250,
                                delay: 4000,
                                allow_dismiss: true,
                            });
                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                }


            }

        }
    }
    $scope.saveMasterDetailAndMoveNext = function (e, ind, model) {
        var doc = e.currentTarget.classList[0];
        if (e.keyCode === 13) {
            console.log(model);
            //  model.FID = 10;
            if ($('#FID').val() === "" || $('#FID').val() === "0" || $('#FID').val() === undefined || $('#FID').val() === 0) {
                $.bootstrapGrowl("Insert Master Information First", {
                    ele: 'body',
                    type: 'danger',
                    offset: { from: 'bottom', amount: 50 },
                    align: 'right',
                    width: 250,
                    delay: 4000,
                    allow_dismiss: true,
                });
            } else {
                //$scope.saveMaster();
                if ($('#r24' + ind).val() === 0 || $('#r24' + ind).val() === "" || $('#r24' + ind).val() === undefined || $('#r24' + ind).val() === null) {
                    model.OName = $('.r16' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.OpName = $('.r17' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.ProdType = $('.r18' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.FID = parseInt($('#FID').val());
                    model.FPID = 0;
                    model.BeamNo = $('.r3' + ind).val();
                    model.StyleCode = $('.r6' + ind).val();
                    model.Weave = $('.r7' + ind).val();
                    model.Color = $('.r8' + ind).val();
                    $.ajax({
                        type: "post",
                        url: "../finishingproduction/savefinishingdetailinfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('#r24' + ind).val(parseInt(data))
                                $scope.data[ind][0].FPID = parseInt(data)
                                //$scope.data;
                                $.bootstrapGrowl("Successfully Inserted ", {
                                    ele: 'body',
                                    type: 'success',
                                    offset: { from: 'bottom', amount: 50 },
                                    align: 'right',
                                    width: 250,
                                    delay: 4000,
                                    allow_dismiss: true,
                                });
                            }
                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                } else {
                    model.OName = $('.r16' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.OpName = $('.r17' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.ProdType = $('.r18' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.FID = parseInt($('#FID').val());
                    model.FPID = parseInt($('#r24' + ind).val());
                    model.BeamNo = $('.r3' + ind).val();
                    model.StyleCode = $('.r6' + ind).val();
                    model.Weave = $('.r7' + ind).val();
                    model.Color = $('.r8' + ind).val();

                    $.ajax({
                        type: "post",
                        url: "../finishingproduction/savefinishingdetailinfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('#r24' + ind).val(parseInt(data))
                                $scope.data[ind][0].FPID = parseInt(data)
                                //$scope.data;
                                $.bootstrapGrowl("Successfully Updated ", {
                                    ele: 'body',
                                    type: 'success',
                                    offset: { from: 'bottom', amount: 50 },
                                    align: 'right',
                                    width: 250,
                                    delay: 4000,
                                    allow_dismiss: true,
                                });
                            }

                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                }
            }

            var index = ind + 1;
            $('.rx' + index + '[data-role="combobox"]').data("kendoComboBox").focus();

            setTimeout(function () { $('.rx' + index + '[data-role="combobox"]').data("kendoComboBox").focus(); }, 200);
        }
    }

    //==========move next end======================

    //Multiple Dropdown load at the same time on pageload
    activate();

    function activate() {
        var promises = [getAllOnPageLoad()];
        return $q.all(promises).then(function () { });
    }

    function getAllOnPageLoad() {
        HdlCommonHelper.unitCombo("DyeFloor");
        HdlCommonHelper.GenerateMachineNameComboForFinishing("mcType");
        HdlCommonHelper.shiftCombo("Shift");
        HdlCommonHelper.GenerateProdTypeCombo("prodType");
        FinishingProdSummaryHelper.InitFinishingProdSummary()

    }




    $scope.data = [];
    var temp;
    var control = {};

    $scope.addNewRow = function () {
        // create a blank array
        var newrow = [];

        if ($scope.data.length === 0) {
            newrow = [{
                FPID: 0,
                SetNo: null,
                SSNo: null,
                BeamNo: null,
                LoomNo: null,
                TrollyNo: '',
                StyleNo: null,
                Weave: '',
                Color: '',
                Width: '',
                InputWidth: '',
                OutWidth: '',
                Input: '',
                Output: '',
                Shrinkage: '',
                Skew: '',
                Cap: null,
                OpName: null,
                ProcCode: null,
                ProcessType: '',
                RPM: '',
                Moisture: '',
                Temparature: '',
                FinishingRoute: null,
                Remarks: '',
                FPID: '',
                UName: null
            }];
        } else {
            $scope.data[0].forEach(function (row) {
                newrow.push({
                    FPID: 0,
                    SetNo: null,
                    SSNo: null,
                    BeamNo: null,
                    LoomNo: null,
                    TrollyNo: '',
                    StyleNo: null,
                    Weave: '',
                    Color: '',
                    Width: '',
                    InputWidth: '',
                    OutWidth: '',
                    Input: '',
                    Output: '',
                    Shrinkage: '',
                    Skew: '',
                    Cap: null,
                    OpName: null,
                    ProcCode: null,
                    ProcessType: '',
                    RPM: '',
                    Moisture: '',
                    Temparature: '',
                    FinishingRoute: null,
                    Remarks: '',
                    FPID: '',
                    UName: null
                });
            });
        }

        $scope.data.push(newrow);
        var temp = $scope.data;
    };

    $scope.optSetNo = {
        placeholder: "--- Select ---",
        dataTextField: "SetNo",
        dataValueField: "SetNo",
        dataSource: GetAllSetNo(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    //tgt.parent().siblings("input[data-role='combobox']").data("kendoComboBox");
                    setTimeout(function () {
                        tgt.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            console.log(e.sender.element[0].classList[0]);
            var setNo = this.value();
            control.SetNo = setNo;
            var wgt = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (setNo > 0) {
                getAllProductionSLNo(setNo, function (res) {
                    wgt.setDataSource(new kendo.data.DataSource({
                        data: res
                    }));
                })
            } else {
                wgt.setDataSource(new kendo.data.DataSource({
                    data: []
                }));
            }

            //var doc = e.sender.element[0].classList[0];
            //var ClassInc = doc.split('r');
            //var getIncclass3 = parseInt(ClassInc[1]) + 10;
            //var loomClass = parseInt(ClassInc[1]) + 30;
            //var getIncclass = parseInt(ClassInc[1]) + 60;
            //var getIncclass1 = parseInt(ClassInc[1]) +70;
            //var getIncclass2 = parseInt(ClassInc[1]) + 80;

            var item = this.dataItem(this.select())
            var StyleNo = e.sender.element.closest("td").next().next().next().next().next().find('input#StyleCode');
            StyleNo.val(item.StyleNo)
            var Weave = e.sender.element.closest("td").next().next().next().next().next().next().find('input#Weave');
            Weave.val(item.Weave)
            var Color = e.sender.element.closest("td").next().next().next().next().next().next().next().find('input#Color');
            Color.val(item.Colour)
            //$('.r' + getIncclass).val(item.StyleNo);
            //$('.r' + getIncclass1).val(item.Weave);
            //$('.r' + getIncclass2).val(item.Colour);

            var SSNo = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            SSNo.value('');
            var LoomNo = e.sender.element.closest("td").next().next().next().find('input[data-role="combobox"]').data("kendoComboBox");
            LoomNo.value('');
            var BeamNo = e.sender.element.closest("td").next().next().find('input');
            BeamNo.val('')
            // e.sender.element.closest("td").next().next().next().find('input[data-role="combobox"]').data("kendoComboBox").Value('');
            //$('.r' + loomClass + '[data-role="combobox"]').data("kendoComboBox").value('');
            //$('.r' + getIncclass3 + '[data-role="combobox"]').data("kendoComboBox").value('');

        }


    };
    $scope.optSSNo = {
        placeholder: "--- Select ---",
        dataTextField: "SSNo",
        dataValueField: "SSNo",
        dataSource: [],
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    setTimeout(function () {
                        tgt.closest("td").next().next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var SSNo = this.value();
            var SetNo = e.sender.element.closest("td").prev().find('input[data-role="combobox"]').data("kendoComboBox").value();
            control.SSNo = SSNo;
            control.SetNo = SetNo;
            var wgt = e.sender.element.closest("td").next().next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (SSNo > 0) {
                GetFinishingLoomNo(control.SetNo, control.SSNo, function (res) {
                    wgt.setDataSource(new kendo.data.DataSource({
                        data: res
                    }));
                })
            } else {
                wgt.setDataSource(new kendo.data.DataSource({
                    data: []
                }));
            }

            //var doc = e.sender.element[0].classList[0];
            //var ClassInc = doc.split('r');
            //var getIncclass = parseInt(ClassInc[1]);
            //var getIncclass1 = parseInt(ClassInc[1]) + 20;
            //var getIncclass2 = parseInt(ClassInc[1]) + 10;

            var item = this.dataItem(this.select())
            //$('.r' + getIncclass2).val(item.BeamNo);
            var BeamNo = e.sender.element.closest("td").next().find('input#BeamNo');
            BeamNo.val(item.BeamNo)
            var LoomNo = e.sender.element.closest("td").next().next().find('input[data-role="combobox"]').data("kendoComboBox");
            LoomNo.value('');
            //var BeamNo = e.sender.element.closest("td").next().find('input');
            //BeamNo.val('')
            //$('.r' + getIncclass1 + '[data-role="combobox"]').data("kendoComboBox").value('');
            //SlNo = $('.' + doc + '[data-role="combobox"]').data("kendoComboBox").value();
            //// GetFinishingBeamNo(SetNo, SlNo);
            //setTimeout(function () { $('.r' + getIncclass1 + '[data-role="combobox"]').data("kendoComboBox").focus(); }, 50);

        }
    };
    $scope.optLoomNo = {
        placeholder: "--- Select ---",
        dataTextField: "Loom",
        dataValueField: "Loom",
        dataSource: [],
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    setTimeout(function () {
                        tgt.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var wgt = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (wgt !== undefined) {
                wgt.value('');
                wgt.focus()
            } else {
                var wgt = e.sender.element.closest("td").next().find('input');
                wgt.focus()
            }

        }
    };
    $scope.optProdType = {
        placeholder: "--- Select ---",
        dataTextField: "Type",
        dataValueField: "TCode",
        dataSource: GetProdType(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    setTimeout(function () {
                        tgt.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var wgt = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (wgt !== undefined) {
                wgt.value('');
                wgt.focus()
            } else {
                var wgt = e.sender.element.closest("td").next().find('input');
                wgt.focus()
            }

        }
    };
    $scope.optOperatorName = {
        placeholder: "--- Select ---",
        dataTextField: "Name",
        dataValueField: "CardNo",
        dataSource: GetOperatorName(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    setTimeout(function () {
                        tgt.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var wgt = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (wgt !== undefined) {
                wgt.value('');
                wgt.focus()
            } else {
                var wgt = e.sender.element.closest("td").next().find('input');
                wgt.focus()
            }

        }
    };
    $scope.optCapName = {
        placeholder: "--- Select ---",
        dataTextField: "Name",
        dataValueField: "CardNo",
        dataSource: GetOperatorName(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    setTimeout(function () {
                        tgt.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var wgt = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (wgt !== undefined) {
                wgt.value('');
                wgt.focus()
            } else {
                var wgt = e.sender.element.closest("td").next().find('input');
                wgt.focus()
            }

        }
    };
    $scope.optFinishingRoute = {
        placeholder: "--- Select ---",
        dataTextField: "RouteType",
        dataValueField: "FID",
        dataSource: GetFinishingRoute(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    var tgt = $(e.target);
                    setTimeout(function () {
                        tgt.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox").focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var wgt = e.sender.element.closest("td").next().find('input[data-role="combobox"]').data("kendoComboBox");
            if (wgt !== undefined) {
                wgt.value('');
                wgt.focus()
            } else {
                var wgt = e.sender.element.closest("td").next().find('input');
                wgt.focus()
            }

        }
    };
    function GetAllSetNo() {
        var objSet = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionNonDispatch/GetPlanningSetNo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ SetNo: 0, SetNo: "---Select---" });
            objSet = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSet;
    }
    function getAllProductionSLNo(SetNo, onSuccess) {
        var objItmList = "";
        var jsonParam = "";
        var SlNo = "";
        var serviceUrl = "../FinishingProduction/GetAllProductionSLNo?SetNo=" + SetNo;
        if (typeof (onSuccess) == 'function') {
            AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        } else {
            AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, function (jsonData) {
                objItmList = jsonData;
            }, onFailed);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objItmList;
    }
    function GetFinishingLoomNo(SetNo, SLNo, onSuccess) {
        var objItmList = "";
        var jsonParam = "";
        var serviceUrl = "../FinishingProduction/GetFinishingLoomNo?setNo=" + SetNo + "&SLNo=" + SLNo;
        if (typeof (onSuccess) == 'function') {
            AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        } else {
            AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, function (jsonData) {
                objItmList = jsonData;
            }, onFailed);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return objItmList;
    }
    function GetProdType() {
        var objProdType = "";
        var jsonParam = "";
        var serviceUrl = "../FinishingProduction/GetProdType/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ TCode: 0, Type: "---Select---" });
            objProdType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objProdType;
    }
    function GetOperatorName() {
        var objOperator = "";
        var jsonParam = "";
        var serviceUrl = "../FinishingProduction/GetFinishingOperator/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ CardNo: 0, Name: "---Select---" });
            objOperator = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOperator;
    }
    function GetFinishingRoute() {
        var objRoute = "";
        var jsonParam = "";
        var serviceUrl = "../FinishingProduction/GetFinishingRoute/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ FID: 0, RouteType: "---Select---" });
            objRoute = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objRoute;
    }

    $scope.GetDetail = function (arg) {
        //$('#finishingGrid').hide();
        $scope.$apply(function () {
            $scope.newData()
        })
        $.ajax({
            url: "../FinishingProduction/GetProductionDetail?FID=" + parseInt(arg),
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                //debugger

                var master = [];

                var newrow = [];
                if ($scope.data.length === 0) {
                    newrow = [data[0]];
                    master.push(newrow);
                }

                for (var i = 1; i <= data.length - 1; i++) {
                    newrow = [data[i]];
                    master.push(newrow);
                }
                $scope.$apply(function () {
                    $scope.data = master;
                    //for (var i = 0; i < $scope.data.length; i++) {
                    //    var lst = getAllProductionSLNo($scope.data[i][0].SetNo);
                    //    var elm = $(".r2" + 1 + "[data-role='combobox']");
                    //    console.log(elm);
                    //}

                })
            }
        });
    }
    $scope.getSSNoData = function (arg) {
        debugger
        console.log();
        if (arg[0].SetNo) {
            return getAllProductionSLNo(arg[0].SetNo);
        } else {
            return [];
        }

    }
    $scope.getLoomNoData = function (arg) {
        debugger
        console.log(arg);
        if (arg[0].SetNo && arg[0].SizingNo) {
            return GetFinishingLoomNo(arg[0].SetNo, arg[0].SizingNo);
        } else {
            return [];
        }

    }
    $scope.calculateShrinkage = function (model, index) {
        var BeforeFin = parseInt(model.BeforeFin === undefined || model.BeforeFin === null || model.BeforeFin === '' ? 0 : model.BeforeFin);
        var AfterFin = parseInt(model.AfterFin === undefined || model.AfterFin === null || model.AfterFin === '' ? 0 : model.AfterFin);
        $scope.data[index][0].AfterFinShrinkag = (((parseInt(BeforeFin) - parseInt(AfterFin)) / parseInt(AfterFin)) * 100) === Infinity || (((parseInt(BeforeFin) - parseInt(AfterFin)) / parseInt(AfterFin)) * 100) === 'InFinity' ? 0 : (((parseInt(BeforeFin) - parseInt(AfterFin)) / parseInt(AfterFin)) * 100).toFixed(2);
    }
});