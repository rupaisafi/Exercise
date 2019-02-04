using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class WarpingProdDetails
    {
        public int Wdid { get; set; }
        public int IdNo { get; set; }
        public DateTime TracDate { get; set; }
        public DateTime WarpDate { get; set; }
        public int FlangeNo { get; set; }
        public decimal FlangeLength { get; set; }
        public int WeakPoint { get; set; }
        public int Spiler { get; set; }
        public int Snarl { get; set; }
        public int DoubleYarn { get; set; }
        public int DueToMachine { get; set; }
        public int DueToCone { get; set; }
        public int BadWdg { get; set; }
        public int TotalYarnBkg { get; set; }
        public int Termination { get; set; }
        public decimal Total { get; set; }
        public int RemnantPerCreel { get; set; }
        public decimal WastagePCreel { get; set; }
        public string OperatorCardNo { get; set; }
        public int ShiftCode { get; set; }
        public decimal ShiftTime { get; set; }
        public string Designation { get; set; }
        public int ICode { get; set; }
        public string Unit { get; set; }
        public decimal ICount { get; set; }
        public decimal EndsBeam { get; set; }
        public decimal BeamKg { get; set; }
        public int SCode { get; set; }
        public string YarnCode { get; set; }
        public string YarnLot { get; set; }
        public decimal BreakagePoint { get; set; }
        public decimal MSpeed { get; set; }
        public decimal MEffi { get; set; }
        public decimal Intake { get; set; }
        public decimal Reminent { get; set; }
        public decimal Recone { get; set; }
        public decimal Weastage { get; set; }
        public decimal IQnty { get; set; }
        public decimal Rate { get; set; }
        public decimal BeamValue { get; set; }
        public decimal WastageValue { get; set; }
        public decimal StdBrkg { get; set; }
        public decimal BRunTime { get; set; }
        public string CapCode { get; set; }
        public int Lapper { get; set; }
        public DateTime RowDate { get; set; }

        //=====================================================
        public string OperatorName { get; set; }
        public string CapName { get; set; }
        public string ShiftName { get; set; }
        public string SName { get; set; }
        public string IName { get; set; }
        public string SaveStatus { get; set; }
    }
}
