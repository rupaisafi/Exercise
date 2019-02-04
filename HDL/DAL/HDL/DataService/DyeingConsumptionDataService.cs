using DAL.Common;
using DBManager;
using DBManager.StoreProcedure;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HDL.DataService
{
    public class DyeingConsumptionDataService
    {
        //SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        SqlDataAdapter da;
        string connectionString = ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();


        
        public DyeingConsumptionInfo GetDyeingConsumptionInfo(string setNo)
        {
            var result = _common.Select_Data_List<DyeingConsumptionInfo>("sp_select_dyeing_consumption_info", "GET_DYEING_CONSUMPTION_INFO_BY_SETNO", setNo).SingleOrDefault();
            return result;
        }
        public DataTable SaveDyeingConsumption(string setNo, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(connectionString);
            dbConn.Open();
            cmd = new SqlCommand("sp_insert_dyeing_consumption_info", dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", "save_dyeing_consumption_info"));
            cmd.Parameters.Add(new SqlParameter("@p_SetNo", setNo));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = rqdXmlv1 == null ? null : rqdXmlv1.GetXml();
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public GridEntity<DyeingConsumptionDetail> GetDyeingConsumptionDetailsSummary(GridOptions options, string setNo)
        {
            var result = KendoGrid<DyeingConsumptionDetail>.GetGridData_5(options, "sp_select_dyeing_consumption_grid", "get_dyeing_consumption_detail_summary", "ConsumptionDate DESC", setNo);
            return result;
        }
        public GridEntity<DyeingConsumptionInfo> GetDyeingConsumptionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            var result = KendoGrid<DyeingConsumptionInfo>.GetGridData_5(options, "sp_select_dyeing_consumption_grid", "get_dyeing_consumption_summary", "DyeDate DESC", dateFrom, dateTo);
            return result;
        }
        
    }
}
