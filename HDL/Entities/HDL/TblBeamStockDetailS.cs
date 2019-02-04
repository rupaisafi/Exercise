using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblBeamStockDetails
    {
        public int BIID { get; set; }
        public Nullable<int> BID { get; set; }
        public int SetNo { get; set; }
        public string StyleNo { get; set; }
        public string StyleCode { get; set; }
        public Nullable<int> SS { get; set; }
        public string BeamNo1 { get; set; }
        public Nullable<int> Length { get; set; }
        public Nullable<decimal> Value { get; set; }
        public int BeamNo { get; set; }
        public string WarpCount { get; set; }
        public Nullable<System.DateTime> PDate { get; set; }
        public Nullable<int> StockDays { get; set; }
        public string PType { get; set; }
        public int PCode { get; set; }
        public string Construction { get; set; }
        public string Remarks { get; set; }
        public string SaveStatus { get; set; }
    }
}
