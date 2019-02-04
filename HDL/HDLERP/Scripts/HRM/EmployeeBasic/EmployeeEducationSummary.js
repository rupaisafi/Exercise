var EmployeeEduvationInfoSummaryManager = {
    GetAllDegree: function () {
        var objDegree = "";
        var jsonParam = "";
        var serviceUrl = "../Education/GetAllDegree/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDegree = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objDegree;
    },
    GetAllBoard: function () {
        var objBoard = "";
        var jsonParam = "";
        var serviceUrl = "../Education/GetAllBoard/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objBoard = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objBoard;
    },
    gridDataSource: function (empId) {
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            allowUnsort: false,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Education/GetEmpEducation/?EmpID=' + empId,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                 
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "Items", total: "TotalCount",
                model: {
                    fields: {
                        degree:{
                            defaultValue: { DegreeID: 0, DegreeName: "---Select---" }
                    },
                        board: {
                            editable: true,
                            defaultValue: { BoardID: 0, BoardName: "---Select---" }
                        }
                    }
                }
            }
        });
        return gridDataSource;
    }
};
var EmployeeEduvationInfoSummaryHelper = {
    InitEmployeeEduvationInfoSummary: function() {
        EmployeeEduvationInfoSummaryHelper.GenerateEducationGrid();
    },
    GenerateEducationGrid: function () {
        $("#grdEducation").kendoGrid({
            dataSource: EmployeeEduvationInfoSummaryManager.gridDataSource(),
            pageable: false,
            editable: {
                createAt: "bottom",
                mode: "incell"
            },
            //toolbar: ["create"],
            toolbar: [{ name: "create", text: "Add New" }],

            columns: [
                { field: "ID", hidden:true},
                { field: "board", title: "Board / University", width: "30px",editable:false, editor: EmployeeEduvationInfoSummaryHelper.BoardDropDownEditor, template: "#=board.BoardName#" },
                { field: "degree", title: "Degree", width: "30px", editor: EmployeeEduvationInfoSummaryHelper.EducationDropDownEditor, template: "#=degree.DegreeName#"  },// 
                { field: "PassingYear", title: "Passing Year", width: "20px" },
                { field: "Institute", title: "Institute", width: "50px" },
               
                { field: "Result", title: "Result", width: "15px" },
                { field: "OutOf", title: "Out Of", width: "15px" },
                { command: ["destroy"], title: "&nbsp;", width: "15px" }
            ],
           

        });
    },
    EducationDropDownEditor: function (container, options) {
        $('<input id="cmbDegree"  data-text-field="DegreeName" data-value-field="DegreeID" data-bind="value:' + options.field +'"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                optionLabel: '--Select--',
                dataSource: EmployeeEduvationInfoSummaryManager.GetAllDegree(),
                placeholder: "Please Select Degree",
               
            });
    },
    BoardDropDownEditor: function (container, options) {
        $('<input id="cmbBoard"  data-text-field="BoardName" data-value-field="BoardID" data-bind="value:' +
                options.field +
                '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                optionLabel: '--Select--',
                dataSource: EmployeeEduvationInfoSummaryManager.GetAllBoard(),
               placeholder: "Please Select Board"
               
            });
    }
};





