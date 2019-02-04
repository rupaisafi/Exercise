using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class RubberBelt
    {

        public int RID { get; set; }
        public string MCNo { get; set; }
        public string BName { get; set; }
        public string OCountry { get; set; }
        public string SerialNo { get; set; }
        public decimal ThicknessMM { get; set; }
        public decimal Hardness { get; set; }
        public decimal Width { get; set; }
        public DateTime SettingDate { get; set; }
        public string Type { get; set; }
        public string Remarks { get; set; }

    }
}
