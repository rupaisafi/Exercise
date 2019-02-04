using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.RejectionControl
{
    public interface IRejectionControlRepository
    {
        List<tblDyeingInformation> GetAllFaultType();
        List<EmployeeInfo> GetAllOperator(string setNo);
        List<EmployeeInfo> GetAllCaptain(string setNo);

        List<EmployeeInfo> GetAllDyeingPO();
        List<EmployeeInfo> GetAllDyeingSizer();
        List<TblEmployeeCaptain> GetAllDyeingCaptain();
        List<EmployeeInfo> GetAllDyeingOP(string setNo,string ssNo);

        List<EmployeeInfo> GetAllWeavingOP(string loomName, string weaveDate, string shiftCode);
        List<EmployeeInfo> GetAllWeavingPO(string loomName, string weaveDate, string shiftCode);
        List<EmployeeInfo> GetAllWeavingLineman(string loomName, string weaveDate, string shiftCode);
        List<EmployeeInfo> GetAllWeavingFitter(string loomName, string weaveDate, string shiftCode);
        List<EmployeeInfo> GetAllWeavingCaptain(string loomName, string weaveDate, string shiftCode);
        List<EmployeeInfo> GetAllWeavingInFitter(string loomName, string weaveDate, string shiftCode);

        List<MachineEntity> GetAllFinishingMC();
        List<EmployeeInfo> GetAllFinishingOperator(string setNo);
        List<EmployeeInfo> GetAllFinishingCaptain(string setNo);

        List<EmployeeInfo> GetAllDyeStopRopeOperator(string setNo);
        List<EmployeeInfo> GetAllDyeStopRopeCaptain(string setNo);

        List<TblInsFaltDetail> GetWarpingDetail(string masterID);
        List<TblInsFaltDetail> GetDyeingDetail(string masterID);
        List<TblInsFaltDetail> GetWeavingDetail(string masterID);
        List<TblInsFaltDetail> GetFinishingDetail(string masterID);
        List<TblInsFaltDetail> GetDyeStopRopeDetail(string masterID);
        GridEntity<TblInsFalt> GetSummary(GridOptions options, string from, string to);
        TblInsFalt SaveInspectionFaultMaster(TblInsFalt master);
        TblInsFaltDetail SaveInspectionFaultDetail(TblInsFaltDetail detail);

    }
}
 