using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class InspRejectionDetail
    {
        public int DID { get; set; }
        public int ID { get; set; }
        public int StyleCode { get; set; }
        public string StyleNo { get; set; }
        public string Beam { get; set; }
        public decimal Weight { get; set; }
        public string Constraction { get; set; }
        public string Remarks { get; set; }
        public int SetNo { get; set; }
        public int SS { get; set; }
        public string Loom { get; set; }
        public decimal ProdB { get; set; }
        public decimal ProdC { get; set; }
        public decimal CutPieece { get; set; }
        public decimal Wastage { get; set; }
        public int FCode { get; set; }
        public string FType { get; set; }
        public int DCode { get; set; }
        public string DName { get; set; }
        public string WeavDate { get; set; }
        public int ShiftCode { get; set; }
        public string ShiftName { get; set; }
        public string UserName { get; set; }
        public int UCode { get; set; }
        public string UName { get; set; }
        public int FMCCode { get; set; }
        public string FMCName { get; set; }

    }
}
