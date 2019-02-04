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

    public class ItemInfoDataService
    {
        private SqlDataAdapter da;
        private SqlConnection dbConn;
        private SqlCommand cmd;
        private DataSet ds;
        private DataTable dt;

        private readonly string ConnectionString =
            System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;

        private readonly CommonDataService _common = new CommonDataService();

        public List<ItemGroup> GetAllGroupName()
        {
            return _common.Select_Data_List<ItemGroup>("sp_select_Common_info", "get_all_Item_group");
        }
        public List<ItemType> GetAllItemType()
        {
            return _common.Select_Data_List<ItemType>("sp_select_Common_info", "get_all_Item_type");
        }

        public string SaveItemInfo(ItemInfoEntity objItem)
        {
            string rv = "";
            try
            {
                Insert_Update_ItemInfo("sp_insert_item_info", "saveiteminfo", objItem);
                rv = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                rv = ex.Message;
            }
            return rv;
        }

        public DataTable Insert_Update_ItemInfo(string procedure, string callname, ItemInfoEntity objItem)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add(new SqlParameter("@p_GroupId", objItem.Togcn));
            cmd.Parameters.Add(new SqlParameter("@p_ItemCode", objItem.ICNo));
            cmd.Parameters.Add(new SqlParameter("@p_ItemId", objItem.IID));
            cmd.Parameters.Add(new SqlParameter("@p_ItemName", objItem.ICName));
            cmd.Parameters.Add(new SqlParameter("@p_ShortName", objItem.ShortName));
            cmd.Parameters.Add(new SqlParameter("@p_Unit", objItem.Unit));
            cmd.Parameters.Add(new SqlParameter("@p_MinQnty", objItem.MinQnty));
            cmd.Parameters.Add(new SqlParameter("@p_MaxQnty", objItem.MaxQnty));
            cmd.Parameters.Add(new SqlParameter("@p_OdQnty", objItem.OdQnty));
            cmd.Parameters.Add(new SqlParameter("@p_SRate", objItem.SRate));
            cmd.Parameters.Add(new SqlParameter("@p_ItemTypeId", objItem.ITCode));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", objItem.Remarks));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objItem.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objItem.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }

        public GridEntity<ItemInfoEntity> GetItemInfoSummary(GridOptions options)
        {
            return KendoGrid<ItemInfoEntity>.GetGridData_5(options, "sp_select_item_grid", "get_item_summary", "IcNo");
        }

        public ItemInfoEntity GenerateMaxItemCode()
        {
            var rv = new ItemInfoEntity();
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_Item_info", "get_max_item_code");
            rv.ICNo = dt.Rows[0]["ICNo"].ToString();
            return rv;
        }

        public bool CheckIsExist(int itemId, string itemCode)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_Item_info", "check_Is_Exist", itemId.ToString(), itemCode);
            rv = dt.Rows.Count > 0;
            return rv;
        }
    }
}
