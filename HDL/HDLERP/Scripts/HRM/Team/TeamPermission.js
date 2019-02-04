var gbSelectiveTeamArray = [];
var gbRemovedTeamArray = [];

var TeamPermissionManager = {
    grdSecWingDataSource: function () {
        var grdSecWingDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Team/GetSectionWingSummary/',
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
        return grdSecWingDataSource;
    },

    GridTeamPermissionDataSource: function (SWingID) {
    gbSelectiveTeamArray = [];
    gbRemovedTeamArray = [];
    var GridTeamPermissionDataSource = new kendo.data.DataSource({

        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        pageSize: 20,

        transport: {
            read: {
                url: '../Team/GetTeamPermissionSummary/?SWingID=' + SWingID,
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
    return GridTeamPermissionDataSource;
    },

    SavePermission: function () {
        var validator = $("#grdTeamPermission").kendoValidator().data("kendoValidator"),
        status = $(".status");

        if (validator.validate()) {
            var objSecTeamList = JSON.stringify(gbSelectiveTeamArray);
            var objRemovedTeamList = JSON.stringify(gbRemovedTeamArray);
            var SWingID=JSON.stringify($("#hdnSWingID").val());
            var jsonParam = 'SWingID:' + SWingID + ',objSecTeamList:' + objSecTeamList + ',objRemovedTeamList:' + objRemovedTeamList;
            var serviceUrl = "../Team/SaveTeamPermission/";
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
                            gbSelectiveTeamArray = [];
                            gbRemovedTeamArray = [];
                            $("#grdTeamPermission").data("kendoGrid").dataSource.read();
                            $("#grdSecWingSummary").data("kendoGrid").dataSource.read();
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

var TeamPermissionHelper = {
    InitTeamPermission: function () {
        TeamPermissionHelper.GenerateSecWingSummaryGrid();
        TeamPermissionHelper.GenerateTeamPermissionGrid();
        TeamPermissionHelper.TeamPermissionGridChangeEvent();

        $("#btnSavePermission").click(function () {
            TeamPermissionManager.SavePermission();
        });
    },

    GenerateSecWingSummaryGrid: function () {
        $("#grdSecWingSummary").kendoGrid({
            dataSource: TeamPermissionManager.grdSecWingDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: TeamPermissionHelper.GenerateSecWingColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateSecWingColumns: function () {
        return columns = [
               { field: "SWingID", hidden: true },
               { field: "UnitName", title: "Unit Name", width: 50, editable: false },
               { field: "DepartmentName", title: "Department Name", width: 50, editable: false },
               { field: "SectionName", title: "Section Name", width: 50, editable: false },
               { field: "WingName", title: "Wing Name", width: 50, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 15, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="TeamPermissionHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdSecWingSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            var data = TeamPermissionManager.GridTeamPermissionDataSource(selectedItem.SWingID);
            var grid = $("#grdTeamPermission").data("kendoGrid");
            grid.setDataSource(data);
            $("#hdnSWingID").val(selectedItem.SWingID);
        }
    },

    GenerateTeamPermissionGrid: function () {
        //gbSelectiveTeamArray = [];
        //gbRemovedTeamArray = [];
        $("#grdTeamPermission").kendoGrid({
            dataSource: [],// TeamPermissionSummaryManager.GridTeamPermissionDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: TeamPermissionHelper.GenerateTeamPermissionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

    GenerateTeamPermissionColumns: function () {
        return columns = [
            { field: "check_row", title: "", width: 7, filterable: false, sortable: false, template: '#= TeamPermissionHelper.CheckedTeam(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "TeamName", title: "Team Name", width: 150 },
            { field: "TeamID", hidden: true }
        ];
    },

    CheckedTeam: function (data) {
        if (gbSelectiveTeamArray.length > 0) {

            var result = gbSelectiveTeamArray.filter(function (obj) {
                return obj.TeamID == data.TeamID;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                if (data.SWingID > 0) {
                    var result2 = gbRemovedTeamArray.filter(function (obj) {
                        return obj.TeamID == data.TeamID;
                    });
                    if (result2.length > 0) {
                        return '<input id="check_row" class="check_row" type="checkbox"/>';
                    } else {
                        gbSelectiveTeamArray.push(data);
                        return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                    }

                } else {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                }
            }
        }
        else {

            if (data.SWingID > 0) {

                var result2 = gbRemovedTeamArray.filter(function (obj) {
                    return obj.TeamID == data.TeamID;
                });
                if (result2.length > 0) {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                } else {
                    gbSelectiveTeamArray.push(data);
                    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                }

            } else {

                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
    },

    TeamPermissionGridChangeEvent: function () {

        $("#grdTeamPermission").on("click", ".check_row", function () {

            var $cb = $(this);
            var gridSummary = $("#grdTeamPermission").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {

                    for (var i = 0; i < gbRemovedTeamArray.length; i++) {
                        if (gbRemovedTeamArray[i].TeamID == dataItem.TeamID) {
                            gbRemovedTeamArray.splice(i, 1);
                            break;
                        }
                    }
                    gbSelectiveTeamArray.push(selectedItem);
                }
            } else {

                for (var j = 0; j < gbSelectiveTeamArray.length; j++) {
                    if (gbSelectiveTeamArray[j].TeamID == dataItem.TeamID) {
                        gbSelectiveTeamArray.splice(j, 1);
                        break;
                    }
                }

                if (selectedItem.SWingID > 0) {

                    gbRemovedTeamArray.push(selectedItem);
                }

            }
        });//Indivisual row selection

        $('#grdTeamPermission').on('change', '#checkAll', function (e) {

            gbSelectiveTeamArray = [];
            gbRemovedTeamArray = [];
            var gridSummary = $("#grdTeamPermission").data("kendoGrid");

            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked == true) {
                $("#grdTeamPermission tbody input:checkbox").prop("checked", this.checked);
                $("#grdTeamPermission table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveTeamArray.push(obj);
                }
            }
            else {
                $("#grdTeamPermission tbody input:checkbox").removeAttr("checked", this.checked);
                $("#grdTeamPermission table tr").removeClass('k-state-selected');
                gbSelectiveTeamArray = [];
                var gridDatarv = gridSummary.dataSource.data();
                for (var k = 0; k < gridDatarv.length; k++) {
                    if (gridDatarv[k].TeamID > 0) {
                        gbRemovedTeamArray.push(gridDatarv[k]);
                    }
                }
            }
        });// All Row Selection 
    },
};

