using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAL.HDL.DataService
{
    public class MaterialConDataService
    {
        SqlDataAdapter _dataAdapter;
        SqlConnection _connection;
        SqlCommand _cmd;
        //DataSet ds;
        //DataTable dt;

        readonly string _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public MaterialConsumption SaveMConsumption(MaterialConsumption consumption, DataSet dsDetails)
        {
            var res = new MaterialConsumption();
            var dt = new DataTable();
            try
            {
                dt = Insert_Update_MConsumption("sp_insert_mconsumption", "save_mconsumption", consumption, dsDetails);
                res.SaveStatus = Operation.Success.ToString();
                res.MConID = Convert.ToInt32(dt.Rows[0]["MConID"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_MConsumption(string procedure, string callname, MaterialConsumption consumption, DataSet rqdXmlv1 = null)
        {
            _connection = new SqlConnection(_connectionString);
            _connection.Open();

            _cmd = new SqlCommand(procedure, _connection) { CommandType = CommandType.StoredProcedure };

            _cmd.Parameters.Add(new SqlParameter("@call_name", callname));

            _cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = rqdXmlv1?.GetXml();
            _cmd.Parameters.Add(new SqlParameter("@p_MConID", consumption.MConID));
            _cmd.Parameters.Add(new SqlParameter("@p_SID", consumption.SID));
            _cmd.Parameters.Add(new SqlParameter("@p_UserName", consumption.UserName));
            _cmd.Parameters.Add(new SqlParameter("@p_EDate", consumption.EDate.ToString("dd-MMM-yyyy")));
            _cmd.Parameters.Add(new SqlParameter("@p_Remarks", consumption.Remarks));
            _cmd.Parameters.Add(new SqlParameter("@p_TermId", consumption.TermId));

            _dataAdapter = new SqlDataAdapter(_cmd);
            var dt = new DataTable();
            _dataAdapter.Fill(dt);
            _connection.Close();
            return dt;
        }

        public GridEntity<MaterialConsumption> GetMConSummary(GridOptions options)
        {
            var consumption = new GridEntity<MaterialConsumption>();
            consumption = KendoGrid<MaterialConsumption>.GetGridData_5(options, "sp_select_mconsumption_grid", "get_mconsumption_summary", "SID");
            return consumption;
        }

        public List<MaterialConsumption> GetAllMConsumptions()
        {
            return _common.Select_Data_List<MaterialConsumption>("sp_select_mconsumption_info", "get_all_mconsumption");
        }

        public List<MaterialConsumptionDetails> GetAllGridData(string MConID)
        {
            return _common.Select_Data_List<MaterialConsumptionDetails>("sp_select_mconsumption_info", "get_mconsumption_details_grid_data", MConID);
        }

    }
}
