var gbSelectiveDesignationArray = [];
var gbRemovedDesignationArray = [];

var DesignationPermissionManager = {
    grdUnitDepartmentDataSource: function () {
        var grdUnitDepartmentDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Section/GetUnitDepartmentSummary/',
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
        return grdUnitDepartmentDataSource;
    },

    GridDesignationPermissionDataSource: function (UDepID) {
    gbSelectiveDesignationArray = [];
    gbRemovedDesignationArray = [];
    var GridDesignationPermissionDataSource = new kendo.data.DataSource({

        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        pageSize: 20,

        transport: {
            read: {
                url: '../Designation/GetDesignationPermissionSummary/?UDepID=' + UDepID,
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
    return GridDesignationPermissionDataSource;
    },

    SavePermission: function () {
        var validator = $("#grdDesignationPermission").kendoValidator().data("kendoValidator"),
        status = $(".status");

        if (validator.validate()) {
            var objDepDesignationList = JSON.stringify(gbSelectiveDesignationArray);
            var objRemovedDesignationList = JSON.stringify(gbRemovedDesignationArray);
            var UDepID=JSON.stringify($("#hdnUDepID").val());
            var jsonParam = 'UDepID:' + UDepID + ',objDepDesignationList:' + objDepDesignationList + ',objRemovedDesignationList:' + objRemovedDesignationList;
            var serviceUrl = "../Designation/SaveDesignationPermission/";
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
                            gbSelectiveDesignationArray = [];
                            gbRemovedDesignationArray = [];
                            $("#grdDesignationPermission").data("kendoGrid").dataSource.read();
                            $("#grdUnitDepartmentSummary").data("kendoGrid").dataSource.read();
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

var DesignationPermissionHelper = {
    InitDesignationPermission: function () {
        DesignationPermissionHelper.GenerateSecWingSummaryGrid();
        DesignationPermissionHelper.GenerateDesignationPermissionGrid();
        DesignationPermissionHelper.DesignationPermissionGridChangeEvent();

        $("#btnSavePermission").click(function () {
            DesignationPermissionManager.SavePermission();
        });
    },

    GenerateSecWingSummaryGrid: function () {
        $("#grdUnitDepartmentSummary").kendoGrid({
            dataSource: DesignationPermissionManager.grdUnitDepartmentDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DesignationPermissionHelper.GenerateUnitDepartmentColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateUnitDepartmentColumns: function () {
        return columns = [
               { field: "UDepID", hidden: true },
               { field: "UnitName", title: "Unit Name", width: 50, editable: false },
               { field: "DepartmentName", title: "Department Name", width: 50, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 15, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DesignationPermissionHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdUnitDepartmentSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            var data = DesignationPermissionManager.GridDesignationPermissionDataSource(selectedItem.UDepID);
            var grid = $("#grdDesignationPermission").data("kendoGrid");
            grid.setDataSource(data);
            $("#hdnUDepID").val(selectedItem.UDepID);
        }
    },

    GenerateDesignationPermissionGrid: function () {
        //gbSelectiveDesignationArray = [];
        //gbRemovedDesignationArray = [];
        $("#grdDesignationPermission").kendoGrid({
            dataSource: [],// DesignationPermissionSummaryManager.GridDesignationPermissionDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: DesignationPermissionHelper.GenerateDesignationPermissionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

    GenerateDesignationPermissionColumns: function () {
        return columns = [
            { field: "check_row", title: "", width: 7, filterable: false, sortable: false, template: '#= DesignationPermissionHelper.CheckedDesignation(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "DesignationName", title: "Designation Name", width: 150 },
            { field: "DesignationID", hidden: true }
        ];
    },

    CheckedDesignation: function (data) {
        if (gbSelectiveDesignationArray.length > 0) {

            var result = gbSelectiveDesignationArray.filter(function (obj) {
                return obj.DesignationID == data.DesignationID;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                if (data.UDepID > 0) {
                    var result2 = gbRemovedDesignationArray.filter(function (obj) {
                        return obj.DesignationID == data.DesignationID;
                    });
                    if (result2.length > 0) {
                        return '<input id="check_row" class="check_row" type="checkbox"/>';
                    } else {
                        gbSelectiveDesignationArray.push(data);
                        return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                    }

                } else {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                }
            }
        }
        else {

            if (data.UDepID > 0) {

                var result2 = gbRemovedDesignationArray.filter(function (obj) {
                    return obj.DesignationID == data.DesignationID;
                });
                if (result2.length > 0) {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                } else {
                    gbSelectiveDesignationArray.push(data);
                    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                }

            } else {

                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
    },

    DesignationPermissionGridChangeEvent: function () {

        $("#grdDesignationPermission").on("click", ".check_row", function () {

            var $cb = $(this);
            var gridSummary = $("#grdDesignationPermission").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {

                    for (var i = 0; i < gbRemovedDesignationArray.length; i++) {
                        if (gbRemovedDesignationArray[i].DesignationID == dataItem.DesignationID) {
                            gbRemovedDesignationArray.splice(i, 1);
                            break;
                        }
                    }
                    gbSelectiveDesignationArray.push(selectedItem);
                }
            } else {

                for (var j = 0; j < gbSelectiveDesignationArray.length; j++) {
                    if (gbSelectiveDesignationArray[j].DesignationID == dataItem.DesignationID) {
                        gbSelectiveDesignationArray.splice(j, 1);
                        break;
                    }
                }

                if (selectedItem.UDepID > 0) {

                    gbRemovedDesignationArray.push(selectedItem);
                }

            }
        });//Indivisual row selection

        $('#grdDesignationPermission').on('change', '#checkAll', function (e) {

            gbSelectiveDesignationArray = [];
            gbRemovedDesignationArray = [];
            var gridSummary = $("#grdDesignationPermission").data("kendoGrid");

            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked == true) {
                $("#grdDesignationPermission tbody input:checkbox").prop("checked", this.checked);
                $("#grdDesignationPermission table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveDesignationArray.push(obj);
                }
            }
            else {
                $("#grdDesignationPermission tbody input:checkbox").removeAttr("checked", this.checked);
                $("#grdDesignationPermission table tr").removeClass('k-state-selected');
                gbSelectiveDesignationArray = [];
                var gridDatarv = gridSummary.dataSource.data();
                for (var k = 0; k < gridDatarv.length; k++) {
                    if (gridDatarv[k].DesignationID > 0) {
                        gbRemovedDesignationArray.push(gridDatarv[k]);
                    }
                }
            }
        });// All Row Selection 
    },
};

