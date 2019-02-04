var gbSelectiveSectionArray = [];
var gbRemovedSectionArray = [];

var SectionPermissionManager = {
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

    GridSectionPermissionDataSource: function (UDepID) {
    gbSelectiveSectionArray = [];
    gbRemovedSectionArray = [];
    var GridSectionPermissionDataSource = new kendo.data.DataSource({

        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        pageSize: 20,

        transport: {
            read: {
                url: '../Section/GetSectionPermissionSummary/?UDepID=' + UDepID,
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
    return GridSectionPermissionDataSource;
    },

    SavePermission: function () {
        var validator = $("#grdSectionPermission").kendoValidator().data("kendoValidator"),
        status = $(".status");

        if (validator.validate()) {
            var objUnitDepSectionList = JSON.stringify(gbSelectiveSectionArray);
            var objRemovedSectionList = JSON.stringify(gbRemovedSectionArray);
            var UDepID=JSON.stringify($("#hdnUDepID").val());
            var jsonParam = 'UDepID:' + UDepID + ',objUnitDepSectionList:' + objUnitDepSectionList + ',objRemovedSectionList:' + objRemovedSectionList;
            var serviceUrl = "../Section/SaveSectionPermission/";
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
                            gbSelectiveSectionArray = [];
                            gbRemovedSectionArray = [];
                            $("#grdSectionPermission").data("kendoGrid").dataSource.read();
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

var SectionPermissionHelper = {
    InitSectionPermission: function () {
        SectionPermissionHelper.GenerateUnitGrid();
        SectionPermissionHelper.GenerateSectionPermissionGrid();
        SectionPermissionHelper.SectionPermissionGridChangeEvent();

        $("#btnSavePermission").click(function () {
            SectionPermissionManager.SavePermission();
        });
    },

    GenerateUnitGrid: function () {
        $("#grdUnitDepartmentSummary").kendoGrid({
            dataSource: SectionPermissionManager.grdUnitDepartmentDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: SectionPermissionHelper.GenerateUnitDepartmentColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateUnitDepartmentColumns: function () {
        return columns = [
               { field: "UDepID", hidden: true },
               { field: "UnitName", title: "Unit Name", width: 75, editable: false },
               { field: "DepartmentName", title: "Department Name", width: 75, editable: false },
               { field: "Edit", title: "Edit/View", filterable: false, width: 10, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="SectionPermissionHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {
        var entityGrid = $("#grdUnitDepartmentSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            debugger;
            var data = SectionPermissionManager.GridSectionPermissionDataSource(selectedItem.UDepID);
            var grid = $("#grdSectionPermission").data("kendoGrid");
            grid.setDataSource(data);
            $("#hdnUDepID").val(selectedItem.UDepID);
        }
    },

    GenerateSectionPermissionGrid: function () {
        //gbSelectiveSectionArray = [];
        //gbRemovedSectionArray = [];
        $("#grdSectionPermission").kendoGrid({
            dataSource: [],// SectionPermissionSummaryManager.GridSectionPermissionDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: SectionPermissionHelper.GenerateSectionPermissionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },

    GenerateSectionPermissionColumns: function () {
        return columns = [
            { field: "check_row", title: "", width: 7, filterable: false, sortable: false, template: '#= SectionPermissionHelper.CheckedSection(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "SectionName", title: "Section Name", width: 150 },
            { field: "SectionID", hidden: true }
        ];
    },

    CheckedSection: function (data) {
        debugger;
        if (gbSelectiveSectionArray.length > 0) {

            var result = gbSelectiveSectionArray.filter(function (obj) {
                return obj.SectionID == data.SectionID;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                if (data.DSecID > 0) {
                    var result2 = gbRemovedSectionArray.filter(function (obj) {
                        return obj.SectionID == data.SectionID;
                    });
                    if (result2.length > 0) {
                        return '<input id="check_row" class="check_row" type="checkbox"/>';
                    } else {
                        gbSelectiveSectionArray.push(data);
                        return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                    }

                } else {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                }
            }
        }
        else {

            if (data.DSecID > 0) {

                var result2 = gbRemovedSectionArray.filter(function (obj) {
                    return obj.SectionID == data.SectionID;
                });
                if (result2.length > 0) {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                } else {
                    gbSelectiveSectionArray.push(data);
                    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                }

            } else {

                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
    },

    SectionPermissionGridChangeEvent: function () {

        $("#grdSectionPermission").on("click", ".check_row", function () {

            var $cb = $(this);
            var gridSummary = $("#grdSectionPermission").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {

                    for (var i = 0; i < gbRemovedSectionArray.length; i++) {
                        if (gbRemovedSectionArray[i].SectionID == dataItem.SectionID) {
                            gbRemovedSectionArray.splice(i, 1);
                            break;
                        }
                    }

                    gbSelectiveSectionArray.push(selectedItem);

                }
            } else {

                for (var j = 0; j < gbSelectiveSectionArray.length; j++) {
                    if (gbSelectiveSectionArray[j].SectionID == dataItem.SectionID) {
                        gbSelectiveSectionArray.splice(j, 1);
                        break;
                    }
                }

                if (selectedItem.DSecID > 0) {

                    gbRemovedSectionArray.push(selectedItem);
                }

            }
        });//Indivisual row selection

        $('#grdSectionPermission').on('change', '#checkAll', function (e) {

            gbSelectiveSectionArray = [];
            gbRemovedSectionArray = [];
            var gridSummary = $("#grdSectionPermission").data("kendoGrid");

            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked == true) {
                $("#grdSectionPermission tbody input:checkbox").prop("checked", this.checked);
                $("#grdSectionPermission table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveSectionArray.push(obj);
                }
            }
            else {
                $("#grdSectionPermission tbody input:checkbox").removeAttr("checked", this.checked);
                $("#grdSectionPermission table tr").removeClass('k-state-selected');
                gbSelectiveSectionArray = [];
                var gridDatarv = gridSummary.dataSource.data();
                for (var k = 0; k < gridDatarv.length; k++) {
                    if (gridDatarv[k].SectionID > 0) {
                        gbRemovedSectionArray.push(gridDatarv[k]);
                    }
                }
            }
        });// All Row Selection 
    },
};

