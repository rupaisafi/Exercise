using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.HDL.InspectionNonDispatch
{
    public interface IInspectionNonDispatchRepository
    {
        string SaveMasterInfo(InspNonDispatchMaster objMaster);
        string SaveDetailInfo(InspNonDispatchDetail obj);

        GridEntity<Entities.HDL.InspNonDispatchMaster> GetSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.InspNonDispatchDetail> GetDetailByID(string ID);
        List<Entities.HDL.SetInfoEntity> GetPlanningSetNo();
        List<Entities.HDL.InspDyeInfo> GetDyeingFault();
        List<Entities.HDL.EmployeeInfo> GetPO();
        List<Entities.HDL.Department> GetDept();
    }
}
