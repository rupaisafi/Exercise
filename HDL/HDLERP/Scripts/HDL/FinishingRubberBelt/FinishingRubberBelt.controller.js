var app = angular.module('myApp', ['kendo.directives']);

app.controller('FinishingRubberBeltCtrl', function ($scope, $q) {

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
    $scope.close = function (masterObj) {
        $scope.finishingMaster = false;
        $scope.finishingDetail = false;
        $scope.finishingGrid = true;
        $scope.btnClose = false;
        FinishingRubberBeltSummaryHelper.InitFinishingRubberBeltSummary()
        $scope.data = [];
        masterObj = {}
        $scope.masterObj = {};
        $('#RID').val('') 
        $('.SettingDate').val('');
        $('.BeltName').val('');
        $('.Country').val('');
        $('.Remarks').val('');
        $('.SerialNo').val('');
        $('.ThicknessMM').val('');
        $('.Hardness').val('');
        $("#mcType").data("kendoComboBox").text('');
        $('.Width').val('');
        $('.Type').val('');
    }
    $scope.masterObj = {};


    //==========move next start ======================

    //mastermove//
    $scope.masterMoveDown = function (e, classname, combo) {
        if (e.keyCode === 13) {
            
            if (combo === 'combo') {
                $('.' + classname + '[data-role="combobox"]').data("kendoComboBox").focus();
                $('#' + classname).focus();
            } else {
                $('.' + classname).focus();
            }
        }
    }

    $scope.recDetailMove = function (e, type, ind, row) {
        if (e.keyCode === 13) {
            if (type === 'text') {
                var doc = e.currentTarget.classList[0];
                var newClass = "";
                var splitdoc = doc.split('r');
                if (ind > 9) {
                    newClass = parseInt(splitdoc[1]) + 100;

                } else {
                    newClass = parseInt(splitdoc[1]) + 10;
                }


                if (row === 'row') {
                    $scope.addNewRowRec();
                }
                $('.r' + newClass).focus();
            }

        }
    }
    $scope.masterObj = {};

    $scope.saveMaster = function (e, model) {
        if (e.keyCode === 13) {
            $scope.masterObj.RID = $('#RID').val() === undefined || $('#RID').val() === null ? 0 : $('#RID').val();
            $scope.masterObj.MCNo = $("#mcType").data("kendoComboBox").text() === '--- Select ---' ? null : $("#mcType").data("kendoComboBox").text();
            $scope.masterObj.BName = model.BName === undefined ? '' : model.BName;
            $scope.masterObj.OCountry = model.OCountry === undefined ? '' : model.OCountry;
            $scope.masterObj.SerialNo = model.SerialNo === undefined || model.SerialNo === null ? 0 : model.SerialNo;
            $scope.masterObj.ThicknessMM = model.ThicknessMM === undefined || model.ThicknessMM === null ? 0 : model.ThicknessMM;
            $scope.masterObj.Hardness = model.Hardness === undefined || model.Hardness === null ? 0 : model.Hardness;
            $scope.masterObj.Width = model.Width === undefined || model.Width === null ? 0 : model.Width;
            $scope.masterObj.Type = model.Type === undefined ? '' : model.Type;
            $scope.masterObj.Remarks = model.Remarks === undefined ? '' : model.Remarks;

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
                
                if ($scope.masterObj.RID === 0 || $scope.masterObj.RID === "0" || $scope.masterObj.RID === "" || $scope.masterObj.RID===undefined) {
                    var pastdate = $('#Fdate').val();
                    var objdata = $scope.masterObj;
                    var currentdate = $('#Fdate').val();
                    var splitDate = currentdate.split('/');
                    var newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]
                    objdata.SettingDate = newDate;
                    $.ajax({
                        type: "POST",
                        url: "../FinishingRubberBelt/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            //debugger;
                            if (parseInt(data) > 0) {
                                $scope.masterObj.RID = parseInt(data);
                                $('#RID').val(parseInt(data));
                                $('#Fdate').val(pastdate)
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
                    var pastdate = $('#Fdate').val();
                    var objdata = $scope.masterObj;
                    var currentdate = $('#Fdate').val();
                    var splitDate = currentdate.split('/');
                    var newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]
                    objdata.SettingDate = newDate;
                    $.ajax({
                        type: "POST",
                        url: "../FinishingRubberBelt/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                $scope.masterObj.RID = parseInt(data);
                                $('#RID').val(parseInt(data));
                                $('#Fdate').val(pastdate)
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

    $scope.recDetailMoveAndSave = function (e, ind, model) {
        if (e.keyCode === 13) {
            if ($('#RID').val() === "" || $('#RID').val() === "0" || $('#RID').val() === undefined || $('#RID').val() === 0) {
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
                if ($('.r7' + ind).val() === 0 || $('.r7' + ind).val() === "0" || $('.r7' + ind).val() === "" || $('.r7' + ind).val() === undefined || $('.r7' + ind).val() === null) {
                    model.RID = parseInt($('#RID').val());
                    $.ajax({
                        type: "post",
                        url: "../FinishingRubberBelt/SaveDetailInfo",
                        data: model,
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('.r7' + ind).val(parseInt(data))
                                $scope.data[ind][0].RIID = parseInt(data)
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

                    model.RID = parseInt($('#RID').val());
                    $.ajax({
                        type: "post",
                        url: "../FinishingRubberBelt/SaveDetailInfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('.r7' + ind).val(parseInt(data))
                                $scope.data[ind][0].RIID = parseInt(data)
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


            var doc = '.r1' + (ind + 1);
            $(doc).focus();
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
        HdlCommonHelper.GenerateMachineNameComboForFinishing("mcType");

        FinishingRubberBeltSummaryHelper.InitFinishingRubberBeltSummary()

    }






    $scope.data = [];
    $scope.addNewRowRec = function () {
        // create a blank array
        var newrow = [];

        if ($scope.data.length === 0) {
            newrow = [{
                RIID: null,
                GDate: '',
                BeforeThickness: null,
                AfterThickness: null,
                AfterHardness: null,
                ProdQnty: null,
                Remarks: ''
            }];
        } else {
            $scope.data[0].forEach(function (row) {
                newrow.push({
                    RIID: null,
                    GDate: '',
                    BeforeThickness: null,
                    AfterThickness: null,
                    AfterHardness: null,
                    ProdQnty: null,
                    Remarks: ''
                });
            });
        }

        $scope.data.push(newrow);
    };
    $scope.optBeltType = {
        placeholder: "--- Select ---",
        dataTextField: "Type",
        dataValueField: "Type",
        dataSource: GetBeltType(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    $('.Remarks').focus();
                }
            })
        },
        change: function (e) {
            $('.Remarks').focus();
        }
    };
    function GetBeltType() {
        var objType = "";
        var jsonParam = "";
        var serviceUrl = "../FinishingRubberBelt/GetBeltType/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ Type: 0, Type: "---Select---" });
            objType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objType;
    }
    $scope.GetDetail = function (arg) {

        $scope.masterObj.MCNo = arg.MCNo;
        $scope.masterObj.BName = arg.BName;
        $scope.masterObj.OCountry = arg.OCountry;
        $scope.masterObj.SerialNo = arg.SerialNo;
        $scope.masterObj.ThicknessMM = arg.ThicknessMM;
        $scope.masterObj.Hardness = arg.Hardness;
        $scope.masterObj.Width = arg.Width;
        $scope.masterObj.Type = arg.Type;
        $scope.masterObj.Remarks = arg.Remarks;
        $scope.masterObj.SettingDate = $('#Fdate').val()


        $.ajax({
            url: "../FinishingRubberBelt/GetDetailByID?RID=" + parseInt(arg.RID),
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