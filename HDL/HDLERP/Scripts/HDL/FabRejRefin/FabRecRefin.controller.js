var app = angular.module('myApp', ['kendo.directives']);

app.controller('FabRejRefinCtrl', function ($scope, $q) {

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
        $scope.dataRec = [];
        $scope.dataDis = [];
        $('#ID').val('');
        $('#Fdate').val('');
        $('#TotalProd').val('');
        $("#InsUnit").data("kendoComboBox").value('')
        $("#WVFloor").data("kendoComboBox").value('')
        InspRejRefinSummaryHelper.InitInspRejRefinSummary()
    }
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
    $scope.recDetailMove = function (e, type, ind, row) {

        if (e.keyCode === 13) {
            if (ind > 9) {
                if (type === 'text') {
                    var doc = e.currentTarget.classList[0];
                    var splitdoc = doc.split('r');
                    var newClass = parseInt(splitdoc[1]) + 100;
                    if (row === 'rowrec') {
                        $scope.addNewRowRec();
                    }
                    if (row === 'rowdis') {
                        $scope.addNewRowDis();
                    }
                    $('.r' + newClass).focus();
                }
                if (type === 'combo') {
                    var doc = e.currentTarget.classList[0];
                    var splitdoc = doc.split('r');
                    var newClass = parseInt(splitdoc[1]) + 100;
                    if (row === 'dis') {
                        $('#r' + newClass + '[data-role="combobox"]').data("kendoComboBox").focus();
                    } else {
                        $('.r' + newClass + '[data-role="combobox"]').data("kendoComboBox").focus();
                        if (row === 'rowrec') {
                            $scope.addNewRowRec();
                        }
                        if (row === 'rowdis') {
                            $scope.addNewRowDis();
                        }
                    }


                }
            } else {
                if (type === 'text') {
                    var doc = e.currentTarget.classList[0];
                    var splitdoc = doc.split('r');
                    var newClass = parseInt(splitdoc[1]) + 10;
                    if (row === 'rowrec') {
                        $scope.addNewRowRec();
                    }
                    if (row === 'rowdis') {
                        $scope.addNewRowDis();
                    }
                    $('.r' + newClass).focus();
                }
                if (type === 'combo') {
                    var doc = e.currentTarget.classList[0];
                    var splitdoc = doc.split('r');
                    var newClass = parseInt(splitdoc[1]) + 10;
                    if (row === 'dis') {
                        $('#r' + newClass + '[data-role="combobox"]').data("kendoComboBox").focus();
                    } else {
                        $('.r' + newClass + '[data-role="combobox"]').data("kendoComboBox").focus();
                        if (row === 'rowrec') {
                            $scope.addNewRowRec();
                        }
                        if (row === 'rowdis') {
                            $scope.addNewRowDis();
                        }
                    }

                }
            }

        }
    }

    $scope.masterObj = {};
    $scope.saveMaster = function (e) {
        if (e.keyCode === 13) {
            $scope.masterObj.ID = $('#ID').val() === undefined || $('#ID').val() === null ? 0 : $('#ID').val();
            $scope.masterObj.InsFloorCode = $("#InsUnit").data("kendoComboBox").value() === undefined ? null : $("#InsUnit").data("kendoComboBox").value();
            $scope.masterObj.InsFloorName = $("#InsUnit").data("kendoComboBox").text() === undefined ? null : $("#InsUnit").data("kendoComboBox").text();
            $scope.masterObj.UCode = $("#WVFloor").data("kendoComboBox").value() === undefined || $("#WVFloor").data("kendoComboBox").value() === null ? null : $("#WVFloor").data("kendoComboBox").value();
            $scope.masterObj.UName = $("#WVFloor").data("kendoComboBox").text() === undefined ? null : $("#WVFloor").data("kendoComboBox").text();
            if ($('#Fdate').val() === "" || $('#Fdate').val() === undefined) {
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

            } else {
                var currentdate = $('#Fdate').val();
                var splitDate = currentdate.split('/');
                var newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]
                $scope.masterObj.Sdate = newDate;
                var objdata = $scope.masterObj;
                if (objdata.ID === 0 || objdata.ID === "0" || objdata.ID === "") {
                    $.ajax({
                        type: "POST",
                        url: "../FabRejRefin/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            ////debugger;
                            if (parseInt(data) > 0) {
                                $scope.masterObj.ID = parseInt(data);
                                $('#ID').val(parseInt(data));
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
                            } else {
                                alert("fail");
                            }

                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        url: "../FabRejRefin/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                $scope.masterObj.ID = parseInt(data);
                                $('#ID').val(parseInt(data));
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
                            }
                            else {
                                alert("fail");
                            }
                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                }


            }

        }
    }


    $scope.moveAndSaveRej = function (e,ind,model) {
        if (e.keyCode === 13) {
           

                if ($('#ID').val() === "" || $('#ID').val() === "0" || $('#ID').val() === undefined || $('#ID').val() === 0) {
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
                    if ($('.r16' + ind).val() === 0 || $('.r16' + ind).val() === "0" || $('.r16' + ind).val() === "" || $('.r16' + ind).val() === undefined || $('.r16' + ind).val() === null) {
                        model.ID = parseInt($('#ID').val());
                        model.StyleNo=	 $('.r4' + ind + '[data-role="combobox"]').data("kendoComboBox").text();		 
                        model.FType=$('.r6' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.DName=$('.r11' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.ShiftName=$('.r13' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.UCode = $("#WVFloor").data("kendoComboBox").value() === undefined ? null : $("#WVFloor").data("kendoComboBox").value();
                        model.UName = $("#WVFloor").data("kendoComboBox").text() === undefined ? null : $("#WVFloor").data("kendoComboBox").text();
                        model.FMCName = $('.r14' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        
                        $.ajax({
                            type: "post",
                            url: "../FabRejRefin/SaveRecInfo",
                            data: model,
                            datatype: "json",
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    // //debugger;
                                    $('.r16' + ind).val(parseInt(data))
                                    $scope.dataRec[ind][0].DID = parseInt(data)
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
                        model.ID = parseInt($('#ID').val());
                        model.StyleNo = $('.r4' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.FType = $('.r6' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.DName = $('.r11' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.ShiftName = $('.r13' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        model.UCode = $("#WVFloor").data("kendoComboBox").value() === undefined ? null : $("#WVFloor").data("kendoComboBox").value();
                        model.UName = $("#WVFloor").data("kendoComboBox").text() === undefined ? null : $("#WVFloor").data("kendoComboBox").text();
                        model.FMCName = $('.r14' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                        $.ajax({
                            type: "post",
                            url: "../FabRejRefin/SaveRecInfo",
                            data: model,
                            //contenttype: "application/json; charset=utf-8",
                            datatype: "json",
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    // //debugger;
                                    $('.r16' + ind).val(parseInt(data))
                                    $scope.dataRec[ind][0].DID = parseInt(data)
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

                setTimeout(function () {
                    $('.rx' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
                }, 300);
                $('.rx' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();

            }
  }

   

    $scope.moveAndSaveRefin = function (e, ind, model) {
        if (e.keyCode === 13) {
            if ($('#ID').val() === "" || $('#ID').val() === "0" || $('#ID').val() === undefined || $('#ID').val() === 0) {
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
                if ($('.r12' + ind).val() === 0 || $('.r12' + ind).val() === "0" || $('.r12' + ind).val() === "" || $('.r12' + ind).val() === undefined || $('.r12' + ind).val() === null) {
                    model.ID = parseInt($('#ID').val());
                    model.StyleNo = $('.rr' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined ? '' : $('.rr' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.FType = $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text() ===''? null : $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.POName = $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.ChqDName = $('.r9' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r9' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r9' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.DName = $('.r10' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r10' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r10' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    
                    $.ajax({
                        type: "post",
                        url: "../FabRejRefin/SaveReFinishInfo",
                        data: model,
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // //debugger;
                                $('.r12' + ind).val(parseInt(data))
                                $scope.dataDis[ind][0].DID = parseInt(data)
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
                    model.ID = parseInt($('#ID').val());
                    model.StyleNo = $('.rr' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined ? '' : $('.rr' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.FType = $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.POName = $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.ChqDName = $('.r9' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r9' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r9' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.DName = $('.r10' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === undefined || $('.r10' + ind + '[data-role="combobox"]').data("kendoComboBox").text() === '' ? null : $('.r10' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../FabRejRefin/SaveReFinishInfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // //debugger;
                                $('.r12' + ind).val(parseInt(data))
                                $scope.dataDis[ind][0].DID = parseInt(data)
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


            setTimeout(function () {
                $('.rr' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
            }, 300);
            $('.rr' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
        }
    }



    //==========move next end======================

    // Multiple Dropdown load at the same time on pageload
    activate();

    function activate() {
        var promises = [getAllOnPageLoad()];
        return $q.all(promises).then(function () { });
    }

    function getAllOnPageLoad() {
        HdlCommonHelper.unitCombo("InsUnit");
        HdlCommonHelper.unitCombo("WVFloor");
        InspRejRefinSummaryHelper.InitInspRejRefinSummary()
        
    }






    $scope.dataRec = [];
    $scope.addNewRowRec = function () {
        // create a blank array
        var newrow = [];

        if ($scope.dataRec.length === 0) {
            newrow = [{
                DID: 0,
                StyleCode: '',
                StyleNo: '',
                Weight: null,
                Constraction: null,
                Remarks: null,
                SetNo: null,
                SS: null,
                Loom: null,
                ProdB: null,
                ProdC: null,
                CutPieece: null,
                Wastage: null,
                FCode: null,
                FType: null,
                DCode: null,
                DName: null,
                WeavDate: null,
                ShiftCode: null,
                ShiftName: null,
                UserName: null,
                UCode: null,
                UName: null,
                FMCCode: null,
                FMCName: null
            }];
        } else {
            $scope.dataRec[0].forEach(function (row) {
                newrow.push({
                    DID: 0,
                    StyleCode: '',
                    StyleNo: '',
                    Weight: null,
                    Constraction: null,
                    Remarks: null,
                    SetNo: null,
                    SS: null,
                    Loom: null,
                    ProdB: null,
                    ProdC: null,
                    CutPieece: null,
                    Wastage: null,
                    FCode: null,
                    FType: null,
                    DCode: null,
                    DName: null,
                    WeavDate: null,
                    ShiftCode: null,
                    ShiftName: null,
                    UserName: null,
                    UCode: null,
                    UName: null,
                    FMCCode: null,
                    FMCName: null
                });
            });
        }

        $scope.dataRec.push(newrow);
    };
    $scope.dataDis = [];
    $scope.addNewRowDis = function () {
        // create a blank array
        var newrow = [];

        if ($scope.dataDis.length === 0) {
            newrow = [{
                DID :0,
                StyleCode:null,
                SetNo:null,
                SS:null,
                Beam:null,
                FCode :null,
                Prod:null,
                FinishDate:null,
                POCode:null,
                ChqDCode:null,
                DCode:null,
                Remarks:null
            }];
        } else {
            $scope.dataDis[0].forEach(function (row) {
                newrow.push({
                    DID :0,
                    StyleCode:null,
                    SetNo:null,
                    SS:null,
                    Beam:null,
                    FCode :null,
                    Prod:null,
                    FinishDate:null,
                    POCode:null,
                    ChqDCode:null,
                    DCode:null,
                    Remarks:null
                });
            });
        }

        $scope.dataDis.push(newrow);
    };

    $scope.optSetNo = {
        placeholder: "--- Select ---",
        dataTextField: "SetNo1",
        dataValueField: "SetNo",
        dataSource: GetAllSetNo(),
        dataBound: function () {
            var Wgt = this;
            this.input.focus(function () {
                Wgt.open();
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
            if (wgt !== undefined) {
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
                wgt.value('');
                wgt.focus()
            } else {
                var wgt = e.sender.element.closest("td").next().find('input');
                wgt.focus()
            }

            
           
        }
    };
    var control = {};
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
                        tgt.closest("td").next().find('input').focus();
                    }, 50);
                }
            })
        },
        change: function (e) {
            var SSNo = this.value();
            control.SSNo = SSNo;
            var wgt = e.sender.element.closest("td").next().find('input');
            wgt.focus()
            

        }
    };
    $scope.optStyleNo = {
        placeholder: "--- Select ---",
        dataTextField: "StyleNo",
        dataValueField: "StyleCode",
        dataSource: GetAllStyleNo(),
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

    $scope.optLoomNo = {
        placeholder: "--- Select ---",
        dataTextField: "MName",
        dataValueField: "MName",
        dataSource: GetAllLoom(),
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
    $scope.optFaultType = {
        placeholder: "--- Select ---",
        dataTextField: "Falt",
        dataValueField: "FCode",
        dataSource: GetAllFaultType(),
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
    $scope.optDyeInfo = {
        placeholder: "--- Select ---",
        dataTextField: "DyInformation",
        dataValueField: "DCode",
        dataSource: GetAllDyeInfo(),
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



    $scope.optShift = {
        placeholder: "--- Select ---",
        dataTextField: "Shift",
        dataValueField: "ShiftNo",
        dataSource: GetAllShift(),
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

    $scope.optTCode = {
        placeholder: "--- Select ---",
        dataTextField: "MName",
        dataValueField: "TCode",
        dataSource: GetTCode(),
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
    $scope.optFTypeFinish = {
        placeholder: "--- Select ---",
        dataTextField: "FName",
        dataValueField: "FCode",
        dataSource: FTypeFinish(),
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

    $scope.optPOName = {
        placeholder: "--- Select ---",
        dataTextField: "PoName",
        dataValueField: "PoCode",
        dataSource: GetAllPO(),
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
    $scope.optChqDCode = {
        placeholder: "--- Select ---",
        dataTextField: "DName",
        dataValueField: "DID",
        dataSource: GetAllChqDCode(),
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
    function GetAllChqDCode() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetAllChqDCode/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ DID: 0, DName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    function GetAllPO() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetAllPO/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ PoCode: 0, PoName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    function FTypeFinish() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetFTYPERefinish/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ FCode: 0, FName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    function GetTCode() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetTCode/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ TCode: 0, MName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }

    function GetAllShift() {
        
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../common/GetShiftData/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ ShiftNo: 0, Shift: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }


    function GetAllDyeInfo() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetDyeInfo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ DCode: 0, DyInformation: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    function GetAllFaultType() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetFTYPE/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ FCode: 0, Falt: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    function GetAllLoom() {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetAllMachine/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ MName: 0, MName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }

    function GetAllStyleNo() {
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../StyleInfo/GetAllStyle/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ StyleCode: 0, StyleNo: "---Select---" });
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    }

    function GetAllSetNo() {
        var objSet = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSetNo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ SetNo: 0, SetNo1: "---Select---" });
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

    $scope.getSSNoData = function (arg) {
        console.log();
        if (arg[0].SetNo) {
            return getAllProductionSLNo(arg[0].SetNo);
        } else {
            return [];
        }

    }
    $scope.GetDetail = function (arg) {
        //$('#finishingGrid').hide();
        $scope.$apply(function () {
            $scope.newData()
        })

        $.ajax({
            url: "../FabRejRefin/GetRejectionByID?SID=" + parseInt(arg),
            dataType: 'json',
            success: function (data) {

                if (data.length === 0) {
                    $scope.dataRec = [];
                    $scope.$apply(function () {
                        $scope.newData();
                    })
                } else {
                    $scope.dataRec = [];
                    var newrow = [];
                    if ($scope.dataRec.length === 0) {
                        newrow = [data[0]];
                        $scope.dataRec.push(newrow);
                    }
                    for (var i = 1; i <= data.length - 1; i++) {
                        var newrow = [];
                        $scope.dataRec[0].forEach(function (row) {
                            newrow.push(data[i]);
                        });
                        $scope.dataRec.push(newrow);
                    }
                    $scope.$apply(function () {
                        $scope.newData();
                    })
                }

            }
        });
        $.ajax({
            url: "../FabRejRefin/GetRefinishByID?SID=" + parseInt(arg),
            dataType: 'json',
            success: function (data) {

                if (data.length === 0) {
                    $scope.dataDis = [];
                    $scope.$apply(function () {
                        $scope.newData();
                    })
                } else {
                    $scope.dataDis = [];
                    var newrow = [];
                    if ($scope.dataDis.length === 0) {
                        newrow = [data[0]];
                        $scope.dataDis.push(newrow);
                    }
                    for (var i = 1; i <= data.length - 1; i++) {
                        var newrow = [];
                        $scope.dataDis[0].forEach(function (row) {
                            newrow.push(data[i]);
                        });
                        $scope.dataDis.push(newrow);
                    }
                    $scope.$apply(function () {
                        $scope.newData();
                    })
                }

            }
        });
    }
});