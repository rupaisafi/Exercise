using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;


namespace BLL.HDL.InspectionNonDispatch
{
    public class InspectionNonDispatchRepository : IInspectionNonDispatchRepository
    {
        InspectionNonDispatchDataService _service = new InspectionNonDispatchDataService();
        public string SaveMasterInfo(InspNonDispatchMaster objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveDetailInfo(InspNonDispatchDetail obj)
        {
            return _service.SaveDetailInfo(obj);
        }

        public GridEntity<InspNonDispatchMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.InspNonDispatchDetail> GetDetailByID(string ID)
        {
            return _service.GetDetailByID(ID);
        }
        public List<Entities.HDL.SetInfoEntity> GetPlanningSetNo()
        {
            return _service.GetPlanningSetNo();
        }
        public List<Entities.HDL.InspDyeInfo> GetDyeingFault()
        {
            return _service.GetDyeingFault();
        }
        public List<Entities.HDL.EmployeeInfo> GetPO()
        {
            return _service.GetPO();
        }
        public List<Entities.HDL.Department> GetDept()
        {
            return _service.GetDept();
        }
    }
}


