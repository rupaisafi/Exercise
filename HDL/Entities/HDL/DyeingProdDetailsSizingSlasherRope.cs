using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProdDetailsSizingSlasherRope
    {
        public int DIID { get; set; }
        public int DID { get; set; }
        public DateTime SDate { get; set; }
        public int ShiftCode { get; set; }
        public string ShiftName { get; set; }
        public int SSNo { get; set; }
        public string BeamNo { get; set; }
        public decimal Length { get; set; }
        public string PO { get; set; }
        public string Sizer { get; set; }
        public string DO { get; set; }
        public string Captain { get; set; }
        public string RopeDyeCap { get; set; }
        public string RopeDyePO { get; set; }
        public int StickyEndsLeft { get; set; }
        public int StickyEndsRight { get; set; }
        public decimal BrkgPoint { get; set; }
        public string StopTime { get; set; }
        public string Stoppage { get; set; }
        public int LapperCreel { get; set; }
        public int LapperDyeing { get; set; }
        public int LapperSizing { get; set; }
        public int NoOfLapper { get; set; }
        public string LapperType { get; set; }
        public int SizingCode { get; set; }
        public string SizingMC { get; set; }
        public string SetNo { get; set; }        
        public string Remarks { get; set; }
    }
}
