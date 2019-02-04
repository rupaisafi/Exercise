var app = angular.module('myApp', ['kendo.directives']);

app.controller('FinishingFloorCtrl', function ($scope, $q) {
    
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
        $('#FID').val('') 
        $('#Fdate').val('');
        $('#remarks').val('');
        $('#Stock').val('');
        $scope.masterObj = {};
        $scope.dataRec = [];
        $scope.dataDis = [];
        FinishingStockSummaryHelper.InitFinishingStockSummary()
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
    $scope.recDetailMove = function (e, type,ind, row) {
       
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
                    if (row==='dis') {
                        $('#r' + newClass + '[data-role="combobox"]').data("kendoComboBox").focus();
                    } else {
                        $('.r' + newClass + '[data-role="combobox"]').data("kendoComboBox").focus();
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
                    }
                   
                }
            }
           
        }
    }

    $scope.masterObj = {};
    $scope.saveMaster = function (e) {
        if (e.keyCode === 13) {
            //convert date

            $scope.masterObj.FID = $('#FID').val() === undefined || $('#FID').val() === null ? 0 : $('#FID').val();
            $scope.masterObj.Remarks = $scope.remarks === undefined ? '' : $scope.remarks; 
            $scope.masterObj.Stock = $('#Stock').val() === undefined || $('#Stock').val() === null ? 0 : $('#Stock').val();
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
                $scope.masterObj.Fdate = newDate;
                var objdata = $scope.masterObj;
                if (objdata.FID === 0 || objdata.FID === "0" || objdata.FID === "") {
                    $.ajax({
                        type: "POST",
                        url: "../FinishingFloorStock/SaveMasterInfo",
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
                        url: "../FinishingFloorStock/SaveMasterInfo",
                        data: objdata,
                        //contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
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

    $scope.recDetailMoveSave = function (e,ind,model) {
        if (e.keyCode === 13) {

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
                if ($('.r6' + ind).val() === 0 || $('.r6' + ind).val() === "0" || $('.r6' + ind).val() === "" || $('.r6' + ind).val() === undefined || $('.r6' + ind).val() === null) {
                    model.FID = parseInt($('#FID').val());
                    model.StyleNo = $('.r3' + ind +'[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../FinishingFloorStock/SaveRecInfo",
                        data: model,
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('.r6' + ind).val(parseInt(data))
                                $scope.dataRec[ind][0].FIID = parseInt(data)
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
                   
                    model.FID = parseInt($('#FID').val());
                    model.StyleNo = $('.r3' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../FinishingFloorStock/SaveRecInfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('.r6' + ind).val(parseInt(data))
                                $scope.dataRec[ind][0].FIID = parseInt(data)
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

            var doc = '.r1' + (ind+1);
            $(doc).focus();

        }
    }
    $scope.disDetailMoveSave = function (e, ind,model) {
        if (e.keyCode === 13) {

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
                if ($('.r7' + ind).val() === 0 || $('.r7' + ind).val() === "0" || $('.r7' + ind).val() === "" || $('.r7' + ind).val() === undefined || $('.r7' + ind).val() === null) {
                    model.FID = parseInt($('#FID').val());
                    model.StyleNo = $('.r3' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../FinishingFloorStock/SaveDisInfo",
                        data: model,
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('.r7' + ind).val(parseInt(data))
                                $scope.dataDis[ind][0].FIID = parseInt(data)
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

                    model.FID = parseInt($('#FID').val());
                    model.StyleNo = $('.r3' + ind + '[data-role="combobox"]').data("kendoComboBox").text();
                    $.ajax({
                        type: "post",
                        url: "../FinishingFloorStock/SaveDisInfo",
                        data: model,
                        //contenttype: "application/json; charset=utf-8",
                        datatype: "json",
                        success: function (data) {
                            if (parseInt(data) > 0) {
                                // debugger;
                                $('.r7' + ind).val(parseInt(data))
                                $scope.dataDis[ind][0].FIID = parseInt(data)
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
        FinishingStockSummaryHelper.InitFinishingStockSummary()

    }






    $scope.dataRec = [];
    $scope.addNewRowRec = function () {
        // create a blank array
        var newrow = [];

        if ($scope.dataRec.length === 0) {
            newrow = [{
                FIID:0,
                SetNo:'',
                SSNo:'',
                Loom:'',
                StyleNo:'',
                StyleCode:'',
                RecQnty:null,
                Remarks:''
            }];
        } else {
            $scope.dataRec[0].forEach(function (row) {
                newrow.push({
                    FIID: 0,
                    SetNo: '',
                    SSNo: '',
                    Loom: '',
                    StyleNo: '',
                    StyleCode: '',
                    RecQnty: null,
                    Remarks: ''
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
                FIID: 0,
                SetNo: '',
                SSNo: '',
                Loom: '',
                StyleNo: '',
                StyleCode: '',
                Dispatch: null,
                Remarks: ''
            }];
        } else {
            $scope.dataDis[0].forEach(function (row) {
                newrow.push({
                    FIID: 0,
                    SetNo: '',
                    SSNo: '',
                    Loom: '',
                    StyleNo: '',
                    StyleCode: '',
                    Dispatch: null,
                    Remarks: ''
                });
            });
        }

        $scope.dataDis.push(newrow);
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
                    var doc = e.currentTarget.classList[1];
                    var splitdoc = doc.split('r');
                    var newClass = "";
                    if (parseInt(splitdoc[1]) > 309) {
                        newClass = parseInt(splitdoc[1]) + 100;
                    } else {
                        newClass = parseInt(splitdoc[1]) + 10;
                    }
                    $('.r' + newClass).focus();
                }
            })
        },
        change: function (e) {
            var doc = e.sender.element[0].classList[0];
            if (doc === "ng-pristine") {
                var doc1 = e.sender.element[0].classList[2];
                var splitdoc = doc1.split('r');
                var newClass = "";
                if (parseInt(splitdoc[1]) > 309) {
                    newClass = parseInt(splitdoc[1]) + 100;
                } else {
                    newClass = parseInt(splitdoc[1]) + 10;
                }

                $('.r' + newClass).focus();
            } else {
                var splitdoc = doc.split('r');
                var newClass = "";
                if (parseInt(splitdoc[1]) > 309) {
                    newClass = parseInt(splitdoc[1]) + 100;
                } else {
                    newClass = parseInt(splitdoc[1]) + 10;
                }

                $('.r' + newClass).focus();
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

    $scope.GetDetail = function (arg) {
       
        $scope.$apply(function () {
            $scope.newData()
        })
        $.ajax({
            url: "../FinishingFloorStock/GetStockDis?FID=" + parseInt(arg),
            dataType: 'json',
            success: function (data) {
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
                    $scope.data;
                })

            }
        });
        $.ajax({
            url: "../FinishingFloorStock/GetStockRec?FID=" + parseInt(arg),
            dataType: 'json',
            success: function (data) {
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
                    $scope.data;
                })

            }
        });
    }

});