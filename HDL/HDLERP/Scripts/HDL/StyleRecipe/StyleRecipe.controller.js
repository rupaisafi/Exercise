var app = angular.module('myApp', ['kendo.directives']);

app.controller('StyleRecipeCtrl', function ($scope, $q) {

    var vm = this;
    $scope.finishingMaster = true;
    $scope.finishingMaster1 = false;
    $scope.finishingDetail = false;
    $scope.btnClose = false;

   
    $scope.close = function (obj) {
        
        $scope.finishingDetail = false;
        $scope.finishingMaster1 = false;
        $scope.finishingGrid = true;
        $scope.btnClose = false;
        $scope.data = [];
        $scope.pardata = {};
        $('#StyleNo').val('');
        $('#StyleCode').val('');
        $('#GConst').val('');
        $('#FConst').val('');
        $('#Weight').val('');
        $('#Color').val('');
        $('#Width').val('');
        $('#WarpShrinkage').val('');
        $('#WeftShrinkage').val('');
        $('#SID').val('');
       
        $("#StyNo").data("kendoComboBox").value('');
        $("#StyNo").data("kendoComboBox").text('');
    }
   

    //==========move next start ======================

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
                    var newClass = parseInt(splitdoc[1]) + 300;
                   
                    if (row === 'row') {
                        $scope.addNewRow();
                    }
                    $('.r' + newClass).focus();
                }
                
            } else {
                if (type === 'text') {
                    var doc = e.currentTarget.classList[0];
                    var splitdoc = doc.split('r');
                    var newClass = parseInt(splitdoc[1]) + 30;
                   
                    if (row === 'row') {
                        $scope.addNewRow();
                    }
                    $('.r' + newClass).focus();
                }
            }

        }
    }
    //==========move next end======================
    $scope.masterObj = {};
    $scope.saveMaster = function (e,model) {
        if (e.keyCode === 13) {
            if (model === undefined) {
                $.bootstrapGrowl("Please Input...", {
                    ele: 'body',
                    type: 'danger',
                    offset: { from: 'bottom', amount: 50 },
                    align: 'right',
                    width: 250,
                    delay: 4000,
                    allow_dismiss: true,
                });
                return;
            } else {
                model.SIID = $('#ID').val() === undefined || $('#ID').val() === null ? 0 : $('#ID').val();
                model.SID =parseInt( $('#SID').val());

                if (model.FEDate1 === "" || model.FEDate1 === undefined) {

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


                } else {
                    var currentdate = model.FEDate1;
                    var splitDate = currentdate.split('/');
                    var newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2]
                    model.FEDate = newDate;
                    var objdata = model;
                    if (objdata.SIID === 0 || objdata.SIID === "0" || objdata.SIID === "" || objdata.SIID === null || objdata.SIID === "undefined" || objdata.SIID === undefined) {
                        $.ajax({
                            type: "POST",
                            url: "../StyleRecipe/SaveInfo",
                            data: objdata,
                            //contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                //debugger;
                                if (parseInt(data) > 0) {
                                   model.SIID = parseInt(data);
                                    $('#ID').val(parseInt(data));
                                   
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
                        model.SIID = parseInt($('#ID').val());
                        $.ajax({
                            type: "POST",
                            url: "../StyleRecipe/SaveInfo",
                            data: objdata,
                            //contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    model.FID = parseInt(data);
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
    }


    $scope.recipeMoveandSave = function (e, index, model) {
        if (e.keyCode === 13) {

            if (model.SIID === 0 || model.SIID === "0" || model.SIID === "" || model.SIID === null || model.SIID === "undefined" || model.SIID === undefined) {
                model.SIID = 0;
                model.IName = $('.r1' + index + '[data-role="combobox"]').data("kendoComboBox").text();
                model.SID = parseInt($('#SID').val());
                model.IVolume = parseInt($('.Volume').val());
                $.ajax({
                    type: "POST",
                    url: "../StyleRecipe/SaveDetailInfo",
                    data: model,
                    //contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        //debugger;
                        if (parseInt(data) > 0) {
                            model.SIID = parseInt(data);
                            $('.r6'+index).val(parseInt(data));

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
                model.SIID = parseInt($('.r6' + index).val());
                model.IName = $('.r1' + index + '[data-role="combobox"]').data("kendoComboBox").text();
                model.SID = parseInt($('#SID').val());
                model.IVolume = parseInt($('.Volume').val());
                $.ajax({
                    type: "POST",
                    url: "../StyleRecipe/SaveDetailInfo",
                    data: model,
                    //contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (parseInt(data) > 0) {
                            model.SIID = parseInt(data);
                            $('.r6' + index).val(parseInt(data));
                          
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




            $('.r1' + (index + 1)).focus();
        }
    }



    $scope.data = [];
    $scope.addNewRow = function () {
        // create a blank array
        var newrow = [];

        if ($scope.data.length === 0) {
            newrow = [{
                SIID: null,
                SID: null,
                IName: '',
                ICode: '',
                IPercent: null,
                IGPL: null,
                ILtr: null,
                IVolume: null,
                Remarks: '',
                SIIID: null
            }];
        } else {
            $scope.data[0].forEach(function (row) {
                newrow.push({
                    SIID: null,
                    SID: null,
                    IName: '',
                    ICode: '',
                    IPercent: null,
                    IGPL: null,
                    ILtr: null,
                    IVolume: null,
                    Remarks: '',
                    SIIID: null
                });
            });
        }

        $scope.data.push(newrow);
    };



    $scope.optStyleNo = {
        placeholder: "--- Select ---",
        dataTextField: "StyleNo",
        dataValueField: "StyleCode",
        dataSource: GetAllStyleNo(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    
                }
            })
        },
        change: function (e) {
       
            var item = this.dataItem(this.select());
            $('#StyleNo').val(item.StyleNo);
            $('#StyleCode').val(item.StyleCode);
            $('#GConst').val(item.Construction);
            $('#FConst').val(item.FConstruction);
            $('#Weight').val(item.Weight);
            $('#Color').val(item.ColorName);
            $('#Width').val(item.Width);
            $('#WarpShrinkage').val(item.WarpShrinkage);
            $('#WeftShrinkage').val(item.WeftShrinkage);
            $('#SID').val(item.SID);
            GetStyleParameterFinishing(parseInt(item.SID));
            GetStyleRecipe(parseInt(item.SID));
            $scope.finishingMaster = true;
            $scope.finishingMaster1 = true;
            $scope.finishingDetail = true;
            $scope.btnClose = true;
        }

    };
    $scope.optStyleNoList = {
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

                }
            })
        },
        change: function (e) {
           
            $('.setRef').focus();
        }

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
                    $('.Colorref').focus();
                }
            })
        },
        change: function (e) {
            $('.Colorref').focus();
        }

    };
    $scope.optColor = {
        placeholder: "--- Select ---",
        dataTextField: "ColorName",
        dataValueField: "ColorId",
        dataSource: GetAllColor(),
        dataBound: function () {
            var wgt = this;
            this.input.focus(function () {
                wgt.open();
            })
            this.input.keypress(function (e) {
                if (e.keyCode === 13) {
                    $('.Process').focus();
                }
            })
        },
        change: function (e) {
            $('.Process').focus();
        }

    };

    $scope.optICode = {
        placeholder: "--- Select ---",
        dataTextField: "ICName",
        dataValueField: "ICNo",
        dataSource: GetICode(),
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
                    if (parseInt(splitdoc[1]) > 19) {
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
            var splitdoc = doc.split('r');
            var newClass = "";
            if (parseInt(splitdoc[1]) > 19) {
                newClass = parseInt(splitdoc[1]) + 100;
            } else {
                newClass = parseInt(splitdoc[1]) + 10;
            }

            $('.r' + newClass).focus();
        }

    };


    function GetAllStyleNo() {
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../StyleRecipe/GetAllStyle/";
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
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../StyleRecipe/GetAllSetNo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ SetNo: 0, SetNo: "---Select---" });
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    }
    function GetAllColor() {
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../StyleRecipe/GetAllColor/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ ColorId: 0, ColorName: "---Select---" });
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    }
    $scope.pardata = "";
    function GetStyleParameterFinishing(sID) {
        
        var jsonParam = "";
        var serviceUrl = "../StyleRecipe/GetStyleParameter?SID=" + sID;
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            
            $scope.pardata = jsonData[0];
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        $scope.$apply(function () {
            $scope.pardata;
        })
        return $scope.pardata;
    }
    function GetICode() {
        
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../StyleRecipe/GetICode/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            jsonData.unshift({ ICNo: 0, ICName: "---Select---" });
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    }
  
    function GetStyleRecipe(sID) {
      
        $.ajax({
            url: "../StyleRecipe/GetStyleRecipe?SID=" + sID,
            dataType: 'json',
            success: function (data) {
                if (data.length ===0) {
                    $scope.data = [];
                    $scope.$apply(function () {
                        $scope.data;
                    })
                }else{
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
                    $scope.data;
                })
            }

            }
        });
    }

    $scope.calculateValue=function(model,index){
        
        if ($('#volumn').val() === "" || $('#volumn').val() === undefined || $('#volumn').val() === null || $('#volumn').val() === "0" || $('#volumn').val()==='undefined') {
            $.bootstrapGrowl("Please Input Volumn", {
                ele: 'body',
                type: 'danger',
                offset: { from: 'bottom', amount: 50 },
                align: 'right',
                width: 250,
                delay: 4000,
                allow_dismiss: true,
            });
            return;
            }else{
                var volumn = parseInt($('#volumn').val());
                $scope.data[index][0].IGPL = model.IPercent * 10; 
                $scope.data[index][0].ILtr = (model.IPercent * volumn) / 100;
               
               
            }
        
    }


});