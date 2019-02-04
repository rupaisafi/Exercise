var gbSelectiveMenuArray = [];
var gbRemovedMenuArray = [];
var menuPermissionSummaryManager = {

    gridDataSource: function (usrId) {
        gbSelectiveMenuArray = [];
        gbRemovedMenuArray = [];
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 20,

            transport: {
                read: {
                    url: '../Menu/GetMenuPermissionSummary/?usrId=' + usrId,

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },


                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: { data: "Items", total: "TotalCount" }
        });
        return gridDataSource;
    }
};


var menuPermissionSummaryHelper = {

    InitMenuPermissionSummary: function () {
        menuPermissionSummaryHelper.GenerateMenuPermissionGrid();
        menuPermissionSummaryHelper.MenuPermissionGridChangeEvent();
    },

    GenerateMenuPermissionGrid: function () {
         //gbSelectiveMenuArray = [];
         //gbRemovedMenuArray = [];
        $("#gridMenuPermission").kendoGrid({
            dataSource: [],// menuPermissionSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            filterable: true,
            sortable: true,
            columns: menuPermissionSummaryHelper.GenerateMenuPermissionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },
    GenerateMenuPermissionColumns: function () {
        return columns = [
            { field: "check_row", title: "", width: 30, filterable: false, sortable: false, template: '#= menuPermissionSummaryHelper.CheckedMenu(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "MenuName", title: "Menu Name", width: 130 },
            { field: "ModuleName", title: "Module Name", width: 130 },
            { field: "MenuId", hidden: true }
        ];
    },

    CheckedMenu: function (data) {

        if (gbSelectiveMenuArray.length > 0) {
            
            var result = gbSelectiveMenuArray.filter(function (obj) {
                return obj.MenuId == data.MenuId;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                if (data.MenuPermissionId > 0) {
                    var result2 = gbRemovedMenuArray.filter(function (obj) {
                        return obj.MenuId == data.MenuId;
                    });
                    if (result2.length > 0) {
                        return '<input id="check_row" class="check_row" type="checkbox"/>';
                    } else {
                        gbSelectiveMenuArray.push(data);
                        return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                    }


                } else {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                }

            }

        }
        else {
           
            if (data.MenuPermissionId > 0) {
           
                var result2 = gbRemovedMenuArray.filter(function (obj) {
                    return obj.MenuId == data.MenuId;
                });
                if (result2.length > 0) {
                    return '<input id="check_row" class="check_row" type="checkbox"/>';
                } else {
                    gbSelectiveMenuArray.push(data);
                    return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
                }


              

            } else {

                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
    },

  

    MenuPermissionGridChangeEvent: function () {

        $("#gridMenuPermission").on("click", ".check_row", function () {
           
            var $cb = $(this);
            var gridSummary = $("#gridMenuPermission").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {

                    for (var i = 0; i < gbRemovedMenuArray.length; i++) {
                        if (gbRemovedMenuArray[i].MenuId == dataItem.MenuId) {
                            gbRemovedMenuArray.splice(i, 1);
                            break;
                        }
                    }

                    gbSelectiveMenuArray.push(selectedItem);

                }
            } else {
             
                for (var j = 0; j < gbSelectiveMenuArray.length; j++) {
                    if (gbSelectiveMenuArray[j].MenuId == dataItem.MenuId) {
                        gbSelectiveMenuArray.splice(j, 1);
                        break;
                    }
                }

                if (selectedItem.MenuPermissionId > 0) {
                 
                    gbRemovedMenuArray.push(selectedItem);
                }

            }
        });//Indivisual row selection

        $('#gridMenuPermission').on('change', '#checkAll', function (e) {

            gbSelectiveMenuArray = [];
            gbRemovedMenuArray = [];
            var gridSummary = $("#gridMenuPermission").data("kendoGrid");

            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked == true) {
                $("#gridMenuPermission tbody input:checkbox").prop("checked", this.checked);
                $("#gridMenuPermission table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveMenuArray.push(obj);
                }
            }
            else {
                $("#gridMenuPermission tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridMenuPermission table tr").removeClass('k-state-selected');
                gbSelectiveMenuArray = [];
                var gridDatarv = gridSummary.dataSource.data();
                for (var k = 0; k < gridDatarv.length; k++) {
                    if (gridDatarv[k].MenuId > 0) {
                        gbRemovedMenuArray.push(gridDatarv[k]);
                    }
                }


            }
        });// All Row Selection 

    },


};

