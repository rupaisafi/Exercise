var SectionSummaryManager = {
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
                    url: '../Section/GetSectionSummary/',
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

var SectionSummaryHelper = {
    InitSectionSummary: function () {
        SectionSummaryHelper.GenerateSectionGrid();
    },

    GenerateSectionGrid: function () {
        $("#grdSectionSummary").kendoGrid({
            dataSource: SectionSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: SectionSummaryHelper.GenerateSectionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    GenerateSectionColumns: function () {
        return columns = [
               { field: "SectionID", hidden: true },
               { field: "SectionName", title: "Section Name", width: 70, editable: false },
               { field: "SectionNameBan", title: "Section Name Ban", width: 70, editable: false },
               { field: "IsActive", title: "Activity", width: 50, editable: false, template: '#=IsActive==true?"Active":"InActive"#' },
               { field: "Edit", title: "Edit/View", filterable: false, width: 30, template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="SectionSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>', sortable: false }
        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#grdSectionSummary").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            SectionDetailsHelper.FillForm(selectedItem);
        }
    },
};

