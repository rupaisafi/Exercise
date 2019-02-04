using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class Order
    {
        public int OrderId { get; set; }
        public string OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public string EmpId { get; set; }
        public string MktPerson { get; set; }
        public int BuyerId { get; set; }
        public int CustomerId { get; set; }
        public string Remarks { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }

        //==========================
        public string StyleName { get; set; }
        public string BuyerName { get; set; }
        public string UserName { get; set; }
        public string CustomerName { get; set; }

        //  ----------------------------
        public string OrderName { get; set; }

        public string SaveStatus { get; set; }

    }
}
