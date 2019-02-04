
var CompanySummaryManager = {
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
                    url: '../Company/GetCompanySummary/',
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

var CompanySummaryHelper = {
    InitCompanySummary: function () {
        CompanySummaryHelper.GenerateCompanyGrid();
    },

    GenerateCompanyGrid: function () {
        $("#grdCompanySummary").kendoGrid({
            dataSource: CompanySummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: CompanySummaryHelper.GenerateCompanyColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });

    },

    GenerateCompanyColumns: function () {
        return columns = [
               { field: "CompanyId", hidden: true },
               { field: "CompanyName", title: "Company Name", width: 70, editable: false },
               { field: "CompanyNameBan", title: "Company Name Ban", width: 70, editable: false },
               { field: "IsActive", title: "Activity", width: 50, editable: false, template: '#=IsActive==true?"Active":"InActive"#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="CompanySummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdCompanySummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            CompanyDetailsHelper.FillForm(selectedItem);
        }
    },
};

