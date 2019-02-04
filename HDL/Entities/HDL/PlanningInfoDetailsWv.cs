using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInfoDetailsWv
    {
        public int WAID { get; set; }
        public int PID { get; set; }
        public string YarnCounts { get; set; }
        public string ProYarnLot { get; set; }
        public string ProYarnSupp { get; set; }
        public string WeaveRatio { get; set; }
        public decimal GreyWidth { get; set; }
        public decimal GreyLength { get; set; }
        public string Selvedge { get; set; }
        public string GreyPPI { get; set; }
        public decimal Weigth { get; set; }
    }
}
