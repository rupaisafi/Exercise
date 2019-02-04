using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.InspectionProduction
{
    public interface IInspectionProductionRepository
    {
        List<TblStock21> GetProductionDetail(string masterID);
        List<TblStock22> GetOperatorProductionDetail(string masterID);
        GridEntity<TblStock11> GetSummary(GridOptions options, string from, string to);
        
        List<Style> GetAllStyleNo();
        List<ProdType> GetAllPType();
        List<SetInfoEntity> GetAllSetNo();
        List<EmployeeInfo> GetAllCaptain();
        List<EmployeeInfo> GetAllOperator();
        List<MachineEntity> GetAllFinishingMC();
        List<tblDyeingInformation> GetAllFType();

        TblStock11 SaveInspectionProductionMaster(TblStock11 master);
        TblStock21 SaveInspectionProductionDetail(TblStock21 productionDetail);
        TblStock22 SaveInspectionOperatorProductionDetail(TblStock22 operatorProductionDetail);
    }
}
