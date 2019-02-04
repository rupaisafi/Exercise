using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.OrderInfo
{
    public class OrderInfoService:IOrderInfoRepository
    {
        OrderInfoDataService _orderInfoDataService =new OrderInfoDataService();
        public List<User> GetAllMktUser()
        {
            return _orderInfoDataService.GetAllMktUser();
        }

        public Order SaveOrderInfo(Order objOrder, List<OrderDetails> objOrderDetails)
        {
            var rv=new Order();
            var res = CheckIsExist(objOrder.OrderId, objOrder.OrderNo);
            if (!res)
            {
                //-------------------Order Details information------------------------------------------
                var oDetailsDt = new DataTable();
                oDetailsDt.Columns.Add("STYLENO");
                oDetailsDt.Columns.Add("STYLECODE");
                oDetailsDt.Columns.Add("QNTY");
                oDetailsDt.Columns.Add("RATE");
                oDetailsDt.Columns.Add("AMOUNT");
                oDetailsDt.Columns.Add("DELIDATE");
                oDetailsDt.Columns.Add("PRODORDERTYPEID");
                oDetailsDt.Columns.Add("SALESORDERTYPEID");
                oDetailsDt.Columns.Add("MACHINEID");
                oDetailsDt.Columns.Add("DYEPROD");
                oDetailsDt.Columns.Add("PRODSTATUS");
                oDetailsDt.Columns.Add("ORDERSTATUS");
                oDetailsDt.Columns.Add("STATUSDATE");
                oDetailsDt.Columns.Add("MKTSTATUS");
                oDetailsDt.Columns.Add("PRCSTATUS");
                oDetailsDt.Columns.Add("REQQNTY");
                oDetailsDt.Columns.Add("REMARKS");
               
                if (objOrderDetails != null && objOrderDetails.Count > 0)
                    foreach (var order in objOrderDetails)
                    {
                        DataRow row1;
                        row1 = oDetailsDt.NewRow();
                        row1["STYLENO"] = order.StyleNo;
                        row1["STYLECODE"] = order.StyleCode;
                        row1["QNTY"] = order.Qnty;
                        row1["RATE"] = order.Rate;
                        row1["AMOUNT"] = order.Amount;
                        row1["DELIDATE"] = Convert.ToDateTime(order.DeliDate).ToString("dd-MMM-yyyy");
                        row1["PRODORDERTYPEID"] = order.ProdOrderTypeId;
                        row1["SALESORDERTYPEID"] = order.SalesOrderTypeId;
                        row1["MACHINEID"] = order.MachineId;
                        row1["DYEPROD"] = order.DyeProd;
                        row1["PRODSTATUS"] = order.ProdStatus;
                        row1["ORDERSTATUS"] = order.OrderStatus;
                        row1["STATUSDATE"] = DateTime.Now.ToString("dd-MMM-yyyy");
                        row1["MKTSTATUS"] = order.MktStatus;
                        row1["PRCSTATUS"] = order.PrcStatus;
                        row1["REQQNTY"] = order.ReqQnty;
                        row1["REMARKS"] = order.Remarks;
                        oDetailsDt.Rows.Add(row1);
                    }
                oDetailsDt.TableName = "tblODetails";
                DataSet dsODetails = new DataSet("dsODetails");
                dsODetails.Tables.Add(oDetailsDt);

                return _orderInfoDataService.SaveOrderInfo(objOrder, dsODetails);
            }
            else
            {
                rv.SaveStatus = Operation.Exists.ToString();
                return rv;
            }
           
        }

        private bool CheckIsExist(int orderId, string orderNo)
        {
            return _orderInfoDataService.CheckIsExist(orderId, orderNo);
        }

        public GridEntity<Order> GetOrderInfoSummary(GridOptions options)
        {
            return _orderInfoDataService.GetOrderInfoSummary(options);
        }

        public List<Order> GetAllOrder()
        {
            return _orderInfoDataService.GetAllOrder();
        }

        public List<OrderDetails> GetAllGridData(string orderNo)
        {
            return _orderInfoDataService.GetAllGridData(orderNo);
        }

        public Order GetMaxOrderNo()
        {
            return _orderInfoDataService.GetMaxOrderNo();
        }
    }
}
