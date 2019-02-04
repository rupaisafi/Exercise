var _ctrl = {
    selected: {}
}
$(".s-tbody").click(function (e) {
    e.preventDefault();
    var td = $(e.target);
    if (td.hasClass("combo")) {
        if (_ctrl.selected.length) {

            var val = _ctrl.selected.find("input[data-role='combobox']").data("kendoComboBox").value();
            _ctrl.selected.removeClass("edit-cell");
            _ctrl.selected.text(val);
        }
        var text = td.text();
        td.html("");
        var input = $("<input/>");
        input.appendTo(td);
        input.kendoComboBox({
            placeholder: "Select product",
            autoBind: false,
            dataTextField: "ID",
            dataValueField: "Name",
            dataSource: [
                { "ID": 1, "Name": "B" }, { "ID": 2, "Name": "C" }, { "ID": 3, "Name": "D" },
                { "ID": 4, "Name": "E" }, { "ID": 5, "Name": "F" }, { "ID": 6, "Name": "G" },
                { "ID": 7, "Name": "H" }, { "ID": 8, "Name": "I" }, { "ID": 9, "Name": "J" },
                { "ID": 10, "Name": "K" }, { "ID": 11, "Name": "L" }, { "ID": 12, "Name": "M" },
                { "ID": 13, "Name": "N" }, { "ID": 14, "Name": "O" }, { "ID": 15, "Name": "P" },
                { "ID": 16, "Name": "Q" }, { "ID": 17, "Name": "R" }, { "ID": 18, "Name": "S" },
                { "ID": 19, "Name": "T" }, { "ID": 20, "Name": "U" }, { "ID": 21, "Name": "V" },
                { "ID": 22, "Name": "W" }, { "ID": 23, "Name": "X" }, { "ID": 24, "Name": "Y" },
                { "ID": 25, "Name": "Z" }]
        });
        var widget = input.data("kendoComboBox");
        widget.value(text);
        widget.wrapper.bind("click", function (e) {
            e.stopPropagation();
        });
        td.addClass("edit-cell");
        td.addClass("active");
        td.parent().addClass("row-state-edit");
        _ctrl.selected = td;
        //console.log(widget);
    } else {
        if (_ctrl.selected.length) {
            var input = _ctrl.selected.find("input");
            if (_ctrl.selected.parent().hasClass("new")) {
                _ctrl.selected.text("");
                _ctrl.selected.removeClass("edit-cell");
                _ctrl.selected.parent().removeClass("row-state-edit");
            } else {
                if (input.val()) {
                    _ctrl.selected.text(input.val());
                    _ctrl.selected.removeClass("edit-cell");
                    _ctrl.selected.parent().removeClass("row-state-edit");
                } else {
                    input.focus();
                    return;
                }
            }
        }

        var input = $("<input value='" + td.text() + "' spellcheck='false'>");
        input.css("background-color", "#ffffff");
        input.bind("click", function (evt) {
            evt.stopPropagation();
        });
        input.bind("blur", function (evt) {
            var el = $(this);
            var val = el.val();
            if (!el.closest("tr").hasClass("new")) {
                if (!val) {
                    el.css("background-color", "#f7a18f");
                } else {
                    el.css("background-color", "transparent");
                }
            }
        });
        input.bind("keypress", function (evt) {
            var el = $(this);

            var td = el.closest("tbody").find("td");
            $(td[td.index(el.parent()) + 1]).click();
            //var td = el.parent().next("td").click();
        });
        td.html(input);
        input.focus();
        input.select();
        td.addClass("edit-cell");
        td.addClass("active");
        td.parent().addClass("row-state-edit");
        _ctrl.selected = td;
    }
})

//angular
//    .module("BeamStock", ["kendo.directives"])
//    .controller("bsCtrl", function ($scope) {
//        var date = new Date();
//        var from = new Date(date.getFullYear(), date.getMonth(), 1);
//        var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//        $scope.view = {
//            summary: true,
//            detail: false
//        };
//        $scope.summary = {};
//        $scope.summary.search = {};
//        $scope.summary.search.formDateOptions = {
//            change: function () {
//                $scope.summary.grid.setDataSource($scope.summary.search.from, $scope.summary.search.to);
//            }
//        };
//        $scope.summary.search.toDateOptions = {
//            change: function () {
//                $scope.summary.grid.setDataSource($scope.summary.search.from, $scope.summary.search.to);
//            }
//        };
//        $scope.summary.search.from = kendo.toString(from, "dd-MMM-yyyy");
//        $scope.summary.search.to = kendo.toString(to, "dd-MMM-yyyy");
//        $scope.summary.addNew = function () {
//            $scope.detail.dataEntry.master.model.SDate = kendo.toString(new Date(), "dd-MMM-yyyy");
//            $scope.detail.dataEntry.master.model.DName = '';
//            $scope.detail.dataEntry.master.model.UName = '';
//            $scope.detail.dataEntry.master.model.Remarks = '';
//            $scope.view.detail = true;
//            $scope.view.summary = false;
//        };
//        $scope.detail = {};
//        $scope.detail.save = function () {
//            $scope.view.detail = true;
//            $scope.view.summary = false;
//        };
//        $scope.detail.clear = function () {
//            $scope.view.detail = true;
//            $scope.view.summary = false;
//        };
//        $scope.detail.exit = function () {
//            $scope.view.detail = false;
//            $scope.view.summary = true;
//        };
//        $scope.detail.dataEntry = {};
//        $scope.detail.dataEntry.master = {};
//        $scope.detail.dataEntry.master.deptComboOptions = {
//            suggest: true,
//            placeholder: "---Select---",
//            dataTextField: "Name",
//            dataValueField: "Id",
//            dataSource: {
//                data: [
//                    { Id: 1, Name: "Warping" },
//                    { Id: 2, Name: "Dyeing" },
//                    { Id: 3, Name: "Weaving" }
//                ]
//            },
//        };
//        $scope.detail.dataEntry.master.unitComboOptions = {
//            suggest: true,
//            placeholder: "---Select---",
//            dataTextField: "Name",
//            dataValueField: "Id",
//            dataSource: {
//                data: [
//                    { Id: 1, Name: "Denim-1" },
//                    { Id: 2, Name: "Denim-2" },
//                    { Id: 3, Name: "Denim-3" },
//                    { Id: 4, Name: "OutSource" },
//                ]
//            },
//        };
//        $scope.detail.dataEntry.master.model = {
//            Date: "",
//            Department: "",
//            Unit: "",
//            Remarks: ""
//        };
//        $scope.detail.dataEntry.detail = {};
//        //summary grid
//        $scope.summary.grid = {};
//        $scope.summary.kendoGrid = {};
//        $scope.summary.grid.columns = function () {
//            return [
//                { field: "", title: "", filterable: false, width: "30px", template: '<div class="btn-edit-summary"><span class="glyphicon glyphicon-edit"></span></div>', sortable: false, selectable: true },
//                { field: "SID", title: "ID", width: "50px" },
//                { field: "SDate", title: "Date", template: "#:kendo.toString(SDate,'dd-MMM-yyyy')#", width: "120px" },
//                { field: "DCode", title: "DeptCode", width: "80px" },
//                { field: "DName", title: "DeptName", width: "120px" },
//                { field: "UCode", title: "UnitCode", width: "80px" },
//                { field: "UName", title: "UnitName", width: "120px" },
//                { field: "Remarks", title: "Remarks" },
//                { field: "TrackDate", title: "TrackDate", template: "#:kendo.toString(TrackDate,'dd-MMM-yyyy')#", width: "120px" },
//            ];
//        };
//        $scope.summary.grid.dataSource = function (from, to) {
//            var fromDate = kendo.toString(from, "yyyy-MM-dd");
//            var toDate = kendo.toString(to, "yyyy-MM-dd");
//            return new kendo.data.DataSource({
//                type: "json",
//                serverPaging: true,
//                serverSorting: true,
//                serverFiltering: true,
//                allowUnsort: true,
//                pageSize: 10,
//                transport: {
//                    read: {
//                        type: "POST",
//                        dataType: "json",
//                        url: "../StickyEnd/GetSummary?from=" + fromDate + "&to=" + toDate,
//                        dataType: "json",
//                        contentType: "application/json; charset=utf-8"
//                    },
//                    parameterMap: function (options) {
//                        return JSON.stringify(options);
//                    }
//                },
//                schema: {
//                    data: "Items",
//                    total: "TotalCount",
//                    model: {
//                        fields: {
//                            SDate: {
//                                type: "date",
//                                template: '#= kendo.toString("dd-MMM-yyyy") #',
//                                editable: false
//                            },
//                            TrackDate: {
//                                type: "date",
//                                template: '#= kendo.toString("dd-MMM-yyyy") #',
//                                editable: false
//                            }
//                        }
//                    }
//                }
//            });
//        };
//        $scope.summary.grid.setDataSource = function (from, to) {
//            $("#divSummaryGrid").data("kendoGrid").setDataSource($scope.summary.grid.dataSource(from, to));
//        };
//        $scope.summary.grid.options = {
//            pageable: {
//                refresh: true,
//                serverPaging: true,
//                serverFiltering: true,
//                serverSorting: true,
//            },
//            resizable: true,
//            filterable: false,
//            sortable: true,
//            editable: false,
//            navigatable: true,
//            selectable: "row",
//            dataBound: function () {
//                var grid = this;
//                grid.tbody.find(".btn-edit-summary").bind("click", function (e) {
//                    var dataItem = grid.dataItem($(e.target).closest("tr"));
//                    $scope.$apply(function () {
//                        $scope.detail.dataEntry.master.model.SDate = dataItem.SDate;
//                        $scope.detail.dataEntry.master.model.DName = dataItem.DName;
//                        $scope.detail.dataEntry.master.model.UName = dataItem.UName;
//                        $scope.detail.dataEntry.master.model.Remarks = dataItem.Remarks;
//                        $scope.view.detail = true;
//                        $scope.view.summary = false;
//                    })
//                });
//            },
//            columns: $scope.summary.grid.columns(),
//            dataSource: $scope.summary.grid.dataSource($scope.summary.search.from, $scope.summary.search.to),
//        };
//        $scope.detail.grid = {};
//        $scope.detail.kendoGrid = {};
//    })





































//function DataGrid() {

//};
//jQuery.fn.extend({
//    DataGrid: function (option) {
//        var _grid = this;
//        _grid.option = option;
//        _grid.table = $("<table class='s-table'>");
//        _grid.thead = $("<thead class='s-head'>");
//        _grid.tbody = $("<tbody class='s-body'>");
//        _grid.tfoot = $("<tfoot class='s-foot'>");

//        function grid() {

//        };
//        grid.init = function () {
//            grid.head(_grid.thead, _grid.option.columns);
//            grid.body(_grid.tbody, _grid.option.columns, option.dataSource.data);
//            _grid
//                .table
//                    .append(_grid.thead)
//                    .append(_grid.tbody)
//                    .append(_grid.tfoot);
//            _grid.append(_grid.table);
//        };
//        grid.head = function (thead, columns) {
//            var tr = $("<tr>");
//            for (var i = 0; i < columns.length; i++) {
//                var th = $("<th>");
//                th.text(columns[i].title);
//                tr.append(th);
//            }
//            thead.append(tr);
//            return thead;
//        };
//        grid.body = function (tbody, columns, data) {
//            for (var i = 0; i < data.length; i++) {
//                var tr = $("<tr>");
//                for (var j = 0; j < columns.length; j++) {
//                    var td = $("<td>");
//                    columns[j].width && td.width(columns[j].width);
//                    td.text(data[i][columns[j].field]);
//                    tr.append(td);
//                }
//                tr.bind("click", option.edit);
//                tbody.append(tr);
//            }
//            return tbody;
//        };
//        grid.init();
//        return _grid;
//    }
//});
//var grid = $(".data-grid").DataGrid({
//    columns: [
//            { field: "", title: "", editable: false, hidden: false, width: "24px" },
//            { field: "ID", title: "ID", editable: false, hidden: true },
//            { field: "MID", title: "MID", editable: true, hidden: false },
//            { field: "Name1", title: "Name1", editable: true, hidden: false },
//            { field: "Name2", title: "Name2", editable: true, hidden: false },
//            { field: "Name3", title: "Name3", editable: true, hidden: false },
//            { field: "Name4", title: "Name4", editable: true, hidden: false },
//            { field: "Name5", title: "Name5", editable: true, hidden: false },
//    ],
//    dataSource: {
//        data: [
//            { ID: 1, MID: 1, Name1: "Name1", Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//            { ID: 2, MID: 1, Name1: "Name2", Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//            { ID: 3, MID: 1, Name1: "Name3", Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//            { ID: 4, MID: 1, Name1: "Name4", Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//            { ID: 5, MID: 1, Name1: "Name5", Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//        ]
//    },
//    edit: function () {
//        $(this).addClass("row-edit");
//    }
//});


//var option = {
//    columns: function () {
//        return [
//            { field: "", title: "", editable: false, hidden: false, width: "24px" },
//            { field: "ID", title: "ID", editable: false, hidden: true },
//            { field: "MID", title: "MID", editable: true, hidden: false },
//            {
//                field: "Name1",
//                title: "Name1",
//                editable: true,
//                hidden: false,
//                template: "#:Name1.Name#",
//                editor: function (container, options) {
//                    $("<input>")
//                    .appendTo(container)
//                    .kendoComboBox({
//                        placeholder: "Select product",
//                        autoBind: false,
//                        dataTextField: "ID",
//                        dataValueField: "Name",
//                        dataSource: [{ "ID": 1, "Name": "B" }, { "ID": 2, "Name": "C" }, { "ID": 3, "Name": "D" }, { "ID": 4, "Name": "E" }, { "ID": 5, "Name": "F" }, { "ID": 6, "Name": "G" }, { "ID": 7, "Name": "H" }, { "ID": 8, "Name": "I" }, { "ID": 9, "Name": "J" }, { "ID": 10, "Name": "K" }, { "ID": 11, "Name": "L" }, { "ID": 12, "Name": "M" }, { "ID": 13, "Name": "N" }, { "ID": 14, "Name": "O" }, { "ID": 15, "Name": "P" }, { "ID": 16, "Name": "Q" }, { "ID": 17, "Name": "R" }, { "ID": 18, "Name": "S" }, { "ID": 19, "Name": "T" }, { "ID": 20, "Name": "U" }, { "ID": 21, "Name": "V" }, { "ID": 22, "Name": "W" }, { "ID": 23, "Name": "X" }, { "ID": 24, "Name": "Y" }, { "ID": 25, "Name": "Z" }]
//                    });
//                }
//            },
//            { field: "Name2", title: "Name2", editable: true, hidden: false },
//            { field: "Name3", title: "Name3", editable: true, hidden: false },
//            { field: "Name4", title: "Name4", editable: true, hidden: false },
//            { field: "Name5", title: "Name5", editable: true, hidden: false },
//        ]
//    },
//    dataSource: function () {
//        return new kendo.data.DataSource({
//            data: [
//                { ID: 1, MID: 1, Name1: { ID: 1, Name: "Name1" }, Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//                { ID: 2, MID: 1, Name1: { ID: 2, Name: "Name2" }, Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//                { ID: 3, MID: 1, Name1: { ID: 3, Name: "Name3" }, Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//                { ID: 4, MID: 1, Name1: { ID: 4, Name: "Name4" }, Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//                { ID: 5, MID: 1, Name1: { ID: 5, Name: "Name5" }, Name2: "Name2", Name3: "Name3", Name4: "Name4", Name5: "Name5" },
//            ]
//        });
//    }
//};
//var grid = $(".data-grid").kendoGrid({
//    resizable: true,
//    editable: true,
//    columns: option.columns(),
//    dataSource: option.dataSource(),
//});
/*
var ui = {
    source: {
        getDetail: function (masterID) {
            return [
                { ID: 1, Loom: "A-1", SetNo: 1000, SSNo: 1, BeamNo: 257, Remark: "Ok" },
                { ID: 2, Loom: "A-2", SetNo: 1001, SSNo: 2, BeamNo: 258, Remark: "Ok" },
                { ID: 3, Loom: "A-3", SetNo: 1002, SSNo: 3, BeamNo: 259, Remark: "Ok" },
                { ID: 4, Loom: "A-4", SetNo: 1003, SSNo: 4, BeamNo: 260, Remark: "Ok" },
                { ID: 5, Loom: "A-5", SetNo: 1004, SSNo: 5, BeamNo: 261, Remark: "Ok" },
                { ID: 6, Loom: "A-5", SetNo: 1004, SSNo: 5, BeamNo: 261, Remark: "Ok" },
                { ID: 7, Loom: "A-5", SetNo: 1004, SSNo: 5, BeamNo: 261, Remark: "Ok" },
                { ID: 8, Loom: "A-5", SetNo: 1004, SSNo: 5, BeamNo: 261, Remark: "Ok" },
                { ID: 9, Loom: "A-5", SetNo: 1004, SSNo: 5, BeamNo: 261, Remark: "Ok" },
                { ID: 10, Loom: "A-5", SetNo: 1004, SSNo: 5, BeamNo: 261, Remark: "Ok" },
            ];
        }
    },
    master: {
        init: function () {

        }
    },
    detail: {
        grid: {
            table: $(".tblDetail"),
            init: function () {
                var data = ui.source.getDetail(1);
                for (var i = 0; i < data.length; i++) {
                    $("<tr>")
                        .append(function () {
                            var container = $("<td>");
                            var elm = $("<input>");
                            elm.appendTo(container);
                            elm.kendoComboBox({
                                placeholder: "Select product",
                                autoBind: false,
                                dataTextField: "ID",
                                dataValueField: "Name",
                                dataSource: [{ "ID": 0, "Name": "A" }, { "ID": 1, "Name": "B" }, { "ID": 2, "Name": "C" }, { "ID": 3, "Name": "D" }, { "ID": 4, "Name": "E" }, { "ID": 5, "Name": "F" }, { "ID": 6, "Name": "G" }, { "ID": 7, "Name": "H" }, { "ID": 8, "Name": "I" }, { "ID": 9, "Name": "J" }, { "ID": 10, "Name": "K" }, { "ID": 11, "Name": "L" }, { "ID": 12, "Name": "M" }, { "ID": 13, "Name": "N" }, { "ID": 14, "Name": "O" }, { "ID": 15, "Name": "P" }, { "ID": 16, "Name": "Q" }, { "ID": 17, "Name": "R" }, { "ID": 18, "Name": "S" }, { "ID": 19, "Name": "T" }, { "ID": 20, "Name": "U" }, { "ID": 21, "Name": "V" }, { "ID": 22, "Name": "W" }, { "ID": 23, "Name": "X" }, { "ID": 24, "Name": "Y" }, { "ID": 25, "Name": "Z" }]
                            });
                            var wgt = elm.data("kendoComboBox");
                            wgt.input.bind("focus", function () {
                                wgt.open();
                            });
                            return container;
                        })
                        .append(function () {
                            return $("<td>")
                            .append("<input value=" + data[i].SetNo + ">");
                        })
                        .append(function () {
                            return $("<td>")
                            .append("<input value=" + data[i].SSNo + ">");
                        })
                        .append(function () {
                            return $("<td>")
                            .append("<input value=" + data[i].BeamNo + ">");
                        })
                        .append(function () {
                            return $("<td>")
                            .append("<input value=" + data[i].Remark + ">");
                        })
                        .appendTo(ui.detail.grid.table.find("tbody"));
                }
            }
        },
        init: function () {

            ui.detail.grid.init();
        }
    },
    init: function () {
        ui.master.init();
        ui.detail.init();
    }
}
ui.init();


*/