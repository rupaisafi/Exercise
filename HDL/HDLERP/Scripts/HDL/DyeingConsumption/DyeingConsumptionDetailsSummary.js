var DyeingConsumptionDetailsSummaryManager = {
    getConsumptionDetailDataSource: function (setNo) {
        return new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../DyeingConsumption/GetDyeingConsumptionDetailsSummary/?setNo=' + setNo,
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
                        ConsumptionDate: {
                            type: "date",
                            template: '#= kendo.toString("dd-MMM-yyyy") #',
                            editable: false
                        }
                    }
                }

            }
        })
    }
}
var DyeingConsumptionDetailsSummaryHelper = {
    setConsumptionChanged: function () {
        var rate = $("#dcdpRate").data("kendoNumericTextBox").value();
        var dyeingQuantity = $("#dcdpDyeingQuantiy").data("kendoNumericTextBox").value();
        var sizingQuantity = $("#dcdpSizingQuantiy").data("kendoNumericTextBox").value();
        var dyeingValue = parseFloat(rate) * parseFloat(dyeingQuantity);
        var sizingValue = parseFloat(rate) * parseFloat(sizingQuantity);
        $("#dcdpDyeingValue").data("kendoNumericTextBox").value(dyeingValue);
        $("#dcdpSizingValue").data("kendoNumericTextBox").value(sizingValue);
        var totalQuantity = parseFloat(dyeingQuantity) + parseFloat(sizingQuantity);
        $("#dcdpTotalQuantiy").data("kendoNumericTextBox").value(totalQuantity);
        var totalValue = parseFloat(dyeingValue) + parseFloat(sizingValue);
        $("#dcdpTotalValue").data("kendoNumericTextBox").value(totalValue);
    },
    getConsumptionDetailGridColumns: function () {
        return [
            { field: "ConsumptionDate", title: "Date", template: "#=kendo.toString(ConsumptionDate,'dd-MMM-yyyy')#" },
            { field: "ChemicalName", title: "ChemicalName" },
            { field: "FactoryLot", title: "FactoryLot" },
            { field: "Unit", title: "Unit" },
            { field: "Rate", title: "Rate" },
            { field: "DyeingQuantity", title: "DyeingQuantity" },
            { field: "SizingQuantity", title: "SizingQuantity" },
            { field: "DyeingValue", title: "DyeingValue" },
            { field: "SizingValue", title: "SizingValue" },
            { field: "Quantity", title: "TotalQuantity" },
            { field: "TotalValue", title: "TotalValue" },
            {
                field: "Edit", title: "Edit/View", filterable: false, width: "95px",
                template: '<button type="button" class="btn btn-default btn-sm" value="Edit" id="btnEdit" onClick="DyeingConsumptionDetailsSummaryHelper.clickEventForEditButton()" ><span class="glyphicon glyphicon-edit"></span></button><button type="button" class="btn btn-default btn-sm" value="Remove" id="btnRemove" onClick="DyeingConsumptionDetailsSummaryHelper.clickEventForRemoveButton()" style="margin-left:6px;"><span class="glyphicon glyphicon-remove"></span></button>', sortable: false
            },
        ]
    },
    getConsumptionDetailData: function () {
        var data = {};
        data.ID = $("#dcdpID").val();
        data.SetNo = $("#dcdSetNo").val();
        data.ConsumptionDate = $("#dcdpConsumptionDate").data("kendoDatePicker").value();
        data.ChemicalName = $("#dcdpChemicalName").data("kendoComboBox").value();
        data.ChemicalCode = $("#dcdpChemicalCode").val();
        data.Unit = $("#dcdpUnit").data("kendoComboBox").value();
        data.Rate = $("#dcdpRate").data("kendoNumericTextBox").value();
        data.DyeingQuantity = $("#dcdpDyeingQuantiy").data("kendoNumericTextBox").value();
        data.SizingQuantity = $("#dcdpSizingQuantiy").data("kendoNumericTextBox").value();
        data.DyeingValue = $("#dcdpDyeingValue").data("kendoNumericTextBox").value();
        data.SizingValue = $("#dcdpSizingValue").data("kendoNumericTextBox").value();
        data.Quantity = $("#dcdpTotalQuantiy").data("kendoNumericTextBox").value();
        data.TotalValue = $("#dcdpTotalValue").data("kendoNumericTextBox").value();
        data.FactoryLot = $("#dcdpFactoryLot").val();
        return data;
    },
    setConsumptionDetailForm: function (row) {
        $("#dcdpID").val(row.ID);
        $("#dcdpSetNo").val(row.SetNo);
        $("#dcdpConsumptionDate").data("kendoDatePicker").value(row.ConsumptionDate);
        $("#dcdpChemicalName").data("kendoComboBox").value(row.ChemicalName);
        $("#dcdpChemicalCode").val(row.ChemicalCode);
        $("#dcdpUnit").data("kendoComboBox").value(row.Unit);
        $("#dcdpRate").data("kendoNumericTextBox").value(row.Rate);
        $("#dcdpDyeingQuantiy").data("kendoNumericTextBox").value(row.DyeingQuantity);
        $("#dcdpSizingQuantiy").data("kendoNumericTextBox").value(row.SizingQuantity);
        $("#dcdpDyeingValue").data("kendoNumericTextBox").value(row.DyeingValue);
        $("#dcdpSizingValue").data("kendoNumericTextBox").value(row.SizingValue);
        $("#dcdpTotalQuantiy").data("kendoNumericTextBox").value(row.Quantity);
        $("#dcdpTotalValue").data("kendoNumericTextBox").value(row.TotalValue);
        $("#dcdpFactoryLot").val(row.FactoryLot);
    },
    clearConsumptionDetailForm: function () {
        $("#dcdpID").val("");
        $("#dcdpSetNo").val("");
        $("#dcdpConsumptionDate").data("kendoDatePicker").value("");
        $("#dcdpChemicalName").data("kendoComboBox").value("");
        $("#dcdpChemicalCode").val("");
        $("#dcdpUnit").data("kendoComboBox").value("");
        $("#dcdpRate").data("kendoNumericTextBox").value("");
        $("#dcdpDyeingQuantiy").data("kendoNumericTextBox").value("");
        $("#dcdpSizingQuantiy").data("kendoNumericTextBox").value("");
        $("#dcdpDyeingValue").data("kendoNumericTextBox").value("");
        $("#dcdpSizingValue").data("kendoNumericTextBox").value("");
        $("#dcdpTotalQuantiy").data("kendoNumericTextBox").value("");
        $("#dcdpTotalValue").data("kendoNumericTextBox").value("");
        $("#dcdpFactoryLot").val("");
    },
    clickEventForEditButton: function () {
        console.log(selectedItem)
        var grid = $("#dcdpGrid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem) {
            console.log(selectedItem)
            DyeingConsumptionDetailsSummaryHelper.setConsumptionDetailForm(selectedItem);
        }
    },
    clickEventForRemoveButton: function () {
        var grid = $("#dcdpGrid").data("kendoGrid");
        var model = grid.dataItem(grid.select());
        var gridData = grid.dataSource.data();
        for (var i = 0; i < gridData.length; i++) {
            var exits =
                gridData[i].ID == model.ID &&
                gridData[i].SetNo == model.SetNo &&
                gridData[i].ConsumptionDate == model.ConsumptionDate &&
                gridData[i].ChemicalName == model.ChemicalName &&
                gridData[i].ChemicalCode == model.ChemicalCode &&
                gridData[i].Unit == model.Unit &&
                gridData[i].Rate == model.Rate &&
                gridData[i].DyeingQuantity == model.DyeingQuantity &&
                gridData[i].SizingQuantity == model.SizingQuantity &&
                gridData[i].DyeingValue == model.DyeingValue &&
                gridData[i].SizingValue == model.SizingValue &&
                gridData[i].Quantity == model.Quantity &&
                gridData[i].TotalValue == model.TotalValue &&
                gridData[i].FactoryLot == model.FactoryLot;
            if (exits) {
                gridData.splice(i, 1);
                grid.setDataSource(new kendo.data.DataSource({
                    pageSize: 10,
                    data: gridData
                }));
            }
        }
    },
    getConsumptionDetailDataSource: function () {
        var setNo = $("#dcdSetNo").val();
        return DyeingConsumptionDetailsSummaryManager.getConsumptionDetailDataSource(setNo);

    },
    Init: function () {

        HdlCommonHelper.GenerateDatePicker("dcdpConsumptionDate");
        HdlCommonHelper.GenerateINameDyeCombo("dcdpChemicalName");
        HdlCommonHelper.GenerateNumericTextBox("dcdpRate");
        HdlCommonHelper.GenerateNumericTextBox("dcdpDyeingQuantiy");
        HdlCommonHelper.GenerateNumericTextBox("dcdpSizingQuantiy");
        HdlCommonHelper.GenerateNumericTextBox("dcdpDyeingValue");
        HdlCommonHelper.GenerateNumericTextBox("dcdpSizingValue");
        HdlCommonHelper.GenerateNumericTextBox("dcdpTotalQuantiy");
        HdlCommonHelper.GenerateNumericTextBox("dcdpTotalValue");

        $("#dcdpUnit").kendoComboBox({
            dataSource: [
                { Name: "Kg", Value: "Kg" },
                { Name: "Yd", Value: "Yd" },
                { Name: "Liter", Value: "Liter" },
                { Name: "Meter", Value: "Meter" },

            ],
            width: "100%",
            dataTextField: "Name",
            dataValueField: "Value",
            optionLabel: {
                Name: "Select ...",
                Value: ""
            }
        });
        $("#dcdpChemicalName").data("kendoComboBox").bind("change", function () {
            var value = this.value();
            if (value > 0) {
                $("#dcdpChemicalCode").val(value);
            } else {
                $("#dcdpChemicalCode").val("");
            }
            
        });
        $("#dcdpRate").data("kendoNumericTextBox").bind("spin", function () {
            DyeingConsumptionDetailsSummaryHelper.setConsumptionChanged();
        });
        $("#dcdpRate").data("kendoNumericTextBox").bind("change", function () {
            DyeingConsumptionDetailsSummaryHelper.setConsumptionChanged();
        });
        $("#dcdpDyeingQuantiy").data("kendoNumericTextBox").bind("spin", function () {
            DyeingConsumptionDetailsSummaryHelper.setConsumptionChanged();
        });
        $("#dcdpDyeingQuantiy").data("kendoNumericTextBox").bind("change", function () {
            DyeingConsumptionDetailsSummaryHelper.setConsumptionChanged();
        });
        $("#dcdpSizingQuantiy").data("kendoNumericTextBox").bind("spin", function () {
            DyeingConsumptionDetailsSummaryHelper.setConsumptionChanged();
        });
        $("#dcdpSizingQuantiy").data("kendoNumericTextBox").bind("change", function () {
            DyeingConsumptionDetailsSummaryHelper.setConsumptionChanged();
        });

        $("#dcdpGrid").kendoGrid({
            pageSize: 10,
            selectable: "row",
            dataSource: DyeingConsumptionDetailsSummaryHelper.getConsumptionDetailDataSource(),
            columns: DyeingConsumptionDetailsSummaryHelper.getConsumptionDetailGridColumns(),
        });

        $("#dcdpSave").click(function () {
            var validator = $("#divDyeingConsumptionDetailsPopup").kendoValidator().data("kendoValidator");
            if (validator.validate()) {
                var model = DyeingConsumptionDetailsSummaryHelper.getConsumptionDetailData();
                var grid = $("#dcdpGrid").data("kendoGrid");
                var gridData = grid.dataSource.data();

                for (var i = 0; i < gridData.length; i++) {
                    var exits =
                        gridData[i].ID == model.ID &&
                        gridData[i].SetNo == model.SetNo &&
                        gridData[i].ConsumptionDate == model.ConsumptionDate &&
                        gridData[i].ChemicalName == model.ChemicalName &&
                        gridData[i].ChemicalCode == model.ChemicalCode &&
                        gridData[i].Unit == model.Unit &&
                        gridData[i].Rate == model.Rate &&
                        gridData[i].DyeingQuantity == model.DyeingQuantity &&
                        gridData[i].SizingQuantity == model.SizingQuantity &&
                        gridData[i].DyeingValue == model.DyeingValue &&
                        gridData[i].SizingValue == model.SizingValue &&
                        gridData[i].Quantity == model.Quantity &&
                        gridData[i].TotalValue == model.TotalValue &&
                        gridData[i].FactoryLot == model.FactoryLot;

                    if (exits) {
                        alert("Item already exist!.");
                        return;
                    }
                }

                gridData.push(model);
                grid.setDataSource(new kendo.data.DataSource({
                    pageSize: 10,
                    data: gridData
                }));
                DyeingConsumptionDetailsSummaryHelper.clearConsumptionDetailForm();
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Please Input Required all Fields!',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                                return;
                            }
                        }
                    ]);
            }

        });
        $("#dcdpClear").click(function () {
            DyeingConsumptionDetailsSummaryHelper.clearConsumptionDetailForm();
        });
        DyeingConsumptionDetailsSummaryHelper.clearConsumptionDetailForm();
    },

}
