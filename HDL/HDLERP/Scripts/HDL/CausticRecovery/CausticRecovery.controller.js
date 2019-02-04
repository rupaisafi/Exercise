var app = angular.module('myApp', ['kendo.directives']);

app.controller('causticRecoveryCtrl', function ($scope, $q) {

    var vm = this;
    $scope.finishingDetail = true;
    $scope.finishingGrid = true;
    $scope.btnClose = false;

    $scope.newData = function () {
        $scope.finishingDetail = true;
        $scope.finishingGrid = false;
        $scope.btnClose = true;
    }
    $scope.close = function () {
        $scope.finishingDetail = false;
        $scope.finishingGrid = true;
        $scope.btnClose = false;

        $scope.data = [];
    }
    $scope.masterObj = {};


    //==========move next start ======================



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


                if (row === 'rowdis') {
                    $scope.addNewRow();
                }
                $('.r' + newClass).focus();
            }

        }
    }
    $scope.recDetailMoveAndSave = function (e, ind, model) {
        if (e.keyCode === 13) {
            if ($('.r7' + ind).val() === 0 || $('.r7' + ind).val() === "0" || $('.r7' + ind).val() === undefined || $('.r7' + ind).val() === null || $('.r7' + ind).val() === "") {
                model.CID = 0;
                $.ajax({
                    type: "post",
                    url: "../CausticRecovery/SaveMasterInfo",
                    data: model,
                    datatype: "json",
                    success: function (data) {
                        if (parseInt(data) > 0) {
                            debugger;
                            $('.r7' + ind).val(parseInt(data))
                            $scope.data[ind][0].FIID = parseInt(data)
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
                model.CID = $('.r7' + ind).val()
               
                $.ajax({
                    type: "post",
                    url: "../CausticRecovery/SaveMasterInfo",
                    data: model,
                    //contenttype: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function (data) {
                        if (parseInt(data) > 0) {
                            // debugger;
                            $('.r7' + ind).val(parseInt(data))
                            $scope.data[ind][0].FIID = parseInt(data)
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



            var doc = '.r1' + (ind + 1);
            $(doc).focus();
        }
    }


    //==========move next end======================




    $scope.data = [];
    $scope.addNewRow = function () {
        // create a blank array
        var newrow = [];

        if ($scope.data.length === 0) {
            newrow = [{
                CID: null,
                CDate: null,
                DCode: '',
                DName: '',
                WeaklyCusticInM3: null,
                WeaklyCusticBoom: null,
                RecoveryCausticM3: null,
                RecoveryCausticBoom: null,
                Remarks: '',
                Status: ''
            }];
        } else {
            $scope.data[0].forEach(function (row) {
                newrow.push({
                    CID: null,
                    CDate: null,
                    DCode: '',
                    DName: '',
                    WeaklyCusticInM3: null,
                    WeaklyCusticBoom: null,
                    RecoveryCausticM3: null,
                    RecoveryCausticBoom: null,
                    Remarks: '',
                    Status: ''
                });
            });
        }

        $scope.data.push(newrow);
    };

});