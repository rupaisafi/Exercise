
var OrderInfoDetailsManager = {
    SaveOrderInfo: function () {
        var validator = $("#divOrderDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");
        var orderObj;
        if (validator.validate()) {
            orderObj = OrderInfoDetailsHelper.CreateOrderObject();
            var orderDetailsList = OrderInfoDetailsHelper.GetOrderDetailsGridList();
            var objOrder = JSON.stringify(orderObj);
            var objOrderDetails = JSON.stringify(orderDetailsList);
            var jsonParam = "objOrder:" + objOrder + ",objOrderDetails:" + objOrderDetails;
            var serviceUrl = "../OrderInfo/SaveOrderInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            var msg = "";
            if (orderObj.OrderId == 0) {
                msg = "Save Successfully";
            } else {
                msg = "Update Successfully";
            }
            if (jsonData.SaveStatus == "Success") {
                AjaxManager.MsgBox("success", "center", 'Success:', msg,
                    [{
                        addClass: "btn btn-primary", text: "Ok", onClick: function ($noty) {
                            $noty.close();
                            $("#grdOrderInfoSummary").data("kendoGrid").dataSource.read();
                            $("#hdnOrderId").val(jsonData.OrderId);
                           // OrderInfoDetailsHelper.ClearForm();
                        }
                    }]);
            }
            else if (jsonData.SaveStatus == "Exists") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Order No already Exists!',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }

            else {
                AjaxManager.MsgBox('error', 'center', 'Error1', jsonData.SaveStatus,
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
    },
    GetAllGridData: function (orderNo) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../OrderInfo/GetAllGridData/?orderNo=" + orderNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
    GenerateMaxOrderId: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../OrderInfo/GetMaxOrderNo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
            $("#txtOrderNo").val(obj.OrderNo);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    },
}

var OrderInfoDetailsHelper = {
    InitOrderInfoDetails: function () {
        $("#divOrderDetailsPopup").kendoWindow({
            title: "ORDER DETAILS INFORMATION",
            resizeable: true,
            scrollable: false,
            width: "90%",
            actions: ["Pin", "Close"],
            modal: true,
            animation: {
                close: {
                    effects: "fade:out"
                },
            }
        });
        OrderInfoDetailsHelper.GenerateNumericTextBox();
        OrderInfoDetailsHelper.GenerateDatePicker();
        HdlCommonHelper.GenerateStyleCombo("cmbStyle");
        HdlCommonHelper.GenerateBuyerCombo("cmbBuyer");
        HdlCommonHelper.GenerateMktUserCombo("cmbMktPerson");
        HdlCommonHelper.GenerateCustomerCombo("cmbCustomer");
        HdlCommonHelper.GenerateProdOrderTypeCombo("cmbProdOrderType");
        HdlCommonHelper.GenerateSalesOrderTypeCombo("cmbSaleOrderType");
        HdlCommonHelper.GenerateColorCombo("cmbColor");
        HdlCommonHelper.GenerateMachineNameCombo("cmbMachineName");
        HdlCommonHelper.GenerateProdStatusCombo("cmbProdStatus");
        HdlCommonHelper.GenerateOrderStatusCombo("cmbOrderStatus");
        HdlCommonHelper.GenerateMktStatusCombo("cmbMktStatus");
        HdlCommonHelper.GeneratePrcStatusCombo("cmbPrcStutus");

        OrderDetailsSummaryHelper.InitOrderDetailsSummary();
        OrderDetailsPopupHelper.InitOrderDetailsPopup();

        $("#btnSave").click(function () {
            if (OrderInfoDetailsHelper.ValidateForm()) {
                OrderInfoDetailsManager.SaveOrderInfo();
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Required Validation', 'Please Select All Fields',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                          }
                      }]);
            }

        });

        $("#btnClear").click(function () {
            OrderInfoDetailsHelper.ClearForm();
        });

        $("#btnExportToExcel").kendoButton({
            click: function () {
                $("#grdOrderInfoSummary").getKendoGrid().saveAsExcel();
            }
        });
        $("#btnAddNew").click(function () {
            $("#btnGenerateOrderNo").show();
            OrderInfoDetailsHelper.ClearForm();
            OrderInfoDetailsManager.GenerateMaxOrderId();
            $("#divOrderInfoDetails").show();
            $("#divOrderSummary").hide();
        });
        $("#btnClose").click(function () {
            $("#divOrderInfoDetails").hide();
            $("#divOrderSummary").show();
        });

      
        $("#btnGenerateOrderNo").click(function () {
          OrderInfoDetailsManager.GenerateMaxOrderId();
        });
     
       
    },

    CreateOrderObject: function () {
        var obj = new Object();
        obj.OrderId = $("#hdnOrderId").val();
        obj.OrderNo = $("#txtOrderNo").val();
        obj.CustomerId = $("#cmbCustomer").data("kendoComboBox").value();
        obj.BuyerId = $("#cmbBuyer").data("kendoComboBox").value();
        obj.EmpId = $("#cmbMktPerson").data("kendoComboBox").value();
        obj.OrderDate = $("#txtOrderDate").data("kendoDatePicker").value();
        obj.Remarks = $("#txtRemarks").val();
        return obj;
    },

    FillForm: function (obj) {
        $("#hdnOrderId").val(obj.OrderId);
        $("#txtOrderNo").val(obj.OrderNo);
        $("#txtOrderQty").data("kendoNumericTextBox").value(obj.OrderQty);
        $("#cmbCustomer").data("kendoComboBox").value(obj.CustomerId);
        $("#cmbBuyer").data("kendoComboBox").value(obj.BuyerId);
        $("#cmbMktPerson").data("kendoComboBox").value(obj.EmpId);
        $("#txtOrderDate").data("kendoDatePicker").value(obj.OrderDate);
        $("#txtRemarks").val(obj.Remarks);
    },

    ClearForm: function () {
        $("#hdnOrderId").val("");
        $("#txtOrderNo").val("");
        $("#txtOrderQty").data("kendoNumericTextBox").value("");
        $("#cmbCustomer").data("kendoComboBox").value("");
        $("#cmbBuyer").data("kendoComboBox").value("");
        $("#cmbMktPerson").data("kendoComboBox").value("");
        $("#txtOrderDate").data("kendoDatePicker").value(new Date());
        $("#txtRemarks").val("");
        gbOrderDetailsGridData = [];
        $("#grdOrderDetailsSummary").data('kendoGrid').dataSource.data([]);

        $("#divOrderDetails > form").kendoValidator();
        $("#divOrderDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },
    GenerateNumericTextBox: function () {
        $("#txtOrderQty").kendoNumericTextBox({ format: "#.##",min: 0});
        $("#txtOrderRate").kendoNumericTextBox({format: "#.##", min: 0});
        $("#txtOrderAmt").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtTEnd").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtDyeProd").kendoNumericTextBox({ format: "#.##", min: 0 });
        $("#txtReqQnty").kendoNumericTextBox({ format: "#.##", min: 0 });
    },
    GenerateDatePicker: function () {
        $("#txtOrderDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
        $("#txtCompleteDate").kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        });
    },

    ValidateForm: function () {
        var res = true;
      
        var buyerId = $("#cmbBuyer").data("kendoComboBox");
        var empId = $("#cmbMktPerson").data("kendoComboBox");
       
        if (buyerId.selectedIndex <= 0) {
            res = false;
        }
        if (empId.selectedIndex <= 0) {
            res = false;
        }
        return res;
    },

    GetOrderDetailsGridList: function () {
        var gridData = $("#grdOrderDetailsSummary").data("kendoGrid").dataSource.data();
        return gridData;
    },

    FillAllGrid: function (orderNo) {
      
        var data = OrderInfoDetailsManager.GetAllGridData(orderNo);
        //var url = "../OrderInfo/GetAllGridData/?orderNo=" + orderNo;
        //var data1 = OrderDetailsSummaryManager.gridDataSource(url);
        gbOrderDetailsGridData = [];
        var odetailsGrid = $("#grdOrderDetailsSummary").data("kendoGrid");
        gbOrderDetailsGridData = data;
        var gridDataSource1 = new kendo.data.DataSource({ data: gbOrderDetailsGridData });
        odetailsGrid.setDataSource(gridDataSource1);

    

     
    },

}