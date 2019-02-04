using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;


namespace BLL.HDL.InspectionFlaggin
{
   public class InspectionFlagginRepository :IInspectionFlagginRepository
    {
        InspectionFlagginDataService _service = new InspectionFlagginDataService();
        public List<Entities.HDL.Department> GetDept( )
        {
            return _service.GetDept();
        }
        public List<Entities.HDL.EmployeeInfo> GetOperator()
        {
            return _service.GetOperator();
        }
        public List<Entities.HDL.EmployeeInfo> GetPO()
        {
            return _service.GetPO();
        }
        public List<Entities.HDL.InspectionFlagginQuality> GetQuality()
        {
            return _service.GetQuality();
        }
        public string SaveMasterInfo(InspFlagginMaster objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveDetailInfo(InspFlagginDetail obj)
        {
            return _service.SaveDetailInfo(obj);
        }
        public GridEntity<InspFlagginMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.InspFlagginDetail> GetFlagginDetailByID(string ID)
        {
            return _service.GetFlagginDetailByID(ID);
        }
    }
}
