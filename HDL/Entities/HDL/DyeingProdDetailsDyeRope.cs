using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProdDetailsDyeRope
    {
        public int DIID { get; set; }
        public int DID { get; set; }
        public DateTime DDate { get; set; }
        public int ShiftCode { get; set; }
        public string ShiftName { get; set; }
        public int BallNo { get; set; }
        public int CanNo { get; set; }
        public decimal WarpLength { get; set; }
        public decimal DyLength { get; set; }
        public decimal Speed { get; set; }
        public string PO { get; set; }
        public string OP { get; set; }
        public string ColorMan { get; set; }
        public string Captain { get; set; }
        public int StopMark { get; set; }
        public int Lapper { get; set; }
        public int CreelLapper { get; set; }
        public int RopeCut { get; set; }
        public int CutEndsWr { get; set; }
        public string Remarks { get; set; }
    }
}
