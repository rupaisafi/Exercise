var gbSelectiveWingArray = [];
var gbRemovedWingArray = [];

var WingPermissionManager = {
    grdDepartmentSecDataSource: function () {
        var grdDepartmentSecDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Wing/GetDeptSectionSummary/',
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        ExpDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }
                    }
                },
            }
        });
        return grdDepartmentSecDataSource;
    },

    GridWingPermissionDataSource: function (DSecID) {
    gbSelectiveWingArray = [];
    gbRemovedWingArray = [];
    var GridWingPermissionDataSource = new kendo.data.DataSource({

        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        pageSize: 20,

        transport: {
            read: {
                url: '../Wing/GetWingPermissionSummary/?DSecID=' + DSecID,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false
            },
            parameterMap: function (options) {
                return JSON.stringify(options);
            }
        },
        schema: { data: "Items", total: "TotalCount" }
    });
    return GridWingPermissionDataSource;
    },

    SavePermission: function () {
        var validator = $("#grdWingPermission").kendoValidator().data("kendoValidator"),
        status = $(".status");

        if (validator.validate()) {
            var objSecWingList = JSON.stringify(gbSelectiveWingArray);
            var objRemovedWingList = JSON.stringify(gbRemovedWingArray);
            var DSecID=JSON.stringify($("#hdnDSecID").val());
            var jsonParam = 'DSecID:' + DSecID + ',objSecWingList:' + objSecWingList + ',objRemovedWingList:' + objRemovedWingList;
            var serviceUrl = "../Wing/SaveWingPermission/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                var message = "";
                message = "Saved Successfully";
                AjaxManager.MsgBox('success', 'center', 'Success:', message,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            gbSelectiveWingArray = [];
                            gbRemovedWingArray = [];
                            $("#grdWingPermission").data("kendoGrid").dataSource.read();
                            $("#grdDepartmentSecSummary").data("kendoGrid").dataSource.read();
                        }
                    }]);
            }
            else if (jsonData == "Exists") {

                AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'Already Exist !',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                          }
                      }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },
};

var WingPermissionHelper = {
    InitWingPermission: function () {
        WingPermissionHelper.GenerateDepartmentSecSummaryGrid();
        WingPermissionHelper.GenerateWingPermissionGrid();
        WingPermissionHelper.WingPermissionGridChangeEvent();

        $("#btnSavePermission").click(function () {
            WingPermissionManager.SavePermission();
        });
    },

    GenerateDepartmentSecSummaryGrid: function () {
        $("#grdDepartmentSecSummary").kendoGrid({
            dataSource: WingPermissionManager.grdDepartmentSecDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: WingPermissionHelper.GenerateDepartmentSecColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateDepartmentSecColumns: function () {
        return columns = [
               { field: "DSecID", hidden: true },
               { field: "UnitName", title: "Unit Name", width: 55, editable: false },
               { field: "DepartmentName", title: "Department Name", width: 55, editable: false },
               { field: "SectionName", title: "Section Name", width: 55, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 10, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="WingPermissionHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdDepartmentSecSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            var data = WingPermissionManager.GridWingPermissionDataSource(selectedItem.DSecID);
            var grid = $("#grdWingPermission").data("kendoGrid");
            grid.setDataSource(data);
            $("#hdnDSecID").val(selectedItem.DSecID);
        }
    },

    GenerateWingPermissionGrid: function () {
        //gbSelectiveWingArray = [];
        //gbRemovedWingArray = [];
        $("#grdWingPermission").kendoGrid({
            dataSource: [],// WingPermissionSummaryManager.GridWingPermissionDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: WingPermissionHelper.GenerateWingPermissionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

    GenerateWingPermissionColumns: function () {
        return columns = [
            { field: "check_row", title: "", width: 7, filterable: false, sortable: false, template: '#= WingPermissionHelper.CheckedWing(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "WingName", title: "Wing Name", width: 150 },
            { field: "WingID", hidden: true }
        ];
    },

    CheckedWing: function (data) {
        if (gbSelectiveWingArray.length > 0) {

            var result = gbSelectiveWingArray.filter(function (obj) {
                return obj.WingID == data.WingID;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                if (data.DSecID > 0) {
                    var result2 = gbRemovedWingArray.filter(function (obj) {
                        return obj.WingID == data.WingID;
                    });
                    if (result2.length > 0) {
                        return '<input id="check_row" class="check_row" type="checkbox"/>';
                    } else {
                        gbSelectiveWingArray.push(data);
                        return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                    }

                } else {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                }
            }
        }
        else {

            if (data.DSecID > 0) {

                var result2 = gbRemovedWingArray.filter(function (obj) {
                    return obj.WingID == data.WingID;
                });
                if (result2.length > 0) {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                } else {
                    gbSelectiveWingArray.push(data);
                    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                }

            } else {

                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
    },

    WingPermissionGridChangeEvent: function () {

        $("#grdWingPermission").on("click", ".check_row", function () {

            var $cb = $(this);
            var gridSummary = $("#grdWingPermission").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {

                    for (var i = 0; i < gbRemovedWingArray.length; i++) {
                        if (gbRemovedWingArray[i].WingID == dataItem.WingID) {
                            gbRemovedWingArray.splice(i, 1);
                            break;
                        }
                    }

                    gbSelectiveWingArray.push(selectedItem);

                }
            } else {

                for (var j = 0; j < gbSelectiveWingArray.length; j++) {
                    if (gbSelectiveWingArray[j].WingID == dataItem.WingID) {
                        gbSelectiveWingArray.splice(j, 1);
                        break;
                    }
                }

                if (selectedItem.DSecID > 0) {

                    gbRemovedWingArray.push(selectedItem);
                }

            }
        });//Indivisual row selection

        $('#grdWingPermission').on('change', '#checkAll', function (e) {

            gbSelectiveWingArray = [];
            gbRemovedWingArray = [];
            var gridSummary = $("#grdWingPermission").data("kendoGrid");

            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked == true) {
                $("#grdWingPermission tbody input:checkbox").prop("checked", this.checked);
                $("#grdWingPermission table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveWingArray.push(obj);
                }
            }
            else {
                $("#grdWingPermission tbody input:checkbox").removeAttr("checked", this.checked);
                $("#grdWingPermission table tr").removeClass('k-state-selected');
                gbSelectiveWingArray = [];
                var gridDatarv = gridSummary.dataSource.data();
                for (var k = 0; k < gridDatarv.length; k++) {
                    if (gridDatarv[k].WingID > 0) {
                        gbRemovedWingArray.push(gridDatarv[k]);
                    }
                }
            }
        });// All Row Selection 
    },
};

