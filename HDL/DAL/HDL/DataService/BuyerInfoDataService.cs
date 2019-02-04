using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;

namespace DAL.HDL.DataService
{
    public class BuyerInfoDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public string SaveBuyerInfo(Buyer objBuyer)
        {
            string rv = "";
            try
            {
                Insert_Update_BuyerInfo("sp_insert_buyer_info", "savebuyerinfo", objBuyer);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_BuyerInfo(string procedure, string callname, Buyer objBuyer)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_BuyerCode", objBuyer.BuyerCode));
            cmd.Parameters.Add(new SqlParameter("@p_BuyerId", objBuyer.BuyerId));
            cmd.Parameters.Add(new SqlParameter("@p_BuyerName", objBuyer.BuyerName));
            cmd.Parameters.Add(new SqlParameter("@p_ShortName", objBuyer.ShortName));
            cmd.Parameters.Add(new SqlParameter("@p_PhoneNoPer", objBuyer.PhoneNoPer));
            cmd.Parameters.Add(new SqlParameter("@p_PhoneNoOffice", objBuyer.PhoneNoOffice));
            cmd.Parameters.Add(new SqlParameter("@p_PhoneNoHome", objBuyer.PhoneNoHome));
            cmd.Parameters.Add(new SqlParameter("@p_FaxNo", objBuyer.FaxNo));
            cmd.Parameters.Add(new SqlParameter("@p_ContactPerson", objBuyer.ContactPerson));
            cmd.Parameters.Add(new SqlParameter("@p_CpDesignation", objBuyer.CpDesignation));
            cmd.Parameters.Add(new SqlParameter("@p_Email", objBuyer.Email));
            cmd.Parameters.Add(new SqlParameter("@p_Addr", objBuyer.BuyerAddr));
            cmd.Parameters.Add(new SqlParameter("@p_CountryId", objBuyer.CountryId));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objBuyer.IsActive));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objBuyer.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objBuyer.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Buyer> GetBuyerInfoSummary(GridOptions options)
        {
            var buyer = new GridEntity<Buyer>();
            buyer = KendoGrid<Buyer>.GetGridData_5(options, "sp_select_buyer_grid", "get_buyer_summary","BuyerName");
            return buyer;
        }

        public List<Buyer> GetAllBuyer()
        {
            return _common.Select_Data_List<Buyer>("sp_select_Buyer_info", "get_all_buyer");
        }

        public Buyer GenerateMaxBuyerCode()
        {
            var rv = new Buyer();
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_Buyer_info", "get_max_buyer_code");
            rv.BuyerCode = dt.Rows[0]["BuyerCode"].ToString();
            return rv;
        }
    }
}
