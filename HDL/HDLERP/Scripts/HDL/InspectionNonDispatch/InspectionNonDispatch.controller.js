var app = angular.module('myApp', ['kendo.directives']);

app.controller('InspNonDispatchCtrl', function ($scope, $q) {

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
        $scope.data = [];
        $('#ID').val('');
        $("#InsUnit").data("kendoComboBox").text('');
        $("#InsUnit").data("kendoComboBox").value('');
        $('#Fdate').val('');
        $('#remarks').val('');
        NonDispatchSummaryHelper.InitSummary()
       
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
                    if (row === 'roll') {
                        var newClass = parseInt(splitdoc[1]) + 200;
                        $('.r' + newClass).focus();
                        return;
                    }
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
                    if (row === 'roll') {
                        var newClass = parseInt(splitdoc[1]) + 20;
                        $('.r' + newClass).focus();
                        return;
                    }
                    var newClass = parseInt(splitdoc[1]) + 10;
                    if (row === 'rowrec') {
                        $scope.addNewRowRec();
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

                    }

                }
            }

        }
    }

    //==========move next end======================
   
    $scope.masterObj = {};
    $scope.saveMaster = function (e) {
        if (e.keyCode === 13) {
            $scope.masterObj.NID = $('#ID').val() === undefined || $('#ID').val() === null ? 0 : $('#ID').val();
            $scope.masterObj.UCode = $("#InsUnit").data("kendoComboBox").value() === undefined ? null : $("#InsUnit").data("kendoComboBox").value();
            $scope.masterObj.UName = $("#InsUnit").data("kendoComboBox").text() === undefined ? null : $("#InsUnit").data("kendoComboBox").text();
            $scope.masterObj.Remarks = $('#remarks').val() === undefined || $('#remarks').val() === null ? 0 : $('#remarks').val();
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
                $scope.masterObj.NDate = newDate;
                var objdata = $scope.masterObj;
                if (objdata.NID === 0 || objdata.NID === "0" || objdata.NID === "") {
                    $.ajax({
                        type: "POST",
                        url: "../InspectionNonDispatch/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            // debugger;
                            if (parseInt(data) > 0) {
                                $scope.masterObj.NID = parseInt(data);
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
                        url: "../InspectionNonDispatch/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                $scope.masterObj.NID = parseInt(data);
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
    $scope.moveAndSaveDetail = function (e, ind, model) {
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
                if ($('.r10' + ind).val() === 0 || $('.r10' + ind).val() === "0" || $('.r10' + ind).val() === "" || $('.r10' + ind).val() === undefined || $('.r10' + ind).val() === null) {
                    model.NIID = 0;
                    model.NID = parseInt($('#ID').val());
                    model.FaultName = $('.r4' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.FMCName = $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.StyleCode = parseInt($('.rStyleCode' + ind).val());
                    model.StyleNo = $('.r2' + ind).val();
                    model.DName = $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../InspectionNonDispatch/SaveDetailInfo",
                        data: model,
                        datatype: "json",
                        success: function (data) {
                            
                            if (parseInt(data) > 0) {
                                // //debugger;
                                $('.r10' + ind).val(parseInt(data))
                                $scope.data[ind][0].NIID = parseInt(data)
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
                                setTimeout(function () {
                                    $('.rx' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
                                }, 300);
                                $('.rx' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
                            }
                            else {
                                alert("fail");
                                return;
                            }
                        },
                        error: function (data) {
                            alert("fail");
                        }
                    });
                } else {
                    model.NIID = parseInt($('.r10' + ind).val());
                    model.NID = parseInt($('#ID').val());
                    model.FaultName = $('.r4' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.FMCName = $('.r8' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.StyleCode = parseInt($('.rStyleCode' + ind).val());
                    model.StyleNo = $('.r2' + ind).val();
                    model.DName = $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../InspectionNonDispatch/SaveDetailInfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // //debugger;
                                $('.r10' + ind).val(parseInt(data))
                                $scope.data[ind][0].NIID = parseInt(data)
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
                                setTimeout(function () {
                                    $('.rx' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
                                }, 300);
                                $('.rx' + (ind + 1) + '[data-role="combobox"]').data("kendoComboBox").focus();
                            }

                            else {
                                alert("fail");
                                return;
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

    // Multiple Dropdown load at the same time on pageload
    activate();

    function activate() {
        var promises = [getAllOnPageLoad()];
        return $q.all(promises).then(function () { });
    }

    function getAllOnPageLoad() {
        NonDispatchSummaryHelper.InitSummary()
        HdlCommonHelper.unitCombo("InsUnit");
    }






    $scope.data = [];
    $scope.addNewRowRec = function () {
        // create a blank array
        var newrow = [];

        if ($scope.data.length === 0) {
            newrow = [{
                NIID :0,
                StyleNo:'',
                StyleCode:null,
                SetNo :null,
                RollNo :null,
                Qnty :null,
                FaultName :null,
                FaultCode :null,
                DName :null,
                DCode :null,
                Type :null,
                POName :null,
                OPName :null,
                FMCName :null,
                FMCCode :null,
                Remarks :null
            }];
        } else {
            $scope.data[0].forEach(function (row) {
                newrow.push({
                    NIID: 0,
                    StyleNo: '',
                    StyleCode: null,
                    SetNo: null,
                    RollNo: null,
                    Qnty: null,
                    FaultName: null,
                    FaultCode: null,
                    DName: null,
                    DCode: null,
                    Type: null,
                    POName: null,
                    OPName: null,
                    FMCName: null,
                    FMCCode: null,
                    Remarks: null
                });
            });
        }

        $scope.data.push(newrow);
    };

  
    $scope.optSetNo = {
        placeholder: "--- Select ---",
        dataTextField: "SetNo",
        dataValueField: "SetNo",
        dataSource: GetSetNo(),
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
            var item = this.dataItem(this.select())
          //  debugger
            var StyleNo = e.sender.element.closest("td").next().next().find('input#StyleNo');
            StyleNo.val(item.StyleNo)
            var StyleCode = e.sender.element.closest("td").next().next().find('input#StyleCode');
            StyleCode.val(item.StyleCode)
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
    function GetSetNo() {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionNonDispatch/GetPlanningSetNo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            jsonData.unshift({ SetNo: 0, SetNo: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    $scope.optDyeingFault = {
        placeholder: "--- Select ---",
        dataTextField: "Falt",
        dataValueField: "FCode",
        dataSource: GetDyeingFault(),
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
            var item = this.dataItem(this.select());
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
    function GetDyeingFault() {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionNonDispatch/GetDyeingFault/";
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
    $scope.optPOName = {
        placeholder: "--- Select ---",
        dataTextField: "PoName",
        dataValueField: "PoName",
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
                    }, 500);
                }
            })
        },
        change: function (e) {
            var item = this.dataItem(this.select());
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
    function GetAllPO() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../FabRejRefin/GetAllPO/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ PoName: 0, PoName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    $scope.optOPName = {
        placeholder: "--- Select ---",
        dataTextField: "Name",
        dataValueField: "Name",
        dataSource: GetAllOP(),
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
            var item = this.dataItem(this.select());
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
    function GetAllOP() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionNonDispatch/GetPO/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ Name: 0, Name: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
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
    $scope.optDept = {
        placeholder: "--- Select ---",
        dataTextField: "DName",
        dataValueField: "DCode",
        dataSource: GetDept(),
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
    function GetDept() {
        //debugger
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionNonDispatch/GetDept/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ DCode: 0, DName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }

    $scope.GetDetail = function (arg) {

        $.ajax({
            url: "../InspectionNonDispatch/GetDetailByID?NID=" + parseInt(arg),
            dataType: 'json',
            success: function (data) {

                if (data.length === 0) {
                    $scope.data = [];
                    $scope.$apply(function () {
                        $scope.newData();
                    })
                } else {
                    $scope.data = [];
                    var newrow = [];
                    if ($scope.data.length === 0) {
                        newrow = [data[0]];
                        $scope.data.push(newrow);
                    }
                    for (var i = 1; i <= data.length - 1; i++) {
                        var newrow = [];
                        $scope.data[0].forEach(function (row) {
                            newrow.push(data[i]);
                        });
                        $scope.data.push(newrow);
                    }
                    $scope.$apply(function () {
                        $scope.newData();
                    })
                }

            }
        });


    }
});