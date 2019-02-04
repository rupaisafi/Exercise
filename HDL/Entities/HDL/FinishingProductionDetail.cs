using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class FinishingProductionDetail
    {
        public int FPID { get; set; }
        public int FID { get; set; }
        public string SizingNo { get; set; }
        public string BeamNo { get; set; }
        public string LoomNo { get; set; }
        public string StyleNo { get; set; }
        public string StyleCode { get; set; }
        public string Weave { get; set; }
        public string Color { get; set; }
        public decimal Weight { get; set; }
        public decimal Width { get; set; }
        public decimal BeamLenght { get; set; }
        public decimal FabShrinkage { get; set; }
        public decimal BeforeFin { get; set; }
        public decimal AfterFin { get; set; }
        public decimal AfterFinShrinkag { get; set; }
        public decimal TotalProd { get; set; }
        public decimal TotalPoint { get; set; }
        public string Remnarks { get; set; }
        public string SetNo { get; set; }
        public string TrollyNo { get; set; }
        public string BeforeWidth { get; set; }
        public string AfterWidth { get; set; }
        public string Skew { get; set; }
        public string Buyer { get; set; }
        public string OName { get; set; }
        public string OCode { get; set; }
        public string OpName { get; set; }
        public string OpCode { get; set; }
        public string ShiftCode { get; set; }
        public string Shift { get; set; }
        public string Conostration { get; set; }
        public string FConstraction { get; set; }
        public string UserName { get; set; }
        public DateTime EDate { get; set; }
        public decimal MCRunTime { get; set; }
        public decimal MCOffTime { get; set; }
        public decimal Temparature { get; set; }
        public string RPM { get; set; }
        public string ProdType { get; set; }
        public string ProdCode { get; set; }
        public string FinishRoute { get; set; }
        public string UCode { get; set; }
        public string UName { get; set; }
        public string Moisture { get; set; }
        public string RouteType { get; set; }
    }
}
