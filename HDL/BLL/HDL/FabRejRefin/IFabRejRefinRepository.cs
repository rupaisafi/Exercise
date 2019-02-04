using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BLL.HDL.FabRejRefin
{
   public interface IFabRejRefinRepository
    {
        List<Entities.HDL.MachineEntity> GetAllMachine();
        List<Entities.HDL.InspDyeInfo> GetFTYPE();
        List<Entities.HDL.InspDyeInfo> GetDyeInfo(); 
        List<Entities.HDL.MachineEntity> GetTCode(); 
        List<Entities.HDL.RefinishFault> GetFTYPERefinish(); 
        List<Entities.HDL.EmployeeInfo> GetAllPO();
        List<Entities.HDL.Department> GetAllChqDCode();
        string SaveMasterInfo(Entities.HDL.InspRejectionMaster objMaster);
        string SaveRecInfo(Entities.HDL.InspRejectionDetail objRec);
        string SaveReFinishInfo(Entities.HDL.InspRefinishDetail objRe);
        GridEntity<Entities.HDL.InspRejectionMaster> GetSummary(GridOptions options, string dateFrom, string dateTo);
        List<Entities.HDL.InspRejectionDetail> GetRejectionByID(string ID);
        List<Entities.HDL.InspRefinishDetail> GetRefinishByID(string ID);
    }
}
