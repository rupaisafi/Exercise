using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using Entities.HDL;
using Entities.HDL.Common;
using Entities.HDL.DTO;

namespace DAL.HDL.DataService
{
    public class CommonInfoDataService
    {

        readonly CommonDataService _service = new CommonDataService();
        public List<Unit> GetAllUnit()
        {
            return _service.Select_Data_List<Unit>("sp_select_common_info", "get_all_unit");
        }
        public List<Customer> GetAllCustomer()
        {
            return _service.Select_Data_List<Customer>("sp_select_common_info", "get_all_customer");
        }
        public List<OrderType> GetAllProdOrderType()
        {
            return _service.Select_Data_List<OrderType>("sp_select_common_info", "get_all_prod_order_type");
        }
        public List<OrderType> GetAllSalesOrderType()
        {
            return _service.Select_Data_List<OrderType>("sp_select_common_info", "get_all_sales_order_type");
        }
        public List<MachineInfo> GetAllMachineName(int gCode)
        {
            return _service.Select_Data_List<MachineInfo>("sp_select_common_info", "get_all_machine_name", gCode.ToString());
        }
        public List<ProdStatus> GetAllProdStatus()
        {
            return _service.Select_Data_List<ProdStatus>("sp_select_common_info", "get_all_prod_status");
        }
        public List<OrderType> GetAllOrderStatus()
        {
            return _service.Select_Data_List<OrderType>("sp_select_common_info", "get_all_order_status");
        }
        public List<OrderType> GetAllMktStatus()
        {
            return _service.Select_Data_List<OrderType>("sp_select_common_info", "get_all_mkt_status");
        }
        public List<OrderType> GetAllPrcStatus()
        {
            return _service.Select_Data_List<OrderType>("sp_select_common_info", "get_all_prc_status");
        }
        public Style GetStyleInformation(string styleCode)
        {
            return _service.Select_Data_List<Style>("sp_select_style_info", "get_style_info_by_id", styleCode).SingleOrDefault();
        }
        public List<ProdType> GetAllProdType()
        {
            return _service.Select_Data_List<ProdType>("sp_select_common_info", "get_all_prod_type");
        }
        public List<IcType> GetAllIName()
        {
            return _service.Select_Data_List<IcType>("sp_select_common_info", "get_all_IName_data");
        }
        public List<SNameInf> GetAllSName()
        {
            return _service.Select_Data_List<SNameInf>("sp_select_common_info", "get_all_SName_data");
        }
        public List<IcType> GetAllINameDye()
        {
            return _service.Select_Data_List<IcType>("sp_select_common_info", "get_all_IName_Dye_data");
        }
        public List<Selvedge> GetAllSelvedge()
        {
            return _service.Select_Data_List<Selvedge>("sp_select_common_info", "get_all_selvedge_data");
        }
        public List<BankInfo> GetAllBank()
        {
            return _service.Select_Data_List<BankInfo>("sp_select_common_info", "get_all_bank");
        }
        public List<BranchInfo> GetAllBranch()
        {
            return _service.Select_Data_List<BranchInfo>("sp_select_common_info", "get_all_branch");
        }
        public List<LcStatus> GetAllLcStatus()
        {
            return _service.Select_Data_List<LcStatus>("sp_select_common_info", "get_all_lc_status");
        }
        public List<ImportType> GetAllImportType()
        {
            return _service.Select_Data_List<ImportType>("sp_select_common_info", "get_all_import_type");
        }
        public List<ItemInfoEntity> GetAllItem()
        {
            return _service.Select_Data_List<ItemInfoEntity>("sp_select_common_info", "get_all_item");
        }
        public List<CurrencyInfo> GetAllCurrency()
        {
            return _service.Select_Data_List<CurrencyInfo>("sp_select_common_info", "get_all_currency");
        }
        public List<ImpLcInfo> GetAllLc()
        {
            return _service.Select_Data_List<ImpLcInfo>("sp_select_common_info", "get_all_Lc");
        }
        public List<Company> GetAllCompany()
        {
            return _service.Select_Data_List<Company>("sp_select_common_info", "get_all_company");
        }
        public List<PartialInfo> GetAllPartial()
        {
            return _service.Select_Data_List<PartialInfo>("sp_select_common_info", "get_all_Partial");
        }
        public List<Department> GetAllDepartment()
        {
            return _service.Select_Data_List<Department>("sp_select_common_info", "get_All_Department");
        }
        public List<CottonTypeEntity> GetAllCottonType()
        {
            return _service.Select_Data_List<CottonTypeEntity>("sp_select_common_info", "get_All_Cotton_Type");
        }
        public List<SetInfoEntity> GetAllSetNo()
        {
            return _service.Select_Data_List<SetInfoEntity>("sp_select_common_info", "get_All_SetNo");
        }
        public List<ComboModel> GetAllWarpingSetNo()
        {
            return _service.Select_Data_List<ComboModel>("sp_select_common_info", "get_All_Warping_SetNo");
        }
        public List<FabricType> GetFabricType()
        {
            return _service.Select_Data_List<FabricType>("sp_select_common_info", "get_All_fabric_type");
        }
        public List<FinishType> GetFinishType()
        {
            return _service.Select_Data_List<FinishType>("sp_select_common_info", "get_All_finish_type");
        }
        public List<FinishRoute> GetFinishRoute()
        {
            return _service.Select_Data_List<FinishRoute>("sp_select_common_info", "get_all_finish_route");
        }
        public List<Grade> GetGradeData()
        {
            return _service.Select_Data_List<Grade>("sp_select_common_info", "get_all_gread");
        }
        public List<Speciality> GetSpecialityData()
        {
            return _service.Select_Data_List<Speciality>("sp_select_common_info", "get_all_speciality");
        }
        public List<CommonStatus> GetYesNoStatus()
        {
            return _service.Select_Data_List<CommonStatus>("sp_select_common_info", "get_all_status");
        }
        public List<MachineInfo> GetAllMCName(string gCode)
        {
            return _service.Select_Data_List<MachineInfo>("sp_select_common_info", "get_all_McName", gCode);
        }
        public List<ShiftEntity> GetShiftData()
        {
            return _service.Select_Data_List<ShiftEntity>("sp_select_common_info", "get_all_Shift");
        }
        public List<EmployeeInfo> GetWarpingOperator()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_common_info", "get_all_Operator_Warping");
        }
        public List<EmployeeInfo> GetWarpingCaptain()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_common_info", "get_all_Captain_Warping");
        }
        public List<MachineInfo> GetAllDyeMCNo()
        {
            return _service.Select_Data_List<MachineInfo>("sp_select_common_info", "get_all_dye_MCNo");
        }
        public List<Style> GetStyleByStyleCode(string styleCode)
        {
            return _service.Select_Data_List<Style>("sp_select_common_info", "get_all_style_info", styleCode);
        }
        public List<EmployeeInfo> GetAllDyeingEmploye()
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_common_info", "get_all_employee_Dyeing");
        }
        public List<ItemType> GetAllReasonType()
        {
            return _service.Select_Data_List<ItemType>("sp_select_common_info", "get_all_item_type");
        }
        public List<EmployeeInfo> GetAllEmployee(string deptNo, string cardNo)
        {
            return _service.Select_Data_List<EmployeeInfo>("sp_select_common_info", "get_all_employee", deptNo, cardNo);
        }

        public List<EmployeeInfo> GetAllRopeDyePO()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_ROPE_DYE_PO");
        }
        public List<EmployeeInfo> GetAllRopeDyeOP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_ROPE_DYE_OP");
        }
        public List<EmployeeInfo> GetAllRopeDyeCM()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_ROPE_DYE_CM");
        }
        public List<EmployeeInfo> GetAllRopeDyeCP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_ROPE_DYE_CP");
        }

        public List<MachineInfo> GetAllLCBMCNo()
        {
            return _service.Select_Data_List<MachineInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_LCB_MC_NO");
        }
        public List<EmployeeInfo> GetAllLCBPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_LCB_PO");
        }
        public List<EmployeeInfo> GetAllLCBOP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_LCB_OP");
        }
        public List<EmployeeInfo> GetAllLCBSV()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_LCB_SV");
        }
        public List<EmployeeInfo> GetAllLCBQC()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_LCB_QC");
        }

        public List<EmployeeInfo> GetAllSlasherPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_SLASHER_PO");
        }
        public List<EmployeeInfo> GetAllSlasherSZ()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_SLASHER_SZ");
        }
        public List<EmployeeInfo> GetAllSlasherDO()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_SLASHER_DO");
        }
        public List<EmployeeInfo> GetAllSlasherCP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_SLASHER_CP");
        }

        public List<ItemInfoEntity> GetAllChemical()
        {
            return _service.Select_Data_List<ItemInfoEntity>("SP_SELECT_COMMON_INFO", "GET_ALL_CHEMICAL");
        }
        public List<Anonymous> GetAllDyeCapCutEnd(string setNo)
        {
            return _service.Select_Data_List<Anonymous>("SP_SELECT_COMMON_INFO", "GET_DYE_CAP_CUT_END", setNo).ToList();
        }
        public List<EmployeeInfo> GetAllYarnDyeOP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_YARN_DYE_OP");
        }
        public List<Anonymous> GetAllYarnName(string setNo)
        {
            return _service.Select_Data_List<Anonymous>("SP_SELECT_COMMON_INFO", "GET_ALL_YARN_Name", setNo).ToList();
        }
        //Weaving Production Master
        public List<MachineEntity> GetAllWeavingFloor()
        {
            return _service.Select_Data_List<MachineEntity>("SP_SELECT_COMMON_INFO", "GET_ALL_WEAVING_FLOOR").ToList();
        }
        public List<EmployeeInfo> GetAllWeavingCP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_WEAVING_CAPTAIN");
        }
        public List<EmployeeInfo> GetAllWeavingPO()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_WEAVING_PO").ToList();
        }
        public List<EmployeeInfo> GetAllWeavingFitterCP()
        {
            return _service.Select_Data_List<EmployeeInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_WEAVING_FITTER_CAPTAIN").ToList();
        }
        //Generalized
        public List<MachineEntity> GetAllWeavingMachine(string uCode)
        {
            return _service.Select_Data_List<MachineEntity>("SP_SELECT_COMMON_INFO", "GET_ALL_WEAVING_MACHINE", uCode).ToList();
        }
        public List<QCFault> GetAllQCFault()
        {
            return _service.Select_Data_List<QCFault>("SP_SELECT_COMMON_INFO", "GET_ALL_QC_FAULT").ToList();
        }
        public List<MachineEntity> GetAllMachine()
        {
            return _service.Select_Data_List<MachineEntity>("SP_SELECT_COMMON_INFO", "GET_ALL_MACHINE").ToList();
        }
        public List<DyeingProdInfo> GetAllDyeingSetNo()
        {
            return _service.Select_Data_List<DyeingProdInfo>("SP_SELECT_COMMON_INFO", "GET_ALL_DYEING_SET_NO").ToList();
        }
        public List<SSNoModel> GetAllDyeingSSNo(string setNo)
        {
            return _service.Select_Data_List<SSNoModel>("SP_SELECT_COMMON_INFO", "GET_ALL_DYEING_SS_NO_BY_SET_NO",setNo).ToList();
        }
        public List<TblType> GetAllType() {
            return _service.Select_Data_List<TblType>("SP_SELECT_COMMON_INFO", "GET_ALL_TYPE").ToList();
        } 

    }
}
