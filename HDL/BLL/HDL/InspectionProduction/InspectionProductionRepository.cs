using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.InspectionProduction
{
    public class InspectionProductionRepository : IInspectionProductionRepository
    {
        readonly InspectionProductionDataService _service = new InspectionProductionDataService();
        public List<TblStock21> GetProductionDetail(string masterID)
        {
            return _service.GetProductionDetail(masterID);
        }
        public List<TblStock22> GetOperatorProductionDetail(string masterID)
        {
            return _service.GetOperatorProductionDetail(masterID);
        }
        public GridEntity<TblStock11> GetSummary(GridOptions options, string from, string to)
        {
            return _service.GetSummary(options, from, to);
        }

        public List<SetInfoEntity> GetAllSetNo() { return _service.GetAllSetNo(); }
        public List<Style> GetAllStyleNo() { return _service.GetAllStyleNo(); }
        public List<ProdType> GetAllPType() { return _service.GetAllPType(); }
        public List<MachineEntity> GetAllFinishingMC() { return _service.GetAllFinishingMC(); }
        public List<tblDyeingInformation> GetAllFType() { return _service.GetAllFType(); }
        public List<EmployeeInfo> GetAllOperator() { return _service.GetAllOperator(); }
        public List<EmployeeInfo> GetAllCaptain() { return _service.GetAllCaptain(); }

        public TblStock11 SaveInspectionProductionMaster(TblStock11 master)
        {
            return _service.SaveInspectionProductionMaster(master);
        }
        public TblStock21 SaveInspectionProductionDetail(TblStock21 productionDetail)
        {
            return _service.SaveInspectionProductionDetail(productionDetail);
        }
        public TblStock22 SaveInspectionOperatorProductionDetail(TblStock22 operatorProductionDetail)
        {
            return _service.SaveInspectionOperatorProductionDetail(operatorProductionDetail);
        }
    }
}
