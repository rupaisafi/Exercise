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
    public class SupplierDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        readonly string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();

        public string SaveSupplierInfo(Supplier objSupplier)
        {
            string rv = "";
            try
            {
                Insert_Update_SupplierInfo("sp_insert_Supplier_info", "saveSupplierinfo", objSupplier);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }
        public DataTable Insert_Update_SupplierInfo(string procedure, string callname, Supplier objSupplier)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_SupplierId", objSupplier.SupplierId));
            cmd.Parameters.Add(new SqlParameter("@p_SupplierCode", objSupplier.SupplierCode));
            cmd.Parameters.Add(new SqlParameter("@p_SupplierName", objSupplier.SupplierName));
            cmd.Parameters.Add(new SqlParameter("@p_ShortName", objSupplier.ShortName));
            cmd.Parameters.Add(new SqlParameter("@p_PhoneNoPer", objSupplier.PhoneNoPer));
            cmd.Parameters.Add(new SqlParameter("@p_PhoneNoOffice", objSupplier.PhoneNoOffice));
            cmd.Parameters.Add(new SqlParameter("@p_PhoneNoHome", objSupplier.PhoneNoHome));
            cmd.Parameters.Add(new SqlParameter("@p_FaxNo", objSupplier.FaxNo));
            cmd.Parameters.Add(new SqlParameter("@p_ContactPerson", objSupplier.ContactPerson));
            cmd.Parameters.Add(new SqlParameter("@p_CpDesignation", objSupplier.CpDesignation));
            cmd.Parameters.Add(new SqlParameter("@p_Email", objSupplier.Email));
            cmd.Parameters.Add(new SqlParameter("@p_Addr", objSupplier.SupplierAddr));
            cmd.Parameters.Add(new SqlParameter("@p_CountryId", objSupplier.CountryId));
            cmd.Parameters.Add(new SqlParameter("@p_IsActive", objSupplier.IsActive));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objSupplier.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objSupplier.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Supplier> GetSupplierInfoSummary(GridOptions options)
        {
            var Supplier = new GridEntity<Supplier>();
            Supplier = KendoGrid<Supplier>.GetGridData_5(options, "sp_select_Supplier_grid", "get_Supplier_summary","SupplierName");
            return Supplier;
        }

        public List<Supplier> GetAllSupplier()
        {
            return _common.Select_Data_List<Supplier>("sp_select_supplier", "get_all_supplier");

        }

        public bool CheckIsExist(int supplierId, string supplierCode)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_supplier", "check_Is_Exist", supplierId.ToString(), supplierCode);
            rv = dt.Rows.Count > 0;
            return rv;
        }

        public Supplier GetMaxSupplierCode()
        {
            var rv = new Supplier();
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_supplier", "get_max_sup_code");
            rv.SupplierCode = dt.Rows[0]["SupplierCode"].ToString();
            return rv;
        }
    }
}
