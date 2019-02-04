/// <reference path="../employeesearch/employeesummary.js" />
/// <reference path="../../common/common.js" />
var gbSelectiveWeekOffArray = [];
var EmployeeWeekOffManager = {
    saveEmployeeWeekOff: function () {
        var empObj = gbSelectiveEmpArray;
        var weekOffObj = gbSelectiveWeekOffArray;
        var startDateObj = $("#txtStartDateW").data("kendoDatePicker").value();
        var objEmployee = JSON.stringify(empObj);
        var objStatrDate = JSON.stringify(startDateObj);
        var objWeekOff = JSON.stringify(weekOffObj);
        var jsonParam = 'objEmployee:' + objEmployee + ',objStartDate:' + objStatrDate + ',objWeekOff:' + objWeekOff;
        var serviceUrl = "../EmployeeWeekOff/Save/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            if (jsonData === "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Save Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error1', jsonData,
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
    }
};

var EmployeeWeekOffHelper = {
    InitEmployeeWeekOff: function () {
        EmployeeWeekOffHelper.GenerateEmployeeWeekOffGrid();
        EmployeeWeekOffHelper.WeekOffGridChangeEvent();
        $("#txtStartDateW").kendoDatePicker(
            {
                format: "dd-MMMM-yyyy",
                value: new Date()
            });

        $("#btnWSave").click(function () {
            EmployeeWeekOffManager.saveEmployeeWeekOff();
        });
    },
    GenerateEmployeeWeekOffGrid: function () {
        $("#grdWeekOff").kendoGrid({
            dataSource: [
                { DayID: 1, DayName: 'SUNDAY' },
                { DayID: 2, DayName: 'MONDAY' },
                { DayID: 3, DayName: 'TUESDAY' },
                { DayID: 4, DayName: 'WEDNESDAY' },
                { DayID: 5, DayName: 'THURSDAY' },
                { DayID: 6, DayName: 'FRIDAY' },
                { DayID: 7, DayName: 'SATURDAY' }
            ],
            filterable: false,
            sortable: true,
            columns: EmployeeWeekOffHelper.GenerateEmployeeWeekOffColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

        });
    },
    GenerateEmployeeWeekOffColumns: function () {
        var columns = [
            { field: "check_row", title: "Check", width: 30, filterable: false, sortable: false, template: "<input type='checkbox'  class='check_row' id='checkall'/>" },
            { field: "DayID", hidden: true },
            { field: "DayName", title: "Day", width: 70, editable: false }
        ];
        return columns;
    },
    WeekOffGridChangeEvent: function () {
        $("#grdWeekOff").on("click", ".check_row", function () {
            debugger;
            var $cb = $(this);
            var gridSummary = $("#grdWeekOff").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            var dataItem = gridSummary.dataItem($(this).closest('tr'));
            if ($cb.is(":checked")) {
                if (selectedItem != null) {
                    gbSelectiveWeekOffArray.push(selectedItem);
                }
            } else {
                for (var j = 0; j < gbSelectiveWeekOffArray.length; j++) {
                    if (gbSelectiveWeekOffArray[j].DayID === dataItem.DayID) {
                        gbSelectiveWeekOffArray.splice(j, 1);
                        break;
                    }
                }

            }
        });//Indivisual row selection
    }
};