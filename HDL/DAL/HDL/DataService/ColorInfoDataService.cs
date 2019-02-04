using System;
using System.Collections.Generic;
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
    public class ColorInfoDataService
    {

        private SqlDataAdapter da;
        private SqlConnection dbConn;
        private SqlCommand cmd;
       // private DataSet ds;
        private DataTable dt;

        private readonly string ConnectionString =
            System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;

        private readonly CommonDataService _common = new CommonDataService();

        public List<Color> GetAllColor()
        {
            return _common.Select_Data_List<Color>("sp_select_color_info", "get_all_color");
        }

        public string SaveColorInfo(Color objColor)
        {
            string rv = "";
            try
            {
                Insert_Update_Color_Info("sp_insert_color_info", "save_color_info", objColor);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Color_Info(string procedure, string callname, Color objColor)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_ColorId", objColor.ColorId));
            cmd.Parameters.Add(new SqlParameter("@p_ColorName", objColor.ColorName));
            cmd.Parameters.Add(new SqlParameter("@p_ColorCode", objColor.ColorCode));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objColor.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objColor.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<Color> GetColorInfoSummary(GridOptions options)
        {
            var color = new GridEntity<Color>();
            color = KendoGrid<Color>.GetGridData_5(options, "sp_select_color_grid", "get_color_summary", "ColorId");
            return color;
        }
    }
}
