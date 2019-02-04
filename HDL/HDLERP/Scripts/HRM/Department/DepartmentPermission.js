var gbSelectiveDepartmentArray = [];
var gbRemovedDepartmentArray = [];

var DepartmentPermissionManager = {
    gridUnitDataSource: function () {
        var gridUnitDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Unit/GetUnitSummary/',
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
        return gridUnitDataSource;
    },

    GridDepartmentPermissionDataSource: function (UnitId) {
    gbSelectiveDepartmentArray = [];
    gbRemovedDepartmentArray = [];
    var GridDepartmentPermissionDataSource = new kendo.data.DataSource({

        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        pageSize: 20,

        transport: {
            read: {
                url: '../Department/GetDepartmentPermissionSummary/?UnitId=' + UnitId,
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
    return GridDepartmentPermissionDataSource;
    },

    SavePermission: function () {
        var validator = $("#grdDepartmentPermission").kendoValidator().data("kendoValidator"),
        status = $(".status");

        if (validator.validate()) {
            var objUnitDepartmentList = JSON.stringify(gbSelectiveDepartmentArray);
            var objRemovedDepartmentList = JSON.stringify(gbRemovedDepartmentArray);
            var UnitId=JSON.stringify($("#hdnUnitId").val());
            var jsonParam = 'UnitId:' + UnitId + ',objUnitDepartmentList:' + objUnitDepartmentList + ',objRemovedDepartmentList:' + objRemovedDepartmentList;
            var serviceUrl = "../Department/SaveUnitDepartmentPermission/";
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
                            gbSelectiveDepartmentArray = [];
                            gbRemovedDepartmentArray = [];
                            $("#grdDepartmentPermission").data("kendoGrid").dataSource.read();
                            $("#grdUnitSummary").data("kendoGrid").dataSource.read();
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

var DepartmentPermissionHelper = {
    InitDepartmentPermission: function () {
        DepartmentPermissionHelper.GenerateUnitGrid();
        DepartmentPermissionHelper.GenerateDepartmentPermissionGrid();
        DepartmentPermissionHelper.DepartmentPermissionGridChangeEvent();

        $("#btnSavePermission").click(function () {
            DepartmentPermissionManager.SavePermission();
        });
    },

    GenerateUnitGrid: function () {
        $("#grdUnitSummary").kendoGrid({
            dataSource: DepartmentPermissionManager.gridUnitDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DepartmentPermissionHelper.GenerateUnitColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateUnitColumns: function () {
        return columns = [
               { field: "UnitId", hidden: true },
               { field: "CompanyName", title: "Company Name", width: 70, editable: false },
               { field: "UnitName", title: "Unit Name", width: 70, editable: false },
               { field: "UnitNameBan", title: "Unit Name Ban", width: 70, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DepartmentPermissionHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdUnitSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            debugger;
            var data = DepartmentPermissionManager.GridDepartmentPermissionDataSource(selectedItem.UnitId);
            var grid = $("#grdDepartmentPermission").data("kendoGrid");
            grid.setDataSource(data);
            $("#hdnUnitId").val(selectedItem.UnitId);
        }
    },

    GenerateDepartmentPermissionGrid: function () {
        //gbSelectiveDepartmentArray = [];
        //gbRemovedDepartmentArray = [];
        $("#grdDepartmentPermission").kendoGrid({
            dataSource: [],// DepartmentPermissionSummaryManager.GridDepartmentPermissionDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: DepartmentPermissionHelper.GenerateDepartmentPermissionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

    GenerateDepartmentPermissionColumns: function () {
        return columns = [
            { field: "check_row", title: "", width: 7, filterable: false, sortable: false, template: '#= DepartmentPermissionHelper.CheckedDepartment(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "DepartmentName", title: "Department Name", width: 150 },
            { field: "DepartmentID", hidden: true }
        ];
    },

    CheckedDepartment: function (data) {
        debugger;
        if (gbSelectiveDepartmentArray.length > 0) {

            var result = gbSelectiveDepartmentArray.filter(function (obj) {
                return obj.DepartmentID == data.DepartmentID;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                if (data.UDepID > 0) {
                    var result2 = gbRemovedDepartmentArray.filter(function (obj) {
                        return obj.DepartmentID == data.DepartmentID;
                    });
                    if (result2.length > 0) {
                        return '<input id="check_row" class="check_row" type="checkbox"/>';
                    } else {
                        gbSelectiveDepartmentArray.push(data);
                        return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                    }

                } else {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                }
            }
        }
        else {

            if (data.UDepID > 0) {

                var result2 = gbRemovedDepartmentArray.filter(function (obj) {
                    return obj.DepartmentID == data.DepartmentID;
                });
                if (result2.length > 0) {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                } else {
                    gbSelectiveDepartmentArray.push(data);
                    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                }

            } else {

                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
    },

    DepartmentPermissionGridChangeEvent: function () {

        $("#grdDepartmentPermission").on("click", ".check_row", function () {

            var $cb = $(this);
            var gridSummary = $("#grdDepartmentPermission").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {

                    for (var i = 0; i < gbRemovedDepartmentArray.length; i++) {
                        if (gbRemovedDepartmentArray[i].DepartmentID == dataItem.DepartmentID) {
                            gbRemovedDepartmentArray.splice(i, 1);
                            break;
                        }
                    }

                    gbSelectiveDepartmentArray.push(selectedItem);

                }
            } else {

                for (var j = 0; j < gbSelectiveDepartmentArray.length; j++) {
                    if (gbSelectiveDepartmentArray[j].DepartmentID == dataItem.DepartmentID) {
                        gbSelectiveDepartmentArray.splice(j, 1);
                        break;
                    }
                }

                if (selectedItem.UDepID > 0) {

                    gbRemovedDepartmentArray.push(selectedItem);
                }

            }
        });//Indivisual row selection

        $('#grdDepartmentPermission').on('change', '#checkAll', function (e) {

            gbSelectiveDepartmentArray = [];
            gbRemovedDepartmentArray = [];
            var gridSummary = $("#grdDepartmentPermission").data("kendoGrid");

            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked == true) {
                $("#grdDepartmentPermission tbody input:checkbox").prop("checked", this.checked);
                $("#grdDepartmentPermission table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveDepartmentArray.push(obj);
                }
            }
            else {
                $("#grdDepartmentPermission tbody input:checkbox").removeAttr("checked", this.checked);
                $("#grdDepartmentPermission table tr").removeClass('k-state-selected');
                gbSelectiveDepartmentArray = [];
                var gridDatarv = gridSummary.dataSource.data();
                for (var k = 0; k < gridDatarv.length; k++) {
                    if (gridDatarv[k].DepartmentID > 0) {
                        gbRemovedDepartmentArray.push(gridDatarv[k]);
                    }
                }


            }
        });// All Row Selection 
    },
};

