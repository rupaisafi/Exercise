var app = angular.module('myApp', ['kendo.directives']);

app.controller('InspFlagginCtrl', function ($scope, $q) {

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
        $('#ID').val('')
        $('#Fdate').val('');
        $("#InsUnit").data("kendoComboBox").value('');
        $('#remarks').val('');
        FlagginSummaryHelper.InitSummary()
        
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
            $scope.masterObj.ID = $('#ID').val() === undefined || $('#ID').val() === null ? 0 : $('#ID').val();
            $scope.masterObj.InsFloorCode = $("#InsUnit").data("kendoComboBox").value() === undefined ? null : $("#InsUnit").data("kendoComboBox").value();
            $scope.masterObj.InsFloorName = $("#InsUnit").data("kendoComboBox").text() === undefined ? null : $("#InsUnit").data("kendoComboBox").text();
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
                $scope.masterObj.Sdate = newDate;
                var objdata = $scope.masterObj;
                if (objdata.ID === 0 || objdata.ID === "0" || objdata.ID === "") {
                    $.ajax({
                        type: "POST",
                        url: "../InspectionFlaggin/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                           // debugger;
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
                        url: "../InspectionFlaggin/SaveMasterInfo",
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
                if ($('.r17' + ind).val() === 0 || $('.r17' + ind).val() === "0" || $('.r17' + ind).val() === "" || $('.r17' + ind).val() === undefined || $('.r17' + ind).val() === null) {
                    model.IID = 0;
                    model.ID = parseInt($('#ID').val());
                    model.DName = $('.rx' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.OName = $('.r2' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.CapName = $('.r3' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.StyleNo = $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../InspectionFlaggin/SaveDetailInfo",
                        data: model,
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // //debugger;
                                $('.r17' + ind).val(parseInt(data))
                                $scope.data[ind][0].IID = parseInt(data)
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
                    model.IID =parseInt( $('.r17' + ind).val());
                    model.ID = parseInt($('#ID').val());
                    model.DName = $('.rx' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.OName = $('.r2' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.CapName = $('.r3' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    model.StyleNo = $('.r5' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../InspectionFlaggin/SaveDetailInfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // //debugger;
                                $('.r17' + ind).val(parseInt(data))
                                $scope.data[ind][0].IID = parseInt(data)
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



    // Multiple Dropdown load at the same time on pageload
    activate();

    function activate() {
        var promises = [getAllOnPageLoad()];
        return $q.all(promises).then(function () { });
    }

    function getAllOnPageLoad() {
        HdlCommonHelper.unitCombo("InsUnit");
        FlagginSummaryHelper.InitSummary()
    }






    $scope.data = [];
    $scope.addNewRowRec = function () {
        // create a blank array
        var newrow = [];

        if ($scope.data.length === 0) {
            newrow = [{
                IID: 0,
                ID: 0,
                DCode: null,
                OCode: null,
                CapCode: null,
                RollNo: null,
                StyleCode: null,
                YdsOpOBS: null,
                YdsReChOBS: null,
                DeffOpOBS: null,
                DeffReChOBS: null,
                QOpOBS: null,
                QReChOBS: null,
                PointOpOBS: null,
                PointReChOBS: null,
                WidthAvg: null,
                OverMarking: null,
                SinglePoint: null,
                FCode: null,
                Remarks: null
            }];
        } else {
            $scope.data[0].forEach(function (row) {
                newrow.push({
                    IID: 0,
                    ID: 0,
                    DCode: null,
                    OCode: null,
                    CapCode: null,
                    RollNo: null,
                    StyleCode: null,
                    YdsOpOBS: null,
                    YdsReChOBS: null,
                    DeffOpOBS: null,
                    DeffReChOBS: null,
                    QOpOBS: null,
                    QReChOBS: null,
                    PointOpOBS: null,
                    PointReChOBS: null,
                    WidthAvg: null,
                    OverMarking: null,
                    SinglePoint: null,
                    FCode: null,
                    Remarks: null
                });
            });
        }

        $scope.data.push(newrow);
    };

    $scope.optDept = {
        placeholder: "--- Select ---",
        dataTextField: "DName",
        dataValueField: "DID",
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
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionFlaggin/GetDept/";
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
    $scope.optOperator = {
        placeholder: "--- Select ---",
        dataTextField: "Name",
        dataValueField: "CardNo",
        dataSource: GetOperator(),
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
    function GetOperator() {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionFlaggin/GetOperator/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            jsonData.unshift({ CardNo: 0, Name: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
    $scope.optPO = {
        placeholder: "--- Select ---",
        dataTextField: "PoName",
        dataValueField: "CardNo",
        dataSource: GetPO(),
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
    function GetPO() {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionFlaggin/GetPO/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            jsonData.unshift({ CardNo: 0, PoName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }
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
    $scope.optQuality = {
        placeholder: "--- Select ---",
        dataTextField: "QName",
        dataValueField: "QName",
        dataSource: GetQuality(),
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
    function GetQuality() {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../InspectionFlaggin/GetQuality/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            jsonData.unshift({ QName: 0, QName: "---Select---" });
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }


    $scope.GetDetail = function (arg) {

        $.ajax({
            url: "../InspectionFlaggin/GetFlagginDetailByID?SID=" + parseInt(arg),
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