using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblType
    {
        public int TID { get; set; }
        public Nullable<int> TCode { get; set; }
        public string Type { get; set; }
        public string Dept { get; set; }
        public Nullable<int> GCode { get; set; }
        public string GName { get; set; }
        public Nullable<int> GroupCode { get; set; }
        public string GroupName { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> WvGCode { get; set; }
        public string WvGName { get; set; }
    }
}
