using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class DyeingProcess
    {
        public int? ID { get; set; }
        public int DyeingID { get; set; }
        public DateTime DyeDate { get; set; }
        public int SetNo { get; set; }
        public int? LengthMtr { get; set; }
        public int? LengthKg { get; set; }
        public string SortNo { get; set; }
        public string Colour { get; set; }
        public string DyeColour { get; set; }
        public string YarnCode { get; set; }
        public string WarpRatio { get; set; }
        public string EndsPerBeam { get; set; }        
        public string NoOfBeam { get; set; }        
        public string NoOfCreel { get; set; }
        public int? TotalEnd { get; set; }
        public int? MCSpeed { get; set; }
        public int? DyeMCSpeed { get; set; }        
        public string ProYarnLot { get; set; }        
        public string ProYarnSupplier { get; set; }
        public decimal? AvgCount { get; set; }        
        public string MCStartTime { get; set; }
        public string MCStopTime { get; set; }
        public decimal? MCRunTimeHour { get; set; }
        public decimal? MCRunTimeMinute { get; set; }
        public string Remark { get; set; }
        public string UserName { get; set; }
        public DateTime? EntryDate { get; set; }        
        public string ShadeIndigoPercent { get; set; }        
        public string ShadeBlackPercent { get; set; }        
        public string ShadeMatchWith { get; set; }        
        public string Bath { get; set; }        
        public string Feeding { get; set; }        
        public string Refraction { get; set; }        
        public string Viscosity { get; set; }       
        public string Buyer { get; set; }        
        public string StyleNo { get; set; }
        public int? StyleCode { get; set; }        
        public string GreyConstruction { get; set; }        
        public string FabricConstruction { get; set; }
        public int? Weight { get; set; }        
        public string Weave { get; set; }        
        public string Width { get; set; }
        public int? AfterLengthMeter { get; set; }
        public int? AfterLengthKg { get; set; }        
        public string ColorRequired { get; set; }        
        public string PH { get; set; }        
        public string Redox { get; set; }
        public int? ColorCode { get; set; }        
        public string IndigoRedox { get; set; }        
        public string IndigoPH { get; set; }        
        public string IndigoDosing { get; set; }        
        public string SulpherRedox { get; set; }
        public string SulpherPH { get; set; }
        public string SulpherDosing { get; set; }
        public string SulpherTemperature { get; set; }
        public string HydroDosing { get; set; }
        public string CusticDosing { get; set; }
        public string CusticConcentration { get; set; }
        public string SaveStatus { get; set; }
    }
}
