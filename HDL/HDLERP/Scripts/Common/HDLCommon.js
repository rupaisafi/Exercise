var HdlCommonManager = {
    GetCommonData: function (url) {
        var objCommon = "";
        var jsonParam = "";
        var serviceUrl = url;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCommon = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCommon;
    },
    GetAllUnit: function () {
        var objUnit = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllUnit/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objUnit = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objUnit;
    },
    GetAllSupplier: function () {
        var objSupp = "";
        var jsonParam = "";
        var serviceUrl = "../SupplierInfo/GetAllSupplier/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSupp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSupp;
    },
    GetAllStyle: function () {
        var objStyle = "";
        var jsonParam = "";
        var serviceUrl = "../StyleInfo/GetAllStyle/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStyle = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStyle;
    },
    GetAllBuyer: function () {
        var objBuyer = "";
        var jsonParam = "";
        var serviceUrl = "../BuyerInfo/GetAllBuyer/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objBuyer = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objBuyer;
    },
    GetAllMktUser: function () {
        var objUser = "";
        var jsonParam = "";
        var serviceUrl = "../OrderInfo/GetAllMktUser/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objUser = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objUser;
    },
    GetAllYarn: function () {
        var objYarn = "";
        var jsonParam = "";
        var serviceUrl = "../YarnInfo/GetAllYarn/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objYarn = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objYarn;
    },
    GetAllColor: function () {
        var objColor = "";
        var jsonParam = "";
        var serviceUrl = "../ColorInfo/GetAllColor/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objColor = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objColor;
    },
    GetAllSetProdType: function () {
        var prodType = "";
        var jsonParam = "";
        var serviceUrl = "../SetInfo/GetAllProductionType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            prodType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return prodType;
    },
    GetAllSetStatus: function () {
        var setStatus = "";
        var jsonParam = "";
        var serviceUrl = "../SetInfo/GetAllSetStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            setStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return setStatus;
    },
    GetAllCustomer: function () {
        var objCustomer = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllCustomer/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCustomer = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCustomer;
    },
    GetAllProdOrderType: function () {
        var objProdOrderType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllProdOrderType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objProdOrderType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objProdOrderType;
    },
    GetAllSalesOrderType: function () {
        var objSalesOrderType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSalesOrderType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSalesOrderType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSalesOrderType;
    },
    GetAllMachineName: function (gCode) {
        var objMachineName = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllMachineName?gCode=" + gCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objMachineName = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMachineName;
    },
    GetAllMCName: function (gCode) {
        var objMc = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllMCName?gCode=" + gCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objMc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMc;
    },
    GetAllProdStatus: function () {
        var objProdStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllProdStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objProdStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objProdStatus;
    },
    GetAllOrderStatus: function () {
        var objOrderStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllOrderStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrderStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrderStatus;
    },
    GetAllMktStatus: function () {
        var objMkt = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllMktStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objMkt = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMkt;
    },
    GetAllPrcStatus: function () {
        var objPrc = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllPrcStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objPrc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objPrc;
    },
    GetAllProdType: function () {
        var objProdType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllProdType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objProdType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objProdType;
    },
    GetAllIName: function () {
        var objIName = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllIName/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objIName = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objIName;
    },
    GetAllINameDye: function () {
        var objINameDye = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllINameDye/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objINameDye = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objINameDye;
    },
    GetAllSName: function () {
        var objSName = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSName/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSName = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSName;
    },
    GetAllSelvedge: function () {
        var objS = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSelvedge/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objS = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objS;
    },
    GetAllCountry: function () {
        var objCou = "";
        var jsonParam = "";
        var serviceUrl = "../Country/GetAll/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCou = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCou;
    },
    GetAllGroupName: function () {
        var objGroup = "";
        var jsonParam = "";
        var serviceUrl = "../ItemInfo/GetAllGroupName/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objGroup = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objGroup;
    },
    GetAllItemType: function () {
        var objGroup = "";
        var jsonParam = "";
        var serviceUrl = "../ItemInfo/GetAllItemType/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objGroup = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objGroup;
    },
    GetAllBank: function () {
        var objBank = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllBank/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objBank = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objBank;
    },
    GetAllBranch: function () {
        var objBranch = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllBranch/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objBranch = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objBranch;
    },
    GetAllLcStatus: function () {
        var objLcStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLcStatus/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objLcStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objLcStatus;
    },
    GetAllImportType: function () {
        var objImpType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllImportType/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objImpType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objImpType;
    },
    GetAllCurrency: function () {
        var objCurrency = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllCurrency/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCurrency = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCurrency;
    },
    GetAllItem: function () {
        var objItem = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllItem/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objItem = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objItem;
    },
    GetAllCompany: function () {
        var objComp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllCompany/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objComp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objComp;
    },
    GetAllLC: function () {
        var objLc = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLc/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objLc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objLc;
    },
    GetAllDepartment: function () {
        var objDept = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllDepartment/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDept = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objDept;
    },
    GetAllCottonType: function () {
        var objCtType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllCottonType/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCtType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCtType;
    },
    GetAllSetNo: function () {
        var objSet = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSetNo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSet = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSet;
    },
    GetAllWarpingSetNo: function () {
        var objSet = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllWarpingSetNo/";
        window.AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSet = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSet;
    },
    GetLotNoByIName: function (iName) {
        var objOrder = "";
        var jsonParam = "";
        var serviceUrl = "../PlanningInfo/GetLotNoByIName/?iName=" + iName;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOrder = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOrder;
    },
    GetFabricType: function () {
        var objFabType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetFabricType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objFabType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objFabType;
    },
    GetFinishType: function () {
        var objFinType = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetFinishType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objFinType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objFinType;
    },
    GetFinishRoute: function () {
        var objFinRoute = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetFinishRoute/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objFinRoute = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objFinRoute;
    },
    GetGradeData: function () {
        var objGrade = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetGradeData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objGrade = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objGrade;
    },
    GetSpecialityData: function () {
        var objSpc = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetSpecialityData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSpc = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSpc;
    },
    GetYesNoStatus: function () {
        var objSt = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetYesNoStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objSt = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objSt;
    },
    GetShiftData: function () {
        var objShift = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetShiftData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objShift = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objShift;
    },
    GetWarpingOperator: function () {
        var objOpWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetWarpingOperator/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objOpWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objOpWp;
    },
    GetWarpingCaptain: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetWarpingCaptain/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllDyeMCNo: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllDyeMCNo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllDyeingEmploye: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllDyeingEmploye/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllReasonType: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllReasonType/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllEmployee: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllEmployee?deptNo=" + deptNo + "&cardNo=" + cardNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },

    GetAllRopeDyePO: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllRopeDyePO/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllRopeDyeOP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllRopeDyeOP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllRopeDyeCM: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllRopeDyeCM/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllRopeDyeCP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllRopeDyeCP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },

    GetAllLCBMCNo: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLCBMCNo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllLCBPO: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLCBPO/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllLCBOP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLCBOP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllLCBSV: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLCBSV/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllLCBQC: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllLCBQC/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },

    GetAllSlasherPO: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSlasherPO/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllSlasherSZ: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSlasherSZ/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllSlasherDO: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSlasherDO/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllSlasherCP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllSlasherCP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllDyeCapCutEnd: function (setNo) {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllDyeCapCutEnd?setNo=" + setNo;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllYarnDyeOP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllYarnDyeOP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    //Weaving Production Master
    GetAllWeavingFloor: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllWeavingFloor/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllWeavingCP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllWeavingCP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllWeavingPO: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllWeavingPO/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    GetAllWeavingFitterCP: function () {
        var objCapWp = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllWeavingFitterCP/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objCapWp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCapWp;
    },
    //Weaving Production
    getAllWeavingMachine: function (uCode) {
        var objMachine = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllWeavingMachine?UCode=" + uCode;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMachine = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMachine;
    },
    getAllQCFault: function () {
        var objMachine = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllQCFault/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMachine = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMachine;
    },
    getAllMachine: function () {
        var objMachine = "";
        var jsonParam = "";
        var serviceUrl = "../Common/GetAllQCFault/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMachine = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objMachine;
    }
}

var HdlCommonHelper = {
    GenerateSupplierCombo: function (identity) {
        var objSupp = HdlCommonManager.GetAllSupplier();
        var obj = new Object();
        obj.SupplierName = "---Select---";
        obj.SupplierCode = "0";
        objSupp.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "SupplierName",
            dataValueField: "SupplierCode",
            dataSource: objSupp,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateStyleCombo: function (identity) {
        var objStyle = HdlCommonManager.GetAllStyle();
        //var obj = new Object();
        //obj.StyleNo = "---Select---";
        //obj.StyleCode = 0;
        //objStyle.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "StyleNo",
            dataValueField: "StyleCode",
            dataSource: objStyle,
            //index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateBuyerCombo: function (identity) {
        var objBuyer = HdlCommonManager.GetAllBuyer();
        var obj = new Object();
        obj.BuyerName = "---Select---";
        obj.BuyerId = 0;
        objBuyer.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "BuyerName",
            dataValueField: "BuyerId",
            dataSource: objBuyer,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateMktUserCombo: function (identity) {
        var objUser = HdlCommonManager.GetAllMktUser();
        var obj = new Object();
        obj.USERNAME = "---Select---";
        obj.EMPID = 0;
        objUser.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "USERNAME",
            dataValueField: "EMPID",
            dataSource: objUser,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateYarnCombo: function (identity) {
        var objYarn = HdlCommonManager.GetAllYarn();
        var obj = new Object();
        obj.YarnCode1 = "---Select---";
        obj.YarnCode = "0";
        objYarn.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "YarnCode1",
            dataValueField: "YarnCode",
            dataSource: objYarn,
            index: 0,
            suggest: true,
            filter: "contains"
            //change: function () {
            //    AjaxManager.isValidItem(identity, true);
            //}
        });

    },
    GenerateColorCombo: function (identity) {
        var objColor = HdlCommonManager.GetAllColor();
        var obj = new Object();
        obj.ColorName = "---Select---";
        obj.ColorId = 0;
        objColor.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "ColorName",
            dataValueField: "ColorId",
            dataSource: objColor,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateSetProductionTypeCombo: function (identity) {
        var setProdType = HdlCommonManager.GetAllSetProdType();
        var obj = new Object();
        obj.TypeHead = "---Select---";
        obj.TypeId = 0;
        setProdType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "TypeHead",
            dataValueField: "TypeId",
            dataSource: setProdType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateSetStatusCombo: function (identity) {
        var setStatus = HdlCommonManager.GetAllSetStatus();
        var obj = new Object();
        obj.StatusHead = "---Select---";
        obj.StatusId = 0;
        setStatus.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "StatusHead",
            dataValueField: "StatusId",
            dataSource: setStatus,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateUnitCombo: function (identity) {
        var objUnit = HdlCommonManager.GetAllUnit();
        var obj = new Object();
        obj.UnitName = "---Select---";
        obj.UnitCode = 0;
        objUnit.unshift(obj);
       return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "UnitName",
            dataValueField: "UnitCode",
            dataSource: objUnit,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
       }).data("kendoComboBox");

    },
    GenerateCustomerCombo: function (identity) {
        var objUnit = HdlCommonManager.GetAllCustomer();
        var obj = new Object();
        obj.CustomerName = "---Select---";
        obj.CustomerId = 0;
        objUnit.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "CustomerName",
            dataValueField: "CustomerId",
            dataSource: objUnit,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateDatePicker: function (identity) {
        return $("#" + identity).kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        }).data("kendoDatePicker");
    },
    GenerateTimePicker: function (identity, option) {
        if (option) {
            return $('#' + identity).kendoTimePicker(option).data("kendoTimePicker");
        } else {
            return $('#' + identity).kendoTimePicker({
                format: "hh:mm tt",
                interval: 1,
                value: new Date()
            }).data("kendoTimePicker");
        }

    },
    GenerateNumericTextBox: function (identity) {
        return $("#" + identity).kendoNumericTextBox({
            format: "#.##",
            min: 0
        }).data("kendoNumericTextBox");
    },
    GenerateProdOrderTypeCombo: function (identity) {
        var objOType = HdlCommonManager.GetAllProdOrderType();
        var obj = new Object();
        obj.OType = "---Select---";
        obj.OCode = 0;
        objOType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "OType",
            dataValueField: "OCode",
            dataSource: objOType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });

    },
    GenerateSalesOrderTypeCombo: function (identity) {
        var objSOType = HdlCommonManager.GetAllSalesOrderType();
        var obj = new Object();
        obj.OType = "---Select---";
        obj.OCode = 0;
        objSOType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "OType",
            dataValueField: "OCode",
            dataSource: objSOType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateMachineNameCombo: function (identity, option) {
        if (option) {
            if (!option.gCode) {
                option.gCode = 2
            }
        } else {
            option = {};
            option.gCode = 2;
        }
        var objMachin = HdlCommonManager.GetAllMachineName(option.gCode);
        var obj = new Object();
        obj.MachineName = "---Select---";
        obj.MNo = 0;
        objMachin.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "MachineName",
            dataValueField: "MNo",
            dataSource: objMachin,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },

    GenerateMachineNameComboForFinishing: function (identity, option) {
        
        var objMachin = HdlCommonManager.GetAllMachineName(4);
        var obj = new Object();
        obj.MName = "--- Select ---";
        obj.MNo = 0;
        objMachin.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "MName",
            dataValueField: "MNo",
            dataSource: objMachin,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },



    GenerateMcNoCombo: function (identity, option) {
        if (option) {
            if (!option.gCode) {
                option.gCode = 1;
            }
        } else {
            option = {
                gCode: 1
            }
        }
        var objMachin = HdlCommonManager.GetAllMCName(option.gCode);
        var obj = new Object();
        obj.MName = "---Select---";
        obj.MNo = 0;
        objMachin.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "MName",
            dataValueField: "MNo",
            dataSource: objMachin,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateProdStatusCombo: function (identity) {
        var objPStatus = HdlCommonManager.GetAllProdStatus();
        var obj = new Object();
        obj.Status = "---Select---";
        obj.Code = 0;
        objPStatus.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Status",
            dataValueField: "Code",
            dataSource: objPStatus,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateOrderStatusCombo: function (identity) {
        var objOStatus = HdlCommonManager.GetAllOrderStatus();
        var obj = new Object();
        obj.OType = "---Select---";
        obj.OCode = 0;
        objOStatus.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "OType",
            dataValueField: "OCode",
            dataSource: objOStatus,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateMktStatusCombo: function (identity) {
        var objMktStatus = HdlCommonManager.GetAllMktStatus();
        var obj = new Object();
        obj.OType = "---Select---";
        obj.OCode = 0;
        objMktStatus.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "OType",
            dataValueField: "OCode",
            dataSource: objMktStatus,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GeneratePrcStatusCombo: function (identity) {
        var objPrcStatus = HdlCommonManager.GetAllPrcStatus();
        var obj = new Object();
        obj.OType = "---Select---";
        obj.OCode = 0;
        objPrcStatus.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "OType",
            dataValueField: "OCode",
            dataSource: objPrcStatus,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateProdTypeCombo: function (identity) {
        var objProdType = HdlCommonManager.GetAllProdType();
        var obj = new Object();
        obj.OType = "---Select---";
        obj.OCode = 0;
        objProdType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "OType",
            dataValueField: "OCode",
            dataSource: objProdType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateINameCombo: function (identity) {
        var objIName = HdlCommonManager.GetAllIName();
        var obj = new Object();
        obj.IcName = "---Select---";
        obj.IcNo = 0;
        objIName.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "IcName",
            dataValueField: "IcNo",
            dataSource: objIName,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateINameDyeCombo: function (identity) {
        var objINameDye = HdlCommonManager.GetAllINameDye();
        var obj = new Object();
        obj.IcName = "---Select---";
        obj.IcNo = 0;
        objINameDye.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "IcName",
            dataValueField: "IcNo",
            dataSource: objINameDye,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateSNameCombo: function (identity) {
        var objSName = HdlCommonManager.GetAllSName();
        var obj = new Object();
        obj.SName = "---Select---";
        obj.SCode = 0;
        objSName.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "SName",
            dataValueField: "SCode",
            dataSource: objSName,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateSelvedgeCombo: function (identity) {
        var objSelvadge = HdlCommonManager.GetAllSelvedge();
        var obj = new Object();
        obj.Status = "---Select---";
        obj.StCode = 0;
        objSelvadge.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Status",
            dataValueField: "StCode",
            dataSource: objSelvadge,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateCountryCombo: function (identity) {
        var objCount = HrmCommonManager.GetAllCountry();
        var obj = new Object();
        obj.CountryName = "---Select---";
        obj.CountryID = 0;
        objCount.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "CountryName",
            dataValueField: "CountryID",
            dataSource: objCount,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateGroupCombo: function (identity) {
        var objCou = HdlCommonManager.GetAllGroupName();
        var obj = new Object();
        obj.IGName = "---Select---";
        obj.IGCode = 0;
        objCou.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "IGName",
            dataValueField: "IGCode",
            dataSource: objCou,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateItemTypeCombo: function (identity) {
        var objCou = HdlCommonManager.GetAllItemType();
        var obj = new Object();
        obj.IType = "---Select---";
        obj.ITCode = 0;
        objCou.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "IType",
            dataValueField: "ITCode",
            dataSource: objCou,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateBankCombo: function (identity) {
        var objBank = HdlCommonManager.GetAllBank();
        var obj = new Object();
        obj.Bank = "---Select---";
        obj.BCode = 0;
        objBank.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Bank",
            dataValueField: "BCode",
            dataSource: objBank,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateBranchCombo: function (identity) {
        var objBranch = HdlCommonManager.GetAllBranch();
        var obj = new Object();
        obj.BrName = "---Select---";
        obj.BrCode = 0;
        objBranch.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "BrName",
            dataValueField: "BrCode",
            dataSource: objBranch,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateLcStatusCombo: function (identity) {
        var objLcStatus = HdlCommonManager.GetAllLcStatus();
        var obj = new Object();
        obj.Status = "---Select---";
        obj.StCode = 0;
        objLcStatus.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Status",
            dataValueField: "StCode",
            dataSource: objLcStatus,
            index: 1,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateImportTypeCombo: function (identity) {
        var objImpType = HdlCommonManager.GetAllImportType();
        var obj = new Object();
        obj.EItem = "---Select---";
        obj.ECode = 0;
        objImpType.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "EItem",
            dataValueField: "ECode",
            dataSource: objImpType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateCurrencyCombo: function (identity) {
        var objImpType = HdlCommonManager.GetAllCurrency();
        var obj = new Object();
        obj.Currency = "---Select---";
        obj.CurCode = 0;
        objImpType.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Currency",
            dataValueField: "CurCode",
            dataSource: objImpType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateItemCombo_xxx: function (identity) {
        var objImpType = HdlCommonManager.GetAllItem();
        var obj = new Object();
        obj.icname = "---Select---";
        obj.icno = 0;
        objImpType.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "icname",
            dataValueField: "icno",
            dataSource: objImpType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }

        });
    },
    GenerateCompanyCombo: function (identity) {
        var objComp = HdlCommonManager.GetAllCompany();
        var obj = new Object();
        obj.CompanyName = "---Select---";
        obj.CompanyId = 0;
        objComp.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "CompanyName",
            dataValueField: "CompanyId",
            dataSource: objComp,
            index: 1,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateLcCombo: function (identity) {
        var objComp = HdlCommonManager.GetAllLC();
        var obj = new Object();
        obj.LcName = "---Select---";
        obj.LcNo = 0;
        objComp.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "LcName",
            dataValueField: "LcNo",
            dataSource: objComp,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDepartmentCombo: function (identity) {
        var objDept = HdlCommonManager.GetAllDepartment();
        var obj = new Object();
        obj.DName = "---Select---";
        obj.DCode = 0;
        objDept.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "DName",
            dataValueField: "DCode",
            dataSource: objDept,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateCottonTypeCombo: function (identity) {
        var objCottonType = HdlCommonManager.GetAllCottonType();
        var obj = new Object();
        obj.CottonType = "---Select---";
        obj.CottonCode = 0;
        objCottonType.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "CottonType",
            dataValueField: "CottonCode",
            dataSource: objCottonType,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                window.AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateSetNoCombo: function (identity) {
        var objSetNo = HdlCommonManager.GetAllSetNo();
        //var obj = new Object();
        //obj.SetNo1 = "---Select---";
        //obj.SetNo = 0;
        //objSetNo.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "SetNo1",
            dataValueField: "SetNo",
            dataSource: objSetNo,
            index: 0,
            suggest: true,
            filter: "contains"
        });

    },
    GenerateWarpingSetNoCombo: function (identity) {
        var objSetNo = HdlCommonManager.GetAllWarpingSetNo();
        var obj = new Object();
        obj.Text = "---Select---";
        obj.Value = 0;
        objSetNo.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: objSetNo,
            index: 0,
            suggest: true,
            filter: "contains"
        });

    },
    GenerateUserTypeCombo: function (identity) {
        var objSetNo = [{ TypeId: 1, TypeName: "Admin" }, { TypeId: 2, TypeName: "General User" }];
        var obj = new Object();
        obj.TypeName = "---Select---";
        obj.TypeId = 0;
        objSetNo.unshift(obj);

        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "TypeName",
            dataValueField: "TypeId",
            dataSource: objSetNo,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GenerateLotCombo: function (identity, iName) {
        var objOType = HdlCommonManager.GetLotNoByIName(iName);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "LotNo1",
            dataValueField: "LotNo",
            dataSource: objOType,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GeneratecmbFabricTypeCombo: function (identity) {
        var objFabType = HdlCommonManager.GetFabricType();
        var obj = new Object();
        obj.TypeHead = "---Select---";
        obj.FabTypeCode = 0;
        objFabType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "TypeHead",
            dataValueField: "FabTypeCode",
            dataSource: objFabType,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GeneratecmbFinishTypeCombo: function (identity) {
        var objFinType = HdlCommonManager.GetFinishType();
        var obj = new Object();
        obj.FType = "---Select---";
        obj.FCode = 0;
        objFinType.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "FType",
            dataValueField: "FCode",
            dataSource: objFinType,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GeneratecmbFinishRouteCombo: function (identity) {
        var objFinRoute = HdlCommonManager.GetFinishRoute();
        var obj = new Object();
        obj.Remarks = "---Select---";
        obj.RouteType = "0";
        objFinRoute.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Remarks",
            dataValueField: "RouteType",
            dataSource: objFinRoute,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GenerateGradeCombo: function (identity) {
        var objGrade = HdlCommonManager.GetGradeData();
        var obj = new Object();
        obj.Gread = "---Select---";
        obj.GCode = "0";
        objGrade.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Gread",
            dataValueField: "GCode",
            dataSource: objGrade,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GeneratecmbSpecialityCombo: function (identity) {
        var objSpec = HdlCommonManager.GetSpecialityData();
        var obj = new Object();
        obj.SpcName = "---Select---";
        obj.SpcCode = "0";
        objSpec.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "SpcName",
            dataValueField: "SpcCode",
            dataSource: objSpec,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GenerateYesNoStatus: function (identity) {
        var objSpec = HdlCommonManager.GetYesNoStatus();
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Status",
            dataValueField: "StCode",
            dataSource: objSpec,
            index: 0,
            suggest: true,
            filter: "contains"
        });
    },
    GenerateShiftCombo: function (identity) {
        var objShift = HdlCommonManager.GetShiftData();
        //var obj = new Object();
        //obj.Shift = "---Select---";
        //obj.ShiftNo = "0";
        //obj.ShiftTime = "00.00";
        //objShift.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Shift",
            dataValueField: "ShiftNo",
            dataSource: objShift,
            // index: 0,
            suggest: true,
            filter: "contains",
            //template: "<table><tr><td width='100px'>${ Shift}</td><td width='100px'>${ ShiftNo }</td></tr></table>"

        }).css("width", 300);
    },
    GenerateOperatorWarpingCombo: function (identity) {
        var objOpWp = HdlCommonManager.GetWarpingOperator();
        //var obj = new Object();
        //obj.Name = "--Select--";
        //obj.CardNo = "0";
        //obj.PoName = "PO Name";
        //objOpWp.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: objOpWp,
            // index: 0,
            suggest: true,
            filter: "contains",
            template: "<table><tr><td width='100px'>${ Name}</td><td width='100px'>${ CardNo }</td><td width='100px'>${ PoName }</td></tr></table>"
        });
    },
    GenerateCaptainWarpingCombo: function (identity) {
        var objCapWp = HdlCommonManager.GetWarpingCaptain();
        //var obj = new Object();
        //obj.Name = "---Select---";
        //obj.CardNo = "0";
        //objCapWp.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: objCapWp,
            //index: 0,
            suggest: true,
            filter: "contains",
            template: "<table><tr><td width='100px'>${ Name}</td><td width='100px'>${ CardNo }</td></tr></table>"

        });
    },
    GenerateTabStrip: function (identity) {
        return $("#" + identity).kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        }).data("kendoTabStrip");
    },
    GenerateDyeMcNoCombo: function (identity) {
        var objMachin = HdlCommonManager.GetAllDyeMCNo();
        var obj = new Object();
        obj.MName = "---Select---";
        obj.MNo = 0;
        objMachin.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "MName",
            dataValueField: "MNo",
            dataSource: objMachin,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateEmployeeCombo: function (identity, option) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: HdlCommonManager.GetAllDyeingEmploye(option.deptNo, option.cardNo),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateDyeingEmployeCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: HdlCommonManager.GetAllDyeingEmploye(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateStoppageCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Text",
            dataValueField: "Id",
            dataSource: [
                //{ Id: "0", Text: "---Select---" },
                { Id: "1", Text: "No" },
                { Id: "2", Text: "Yes" },
                { Id: "3", Text: "Trial Beam" },
                { Id: "4", Text: "Sample" },
                { Id: "5", Text: "Process Loss" },
                { Id: "6", Text: "Cancel" }
            ],
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateLapperTypeCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Text",
            dataValueField: "Id",
            dataSource: [
                //{ Id: "0", Text: "---Select---" },
                { Id: "1", Text: "Creel" },
                { Id: "2", Text: "Dye Bath" },
                { Id: "3", Text: "Sizing Bath" },
                { Id: "4", Text: "Wash Bath" }
            ],
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateSizingMcCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Text",
            dataValueField: "Id",
            dataSource: [
                //{ Id: "0", Text: "---Select---" },
                { Id: "1", Text: "Sizing-1" },
                { Id: "2", Text: "Sizing-2" },
            ],
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    GenerateReasonCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "IType",
            dataValueField: "ITCode",
            dataSource: HdlCommonManager.GetAllReasonType(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    //RopeDye
    RopeDyePOCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllRopeDyePO(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    RopeDyeOPCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllRopeDyeOP(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    RopeDyeCMCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllRopeDyeCM(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    RopeDyeCPCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllRopeDyeCP(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    //LCB
    LCBMcNoCombo: function (identity) {
        var objMachin = HdlCommonManager.GetAllLCBMCNo();
        var obj = new Object();
        obj.MName = "---Select---";
        obj.MNo = 0;
        objMachin.unshift(obj);
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "MName",
            dataValueField: "MNo",
            dataSource: objMachin,
            index: 0,
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    LCBPOCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllLCBPO(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    LCBOPCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllLCBOP(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    LCBSVCombo: function (identity) {
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllLCBSV(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    LCBQCCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllLCBQC(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    LCBDyeCapCutEndCombo: function (identity) {
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Text2",
            dataValueField: "Text2",
            suggest: true,
            filter: "contains",
            change: function () {

                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    LCBDyeOpCutEndCombo: function (identity) {
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Text3",
            dataValueField: "Text3",
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    //Sizing
    SlasherPOCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllSlasherPO(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    SlasherSZCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllSlasherSZ(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    SlasherDOCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllSlasherDO(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    SlasherCPCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllSlasherCP(),
            suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    //YarnDyeing
    YarnDyeOPCombo: function (identity) {
        $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "ID",
            dataSource: HdlCommonManager.GetAllYarnDyeOP(),
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        });
    },
    //Weaving Production Master
    unitCombo: function (identity) {
        var objUnit = HdlCommonManager.GetAllUnit();
        var obj = new Object();
        obj.UnitName = "---Select---";
        obj.UnitCode = 0;
        objUnit.unshift(obj);
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "UnitName",
            dataValueField: "UnitCode",
            dataSource: objUnit,
            index: 0,
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");

    },
    datePicker: function (identity) {
        return $("#" + identity).kendoDatePicker({
            format: "dd-MMM-yyyy",
            value: new Date()
        }).data("kendoDatePicker");
    },
    shiftCombo: function (identity) {
        var objShift = HdlCommonManager.GetShiftData();
        var obj = new Object();
        obj.Shift = "---Select---";
        obj.ShiftNo = 0;
        objShift.unshift(obj);
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Shift",
            dataValueField: "ShiftNo",
            dataSource: objShift,
            index: 0,
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    weavingFloorCombo: function (identity) {
        var objFloor = HdlCommonManager.GetAllWeavingFloor();
        var obj = new Object();
        obj.UName = "---Select---";
        obj.UCode = 0;
        objFloor.unshift(obj);
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "UName",
            dataValueField: "UCode",
            dataSource: objFloor,
            index: 0,
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    weavingCaptainCombo: function (identity) {
        var objCP = HdlCommonManager.GetAllWeavingCP();
        var obj = new Object();
        obj.Name = "---Select---";
        obj.CardNo = 0;
        objCP.unshift(obj);
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: objCP,
            index: 0,
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    weavingPOCombo: function (identity) {
        var objPO = HdlCommonManager.GetAllWeavingPO();
        var obj = new Object();
        obj.Name = "---Select---";
        obj.CardNo = 0;
        objPO.unshift(obj);
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: objPO,
            index: 0,
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    weavingFitterCombo: function (identity) {
        var objFitterCP = HdlCommonManager.GetAllWeavingFitterCP();
        var obj = new Object();
        obj.Name = "---Select---";
        obj.CardNo = 0;
        objFitterCP.unshift(obj);
        return $("#" + identity).kendoComboBox({
            placeholder: "--- Select ---",
            dataTextField: "Name",
            dataValueField: "CardNo",
            dataSource: objFitterCP,
            index: 0,
            //suggest: true,
            filter: "contains",
            change: function () {
                AjaxManager.isValidItem(identity, true);
            }
        }).data("kendoComboBox");
    },
    //Generalized 
    comboBox: function (identity, option) {
        option = option ? option : {};
        option.filter = option.filter ? option.filter : "contains";
        option.placeholder = option.placeholder ? option.placeholder : "--- Select ---";
        option.change = option.change ? option.change : (function () {
            AjaxManager.isValidItem(identity, true);
        });
        option.dataSource = option.dataSource ? option.dataSource : [];
        return $("#" + identity).kendoComboBox(option).data("kendoComboBox");
    },
}