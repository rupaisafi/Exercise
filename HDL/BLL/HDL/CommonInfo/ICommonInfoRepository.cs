using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;
using Entities.HDL.Common;
using Entities.HDL.DTO;

namespace BLL.HDL.CommonInfo
{
    public interface ICommonInfoRepository
    {
        List<Unit> GetAllUnit();
        List<Customer> GetAllCustomer();
        List<OrderType> GetAllProdOrderType();
        List<OrderType> GetAllSalesOrderType();
        List<MachineInfo> GetAllMachineName(int gCode);
        List<ProdStatus> GetAllProdStatus();
        List<OrderType> GetAllOrderStatus();
        List<OrderType> GetAllMktStatus();
        List<OrderType> GetAllPrcStatus();
        Style GetStyleInformation(string styleCode);
        List<ProdType> GetAllProdType();
        List<IcType> GetAllIName();
        List<SNameInf> GetAllSName();
        List<IcType> GetAllINameDye();
        List<Selvedge> GetAllSelvedge();
        List<BankInfo> GetAllBank();
        List<BranchInfo> GetAllBranch();
        List<LcStatus> GetAllLcStatus();
        List<ImportType> GetAllImportType();
        List<ItemInfoEntity> GetAllItem();
        List<CurrencyInfo> GetAllCurrency();
        List<ImpLcInfo> GetAllLc();
        List<Company> GetAllCompany();
        List<PartialInfo> GetAllPartial();
        List<Department> GetAllDepartment();
        List<CottonTypeEntity> GetAllCottonType();
        List<SetInfoEntity> GetAllSetNo();
        List<ComboModel> GetAllWarpingSetNo();
        List<Entities.HDL.FabricType> GetFabricType();
        List<FinishType> GetFinishType();
        List<FinishRoute> GetFinishRoute();
        List<Grade> GetGradeData();
        List<Speciality> GetSpecialityData();
        List<CommonStatus> GetYesNoStatus();
        List<MachineInfo> GetAllMCName(string gCode);
        List<ShiftEntity> GetShiftData();
        List<EmployeeInfo> GetWarpingOperator();
        List<EmployeeInfo> GetWarpingCaptain();
        List<MachineInfo> GetAllDyeMCNo();
        List<Style> GetStyleByStyleCode(string styleCode);
        List<EmployeeInfo> GetAllDyeingEmploye();
        List<ItemType> GetAllReasonType();
        List<EmployeeInfo> GetAllEmployee(string deptNo, string cardNo);

        List<EmployeeInfo> GetAllRopeDyePO();
        List<EmployeeInfo> GetAllRopeDyeOP();
        List<EmployeeInfo> GetAllRopeDyeCM();
        List<EmployeeInfo> GetAllRopeDyeCP();

        List<MachineInfo> GetAllLCBMCNo();
        List<EmployeeInfo> GetAllLCBPO();
        List<EmployeeInfo> GetAllLCBOP();
        List<EmployeeInfo> GetAllLCBSV();
        List<EmployeeInfo> GetAllLCBQC();

        List<EmployeeInfo> GetAllSlasherPO();
        List<EmployeeInfo> GetAllSlasherSZ();
        List<EmployeeInfo> GetAllSlasherDO();
        List<EmployeeInfo> GetAllSlasherCP();
        List<ItemInfoEntity> GetAllChemical();
        List<Anonymous> GetAllDyeCapCutEnd(string setNo);
        //YarnDyeing
        List<EmployeeInfo> GetAllYarnDyeOP();
        List<Anonymous> GetAllYarnName(string setNo);
        //Weaving Production Master
        List<MachineEntity> GetAllWeavingFloor();
        List<EmployeeInfo> GetAllWeavingCP();
        List<EmployeeInfo> GetAllWeavingPO();
        List<EmployeeInfo> GetAllWeavingFitterCP();
        //Weaving Production
        List<MachineEntity> GetAllWeavingMachine(string uCode);
        //TblQCFault
        List<QCFault> GetAllQCFault();
        //TblMachine
        List<MachineEntity> GetAllMachine();
        List<DyeingProdInfo> GetAllDyeingSetNo();
        List<SSNoModel> GetAllDyeingSSNo(string setNo);
        List<TblType> GetAllType();

    }
}
