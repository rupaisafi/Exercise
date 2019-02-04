using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInformation
    {
        public int PID { get; set; }
        public DateTime PDate { get; set; }
        public int UnitCode { get; set; }
        public int SetNo { get; set; }
        public decimal SetLength { get; set; }
        public int CustCode { get; set; }
        public string MerkUserId { get; set; }
        public decimal OQnty { get; set; }
        public decimal Rate { get; set; }
        public decimal Value { get; set; }
        public string PIWidth { get; set; }
        public string PIShrink { get; set; }
        public string SetPlaned { get; set; }
        public decimal TotalTargetLength { get; set; }
        public decimal TakenProd { get; set; }
        public decimal RemainingProd { get; set; }
        public string Remarks { get; set; }
        public int ProdTypeId { get; set; }
        public int OrderTypeId { get; set; }
        public string OrderStatus { get; set; }
        public string BuyerId { get; set; }
        public DateTime DeliDate { get; set; }
        public int OrderRef { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public decimal WpLength { get; set; }
        public decimal DyLength { get; set; }
        public decimal WvLength { get; set; }
        public decimal FiLength { get; set; }
        public decimal InsLength { get; set; }
        public decimal Rej { get; set; }
        public decimal DyeProd { get; set; }
        public string EndBuyer { get; set; }
        public string CSV { get; set; }
        public DateTime EntryDate { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        //============================================================
        public string SaveStatus { get; set; }
        public string YarnName { get; set; }
        public string CustName { get; set; }
        public decimal OrderQty { get; set; }
    }
}
