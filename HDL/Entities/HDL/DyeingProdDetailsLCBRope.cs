using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProdDetailsLCBRope
    {
        public int DIID { get; set; }
        public int DID { get; set; }
        public DateTime LDate { get; set; }
        public int ShiftCode { get; set; }
        public string ShiftName { get; set; }
        public int CanNo { get; set; }
        public string BeamNo { get; set; }
        public string MCNo { get; set; }
        public int Speed { get; set; }
        public decimal LCBLength { get; set; }
        public string PO { get; set; }
        public string OP { get; set; }
        public string SVisor { get; set; }
        public decimal Tension { get; set; }
        public decimal Brkg { get; set; }
        public int CuttingEnds { get; set; }
        public int LooseEnd { get; set; }
        public int RopeCut { get; set; }
        public string ReedTime { get; set; }
        public string DyCaptainCEnd { get; set; }
        public string QC { get; set; }
        public string DyOPCEnd { get; set; }
        public string Remarks { get; set; }
    }
}
