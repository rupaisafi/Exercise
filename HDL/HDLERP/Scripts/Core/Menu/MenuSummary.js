$(document).ready(function() {
    $("#tabstrip").removeClass('k-state-active a');
});

var menuSummaryManager = {
    GenerateMenuGrid: function () {
        $("#gridMenu").kendoGrid({
            dataSource: menuSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            
            filterable: true,
            sortable: true,
            columns: menuSummaryHelper.GenerateMenuColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });
    },
    gridDataSource: function () {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../Menu/GetMenuSummary/',

                    type: "POST",

                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },
                update: {
                    url: '../Menu/GetMenuSummary/',
                    dataType: "json"
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


var menuSummaryHelper = {
    GenerateMenuColumns: function () {
        return columns = [
            { field: "MenuName", title: "Menu Name", width: 130 },
            { field: "ParentMenuName", title: "Parent Menu", hidden: false, width: 130, sortable:false },
            { field: "ModuleName", title: "Module Name", width: 130 },
            { field: "MenuId", hidden: true },
            { field: "ModuleId", hidden: true },
            { field: "MenuPath", hidden: true },
            { field: "ParentMenu", hidden: true },
            { field: "ToDo", hidden: true },
            { field: "SortOrder", hidden: true },
            { field: "Edit", title: "Edit", filterable: false, width: 60, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="menuSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable:false }
        ];
    },
    
    clickEventForEditButton: function () {
        var entityGrid = $("#gridMenu").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            menuDetailsHelper.FillMenuDetailsInForm(selectedItem);
        }
        
    }
};

