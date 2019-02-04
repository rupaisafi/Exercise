using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;


namespace BLL.HDL.FabRejRefin
{
    public class FabRejRefinRepository :IFabRejRefinRepository
    {
        FabRejRefinDataService _service = new FabRejRefinDataService();
        public List<Entities.HDL.MachineEntity> GetAllMachine()
        {
            return _service.GetAllMachine();
        }
        
        public List<Entities.HDL.InspDyeInfo> GetFTYPE()
        {
            return _service.GetFTYPE();
        }
        public List<Entities.HDL.InspDyeInfo> GetDyeInfo()
        {
            return _service.GetDyeInfo();
        }
        public List<Entities.HDL.MachineEntity> GetTCode()
        {
            return _service.GetTCode();
        }
        public List<Entities.HDL.RefinishFault> GetFTYPERefinish()
        {
            return _service.GetFTYPERefinish();
        }
        public List<Entities.HDL.EmployeeInfo> GetAllPO()
        {
            return _service.GetAllPO();
        }
        public List<Entities.HDL.Department> GetAllChqDCode()
        {
            return _service.GetAllChqDCode();
        }
        public string SaveMasterInfo(InspRejectionMaster objMaster)
        {
            return _service.SaveMasterInfo(objMaster);
        }
        public string SaveRecInfo(InspRejectionDetail objRec)
        {
            return _service.SaveRecInfo(objRec);
        }
        public string SaveReFinishInfo(InspRefinishDetail objRe)
        {
            return _service.SaveReFinishInfo(objRe);
        }
        public GridEntity<InspRejectionMaster> GetSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _service.GetSummary(options, dateFrom, dateTo);
        }
        public List<Entities.HDL.InspRejectionDetail> GetRejectionByID(string ID)
        {
            return _service.GetRejectionByID(ID);
        }
        public List<Entities.HDL.InspRefinishDetail> GetRefinishByID(string ID)
        {
            return _service.GetRefinishByID(ID);
        }
    }
}
