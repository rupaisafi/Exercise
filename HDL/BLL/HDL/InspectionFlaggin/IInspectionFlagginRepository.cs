using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.InspectionFlaggin
{
   public interface IInspectionFlagginRepository
    {
        List<Entities.HDL.Department> GetDept();
        List<Entities.HDL.EmployeeInfo> GetOperator();
        List<Entities.HDL.EmployeeInfo> GetPO();
        List<Entities.HDL.InspectionFlagginQuality> GetQuality();
        string SaveMasterInfo(Entities.HDL.InspFlagginMaster objMaster);
        string SaveDetailInfo(Entities.HDL.InspFlagginDetail obj);
        GridEntity<Entities.HDL.InspFlagginMaster> GetSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.InspFlagginDetail> GetFlagginDetailByID(string ID);
    }
}
