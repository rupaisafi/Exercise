var TeamSummaryManager = {
    gridDataSource: function () {
        debugger
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Team/GetTeamSummary/',
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
        return gridDataSource;
    }
};

var TeamSummaryHelper = {
    InitTeamSummary: function () {
        TeamSummaryHelper.GenerateTeamGrid();
    },

    GenerateTeamGrid: function () {
        $("#grdTeamSummary").kendoGrid({
            dataSource: TeamSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: TeamSummaryHelper.GenerateTeamColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateTeamColumns: function () {
        return columns = [
               { field: "TeamID", hidden: true },
               { field: "TeamName", title: "Team Name", width: 70, editable: false },
               { field: "TeamNameBan", title: "Team Name Ban", width: 70, editable: false },
               { field: "IsActive", title: "Activity", width: 50, editable: false, template: '#=IsActive==true?"Active":"InActive"#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="TeamSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdTeamSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            TeamDetailsHelper.FillForm(selectedItem);
        }
    },
};

