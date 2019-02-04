
var UserSummaryManager = {
    gridDataSource: function (usrId) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../User/GetUserSummary/?usrId=' + usrId,

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
                        MeetingDate: {
                            type: "date",
                            template: '#= kendo.toString("MM/dd/yyyy") #'
                        },

                    }
                },
            }
        });
        return gridDataSource;
    }
};


var UserSummaryHelper= {
    InitUserSummary: function () {
        UserSummaryHelper.GenerateUserGrid();
        $("#cmbUser").change(function () {
            var usrId = $("#cmbUser").data("kendoComboBox").value();
            var data = UserSummaryManager.gridDataSource(usrId);
            $("#grdUserSummary").data("kendoGrid").setDataSource(data);
        });
    },

    GenerateUserGrid: function () {
        $("#grdUserSummary").kendoGrid({
            dataSource:  UserSummaryManager.gridDataSource(0),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: UserSummaryHelper.GenerateUserColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });

    },
    GenerateUserColumns: function () {
        return columns = [
                { field: "EMPID", title: "Emp ID", width: 60 },
                { field: "USERNAME", title: "Name", width: 100 },
                { field: "USRDESIG", title: "Designation", width: 100 },
                { field: "Edit", title: "Action", filterable: false, width: 40, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="UserSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span> Edit</button>', sortable: false }
        ];
    },
    clickEventForEditButton: function () {
      
        var entityGrid = $("#grdUserSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            $("#hdnUserId").val(selectedItem.EMPID);
            $("#txtUserId").val(selectedItem.EMPID);
            $("#txtUserName").val(selectedItem.USERNAME);
            $("#txtDesig").val(selectedItem.USRDESIG);
            $("#txtNewPassword").val(selectedItem.USRPASS);
            $("#txtReNewPass").val(selectedItem.USRPASS);
            $("#cmbUserType").data("kendoComboBox").value(selectedItem.USERTYPE);
            var data = menuPermissionSummaryManager.gridDataSource(selectedItem.EMPID);
            $("#gridMenuPermission").data("kendoGrid").setDataSource(data);
        }

    }
}