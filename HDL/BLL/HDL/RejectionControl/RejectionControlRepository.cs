using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.RejectionControl
{
    public class RejectionControlRepository : IRejectionControlRepository
    {
        readonly RejectionControlDataService _service = new RejectionControlDataService();
        public GridEntity<TblInsFalt> GetSummary(GridOptions options, string from, string to)
        {
            return _service.GetSummary(options, from, to);
        }
        public List<tblDyeingInformation> GetAllFaultType()
        {
            return _service.GetAllFaultType();
        }
        public List<EmployeeInfo> GetAllOperator(string setNo)
        {
            return _service.GetAllOperator(setNo);
        }
        public List<EmployeeInfo> GetAllCaptain(string setNo)
        {
            return _service.GetAllCaptain(setNo);
        }

        public List<EmployeeInfo> GetAllDyeingPO()
        {
            return _service.GetAllDyeingPO();
        }
        public List<EmployeeInfo> GetAllDyeingSizer()
        {
            return _service.GetAllDyeingSizer();
        }
        public List<TblEmployeeCaptain> GetAllDyeingCaptain()
        {
            return _service.GetAllDyeingCaptain();
        }
        public List<EmployeeInfo> GetAllDyeingOP(string setNo, string ssNo)
        {
            return _service.GetAllDyeingOP(setNo,ssNo);
        }

        public List<EmployeeInfo> GetAllWeavingOP(string loomName, string weaveDate, string shiftCode)
        {
            return _service.GetAllWeavingOP(loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingPO(string loomName, string weaveDate, string shiftCode)
        {
            return _service.GetAllWeavingPO(loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingLineman(string loomName, string weaveDate, string shiftCode)
        {
            return _service.GetAllWeavingLineman(loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingFitter(string loomName, string weaveDate, string shiftCode)
        {
            return _service.GetAllWeavingFitter(loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingCaptain(string loomName, string weaveDate, string shiftCode)
        {
            return _service.GetAllWeavingCaptain(loomName, weaveDate, shiftCode);
        }
        public List<EmployeeInfo> GetAllWeavingInFitter(string loomName, string weaveDate, string shiftCode)
        {
            return _service.GetAllWeavingInFitter(loomName, weaveDate, shiftCode);
        }

        public List<EmployeeInfo> GetAllDyeStopRopeOperator(string setNo)
        {
            return _service.GetAllDyeStopRopeOperator(setNo);
        }
        public List<EmployeeInfo> GetAllDyeStopRopeCaptain(string setNo)
        {
            return _service.GetAllDyeStopRopeCaptain(setNo);
        }

        public List<MachineEntity> GetAllFinishingMC()
        {
            return _service.GetAllFinishingMC();
        }
        public List<EmployeeInfo> GetAllFinishingOperator(string setNo)
        {
            return _service.GetAllFinishingOperator(setNo);
        }
        public List<EmployeeInfo> GetAllFinishingCaptain(string setNo)
        {
            return _service.GetAllFinishingCaptain(setNo);
        }

        public List<TblInsFaltDetail> GetWarpingDetail(string masterID)
        {
            return _service.GetWarpingDetail(masterID);
        }
        public List<TblInsFaltDetail> GetDyeingDetail(string masterID)
        {
            return _service.GetDyeingDetail(masterID);
        }
        public List<TblInsFaltDetail> GetWeavingDetail(string masterID)
        {
            return _service.GetWeavingDetail(masterID);
        }
        public List<TblInsFaltDetail> GetFinishingDetail(string masterID)
        {
            return _service.GetFinishingDetail(masterID);
        }
        public List<TblInsFaltDetail> GetDyeStopRopeDetail(string masterID)
        {
            return _service.GetDyeStopRopeDetail(masterID);
        }
        public TblInsFalt SaveInspectionFaultMaster(TblInsFalt master)
        {
            return _service.SaveInspectionFaultMaster(master);
        }
        public TblInsFaltDetail SaveInspectionFaultDetail(TblInsFaltDetail detail)
        {
            return _service.SaveInspectionFaultDetail(detail);
        }
    }
}
