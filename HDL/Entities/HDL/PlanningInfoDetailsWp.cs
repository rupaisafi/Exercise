using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class PlanningInfoDetailsWp
    {
        public int WAID { get; set; }
        public int PID { get; set; }
        public string EndsPerBeam { get; set; }
        public string NoOfBeam { get; set; }
        public string NoOfCreal { get; set; }
        public int TotalEnds { get; set; }
        public int MSpeed { get; set; }
        public string YarnTension { get; set; }
        public int ProcessingForce { get; set; }
        public string YarnCounts { get; set; }
        public string WarpRatio { get; set; }
        public string ProYarnLot { get; set; }
        public string ProYarnSupp { get; set; }
    }
}
