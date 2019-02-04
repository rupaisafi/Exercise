var gbMConDetailsGridData = [];

var MConDetailsPopupManager = {
    
};

var MConDetailsPopupHelper = {
    InitMConDetailsPopup: function () {
        
        $("#btnClearDetails").click(function () {
            MConDetailsPopupHelper.ClearPopupWindoForm();
        });
        $("#btnAddMConDetails").click(function () {
            $("#btnAddToList").show();
            $("#btnUpdateDetails").hide();

            $("#cmbItem").data("kendoComboBox").enable(true);

            MConDetailsPopupHelper.ClearPopupWindoForm();

            $("#divMConDetailsPopup").data("kendoWindow").open().center();
        });
        $("#btnCloseDetails").click(function () {
            $("#divMConDetailsPopup").data("kendoWindow").close();
        });
        $("#btnAddToList").click(function () {
            MConDetailsPopupHelper.AddDetailsItemIntoList();
        });
        $("#btnUpdateDetails").click(function () {
            MConDetailsPopupHelper.UpdateMConDetailsGrid();
        });

    },
    CalculateAmount: function () {
        //var rate = $("#txtOrderRate").data("kendoNumericTextBox").value();
        //var qnty = $("#txtOrderQty").data("kendoNumericTextBox").value();
        //var amt = rate * qnty;
        //$("#txtOrderAmt").data("kendoNumericTextBox").value(amt);
    },
    ClearPopupWindoForm: function () {
        $("#cmbItem").data("kendoComboBox").value("");
        $("#txtUnit").val("");
        $("#txtQnty").data("kendoNumericTextBox").value("");
        $("#cmbDepartment").data("kendoComboBox").value("");

        $("#lblMessage").text("");
    },

    AddDetailsItemIntoList: function () {
        var itemcombo = $("#cmbItem").data("kendoComboBox");
        var departmentCombo = $("#cmbDepartment").data("kendoComboBox");
        var qnty = $("#txtQnty").data("kendoNumericTextBox").value();

        var detailsGrid = $("#grdMConDetailsSummary").data("kendoGrid");

        if (itemcombo.value() !== "0" && qnty > 0) {
         
            var dtl = new Object();
            dtl.ItemCode = itemcombo.value();
            dtl.ItemName = itemcombo.text();
            dtl.Unit = $("#txtUnit").val();
            dtl.Qnty = $("#txtQnty").data("kendoNumericTextBox").value();
            dtl.DepartmentCode = departmentCombo.value();
            dtl.DepartmentName = departmentCombo.text();

            gbMConDetailsGridData.push(dtl);
            var gridDataSource = new kendo.data.DataSource({ data: gbMConDetailsGridData });

            detailsGrid.setDataSource(gridDataSource);

            $("#lblMessage").text("Item Added Successfully!");

        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Required Item & Qnty!',
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

    },
    FillMConDetailsInformation: function (obj) {

        MConDetailsPopupHelper.ClearPopupWindoForm();

        $("#cmbItem").data("kendoComboBox").value(obj.ItemCode);
        
        $("#txtUnit").val(obj.Unit);
        $("#txtQnty").data("kendoNumericTextBox").value(obj.Qnty);
        $("#cmbDepartment").data("kendoComboBox").value(obj.DepartmentCode);
    },
    UpdateMConDetailsGrid: function () {
        var grid = $("#grdMConDetailsSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbMConDetailsGridData.length; i++) {
            if (gbMConDetailsGridData[i].ItemCode == selectedItem.ItemCode) {
                gbMConDetailsGridData.splice(i, 1);
                break;
            }
        }
       
        var itemcombo = $("#cmbItem").data("kendoComboBox");
        var departmentCombo = $("#cmbDepartment").data("kendoComboBox");

        var dtl = new Object();
        dtl.ItemCode = itemcombo.value();
        dtl.ItemName = itemcombo.text();
        dtl.Unit = $("#txtUnit").val();
        dtl.Qnty = $("#txtQnty").data("kendoNumericTextBox").value();
        dtl.DepartmentCode = departmentCombo.value();
        dtl.DepartmentName = departmentCombo.text();
     
        selectedItem.set("ItemCode", dtl.ItemCode);
        selectedItem.set("ItemName", dtl.ItemName);
        selectedItem.set("Unit", dtl.Unit);
        selectedItem.set("Qnty", dtl.Qnty);
        selectedItem.set("DepartmentCode", dtl.DepartmentCode);
        selectedItem.set("DepartmentName", dtl.DepartmentName);

        $("#divMConDetailsPopup").data("kendoWindow").close();
    }

};