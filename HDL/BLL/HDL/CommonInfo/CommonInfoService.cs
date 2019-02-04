using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using Entities.HDL;
using Entities.HDL.Common;
using Entities.HDL.DTO;

namespace BLL.HDL.CommonInfo
{
    public class CommonInfoService : ICommonInfoRepository
    {
        CommonInfoDataService _repository = new CommonInfoDataService();
        public List<Unit> GetAllUnit()
        {
            return _repository.GetAllUnit();
        }
        public List<Customer> GetAllCustomer()
        {
            return _repository.GetAllCustomer();
        }
        public List<OrderType> GetAllProdOrderType()
        {
            return _repository.GetAllProdOrderType();
        }
        public List<OrderType> GetAllSalesOrderType()
        {
            return _repository.GetAllSalesOrderType();
        }
        public List<MachineInfo> GetAllMachineName(int gCode)
        {
            return _repository.GetAllMachineName(gCode);
        }
        public List<ProdStatus> GetAllProdStatus()
        {
            return _repository.GetAllProdStatus();
        }
        public List<OrderType> GetAllOrderStatus()
        {
            return _repository.GetAllOrderStatus();
        }
        public List<OrderType> GetAllMktStatus()
        {
            return _repository.GetAllMktStatus();
        }
        public List<OrderType> GetAllPrcStatus()
        {
            return _repository.GetAllPrcStatus();
        }
        public Style GetStyleInformation(string styleCode)
        {
            return _repository.GetStyleInformation(styleCode);
        }
        public List<ProdType> GetAllProdType()
        {
            return _repository.GetAllProdType();
        }
        public List<IcType> GetAllIName()
        {
            return _repository.GetAllIName();
        }
        public List<SNameInf> GetAllSName()
        {
            return _repository.GetAllSName();
        }
        public List<IcType> GetAllINameDye()
        {
            return _repository.GetAllINameDye();
        }
        public List<Selvedge> GetAllSelvedge()
        {
            return _repository.GetAllSelvedge();
        }
        public List<BankInfo> GetAllBank()
        {
            return _repository.GetAllBank();
        }
        public List<BranchInfo> GetAllBranch()
        {
            return _repository.GetAllBranch();
        }
        public List<LcStatus> GetAllLcStatus()
        {
            return _repository.GetAllLcStatus();
        }
        public List<ImportType> GetAllImportType()
        {
            return _repository.GetAllImportType();
        }
        public List<ItemInfoEntity> GetAllItem()
        {
            return _repository.GetAllItem();
        }
        public List<CurrencyInfo> GetAllCurrency()
        {
            return _repository.GetAllCurrency();
        }
        public List<ImpLcInfo> GetAllLc()
        {
            return _repository.GetAllLc();
        }
        public List<Company> GetAllCompany()
        {
            return _repository.GetAllCompany();
        }
        public List<PartialInfo> GetAllPartial()
        {
            return _repository.GetAllPartial();
        }
        public List<Department> GetAllDepartment()
        {
            return _repository.GetAllDepartment();
        }
        public List<CottonTypeEntity> GetAllCottonType()
        {
            return _repository.GetAllCottonType();
        }
        public List<SetInfoEntity> GetAllSetNo()
        {
            return _repository.GetAllSetNo();
        }
        public List<ComboModel> GetAllWarpingSetNo()
        {
            return _repository.GetAllWarpingSetNo();
        }
        public List<Entities.HDL.FabricType> GetFabricType()
        {
            return _repository.GetFabricType();
        }
        public List<FinishType> GetFinishType()
        {
            return _repository.GetFinishType();
        }
        public List<FinishRoute> GetFinishRoute()
        {
            return _repository.GetFinishRoute();
        }
        public List<Grade> GetGradeData()
        {
            return _repository.GetGradeData();
        }
        public List<Speciality> GetSpecialityData()
        {
            return _repository.GetSpecialityData();
        }
        public List<CommonStatus> GetYesNoStatus()
        {
            return _repository.GetYesNoStatus();
        }
        public List<MachineInfo> GetAllMCName(string gCode)
        {
            return _repository.GetAllMCName(gCode);
        }
        public List<ShiftEntity> GetShiftData()
        {
            return _repository.GetShiftData();
        }
        public List<EmployeeInfo> GetWarpingOperator()
        {
            return _repository.GetWarpingOperator();
        }
        public List<EmployeeInfo> GetWarpingCaptain()
        {
            return _repository.GetWarpingCaptain();
        }
        public List<MachineInfo> GetAllDyeMCNo()
        {
            return _repository.GetAllDyeMCNo();
        }
        public List<Style> GetStyleByStyleCode(string styleCode)
        {
            return _repository.GetStyleByStyleCode(styleCode);
        }
        public List<EmployeeInfo> GetAllDyeingEmploye()
        {
            return _repository.GetAllDyeingEmploye();
        }
        public List<ItemType> GetAllReasonType()
        {
            return _repository.GetAllReasonType();
        }
        public List<EmployeeInfo> GetAllEmployee(string deptNo, string cardNo)
        {
            return _repository.GetAllEmployee(deptNo, cardNo);
        }

        public List<EmployeeInfo> GetAllRopeDyePO()
        {
            return _repository.GetAllRopeDyePO();
        }
        public List<EmployeeInfo> GetAllRopeDyeOP()
        {
            return _repository.GetAllRopeDyeOP();
        }
        public List<EmployeeInfo> GetAllRopeDyeCM()
        {
            return _repository.GetAllRopeDyeCM();
        }
        public List<EmployeeInfo> GetAllRopeDyeCP()
        {
            return _repository.GetAllRopeDyeCP();
        }

        public List<MachineInfo> GetAllLCBMCNo()
        {
            return _repository.GetAllLCBMCNo();
        }
        public List<EmployeeInfo> GetAllLCBPO()
        {
            return _repository.GetAllLCBPO();
        }
        public List<EmployeeInfo> GetAllLCBOP()
        {
            return _repository.GetAllLCBOP();
        }
        public List<EmployeeInfo> GetAllLCBSV()
        {
            return _repository.GetAllLCBSV();
        }
        public List<EmployeeInfo> GetAllLCBQC()
        {
            return _repository.GetAllLCBQC();
        }

        public List<EmployeeInfo> GetAllSlasherPO()
        {
            return _repository.GetAllSlasherPO();
        }
        public List<EmployeeInfo> GetAllSlasherSZ()
        {
            return _repository.GetAllSlasherSZ();
        }
        public List<EmployeeInfo> GetAllSlasherDO()
        {
            return _repository.GetAllSlasherDO();
        }
        public List<EmployeeInfo> GetAllSlasherCP()
        {
            return _repository.GetAllSlasherCP();
        }

        public List<ItemInfoEntity> GetAllChemical()
        {
            return _repository.GetAllChemical();
        }

        public List<Anonymous> GetAllDyeCapCutEnd(string setNo)
        {
            return _repository.GetAllDyeCapCutEnd(setNo);
        }
        public List<EmployeeInfo> GetAllYarnDyeOP()
        {
            return _repository.GetAllYarnDyeOP();
        }
        public List<Anonymous> GetAllYarnName(string setNo)
        {
            return _repository.GetAllYarnName(setNo);
        }
        //Weaving Production Master
        public List<MachineEntity> GetAllWeavingFloor()
        {
            return _repository.GetAllWeavingFloor();
        }
        public List<EmployeeInfo> GetAllWeavingCP()
        {
            return _repository.GetAllWeavingCP();
        }
        public List<EmployeeInfo> GetAllWeavingPO()
        {
            return _repository.GetAllWeavingPO();
        }
        public List<EmployeeInfo> GetAllWeavingFitterCP()
        {
            return _repository.GetAllWeavingFitterCP();
        }
        //Weaving Production
        public List<MachineEntity> GetAllWeavingMachine(string uCode) {
            return _repository.GetAllWeavingMachine(uCode);
        }

        public List<QCFault> GetAllQCFault()
        {
            return _repository.GetAllQCFault();
        }
        public List<MachineEntity> GetAllMachine()
        {
            return _repository.GetAllMachine();
        }
        public List<DyeingProdInfo> GetAllDyeingSetNo()
        {
            return _repository.GetAllDyeingSetNo();
        }
        public List<SSNoModel> GetAllDyeingSSNo(string setNo)
        {
            return _repository.GetAllDyeingSSNo(setNo);
        }
        public List<TblType> GetAllType()
        {
            return _repository.GetAllType().ToList();
        }
    }
}
