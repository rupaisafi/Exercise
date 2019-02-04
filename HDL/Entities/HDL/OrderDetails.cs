using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class OrderDetails
    {
        public int OrderDetailsId { get; set; }

        public string OrderNo { get; set; }

        public string StyleNo { get; set; }

        public int StyleCode { get; set; }

        public decimal Qnty { get; set; }

        public decimal Rate { get; set; }

        public decimal Amount { get; set; }

        public string DeliDate { get; set; }

        public int ProdOrderTypeId { get; set; }

        public int SalesOrderTypeId { get; set; }

        public string ColorId { get; set; }

        public int MachineId { get; set; }

        public string Reed { get; set; }

        public string EPI { get; set; }

        public decimal DyeProd { get; set; }

        public int ProdStatus { get; set; }

        public int OrderStatus { get; set; }

        public DateTime StatusDate { get; set; }

        public string MktStatus { get; set; }

        public string PrcStatus { get; set; }

        public decimal ReqQnty { get; set; }

        public string Remarks { get; set; }
    }
}
