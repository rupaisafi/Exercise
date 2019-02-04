using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class StyleParamFabric
    {
        public int SIID { get; set; }

        public int SID { get; set; }

        public string TensileStrengthWarp { get; set; }

        public string TensileStrengthWeft { get; set; }

        public string TearingStrengthWarp { get; set; }

        public string TearingStrengthWeft { get; set; }

        public string CrockingFastnessDry { get; set; }

        public string CrockingFastnessWeft { get; set; }

        public string ColourFastnessWash { get; set; }

        public string ColourFastnessAcetate { get; set; }

        public string ColourFastnessCotton { get; set; }

        public string ColourFastnessNylon { get; set; }

        public string ColourFastnessPolyster { get; set; }

        public string ColourFastnessAcrylic { get; set; }

        public string ColourFastnessWool { get; set; }

        public string PH { get; set; }

        public string Moisture { get; set; }

        public string Steffness { get; set; }

        public decimal PickEffi { get; set; }

        public int RPM { get; set; }

        public decimal ValueLoss { get; set; }

        public string Remarks { get; set; }

        public string ReedSpace { get; set; }
    }
}
