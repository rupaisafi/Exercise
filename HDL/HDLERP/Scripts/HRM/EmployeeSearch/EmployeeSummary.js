/// <reference path="employeetree.js" />

var gbSelectiveEmpArray = [];
var pageId = 0;

var EmployeeSummaryManager = {
    gridDataSource: function (checkedNodes, searchKey, status) {
        var gridDataSource = new window.kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: false,
            // pageSize: 20,
            transport: {
                read: {
                    //url: '../EmployeeBasic/GetEmployeeSummary/?treelist=' + { data: checkedNodes} + '&searchKey=' + searchKey + "&status=" + status,
                    url: '../EmployeeBasic/GetEmployeeSummary/?searchKey=' + searchKey + "&status=" + status,
                    data: {
                        treelist: checkedNodes
                    },
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
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        JoiningDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        },
                        DateOfBirth: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }

                    }
                }
            }
        });
        return gridDataSource;
    }
};

var EmployeeSummaryHelper = {
    InitEmployeeSummary: function () {
        EmployeeSummaryHelper.GenerateImployeeInfoGrid();

        $("#btnSearchEmp").click(function () {
            gbSelectiveEmpArray = [];
            $("#grdEmployee thead input:checkbox").prop("checked", false);

            EmployeeTreeHelper.GetAllCheckedItem();
            var searchKey = $("#txtSearchKey").val();
            var status = $("#cmbStatus").data("kendoComboBox").value();
            var data = EmployeeSummaryManager.gridDataSource(checkedNodes, searchKey, status);
            var empGrid = $("#grdEmployee").data("kendoGrid");
            empGrid.setDataSource(data);
        });

        EmployeeSummaryHelper.EmployeeGridChangeEvent();
    },
    GenerateImployeeInfoGrid: function () {
        $("#grdEmployee").kendoGrid({
            dataSource: [],
            filterable: true,
            sortable: true,
            //scrollable:true,
            columns: EmployeeSummaryHelper.GenerateEmployeeInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });
    },
    GenerateEmployeeInfoColumns: function () {
        var columns = [
            { field: "check_row", title: "", filterable: false, sortable: false, template: '#= EmployeeSummaryHelper.CheckedMenu(data) #', headerTemplate: "<input type='checkbox' id='checkAll'/>" },
            { field: "EmpID", hidden: true },
            { field: "EmpCode", title: "ID No", editable: false },
            { field: "NameEng", title: "Name", editable: false },
            { field: "DesignationName", title: "Designation", editable: false },
            { field: "View", title: "Details", filterable: false, template: "#=EmployeeSummaryHelper.buttonTemplate(data) #", attributes: { class: "ob-center" } }
            // { field: "View", title: "View", width: 50, filterable: false, template: '<button type="button" class="btn btn-default btn-sm" value="View"  onClick="EmployeeShiftSummaryHelper.clickEventForViewButton()" ><span class="glyphicon glyphicon-edit"></span></button>' }

        ];
        return columns;
    },
    buttonTemplate: function (data) {

        if (pageId === 1) {
            return '<button type="button" class="btn btn-info btn-sm" value="Edit" id="btnEdit" onClick="EmployeeShiftSummaryHelper.clickEventForViewButton()" ><span class="glyphicon glyphicon-eye-open"></span></button>';
        }
        else if (pageId === 2) {
            return '<button type="button" class="btn btn-info btn-sm" value="Edit" id="btnEdit" onClick="EmployeeSeparationHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button>';
        }
        else {
            return '';
        }
    },

    EmployeeGridChangeEvent: function () {
        $("#grdEmployee").on("click", ".check_row", function () {

            var $cb = $(this);
            var gridSummary = $("#grdEmployee").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {
                    gbSelectiveEmpArray.push(selectedItem);
                }
            } else {
                for (var j = 0; j < gbSelectiveEmpArray.length; j++) {
                    if (gbSelectiveEmpArray[j].EmpID === dataItem.EmpID) {
                        gbSelectiveEmpArray.splice(j, 1);
                        break;
                    }
                }

            }
        });//Indivisual row selection

        $('#grdEmployee').on('change', '#checkAll', function (e) {

            gbSelectiveEmpArray = [];
            var gridSummary = $("#grdEmployee").data("kendoGrid");
            var selectAll = document.getElementById("checkAll");
            if (selectAll.checked === true) {
                $("#grdEmployee tbody input:checkbox").prop("checked", this.checked);
                $("#grdEmployee table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbSelectiveEmpArray.push(obj);
                }
            }
            else {
                $("#grdEmployee tbody input:checkbox").removeAttr("checked", this.checked);
                $("#grdEmployee table tr").removeClass('k-state-selected');
                gbSelectiveEmpArray = [];
            }
        });// All Row Selection 
    },
    CheckedMenu: function (data) {

        if (gbSelectiveEmpArray.length > 0) {

            var result = gbSelectiveEmpArray.filter(function (obj) {
                return obj.EmpID === data.EmpID;
            });
            if (result.length > 0) {
                return '<input id="check_row" class="check_row" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_row" class="check_row" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_row" class="check_row" type="checkbox"/>';
        }
    }
};
