using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class MrrInformation
    {
        public int RID { get; set; }
        public int RDID { get; set; }
        public DateTime MrrDate { get; set; }
        public int SupplierId { get; set; }
        public string LCNo { get; set; }
        public DateTime LCDate { get; set; }
        public string PINo { get; set; }
        public DateTime PIDate { get; set; }
        public string InvNo { get; set; }
        public DateTime InvDate { get; set; }
        public decimal InvValue { get; set; }
        public string MRRNo { get; set; }
        public string TruckNo { get; set; }
        public int LCode { get; set; }
        public string LName { get; set; }
        public int ImpTypeId { get; set; }
        public string BLNo { get; set; }
        public DateTime BLDate { get; set; }
        public string BENo { get; set; }
        public DateTime BEDate { get; set; }
        public string IPNo { get; set; }
        public DateTime IPDate { get; set; }
        public int CompanyId { get; set; }
        public string UserName { get; set; }
        public DateTime EDate { get; set; }
        public string Remarks { get; set; }
        public int PaymentId { get; set; }
        public string Payment { get; set; }
        public string PartialNo { get; set; }
        public string ChallanNo { get; set; }
        public DateTime ChallanDate { get; set; }
        public string CertificateNo { get; set; }
        public DateTime TrackDate { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        public string SaveStatus { get; set; }
    }
}
