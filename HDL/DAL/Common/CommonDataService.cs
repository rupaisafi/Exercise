using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AUtilities;


namespace DAL.Common
{
    public class CommonDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        public DataSet select_data_10(string comCostID, string ProcName, string CallType, string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "", string parm6 = "", string parm7 = "", string parm8 = "", string parm9 = "", string parm10 = "")
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString);
                dbConn.Open();

                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                return ds;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<T> Select_Data_List<T>(string procedureName, string callName, string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "", string parm6 = "", string parm7 = "", string parm8 = "", string parm9 = "", string parm10 = "")
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString);
                dbConn.Open();

                cmd = new SqlCommand(procedureName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@CallType", callName));
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                dt = ds.Tables[0];
                var dataList = new List<T>();

                if (dt.Rows.Count > 0)
                {
                    dataList = (List<T>)ListConversion.ConvertTo<T>(dt);
                }

                return dataList;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public DataSet GetDataSet(String sql)
        {
            try
            {
                ds = new DataSet();
                dbConn = new SqlConnection(ConnectionString);
                dbConn.Open();
                SqlDataAdapter da = new SqlDataAdapter(sql, dbConn);
                da.Fill(ds);
                dbConn.Close();
                return ds;
            }
            catch (Exception)
            {
                throw new Exception();
            }

        }

        public DataTable select_data_dt_10(string comCostID, string ProcName, string CallType, string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "", string parm6 = "", string parm7 = "", string parm8 = "", string parm9 = "", string parm10 = "")
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString);
                dbConn.Open();

                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));

                da = new SqlDataAdapter(cmd);
                dt = new DataTable();
                da.Fill(dt);
                dbConn.Close();

                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
