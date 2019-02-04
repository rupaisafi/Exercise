using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL.HDL.CommonInfo;
using DBManager;
using Entities.HDL;

namespace HDLERP.Controllers
{
    public class CommonController : Controller
    {
        ICommonInfoRepository _repository = new CommonInfoService();
        public JsonResult GetAllCustomer()
        {
            var res = _repository.GetAllCustomer();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllUnit()
        {
            var res = _repository.GetAllUnit();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProdOrderType()
        {
            var res = _repository.GetAllProdOrderType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSalesOrderType()
        {
            var res = _repository.GetAllSalesOrderType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllMachineName(int gCode = 2)
        {
            var res = _repository.GetAllMachineName(gCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProdStatus()
        {
            var res = _repository.GetAllProdStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllOrderStatus()
        {
            var res = _repository.GetAllOrderStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllMktStatus()
        {
            var res = _repository.GetAllMktStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllPrcStatus()
        {
            var res = _repository.GetAllPrcStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleInformation(string styleCode)
        {
            var res = _repository.GetStyleInformation(styleCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProdType()
        {
            var res = _repository.GetAllProdType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllIName()
        {
            var res = _repository.GetAllIName();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSName()
        {
            var res = _repository.GetAllSName();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllINameDye()
        {
            var res = _repository.GetAllINameDye();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSelvedge()
        {
            var res = _repository.GetAllSelvedge();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllBank()
        {
            var res = _repository.GetAllBank();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllBranch()
        {
            var res = _repository.GetAllBranch();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLcStatus()
        {
            var res = _repository.GetAllLcStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllImportType()
        {
            var res = _repository.GetAllImportType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCurrency()
        {
            var res = _repository.GetAllCurrency();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllItem()
        {
            var res = _repository.GetAllItem();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCompany()
        {
            var res = _repository.GetAllCompany();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLc()
        {
            var res = _repository.GetAllLc();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllPartial()
        {
            var res = _repository.GetAllPartial();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDepartment()
        {
            var res = _repository.GetAllDepartment();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCottonType()
        {
            var res = _repository.GetAllCottonType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSetNo()
        {
            var res = _repository.GetAllSetNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWarpingSetNo()
        {
            var res = _repository.GetAllWarpingSetNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFabricType()
        {
            var res = _repository.GetFabricType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFinishType()
        {
            var res = _repository.GetFinishType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFinishRoute()
        {
            var res = _repository.GetFinishRoute();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGradeData()
        {
            var res = _repository.GetGradeData();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSpecialityData()
        {
            var res = _repository.GetSpecialityData();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetYesNoStatus()
        {
            var res = _repository.GetYesNoStatus();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllMCName(string gCode)
        {
            var res = _repository.GetAllMCName(gCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetShiftData()
        {
            var res = _repository.GetShiftData();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetWarpingOperator()
        {
            var res = _repository.GetWarpingOperator();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetWarpingCaptain()
        {
            var res = _repository.GetWarpingCaptain();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeMCNo()
        {
            var res = _repository.GetAllDyeMCNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleByStyleCode(string styleCode)
        {
            var res = _repository.GetStyleByStyleCode(styleCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeingEmploye()
        {
            var res = _repository.GetAllDyeingEmploye();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllReasonType()
        {
            var res = _repository.GetAllReasonType();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllEmployee(string deptNo, string cardNo)
        {
            var res = _repository.GetAllEmployee(deptNo, cardNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllRopeDyePO()
        {
            var res = _repository.GetAllRopeDyePO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllRopeDyeOP()
        {
            var res = _repository.GetAllRopeDyeOP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllRopeDyeCM()
        {
            var res = _repository.GetAllRopeDyeCM();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllRopeDyeCP()
        {
            var res = _repository.GetAllRopeDyeCP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllLCBMCNo()
        {
            var res = _repository.GetAllLCBMCNo();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLCBPO()
        {
            var res = _repository.GetAllLCBPO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLCBOP()
        {
            var res = _repository.GetAllLCBOP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLCBSV()
        {
            var res = _repository.GetAllLCBSV();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllLCBQC()
        {
            var res = _repository.GetAllLCBQC();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllSlasherPO()
        {
            var res = _repository.GetAllSlasherPO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSlasherSZ()
        {
            var res = _repository.GetAllSlasherSZ();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSlasherDO()
        {
            var res = _repository.GetAllSlasherDO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSlasherCP()
        {
            var res = _repository.GetAllSlasherCP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllChemical()
        {
            var res = _repository.GetAllChemical();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDyeCapCutEnd(string setNo)
        {
            var res = _repository.GetAllDyeCapCutEnd(setNo);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllYarnDyeOP()
        {
            var res = _repository.GetAllYarnDyeOP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllYarnName(GridOptions option)
        {
            var res = _repository.GetAllYarnName(option.filter.Filters[0].Value);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        //Weaving Production Master
        public JsonResult GetAllWeavingFloor()
        {
            var res = _repository.GetAllWeavingFloor();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingCP()
        {
            var res = _repository.GetAllWeavingCP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingPO()
        {
            var res = _repository.GetAllWeavingPO();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWeavingFitterCP()
        {
            var res = _repository.GetAllWeavingFitterCP();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        //Generalized
        public JsonResult GetAllWeavingMachine(string uCode)
        {
            var res = _repository.GetAllWeavingMachine(uCode);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllQCFault()
        {
            var res = _repository.GetAllQCFault();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}