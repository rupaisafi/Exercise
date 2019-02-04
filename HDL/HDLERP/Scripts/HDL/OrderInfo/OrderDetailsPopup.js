var gbOrderDetailsGridData = [];

var OrderDetailsPopupManager = {
    GetStyleInformation: function (styleCode) {
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetStyleInformation/?styleCode=" + styleCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    }
};

var OrderDetailsPopupHelper = {
    InitOrderDetailsPopup: function () {
        $("#txtOrderRate").change(function () {
            OrderDetailsPopupHelper.CalculateAmount();
        });
        $("#txtOrderQty").change(function () {
            OrderDetailsPopupHelper.CalculateAmount();
        });
        $("#cmbStyle").change(function () {
            OrderDetailsPopupHelper.StyleNoChangeEvent();
        });
        $("#btnClearODetails").click(function () {
            OrderDetailsPopupHelper.ClearPopupWindoForm();
        });
        $("#btnAddOrderDetails").click(function () {
            $("#btnAddToList").show();
            $("#btnUpdateODetails").hide();
            $("#cmbStyle").data("kendoComboBox").enable(true);
            OrderDetailsPopupHelper.ClearPopupWindoForm();
            $("#divOrderDetailsPopup").data("kendoWindow").open().center();
        });
        $("#btnCloseODetails").click(function () {
            $("#divOrderDetailsPopup").data("kendoWindow").close();
        });
        $("#btnAddToList").click(function () {
            OrderDetailsPopupHelper.AddDetailsItemIntoList();
        });
        $("#btnUpdateODetails").click(function () {
            OrderDetailsPopupHelper.UpdateOrderDetailsGrid();
        });

    },

    CalculateAmount: function () {
        var rate = $("#txtOrderRate").data("kendoNumericTextBox").value();
        var qnty = $("#txtOrderQty").data("kendoNumericTextBox").value();
        var amt = rate * qnty;
        $("#txtOrderAmt").data("kendoNumericTextBox").value(amt);
    },
    StyleNoChangeEvent: function () {
        OrderDetailsPopupHelper.ClearStyleInformation();
        var styleCode = $("#cmbStyle").data("kendoComboBox").value();
        if (styleCode != 0) {
            var styleObj = OrderDetailsPopupManager.GetStyleInformation(styleCode);
            OrderDetailsPopupHelper.FillStyleInformation(styleObj);
        }

    },
    FillStyleInformation: function (obj) {
        $("#txtWeave").val(obj.Weave);
        $("#txtWidth").val(obj.Width);
        $("#txtConstruction").val(obj.Construction);
        $("#txtWarpRatio").val(obj.WarpRatio);
        $("#txtWeftRatio").val(obj.WeftRatio);
        $("#cmbColor").data("kendoComboBox").value(obj.ColorId);
        $("#txtTEnd").data("kendoNumericTextBox").value(obj.TEnds);
    },

    ClearStyleInformation: function () {
        $("#txtWeave").val("");
        $("#txtWidth").val("");
        $("#txtConstruction").val("");
        $("#txtWarpRatio").val("");
        $("#txtWeftRatio").val("");
        $("#cmbColor").data("kendoComboBox").value("");
        $("#txtTEnd").data("kendoNumericTextBox").value("");
    },
    ClearPopupWindoForm: function () {
        OrderDetailsPopupHelper.ClearStyleInformation();
        $("#cmbStyle").data("kendoComboBox").value("");
        $("#txtOrderRate").data("kendoNumericTextBox").value("");
        $("#txtOrderQty").data("kendoNumericTextBox").value("");
        $("#txtOrderAmt").data("kendoNumericTextBox").value("");
        $("#cmbProdOrderType").data("kendoComboBox").value("");
        $("#cmbSaleOrderType").data("kendoComboBox").value("");
        $("#cmbMachineName").data("kendoComboBox").value("");
        $("#txtDyeProd").data("kendoNumericTextBox").value("");
        $("#cmbProdStatus").data("kendoComboBox").value("");
        $("#cmbOrderStatus").data("kendoComboBox").value("");
        $("#cmbMktStatus").data("kendoComboBox").value("");
        $("#cmbPrcStutus").data("kendoComboBox").value("");
        $("#txtReqQnty").data("kendoNumericTextBox").value("");
        $("#txtRemarks2").val("");

       

        $("#txtCompleteDate").data("kendoDatePicker").value(new Date());
        $("#lblMessage").text("");
    },

    AddDetailsItemIntoList: function () {
        var stylecombo = $("#cmbStyle").data("kendoComboBox");
        var orderQnty = $("#txtOrderQty").data("kendoNumericTextBox").value();
        var orderDetailsGrid = $("#grdOrderDetailsSummary").data("kendoGrid");

        if (stylecombo.value() !== "0" && orderQnty > 0) {
         
            var objOrder = new Object();
            objOrder.StyleNo = stylecombo.text(); 
            objOrder.StyleCode = stylecombo.value();
            objOrder.Qnty = $("#txtOrderQty").data("kendoNumericTextBox").value();
            objOrder.Rate = $("#txtOrderRate").data("kendoNumericTextBox").value();
            objOrder.Amount = $("#txtOrderAmt").data("kendoNumericTextBox").value();
            objOrder.ProdOrderTypeId = $("#cmbProdOrderType").data("kendoComboBox").value();
            objOrder.SalesOrderTypeId = $("#cmbSaleOrderType").data("kendoComboBox").value();
            objOrder.MachineId = $("#cmbMachineName").data("kendoComboBox").value();
            objOrder.DyeProd = $("#txtDyeProd").data("kendoNumericTextBox").value();
            objOrder.ProdStatus = $("#cmbProdStatus").data("kendoComboBox").value();
            objOrder.OrderStatus = $("#cmbOrderStatus").data("kendoComboBox").value();
            objOrder.MktStatus = $("#cmbMktStatus").data("kendoComboBox").value();
            objOrder.PrcStatus = $("#cmbPrcStutus").data("kendoComboBox").value();
            objOrder.ReqQnty = $("#txtReqQnty").data("kendoNumericTextBox").value();
            objOrder.Remarks = $("#txtRemarks2").val();
            objOrder.DeliDate = $("#txtCompleteDate").data("kendoDatePicker").value();
            gbOrderDetailsGridData.push(objOrder);
            var gridDataSource = new kendo.data.DataSource({ data: gbOrderDetailsGridData });
            orderDetailsGrid.setDataSource(gridDataSource);

            $("#lblMessage").text("Item Added Successfully!");

        } else {
            AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Required Style No & Order Qnty!',
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
    FillOrderDetailsInformation: function (obj) {
        OrderDetailsPopupHelper.ClearPopupWindoForm();
        $("#cmbStyle").data("kendoComboBox").value(obj.StyleNo);
        OrderDetailsPopupHelper.StyleNoChangeEvent();
         $("#txtOrderQty").data("kendoNumericTextBox").value(obj.Qnty);
         $("#txtOrderRate").data("kendoNumericTextBox").value(obj.Rate);
         $("#txtOrderAmt").data("kendoNumericTextBox").value(obj.Amount);
         $("#cmbProdOrderType").data("kendoComboBox").value(obj.ProdOrderTypeId);
         $("#cmbSaleOrderType").data("kendoComboBox").value(obj.SalesOrderTypeId);
         $("#cmbMachineName").data("kendoComboBox").value(obj.MachineId);
         $("#txtDyeProd").data("kendoNumericTextBox").value(obj.DyeProd);
         $("#cmbProdStatus").data("kendoComboBox").value(obj.ProdStatus);
         $("#cmbOrderStatus").data("kendoComboBox").value(obj.OrderStatus);
         $("#cmbMktStatus").data("kendoComboBox").value(obj.MktStatus);
         $("#cmbPrcStutus").data("kendoComboBox").value(obj.PrcStatus);
         $("#txtReqQnty").data("kendoNumericTextBox").value(obj.ReqQnty);
         $("#txtRemarks2").val(obj.Remarks);
         $("#txtCompleteDate").data("kendoDatePicker").value(obj.DeliDate);

    },
    UpdateOrderDetailsGrid: function () {
        var grid = $("#grdOrderDetailsSummary").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());

        for (var i = 0; i < gbOrderDetailsGridData.length; i++) {
            if (gbOrderDetailsGridData[i].StyleCode == selectedItem.StyleCode) {
                gbOrderDetailsGridData.splice(i, 1);
                break;
            }
        }
       
        var stylecombo = $("#cmbStyle").data("kendoComboBox");
        var objOrder = new Object();
        objOrder.StyleNo = stylecombo.text(); 
        objOrder.StyleCode = stylecombo.value();
        objOrder.Qnty = $("#txtOrderQty").data("kendoNumericTextBox").value();
        objOrder.Rate = $("#txtOrderRate").data("kendoNumericTextBox").value();
        objOrder.Amount = $("#txtOrderAmt").data("kendoNumericTextBox").value();
        objOrder.ProdOrderTypeId = $("#cmbProdOrderType").data("kendoComboBox").value();
        objOrder.SalesOrderTypeId = $("#cmbSaleOrderType").data("kendoComboBox").value();
        objOrder.MachineId = $("#cmbMachineName").data("kendoComboBox").value();
        objOrder.DyeProd = $("#txtDyeProd").data("kendoNumericTextBox").value();
        objOrder.ProdStatus = $("#cmbProdStatus").data("kendoComboBox").value();
        objOrder.OrderStatus = $("#cmbOrderStatus").data("kendoComboBox").value();
        objOrder.MktStatus = $("#cmbMktStatus").data("kendoComboBox").value();
        objOrder.PrcStatus = $("#cmbPrcStutus").data("kendoComboBox").value();
        objOrder.ReqQnty = $("#txtReqQnty").data("kendoNumericTextBox").value();
        objOrder.Remarks = $("#txtRemarks2").val();
        objOrder.DeliDate = $("#txtCompleteDate").data("kendoDatePicker").value();

     
        selectedItem.set("Qnty", objOrder.Qnty);
        selectedItem.set("Rate", objOrder.Rate);
        selectedItem.set("Amount", objOrder.Amount);
        selectedItem.set("ProdOrderTypeId", objOrder.ProdOrderTypeId);
        selectedItem.set("SalesOrderTypeId", objOrder.SalesOrderTypeId);
        selectedItem.set("MachineId", objOrder.MachineId);
        selectedItem.set("DyeProd", objOrder.DyeProd);
        selectedItem.set("ProdStatus", objOrder.ProdStatus);
        selectedItem.set("OrderStatus", objOrder.OrderStatus);
        selectedItem.set("MktStatus", objOrder.MktStatus);
        selectedItem.set("PrcStatus", objOrder.PrcStatus);
        selectedItem.set("ReqQnty", objOrder.ReqQnty);
        selectedItem.set("Remarks", objOrder.Remarks);
        selectedItem.set("DeliDate", objOrder.DeliDate);

        $("#divOrderDetailsPopup").data("kendoWindow").close();
    },

};