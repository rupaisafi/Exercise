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
    public class OrderInfoDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _common = new CommonDataService();
        public List<User> GetAllMktUser()
        {
            return _common.Select_Data_List<User>("sp_select_order_info", "get_all_mktuser");
        }

        public Order SaveOrderInfo(Order objOrder, DataSet dsODetails)
        {
            var res= new Order();
            var dt = new DataTable();
            try
            {
                dt= Insert_Update_OrderInfo("sp_insert_Order_info", "save_order_info", objOrder,dsODetails);
                res.SaveStatus= Operation.Success.ToString();
                res.OrderId= Convert.ToInt32(dt.Rows[0]["OrderId"].ToString());
            }
            catch (Exception ex)
            {
                res.SaveStatus = ex.Message;
            }
            return res;
        }
        public DataTable Insert_Update_OrderInfo(string procedure, string callname, Order objOrder, DataSet rqdXmlv1 = null)
        {
            dbConn = new SqlConnection(ConnectionString);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@call_name", callname));
            cmd.Parameters.Add("@dsxmlu1", SqlDbType.Xml).Value = (rqdXmlv1 == null ? null : rqdXmlv1.GetXml());
            cmd.Parameters.Add(new SqlParameter("@p_OrderId", objOrder.OrderId));
            cmd.Parameters.Add(new SqlParameter("@p_OrderNo", objOrder.OrderNo));
            cmd.Parameters.Add(new SqlParameter("@p_OrderDate", objOrder.OrderDate.ToString("dd-MMM-yyyy")));
            cmd.Parameters.Add(new SqlParameter("@p_BuyerId", objOrder.BuyerId));
            cmd.Parameters.Add(new SqlParameter("@p_CustomerId", objOrder.CustomerId));
            cmd.Parameters.Add(new SqlParameter("@p_MktPerson", objOrder.EmpId));
            cmd.Parameters.Add(new SqlParameter("@p_Remarks", objOrder.Remarks));
            cmd.Parameters.Add(new SqlParameter("@p_UserId", objOrder.UserId));
            cmd.Parameters.Add(new SqlParameter("@p_TermId", objOrder.TermId));
            da = new SqlDataAdapter(cmd);
            dt = new DataTable();
            da.Fill(dt);
            dbConn.Close();
            return dt;
        }
        public GridEntity<Order> GetOrderInfoSummary(GridOptions options)
        {
            var order = new GridEntity<Order>();
            order = KendoGrid<Order>.GetGridData_5(options, "sp_select_order_grid", "get_order_summary", "OrderId");
            return order;
        }

        public bool CheckIsExist(int orderId, string orderNo)
        {
            bool rv = false;
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_order_info", "check_Is_Exist", orderId.ToString(), orderNo);
            rv = dt.Rows.Count > 0;
            return rv;
        }

        public List<Order> GetAllOrder()
        {
            return _common.Select_Data_List<Order>("sp_select_order_info", "get_all_order_info");
        }

        public List<OrderDetails> GetAllGridData(string orderNo)
        {
            return _common.Select_Data_List<OrderDetails>("sp_select_order_info", "get_order_details_grid_data", orderNo);
        }


        public Order GetMaxOrderNo()
        {
           var rv=new Order();
            var dt = new DataTable();
            dt = _common.select_data_dt_10("", "sp_select_order_info", "get_max_orderNo");
            rv.OrderNo =dt.Rows[0]["OrderNo"].ToString();
            return rv;
        }
    }
}
