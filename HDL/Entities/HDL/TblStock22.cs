using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblStock22
    {
        public int DID { get; set; }
        public Nullable<int> ID { get; set; }
        public string OCode { get; set; }
        public string OName { get; set; }
        public string CapName { get; set; }
        public string CapCode { get; set; }
        public string Desig { get; set; }
        public Nullable<int> AcProd { get; set; }
        public Nullable<int> ReFinish { get; set; }
        public Nullable<int> ReInspection { get; set; }
        public Nullable<int> Sample { get; set; }
        public Nullable<int> QCCheque { get; set; }
        public Nullable<int> Hold { get; set; }
        public Nullable<int> CP { get; set; }
        public Nullable<int> CutPeace { get; set; }
        public Nullable<int> GreyMending { get; set; }
        public Nullable<int> ShiftCode { get; set; }
        public string Shift { get; set; }
        public Nullable<decimal> STimeHr { get; set; }
        public string Remarks { get; set; }
        public string UName { get; set; }
        public Nullable<System.DateTime> EDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
