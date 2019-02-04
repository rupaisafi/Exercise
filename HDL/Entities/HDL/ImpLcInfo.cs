using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class ImpLcInfo
    {
        public int LcId { get; set; }
        public int SupplierId { get; set; }
        public int ImpTypeId { get; set; }
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public string LcNo { get; set; }
        public DateTime LcDate { get; set; }
        public DateTime ExpDate { get; set; }
        public DateTime ShipDate { get; set; }
        public DateTime SdExt { get; set; }
        public string PiNo { get; set; }
        public DateTime PiDate { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvDate { get; set; }
        public string IpNo { get; set; }
        public DateTime IpDate { get; set; }
        public int StatusId { get; set; }
        public string Vassal { get; set; }
        public DateTime Eta { get; set; }
        public DateTime Etd { get; set; }
        public string UserId { get; set; }
        public DateTime EDate { get; set; }
        public string TermId { get; set; }

        public string SaveStatus { get; set; }

        //===============
        public string LcName { get; set; }
    }
}
