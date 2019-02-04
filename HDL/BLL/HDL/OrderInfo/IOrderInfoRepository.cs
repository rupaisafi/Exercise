using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.OrderInfo
{
    public interface IOrderInfoRepository
    {
        List<User> GetAllMktUser();
        Order SaveOrderInfo(Order objOrder, List<OrderDetails> objOrderDetails);
        GridEntity<Order> GetOrderInfoSummary(GridOptions options);
        List<Order> GetAllOrder();
        List<OrderDetails> GetAllGridData(string orderNo);
        Order GetMaxOrderNo();
    }
}
