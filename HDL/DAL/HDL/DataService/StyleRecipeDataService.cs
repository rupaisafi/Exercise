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
    public class StyleRecipeDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();
        
        public List<Style> GetAllStyle()
        {
            return _service.Select_Data_List<Style>("sp_select_style_recipe_info", "GET_ALL_STYLE").ToList();
        }
        public List<SetInfoEntity> GetAllSetNo()
        {
            return _service.Select_Data_List<SetInfoEntity>("sp_select_style_recipe_info", "GET_ALL_SET").ToList();
        }
        
        public List<Color> GetAllColor()
        {
            return _service.Select_Data_List<Color>("sp_select_style_recipe_info", "GET_ALL_Color").ToList();
        }
        
        public List<StyleParameterFinishing> GetStyleParameter(int SID)
        {
            return _service.Select_Data_List<StyleParameterFinishing>("sp_select_style_recipe_info", "GET_Style_Parameter_Finishing",SID.ToString()).ToList();
        }
        
        public List<StyleDetailsFinishingRecepi> GetStyleRecipe(int SID)
        {
            return _service.Select_Data_List<StyleDetailsFinishingRecepi>("sp_select_style_recipe_info", "GET_STYLE_RECIPE", SID.ToString()).ToList();
        }

        public List<ICode> GetICode()
        {
            return _service.Select_Data_List<ICode>("sp_select_style_recipe_info", "GET_ICODE").ToList();
        }
        
        public string SaveInfo(StyleParameterFinishing objRec)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_Info("sp_insert_style_recipe_info", "SAVE_STYLE_RECIPE_INFO", objRec);
                rv = Operation.Success.ToString();
                return result.Rows[0]["SIID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Info(string procedure, string callname, StyleParameterFinishing objRec)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@SIID", Convert.ToInt32(objRec.SIID)));
            cmd.Parameters.Add(new SqlParameter("@SID", Convert.ToInt32(objRec.SID)));
            cmd.Parameters.Add(new SqlParameter("@FEDate", objRec.FEDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@FStyleNoRef", objRec.FStyleNoRef));
            cmd.Parameters.Add(new SqlParameter("@FColourRef", objRec.FColourRef));
            cmd.Parameters.Add(new SqlParameter("@FSetRef", Convert.ToInt32( objRec.FSetRef)));
            cmd.Parameters.Add(new SqlParameter("@FProcess", objRec.FProcess));
            cmd.Parameters.Add(new SqlParameter("@FViscosity", Convert.ToDecimal(objRec.FViscosity)));
            cmd.Parameters.Add(new SqlParameter("@FVolume", Convert.ToDecimal(objRec.FVolume)));
            cmd.Parameters.Add(new SqlParameter("@FMCRPM", Convert.ToDecimal(objRec.FMCRPM)));
            cmd.Parameters.Add(new SqlParameter("@FDryTemp", Convert.ToDecimal(objRec.FDryTemp)));
            cmd.Parameters.Add(new SqlParameter("@FCuringTemp", Convert.ToDecimal(objRec.FCuringTemp)));
            cmd.Parameters.Add(new SqlParameter("@FStemerTemp", Convert.ToDecimal(objRec.FStemerTemp)));
            cmd.Parameters.Add(new SqlParameter("@SRemarks", objRec.SRemarks));
            cmd.Parameters.Add(new SqlParameter("@FRedox", Convert.ToDecimal(objRec.FRedox)));
            cmd.Parameters.Add(new SqlParameter("@FPH", Convert.ToDecimal(objRec.FPH)));
            cmd.Parameters.Add(new SqlParameter("@FDyeingBoxTemp", Convert.ToDecimal(objRec.FDyeingBoxTemp)));
            cmd.Parameters.Add(new SqlParameter("@FCWTTemp2to3", Convert.ToDecimal(objRec.FCWTTemp2to3)));
            cmd.Parameters.Add(new SqlParameter("@FCWTTemp4to7", Convert.ToDecimal(objRec.FCWTTemp4to7)));
            cmd.Parameters.Add(new SqlParameter("@FPHBox", Convert.ToDecimal(objRec.FPHBox)));
            cmd.Parameters.Add(new SqlParameter("@FStabilizerTemp", Convert.ToDecimal(objRec.FStabilizerTemp)));
            cmd.Parameters.Add(new SqlParameter("@MDryTemp1", Convert.ToDecimal(objRec.MDryTemp1)));
            cmd.Parameters.Add(new SqlParameter("@MDryTemp2", Convert.ToDecimal(objRec.MDryTemp2)));
            cmd.Parameters.Add(new SqlParameter("@MDryTemp3", Convert.ToDecimal(objRec.MDryTemp3)));
            cmd.Parameters.Add(new SqlParameter("@MDryTemp4", Convert.ToDecimal(objRec.MDryTemp4)));
            cmd.Parameters.Add(new SqlParameter("@MRemarks", objRec.MRemarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        
         public string SaveDetailInfo(StyleDetailsFinishingRecepi objRec)
        {
            string rv = "";
            try
            {
                var result = Insert_Update_Detail_Info("sp_insert_style_recipe_detail_info", "SAVE_DETAIL_INFO", objRec);
                rv = Operation.Success.ToString();
                return result.Rows[0]["SIID"].ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_Detail_Info(string procedure, string callname, StyleDetailsFinishingRecepi objRec)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@SIID", Convert.ToInt32(objRec.SIID)));
            cmd.Parameters.Add(new SqlParameter("@SID", Convert.ToInt32(objRec.SID)));
            cmd.Parameters.Add(new SqlParameter("@IName", objRec.IName));
           cmd.Parameters.Add(new SqlParameter("@ICode", Convert.ToInt32(objRec.ICode)));
            cmd.Parameters.Add(new SqlParameter("@IPercent", objRec.IPercent));
            cmd.Parameters.Add(new SqlParameter("@IGPL", objRec.IGPL));
            cmd.Parameters.Add(new SqlParameter("@ILtr", objRec.ILtr));
            cmd.Parameters.Add(new SqlParameter("@IVolume", objRec.IVolume));
            cmd.Parameters.Add(new SqlParameter("@Remarks",objRec.Remarks));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
    }
}
