using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;

namespace BLL.HDL.MaterialConsumption
{
    public class MaterialConService : IMaterialConRepository
    {
        readonly MaterialConDataService _dataService = new MaterialConDataService();

        public Entities.HDL.MaterialConsumption SaveMaterialConsumption(Entities.HDL.MaterialConsumption consumption, List<MaterialConsumptionDetails> consumptionDetails)
        {
            //-------------------Details information------------------------------------------
            var dtDetails = new DataTable();
            dtDetails.Columns.Add("MConDtlID");
            dtDetails.Columns.Add("MConID");
            dtDetails.Columns.Add("ItemCode");
            dtDetails.Columns.Add("Unit");
            dtDetails.Columns.Add("Qnty");
            dtDetails.Columns.Add("DepartmentCode");
            dtDetails.Columns.Add("UserName");
            dtDetails.Columns.Add("EDate");

            if (consumptionDetails != null && consumptionDetails.Count > 0)
                foreach (var detail in consumptionDetails)
                {
                    DataRow row = dtDetails.NewRow();

                    row["MConDtlID"] = detail.MConDtlID;
                    row["MConID"] = detail.MConID;
                    row["ItemCode"] = detail.ItemCode;
                    row["Unit"] = detail.Unit;
                    row["Qnty"] = detail.Qnty;
                    row["DepartmentCode"] = detail.DepartmentCode;
                    row["UserName"] = detail.UserName;
                    row["EDate"] = Convert.ToDateTime(detail.EDate).ToString("dd-MMM-yyyy");

                    dtDetails.Rows.Add(row);
                }

            dtDetails.TableName = "tblDetails";
            DataSet dsDetails = new DataSet("dsDetails");
            dsDetails.Tables.Add(dtDetails);

            return _dataService.SaveMConsumption(consumption, dsDetails);
        }

        public GridEntity<Entities.HDL.MaterialConsumption> GetMConsumptionSummary(GridOptions options)
        {
            return _dataService.GetMConSummary(options);
        }

        public List<Entities.HDL.MaterialConsumption> GetAllMConsumptions()
        {
            return _dataService.GetAllMConsumptions();
        }

        public List<MaterialConsumptionDetails> GetAllGridData(string MConID)
        {
            return _dataService.GetAllGridData(MConID);
        }


    }
}
